"use client";

import { useState } from "react";

export default function ResourceUploadForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [link, setLink] = useState("");
  const [course, setCourse] = useState("");
  const [status, setStatus] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsLoading(true);
    setStatus("");

    try {
      const response = await fetch("/api/resources", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, description, link, course }),
      });

      const data = await response.json();

      if (!response.ok) {
        setStatus(data.message || "Upload failed.");
      } else {
        setStatus("Resource uploaded successfully.");
        setTitle("");
        setDescription("");
        setLink("");
        setCourse("");
      }
    } catch {
      setStatus("An unexpected error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <input
        value={title}
        onChange={(event) => setTitle(event.target.value)}
        placeholder="Resource title"
        className="w-full rounded-md bg-slate-800 border border-slate-700 px-3 py-2 text-sm"
        required
      />
      <input
        value={link}
        onChange={(event) => setLink(event.target.value)}
        placeholder="Resource link"
        className="w-full rounded-md bg-slate-800 border border-slate-700 px-3 py-2 text-sm"
        required
      />
      <input
        value={course}
        onChange={(event) => setCourse(event.target.value)}
        placeholder="Course or class (optional)"
        className="w-full rounded-md bg-slate-800 border border-slate-700 px-3 py-2 text-sm"
      />
      <textarea
        value={description}
        onChange={(event) => setDescription(event.target.value)}
        placeholder="Short description"
        className="w-full rounded-md bg-slate-800 border border-slate-700 px-3 py-2 text-sm min-h-20"
      />
      <button
        type="submit"
        disabled={isLoading}
        className="rounded-md bg-emerald-600 hover:bg-emerald-700 px-4 py-2 text-sm font-semibold disabled:opacity-50"
      >
        {isLoading ? "Uploading..." : "Upload Resource"}
      </button>
      {status ? <p className="text-xs text-slate-300">{status}</p> : null}
    </form>
  );
}
