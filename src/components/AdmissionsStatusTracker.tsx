"use client";

import { FormEvent, useState } from "react";

type TrackerStatus = "idle" | "loading" | "success" | "error";

type TrackerResponse = {
  applicationRef: string;
  fullName: string;
  email: string;
  program: string;
  studyMode: string;
  status: string;
  submittedAt: string;
  lastStatusUpdateAt: string;
};

export default function AdmissionsStatusTracker() {
  const [applicationRef, setApplicationRef] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<TrackerStatus>("idle");
  const [message, setMessage] = useState("");
  const [result, setResult] = useState<TrackerResponse | null>(null);

  async function handleLookup(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");
    setMessage("");
    setResult(null);

    try {
      const params = new URLSearchParams();
      if (applicationRef.trim()) params.set("applicationRef", applicationRef.trim());
      if (email.trim()) params.set("email", email.trim());

      const response = await fetch(`/api/admissions/status?${params.toString()}`);
      const data = await response.json();

      if (!response.ok) {
        setStatus("error");
        setMessage(data.message || "Could not find application status.");
        return;
      }

      setStatus("success");
      setResult(data.data as TrackerResponse);
      setMessage(data.message || "Application status retrieved.");
    } catch {
      setStatus("error");
      setMessage("Network error while checking status. Please try again.");
    }
  }

  return (
    <div className="glass rounded-2xl p-8">
      <h2 className="text-2xl font-bold text-white mb-3">Track Your Application</h2>
      <p className="text-sm text-gray-400 mb-6">
        Enter your application reference, email address, or both.
      </p>

      <form onSubmit={handleLookup} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="tracker_ref" className="block text-sm text-gray-400 mb-2">
              Application Reference
            </label>
            <input
              id="tracker_ref"
              type="text"
              value={applicationRef}
              onChange={(event) => setApplicationRef(event.target.value)}
              placeholder="e.g. PC-SD-20260331-8JX9Q"
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-blue-500"
            />
          </div>
          <div>
            <label htmlFor="tracker_email" className="block text-sm text-gray-400 mb-2">
              Email Address
            </label>
            <input
              id="tracker_email"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="you@example.com"
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-blue-500"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={status === "loading" || (!applicationRef.trim() && !email.trim())}
          className="px-6 py-3 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {status === "loading" ? "Checking..." : "Check Status"}
        </button>
      </form>

      {message ? (
        <p className={`mt-4 text-sm ${status === "error" ? "text-rose-300" : "text-emerald-300"}`}>
          {message}
        </p>
      ) : null}

      {result ? (
        <div className="mt-5 rounded-xl border border-white/10 bg-black/20 p-4">
          <p className="text-sm text-gray-300">
            <span className="text-gray-400">Name:</span> {result.fullName || "N/A"}
          </p>
          <p className="text-sm text-gray-300 mt-1">
            <span className="text-gray-400">Reference:</span> {result.applicationRef || "N/A"}
          </p>
          <p className="text-sm text-gray-300 mt-1">
            <span className="text-gray-400">Program:</span> {result.program || "N/A"} ({result.studyMode || "N/A"})
          </p>
          <p className="text-sm text-gray-300 mt-1">
            <span className="text-gray-400">Workflow status:</span> {result.status || "Submitted"}
          </p>
          <p className="text-xs text-gray-500 mt-2">
            Last update: {result.lastStatusUpdateAt || result.submittedAt || "N/A"}
          </p>
        </div>
      ) : null}
    </div>
  );
}
