"use client";

import { FormEvent, useState } from "react";
import FormStatus from "@/components/FormStatus";

type SubmitStatus = "idle" | "loading" | "success" | "error";

const GHANA_REGIONS = [
  "Ahafo",
  "Ashanti",
  "Bono",
  "Bono East",
  "Central",
  "Eastern",
  "Greater Accra",
  "Northern",
  "North East",
  "Oti",
  "Savanna",
  "Upper East",
  "Upper West",
  "Volta",
  "Western",
  "Western North",
];

const EXPERIENCE_LEVELS = [
  "No experience - Training required",
  "1-2 years",
  "2-5 years",
  "5+ years",
];

const AVAILABILITY_DAYS = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

export default function FastCleanersApplicationForm() {
  const [status, setStatus] = useState<SubmitStatus>("idle");
  const [message, setMessage] = useState("");
  const [applicationRef, setApplicationRef] = useState("");
  const [selectedDays, setSelectedDays] = useState<string[]>([]);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setMessage("");
    setApplicationRef("");

    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      const res = await fetch("/api/fast-cleaners/apply", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        setStatus("error");
        setMessage(data.message || "Could not submit application.");
        return;
      }

      setStatus("success");
      setMessage(data.message || "Application submitted successfully!");
      setApplicationRef(data.applicationRef || "");
      form.reset();
      setSelectedDays([]);
    } catch {
      setStatus("error");
      setMessage("Network error. Please try again.");
    }
  }

  function toggleDay(day: string) {
    setSelectedDays((prev) =>
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="full_name" className="block text-sm text-gray-400 mb-2">
            Full Name *
          </label>
          <input
            id="full_name"
            type="text"
            name="full_name"
            required
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500"
          />
        </div>
        <div>
          <label htmlFor="phone" className="block text-sm text-gray-400 mb-2">
            Phone Number *
          </label>
          <input
            id="phone"
            type="tel"
            name="phone"
            required
            placeholder="e.g. +233 XXX XXX XXX"
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-blue-500"
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm text-gray-400 mb-2">
            Email Address
          </label>
          <input
            id="email"
            type="email"
            name="email"
            placeholder="optional"
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-blue-500"
          />
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
            <option value="">Select your region</option>
            {GHANA_REGIONS.map((region) => (
              <option key={region} value={region}>
                {region}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="experience" className="block text-sm text-gray-400 mb-2">
          Cleaning Experience *
        </label>
        <select
          id="experience"
          name="experience"
          required
          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500"
        >
          <option value="">Select experience level</option>
          {EXPERIENCE_LEVELS.map((level) => (
            <option key={level} value={level}>
              {level}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm text-gray-400 mb-3">
          Availability - Select days you can work *
        </label>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {AVAILABILITY_DAYS.map((day) => (
            <label
              key={day}
              className="flex items-center gap-2 cursor-pointer p-3 bg-white/5 border border-white/10 rounded-lg hover:border-blue-500 transition"
            >
              <input
                type="checkbox"
                checked={selectedDays.includes(day)}
                onChange={() => toggleDay(day)}
                className="w-4 h-4 rounded border-white/20 bg-white/5 text-blue-500 focus:ring-blue-500"
                required={selectedDays.length === 0}
              />
              <span className="text-sm text-white">{day}</span>
            </label>
          ))}
        </div>
        <input
          type="hidden"
          name="availability"
          value={selectedDays.join(", ")}
        />
      </div>

      <div>
        <label htmlFor="about" className="block text-sm text-gray-400 mb-2">
          Tell us about yourself (Optional)
        </label>
        <textarea
          id="about"
          name="about"
          rows={4}
          placeholder="Share any relevant skills or why you'd be great at cleaning..."
          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-blue-500"
        />
      </div>

      <div>
        <label htmlFor="consent" className="flex items-start gap-3 text-sm text-gray-300">
          <input
            id="consent"
            name="consent"
            type="checkbox"
            required
            className="mt-1 h-4 w-4 rounded border-white/20 bg-white/5 text-blue-500 focus:ring-blue-500"
          />
          <span>
            I confirm the details provided are accurate and authorize Fast Cleaners
            to contact me regarding employment opportunities.
          </span>
        </label>
      </div>

      <FormStatus status={status} message={message} applicationRef={applicationRef} />

      <button
        type="submit"
        disabled={status === "loading"}
        className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 disabled:opacity-60 text-white font-bold py-3 px-6 rounded-xl transition"
      >
        {status === "loading" ? "Submitting..." : "Apply as Fast Cleaners Employee"}
      </button>
    </form>
  );
}
