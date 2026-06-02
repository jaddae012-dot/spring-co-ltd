// Google Sheets reader — reads blog posts submitted via Google Forms
// Zero packages needed, uses native fetch

export interface SheetBlogPost {
  slug: string;
  title: string;
  excerpt: string;
  content: string[];
  category: string;
  tags: string[];
  author: string;
  date: string;
  readTime: string;
  image: string;
  featured: boolean;
}

// Google Sheets public CSV URL
function getSheetCsvUrl(sheetId: string, sheetName: string): string {
  return `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?tqx=out:json&sheet=${encodeURIComponent(sheetName)}`;
}

// Fetch timeout (ms) for public Google Sheets JSON endpoint. Configurable via env var.
const SHEET_FETCH_TIMEOUT_MS = Number(process.env.SHEET_FETCH_TIMEOUT_MS) || 30000;

// Create a URL-friendly slug from a title
function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

// Estimate read time from content
function estimateReadTime(text: string): string {
  const words = text.split(/\s+/).length;
  const mins = Math.max(1, Math.ceil(words / 200));
  return `${mins} min read`;
}

// Fetch and parse blog posts from Google Sheets
export async function getSheetBlogPosts(
  sheetId: string,
  options?: { sheetName?: string }
): Promise<SheetBlogPost[]> {
  if (!sheetId) return [];
  const sheetName = options?.sheetName || "Sheet1";

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), SHEET_FETCH_TIMEOUT_MS);

    const res = await fetch(getSheetCsvUrl(sheetId, sheetName), {
      cache: "no-store", // Always fetch fresh data
      signal: controller.signal,
    });

    clearTimeout(timeout);

    if (!res.ok) {
      console.error("Google Sheets fetch failed:", res.status, res.statusText);
      return [];
    }

    const text = await res.text();

    // Google returns JSONP-like response: /*O_o*/\ngoogle.visualization.Query.setResponse({...});
    // Extract just the JSON object inside setResponse(...)
    const match = text.match(/setResponse\(([\s\S]+)\)/);
    if (!match || !match[1]) {
      console.error("Could not parse Google Sheets response");
      return [];
    }

    const data = JSON.parse(match[1]);
    const rows = data?.table?.rows || [];
    const cols = data?.table?.cols || [];

    if (rows.length === 0) return [];

    // Google Forms puts headers in the first data row, not in col labels
    // Check if col labels are empty — if so, use first row as headers
    const hasLabels = cols.some(
      (col: { label: string }) => col.label?.trim()?.length > 0
    );

    const colMap: Record<string, number> = {};

    if (hasLabels) {
      // Labels exist in cols — strip all whitespace/newlines
      cols.forEach((col: { label: string }, index: number) => {
        const label = col.label?.replace(/[\n\r\s]+/g, " ")?.trim()?.toLowerCase();
        if (label) colMap[label] = index;
      });
    } else if (rows.length > 0) {
      // Use first row as headers
      const headerRow = rows[0];
      headerRow.c?.forEach(
        (cell: { v: string | null } | null, index: number) => {
          const label = cell?.v?.toString()?.toLowerCase()?.trim();
          if (label) colMap[label] = index;
        }
      );
      // Remove header row from data
      rows.splice(0, 1);
    }

    if (rows.length === 0) return [];

    return rows
      .map((row: { c: ({ v: string | number | boolean | null } | null)[] }) => {
        const get = (key: string): string => {
          // Try exact match first, then partial match
          let idx = colMap[key];
          if (idx === undefined) {
            // Try finding a key that contains or matches
            const match = Object.keys(colMap).find((k) => k.includes(key) || key.includes(k));
            if (match) idx = colMap[match];
          }
          if (idx === undefined) return "";
          const cell = row.c?.[idx];
          if (!cell || cell.v === null || cell.v === undefined) return "";
          return cell.v.toString().trim();
        };

        const title = get("title") || get("tite");
        if (!title) return null;

        const contentRaw = get("content") || get("blog content") || get("\n\ncontent");
        const content = contentRaw
          ? contentRaw.split(/\n\n+|\n/).filter((s) => s.trim())
          : [];

        const category = get("category") || "Company News";
        const tags = (get("tags") || get("tag") || "")
          .split(",")
          .map((tag) => tag.trim())
          .filter(Boolean);
        const author = get("author") || get("author name") || "SPRING.CO.LTD Team";
        const image = get("image") || get("image url") || "📰";
        const excerpt = get("excerpt") || get("summary") || get("\n\nsummary") || (contentRaw.length > 0 ? contentRaw.slice(0, 150) + "..." : "");

        // Handle date from Google Forms timestamp or manual date
        let date = get("date") || get("timestamp") || "";
        // Google Sheets returns dates as "Date(YYYY,M,D,H,M,S)" — parse it
        const dateMatch = date.match(/Date\((\d+),(\d+),(\d+)/);
        if (dateMatch) {
          const year = dateMatch[1];
          const month = String(Number(dateMatch[2]) + 1).padStart(2, "0"); // months are 0-indexed
          const day = dateMatch[3].padStart(2, "0");
          date = `${year}-${month}-${day}`;
        } else if (date.includes("/")) {
          // Convert MM/DD/YYYY or similar to YYYY-MM-DD
          const d = new Date(date);
          if (!isNaN(d.getTime())) {
            date = d.toISOString().split("T")[0];
          }
        }
        if (!date) date = new Date().toISOString().split("T")[0];

        const featured = get("featured").toLowerCase();

        return {
          slug: slugify(title),
          title,
          excerpt,
          content,
          category,
          tags,
          author,
          date,
          readTime: estimateReadTime(contentRaw),
          image,
          featured: featured === "true" || featured === "yes",
        };
      })
      .filter((p: SheetBlogPost | null): p is SheetBlogPost => p !== null);
  } catch (error) {
    if (error instanceof Error && error.name === "AbortError") {
      console.error("Google Sheets fetch timed out");
      return [];
    }
    console.error("Failed to fetch from Google Sheets:", error);
    return [];
  }
}

