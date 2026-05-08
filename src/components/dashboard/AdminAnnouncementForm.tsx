"use client";

import { FormEvent, useMemo, useState } from "react";

type TargetType = "audience" | "program" | "studentId" | "email";

type AnnouncementPreview = {
  title: string;
  message: string;
  date: string;
  author: string;
  audience: string;
  program: string;
  studentId: string;
  email: string;
  href: string;
};

type AdminAnnouncementFormProps = {
  authorName?: string;
};

function getTodayDate(): string {
  return new Date().toISOString().slice(0, 10);
}

export default function AdminAnnouncementForm({
  authorName = "",
}: AdminAnnouncementFormProps) {
  const [targetType, setTargetType] = useState<TargetType>("audience");
  const [targetValue, setTargetValue] = useState("All");
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [date, setDate] = useState(getTodayDate());
  const [author, setAuthor] = useState(authorName);
  const [href, setHref] = useState("");
  const [statusMessage, setStatusMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [latestAnnouncement, setLatestAnnouncement] =
    useState<AnnouncementPreview | null>(null);

  const targetLabel = useMemo(() => {
    if (targetType === "audience") return "Audience";
    if (targetType === "program") return "Program";
    if (targetType === "studentId") return "Student ID";
    return "Student Email";
  }, [targetType]);

  function updateTargetType(nextType: TargetType) {
    setTargetType(nextType);
    if (nextType === "audience") setTargetValue("All");
    else setTargetValue("");
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatusMessage("");
    setErrorMessage("");

    const cleanTarget = targetValue.trim();
    const body = {
      studentId: targetType === "studentId" ? cleanTarget : "",
      email: targetType === "email" ? cleanTarget : "",
      program: targetType === "program" ? cleanTarget : "",
      audience: targetType === "audience" ? cleanTarget : "",
      title: title.trim(),
      message: message.trim(),
      date: date.trim(),
      author: author.trim(),
      href: href.trim(),
    };

    setIsSaving(true);
    try {
      const response = await fetch("/api/admin/announcements", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const data = await response.json();

      if (!response.ok) {
        setErrorMessage(data.message || "Could not publish announcement.");
        return;
      }

      setStatusMessage("Announcement published to the student dashboard.");
      setLatestAnnouncement(data.announcement);
      setTitle("");
      setMessage("");
      setHref("");
      setDate(getTodayDate());
      if (targetType !== "audience") setTargetValue("");
    } catch {
      setErrorMessage("Network error while publishing announcement.");
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid gap-3 md:grid-cols-2">
          <div>
            <label htmlFor="targetType" className="mb-1 block text-sm text-slate-300">
              Show To
            </label>
            <select
              id="targetType"
              value={targetType}
              onChange={(event) => updateTargetType(event.target.value as TargetType)}
              className="w-full rounded-md border border-slate-700 bg-slate-800 px-3 py-2.5 text-sm text-slate-100"
            >
              <option value="audience">All students</option>
              <option value="program">One program</option>
              <option value="studentId">One student ID</option>
              <option value="email">One student email</option>
            </select>
          </div>

          <div>
            <label htmlFor="targetValue" className="mb-1 block text-sm text-slate-300">
              {targetLabel}
            </label>
            <input
              id="targetValue"
              value={targetValue}
              onChange={(event) => setTargetValue(event.target.value)}
              placeholder={
                targetType === "audience"
                  ? "All"
                  : targetType === "program"
                    ? "Web Development"
                    : targetType === "studentId"
                      ? "PC001"
                      : "student@example.com"
              }
              className="w-full rounded-md border border-slate-700 bg-slate-800 px-3 py-2.5 text-sm text-slate-100"
              required
            />
          </div>
        </div>

        <div className="grid gap-3 md:grid-cols-2">
          <div>
            <label htmlFor="announcementTitle" className="mb-1 block text-sm text-slate-300">
              Title
            </label>
            <input
              id="announcementTitle"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              placeholder="Orientation update"
              className="w-full rounded-md border border-slate-700 bg-slate-800 px-3 py-2.5 text-sm text-slate-100"
              required
            />
          </div>

          <div>
            <label htmlFor="announcementDate" className="mb-1 block text-sm text-slate-300">
              Date
            </label>
            <input
              id="announcementDate"
              type="date"
              value={date}
              onChange={(event) => setDate(event.target.value)}
              className="w-full rounded-md border border-slate-700 bg-slate-800 px-3 py-2.5 text-sm text-slate-100"
            />
          </div>
        </div>

        <div>
          <label htmlFor="announcementMessage" className="mb-1 block text-sm text-slate-300">
            Message
          </label>
          <textarea
            id="announcementMessage"
            value={message}
            onChange={(event) => setMessage(event.target.value)}
            placeholder="Write the announcement students should see."
            rows={5}
            className="w-full rounded-md border border-slate-700 bg-slate-800 px-3 py-2.5 text-sm text-slate-100"
            required
          />
        </div>

        <div className="grid gap-3 md:grid-cols-2">
          <div>
            <label htmlFor="announcementAuthor" className="mb-1 block text-sm text-slate-300">
              Author
            </label>
            <input
              id="announcementAuthor"
              value={author}
              onChange={(event) => setAuthor(event.target.value)}
              placeholder="Academic Office"
              className="w-full rounded-md border border-slate-700 bg-slate-800 px-3 py-2.5 text-sm text-slate-100"
            />
          </div>

          <div>
            <label htmlFor="announcementHref" className="mb-1 block text-sm text-slate-300">
              Link
            </label>
            <input
              id="announcementHref"
              value={href}
              onChange={(event) => setHref(event.target.value)}
              placeholder="/prime-college/contact"
              className="w-full rounded-md border border-slate-700 bg-slate-800 px-3 py-2.5 text-sm text-slate-100"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={isSaving}
          className="rounded-md bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:opacity-60"
        >
          {isSaving ? "Publishing..." : "Publish Announcement"}
        </button>

        {statusMessage ? <p className="text-sm text-emerald-300">{statusMessage}</p> : null}
        {errorMessage ? <p className="text-sm text-rose-300">{errorMessage}</p> : null}
      </form>

      <aside className="rounded-md border border-slate-800 bg-slate-950 p-4">
        <p className="text-sm font-semibold text-slate-100">Latest Published</p>
        {latestAnnouncement ? (
          <div className="mt-4 space-y-2 text-sm">
            <p className="font-semibold text-slate-100">{latestAnnouncement.title}</p>
            <p className="leading-6 text-slate-400">{latestAnnouncement.message}</p>
            <p className="text-xs text-slate-500">
              {latestAnnouncement.program ||
                latestAnnouncement.studentId ||
                latestAnnouncement.email ||
                latestAnnouncement.audience}
              {" | "}
              {latestAnnouncement.date}
            </p>
          </div>
        ) : (
          <p className="mt-4 text-sm leading-6 text-slate-400">
            No announcement published in this session.
          </p>
        )}
      </aside>
    </div>
  );
}
