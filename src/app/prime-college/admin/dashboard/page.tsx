import Link from "next/link";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/session";
import { getGoogleSheetData } from "@/lib/sheets";
import SectionCard from "@/components/dashboard/SectionCard";
import AdminAnnouncementForm from "@/components/dashboard/AdminAnnouncementForm";

type AnnouncementRow = {
  title: string;
  message: string;
  target: string;
  date: string;
  author: string;
};

function getField(row: Record<string, unknown>, aliases: string[]): string {
  const normalizedEntries = Object.entries(row).map(([key, value]) => [
    key.replace(/[^a-zA-Z0-9]/g, "").toLowerCase(),
    value,
  ] as const);

  for (const alias of aliases) {
    const normalizedAlias = alias.replace(/[^a-zA-Z0-9]/g, "").toLowerCase();
    const found = normalizedEntries.find(([key]) => key === normalizedAlias);
    if (found) return String(found[1] ?? "").trim();
  }

  return "";
}

async function getRecentAnnouncements(): Promise<AnnouncementRow[]> {
  try {
    const rows = (await getGoogleSheetData("student_announcements")) as Record<
      string,
      unknown
    >[];

    return rows
      .map((row) => {
        const studentId = getField(row, ["StudentID", "Student ID", "ID"]);
        const email = getField(row, ["Email", "Email Address"]);
        const program = getField(row, ["Program", "Course", "Programme"]);
        const audience = getField(row, ["Audience", "Target", "Scope"]);

        return {
          title: getField(row, ["Title", "Subject", "Heading"]) || "Announcement",
          message: getField(row, ["Message", "Announcement", "Notice"]),
          target: studentId || email || program || audience || "All",
          date: getField(row, ["Date", "PublishedAt", "Published At"]),
          author: getField(row, ["Author", "PostedBy", "Posted By"]),
        };
      })
      .filter((row) => row.title || row.message)
      .slice(-6)
      .reverse();
  } catch {
    return [];
  }
}

export default async function AdminDashboardPage() {
  const session = await getSession();

  if (!session.isLoggedIn) {
    redirect("/prime-college/admin/login");
  }

  if (session.userType !== "tutor" && session.userType !== "admin") {
    redirect("/prime-college/dashboard");
  }

  const recentAnnouncements = await getRecentAnnouncements();

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 pt-24">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <header className="mb-8 rounded-lg border border-slate-800 bg-slate-900 p-5">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                Prime College Staff
              </p>
              <h1 className="mt-1 text-3xl font-black tracking-tight">
                Admin Dashboard
              </h1>
            </div>
            <div className="flex flex-wrap gap-2">
              <Link
                href="/prime-college/tutor/dashboard"
                className="rounded-md border border-slate-700 px-3 py-2 text-sm font-semibold text-slate-200 transition hover:border-slate-500 hover:text-white"
              >
                Tutor Dashboard
              </Link>
              <Link
                href="/prime-college/admin/login"
                className="rounded-md border border-slate-700 px-3 py-2 text-sm font-semibold text-slate-200 transition hover:border-slate-500 hover:text-white"
              >
                Switch Account
              </Link>
              <Link
                href="/prime-college/admin/test"
                className="rounded-md border border-slate-700 px-3 py-2 text-sm font-semibold text-slate-200 transition hover:border-slate-500 hover:text-white"
              >
                Sheet Test
              </Link>
              <Link
                href="/api/auth/logout"
                className="rounded-md bg-red-500 px-3 py-2 text-sm font-semibold text-white transition hover:bg-red-600"
              >
                Logout
              </Link>
            </div>
          </div>
        </header>

        <div className="grid gap-6 lg:grid-cols-[1.5fr_1fr]">
          <SectionCard title="Create Announcement">
            <AdminAnnouncementForm authorName={session.name || session.id} />
          </SectionCard>

          <SectionCard title="Recent Announcements">
            <div className="space-y-3">
              {recentAnnouncements.length > 0 ? (
                recentAnnouncements.map((announcement, index) => (
                  <div
                    key={`${announcement.title}-${index}`}
                    className="rounded-md border border-slate-800 bg-slate-900 p-3"
                  >
                    <p className="font-semibold text-slate-100">
                      {announcement.title}
                    </p>
                    {announcement.message ? (
                      <p className="mt-1 text-sm leading-6 text-slate-400">
                        {announcement.message}
                      </p>
                    ) : null}
                    <p className="mt-2 text-xs text-slate-500">
                      {announcement.target}
                      {announcement.date ? ` | ${announcement.date}` : ""}
                      {announcement.author ? ` | ${announcement.author}` : ""}
                    </p>
                  </div>
                ))
              ) : (
                <p className="text-sm text-slate-400">
                  No announcements published yet.
                </p>
              )}
            </div>
          </SectionCard>
        </div>
      </div>
    </div>
  );
}
