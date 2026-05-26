"use client";

import { useEffect, useState, FormEvent } from "react";

type JobPosting = {
  jobId: string;
  serviceType: string;
  region: string;
  customerName: string;
  customerPhone: string;
  preferredDate: string;
  status: string;
  rate: string;
  notes: string;
};

export default function JobPostingForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");
  const [regions, setRegions] = useState<string[]>([]);

  useEffect(() => {
    const GHANA_REGIONS = [
      "Ahafo", "Ashanti", "Bono", "Bono East", "Central", "Eastern",
      "Greater Accra", "Northern", "North East", "Oti", "Savanna",
      "Upper East", "Upper West", "Volta", "Western", "Western North",
    ];
    setRegions(GHANA_REGIONS);
  }, []);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setMessage("");

    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      const res = await fetch("/api/fast-cleaners/jobs", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        setStatus("error");
        setMessage(data.message || "Could not post job.");
        return;
      }

      setStatus("success");
      setMessage(`Job posted successfully! Job ID: ${data.jobId}`);
      form.reset();
      setTimeout(() => {
        setStatus("idle");
        setMessage("");
      }, 3000);
    } catch {
      setStatus("error");
      setMessage("Network error. Please try again.");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="service_type" className="block text-sm text-gray-400 mb-2">
            Service Type *
          </label>
          <select
            id="service_type"
            name="service_type"
            required
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500"
          >
            <option value="">Select service type</option>
            <option>General Cleaning</option>
            <option>Office Cleaning</option>
            <option>Deep Cleaning</option>
            <option>Window Cleaning</option>
            <option>Carpet Cleaning</option>
            <option>Post-Construction Cleaning</option>
          </select>
        </div>

        <div>
          <label htmlFor="region" className="block text-sm text-gray-400 mb-2">
            Region *
          </label>
          <select
            id="region"
            name="region"
            required
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500"
          >
            <option value="">Select region</option>
            {regions.map((r) => (
              <option key={r} value={r}>
                {r}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="customer_name" className="block text-sm text-gray-400 mb-2">
            Customer Name *
          </label>
          <input
            id="customer_name"
            type="text"
            name="customer_name"
            required
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500"
          />
        </div>

        <div>
          <label htmlFor="customer_phone" className="block text-sm text-gray-400 mb-2">
            Customer Phone *
          </label>
          <input
            id="customer_phone"
            type="tel"
            name="customer_phone"
            required
            placeholder="e.g. +233 XXX XXX XXX"
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-blue-500"
          />
        </div>

        <div>
          <label htmlFor="preferred_date" className="block text-sm text-gray-400 mb-2">
            Preferred Date *
          </label>
          <input
            id="preferred_date"
            type="date"
            name="preferred_date"
            required
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500"
          />
        </div>

        <div>
          <label htmlFor="rate" className="block text-sm text-gray-400 mb-2">
            Job Rate (GHS) *
          </label>
          <input
            id="rate"
            type="number"
            name="rate"
            required
            step="0.01"
            placeholder="e.g. 50.00"
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-blue-500"
          />
        </div>
      </div>

      <div>
        <label htmlFor="notes" className="block text-sm text-gray-400 mb-2">
          Job Details / Special Instructions
        </label>
        <textarea
          id="notes"
          name="notes"
          rows={4}
          placeholder="Describe the cleaning job, location details, size of premises, any special requirements..."
          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-blue-500"
        />
      </div>

      {status !== "idle" && (
        <div
          className={`p-4 rounded-lg ${
            status === "success"
              ? "bg-green-900/30 border border-green-700 text-green-300"
              : status === "error"
              ? "bg-red-900/30 border border-red-700 text-red-300"
              : "bg-blue-900/30 border border-blue-700 text-blue-300"
          }`}
        >
          {message}
        </div>
      )}

      <button
        type="submit"
        disabled={status === "loading"}
        className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 disabled:opacity-60 text-white font-bold py-3 px-6 rounded-xl transition"
      >
        {status === "loading" ? "Posting..." : "Post Cleaning Job"}
      </button>
    </form>
  );
}
