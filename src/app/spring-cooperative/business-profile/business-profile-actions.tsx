"use client";

import { useState } from "react";
import { readSecretaryEntries, recordSecretaryEntry } from "@/lib/company-secretary";

export default function BusinessProfileActions() {
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownloadPdf = async () => {
    recordSecretaryEntry({
      category: "document",
      title: "PDF export requested",
      detail: "The current business profile was prepared for printing and PDF export.",
      path: "/spring-cooperative/business-profile",
    });

    try {
      setIsDownloading(true);
      const response = await fetch("/api/spring-cooperative/business-profile/pdf", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ secretaryEntries: readSecretaryEntries() }),
      });

      if (!response.ok) {
        throw new Error("PDF generation failed");
      }

      const blob = await response.blob();
      const fileUrl = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = fileUrl;
      link.download = "SPRING-CO-LTD-Formal-Business-Profile.pdf";
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(fileUrl);
    } finally {
      setIsDownloading(false);
    }
  };

  const handleLogout = () => {
    recordSecretaryEntry({
      category: "auth",
      title: "Logout initiated",
      detail: "The private business profile session was closed and the user was sent back to the access flow.",
      path: "/spring-cooperative/business-profile",
    });
    window.location.href = "/api/auth/logout";
  };

  return (
    <div className="mb-6 flex flex-wrap items-center justify-between gap-3 print:hidden">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-500">Private profile</p>
        <p className="mt-1 text-sm text-slate-600">
          Research-paper style business profile with PDF download support.
        </p>
      </div>

      <div className="flex flex-wrap gap-3">
        <button
          type="button"
          onClick={handleDownloadPdf}
          disabled={isDownloading}
          className="inline-flex items-center rounded-full bg-slate-900 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isDownloading ? "Preparing PDF..." : "Download PDF"}
        </button>
        <button
          type="button"
          onClick={handleLogout}
          className="inline-flex items-center rounded-full border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
        >
          Leave profile
        </button>
      </div>
    </div>
  );
}