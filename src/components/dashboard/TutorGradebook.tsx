"use client";

import { useEffect, useState } from "react";

type GradeEntry = {
  gradeId: string;
  assessmentId: string;
  assessmentTitle: string;
  studentId: string;
  studentName: string;
  course: string;
  score: number;
  totalMarks: number;
  percentage: number;
  status: "Published" | "Draft";
  feedback: string;
};

export default function TutorGradebook() {
  const [entries, setEntries] = useState<GradeEntry[]>([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);

  async function loadEntries() {
    setLoading(true);
    try {
      const response = await fetch("/api/prime-college/gradebook");
      const data = await response.json();
      setEntries(Array.isArray(data.entries) ? data.entries : []);
    } catch {
      setMessage("Could not load the gradebook.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadEntries();
  }, []);

  async function publishGrade(entry: GradeEntry) {
    const score = window.prompt(`Score for ${entry.studentName || entry.studentId} out of ${entry.totalMarks}`, String(entry.score));
    if (score === null) return;
    const feedback = window.prompt("Feedback for this student", entry.feedback) ?? entry.feedback;

    const response = await fetch("/api/prime-college/gradebook", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...entry, score: Number(score), feedback, status: "Published" }),
    });
    const data = await response.json();
    setMessage(data.message || "Grade updated.");
    if (response.ok) await loadEntries();
  }

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-6">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-300">Tutor Portal</p>
        <h1 className="mt-2 text-3xl font-black text-white">Gradebook</h1>
        <p className="mt-2 text-sm text-slate-400">Review student results and publish feedback from one shared record.</p>
      </div>

      {message && <p className="rounded-lg border border-amber-500/30 bg-amber-500/10 p-3 text-sm text-amber-200">{message}</p>}
      {loading ? <p className="text-sm text-slate-400">Loading grades...</p> : entries.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-700 bg-slate-900/60 p-8 text-center text-slate-400">No grade records yet.</div>
      ) : (
        <div className="overflow-x-auto rounded-2xl border border-slate-800 bg-slate-900/80">
          <table className="w-full min-w-[760px] text-left text-sm">
            <thead className="border-b border-slate-800 text-xs uppercase tracking-[0.15em] text-slate-400">
              <tr><th className="p-4">Student</th><th className="p-4">Assessment</th><th className="p-4">Course</th><th className="p-4">Score</th><th className="p-4">Status</th><th className="p-4">Action</th></tr>
            </thead>
            <tbody>
              {entries.map((entry) => <tr key={entry.gradeId} className="border-b border-slate-800 last:border-0">
                <td className="p-4 text-white">{entry.studentName || entry.studentId}<span className="block text-xs text-slate-500">{entry.studentId}</span></td>
                <td className="p-4 text-slate-200">{entry.assessmentTitle}</td>
                <td className="p-4 text-slate-300">{entry.course}</td>
                <td className="p-4 font-semibold text-emerald-300">{entry.score}/{entry.totalMarks} ({entry.percentage}%)</td>
                <td className="p-4 text-slate-300">{entry.status}</td>
                <td className="p-4"><button type="button" onClick={() => publishGrade(entry)} className="rounded-lg bg-emerald-600 px-3 py-2 text-xs font-semibold text-white hover:bg-emerald-500">Edit grade</button></td>
              </tr>)}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
