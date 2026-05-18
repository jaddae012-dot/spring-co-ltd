import { redirect } from "next/navigation";
import Link from "next/link";
import { getSession } from "@/lib/session";
import AdminBlogPublisher from "@/components/admin/AdminBlogPublisher";

export default async function AdminBlogPage() {
  const session = await getSession();

  if (!session.isLoggedIn || session.userType !== "admin") {
    redirect("/prime-college/admin/login?from=/admin/blog");
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 pt-24">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <header className="mb-8 rounded-lg border border-slate-800 bg-slate-900 p-5">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                Corporate Admin
              </p>
              <h1 className="mt-1 text-3xl font-black tracking-tight">
                Publish Blog Post
              </h1>
            </div>
            <div className="flex flex-wrap gap-2">
              <Link
                href="/blog"
                className="rounded-md border border-slate-700 px-3 py-2 text-sm font-semibold text-slate-200 transition hover:border-slate-500 hover:text-white"
              >
                View Blog
              </Link>
              <Link
                href="/prime-college/admin/dashboard"
                className="rounded-md border border-slate-700 px-3 py-2 text-sm font-semibold text-slate-200 transition hover:border-slate-500 hover:text-white"
              >
                Prime College Admin
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

        <div className="rounded-lg border border-slate-800 bg-slate-900 p-5">
          <AdminBlogPublisher defaultAuthor={session.name || session.id} />
        </div>
      </div>
    </div>
  );
}
