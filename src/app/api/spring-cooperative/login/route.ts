import { NextRequest, NextResponse } from "next/server";
import { getGoogleSheetData } from "@/lib/sheets";
import { getSession } from "@/lib/session";

function normalizeText(value: unknown): string {
  return String(value ?? "").trim();
}

function normalizeId(value: unknown): string {
  return normalizeText(value).replace(/[^a-zA-Z0-9]/g, "").toLowerCase();
}

function getField(row: Record<string, unknown>, aliases: string[]): string {
  const normalizedEntries = Object.entries(row).map(([key, value]) => [
    key.replace(/[^a-zA-Z0-9]/g, "").toLowerCase(),
    value,
  ] as const);

  for (const alias of aliases) {
    const normalizedAlias = alias.replace(/[^a-zA-Z0-9]/g, "").toLowerCase();
    const found = normalizedEntries.find(([key]) => key === normalizedAlias);
    if (found) {
      return normalizeText(found[1]);
    }
  }

  return "";
}

async function authenticateMember(applicationRef: string, secret: string) {
  const rows = (await getGoogleSheetData("spring_cooperative_memberships")) as Record<string, unknown>[];

  return rows.find((row) => {
    const ref = getField(row, ["ApplicationRef", "Application Reference", "Reference", "application_ref"]);
    const phone = getField(row, ["Phone", "PhoneNumber", "Phone Number", "phone"]);
    const idNumber = getField(row, ["IDNumber", "ID Number", "id_number", "id"]);

    return (
      normalizeId(ref) === normalizeId(applicationRef) &&
      (normalizeId(phone) === normalizeId(secret) || normalizeId(idNumber) === normalizeId(secret))
    );
  });
}

export async function POST(req: NextRequest) {
  try {
    const session = await getSession();
    const body = await req.json();
    const applicationRef = normalizeText(body.applicationRef);
    const secret = normalizeText(body.secret);

    if (!applicationRef || !secret) {
      return NextResponse.json({ message: "Application reference and secret are required." }, { status: 400 });
    }

    const member = await authenticateMember(applicationRef, secret);
    if (!member) {
      return NextResponse.json({ message: "Invalid reference or secret. Please try again." }, { status: 401 });
    }

    session.isLoggedIn = true;
    session.id = applicationRef.toLowerCase();
    session.userType = "student";
    session.name = getField(member, ["FullName", "Name", "ApplicantName", "full_name"]) || "Member";
    await session.save();

    return NextResponse.json({ message: "Login successful" }, { status: 200 });
  } catch (error) {
    console.error("Spring Cooperative login error:", error);
    return NextResponse.json({ message: "Login failed. Please try again later." }, { status: 500 });
  }
}
