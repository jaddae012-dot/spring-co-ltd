import { NextRequest, NextResponse } from "next/server";
import { appendGoogleSheetRow } from "@/lib/sheets";

type FastCleanersNotificationPayload = {
  applicationRef: string;
  fullName: string;
  phone: string;
  email: string;
  region: string;
  experience: string;
  status: string;
  submittedAt: string;
};

function normalize(value: unknown): string {
  return String(value ?? "").trim();
}

function generateApplicationReference(): string {
  const dateStamp = new Date().toISOString().slice(0, 10).replace(/-/g, "");
  const randomCode = Math.random().toString(36).slice(2, 7).toUpperCase();
  return `FC-${dateStamp}-${randomCode}`;
}

async function sendCleanerNotification(payload: FastCleanersNotificationPayload) {
  const WEBHOOK_URL = process.env.FAST_CLEANERS_WEBHOOK_URL || "";
  if (!WEBHOOK_URL) return;

  try {
    await fetch(WEBHOOK_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        event: "fast_cleaners.application_submitted",
        channels: ["sms"],
        payload,
      }),
      cache: "no-store",
    });
  } catch {
    // Notifications are best-effort and should not block application submission.
  }
}

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const submittedAt = new Date().toISOString();

    const fullName = normalize(formData.get("full_name"));
    const phone = normalize(formData.get("phone"));
    const email = normalize(formData.get("email"));
    const region = normalize(formData.get("region"));
    const experience = normalize(formData.get("experience"));
    const availability = normalize(formData.get("availability"));
    const about = normalize(formData.get("about"));

    if (!fullName || !phone || !region || !experience || !availability) {
      return NextResponse.json(
        { message: "Please fill all required fields." },
        { status: 400 }
      );
    }

    const applicationRef = generateApplicationReference();
    const status = "Pending";

    await appendGoogleSheetRow("FC_Employees", [
      submittedAt,
      applicationRef,
      fullName,
      phone,
      email,
      region,
      experience,
      availability,
      about,
      status,
      "", // Hourly Rate (filled by admin)
      "", // Total Earnings
      "", // Notes
    ]);

    const notificationPayload: FastCleanersNotificationPayload = {
      applicationRef,
      fullName,
      phone,
      email,
      region,
      experience,
      status,
      submittedAt,
    };

    await sendCleanerNotification(notificationPayload);

    return NextResponse.json(
      {
        message: "Application submitted successfully! We'll review and contact you soon.",
        applicationRef,
        status,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error submitting Fast Cleaners application:", error);
    return NextResponse.json(
      { message: "Failed to submit application. Please try again." },
      { status: 500 }
    );
  }
}
