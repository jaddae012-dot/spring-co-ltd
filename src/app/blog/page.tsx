import { getAllBlogPosts, getBlogCategories } from "@/lib/blog";
import BlogPageClient from "@/components/BlogPageClient";

// Always fetch fresh data (don't cache the page)
export const dynamic = "force-dynamic";

export default async function BlogPage() {
  const [posts, categories] = await Promise.all([
    getAllBlogPosts(),
    getBlogCategories(),
  ]);

  return <BlogPageClient posts={posts} categories={categories} />;
}
