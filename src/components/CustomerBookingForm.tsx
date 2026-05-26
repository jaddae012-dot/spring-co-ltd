"use client";

import { FormEvent, useEffect, useState } from "react";
import FormStatus from "@/components/FormStatus";

type SubmitStatus = "idle" | "loading" | "success" | "error";

const SERVICE_TYPES = [
  "General Cleaning",
  "Office Cleaning",
  "Deep Cleaning",
  "Window Cleaning",
  "Carpet Cleaning",
  "Post-Construction Cleaning",
];

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

export default function CustomerBookingForm() {
  const [status, setStatus] = useState<SubmitStatus>("idle");
  const [message, setMessage] = useState("");
  const [bookingRef, setBookingRef] = useState("");
  const [minDate, setMinDate] = useState("");

  useEffect(() => {
    // Set minimum date to today
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    setMinDate(tomorrow.toISOString().split("T")[0]);
  }, []);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setMessage("");
    setBookingRef("");

    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      const res = await fetch("/api/fast-cleaners/book", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        setStatus("error");
        setMessage(data.message || "Could not submit booking.");
        return;
      }

      setStatus("success");
      setMessage(data.message || "Booking submitted successfully!");
      setBookingRef(data.bookingRef || "");
      form.reset();
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
            {SERVICE_TYPES.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
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
            {GHANA_REGIONS.map((region) => (
              <option key={region} value={region}>
                {region}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="name" className="block text-sm text-gray-400 mb-2">
            Your Name *
          </label>
          <input
            id="name"
            type="text"
            name="name"
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
          <label htmlFor="preferred_date" className="block text-sm text-gray-400 mb-2">
            Preferred Date *
          </label>
          <input
            id="preferred_date"
            type="date"
            name="preferred_date"
            required
            min={minDate}
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500"
          />
        </div>
      </div>

      <div>
        <label htmlFor="address" className="block text-sm text-gray-400 mb-2">
          Specific Location / Address *
        </label>
        <textarea
          id="address"
          name="address"
          rows={3}
          required
          placeholder="Enter your address or location details (street, building name, area, etc.)"
          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-blue-500"
        />
      </div>

      <div>
        <label htmlFor="details" className="block text-sm text-gray-400 mb-2">
          Cleaning Details & Special Requirements (Optional)
        </label>
        <textarea
          id="details"
          name="details"
          rows={4}
          placeholder="Describe what needs to be cleaned, size of premises, number of rooms, furniture to move, allergies/sensitivities, pet information, access instructions, etc."
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
            I authorize Fast Cleaners to contact me by phone or email to confirm this
            booking and provide service details.
          </span>
        </label>
      </div>

      <FormStatus status={status} message={message} applicationRef={bookingRef} />

      <button
        type="submit"
        disabled={status === "loading"}
        className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 disabled:opacity-60 text-white font-bold py-3 px-6 rounded-xl transition"
      >
        {status === "loading" ? "Submitting..." : "Request Cleaning Service"}
      </button>
    </form>
  );
}
