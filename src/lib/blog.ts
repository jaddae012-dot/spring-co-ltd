import fs from "fs";
import path from "path";
import { parseFrontmatter, markdownToParas } from "@/lib/markdown";

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

// Get all blog posts sorted by date (newest first)
export async function getAllBlogPosts(): Promise<UnifiedBlogPost[]> {
  const files = getMarkdownFiles();
  const posts = files
    .map(parsePost)
    .filter((p): p is UnifiedBlogPost => p !== null);

  return posts.sort(
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

