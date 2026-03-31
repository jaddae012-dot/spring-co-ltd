"use client";

import { FormEvent, useMemo, useState } from "react";

const STATUS_OPTIONS = [
  "Submitted",
  "Under Review",
  "Interview Scheduled",
  "Interviewed",
  "Admitted",
  "Rejected",
  "Waitlisted",
] as const;

type LookupStatus = {
  applicationRef: string;
  fullName: string;
  email: string;
  program: string;
  studyMode: string;
  status: string;
  submittedAt: string;
  lastStatusUpdateAt: string;
};

export default function AdmissionsWorkflowAdmin() {
  const [applicationRef, setApplicationRef] = useState("");
  const [selectedStatus, setSelectedStatus] = useState<(typeof STATUS_OPTIONS)[number]>(
    "Under Review"
  );
  const [notes, setNotes] = useState("");
  const [statusMessage, setStatusMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [lookup, setLookup] = useState<LookupStatus | null>(null);

  const canSubmit = useMemo(
    () => applicationRef.trim().length > 0 && !isLoading,
    [applicationRef, isLoading]
  );

  async function lookupApplication(reference: string): Promise<boolean> {
    const response = await fetch(
      `/api/admissions/status?applicationRef=${encodeURIComponent(reference)}`
    );
    const data = await response.json();

    if (!response.ok) {
      setErrorMessage(data.message || "Could not fetch application status.");
      return false;
    }

    const details = data.data as LookupStatus;
    setLookup(details);
    if (STATUS_OPTIONS.includes(details.status as (typeof STATUS_OPTIONS)[number])) {
      setSelectedStatus(details.status as (typeof STATUS_OPTIONS)[number]);
    }
    setStatusMessage("Application found. You can now update the workflow state.");
    return true;
  }

  async function handleLookup(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatusMessage("");
    setErrorMessage("");
    setLookup(null);

    if (!applicationRef.trim()) {
      setErrorMessage("Enter an application reference to fetch current status.");
      return;
    }

    setIsLoading(true);
    try {
      await lookupApplication(applicationRef.trim());
    } catch {
      setErrorMessage("Network error while checking application status.");
    } finally {
      setIsLoading(false);
    }
  }

  async function handleUpdate(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatusMessage("");
    setErrorMessage("");

    if (!applicationRef.trim()) {
      setErrorMessage("Application reference is required.");
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch("/api/admissions/status", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          applicationRef: applicationRef.trim(),
          status: selectedStatus,
          notes: notes.trim(),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setErrorMessage(data.message || "Could not update workflow status.");
        return;
      }

      setStatusMessage(`Updated ${data.data.applicationRef} to ${data.data.status}.`);
      setNotes("");
      await lookupApplication(applicationRef.trim());
    } catch {
      setErrorMessage("Network error while updating workflow status.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <section className="rounded-lg border border-slate-700 bg-slate-900 p-5 mb-6">
      <h2 className="text-xl font-bold mb-2">Admissions Workflow Manager</h2>
      <p className="text-sm text-slate-400 mb-5">
        Move applicants through Review, Interview, Admitted, Rejected, or Waitlisted states.
      </p>

      <form onSubmit={handleLookup} className="flex flex-col md:flex-row gap-3 mb-4">
        <input
          type="text"
          value={applicationRef}
          onChange={(event) => setApplicationRef(event.target.value)}
          placeholder="Application reference (e.g. PC-SD-20260331-8JX9Q)"
          className="flex-1 rounded-md bg-slate-800 border border-slate-600 px-4 py-2.5 text-sm text-slate-100"
        />
        <button
          type="submit"
          disabled={!canSubmit}
          className="rounded-md bg-blue-600 hover:bg-blue-700 disabled:opacity-60 px-4 py-2.5 text-sm font-semibold"
        >
          {isLoading ? "Checking..." : "Load Application"}
        </button>
      </form>

      {lookup ? (
        <div className="rounded-md bg-slate-800 p-3 mb-4 text-sm text-slate-300">
          <p>
            <span className="text-slate-400">Applicant:</span> {lookup.fullName || "N/A"}
          </p>
          <p>
            <span className="text-slate-400">Program:</span> {lookup.program || "N/A"} ({lookup.studyMode || "N/A"})
          </p>
          <p>
            <span className="text-slate-400">Current Status:</span> {lookup.status}
          </p>
          <p>
            <span className="text-slate-400">Last Update:</span> {lookup.lastStatusUpdateAt || lookup.submittedAt || "N/A"}
          </p>
        </div>
      ) : null}

      <form onSubmit={handleUpdate} className="space-y-3">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <select
            value={selectedStatus}
            onChange={(event) => setSelectedStatus(event.target.value as (typeof STATUS_OPTIONS)[number])}
            className="rounded-md bg-slate-800 border border-slate-600 px-4 py-2.5 text-sm text-slate-100"
            title="Choose status"
          >
            {STATUS_OPTIONS.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
          <button
            type="submit"
            disabled={!canSubmit}
            className="rounded-md bg-emerald-600 hover:bg-emerald-700 disabled:opacity-60 px-4 py-2.5 text-sm font-semibold"
          >
            {isLoading ? "Updating..." : "Update Status"}
          </button>
        </div>

        <textarea
          value={notes}
          onChange={(event) => setNotes(event.target.value)}
          rows={3}
          placeholder="Optional note: reason, interview date, or decision summary"
          className="w-full rounded-md bg-slate-800 border border-slate-600 px-4 py-2.5 text-sm text-slate-100"
        />
      </form>

      {statusMessage ? <p className="mt-3 text-sm text-emerald-300">{statusMessage}</p> : null}
      {errorMessage ? <p className="mt-3 text-sm text-rose-300">{errorMessage}</p> : null}
    </section>
  );
}
