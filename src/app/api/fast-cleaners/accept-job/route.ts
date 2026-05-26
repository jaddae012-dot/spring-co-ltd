import { NextRequest, NextResponse } from "next/server";
import { appendGoogleSheetRow } from "@/lib/sheets";

function normalize(value: unknown): string {
  return String(value ?? "").trim();
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const jobId = normalize(body.jobId);
    const cleanerPhone = normalize(body.cleanerPhone);
    const cleanerName = normalize(body.cleanerName);

    if (!jobId || !cleanerPhone || !cleanerName) {
      return NextResponse.json(
        { message: "Missing required fields." },
        { status: 400 }
      );
    }

    const timestamp = new Date().toISOString();

    // Log job acceptance
    await appendGoogleSheetRow("FC_JobAssignments", [
      timestamp,
      jobId,
      cleanerPhone,
      cleanerName,
      "Accepted",
    ]);

    return NextResponse.json({
      message: "Job accepted successfully!",
      jobId,
      cleanerName,
      timestamp,
    });
  } catch (error) {
    console.error("Error accepting job:", error);
    return NextResponse.json(
      { message: "Failed to accept job." },
      { status: 500 }
    );
  }
}
