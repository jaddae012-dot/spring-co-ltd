import { blogPosts, blogCategories } from "@/data/blog";
import { getSheetBlogPosts } from "@/lib/sheets";
import type { BlogPost } from "@/data/blog";

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

function toUnified(p: BlogPost): UnifiedBlogPost {
  return {
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
    featured: p.featured || false,
  };
}

// Get all blog posts — from Google Sheets + static data, sorted newest first
export async function getAllBlogPosts(): Promise<UnifiedBlogPost[]> {
  // Get posts from Google Sheets (team posts from phone)
  const sheetPosts = await getSheetBlogPosts();

  // Convert Google Sheets posts to unified format
  const sheetUnified: UnifiedBlogPost[] = sheetPosts.map((p) => ({
    id: p.slug,
    slug: p.slug,
    title: p.title,
    excerpt: p.excerpt,
    // Split content by double newlines or use as single paragraph
    content: p.content
      ? p.content.split(/\n\n|\n/).filter((s) => s.trim())
      : [],
    category: p.category,
    author: p.author,
    date: p.date,
    readTime: p.readTime,
    image: p.image,
    featured: p.featured,
  }));

  // Combine: Google Sheets posts + static posts (Sheets posts take priority)
  const sheetSlugs = new Set(sheetUnified.map((p) => p.slug));
  const staticUnified = blogPosts
    .filter((p) => !sheetSlugs.has(p.slug))
    .map(toUnified);

  const allPosts = [...sheetUnified, ...staticUnified];

  // Sort by date, newest first
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

// Get all categories (static + any new ones from Sheets)
export async function getBlogCategories(): Promise<string[]> {
  const sheetPosts = await getSheetBlogPosts();
  const sheetCategories = sheetPosts.map((p) => p.category);
  const allCategories = new Set([...blogCategories, ...sheetCategories]);
  // Keep "All" at the front
  allCategories.delete("All");
  return ["All", ...Array.from(allCategories)];
}