// Carousel photo type
export interface CarouselPhoto {
  src: string;
  caption: string;
  alt: string;
}

// Fetch carousel photos from Google Sheets
export async function getCarouselPhotosFromSheet(
  sheetId: string,
  options?: { sheetName?: string }
): Promise<CarouselPhoto[]> {
  if (!sheetId) return [];
  const sheetName = options?.sheetName || "Carousel";

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), SHEET_FETCH_TIMEOUT_MS);

    const res = await fetch(getSheetCsvUrl(sheetId, sheetName), {
      cache: "no-store",
      signal: controller.signal,
    });

    clearTimeout(timeout);

    if (!res.ok) {
      console.error("Google Sheets fetch failed:", res.status, res.statusText);
      return [];
    }

    const text = await res.text();
    const match = text.match(/setResponse\(([\s\S]+)\)/);
    if (!match || !match[1]) {
      console.error("Could not parse Google Sheets response");
      return [];
    }

    const data = JSON.parse(match[1]);
    const rows = data?.table?.rows || [];
    const cols = data?.table?.cols || [];

    if (rows.length === 0) return [];

    const hasLabels = cols.some(
      (col: { label: string }) => col.label?.trim()?.length > 0
    );

    const colMap: Record<string, number> = {};

    if (hasLabels) {
      cols.forEach((col: { label: string }, index: number) => {
        const label = col.label?.replace(/[\n\r\s]+/g, " ")?.trim()?.toLowerCase();
        if (label) colMap[label] = index;
      });
    } else if (rows.length > 0) {
      const headerRow = rows[0];
      headerRow.c?.forEach(
        (cell: { v: string | null } | null, index: number) => {
          const label = cell?.v?.toString()?.toLowerCase()?.trim();
          if (label) colMap[label] = index;
        }
      );
      rows.splice(0, 1);
    }

    if (rows.length === 0) return [];

    return rows
      .map((row: { c: ({ v: string | number | boolean | null } | null)[] }) => {
        const get = (key: string): string => {
          let idx = colMap[key];
          if (idx === undefined) {
            const match = Object.keys(colMap).find((k) => k.includes(key) || key.includes(k));
            if (match) idx = colMap[match];
          }
          if (idx === undefined) return "";
          const cell = row.c?.[idx];
          if (!cell || cell.v === null || cell.v === undefined) return "";
          return cell.v.toString().trim();
        };

        const src = get("image") || get("image url") || get("photo url") || "";
        const caption = get("caption") || get("title") || "";
        const alt = get("alt") || caption || "Carousel photo";

        if (!src || !caption) return null;

        return { src, caption, alt };
      })
      .filter((p: CarouselPhoto | null): p is CarouselPhoto => p !== null);
  } catch (error) {
    if (error instanceof Error && error.name === "AbortError") {
      console.error("Google Sheets fetch timed out");
      return [];
    }
    console.error("Failed to fetch carousel photos from Google Sheets:", error);
    return [];
  }
}

import { google } from "googleapis";

const SPREADSHEET_ID =
  process.env.GOOGLE_SHEET_ID || process.env.GOOGLE_SPREADSHEETS_ID || "";

const SHEET_CACHE_TTL_MS = 60 * 1000;

type SheetCacheEntry = {
  expiresAt: number;
  data: Array<{ [key: string]: any }>;
};

const sheetDataCache = new Map<string, SheetCacheEntry>();

