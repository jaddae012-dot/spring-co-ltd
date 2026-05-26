import { NextRequest, NextResponse } from "next/server";
import { appendGoogleSheetRow } from "@/lib/sheets";

function normalize(value: unknown): string {
  return String(value ?? "").trim();
}

function generateBookingReference(): string {
  const dateStamp = new Date().toISOString().slice(0, 10).replace(/-/g, "");
  const randomCode = Math.random().toString(36).slice(2, 7).toUpperCase();
  return `BK-${dateStamp}-${randomCode}`;
}

async function sendBookingNotification(
  bookingRef: string,
  name: string,
  phone: string,
  email: string,
  serviceType: string,
  region: string
) {
  const WEBHOOK_URL = process.env.FAST_CLEANERS_WEBHOOK_URL || "";
  if (!WEBHOOK_URL) return;

  try {
    await fetch(WEBHOOK_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        event: "fast_cleaners.booking_submitted",
        channels: ["sms"],
        payload: {
          bookingRef,
          name,
          phone,
          email,
          serviceType,
          region,
          message: "Your booking request has been received. We'll contact you soon.",
        },
      }),
      cache: "no-store",
    });
  } catch {
    // Notifications are best-effort
  }
}

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const submittedAt = new Date().toISOString();

    const serviceType = normalize(formData.get("service_type"));
    const region = normalize(formData.get("region"));
    const name = normalize(formData.get("name"));
    const phone = normalize(formData.get("phone"));
    const email = normalize(formData.get("email"));
    const preferredDate = normalize(formData.get("preferred_date"));
    const address = normalize(formData.get("address"));
    const details = normalize(formData.get("details"));

    if (
      !serviceType ||
      !region ||
      !name ||
      !phone ||
      !preferredDate ||
      !address
    ) {
      return NextResponse.json(
        { message: "Please fill all required fields." },
        { status: 400 }
      );
    }

    const bookingRef = generateBookingReference();
    const status = "Pending";

    // Save to FC_Bookings sheet
    await appendGoogleSheetRow("FC_Bookings", [
      submittedAt,
      bookingRef,
      serviceType,
      region,
      name,
      phone,
      email,
      preferredDate,
      address,
      details,
      status,
      "", // Assigned Cleaner
      "", // Job Rate
      "", // Payment Status
    ]);

    await sendBookingNotification(bookingRef, name, phone, email, serviceType, region);

    return NextResponse.json(
      {
        message: "Booking request submitted successfully! We'll contact you shortly to confirm and provide more details.",
        bookingRef,
        status,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error submitting booking:", error);
    return NextResponse.json(
      { message: "Failed to submit booking. Please try again." },
      { status: 500 }
    );
  }
}
