import { getAllBlogPosts, getBlogCategories } from "@/lib/blog";
import BlogPageClient from "@/components/BlogPageClient";

export default async function BlogPage() {
  const [posts, categories] = await Promise.all([
    getAllBlogPosts(),
    getBlogCategories(),
  ]);

  return <BlogPageClient posts={posts} categories={categories} />;
}
