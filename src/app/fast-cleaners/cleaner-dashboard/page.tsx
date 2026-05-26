"use client";

import { FormEvent, useState } from "react";
import AvailableJobsList from "@/components/AvailableJobsList";

type CleanerSession = {
  phone: string;
  name: string;
  region: string;
  hourlyRate: string;
  status: string;
};

export default function CleanerDashboardPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [cleaner, setCleaner] = useState<CleanerSession | null>(null);
  const [phone, setPhone] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");

  async function handleLogin(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true);
    setMessage("");

    try {
      const res = await fetch("/api/fast-cleaners/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ phone: phone.trim() }),
      });

      const data = await res.json();

      if (!res.ok) {
        setMessage(data.message || "Could not find cleaner.");
        return;
      }

      setCleaner(data.cleaner);
      setIsLoggedIn(true);
      setPhone("");
    } catch {
      setMessage("Network error. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  if (!isLoggedIn || !cleaner) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-black pt-24 pb-20">
        <div className="container mx-auto px-4 max-w-md">
          <div className="bg-gradient-to-br from-gray-900 to-gray-950 border border-gray-800 rounded-2xl p-8 shadow-2xl">
            <h1 className="text-3xl font-black text-white mb-2">Cleaner Login</h1>
            <p className="text-gray-400 mb-8">
              Access your Fast Cleaners dashboard and available jobs.
            </p>

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label htmlFor="phone" className="block text-sm text-gray-400 mb-2">
                  Phone Number *
                </label>
                <input
                  id="phone"
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                  placeholder="e.g. +233 XXX XXX XXX"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-blue-500"
                />
              </div>

              {message && (
                <div
                  className={`p-4 rounded-lg ${
                    message.includes("not") || message.includes("error")
                      ? "bg-red-900/30 border border-red-700 text-red-300"
                      : "bg-yellow-900/30 border border-yellow-700 text-yellow-300"
                  }`}
                >
                  {message}
                </div>
              )}

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 disabled:opacity-60 text-white font-bold py-3 px-6 rounded-xl transition"
              >
                {isLoading ? "Logging in..." : "Login"}
              </button>
            </form>

            <div className="mt-8 p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg">
              <p className="text-xs text-gray-300">
                <strong className="text-blue-400">New cleaner?</strong> You need to{" "}
                <a
                  href="/fast-cleaners/apply"
                  className="text-blue-400 hover:text-blue-300 underline"
                >
                  apply first
                </a>
                , then log in once approved.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 pt-24 pb-20">
      <div className="container mx-auto px-4 max-w-5xl">
        <header className="mb-8 rounded-lg border border-slate-800 bg-slate-900 p-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                Fast Cleaners
              </p>
              <h1 className="mt-1 text-3xl font-black tracking-tight">
                Dashboard
              </h1>
            </div>
            <button
              onClick={() => {
                setIsLoggedIn(false);
                setCleaner(null);
              }}
              className="rounded-md border border-slate-700 px-3 py-2 text-sm font-semibold text-slate-200 transition hover:border-slate-500 hover:text-white"
            >
              Logout
            </button>
          </div>
        </header>

        {/* Profile Card */}
        <div className="rounded-lg border border-slate-700 bg-slate-900 p-6 mb-8">
          <h2 className="text-xl font-bold mb-4">Your Profile</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <p className="text-xs text-slate-400 uppercase">Name</p>
              <p className="text-lg font-bold text-white">{cleaner.name}</p>
            </div>
            <div>
              <p className="text-xs text-slate-400 uppercase">Phone</p>
              <p className="text-lg font-bold text-white">{cleaner.phone}</p>
            </div>
            <div>
              <p className="text-xs text-slate-400 uppercase">Region</p>
              <p className="text-lg font-bold text-white">{cleaner.region}</p>
            </div>
            <div>
              <p className="text-xs text-slate-400 uppercase">Status</p>
              <span className="inline-block px-3 py-1 rounded-lg bg-green-900/30 text-green-300 text-sm font-bold">
                {cleaner.status}
              </span>
            </div>
          </div>
          {cleaner.hourlyRate && (
            <div className="mt-4 pt-4 border-t border-slate-700">
              <p className="text-xs text-slate-400 uppercase">Your Hourly Rate</p>
              <p className="text-2xl font-black text-orange-500">
                ₵{cleaner.hourlyRate}/hour
              </p>
            </div>
          )}
        </div>

        {/* Available Jobs */}
        <div className="rounded-lg border border-slate-700 bg-slate-900 p-6">
          <h2 className="text-2xl font-bold mb-2">Available Cleaning Jobs</h2>
          <p className="text-slate-400 mb-6">
            Jobs in your region ({cleaner.region}) that match your availability.
          </p>

          <AvailableJobsList
            cleanerPhone={cleaner.phone}
            cleanerRegion={cleaner.region}
            cleanerName={cleaner.name}
          />
        </div>
      </div>
    </div>
  );
}
