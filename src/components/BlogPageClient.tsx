"use client";

import Link from "next/link";
import { useState } from "react";
import type { UnifiedBlogPost } from "@/lib/blog";

interface BlogPageClientProps {
  posts: UnifiedBlogPost[];
  categories: string[];
}

export default function BlogPageClient({ posts, categories }: BlogPageClientProps) {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredPosts =
    activeCategory === "All"
      ? posts
      : posts.filter((post) => post.category === activeCategory);

  const featuredPost = posts.find((post) => post.featured);

  return (
    <div className="pt-24">
      {/* Hero */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-12">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Our <span className="text-green-400">Blog</span>
            </h1>
            <p className="text-gray-400 text-lg">
              News, insights, and updates from across the SPRING.CO.LTD family
              of companies.
            </p>
          </div>

          {/* Featured Post */}
          {featuredPost && (
            <Link href={`/blog/${featuredPost.slug}`} className="block mb-16">
              <div className="glass rounded-2xl p-8 md:p-12 hover:bg-white/10 transition-colors duration-200 relative overflow-hidden group">
                <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-green-500/20 text-green-300 text-xs font-semibold">
                  Featured
                </div>
                <div className="flex flex-col md:flex-row gap-8 items-center">
                  <div className="text-7xl md:text-8xl">{featuredPost.image}</div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="px-3 py-1 rounded-full bg-green-500/10 text-green-400 text-xs font-medium">
                        {featuredPost.category}
                      </span>
                      <span className="text-gray-500 text-sm">{featuredPost.date}</span>
                      <span className="text-gray-500 text-sm">· {featuredPost.readTime}</span>
                    </div>
                    <h2 className="text-2xl md:text-3xl font-bold text-white mb-3 group-hover:text-green-400 transition-colors">
                      {featuredPost.title}
                    </h2>
                    <p className="text-gray-400 leading-relaxed mb-4">{featuredPost.excerpt}</p>
                    <span className="text-green-400 font-semibold text-sm">
                      Read Article →
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          )}

          {/* Category Filter */}
          <div className="flex flex-wrap gap-2 mb-10">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${
                  activeCategory === cat
                    ? "bg-green-500 text-white"
                    : "glass text-gray-300 hover:text-white hover:bg-white/10"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Blog Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPosts.map((post) => (
              <Link key={post.slug} href={`/blog/${post.slug}`}>
                <article className="glass rounded-2xl overflow-hidden hover:bg-white/10 transition-colors duration-200 group h-full flex flex-col">
                  <div className="h-48 flex items-center justify-center bg-gradient-to-br from-white/5 to-white/0 text-6xl">
                    {post.image}
                  </div>
                  <div className="p-6 flex-1 flex flex-col">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="px-2.5 py-1 rounded-full bg-green-500/10 text-green-400 text-xs font-medium">
                        {post.category}
                      </span>
                      <span className="text-gray-500 text-xs">{post.readTime}</span>
                    </div>
                    <h3 className="text-lg font-bold text-white mb-2 group-hover:text-green-400 transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-gray-400 text-sm leading-relaxed flex-1">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center justify-between mt-4 pt-4 border-t border-white/5">
                      <span className="text-gray-500 text-xs">{post.date}</span>
                      <span className="text-gray-500 text-xs">{post.author}</span>
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>

          {filteredPosts.length === 0 && (
            <div className="text-center py-20">
              <p className="text-gray-500 text-lg">No posts found in this category.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
