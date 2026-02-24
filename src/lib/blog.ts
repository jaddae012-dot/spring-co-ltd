import fs from "fs";
import path from "path";
import { parseFrontmatter, markdownToParas } from "@/lib/markdown";
import { getSheetBlogPosts } from "@/lib/sheets";

export interface UnifiedBlogPost {
  id: string;
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

const BLOG_DIR = path.join(process.cwd(), "content", "blog");
const SHEET_ID = process.env.GOOGLE_SHEET_ID || "";

// Read all markdown files from content/blog/
function getMarkdownFiles(): string[] {
  if (!fs.existsSync(BLOG_DIR)) return [];
  return fs
    .readdirSync(BLOG_DIR)
    .filter((f) => f.endsWith(".md"))
    .map((f) => path.join(BLOG_DIR, f));
}

// Parse a single markdown file into a blog post
function parsePost(filePath: string): UnifiedBlogPost | null {
  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = parseFrontmatter(raw);

  if (!data.title) return null;

  const slug =
    data.slug ||
    path.basename(filePath, ".md");

  return {
    id: slug,
    slug,
    title: data.title || "Untitled",
    excerpt: data.excerpt || "",
    content: markdownToParas(content),
    category: data.category || "Company News",
    author: data.author || "SPRING.CO.LTD Team",
    date: data.date || new Date().toISOString().split("T")[0],
    readTime: data.readTime || "3 min read",
    image: data.image || "📰",
    featured: data.featured === "true",
  };
}

// Get all blog posts: Google Forms (via Sheet) + Markdown files, newest first
export async function getAllBlogPosts(): Promise<UnifiedBlogPost[]> {
  // 1. Get posts from Google Sheets (submitted via Google Forms)
  const sheetPosts = await getSheetBlogPosts(SHEET_ID);
  const formPosts: UnifiedBlogPost[] = sheetPosts.map((p) => ({
    id: p.slug,
    slug: p.slug,
    title: p.title,
    excerpt: p.excerpt,
    content: p.content,
    category: p.category,
    author: p.author,
    date: p.date,
    readTime: p.readTime,
    image: p.image,
    featured: p.featured,
  }));

  // 2. Get posts from Markdown files
  const files = getMarkdownFiles();
  const mdPosts = files
    .map(parsePost)
    .filter((p): p is UnifiedBlogPost => p !== null);

  // 3. Combine (Form posts override MD posts with same slug)
  const formSlugs = new Set(formPosts.map((p) => p.slug));
  const uniqueMdPosts = mdPosts.filter((p) => !formSlugs.has(p.slug));
  const allPosts = [...formPosts, ...uniqueMdPosts];

  return allPosts.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

// Get a single post by slug
export async function getBlogPostBySlug(
  slug: string
): Promise<UnifiedBlogPost | null> {
  const allPosts = await getAllBlogPosts();
  return allPosts.find((p) => p.slug === slug) || null;
}

// Get all categories
export async function getBlogCategories(): Promise<string[]> {
  const posts = await getAllBlogPosts();
  const cats = new Set(posts.map((p) => p.category));
  return ["All", ...Array.from(cats)];
}

