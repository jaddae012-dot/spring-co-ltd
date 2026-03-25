import { NextRequest, NextResponse } from "next/server";
import { appendGoogleSheetRow, getGoogleSheetData } from "@/lib/sheets";
import { getSession } from "@/lib/session";

type ResourceRow = {
  title: string;
  description: string;
  link: string;
  course: string;
  uploadedBy: string;
  uploadedAt: string;
};

function normalizeResources(rows: Record<string, unknown>[]): ResourceRow[] {
  return rows
    .map((row) => ({
      title: String(row.Title ?? row.title ?? "").trim(),
      description: String(row.Description ?? row.description ?? "").trim(),
      link: String(row.Link ?? row.URL ?? row.ResourceURL ?? "").trim(),
      course: String(row.Course ?? row.Program ?? "").trim(),
      uploadedBy: String(row.UploadedBy ?? row.Author ?? "").trim(),
      uploadedAt: String(row.UploadedAt ?? row.Date ?? "").trim(),
    }))
    .filter((resource) => resource.title || resource.link);
}

export async function GET() {
  const session = await getSession();

  if (!session.isLoggedIn) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const rawRows = (await getGoogleSheetData("resources")) as Record<
      string,
      unknown
    >[];
    const resources = normalizeResources(rawRows);

    return NextResponse.json({ resources });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Could not fetch resources.";

    if (message.toLowerCase().includes("parse range")) {
      return NextResponse.json({ resources: [] });
    }

    return NextResponse.json(
      { message: "Could not fetch resources." },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  const session = await getSession();

  if (!session.isLoggedIn || session.userType !== "tutor") {
    return NextResponse.json(
      { message: "Only tutors can upload resources." },
      { status: 403 }
    );
  }

  try {
    const body = await req.json();
    const title = String(body.title ?? "").trim();
    const description = String(body.description ?? "").trim();
    const link = String(body.link ?? "").trim();
    const course = String(body.course ?? "").trim();

    if (!title || !link) {
      return NextResponse.json(
        { message: "Title and link are required." },
        { status: 400 }
      );
    }

    const uploadedAt = new Date().toISOString();
    await appendGoogleSheetRow("resources", [
      title,
      description,
      link,
      course,
      session.id,
      uploadedAt,
    ]);

    return NextResponse.json({ message: "Resource uploaded successfully." });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Could not upload resource.";

    if (message.toLowerCase().includes("parse range")) {
      return NextResponse.json(
        {
          message:
            "The resources sheet does not exist yet. Create a sheet tab named resources with headers: Title, Description, Link, Course, UploadedBy, UploadedAt.",
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { message: "Could not upload resource." },
      { status: 500 }
    );
  }
}
