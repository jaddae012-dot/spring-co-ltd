
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

function getDisplayName(row: Record<string, unknown>, fallback: string): string {
  const fullName = getField(row, ["Name", "FullName", "StudentName", "TutorName"]);
  const firstName = getField(row, ["FirstName", "First Name"]);
  const lastName = getField(row, ["LastName", "Last Name"]);
  const combined = `${firstName} ${lastName}`.trim();

  return fullName || combined || fallback;
}

function normalizeRole(value: unknown): "student" | "tutor" | "admin" | "" {
  const role = normalizeText(value).toLowerCase();

  if (role === "student" || role === "tutor" || role === "admin") {
    return role;
  }

  return "";
}

function matchAdminCredentials(
  row: Record<string, unknown>,
  normalizedId: string,
  normalizedPin: string
): boolean {
  const adminId = getField(row, [
    "AdminID",
    "Admin ID",
    "Admin",
    "ID",
    "Username",
    "Login",
    "Email",
    "EmailAddress",
    "Email Address",
  ]);
  const adminPin = getField(row, ["PIN", "Pin", "Password", "Passcode", "Secret"]);

  return (
    normalizeId(adminId) === normalizedId &&
    normalizePin(adminPin) === normalizedPin
  );
}

async function getAdminRows(): Promise<Record<string, unknown>[]> {
  const candidateSheets = ["admins", "Admins", "admin", "Admin"];

  for (const sheetName of candidateSheets) {
    try {
      const rows = (await getGoogleSheetData(sheetName)) as Record<string, unknown>[];
      if (rows.length > 0) {
        return rows;
      }
    } catch {
      // Try the next possible tab name.
    }
  }

  return [];
}

export async function POST(req: NextRequest) {
  const session = await getSession();
  const body = await req.json();
  const id = body.id;
  const pin = body.pin;
  const requestedRole = normalizeRole(body.userType ?? body.role);
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
    const admins = await getAdminRows();

    const envAdminId = normalizeId(
      process.env.ADMIN_LOGIN_ID || process.env.ADMIN_ID || ""
    );
    const envAdminPin = normalizePin(
      process.env.ADMIN_LOGIN_PIN || process.env.ADMIN_PIN || ""
    );

    let user = null;
    let userType: "student" | "tutor" | "admin" | null = null;
    let matchedSheetId = "";
    let matchedDisplayName = "";

    const tryAdminLogin = () => {
      const admin = (admins as Record<string, unknown>[]).find((row) =>
        matchAdminCredentials(row, normalizedId, normalizedPin)
      );

      if (admin) {
        user = admin;
        userType = "admin";
        matchedSheetId =
          normalizeText(
            getField(admin, ["AdminID", "Admin ID", "ID", "Username", "Email"])
          ) || normalizeText(id);
        matchedDisplayName = getDisplayName(admin, "Admin");
        return true;
      }

      if (
        envAdminId &&
        envAdminPin &&
        envAdminId === normalizedId &&
        envAdminPin === normalizedPin
      ) {
        user = { id, pin };
        userType = "admin";
        matchedSheetId = normalizeText(id);
        matchedDisplayName = "Admin";
        return true;
      }

      return false;
    };

    if (requestedRole === "admin" && !tryAdminLogin()) {
      return NextResponse.json(
        {
          message:
            admins.length > 0
              ? "Invalid admin credentials. Check the Admin ID or Email and PIN in the admins sheet."
              : "No admin records were found. Create a sheet tab named admins (or Admins) with Admin ID/Email and PIN columns.",
        },
        { status: 401 }
      );
    }

    // Check if it's a student
    const student = requestedRole === "admin" ? null : students.find((row: any) => {
      const studentId = getField(row, ["StudentID", "Student ID", "ID"]);
      const studentPin = getField(row, [
        "PIN",
        "Pin",
        "Password",
        "Passcode",
      ]);
      const isMatch = (
        normalizeId(studentId) === normalizedId &&
        normalizePin(studentPin) === normalizedPin
      );

      if (isMatch) {
        matchedSheetId = normalizeText(studentId);
        matchedDisplayName = getDisplayName(row, "Student");
      }

      return isMatch;
    });
    if (student) {
      user = student;
      userType = "student";
    }

    // If not a student, check if it's a tutor
    if (!user && requestedRole !== "admin") {
      const tutor = tutors.find((row: any) => {
        const tutorId = getField(row, ["TutorID", "Tutor ID", "ID"]);
        const tutorPin = getField(row, ["PIN", "Pin", "Password", "Passcode"]);
        const isMatch = (
          normalizeId(tutorId) === normalizedId &&
          normalizePin(tutorPin) === normalizedPin
        );

        if (isMatch) {
          matchedSheetId = normalizeText(tutorId);
          matchedDisplayName = getDisplayName(row, "Tutor");
        }

        return isMatch;
      });
      if (tutor) {
        user = tutor;
        userType = "tutor";
      }
    }

    if (!user && requestedRole !== "student" && requestedRole !== "tutor") {
      if (!tryAdminLogin()) {
        return NextResponse.json(
          {
            message:
              admins.length > 0
                ? "Invalid admin credentials. Check the Admin ID or Email and PIN in the admins sheet."
                : "No admin records were found. Create a sheet tab named admins (or Admins) with Admin ID/Email and PIN columns.",
          },
          { status: 401 }
        );
      }
    }

    if (user && userType) {
      session.isLoggedIn = true;
      session.id = matchedSheetId || normalizeText(id);
      session.name = matchedDisplayName || undefined;
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
