import { NextRequest, NextResponse } from "next/server";
import { appendGoogleSheetRow } from "@/lib/sheets";
import { uploadToCloudinary } from "@/lib/cloudinary";

function normalize(value: unknown): string {
  return String(value ?? "").trim();
}

function splitCommaSeparated(value: unknown): string[] {
  return normalize(value)
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

function getUploadedFiles(formData: FormData, fieldName: string): File[] {
  return formData
    .getAll(fieldName)
    .filter((entry): entry is File => entry instanceof File && entry.size > 0);
}

async function uploadFiles(files: File[], folder: string): Promise<string[]> {
  return Promise.all(files.map((file) => uploadToCloudinary(file, folder)));
}

function escapeFormulaValue(value: string): string {
  return value.replace(/"/g, '""');
}

function extractGoogleDriveFileId(link: string): string | null {
  const normalized = normalize(link);
  if (!normalized) return null;

  const patterns = [
    /\/d\/([a-zA-Z0-9_-]+)/,
    /[?&]id=([a-zA-Z0-9_-]+)/,
  ];

  for (const pattern of patterns) {
    const match = normalized.match(pattern);
    if (match?.[1]) return match[1];
  }

  return null;
}

function buildPhotoPreviewFormula(photoLink: string): string {
  const cleanLink = normalize(photoLink);
  if (!cleanLink) return "";

  const driveFileId = extractGoogleDriveFileId(cleanLink);
  if (driveFileId) {
    return `=IFERROR(IMAGE("https://drive.google.com/uc?export=view&id=${driveFileId}"), "")`;
  }

  return `=IFERROR(IMAGE("${escapeFormulaValue(cleanLink)}"), "")`;
}

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();

    const fullName = normalize(formData.get("full_name"));
    const email = normalize(formData.get("email"));
    const phone = normalize(formData.get("phone"));
    const dateOfBirth = normalize(formData.get("date_of_birth"));
    const program = normalize(formData.get("program"));
    const studyMode = normalize(formData.get("study_mode"));
    const previousQualification = normalize(formData.get("previous_qualification"));
    const additionalInfo = normalize(formData.get("additional_info"));

    const certificateFiles = getUploadedFiles(formData, "certificate_files");
    const idFiles = getUploadedFiles(formData, "id_files");
    const photoFiles = getUploadedFiles(formData, "photo_files");

    const certificateFileNames = certificateFiles.map((file) => file.name).join(", ");
    const idFileNames = idFiles.map((file) => file.name).join(", ");
    const photoFileNames = photoFiles.map((file) => file.name).join(", ");

    const manualCertificateLinks = splitCommaSeparated(formData.get("certificate_links"));
    const manualIdLinks = splitCommaSeparated(formData.get("id_links"));
    const manualPhotoLinks = splitCommaSeparated(formData.get("photo_links"));

    const [uploadedCertificateLinks, uploadedIdLinks, uploadedPhotoLinks] = await Promise.all([
      uploadFiles(certificateFiles, "prime-college/admissions/certificates"),
      uploadFiles(idFiles, "prime-college/admissions/id-documents"),
      uploadFiles(photoFiles, "prime-college/admissions/photos"),
    ]);

    const certificateLinksArray = [...uploadedCertificateLinks, ...manualCertificateLinks];
    const idLinksArray = [...uploadedIdLinks, ...manualIdLinks];
    const photoLinksArray = [...uploadedPhotoLinks, ...manualPhotoLinks];

    const certificateLinks = certificateLinksArray.join(", ");
    const idLinks = idLinksArray.join(", ");
    const photoLinks = photoLinksArray.join(", ");
    const photoPreviewFormula = buildPhotoPreviewFormula(photoLinksArray[0] ?? "");

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
      photoPreviewFormula,
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
            "The applications sheet does not exist yet. Create a tab named applications with headers: SubmittedAt, FullName, Email, Phone, DateOfBirth, Program, StudyMode, PreviousQualification, AdditionalInfo, CertificateFileNames, CertificateLinks, IDFileNames, IDLinks, PhotoFileNames, PhotoLinks, PhotoPreview, Status.",
        },
        { status: 400 }
      );
    }

    if (message.toLowerCase().includes("cloudinary")) {
      return NextResponse.json(
        {
          message:
            "Cloud upload is not configured. Set CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, and CLOUDINARY_API_SECRET.",
        },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: "Could not submit application." },
      { status: 500 }
    );
  }
}
