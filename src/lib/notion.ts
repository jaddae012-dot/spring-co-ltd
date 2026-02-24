// Notion API helper — uses native fetch, no extra packages needed

const NOTION_API = "https://api.notion.com/v1";
const NOTION_VERSION = "2022-06-28";

function getHeaders() {
  const token = process.env.NOTION_TOKEN;
  if (!token) throw new Error("NOTION_TOKEN environment variable is not set");
  return {
    Authorization: `Bearer ${token}`,
    "Notion-Version": NOTION_VERSION,
    "Content-Type": "application/json",
  };
}

export interface NotionBlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  author: string;
  date: string;
  readTime: string;
  image: string;
  featured: boolean;
  published: boolean;
}

export interface NotionBlock {
  id: string;
  type: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function extractPlainText(richText: any[]): string {
  return richText?.map((t: { plain_text: string }) => t.plain_text).join("") || "";
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function extractProperty(prop: any): string {
  if (!prop) return "";
  switch (prop.type) {
    case "title":
      return extractPlainText(prop.title);
    case "rich_text":
      return extractPlainText(prop.rich_text);
    case "select":
      return prop.select?.name || "";
    case "date":
      return prop.date?.start || "";
    case "checkbox":
      return prop.checkbox ? "true" : "false";
    default:
      return "";
  }
}

export async function getBlogPosts(): Promise<NotionBlogPost[]> {
  const databaseId = process.env.NOTION_DATABASE_ID;
  if (!databaseId) throw new Error("NOTION_DATABASE_ID environment variable is not set");

  const res = await fetch(`${NOTION_API}/databases/${databaseId}/query`, {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify({
      filter: {
        property: "Published",
        checkbox: { equals: true },
      },
      sorts: [{ property: "Date", direction: "descending" }],
    }),
    next: { revalidate: 60 }, // Revalidate every 60 seconds
  });

  if (!res.ok) {
    console.error("Notion API error:", res.status, await res.text());
    return [];
  }

  const data = await res.json();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return data.results.map((page: any) => ({
    id: page.id,
    slug: extractProperty(page.properties.Slug) || page.id,
    title: extractProperty(page.properties.Title),
    excerpt: extractProperty(page.properties.Excerpt),
    category: extractProperty(page.properties.Category),
    author: extractProperty(page.properties.Author),
    date: extractProperty(page.properties.Date),
    readTime: extractProperty(page.properties.ReadTime) || "3 min read",
    image: extractProperty(page.properties.Image) || "📰",
    featured: page.properties.Featured?.checkbox || false,
    published: page.properties.Published?.checkbox || false,
  }));
}

export async function getPageContent(pageId: string): Promise<string[]> {
  const res = await fetch(`${NOTION_API}/blocks/${pageId}/children?page_size=100`, {
    headers: getHeaders(),
    next: { revalidate: 60 },
  });

  if (!res.ok) {
    console.error("Notion blocks error:", res.status, await res.text());
    return [];
  }

  const data = await res.json();
  const paragraphs: string[] = [];

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  for (const block of data.results as any[]) {
    if (block.type === "paragraph" && block.paragraph?.rich_text?.length > 0) {
      paragraphs.push(extractPlainText(block.paragraph.rich_text));
    } else if (block.type === "heading_1" && block.heading_1?.rich_text?.length > 0) {
      paragraphs.push(extractPlainText(block.heading_1.rich_text));
    } else if (block.type === "heading_2" && block.heading_2?.rich_text?.length > 0) {
      paragraphs.push(extractPlainText(block.heading_2.rich_text));
    } else if (block.type === "heading_3" && block.heading_3?.rich_text?.length > 0) {
      paragraphs.push(extractPlainText(block.heading_3.rich_text));
    } else if (block.type === "bulleted_list_item" && block.bulleted_list_item?.rich_text?.length > 0) {
      paragraphs.push("• " + extractPlainText(block.bulleted_list_item.rich_text));
    } else if (block.type === "numbered_list_item" && block.numbered_list_item?.rich_text?.length > 0) {
      paragraphs.push(extractPlainText(block.numbered_list_item.rich_text));
    }
  }

  return paragraphs;
}

export async function getPostBySlug(slug: string): Promise<NotionBlogPost | null> {
  const posts = await getBlogPosts();
  return posts.find((p) => p.slug === slug) || null;
}
