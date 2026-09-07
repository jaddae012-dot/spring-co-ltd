"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type AssessmentSummary = {
  id: string;
  title: string;
  course: string;
  type: "quiz" | "assignment";
  durationMinutes: string;
  dueDate: string;
  status: "Open" | "Closed" | "Draft";
};

export default function TutorAssessmentList() {
  const [assessments, setAssessments] = useState<AssessmentSummary[]>([]);

  useEffect(() => {
    async function loadAssessments() {
      try {
        const response = await fetch("/api/prime-college/assessments");
        if (!response.ok) {
          setAssessments([]);
          return;
        }

        const data = await response.json();
        setAssessments(Array.isArray(data.assessments) ? data.assessments : []);
      } catch {
        setAssessments([]);
      }
    }

    loadAssessments();
  }, []);

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between gap-3">
        <h2 className="text-2xl font-black text-white">Assessment Library</h2>
        <Link
          href="/prime-college/tutor/assessments/create"
          className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-emerald-500"
        >
          + New Assessment
        </Link>
      </div>

      {assessments.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-700 bg-slate-900/60 p-8 text-center">
          <p className="text-lg font-semibold text-slate-200">No assessments created yet.</p>
          <p className="mt-2 text-sm text-slate-400">
            Create a timed quiz or assignment for students and publish it to the portal.
          </p>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {assessments.map((assessment) => (
            <article key={assessment.id} className="rounded-2xl border border-slate-800 bg-slate-900/80 p-5">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-emerald-300">
                    {assessment.type}
                  </p>
                  <h3 className="mt-2 text-lg font-bold text-white">{assessment.title}</h3>
                </div>
                <span className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-emerald-300">
                  {assessment.status}
                </span>
              </div>

              <div className="mt-4 space-y-2 text-sm text-slate-300">
                <p><span className="text-slate-400">Course:</span> {assessment.course}</p>
                <p><span className="text-slate-400">Duration:</span> {assessment.durationMinutes} mins</p>
                <p><span className="text-slate-400">Due:</span> {new Date(assessment.dueDate).toLocaleDateString()}</p>
              </div>

              <div className="mt-4 flex gap-2">
                <Link
                  href={`/prime-college/tutor/assessments/${assessment.id}/preview`}
                  className="inline-flex flex-1 items-center justify-center rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 text-sm font-semibold text-slate-200 transition hover:border-slate-500 hover:bg-slate-700"
                >
                  Preview
                </Link>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
