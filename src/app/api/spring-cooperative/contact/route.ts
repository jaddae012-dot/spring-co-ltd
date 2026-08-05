import { NextRequest, NextResponse } from "next/server";
import { appendGoogleSheetRow } from "@/lib/sheets";

function normalize(value: unknown): string {
  return String(value ?? "").trim();
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const submittedAt = new Date().toISOString();

    const name = normalize(body.name || body.full_name || body.fullName);
    const phone = normalize(body.phone);
    const subject = normalize(body.subject || body.subject_topic || body.topic);
    const message = normalize(body.message || body.comments || body.details);

    if (!name || !phone || !subject || !message) {
      return NextResponse.json(
        { message: "Please fill in all required fields." },
        { status: 400 }
      );
    }

    await appendGoogleSheetRow("spring_cooperative_contacts", [
      submittedAt,
      name,
      phone,
      subject,
      message,
    ]);

    return NextResponse.json(
      { message: "Message sent successfully. Our team will contact you soon." },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error submitting Spring Cooperative contact form:", error);
    return NextResponse.json(
      { message: "Failed to send your message. Please try again later." },
      { status: 500 }
    );
  }
}
