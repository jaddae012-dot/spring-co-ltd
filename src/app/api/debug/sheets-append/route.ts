import { NextRequest, NextResponse } from "next/server";
import { appendGoogleSheetRow } from "@/lib/sheets";

// Protected debug endpoint to test appending rows to Google Sheets.
// Requires `DEBUG_SHEETS_TOKEN` header to match env var when set. In production
// this endpoint denies access unless DEBUG_SHEETS_TOKEN is configured.
export async function POST(req: NextRequest) {
  const token = req.headers.get("x-debug-token") || "";
  if (process.env.DEBUG_SHEETS_TOKEN) {
    if (token !== process.env.DEBUG_SHEETS_TOKEN) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
  } else if (process.env.NODE_ENV === "production") {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const sheetName = body.sheetName || body.sheet || "FC_Jobs";
    const row = body.row || body.values;

    if (!Array.isArray(row)) {
      return NextResponse.json({ message: "Request 'row' must be an array" }, { status: 400 });
    }

    await appendGoogleSheetRow(sheetName, row);
    return NextResponse.json({ message: "Appended" }, { status: 200 });
  } catch (error) {
    console.error("Debug sheets append failed:", error);
    return NextResponse.json({ message: "Failed to append", error: String(error) }, { status: 500 });
  }
}
