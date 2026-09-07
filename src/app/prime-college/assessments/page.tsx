import { redirect } from "next/navigation";
import Link from "next/link";
import { getSession } from "@/lib/session";
import { getPrimeCollegeAssessments } from "@/data/prime-college-assessments";
import { getGoogleSheetData } from "@/lib/sheets";

export default async function PrimeCollegeAssessmentsPage() {
  const session = await getSession();

  if (!session.isLoggedIn || session.userType !== "student") {
    redirect("/prime-college/login");
  }

  const students = (await getGoogleSheetData("students")) as Record<string, unknown>[];
  const student = students.find((row) => String(row.StudentID ?? row["Student ID"] ?? row.ID ?? "").trim().toLowerCase() === session.id.trim().toLowerCase());
  const program = String(student?.Program ?? student?.Course ?? student?.Programme ?? "").trim();
  const assessments = await getPrimeCollegeAssessments({ studentId: session.id, program });

  return (
    <div className="min-h-screen bg-slate-950 pt-24 text-white">
      <div className="mx-auto max-w-6xl px-4 py-8">
        <div className="mb-8 flex flex-col gap-4 rounded-2xl border border-slate-800 bg-slate-900/80 p-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-cyan-300">Student Portal</p>
            <h1 className="mt-2 text-4xl font-black tracking-tight">Assessments</h1>
            <p className="mt-2 max-w-2xl text-sm text-slate-400">
              Complete your quizzes and assignments online. Timed quizzes auto-submit when the countdown ends.
            </p>
          </div>

          <Link
            href="/prime-college/dashboard"
            className="inline-flex items-center justify-center rounded-lg border border-slate-700 bg-slate-800 px-4 py-2 text-sm font-semibold text-slate-200 transition hover:border-slate-500 hover:bg-slate-700"
          >
            Back to Dashboard
          </Link>
        </div>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {assessments.map((assessment) => (
            <article
              key={assessment.id}
              className="rounded-2xl border border-slate-800 bg-slate-900/80 p-5 shadow-lg shadow-slate-950/20"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-300">
                    {assessment.type}
                  </p>
                  <h2 className="mt-2 text-xl font-bold text-white">{assessment.title}</h2>
                </div>
                <span className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-emerald-300">
                  {assessment.status}
                </span>
              </div>

              <div className="mt-4 space-y-2 text-sm text-slate-300">
                <p><span className="text-slate-400">Course:</span> {assessment.course}</p>
                <p><span className="text-slate-400">Duration:</span> {assessment.durationMinutes} minutes</p>
                <p><span className="text-slate-400">Due:</span> {new Date(assessment.dueDate).toLocaleDateString()}</p>
              </div>

              <p className="mt-4 text-sm leading-6 text-slate-400">{assessment.instructions}</p>

              <div className="mt-5">
                <Link
                  href={`/prime-college/assessments/${assessment.id}`}
                  className="inline-flex w-full items-center justify-center rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 px-4 py-3 text-sm font-bold text-white transition hover:opacity-90"
                >
                  {assessment.type === "quiz" ? "Start Quiz" : "Open Assignment"}
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
