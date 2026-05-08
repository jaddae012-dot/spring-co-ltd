"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const router = useRouter();
  const [id, setId] = useState("");
  const [pin, setPin] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [redirectTo, setRedirectTo] = useState("/prime-college/admin/dashboard");

  useEffect(() => {
    router.prefetch("/prime-college/admin/dashboard");
    const params = new URLSearchParams(window.location.search);
    const from = params.get("from");

    if (from) {
      setRedirectTo(from);
    }
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, pin, userType: "admin" }),
      });

      if (res.ok) {
        router.replace(redirectTo);
      } else {
        const { message } = await res.json();
        setError(message || "Admin login failed. Please check your credentials.");
      }
    } catch {
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 pt-24 text-slate-100">
      <div className="w-full max-w-md rounded-2xl border border-slate-800 bg-slate-900 p-8 shadow-2xl shadow-cyan-950/30">
        <div className="text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-cyan-400">
            Prime College
          </p>
          <h1 className="mt-2 text-3xl font-black tracking-tight text-white">
            Admin Login
          </h1>
          <p className="mt-2 text-sm text-slate-400">
            Sign in to manage announcements, resources, and dashboard content.
          </p>
        </div>

        <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
          {error ? (
            <div className="rounded-lg border border-rose-500/30 bg-rose-500/10 p-3 text-center text-sm text-rose-300">
              {error}
            </div>
          ) : null}

          <div>
            <label htmlFor="adminId" className="text-sm font-medium text-slate-300">
              Admin ID or Email
            </label>
            <input
              id="adminId"
              name="adminId"
              type="text"
              required
              value={id}
              onChange={(e) => setId(e.target.value)}
              className="mt-1 block w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500"
              placeholder="e.g., ADMIN-001"
              disabled={isLoading}
            />
          </div>

          <div>
            <label htmlFor="pin" className="text-sm font-medium text-slate-300">
              PIN
            </label>
            <input
              id="pin"
              name="pin"
              type="password"
              required
              value={pin}
              onChange={(e) => setPin(e.target.value)}
              className="mt-1 block w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500"
              placeholder="Admin PIN"
              disabled={isLoading}
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-lg bg-cyan-500 px-8 py-3 text-lg font-semibold text-slate-950 transition-colors duration-200 hover:bg-cyan-400 disabled:opacity-50"
            disabled={isLoading}
          >
            {isLoading ? "Logging in..." : "Login to Admin Portal"}
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-slate-400">
          <p>
            Need the main portal?{" "}
            <Link href="/prime-college/login" className="font-medium text-cyan-400 hover:text-cyan-300">
              Go back to portal login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}