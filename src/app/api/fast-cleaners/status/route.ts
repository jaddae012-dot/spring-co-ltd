import { NextRequest, NextResponse } from "next/server";
import { getGoogleSheetData, appendGoogleSheetRow } from "@/lib/sheets";

function normalize(value: unknown): string {
  return String(value ?? "").trim();
}

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

// GET: Lookup cleaner application
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const applicationRef = normalize(searchParams.get("applicationRef"));

    if (!applicationRef) {
      return NextResponse.json(
        { message: "Application reference is required." },
        { status: 400 }
      );
    }

    const employees = await getGoogleSheetData("FC_Employees");

    const employee = employees.find(
      (row) => getField(row, ["ApplicationRef", "Application Ref", "Ref"]) === applicationRef
    );

    if (!employee) {
      return NextResponse.json(
        { message: "Employee application not found." },
        { status: 404 }
      );
    }

    return NextResponse.json({
      data: {
        applicationRef: getField(employee, ["ApplicationRef", "Application Ref"]),
        fullName: getField(employee, ["FullName", "Full Name", "Name"]),
        phone: getField(employee, ["Phone", "PhoneNumber", "Phone Number"]),
        email: getField(employee, ["Email", "EmailAddress", "Email Address"]),
        region: getField(employee, ["Region", "Location"]),
        experience: getField(employee, ["Experience", "ExperienceLevel"]),
        status: getField(employee, ["Status", "ApplicationStatus"]),
        submittedAt: getField(employee, ["SubmittedAt", "Submitted At", "DateSubmitted"]),
      },
      hourlyRate: getField(employee, ["HourlyRate", "Hourly Rate", "Rate"]),
    });
  } catch (error) {
    console.error("Error fetching cleaner status:", error);
    return NextResponse.json(
      { message: "Failed to fetch employee data." },
      { status: 500 }
    );
  }
}

// PATCH: Update cleaner status
export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json();
    const applicationRef = normalize(body.applicationRef);
    const newStatus = normalize(body.status);
    const hourlyRate = normalize(body.hourlyRate);
    const notes = normalize(body.notes);

    if (!applicationRef || !newStatus) {
      return NextResponse.json(
        { message: "Application reference and status are required." },
        { status: 400 }
      );
    }

    const employees = await getGoogleSheetData("FC_Employees");
    const employeeIndex = employees.findIndex(
      (row) => getField(row, ["ApplicationRef", "Application Ref"]) === applicationRef
    );

    if (employeeIndex === -1) {
      return NextResponse.json(
        { message: "Employee not found." },
        { status: 404 }
      );
    }

    // Record the status change in FC_StatusHistory
    const timestamp = new Date().toISOString();
    await appendGoogleSheetRow("FC_StatusHistory", [
      timestamp,
      applicationRef,
      newStatus,
      "admin",
      notes || "Status updated",
    ]);

    // Note: In a production system, you'd update the FC_Employees sheet directly
    // For now, this logs the change to FC_StatusHistory
    // A full implementation would need the ability to update existing rows in Google Sheets

    return NextResponse.json({
      data: {
        applicationRef,
        status: newStatus,
        hourlyRate,
        updatedAt: timestamp,
      },
    });
  } catch (error) {
    console.error("Error updating cleaner status:", error);
    return NextResponse.json(
      { message: "Failed to update employee status." },
      { status: 500 }
    );
  }
}