type GoogleSheetsScope = "read" | "write";

// Helper to wrap a promise with a timeout. Rejects with name 'TimeoutError' on timeout.
function withTimeout<T>(promise: Promise<T>, ms: number = SHEET_FETCH_TIMEOUT_MS, label?: string): Promise<T> {
  let timer: ReturnType<typeof setTimeout>;
  return new Promise<T>((resolve, reject) => {
    timer = setTimeout(() => {
      const err = new Error(`${label || 'Operation'} timed out after ${ms}ms`);
      err.name = 'TimeoutError';
      reject(err);
    }, ms);

    promise
      .then((v) => {
        clearTimeout(timer);
        resolve(v);
      })
      .catch((e) => {
        clearTimeout(timer);
        reject(e);
      });
  });
}

function sleep(ms: number) {
  return new Promise((res) => setTimeout(res, ms));
}

// Simple retry helper with exponential backoff. Retries on any error.
async function retry<T>(fn: () => Promise<T>, attempts = 2, initialDelay = 500): Promise<T> {
  let delay = initialDelay;
  for (let i = 0; i < attempts; i++) {
    try {
      if (i > 0) console.warn(`Retry attempt ${i + 1}/${attempts} after ${delay}ms`);
      return await fn();
    } catch (err) {
      if (i === attempts - 1) throw err;
      await sleep(delay);
      delay *= 2;
    }
  }
  // Should never reach here
  throw new Error("Retry exhausted");
}

async function getGoogleSheetsClient(scope: GoogleSheetsScope) {
  const auth = new google.auth.GoogleAuth({
    credentials: {
      client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
    },
    scopes:
      scope === "write"
        ? ["https://www.googleapis.com/auth/spreadsheets"]
        : ["https://www.googleapis.com/auth/spreadsheets.readonly"],
  });

  return google.sheets({ version: "v4", auth });
}

export async function getGoogleSheetData(sheetName: string) {
  const cached = sheetDataCache.get(sheetName);
  if (cached && cached.expiresAt > Date.now()) {
    return cached.data;
  }

  try {
    const sheets = await getGoogleSheetsClient("read");
    const response = await withTimeout(
      sheets.spreadsheets.values.get({
        spreadsheetId: SPREADSHEET_ID,
        range: sheetName,
      }),
      SHEET_FETCH_TIMEOUT_MS,
      `Google Sheets API (${sheetName})`
    );

    const rows = response.data.values;
    if (rows && rows.length) {
      const headers = rows[0];
      const mappedRows = rows.slice(1).map((row) => {
        const rowData: { [key: string]: any } = {};
        headers.forEach((header, index) => {
          rowData[header] = row[index];
        });
        return rowData;
      });

      sheetDataCache.set(sheetName, {
        expiresAt: Date.now() + SHEET_CACHE_TTL_MS,
        data: mappedRows,
      });

      return mappedRows;
    }

    sheetDataCache.set(sheetName, {
      expiresAt: Date.now() + SHEET_CACHE_TTL_MS,
      data: [],
    });

    return [];
  } catch (error) {
    console.error("Error fetching Google Sheet data:", error);
    // On timeout, return cached data if available to avoid hard failures
    if (error instanceof Error && error.name === 'TimeoutError') {
      const cachedFallback = sheetDataCache.get(sheetName);
      if (cachedFallback) {
        console.warn(`Returning cached data for sheet ${sheetName} after timeout`);
        return cachedFallback.data;
      }
      throw new Error('Google Sheets API request timed out');
    }

    throw new Error("Could not fetch sheet data.");
  }
}

export async function appendGoogleSheetRow(
  sheetName: string,
  row: string[],
  options?: { spreadsheetId?: string }
) {
  try {
    const sheets = await getGoogleSheetsClient("write");
    const spreadsheetId = options?.spreadsheetId || SPREADSHEET_ID;

    if (!spreadsheetId) {
      throw new Error("Missing spreadsheet ID.");
    }

    await retry(() =>
      withTimeout(
        sheets.spreadsheets.values.append({
          spreadsheetId,
          range: `${sheetName}!A1`,
          valueInputOption: "USER_ENTERED",
          insertDataOption: "INSERT_ROWS",
          requestBody: {
            values: [row],
          },
        }),
        SHEET_FETCH_TIMEOUT_MS,
        `Google Sheets API append (${sheetName})`
      ),
      3,
      700
    );

    sheetDataCache.delete(sheetName);
  } catch (error) {
    console.error(`Error appending Google Sheet row to ${sheetName}:`, error);
    // Rethrow the original error so calling code / logs include the real failure reason
    throw error instanceof Error ? error : new Error("Could not save sheet data.");
  }
}
