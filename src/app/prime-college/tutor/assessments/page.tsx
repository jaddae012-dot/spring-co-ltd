import { redirect } from "next/navigation";
import Link from "next/link";
import { getSession } from "@/lib/session";
import TutorAssessmentList from "@/components/dashboard/TutorAssessmentList";

export default async function TutorAssessmentsPage() {
  const session = await getSession();

  if (!session.isLoggedIn || session.userType !== "tutor") {
    redirect("/prime-college/login");
  }

  return (
    <div className="min-h-screen bg-slate-950 pt-24 text-white">
      <div className="mx-auto max-w-6xl px-4 py-8">
        <div className="mb-8 flex flex-col gap-4 rounded-2xl border border-slate-800 bg-slate-900/80 p-6 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-300">Tutor Portal</p>
            <h1 className="mt-2 text-4xl font-black tracking-tight">Assessments</h1>
          </div>

          <Link
            href="/prime-college/tutor/dashboard"
            className="rounded-lg border border-slate-700 bg-slate-800 px-4 py-2 text-sm font-semibold text-slate-200 transition hover:border-slate-500 hover:bg-slate-700"
          >
            Back to Dashboard
          </Link>
        </div>

        <TutorAssessmentList />
      </div>
    </div>
  );
}
