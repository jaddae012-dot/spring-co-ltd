"use client";

import { useEffect, useMemo, useState } from "react";
import {
  COMPANY_SECRETARY_EVENT,
  readSecretaryEntries,
  type SecretaryEntry,
} from "@/lib/company-secretary";
import { businessProfileJourneySteps } from "@/lib/business-profile-report";

function getCurrentStage(entries: SecretaryEntry[]) {
  if (entries.length === 0) {
    return "The secretary log is ready to begin recording the company journey.";
  }

  const latest = entries[0];
  return `${latest.dateLabel} at ${latest.timeLabel}: ${latest.title.toLowerCase()}. ${latest.detail}`;
}

export default function CompanySecretaryJournal() {
  const [entries, setEntries] = useState<SecretaryEntry[]>([]);

  useEffect(() => {
    setEntries(readSecretaryEntries());

    const refreshEntries = () => {
      setEntries(readSecretaryEntries());
    };

    const handleStorage = (event: StorageEvent) => {
      if (event.key === null || event.key === "spring-company-secretary-log") {
        refreshEntries();
      }
    };

    window.addEventListener(COMPANY_SECRETARY_EVENT, refreshEntries as EventListener);
    window.addEventListener("storage", handleStorage);

    return () => {
      window.removeEventListener(COMPANY_SECRETARY_EVENT, refreshEntries as EventListener);
      window.removeEventListener("storage", handleStorage);
    };
  }, []);

  const currentStage = useMemo(() => getCurrentStage(entries), [entries]);

  return (
    <section className="space-y-10">
      <section className="space-y-3">
        <div className="flex items-baseline gap-3 border-b border-slate-200 pb-2">
          <span className="text-sm font-semibold text-slate-500">Chapter 11.</span>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900">Project Journey So Far</h2>
        </div>
        <div className="space-y-4 text-base leading-8 text-slate-700">
          {businessProfileJourneySteps.map((step) => (
            <div key={step.title} className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
              <h3 className="text-lg font-semibold text-slate-900">{step.title}</h3>
              <p className="mt-2">{step.detail}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-3">
        <div className="flex items-baseline gap-3 border-b border-slate-200 pb-2">
          <span className="text-sm font-semibold text-slate-500">Chapter 12.</span>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900">Where We Are Now</h2>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-base leading-8 text-slate-700">{currentStage}</p>
        </div>
      </section>

      <section className="space-y-3">
        <div className="flex items-baseline gap-3 border-b border-slate-200 pb-2">
          <span className="text-sm font-semibold text-slate-500">Chapter 13.</span>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900">Company Secretary Record</h2>
        </div>
        <div className="space-y-4">
          {entries.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-5 text-sm leading-7 text-slate-600">
              No secretary notes have been captured yet. The log will begin recording website activity automatically as the project moves forward.
            </div>
          ) : (
            entries.slice(0, 8).map((entry) => (
              <div key={entry.id} className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                <div className="flex flex-wrap items-center gap-2 text-xs uppercase tracking-[0.25em] text-slate-500">
                  <span>{entry.dateLabel}</span>
                  <span>•</span>
                  <span>{entry.timeLabel}</span>
                  <span>•</span>
                  <span>{entry.category}</span>
                </div>
                <h3 className="mt-3 text-lg font-semibold text-slate-900">{entry.title}</h3>
                <p className="mt-2 text-sm leading-7 text-slate-700">{entry.detail}</p>
              </div>
            ))
          )}
        </div>
      </section>
    </section>
  );
}
