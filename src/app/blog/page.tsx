import { getAllBlogPosts, getBlogCategories } from "@/lib/blog";
import BlogPageClient from "@/components/BlogPageClient";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog — SPRING.CO.LTD",
  description:
    "News, insights, and updates from across the SPRING.CO.LTD family of companies.",
  openGraph: {
    title: "Blog — SPRING.CO.LTD",
    description:
      "News, insights, and updates from across the SPRING.CO.LTD family of companies.",
    url: "https://spring-co-ltd.vercel.app/blog",
    images: [
      {
        url: "/logos/SPRING.CO.LTD.png",
        width: 512,
        height: 512,
        alt: "SPRING.CO.LTD Blog",
      },
    ],
  },
};

// Always fetch fresh data (don't cache the page)
export const dynamic = "force-dynamic";

export default async function BlogPage() {
  const [posts, categories] = await Promise.all([
    getAllBlogPosts(),
    getBlogCategories(),
  ]);

  return <BlogPageClient posts={posts} categories={categories} />;
}
