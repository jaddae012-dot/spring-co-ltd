// Google Sheets CMS — zero packages needed, just native fetch
// Team members add blog posts to a shared Google Sheet
// The website reads from it automatically

export interface SheetBlogPost {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  author: string;
  date: string;
  readTime: string;
  image: string;
  featured: boolean;
  published: boolean;
}

const SHEET_ID = process.env.NEXT_PUBLIC_GOOGLE_SHEET_ID || "";
const SHEET_NAME = "Posts"; // The tab/sheet name

function getSheetUrl(): string {
  return `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:json&sheet=${SHEET_NAME}`;
}

// Fetch blog posts from Google Sheets
export async function getSheetBlogPosts(): Promise<SheetBlogPost[]> {
  if (!SHEET_ID) return [];

  try {
    const res = await fetch(getSheetUrl(), {
      next: { revalidate: 60 }, // Cache for 60 seconds, then refresh
    });

    if (!res.ok) return [];

    const text = await res.text();

    // Google Sheets returns JSONP-like response, extract the JSON
    const jsonStr = text
      .replace(/^.*google\.visualization\.Query\.setResponse\(/, "")
      .replace(/\);?\s*$/, "");

    const data = JSON.parse(jsonStr);
    const rows = data?.table?.rows || [];
    const cols = data?.table?.cols || [];

    if (rows.length === 0) return [];

    // Map column labels to indices
    const colMap: Record<string, number> = {};
    cols.forEach((col: { label: string }, index: number) => {
      colMap[col.label?.toLowerCase()?.trim()] = index;
    });

    return rows
      .map((row: { c: ({ v: string | number | boolean | null } | null)[] }) => {
        const get = (key: string): string => {
          const idx = colMap[key];
          if (idx === undefined) return "";
          const cell = row.c?.[idx];
          return cell?.v?.toString() || "";
        };

        const getBool = (key: string): boolean => {
          const val = get(key).toLowerCase();
          return val === "true" || val === "yes" || val === "1";
        };

        return {
          slug: get("slug"),
          title: get("title"),
          excerpt: get("excerpt"),
          content: get("content"),
          category: get("category") || "Company News",
          author: get("author") || "SPRING.CO.LTD Team",
          date: get("date") || new Date().toISOString().split("T")[0],
          readTime: get("readtime") || "3 min read",
          image: get("image") || "📰",
          featured: getBool("featured"),
          published: getBool("published"),
        };
      })
      .filter(
        (post: SheetBlogPost) =>
          post.title && post.slug && post.published
      );
  } catch (error) {
    console.error("Failed to fetch from Google Sheets:", error);
    return [];
  }
}
