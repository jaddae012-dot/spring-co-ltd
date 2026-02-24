// Google Sheets reader — reads blog posts submitted via Google Forms
// Zero packages needed, uses native fetch

export interface SheetBlogPost {
  slug: string;
  title: string;
  excerpt: string;
  content: string[];
  category: string;
  author: string;
  date: string;
  readTime: string;
  image: string;
  featured: boolean;
}

// Google Sheets public CSV URL
function getSheetCsvUrl(sheetId: string): string {
  return `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?tqx=out:json&sheet=Sheet1`;
}

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
export async function getSheetBlogPosts(sheetId: string): Promise<SheetBlogPost[]> {
  if (!sheetId) return [];

  try {
    const res = await fetch(getSheetCsvUrl(sheetId), {
      cache: "no-store", // Always fetch fresh data
    });

    if (!res.ok) {
      console.error("Google Sheets fetch failed:", res.status, res.statusText);
      return [];
    }

    const text = await res.text();

    // Google returns JSONP-like response, extract the JSON part
    const jsonStr = text
      .replace(/^.*google\.visualization\.Query\.setResponse\(/, "")
      .replace(/\);?\s*$/, "");

    const data = JSON.parse(jsonStr);
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
          author,
          date,
          readTime: estimateReadTime(contentRaw),
          image,
          featured: featured === "true" || featured === "yes",
        };
      })
      .filter((p: SheetBlogPost | null): p is SheetBlogPost => p !== null);
  } catch (error) {
    console.error("Failed to fetch from Google Sheets:", error);
    return [];
  }
}
