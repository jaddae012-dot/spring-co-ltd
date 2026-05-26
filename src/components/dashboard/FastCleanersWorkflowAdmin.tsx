"use client";

import { FormEvent, useMemo, useState } from "react";

const STATUS_OPTIONS = [
  "Pending",
  "Under Review",
  "Approved",
  "Rejected",
  "Inactive",
] as const;

type CleanerLookup = {
  applicationRef: string;
  fullName: string;
  phone: string;
  email: string;
  region: string;
  experience: string;
  status: string;
  submittedAt: string;
};

export default function FastCleanersWorkflowAdmin() {
  const [applicationRef, setApplicationRef] = useState("");
  const [selectedStatus, setSelectedStatus] = useState<(typeof STATUS_OPTIONS)[number]>(
    "Under Review"
  );
  const [hourlyRate, setHourlyRate] = useState("");
  const [notes, setNotes] = useState("");
  const [statusMessage, setStatusMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [lookup, setLookup] = useState<CleanerLookup | null>(null);

  const canSubmit = useMemo(
    () => applicationRef.trim().length > 0 && !isLoading,
    [applicationRef, isLoading]
  );

  async function lookupApplication(reference: string): Promise<boolean> {
    const response = await fetch(
      `/api/fast-cleaners/status?applicationRef=${encodeURIComponent(reference)}`
    );
    const data = await response.json();

    if (!response.ok) {
      setErrorMessage(data.message || "Could not fetch application.");
      return false;
    }

    const details = data.data as CleanerLookup;
    setLookup(details);
    if (STATUS_OPTIONS.includes(details.status as (typeof STATUS_OPTIONS)[number])) {
      setSelectedStatus(details.status as (typeof STATUS_OPTIONS)[number]);
    }
    setHourlyRate(data.hourlyRate || "");
    setStatusMessage("Employee found. You can now update their status.");
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
      setErrorMessage("Network error while checking application.");
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
      const response = await fetch("/api/fast-cleaners/status", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          applicationRef: applicationRef.trim(),
          status: selectedStatus,
          hourlyRate: hourlyRate.trim(),
          notes: notes.trim(),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setErrorMessage(data.message || "Could not update status.");
        return;
      }

      setStatusMessage(
        `✓ Updated ${data.data.applicationRef} to ${data.data.status}.`
      );
      setNotes("");
      await lookupApplication(applicationRef.trim());
    } catch {
      setErrorMessage("Network error while updating status.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <section className="rounded-lg border border-slate-700 bg-slate-900 p-5 mb-6">
      <h2 className="text-xl font-bold mb-2">Fast Cleaners - Employee Workflow</h2>
      <p className="text-sm text-slate-400 mb-5">
        Review, approve, or reject cleaner applications. Set hourly rates and manage employee status.
      </p>

      <form onSubmit={handleLookup} className="flex flex-col md:flex-row gap-3 mb-4">
        <input
          type="text"
          value={applicationRef}
          onChange={(event) => setApplicationRef(event.target.value)}
          placeholder="Application reference (e.g. FC-20260526-8JX9Q)"
          className="flex-1 rounded-md bg-slate-800 border border-slate-600 px-4 py-2.5 text-sm text-slate-100"
        />
        <button
          type="submit"
          disabled={!canSubmit}
          className="rounded-md bg-blue-600 hover:bg-blue-700 disabled:opacity-60 px-4 py-2.5 text-sm font-semibold text-white"
        >
          {isLoading ? "Checking..." : "Load Employee"}
        </button>
      </form>

      {lookup ? (
        <div className="rounded-md bg-slate-800 p-4 mb-4 text-sm text-slate-300 space-y-2">
          <p>
            <strong>Name:</strong> {lookup.fullName}
          </p>
          <p>
            <strong>Phone:</strong> {lookup.phone}
          </p>
          <p>
            <strong>Email:</strong> {lookup.email || "Not provided"}
          </p>
          <p>
            <strong>Region:</strong> {lookup.region}
          </p>
          <p>
            <strong>Experience:</strong> {lookup.experience}
          </p>
          <p>
            <strong>Applied:</strong> {new Date(lookup.submittedAt).toLocaleDateString()}
          </p>
        </div>
      ) : null}

      {lookup ? (
        <form onSubmit={handleUpdate} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="status-select" className="block text-sm font-medium text-slate-300 mb-2">
                Status
              </label>
              <select
                id="status-select"
                value={selectedStatus}
                onChange={(e) =>
                  setSelectedStatus(e.target.value as (typeof STATUS_OPTIONS)[number])
                }
                className="w-full rounded-md bg-slate-800 border border-slate-600 px-3 py-2.5 text-slate-100 text-sm"
              >
                {STATUS_OPTIONS.map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Hourly Rate (GHS)
              </label>
              <input
                type="number"
                value={hourlyRate}
                onChange={(e) => setHourlyRate(e.target.value)}
                placeholder="e.g. 25.00"
                step="0.01"
                className="w-full rounded-md bg-slate-800 border border-slate-600 px-3 py-2.5 text-slate-100 text-sm"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Admin Notes
            </label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Add any notes about this employee..."
              rows={3}
              className="w-full rounded-md bg-slate-800 border border-slate-600 px-3 py-2.5 text-slate-100 text-sm"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full rounded-md bg-green-600 hover:bg-green-700 disabled:opacity-60 px-4 py-2.5 text-sm font-semibold text-white"
          >
            {isLoading ? "Updating..." : "Update Employee"}
          </button>
        </form>
      ) : null}

      {statusMessage && (
        <div className="mt-4 p-3 rounded-md bg-green-900/30 border border-green-700 text-green-300 text-sm">
          {statusMessage}
        </div>
      )}

      {errorMessage && (
        <div className="mt-4 p-3 rounded-md bg-red-900/30 border border-red-700 text-red-300 text-sm">
          {errorMessage}
        </div>
      )}
    </section>
  );
}
