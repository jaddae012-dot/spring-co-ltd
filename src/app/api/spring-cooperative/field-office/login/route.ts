import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/session";
import { authenticateFieldOfficeUser } from "@/lib/fieldOfficeDashboard";

function normalizeText(value: unknown): string {
  return String(value ?? "").trim();
}

export async function POST(req: NextRequest) {
  try {
    const session = await getSession();
    const body = await req.json();
    const officeId = normalizeText(body.officeId);
    const secret = normalizeText(body.secret);

    if (!officeId || !secret) {
      return NextResponse.json(
        { message: "Office ID and PIN are required." },
        { status: 400 }
      );
    }

    const user = await authenticateFieldOfficeUser(officeId, secret);
    if (!user) {
      return NextResponse.json(
        { message: "Invalid office credentials. Please check your Office ID and PIN." },
        { status: 401 }
      );
    }

    session.isLoggedIn = true;
    session.id = officeId.toLowerCase();
    session.userType = "fieldOffice";
    session.name =
      normalizeText((user as Record<string, unknown>).Name) ||
      normalizeText((user as Record<string, unknown>).name) ||
      "Field Office";
    await session.save();

    return NextResponse.json({ message: "Login successful" }, { status: 200 });
  } catch (error) {
    console.error("Field office login error:", error);
    return NextResponse.json(
      { message: "Login failed. Please try again later." },
      { status: 500 }
    );
  }
}
