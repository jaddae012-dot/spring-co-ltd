import { NextRequest, NextResponse } from "next/server";
import { getGoogleSheetData } from "@/lib/sheets";
import { getSession } from "@/lib/session";

type Row = Record<string, unknown>;

const ADMISSIONS_WEBHOOK_URL = process.env.ADMISSIONS_WEBHOOK_URL || "";
const ALLOWED_STATUSES = [
  "Submitted",
  "Under Review",
  "Interview Scheduled",
  "Interviewed",
  "Admitted",
  "Rejected",
  "Waitlisted",
] as const;

type AllowedStatus = (typeof ALLOWED_STATUSES)[number];

function normalize(value: unknown): string {
  return String(value ?? "").trim();
}

function normalizedKey(value: string): string {
  return value.replace(/[^a-zA-Z0-9]/g, "").toLowerCase();
}

function getField(row: Row, aliases: string[]): string {
  const entries = Object.entries(row).map(([key, value]) => [normalizedKey(key), value] as const);

  for (const alias of aliases) {
    const target = normalizedKey(alias);
    const match = entries.find(([key]) => key === target);
    if (match) return normalize(match[1]);
  }

  return "";
}

function normalizeStatus(value: unknown): AllowedStatus | null {
  const normalized = normalize(value).toLowerCase();
  const match = ALLOWED_STATUSES.find(
    (status) => status.toLowerCase() === normalized
  );
  return match ?? null;
}

async function sendStatusUpdateNotification(payload: {
  applicationRef: string;
  fullName: string;
  email: string;
  phone: string;
  program: string;
  studyMode: string;
  status: string;
  updatedAt: string;
  actorId: string;
  notes: string;
}) {
  if (!ADMISSIONS_WEBHOOK_URL) return;

  try {
    await fetch(ADMISSIONS_WEBHOOK_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        event: "prime_college.admission_status_updated",
        channels: ["email", "sms"],
        payload,
      }),
      cache: "no-store",
    });
  } catch {
    // Notification errors should not block workflow updates.
  }
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const applicationRef = normalize(searchParams.get("applicationRef"));
  const email = normalize(searchParams.get("email")).toLowerCase();

  if (!applicationRef && !email) {
    return NextResponse.json(
      { message: "Provide at least applicationRef or email." },
      { status: 400 }
    );
  }

  try {
    const applications = (await getGoogleSheetData("applications")) as Row[];
    let events: Row[] = [];
    try {
      events = ((await getGoogleSheetData("applications_events")) as Row[]) || [];
    } catch {
      events = [];
    }

    const match = applications
      .map((row) => ({
        applicationRef: getField(row, ["ApplicationRef", "Reference", "Application Reference"]),
        fullName: getField(row, ["FullName", "Full Name", "Name"]),
        email: getField(row, ["Email", "Email Address"]).toLowerCase(),
        program: getField(row, ["Program", "Programme", "Course"]),
        studyMode: getField(row, ["StudyMode", "Study Mode"]),
        status: getField(row, ["Status", "WorkflowStatus", "ApplicationStatus"]) || "Submitted",
        submittedAt: getField(row, ["SubmittedAt", "Submitted At", "Timestamp"]),
        lastStatusUpdateAt: getField(row, ["LastStatusUpdateAt", "Last Status Update At", "UpdatedAt"]),
      }))
      .find((row) => {
        const byRef = applicationRef && row.applicationRef.toLowerCase() === applicationRef.toLowerCase();
        const byEmail = email && row.email === email;
        if (applicationRef && email) {
          return byRef || (byEmail && !!row.applicationRef);
        }
        return Boolean(byRef || byEmail);
      });

    if (!match) {
      return NextResponse.json(
        { message: "No admission application found for the provided details." },
        { status: 404 }
      );
    }

    const latestEvent = events
      .map((row) => ({
        applicationRef: getField(row, ["ApplicationRef", "Reference", "Application Reference"]),
        status: getField(row, ["Status", "WorkflowStatus", "ApplicationStatus"]),
        updatedAt: getField(row, ["UpdatedAt", "Timestamp", "SubmittedAt"]),
      }))
      .filter((row) => row.applicationRef.toLowerCase() === match.applicationRef.toLowerCase())
      .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())[0];

    return NextResponse.json({
      message: "Application status retrieved.",
      data: {
        applicationRef: match.applicationRef,
        fullName: match.fullName,
        email: match.email,
        program: match.program,
        studyMode: match.studyMode,
        status: latestEvent?.status || match.status,
        submittedAt: match.submittedAt,
        lastStatusUpdateAt:
          latestEvent?.updatedAt || match.lastStatusUpdateAt || match.submittedAt,
      },
    });
  } catch {
    return NextResponse.json(
      { message: "Could not fetch application status right now." },
      { status: 500 }
    );
  }
}

export async function PATCH(req: NextRequest) {
  const session = await getSession();

  if (!session.isLoggedIn || session.userType !== "tutor") {
    return NextResponse.json(
      { message: "Unauthorized. Tutor login required." },
      { status: 401 }
    );
  }

  try {
    const body = (await req.json()) as {
      applicationRef?: string;
      status?: string;
      notes?: string;
    };

    const applicationRef = normalize(body.applicationRef);
    const notes = normalize(body.notes);
    const status = normalizeStatus(body.status);

    if (!applicationRef || !status) {
      return NextResponse.json(
        {
          message:
            "applicationRef and a valid status are required.",
          allowedStatuses: ALLOWED_STATUSES,
        },
        { status: 400 }
      );
    }

    const applications = (await getGoogleSheetData("applications")) as Row[];
    const current = applications
      .map((row) => ({
        applicationRef: getField(row, ["ApplicationRef", "Reference", "Application Reference"]),
        fullName: getField(row, ["FullName", "Full Name", "Name"]),
        email: getField(row, ["Email", "Email Address"]),
        phone: getField(row, ["Phone", "Phone Number", "Contact"]),
        program: getField(row, ["Program", "Programme", "Course"]),
        studyMode: getField(row, ["StudyMode", "Study Mode"]),
      }))
      .find((row) => row.applicationRef.toLowerCase() === applicationRef.toLowerCase());

    if (!current) {
      return NextResponse.json(
        { message: "Application reference not found." },
        { status: 404 }
      );
    }

    const updatedAt = new Date().toISOString();
    const actorId = normalize(session.id) || "tutor";

    const { appendGoogleSheetRow } = await import("@/lib/sheets");
    await appendGoogleSheetRow("applications_events", [
      updatedAt,
      current.applicationRef,
      status,
      actorId,
      notes || `Status updated to ${status}`,
      current.email,
      current.phone,
    ]);

    await sendStatusUpdateNotification({
      applicationRef: current.applicationRef,
      fullName: current.fullName,
      email: current.email,
      phone: current.phone,
      program: current.program,
      studyMode: current.studyMode,
      status,
      updatedAt,
      actorId,
      notes,
    });

    return NextResponse.json({
      message: "Application workflow status updated.",
      data: {
        applicationRef: current.applicationRef,
        status,
        updatedAt,
        actorId,
      },
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "";

    if (message.toLowerCase().includes("parse range")) {
      return NextResponse.json(
        {
          message:
            "The applications_events sheet does not exist yet. Create a tab named applications_events with headers: UpdatedAt, ApplicationRef, Status, UpdatedBy, Notes, Email, Phone.",
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        message: "Could not update application status right now.",
      },
      { status: 500 }
    );
  }
}
