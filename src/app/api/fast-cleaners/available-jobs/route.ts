import { NextRequest, NextResponse } from "next/server";
import { getGoogleSheetData } from "@/lib/sheets";

function getField(row: Record<string, unknown>, aliases: string[]): string {
  const normalizedEntries = Object.entries(row).map(([key, value]) => [
    key.replace(/[^a-zA-Z0-9]/g, "").toLowerCase(),
    value,
  ] as const);

  for (const alias of aliases) {
    const normalizedAlias = alias.replace(/[^a-zA-Z0-9]/g, "").toLowerCase();
    const found = normalizedEntries.find(([key]) => key === normalizedAlias);
    if (found) return String(found[1] ?? "").trim();
  }

  return "";
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const region = searchParams.get("region");

    if (!region) {
      return NextResponse.json(
        { message: "Region is required." },
        { status: 400 }
      );
    }

    const jobs = await getGoogleSheetData("FC_Jobs");

    const availableJobs = jobs
      .filter((job: Record<string, unknown>) => {
        const jobStatus = getField(job, ["Status", "JobStatus"]).toLowerCase();
        const jobRegion = getField(job, ["Region", "Location"]);
        return jobStatus.includes("open") && jobRegion === region;
      })
      .map((job: Record<string, unknown>) => ({
        jobId: getField(job, ["JobID", "Job ID", "JobId"]),
        serviceType: getField(job, ["ServiceType", "Service Type"]),
        region: getField(job, ["Region", "Location"]),
        customerName: getField(job, ["CustomerName", "Customer Name"]),
        customerPhone: getField(job, ["CustomerPhone", "Customer Phone"]),
        preferredDate: getField(job, ["PreferredDate", "Preferred Date"]),
        rate: getField(job, ["Rate", "JobRate"]),
        notes: getField(job, ["Notes", "JobDetails", "Job Details"]),
      }));

    return NextResponse.json({
      jobs: availableJobs,
      count: availableJobs.length,
    });
  } catch (error) {
    console.error("Error fetching available jobs:", error);
    return NextResponse.json(
      { message: "Failed to fetch jobs." },
      { status: 500 }
    );
  }
}
