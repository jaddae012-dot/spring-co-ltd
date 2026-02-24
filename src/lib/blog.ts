import { getBlogPosts as getNotionPosts, getPostBySlug as getNotionPostBySlug, getPageContent } from "@/lib/notion";
import { blogPosts as staticPosts, blogCategories as staticCategories } from "@/data/blog";
import type { BlogPost } from "@/data/blog";

// Check if Notion is configured
function isNotionConfigured(): boolean {
  return !!(process.env.NOTION_TOKEN && process.env.NOTION_DATABASE_ID);
}

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

// Get all blog posts — from Notion if configured, otherwise from static data
export async function getAllBlogPosts(): Promise<UnifiedBlogPost[]> {
  if (isNotionConfigured()) {
    try {
      const notionPosts = await getNotionPosts();
      // For listing, we don't need content
      return notionPosts.map((p) => ({
        id: p.id,
        slug: p.slug,
        title: p.title,
        excerpt: p.excerpt,
        content: [],
        category: p.category,
        author: p.author,
        date: p.date,
        readTime: p.readTime,
        image: p.image,
        featured: p.featured,
      }));
    } catch (e) {
      console.error("Notion fetch failed, falling back to static:", e);
    }
  }

  // Fallback to static data
  return staticPosts.map((p: BlogPost) => ({
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
  }));
}

// Get a single post by slug — from Notion if configured, otherwise static
export async function getBlogPostBySlug(slug: string): Promise<UnifiedBlogPost | null> {
  if (isNotionConfigured()) {
    try {
      const post = await getNotionPostBySlug(slug);
      if (post) {
        const content = await getPageContent(post.id);
        return {
          id: post.id,
          slug: post.slug,
          title: post.title,
          excerpt: post.excerpt,
          content,
          category: post.category,
          author: post.author,
          date: post.date,
          readTime: post.readTime,
          image: post.image,
          featured: post.featured,
        };
      }
    } catch (e) {
      console.error("Notion fetch failed, falling back to static:", e);
    }
  }

  // Fallback to static
  const staticPost = staticPosts.find((p: BlogPost) => p.slug === slug);
  if (!staticPost) return null;
  return {
    id: staticPost.slug,
    slug: staticPost.slug,
    title: staticPost.title,
    excerpt: staticPost.excerpt,
    content: staticPost.content,
    category: staticPost.category,
    author: staticPost.author,
    date: staticPost.date,
    readTime: staticPost.readTime,
    image: staticPost.image,
    featured: staticPost.featured || false,
  };
}

// Get categories
export async function getBlogCategories(): Promise<string[]> {
  if (isNotionConfigured()) {
    try {
      const posts = await getNotionPosts();
      const cats = new Set(posts.map((p) => p.category));
      return ["All", ...Array.from(cats)];
    } catch {
      // fall through
    }
  }
  return staticCategories;
}
