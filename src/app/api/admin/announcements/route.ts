import { NextRequest, NextResponse } from "next/server";
import { appendGoogleSheetRow, getGoogleSheetData } from "@/lib/sheets";
import { getSession } from "@/lib/session";

type AnnouncementRow = {
  studentId: string;
  email: string;
  program: string;
  audience: string;
  title: string;
  message: string;
  date: string;
  author: string;
  href: string;
};

function normalizeAnnouncementRows(rows: Record<string, unknown>[]): AnnouncementRow[] {
  return rows
    .map((row) => ({
      studentId: String(row.StudentID ?? row["Student ID"] ?? "").trim(),
      email: String(row.Email ?? row["Email Address"] ?? "").trim(),
      program: String(row.Program ?? row.Course ?? row.Programme ?? "").trim(),
      audience: String(row.Audience ?? row.Target ?? row.Scope ?? "").trim(),
      title: String(row.Title ?? row.Subject ?? row.Heading ?? "").trim(),
      message: String(row.Message ?? row.Announcement ?? row.Notice ?? "").trim(),
      date: String(row.Date ?? row.PublishedAt ?? row["Published At"] ?? "").trim(),
      author: String(row.Author ?? row.PostedBy ?? row["Posted By"] ?? "").trim(),
      href: String(row.Href ?? row.Link ?? row.URL ?? "").trim(),
    }))
    .filter((announcement) => announcement.title || announcement.message)
    .slice(-20)
    .reverse();
}

function asCleanString(value: unknown): string {
  return String(value ?? "").trim();
}

export async function GET() {
  const session = await getSession();

  if (!session.isLoggedIn || (session.userType !== "tutor" && session.userType !== "admin")) {
    return NextResponse.json(
      { message: "Only staff can view admin announcements." },
      { status: 403 }
    );
  }

  try {
    const rows = (await getGoogleSheetData("student_announcements")) as Record<
      string,
      unknown
    >[];
    return NextResponse.json({ announcements: normalizeAnnouncementRows(rows) });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Could not fetch announcements.";

    if (message.toLowerCase().includes("parse range")) {
      return NextResponse.json({ announcements: [] });
    }

    return NextResponse.json(
      { message: "Could not fetch announcements." },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  const session = await getSession();

  if (!session.isLoggedIn || (session.userType !== "tutor" && session.userType !== "admin")) {
    return NextResponse.json(
      { message: "Only staff can publish announcements." },
      { status: 403 }
    );
  }

  try {
    const body = await req.json();
    const studentId = asCleanString(body.studentId);
    const email = asCleanString(body.email);
    const program = asCleanString(body.program);
    const audience = asCleanString(body.audience);
    const title = asCleanString(body.title);
    const message = asCleanString(body.message);
    const date = asCleanString(body.date) || new Date().toISOString().slice(0, 10);
    const author = asCleanString(body.author) || session.name || session.id;
    const href = asCleanString(body.href);

    if (!title || !message) {
      return NextResponse.json(
        { message: "Title and message are required." },
        { status: 400 }
      );
    }

    if (!studentId && !email && !program && !audience) {
      return NextResponse.json(
        {
          message:
            "Choose who should see this announcement: audience, program, student ID, or email.",
        },
        { status: 400 }
      );
    }

    await appendGoogleSheetRow("student_announcements", [
      studentId,
      email,
      program,
      audience,
      title,
      message,
      date,
      author,
      href,
    ]);

    return NextResponse.json({
      message: "Announcement published successfully.",
      announcement: {
        studentId,
        email,
        program,
        audience,
        title,
        message,
        date,
        author,
        href,
      },
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Could not publish announcement.";

    if (message.toLowerCase().includes("parse range")) {
      return NextResponse.json(
        {
          message:
            "Create a sheet tab named student_announcements with headers: StudentID, Email, Program, Audience, Title, Message, Date, Author, Href.",
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { message: "Could not publish announcement." },
      { status: 500 }
    );
  }
}
