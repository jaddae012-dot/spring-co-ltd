"use client";

import { useState, FormEvent } from "react";

type JobCard = {
  jobId: string;
  serviceType: string;
  region: string;
  customerName: string;
  customerPhone: string;
  preferredDate: string;
  rate: string;
  notes: string;
};

interface CleanerDashboardProps {
  cleanerPhone: string;
  cleanerRegion: string;
  cleanerName: string;
}

export default function AvailableJobsList({
  cleanerPhone,
  cleanerRegion,
  cleanerName,
}: CleanerDashboardProps) {
  const [jobs, setJobs] = useState<JobCard[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [acceptingJobId, setAcceptingJobId] = useState("");

  async function loadAvailableJobs() {
    setIsLoading(true);
    setMessage("");

    try {
      const res = await fetch(
        `/api/fast-cleaners/available-jobs?region=${encodeURIComponent(cleanerRegion)}`
      );
      const data = await res.json();

      if (!res.ok) {
        setMessage(data.message || "Could not load jobs.");
        return;
      }

      setJobs(data.jobs || []);
      if (data.jobs.length === 0) {
        setMessage("No jobs available in your region yet.");
      }
    } catch {
      setMessage("Network error while loading jobs.");
    } finally {
      setIsLoading(false);
    }
  }

  async function handleAcceptJob(jobId: string) {
    setAcceptingJobId(jobId);

    try {
      const res = await fetch("/api/fast-cleaners/accept-job", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          jobId,
          cleanerPhone,
          cleanerName,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setMessage(data.message || "Could not accept job.");
        setAcceptingJobId("");
        return;
      }

      setMessage(`✓ Job accepted! Customer will be contacted shortly.`);
      setJobs((prev) => prev.filter((j) => j.jobId !== jobId));
    } catch {
      setMessage("Network error while accepting job.");
    } finally {
      setAcceptingJobId("");
    }
  }

  return (
    <div className="space-y-4">
      <button
        onClick={loadAvailableJobs}
        disabled={isLoading}
        className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white font-bold py-3 px-6 rounded-xl transition"
      >
        {isLoading ? "Loading..." : "Refresh Available Jobs"}
      </button>

      {message && (
        <div
          className={`p-4 rounded-lg ${
            message.includes("✓")
              ? "bg-green-900/30 border border-green-700 text-green-300"
              : message.includes("error") || message.includes("Network")
              ? "bg-red-900/30 border border-red-700 text-red-300"
              : "bg-yellow-900/30 border border-yellow-700 text-yellow-300"
          }`}
        >
          {message}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {jobs.map((job) => (
          <div
            key={job.jobId}
            className="border border-slate-700 bg-slate-900 rounded-lg p-4 hover:border-blue-600 transition"
          >
            <div className="flex items-start justify-between mb-2">
              <div>
                <p className="text-xs font-mono text-blue-400">{job.jobId}</p>
                <h3 className="text-lg font-bold text-white mt-1">
                  {job.serviceType}
                </h3>
              </div>
              <span className="text-lg font-bold text-orange-500">₵{job.rate}</span>
            </div>

            <div className="space-y-2 mb-4 text-sm text-slate-300">
              <p>
                <strong className="text-slate-400">Customer:</strong> {job.customerName}
              </p>
              <p>
                <strong className="text-slate-400">Phone:</strong> {job.customerPhone}
              </p>
              <p>
                <strong className="text-slate-400">Date:</strong>{" "}
                {new Date(job.preferredDate).toLocaleDateString()}
              </p>
              {job.notes && (
                <p>
                  <strong className="text-slate-400">Details:</strong> {job.notes}
                </p>
              )}
            </div>

            <button
              onClick={() => handleAcceptJob(job.jobId)}
              disabled={acceptingJobId === job.jobId}
              className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 disabled:opacity-60 text-white font-bold py-2 px-4 rounded-lg transition"
            >
              {acceptingJobId === job.jobId ? "Accepting..." : "Accept Job"}
            </button>
          </div>
        ))}
      </div>

      {jobs.length === 0 && !isLoading && !message && (
        <div className="text-center py-12 text-slate-400">
          <p>Click &quot;Refresh Available Jobs&quot; to see available cleaning opportunities.</p>
        </div>
      )}
    </div>
  );
}
