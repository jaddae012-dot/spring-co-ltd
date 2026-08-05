import { NextRequest, NextResponse } from "next/server";
import { appendGoogleSheetRow } from "@/lib/sheets";

function normalize(value: unknown): string {
  return String(value ?? "").trim();
}

function generateApplicationReference(): string {
  const dateStamp = new Date().toISOString().slice(0, 10).replace(/-/g, "");
  const randomCode = Math.random().toString(36).slice(2, 7).toUpperCase();
  return `SCU-${dateStamp}-${randomCode}`;
}

type CooperativeNotificationPayload = {
  applicationRef: string;
  fullName: string;
  phone: string;
  email: string;
  status: string;
  submittedAt: string;
};

async function sendCooperativeNotification(payload: CooperativeNotificationPayload) {
  const WEBHOOK_URL = process.env.SPRING_COOPERATIVE_WEBHOOK_URL || "";
  if (!WEBHOOK_URL) return;

  try {
    await fetch(WEBHOOK_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        event: "spring_cooperative.membership_submitted",
        payload,
      }),
      cache: "no-store",
    });
  } catch {
    // Notification failures should not block the submission.
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const submittedAt = new Date().toISOString();

    const fullName = normalize(body.full_name || body.fullName || body.name);
    const dateOfBirth = normalize(body.date_of_birth || body.dateOfBirth);
    const phone = normalize(body.phone);
    const email = normalize(body.email);
    const address = normalize(body.address);
    const occupation = normalize(body.occupation);
    const idNumber = normalize(body.id_number || body.idNumber);
    const nextOfKin = normalize(body.next_of_kin || body.nextOfKin);
    const monthlySavings = normalize(body.monthly_savings || body.monthlySavings);
    const comments = normalize(body.comments);

    if (!fullName || !phone || !address || !idNumber || !monthlySavings) {
      return NextResponse.json(
        { message: "Please fill all required fields." },
        { status: 400 }
      );
    }

    const applicationRef = generateApplicationReference();
    const status = "Pending";

    await appendGoogleSheetRow("spring_cooperative_memberships", [
      submittedAt,
      applicationRef,
      fullName,
      phone,
      email,
      dateOfBirth,
      address,
      occupation,
      idNumber,
      nextOfKin,
      monthlySavings,
      comments,
      status,
    ]);

    await sendCooperativeNotification({
      applicationRef,
      fullName,
      phone,
      email,
      status,
      submittedAt,
    });

    return NextResponse.json(
      {
        message: "Membership application submitted successfully. We will review your request and follow up soon.",
        applicationRef,
        status,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error submitting Spring Cooperative membership:", error);
    return NextResponse.json(
      { message: "Failed to submit application. Please try again later." },
      { status: 500 }
    );
  }
}
