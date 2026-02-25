import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllBlogPosts, getBlogPostBySlug } from "@/lib/blog";
import ShareButtons from "@/components/ShareButtons";
import type { Metadata } from "next";

function isImageUrl(str: string): boolean {
  return str.startsWith("http://") || str.startsWith("https://");
}

// Allow dynamic slugs from Google Forms posts
export const dynamic = "force-dynamic";
export const dynamicParams = true;

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);
  if (!post) return { title: "Post Not Found" };

  const url = `https://spring-co-ltd.vercel.app/blog/${slug}`;
  const hasImage = post.image.startsWith("http://") || post.image.startsWith("https://");
  const fallbackImage = "https://spring-co-ltd.vercel.app/logos/SPRING.CO.LTD.png";
  const imageUrl = hasImage ? post.image : fallbackImage;

  return {
    title: `${post.title} — SPRING.CO.LTD Blog`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url,
      siteName: "SPRING.CO.LTD",
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
      type: "article",
      publishedTime: post.date,
      authors: [post.author],
    },
    twitter: {
      card: hasImage ? "summary_large_image" : "summary",
      title: post.title,
      description: post.excerpt,
      images: [imageUrl],
    },
  };
}

export async function generateStaticParams() {
  const posts = await getAllBlogPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);

  if (!post) notFound();

  // Find related posts (same category, exclude current)
  const allPosts = await getAllBlogPosts();
  const relatedPosts = allPosts
    .filter((p) => p.category === post.category && p.slug !== post.slug)
    .slice(0, 3);

  return (
    <div className="pt-24">
      <article className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-gray-500 mb-8">
            <Link href="/" className="hover:text-green-400 transition-colors">Home</Link>
            <span>/</span>
            <Link href="/blog" className="hover:text-green-400 transition-colors">Blog</Link>
            <span>/</span>
            <span className="text-gray-400 truncate">{post.title}</span>
          </div>

          {/* Header */}
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <span className="px-3 py-1 rounded-full bg-green-500/10 text-green-400 text-sm font-medium">
                {post.category}
              </span>
              <span className="text-gray-500 text-sm">{post.readTime}</span>
            </div>
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">
              {post.title}
            </h1>
            <div className="flex items-center gap-4 text-sm text-gray-400">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center text-green-400 text-sm font-bold">
                  {post.author[0]}
                </div>
                <span>{post.author}</span>
              </div>
              <span>·</span>
              <span>{post.date}</span>
            </div>
          </div>

          {/* Featured Image */}
          {isImageUrl(post.image) ? (
            <div className="relative rounded-2xl overflow-hidden h-64 md:h-96 mb-12">
              <Image src={post.image} alt={post.title} fill className="object-cover" />
            </div>
          ) : (
            <div className="glass rounded-2xl h-64 md:h-80 flex items-center justify-center text-8xl mb-12">
              {post.image}
            </div>
          )}

          {/* Content */}
          <div className="space-y-6 mb-16">
            {post.content.map((paragraph, i) => (
              <p key={i} className="text-gray-300 text-lg leading-relaxed">
                {paragraph}
              </p>
            ))}
          </div>

          {/* Share & Category */}
          <div className="glass rounded-2xl p-6 flex flex-col gap-5 mb-16">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <span className="text-gray-400 text-sm">Category:</span>
                <span className="px-3 py-1 rounded-full bg-green-500/10 text-green-400 text-sm">
                  {post.category}
                </span>
              </div>
              <Link
                href="/blog"
                className="text-green-400 hover:text-green-300 text-sm font-semibold transition-colors"
              >
                ← Back to All Posts
              </Link>
            </div>
            <div className="border-t border-white/10 pt-5">
              <ShareButtons title={post.title} slug={post.slug} />
            </div>
          </div>

          {/* Related Posts */}
          {relatedPosts.length > 0 && (
            <div>
              <h2 className="text-2xl font-bold text-white mb-6">Related Posts</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {relatedPosts.map((related) => (
                  <Link key={related.slug} href={`/blog/${related.slug}`}>
                    <div className="glass rounded-2xl p-6 hover:bg-white/10 transition-colors duration-200 group">
                      {isImageUrl(related.image) ? (
                        <div className="relative w-full h-24 rounded-lg overflow-hidden mb-4">
                          <Image src={related.image} alt={related.title} fill className="object-cover" />
                        </div>
                      ) : (
                        <div className="text-4xl mb-4">{related.image}</div>
                      )}
                      <h3 className="text-white font-semibold mb-2 group-hover:text-green-400 transition-colors text-sm">
                        {related.title}
                      </h3>
                      <p className="text-gray-500 text-xs">{related.date}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </article>
    </div>
  );
}
