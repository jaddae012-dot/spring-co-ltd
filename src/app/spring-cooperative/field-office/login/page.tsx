"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function FieldOfficeLoginPage() {
  const router = useRouter();
  const [officeId, setOfficeId] = useState("");
  const [secret, setSecret] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const res = await fetch("/api/spring-cooperative/field-office/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ officeId, secret }),
      });

      if (res.ok) {
        router.replace("/spring-cooperative/field-office/customers");
      } else {
        const data = await res.json();
        setError(data.message || "Login failed. Please check your credentials.");
      }
    } catch (error) {
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 pt-24">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-slate-800 bg-slate-900 p-10 shadow-2xl shadow-slate-950/50">
          <div className="mb-10 text-center">
            <p className="text-sm uppercase tracking-[0.35em] text-amber-400">SPRING CO-OPERATIVE UNION</p>
            <h1 className="mt-4 text-4xl font-black tracking-tight text-white sm:text-5xl">Field Office Login</h1>
            <p className="mt-4 text-gray-400">Sign in as a field officer to record collections and update member balances.</p>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit}>
            {error ? (
              <div className="rounded-2xl border border-rose-500/40 bg-rose-500/10 p-4 text-sm text-rose-200">
                {error}
              </div>
            ) : null}

            <div>
              <label htmlFor="officeId" className="block text-sm font-medium text-gray-300">
                Office ID or username
              </label>
              <input
                id="officeId"
                name="officeId"
                type="text"
                required
                value={officeId}
                onChange={(e) => setOfficeId(e.target.value)}
                className="mt-2 block w-full rounded-2xl border border-slate-700 bg-slate-800 px-4 py-3 text-white focus:border-yellow-500 focus:outline-none"
                placeholder="e.g. FIELD-OFFICE-01"
                disabled={isLoading}
              />
            </div>

            <div>
              <label htmlFor="secret" className="block text-sm font-medium text-gray-300">
                PIN or password
              </label>
              <input
                id="secret"
                name="secret"
                type="password"
                required
                value={secret}
                onChange={(e) => setSecret(e.target.value)}
                className="mt-2 block w-full rounded-2xl border border-slate-700 bg-slate-800 px-4 py-3 text-white focus:border-yellow-500 focus:outline-none"
                placeholder="Your field officer PIN"
                disabled={isLoading}
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full rounded-2xl bg-linear-to-r from-yellow-500 to-amber-600 px-6 py-4 text-lg font-semibold text-slate-950 transition hover:from-yellow-400 hover:to-amber-500 disabled:opacity-60"
            >
              {isLoading ? "Signing in..." : "Access Field Office Dashboard"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
