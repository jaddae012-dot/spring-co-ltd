import { NextRequest, NextResponse } from "next/server";
import { appendGoogleSheetRow } from "@/lib/sheets";

function normalize(value: unknown): string {
  return String(value ?? "").trim();
}

function generateJobId(): string {
  const dateStamp = new Date().toISOString().slice(0, 10).replace(/-/g, "");
  const randomCode = Math.random().toString(36).slice(2, 7).toUpperCase();
  return `JOB-${dateStamp}-${randomCode}`;
}

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const postedAt = new Date().toISOString();

    const serviceType = normalize(formData.get("service_type"));
    const region = normalize(formData.get("region"));
    const customerName = normalize(formData.get("customer_name"));
    const customerPhone = normalize(formData.get("customer_phone"));
    const preferredDate = normalize(formData.get("preferred_date"));
    const rate = normalize(formData.get("rate"));
    const notes = normalize(formData.get("notes"));

    if (
      !serviceType ||
      !region ||
      !customerName ||
      !customerPhone ||
      !preferredDate ||
      !rate
    ) {
      return NextResponse.json(
        { message: "Please fill all required fields." },
        { status: 400 }
      );
    }

    const jobId = generateJobId();
    const status = "Open";

    await appendGoogleSheetRow("FC_Jobs", [
      postedAt,
      jobId,
      serviceType,
      region,
      customerName,
      customerPhone,
      preferredDate,
      status,
      "", // Assigned Cleaner
      rate,
      "Pending", // Payment Status
      notes,
    ]);

    return NextResponse.json(
      {
        message: "Job posted successfully!",
        jobId,
        status,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error posting job:", error);
    return NextResponse.json(
      { message: "Failed to post job. Please try again." },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json(
    { message: "Use POST to create jobs" },
    { status: 405 }
  );
}
