"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { PrimeCollegeAssessment } from "@/data/prime-college-assessments";

interface AssessmentQuizClientProps {
  assessment: PrimeCollegeAssessment;
}

function formatTime(totalSeconds: number) {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
}

export default function AssessmentQuizClient({ assessment }: AssessmentQuizClientProps) {
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [remainingSeconds, setRemainingSeconds] = useState(assessment.durationMinutes * 60);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submittedAt, setSubmittedAt] = useState<string | null>(null);

  useEffect(() => {
    if (isSubmitted) {
      return;
    }

    const timer = setInterval(() => {
      setRemainingSeconds((previous) => {
        if (previous <= 1) {
          clearInterval(timer);
          setIsSubmitted(true);
          setSubmittedAt(new Date().toISOString());
          return 0;
        }

        return previous - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isSubmitted]);

  const handleAnswerChange = (questionId: string, value: string) => {
    setAnswers((current) => ({ ...current, [questionId]: value }));
  };

  const handleSubmit = () => {
    setIsSubmitted(true);
    setSubmittedAt(new Date().toISOString());
  };

  const score = useMemo(() => {
    return assessment.questions.reduce((total, question) => {
      if (question.type !== "multiple-choice") {
        return total;
      }

      const selected = answers[question.id];
      return selected && question.correctAnswer && selected === question.correctAnswer
        ? total + question.marks
        : total;
    }, 0);
  }, [answers, assessment.questions]);

  const totalMarks = assessment.questions.reduce((total, question) => total + question.marks, 0);
  const answeredCount = Object.keys(answers).length;
  const percentScore = totalMarks > 0 ? Math.round((score / totalMarks) * 100) : 0;

  return (
    <div className="min-h-screen bg-slate-950 pt-24 text-white">
      <div className="mx-auto max-w-5xl px-4 py-8">
        <div className="mb-6 flex flex-col gap-3 rounded-2xl border border-slate-800 bg-slate-900/80 p-5 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-300">Prime College</p>
            <h1 className="mt-2 text-3xl font-black">{assessment.title}</h1>
            <p className="mt-1 text-sm text-slate-400">{assessment.course}</p>
          </div>

          <div className="flex items-center gap-3">
            <div className="rounded-xl border border-cyan-500/30 bg-cyan-500/10 px-3 py-2 text-right">
              <p className="text-[10px] uppercase tracking-[0.2em] text-cyan-200">Time left</p>
              <p className="text-2xl font-black text-cyan-300">{formatTime(remainingSeconds)}</p>
            </div>
            <Link
              href="/prime-college/assessments"
              className="rounded-lg border border-slate-700 bg-slate-800 px-4 py-2 text-sm font-semibold text-slate-200 transition hover:border-slate-500 hover:bg-slate-700"
            >
              Back to Assessments
            </Link>
          </div>
        </div>

        {!isSubmitted ? (
          <div className="space-y-6">
            <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5">
              <p className="text-sm font-semibold text-slate-200">Instructions</p>
              <p className="mt-2 text-sm leading-6 text-slate-400">{assessment.instructions}</p>
            </div>

            <div className="space-y-5">
              {assessment.questions.map((question, index) => (
                <section
                  key={question.id}
                  className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5"
                >
                  <div className="mb-4 flex items-center justify-between gap-4">
                    <p className="text-sm font-semibold text-slate-200">
                      Question {index + 1}
                    </p>
                    <span className="rounded-full border border-slate-700 bg-slate-800 px-2 py-1 text-xs text-slate-300">
                      {question.marks} mark{question.marks > 1 ? "s" : ""}
                    </span>
                  </div>

                  <p className="text-base font-medium text-white">{question.prompt}</p>

                  {question.type === "multiple-choice" ? (
                    <div className="mt-4 grid gap-3">
                      {question.options?.map((option) => {
                        const isSelected = answers[question.id] === option;

                        return (
                          <label
                            key={option}
                            className={`flex cursor-pointer items-start gap-3 rounded-xl border px-4 py-3 transition ${
                              isSelected
                                ? "border-cyan-500 bg-cyan-500/10"
                                : "border-slate-700 bg-slate-950/40 hover:border-slate-500"
                            }`}
                          >
                            <input
                              type="radio"
                              name={question.id}
                              value={option}
                              checked={isSelected}
                              onChange={() => handleAnswerChange(question.id, option)}
                              className="mt-1 h-4 w-4 accent-cyan-400"
                            />
                            <span className="text-sm text-slate-200">{option}</span>
                          </label>
                        );
                      })}
                    </div>
                  ) : (
                    <textarea
                      value={answers[question.id] ?? ""}
                      onChange={(event) => handleAnswerChange(question.id, event.target.value)}
                      className="mt-4 min-h-32 w-full rounded-xl border border-slate-700 bg-slate-950/50 px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:border-cyan-500 focus:outline-none"
                      placeholder="Type your answer here..."
                    />
                  )}
                </section>
              ))}
            </div>

            <div className="sticky bottom-4 flex flex-col gap-3 rounded-2xl border border-slate-700 bg-slate-900/90 p-4 shadow-lg shadow-slate-950/30 md:flex-row md:items-center md:justify-between">
              <div className="text-sm text-slate-300">
                Answered: <span className="font-semibold text-white">{answeredCount}</span> / {assessment.questions.length}
              </div>
              <button
                type="button"
                onClick={handleSubmit}
                className="rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-cyan-500/20 transition hover:opacity-90"
              >
                Submit Assessment
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-200">
                {remainingSeconds === 0 ? "Time Expired" : "Assessment Submitted"}
              </p>
              <h2 className="mt-2 text-3xl font-black text-white">Your submission is complete</h2>
              <p className="mt-2 text-sm text-emerald-100">
                {submittedAt ? `Submitted on ${new Date(submittedAt).toLocaleString()}` : "Submitted successfully."}
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-5">
                <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Score</p>
                <p className="mt-3 text-3xl font-black text-white">{score}/{totalMarks}</p>
              </div>
              <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-5">
                <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Percent</p>
                <p className="mt-3 text-3xl font-black text-white">{percentScore}%</p>
              </div>
              <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-5">
                <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Answered</p>
                <p className="mt-3 text-3xl font-black text-white">{answeredCount}</p>
              </div>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-5">
              <h3 className="text-lg font-bold text-white">Summary</h3>
              <ul className="mt-4 space-y-3 text-sm text-slate-300">
                {assessment.questions.map((question, index) => {
                  const selected = answers[question.id];
                  const isCorrect =
                    question.type === "multiple-choice" &&
                    selected === question.correctAnswer;

                  return (
                    <li key={question.id} className="rounded-xl border border-slate-800 bg-slate-950/30 p-3">
                      <p className="font-medium text-slate-100">
                        {index + 1}. {question.prompt}
                      </p>
                      <p className="mt-2 text-xs text-slate-400">
                        Your answer: {selected ? selected : "No answer selected"}
                      </p>
                      {question.type === "multiple-choice" && (
                        <p className={`mt-1 text-xs ${isCorrect ? "text-emerald-300" : "text-amber-300"}`}>
                          {isCorrect ? "Correct answer" : `Correct answer: ${question.correctAnswer}`}
                        </p>
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>

            <div className="flex justify-end">
              <Link
                href="/prime-college/assessments"
                className="rounded-lg bg-cyan-600 px-5 py-3 text-sm font-bold text-white transition hover:bg-cyan-500"
              >
                Back to assessments
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
