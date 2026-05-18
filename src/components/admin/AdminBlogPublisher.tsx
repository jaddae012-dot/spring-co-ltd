"use client";

import { useMemo, useState } from "react";

type Props = {
  defaultAuthor: string;
};

type PublishState =
  | { status: "idle" }
  | { status: "loading" }
  | { status: "success"; message: string }
  | { status: "error"; message: string };

function normalize(value: string): string {
  return value.trim();
}

export default function AdminBlogPublisher({ defaultAuthor }: Props) {
  const categories = useMemo(
    () => ["Company News", "Prime College", "Agritech", "Fastrider", "Fast Cleaners"],
    []
  );

  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState(categories[0] ?? "Company News");
  const [author, setAuthor] = useState(defaultAuthor);
  const [imageUrl, setImageUrl] = useState("");
  const [publishState, setPublishState] = useState<PublishState>({
    status: "idle",
  });

  const isLoading = publishState.status === "loading";

  async function handlePublish(e: React.FormEvent) {
    e.preventDefault();
    setPublishState({ status: "loading" });

    try {
      const res = await fetch("/api/admin/blog", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: normalize(title),
          summary: normalize(summary),
          content: normalize(content),
          category: normalize(category),
          author: normalize(author),
          imageUrl: normalize(imageUrl),
        }),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        setPublishState({
          status: "error",
          message: String(data?.message ?? "Publish failed."),
        });
        return;
      }

      setPublishState({
        status: "success",
        message: String(data?.message ?? "Published."),
      });

      setTitle("");
      setSummary("");
      setContent("");
      setImageUrl("");
    } catch {
      setPublishState({
        status: "error",
        message: "Network error. Please try again.",
      });
    }
  }

  return (
    <div>
      <p className="text-sm text-slate-400">
        Publishes directly to the configured blog Google Sheet.
      </p>

      <form className="mt-6 space-y-5" onSubmit={handlePublish}>
        {publishState.status === "error" ? (
          <div className="rounded-lg border border-rose-500/30 bg-rose-500/10 p-3 text-sm text-rose-200">
            {publishState.message}
          </div>
        ) : null}

        {publishState.status === "success" ? (
          <div className="rounded-lg border border-emerald-500/30 bg-emerald-500/10 p-3 text-sm text-emerald-200">
            {publishState.message}
          </div>
        ) : null}

        <div>
          <label className="text-sm font-medium text-slate-300" htmlFor="title">
            Title
          </label>
          <input
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            disabled={isLoading}
            className="mt-1 block w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500"
            placeholder="Post title"
          />
        </div>

        <div>
          <label
            className="text-sm font-medium text-slate-300"
            htmlFor="summary"
          >
            Summary
          </label>
          <textarea
            id="summary"
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
            disabled={isLoading}
            className="mt-1 block w-full min-h-24 rounded-lg border border-slate-700 bg-slate-800 px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500"
            placeholder="Short excerpt shown on the blog list"
          />
        </div>

        <div>
          <label
            className="text-sm font-medium text-slate-300"
            htmlFor="content"
          >
            Content
          </label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
            disabled={isLoading}
            className="mt-1 block w-full min-h-56 rounded-lg border border-slate-700 bg-slate-800 px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500"
            placeholder="Write the post content. Use paragraphs separated by blank lines."
          />
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <div>
            <label
              className="text-sm font-medium text-slate-300"
              htmlFor="category"
            >
              Category
            </label>
            <select
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              disabled={isLoading}
              className="mt-1 block w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
            >
              {categories.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label
              className="text-sm font-medium text-slate-300"
              htmlFor="author"
            >
              Author
            </label>
            <input
              id="author"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              disabled={isLoading}
              className="mt-1 block w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500"
              placeholder="Author name"
            />
          </div>
        </div>

        <div>
          <label
            className="text-sm font-medium text-slate-300"
            htmlFor="imageUrl"
          >
            Image URL (optional)
          </label>
          <input
            id="imageUrl"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            disabled={isLoading}
            className="mt-1 block w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500"
            placeholder="https://... or /logos/..."
          />
          <p className="mt-2 text-xs text-slate-500">
            Tip: you can use a local path like /logos/prime-college/resources/... if it exists in public/.
          </p>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full rounded-lg bg-cyan-500 px-8 py-3 text-lg font-semibold text-slate-950 transition-colors duration-200 hover:bg-cyan-400 disabled:opacity-50"
        >
          {isLoading ? "Publishing..." : "Publish"}
        </button>
      </form>
    </div>
  );
}
