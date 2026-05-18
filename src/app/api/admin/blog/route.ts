import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/session";
import { appendGoogleSheetRow } from "@/lib/sheets";

function normalize(value: unknown): string {
  return String(value ?? "").trim();
}

export async function POST(req: NextRequest) {
  const session = await getSession();

  if (!session.isLoggedIn || session.userType !== "admin") {
    return NextResponse.json(
      { message: "Only admins can publish blog posts." },
      { status: 403 }
    );
  }

  const blogSpreadsheetId =
    process.env.BLOG_GOOGLE_SHEET_ID || process.env.BLOG_GOOGLE_SPREADSHEET_ID || "";
  const blogSheetName = process.env.BLOG_GOOGLE_SHEET_NAME || "";

  if (!blogSpreadsheetId || !blogSheetName) {
    return NextResponse.json(
      {
        message:
          "Blog sheet is not configured. Set BLOG_GOOGLE_SHEET_ID and BLOG_GOOGLE_SHEET_NAME.",
      },
      { status: 500 }
    );
  }

  try {
    const body = await req.json();

    const title = normalize(body.title);
    const summary = normalize(body.summary ?? body.excerpt);
    const content = normalize(body.content);
    const category = normalize(body.category) || "Company News";
    const author = normalize(body.author) || session.name || session.id;
    const imageUrl = normalize(body.imageUrl ?? body.image);

    if (!title || !content) {
      return NextResponse.json(
        { message: "Title and content are required." },
        { status: 400 }
      );
    }

    const timestamp = new Date().toISOString();

    // Matches the typical Google Forms columns used by the blog reader:
    // Timestamp, TITE/Title, Summary, Content, Category, Author Name, Image URL
    await appendGoogleSheetRow(
      blogSheetName,
      [timestamp, title, summary, content, category, author, imageUrl],
      { spreadsheetId: blogSpreadsheetId }
    );

    return NextResponse.json({
      message: "Blog post published successfully.",
      post: {
        timestamp,
        title,
        summary,
        content,
        category,
        author,
        imageUrl,
      },
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Could not publish.";

    if (message.toLowerCase().includes("parse range")) {
      return NextResponse.json(
        {
          message:
            "The blog sheet tab does not exist or is not accessible. Confirm BLOG_GOOGLE_SHEET_NAME matches the exact tab name and the service account has edit access.",
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { message: "Could not publish blog post." },
      { status: 500 }
    );
  }
}
