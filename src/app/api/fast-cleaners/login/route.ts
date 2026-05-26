import { NextRequest, NextResponse } from "next/server";
import { getGoogleSheetData } from "@/lib/sheets";

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

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const phone = normalize(body.phone);

    if (!phone) {
      return NextResponse.json(
        { message: "Phone number is required." },
        { status: 400 }
      );
    }

    const employees = await getGoogleSheetData("FC_Employees");

    const employee = employees.find(
      (row) => getField(row, ["Phone", "PhoneNumber", "Phone Number"]) === phone
    );

    if (!employee) {
      return NextResponse.json(
        { message: "Phone number not found. Please apply first." },
        { status: 404 }
      );
    }

    const status = getField(employee, ["Status", "ApplicationStatus"]);

    if (!status.toLowerCase().includes("approved") && !status.toLowerCase().includes("active")) {
      return NextResponse.json(
        {
          message: `Your application status is: ${status}. Wait for approval to access the dashboard.`,
        },
        { status: 403 }
      );
    }

    return NextResponse.json({
      cleaner: {
        phone,
        name: getField(employee, ["FullName", "Full Name", "Name"]),
        region: getField(employee, ["Region", "Location"]),
        status: status,
        hourlyRate: getField(employee, ["HourlyRate", "Hourly Rate", "Rate"]),
      },
    });
  } catch (error) {
    console.error("Error logging in cleaner:", error);
    return NextResponse.json(
      { message: "Failed to login. Please try again." },
      { status: 500 }
    );
  }
}
