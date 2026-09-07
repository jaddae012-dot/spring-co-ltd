import { NextRequest, NextResponse } from "next/server";
import PDFDocument from "pdfkit";
import { getSession } from "@/lib/session";
import { companyInfo } from "@/data/company";
import {
  businessProfileChapters,
  businessProfileJourneySteps,
  businessProfileSubsidiaryRows,
} from "@/lib/business-profile-report";
import type { SecretaryEntry } from "@/lib/company-secretary";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

interface PdfRequestBody {
  secretaryEntries?: SecretaryEntry[];
}

function safeEntries(entries: unknown): SecretaryEntry[] {
  if (!Array.isArray(entries)) return [];

  return entries
    .filter((entry): entry is SecretaryEntry => {
      return Boolean(
        entry &&
          typeof entry === "object" &&
          typeof entry.id === "string" &&
          typeof entry.title === "string" &&
          typeof entry.detail === "string" &&
          typeof entry.dateLabel === "string" &&
          typeof entry.timeLabel === "string"
      );
    })
    .slice(0, 30);
}

function drawWrappedText(doc: PDFKit.PDFDocument, text: string, options: PDFKit.Mixins.TextOptions & { indent?: number }) {
  const indent = options.indent ?? 0;
  doc.text(text, { ...options, indent });
}

function addSection(doc: PDFKit.PDFDocument, title: string, body: string) {
  doc.moveDown(0.8);
  doc.font("Helvetica-Bold").fontSize(14).fillColor("#0f172a").text(title, { continued: false });
  doc.moveDown(0.25);
  doc.font("Helvetica").fontSize(11).fillColor("#334155");
  drawWrappedText(doc, body, { lineGap: 4 });
}

function addBullet(doc: PDFKit.PDFDocument, text: string) {
  doc.font("Helvetica").fontSize(11).fillColor("#334155");
  doc.text(`• ${text}`, { indent: 14, lineGap: 4 });
}

