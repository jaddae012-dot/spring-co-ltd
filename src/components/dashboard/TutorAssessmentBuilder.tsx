"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type AssessmentType = "quiz" | "assignment";
type QuestionType = "multiple-choice" | "short-answer";

type QuestionDraft = {
  id: string;
  type: QuestionType;
  prompt: string;
  options: string[];
  correctAnswer: string;
  marks: string;
};

type AssessmentDraft = {
  id: string;
  title: string;
  course: string;
  type: AssessmentType;
  durationMinutes: string;
  dueDate: string;
  instructions: string;
  questions: QuestionDraft[];
};

const emptyQuestion = (): QuestionDraft => ({
  id: `q-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
  type: "multiple-choice",
  prompt: "",
  options: ["", "", "", ""],
  correctAnswer: "",
  marks: "5",
});

const defaultDraft: AssessmentDraft = {
  id: "",
  title: "",
  course: "",
  type: "quiz",
  durationMinutes: "20",
  dueDate: "",
  instructions: "Answer all questions within the allowed time.",
  questions: [emptyQuestion()],
};

export default function TutorAssessmentBuilder() {
  const router = useRouter();
  const [draft, setDraft] = useState<AssessmentDraft>(defaultDraft);
  const [savedCount, setSavedCount] = useState(0);

  useEffect(() => {
    try {
      const existing = JSON.parse(localStorage.getItem("prime-college-assessments") || "[]");
      setSavedCount(existing.length || 0);
    } catch {
      setSavedCount(0);
    }
  }, []);

  function updateDraft<T extends keyof AssessmentDraft>(key: T, value: AssessmentDraft[T]) {
    setDraft((current) => ({ ...current, [key]: value }));
  }

  function updateQuestion(questionId: string, patch: Partial<QuestionDraft>) {
    setDraft((current) => ({
      ...current,
      questions: current.questions.map((question) =>
        question.id === questionId ? { ...question, ...patch } : question
      ),
    }));
  }

  function addQuestion() {
    setDraft((current) => ({
      ...current,
      questions: [...current.questions, emptyQuestion()],
    }));
  }

  function removeQuestion(questionId: string) {
    setDraft((current) => ({
      ...current,
      questions: current.questions.filter((question) => question.id !== questionId),
    }));
  }

  function updateOption(questionId: string, optionIndex: number, value: string) {
    setDraft((current) => ({
      ...current,
      questions: current.questions.map((question) => {
        if (question.id !== questionId) return question;

        const nextOptions = [...question.options];
        nextOptions[optionIndex] = value;

        return { ...question, options: nextOptions };
      }),
    }));
  }

  function submitAssessment() {
    const title = draft.title.trim();
    const course = draft.course.trim();

    if (!title || !course || !draft.dueDate || draft.questions.length === 0) {
      alert("Please complete the title, course, due date, and at least one question.");
      return;
    }

    const validQuestions = draft.questions.filter((question) => {
      if (!question.prompt.trim()) return false;
      if (question.type === "multiple-choice") {
        return question.options.filter((option) => option.trim()).length >= 2 && question.correctAnswer.trim();
      }
      return true;
    });

    if (validQuestions.length === 0) {
      alert("Please add valid questions before publishing the assessment.");
      return;
    }

    const payload: AssessmentDraft = {
      ...draft,
      id: draft.id || `assessment-${Date.now()}`,
      questions: validQuestions.map((question) => ({
        ...question,
        prompt: question.prompt.trim(),
        options: question.type === "multiple-choice" ? question.options.map((option) => option.trim()) : [],
        correctAnswer: question.type === "multiple-choice" ? question.correctAnswer.trim() : "",
        marks: question.marks.trim() || "5",
      })),
    };

    try {
      const existing = JSON.parse(localStorage.getItem("prime-college-assessments") || "[]");
      const next = [payload, ...existing];
      localStorage.setItem("prime-college-assessments", JSON.stringify(next));
      setSavedCount(next.length);
      router.push("/prime-college/tutor/assessments");
    } catch {
      alert("We could not save this assessment. Please try again.");
    }
  }

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-5">
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-300">Tutor Portal</p>
            <h2 className="mt-2 text-2xl font-black text-white">Create Assessment</h2>
          </div>
          <span className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-300">
            {savedCount} saved
          </span>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-5">
          <div className="space-y-4">
            <div>
              <label className="mb-1 block text-sm font-medium text-slate-300">Assessment title</label>
              <input
                value={draft.title}
                onChange={(event) => updateDraft("title", event.target.value)}
                className="w-full rounded-xl border border-slate-700 bg-slate-950/50 px-3 py-2.5 text-sm text-white placeholder:text-slate-500 focus:border-emerald-500 focus:outline-none"
                placeholder="Business Communication Quiz"
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-slate-300">Course</label>
              <input
                value={draft.course}
                onChange={(event) => updateDraft("course", event.target.value)}
                className="w-full rounded-xl border border-slate-700 bg-slate-950/50 px-3 py-2.5 text-sm text-white placeholder:text-slate-500 focus:border-emerald-500 focus:outline-none"
                placeholder="Marketing Fundamentals"
              />
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              <div>
                <label className="mb-1 block text-sm font-medium text-slate-300">Type</label>
                <select
                  value={draft.type}
                  onChange={(event) => updateDraft("type", event.target.value as AssessmentType)}
                  className="w-full rounded-xl border border-slate-700 bg-slate-950/50 px-3 py-2.5 text-sm text-white focus:border-emerald-500 focus:outline-none"
                >
                  <option value="quiz">Quiz</option>
                  <option value="assignment">Assignment</option>
                </select>
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-slate-300">Duration (mins)</label>
                <input
                  type="number"
                  min={5}
                  value={draft.durationMinutes}
                  onChange={(event) => updateDraft("durationMinutes", event.target.value)}
                  className="w-full rounded-xl border border-slate-700 bg-slate-950/50 px-3 py-2.5 text-sm text-white focus:border-emerald-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-slate-300">Due date</label>
                <input
                  type="date"
                  value={draft.dueDate}
                  onChange={(event) => updateDraft("dueDate", event.target.value)}
                  className="w-full rounded-xl border border-slate-700 bg-slate-950/50 px-3 py-2.5 text-sm text-white focus:border-emerald-500 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-slate-300">Instructions</label>
              <textarea
                value={draft.instructions}
                onChange={(event) => updateDraft("instructions", event.target.value)}
                className="min-h-24 w-full rounded-xl border border-slate-700 bg-slate-950/50 px-3 py-2.5 text-sm text-white placeholder:text-slate-500 focus:border-emerald-500 focus:outline-none"
                placeholder="Explain what students should do, how to submit, and any relevant guidelines."
              />
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-5">
          <div className="mb-4 flex items-center justify-between gap-3">
            <h3 className="text-lg font-bold text-white">Questions</h3>
            <button
              type="button"
              onClick={addQuestion}
              className="rounded-lg bg-emerald-600 px-3 py-2 text-sm font-semibold text-white transition hover:bg-emerald-500"
            >
              + Add Question
            </button>
          </div>

          <div className="space-y-4">
            {draft.questions.map((question, index) => (
              <div key={question.id} className="rounded-xl border border-slate-700 bg-slate-950/40 p-4">
                <div className="mb-3 flex items-center justify-between gap-3">
                  <p className="text-sm font-semibold text-slate-200">Question {index + 1}</p>
                  {draft.questions.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeQuestion(question.id)}
                      className="text-xs font-semibold text-red-300 transition hover:text-red-200"
                    >
                      Remove
                    </button>
                  )}
                </div>

                <div className="space-y-3">
                  <div>
                    <label className="mb-1 block text-xs uppercase tracking-[0.2em] text-slate-400">Question type</label>
                    <select
                      value={question.type}
                      onChange={(event) =>
                        updateQuestion(question.id, {
                          type: event.target.value as QuestionType,
                          options:
                            event.target.value === "multiple-choice" ? question.options.length ? question.options : ["", "", "", ""] : [],
                          correctAnswer: "",
                        })
                      }
                      className="w-full rounded-xl border border-slate-700 bg-slate-900 px-3 py-2.5 text-sm text-white focus:border-emerald-500 focus:outline-none"
                    >
                      <option value="multiple-choice">Multiple choice</option>
                      <option value="short-answer">Short answer</option>
                    </select>
                  </div>

                  <div>
                    <label className="mb-1 block text-xs uppercase tracking-[0.2em] text-slate-400">Prompt</label>
                    <textarea
                      value={question.prompt}
                      onChange={(event) => updateQuestion(question.id, { prompt: event.target.value })}
                      className="min-h-20 w-full rounded-xl border border-slate-700 bg-slate-900 px-3 py-2.5 text-sm text-white placeholder:text-slate-500 focus:border-emerald-500 focus:outline-none"
                      placeholder="Write the question here"
                    />
                  </div>

                  {question.type === "multiple-choice" && (
                    <div className="space-y-3">
                      <div className="grid gap-2">
                        {question.options.map((option, optionIndex) => (
                          <div key={`${question.id}-option-${optionIndex}`} className="flex items-center gap-2">
                            <input
                              value={option}
                              onChange={(event) => updateOption(question.id, optionIndex, event.target.value)}
                              className="w-full rounded-xl border border-slate-700 bg-slate-900 px-3 py-2.5 text-sm text-white placeholder:text-slate-500 focus:border-emerald-500 focus:outline-none"
                              placeholder={`Answer option ${optionIndex + 1}`}
                            />
                          </div>
                        ))}
                      </div>

                      <div>
                        <label className="mb-1 block text-xs uppercase tracking-[0.2em] text-slate-400">Correct answer</label>
                        <input
                          value={question.correctAnswer}
                          onChange={(event) => updateQuestion(question.id, { correctAnswer: event.target.value })}
                          className="w-full rounded-xl border border-slate-700 bg-slate-900 px-3 py-2.5 text-sm text-white focus:border-emerald-500 focus:outline-none"
                          placeholder="Exact correct option text"
                        />
                      </div>
                    </div>
                  )}

                  <div>
                    <label className="mb-1 block text-xs uppercase tracking-[0.2em] text-slate-400">Marks</label>
                    <input
                      type="number"
                      min={1}
                      value={question.marks}
                      onChange={(event) => updateQuestion(question.id, { marks: event.target.value })}
                      className="w-full rounded-xl border border-slate-700 bg-slate-900 px-3 py-2.5 text-sm text-white focus:border-emerald-500 focus:outline-none"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex justify-end gap-3">
        <button
          type="button"
          onClick={() => router.push("/prime-college/tutor/assessments")}
          className="rounded-lg border border-slate-700 bg-slate-800 px-5 py-3 text-sm font-semibold text-slate-200 transition hover:border-slate-500 hover:bg-slate-700"
        >
          Cancel
        </button>
        <button
          type="button"
          onClick={submitAssessment}
          className="rounded-lg bg-gradient-to-r from-emerald-500 to-cyan-600 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-emerald-500/20 transition hover:opacity-90"
        >
          Publish Assessment
        </button>
      </div>
    </div>
  );
}
