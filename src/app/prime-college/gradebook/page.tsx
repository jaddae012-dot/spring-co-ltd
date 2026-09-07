import { redirect } from "next/navigation";
import { getSession } from "@/lib/session";
import { getGradebookEntries } from "@/lib/gradebook";

export default async function StudentGradebookPage() {
  const session = await getSession();
  if (!session.isLoggedIn || session.userType !== "student") redirect("/prime-college/login");

  const entries = (await getGradebookEntries(session.id)).filter((entry) => entry.status === "Published");
  const average = entries.length ? Math.round(entries.reduce((sum, entry) => sum + entry.percentage, 0) / entries.length) : 0;

  return (
    <div className="min-h-screen bg-slate-950 px-4 pb-12 pt-24 text-white">
      <div className="mx-auto max-w-6xl">
        <div className="mb-6 rounded-2xl border border-slate-800 bg-slate-900/80 p-6">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-300">Student Portal</p>
          <h1 className="mt-2 text-3xl font-black">My Gradebook</h1>
          <p className="mt-2 text-sm text-slate-400">Published assessment results and tutor feedback.</p>
        </div>
        <div className="mb-6 grid gap-4 md:grid-cols-2"><div className="rounded-xl border border-slate-800 bg-slate-900/80 p-5"><p className="text-xs uppercase tracking-[0.15em] text-slate-400">Published results</p><p className="mt-2 text-3xl font-black text-white">{entries.length}</p></div><div className="rounded-xl border border-slate-800 bg-slate-900/80 p-5"><p className="text-xs uppercase tracking-[0.15em] text-slate-400">Average percentage</p><p className="mt-2 text-3xl font-black text-cyan-300">{average}%</p></div></div>
        {entries.length === 0 ? <div className="rounded-2xl border border-dashed border-slate-700 bg-slate-900/60 p-8 text-center text-slate-400">No published grades yet.</div> : <div className="overflow-x-auto rounded-2xl border border-slate-800 bg-slate-900/80"><table className="w-full min-w-[680px] text-left text-sm"><thead className="border-b border-slate-800 text-xs uppercase tracking-[0.15em] text-slate-400"><tr><th className="p-4">Assessment</th><th className="p-4">Course</th><th className="p-4">Result</th><th className="p-4">Feedback</th></tr></thead><tbody>{entries.map((entry) => <tr key={entry.gradeId} className="border-b border-slate-800 last:border-0"><td className="p-4 text-white">{entry.assessmentTitle}</td><td className="p-4 text-slate-300">{entry.course}</td><td className="p-4 font-semibold text-cyan-300">{entry.score}/{entry.totalMarks} ({entry.percentage}%)</td><td className="p-4 text-slate-300">{entry.feedback || "No feedback provided."}</td></tr>)}</tbody></table></div>}
      </div>
    </div>
  );
}
