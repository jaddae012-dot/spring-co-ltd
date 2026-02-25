import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  const sheetId = process.env.GOOGLE_SHEET_ID || "";
  const info: Record<string, unknown> = {
    sheetIdSet: !!sheetId,
    sheetIdLength: sheetId.length,
    sheetIdFirst5: sheetId.slice(0, 5),
    timestamp: new Date().toISOString(),
  };

  if (!sheetId) {
    return NextResponse.json({ ...info, error: "GOOGLE_SHEET_ID not set" });
  }

  try {
    const url = `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?tqx=out:json&sheet=Sheet1`;
    const res = await fetch(url, { cache: "no-store" });
    info.fetchStatus = res.status;
    info.fetchOk = res.ok;

    const text = await res.text();
    info.responseLength = text.length;
    info.responseStart = text.slice(0, 200);

    // Try to parse
    const match = text.match(/setResponse\(([\s\S]+)\)/);
    info.regexMatched = !!match;

    if (match && match[1]) {
      const data = JSON.parse(match[1]);
      const rows = data?.table?.rows || [];
      const cols = data?.table?.cols || [];
      info.colCount = cols.length;
      info.rowCount = rows.length;
      info.colLabels = cols.map((c: { label: string }) => c.label);
      if (rows.length > 0) {
        info.firstRowCells = rows[0].c?.map(
          (cell: { v: unknown } | null) => cell?.v ?? null
        );
      }
    }
  } catch (err) {
    info.error = String(err);
  }

  return NextResponse.json(info);
}
