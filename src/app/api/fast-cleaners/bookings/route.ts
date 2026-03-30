import { NextRequest, NextResponse } from "next/server";
import { appendGoogleSheetRow } from "@/lib/sheets";

function normalize(value: unknown): string {
  return String(value ?? "").trim();
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const fullName = normalize(body.full_name);
    const phone = normalize(body.phone);
    const address = normalize(body.address);
    const serviceType = normalize(body.service_type);
    const propertyType = normalize(body.property_type);
    const preferredDate = normalize(body.preferred_date);
    const preferredTime = normalize(body.preferred_time);
    const frequency = normalize(body.frequency);
    const referralCode = normalize(body.referral_code);
    const specialInstructions = normalize(body.special_instructions);

    if (!fullName || !phone || !address || !serviceType || !preferredDate) {
      return NextResponse.json(
        { message: "Please fill all required booking fields." },
        { status: 400 }
      );
    }

    await appendGoogleSheetRow("fast_cleaners_bookings", [
      new Date().toISOString(),
      fullName,
      phone,
      address,
      serviceType,
      propertyType,
      preferredDate,
      preferredTime,
      frequency,
      referralCode,
      specialInstructions,
      "New",
      "Website",
    ]);

    return NextResponse.json({ message: "Booking saved successfully." });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Could not save booking.";

    if (message.toLowerCase().includes("parse range")) {
      return NextResponse.json(
        {
          message:
            "The fast_cleaners_bookings sheet does not exist yet. Create a tab named fast_cleaners_bookings with headers: SubmittedAt, FullName, Phone, Address, ServiceType, PropertyType, PreferredDate, PreferredTime, Frequency, ReferralCode, SpecialInstructions, Status, Source.",
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { message: "Could not save booking." },
      { status: 500 }
    );
  }
}