export async function POST(req: NextRequest) {
  const session = await getSession();
  if (!session.isLoggedIn) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const body = (await req.json()) as PdfRequestBody;
  const secretaryEntries = safeEntries(body.secretaryEntries);
  const latestEntry = secretaryEntries[0];
  const now = new Date();

  const pdfBuffer = await new Promise<Buffer>((resolve, reject) => {
    const doc = new PDFDocument({
      size: "A4",
      margin: 48,
      bufferPages: true,
      info: {
        Title: `${companyInfo.name} Formal Business Profile`,
        Author: companyInfo.name,
        Subject: "Research-paper style company profile",
        Keywords: "company profile, business report, spring co ltd",
      },
    });

    const chunks: Buffer[] = [];
    doc.on("data", (chunk) => chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk)));
    doc.on("end", () => resolve(Buffer.concat(chunks)));
    doc.on("error", reject);

    doc.registerFont("Helvetica", undefined as never);

    const topTitle = `${companyInfo.name} — Formal Business Profile`;
    const documentSubtitle = companyInfo.tagline;

    doc.font("Helvetica-Bold").fontSize(20).fillColor("#0f172a").text(topTitle, {
      align: "center",
    });
    doc.moveDown(0.35);
    doc.font("Helvetica").fontSize(11).fillColor("#475569").text(documentSubtitle, {
      align: "center",
    });
    doc.moveDown(0.35);
    doc.font("Helvetica").fontSize(9).fillColor("#64748b").text(`Generated on ${now.toLocaleDateString("en-GH", { year: "numeric", month: "long", day: "numeric" })} at ${now.toLocaleTimeString("en-GH")}`, {
      align: "center",
    });

    doc.moveDown(1.2);
    doc.roundedRect(doc.x, doc.y, doc.page.width - 96, 74, 12).fillAndStroke("#f8fafc", "#cbd5e1");
    doc.fillColor("#0f172a").font("Helvetica-Bold").fontSize(11).text("Profile Snapshot", doc.x + 14, doc.y - 60);
    doc.font("Helvetica").fontSize(10).fillColor("#334155").text(
      `Founded: ${companyInfo.founded}    Headquarters: ${companyInfo.headquarters}    Email: ${companyInfo.email}    Phone: ${companyInfo.phone}`,
      doc.x + 14,
      doc.y - 44,
      {
        width: doc.page.width - 124,
      }
    );
    doc.moveDown(4.2);

    doc.font("Helvetica-Bold").fontSize(15).fillColor("#0f172a").text("Table of Contents");
    doc.moveDown(0.4);
    businessProfileChapters.forEach((chapter) => {
      doc.font("Helvetica").fontSize(10.5).fillColor("#334155").text(`${chapter.number} — ${chapter.title}`);
    });
    doc.moveDown(0.8);

    addSection(doc, "Abstract", businessProfileChapters[0].content);
    addSection(doc, "Introduction", businessProfileChapters[1].content);
    addSection(doc, "Company Background", businessProfileChapters[2].content);
    addSection(doc, "Business Model Analysis", businessProfileChapters[3].content);
    addSection(doc, "Organizational Structure", businessProfileChapters[4].content);
    addSection(doc, "Subsidiary Profile", businessProfileChapters[5].content);

    doc.moveDown(0.8);
    doc.font("Helvetica-Bold").fontSize(14).fillColor("#0f172a").text("Project Journey So Far");
    businessProfileJourneySteps.forEach((step) => {
      doc.moveDown(0.4);
      doc.font("Helvetica-Bold").fontSize(11).fillColor("#0f172a").text(step.title);
      doc.font("Helvetica").fontSize(10.5).fillColor("#334155").text(step.detail, { lineGap: 4 });
    });

    doc.moveDown(0.8);
    doc.font("Helvetica-Bold").fontSize(14).fillColor("#0f172a").text("Where We Are Now");
    doc.font("Helvetica").fontSize(10.5).fillColor("#334155").text(
      latestEntry
        ? `${latestEntry.dateLabel} at ${latestEntry.timeLabel}: ${latestEntry.title}. ${latestEntry.detail}`
        : "The secretary log is ready to begin recording company activity as the project continues to grow.",
      { lineGap: 4 }
    );

    addSection(doc, "Mission and Vision", businessProfileChapters[6].content);
    addSection(doc, "Core Values", businessProfileChapters[7].content);
    addSection(doc, "Future Outlook", businessProfileChapters[8].content);
    addSection(doc, "Conclusion", businessProfileChapters[9].content);

    doc.moveDown(0.8);
    doc.font("Helvetica-Bold").fontSize(14).fillColor("#0f172a").text("Secretary Log");
    doc.moveDown(0.25);
    if (secretaryEntries.length === 0) {
      doc.font("Helvetica").fontSize(10.5).fillColor("#334155").text("No secretary notes have been captured yet.");
    } else {
      secretaryEntries.forEach((entry) => {
        doc.moveDown(0.35);
        doc.font("Helvetica-Bold").fontSize(10.5).fillColor("#0f172a").text(`${entry.dateLabel} • ${entry.timeLabel} • ${entry.category}`);
        doc.font("Helvetica-Bold").fontSize(10.5).fillColor("#0f172a").text(entry.title);
        doc.font("Helvetica").fontSize(10).fillColor("#334155").text(entry.detail, { lineGap: 3 });
      });
    }

    doc.moveDown(0.8);
    doc.font("Helvetica-Bold").fontSize(14).fillColor("#0f172a").text("Subsidiary Table");
    doc.moveDown(0.3);
    businessProfileSubsidiaryRows.forEach(([name, focus]) => {
      doc.font("Helvetica-Bold").fontSize(10.5).fillColor("#0f172a").text(name);
      doc.font("Helvetica").fontSize(10.5).fillColor("#334155").text(focus, { indent: 12 });
      doc.moveDown(0.15);
    });

    doc.moveDown(0.8);
    doc.font("Helvetica-Bold").fontSize(14).fillColor("#0f172a").text("Contact Information");
    doc.font("Helvetica").fontSize(10.5).fillColor("#334155").text(
      `Headquarters: ${companyInfo.headquarters}\nAddress: ${companyInfo.address}\nEmail: ${companyInfo.email}\nPhone: ${companyInfo.phone}`,
      { lineGap: 4 }
    );

    doc.moveDown(0.8);
    doc.font("Helvetica-Oblique").fontSize(9.5).fillColor("#64748b").text(
      "This PDF is a formal internal company profile generated from the SPRING CO. LTD project record."
    );

    doc.end();
  });

  return new NextResponse(new Uint8Array(pdfBuffer), {
    status: 200,
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="SPRING-CO-LTD-Formal-Business-Profile.pdf"`,
      "Cache-Control": "no-store",
    },
  });
}
