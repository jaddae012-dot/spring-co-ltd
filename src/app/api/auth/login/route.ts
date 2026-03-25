
import { NextRequest, NextResponse } from "next/server";
import { getGoogleSheetData } from "@/lib/sheets";
import { getSession } from "@/lib/session";

function normalizeText(value: unknown): string {
  return String(value ?? "").trim();
}

function normalizeId(value: unknown): string {
  return normalizeText(value).replace(/[^a-zA-Z0-9]/g, "").toLowerCase();
}

function normalizePin(value: unknown): string {
  return normalizeText(value).toLowerCase();
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

export async function POST(req: NextRequest) {
  const session = await getSession();
  const { id, pin } = await req.json();
  const normalizedId = normalizeId(id);
  const normalizedPin = normalizePin(pin);

  if (!normalizedId || !normalizedPin) {
    return NextResponse.json(
      { message: "ID and PIN are required" },
      { status: 400 }
    );
  }

  try {
    const students = await getGoogleSheetData("students");
    const tutors = await getGoogleSheetData("tutors");

    let user = null;
    let userType: "student" | "tutor" | null = null;

    // Check if it's a student
    const student = students.find((row: any) => {
      const studentId = getField(row, ["StudentID", "Student ID", "ID"]);
      const studentPin = getField(row, [
        "PIN",
        "Pin",
        "Password",
        "Passcode",
      ]);
      return (
        normalizeId(studentId) === normalizedId &&
        normalizePin(studentPin) === normalizedPin
      );
    });
    if (student) {
      user = student;
      userType = "student";
    }

    // If not a student, check if it's a tutor
    if (!user) {
      const tutor = tutors.find((row: any) => {
        const tutorId = getField(row, ["TutorID", "Tutor ID", "ID"]);
        const tutorPin = getField(row, ["PIN", "Pin", "Password", "Passcode"]);
        return (
          normalizeId(tutorId) === normalizedId &&
          normalizePin(tutorPin) === normalizedPin
        );
      });
      if (tutor) {
        user = tutor;
        userType = "tutor";
      }
    }

    if (user && userType) {
      session.isLoggedIn = true;
      session.id = normalizeText(id);
      session.userType = userType;
      await session.save();

      return NextResponse.json({
        message: "Login successful",
        userType,
      });
    } else {
      return NextResponse.json(
        { message: "Invalid ID or PIN" },
        { status: 401 }
      );
    }
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { message: "An internal server error occurred." },
      { status: 500 }
    );
  }
}
