import { NextRequest, NextResponse } from "next/server";
import { appendGoogleSheetRow } from "@/lib/sheets";

function normalize(value: unknown): string {
  return String(value ?? "").trim();
}

function asArray(value: unknown): string[] {
  if (!Array.isArray(value)) return [];
  return value.map((item) => normalize(item)).filter(Boolean);
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const fullName = normalize(body.fullName);
    const email = normalize(body.email);
    const phone = normalize(body.phone);
    const dateOfBirth = normalize(body.dateOfBirth);
    const program = normalize(body.program);
    const studyMode = normalize(body.studyMode);
    const previousQualification = normalize(body.previousQualification);
    const additionalInfo = normalize(body.additionalInfo);

    const certificateFileNames = asArray(body.certificateFileNames).join(", ");
    const certificateLinks = asArray(body.certificateLinks).join(", ");
    const idFileNames = asArray(body.idFileNames).join(", ");
    const idLinks = asArray(body.idLinks).join(", ");
    const photoFileNames = asArray(body.photoFileNames).join(", ");
    const photoLinks = asArray(body.photoLinks).join(", ");

    if (!fullName || !email || !phone || !dateOfBirth || !program || !studyMode) {
      return NextResponse.json(
        { message: "Please fill all required fields." },
        { status: 400 }
      );
    }

    await appendGoogleSheetRow("applications", [
      new Date().toISOString(),
      fullName,
      email,
      phone,
      dateOfBirth,
      program,
      studyMode,
      previousQualification,
      additionalInfo,
      certificateFileNames,
      certificateLinks,
      idFileNames,
      idLinks,
      photoFileNames,
      photoLinks,
      "Submitted",
    ]);

    return NextResponse.json({
      message: "Application submitted successfully. We will contact you soon.",
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Could not submit application.";

    if (message.toLowerCase().includes("parse range")) {
      return NextResponse.json(
        {
          message:
            "The applications sheet does not exist yet. Create a tab named applications with headers: SubmittedAt, FullName, Email, Phone, DateOfBirth, Program, StudyMode, PreviousQualification, AdditionalInfo, CertificateFileNames, CertificateLinks, IDFileNames, IDLinks, PhotoFileNames, PhotoLinks, Status.",
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { message: "Could not submit application." },
      { status: 500 }
    );
  }
}
