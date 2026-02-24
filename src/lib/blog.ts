import { blogPosts, blogCategories } from "@/data/blog";
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

// Get all blog posts sorted by date (newest first)
export async function getAllBlogPosts(): Promise<UnifiedBlogPost[]> {
  return blogPosts
    .map(toUnified)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

// Get a single post by slug
export async function getBlogPostBySlug(slug: string): Promise<UnifiedBlogPost | null> {
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) return null;
  return toUnified(post);
}

// Get all categories
export async function getBlogCategories(): Promise<string[]> {
  return blogCategories;
}

