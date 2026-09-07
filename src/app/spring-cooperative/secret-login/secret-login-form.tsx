"use client";

import { useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { recordSecretaryEntry } from "@/lib/company-secretary";

function sanitizeReturnTo(value: string | null): string {
  if (!value) {
    return "/spring-cooperative/business-profile";
  }

  if (!value.startsWith("/spring-cooperative/")) {
    return "/spring-cooperative/business-profile";
  }

  return value;
}

export default function SecretLoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const returnTo = useMemo(() => sanitizeReturnTo(searchParams.get("from")), [searchParams]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const res = await fetch("/api/spring-cooperative/secret-login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password, returnTo }),
      });

      const data = await res.json();

      if (res.ok) {
        recordSecretaryEntry({
          category: "auth",
          title: "Secret access granted",
          detail: `King AJ credentials were accepted and the system opened ${returnTo}.`,
          path: returnTo,
        });
        router.replace(data.returnTo || returnTo);
      } else {
        setError(data.message || "Login failed. Please check your credentials.");
      }
    } catch {
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="rounded-3xl border border-slate-800 bg-slate-900 p-10 shadow-2xl shadow-slate-950/50">
      <div className="mb-10 text-center">
        <p className="text-sm uppercase tracking-[0.35em] text-yellow-400">SPRING CO-OPERATIVE UNION</p>
        <h1 className="mt-4 text-4xl font-black tracking-tight text-white sm:text-5xl">Secret Access</h1>
        <p className="mt-4 text-gray-400">Use the approved credentials to open the private company profile and structure page.</p>
      </div>

      <form className="space-y-6" onSubmit={handleSubmit}>
        {error ? (
          <div className="rounded-2xl border border-rose-500/40 bg-rose-500/10 p-4 text-sm text-rose-200">
            {error}
          </div>
        ) : null}

        <div>
          <label htmlFor="username" className="block text-sm font-medium text-gray-300">Username</label>
          <input
            id="username"
            name="username"
            type="text"
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="mt-2 block w-full rounded-2xl border border-slate-700 bg-slate-800 px-4 py-3 text-white focus:border-yellow-500 focus:outline-none"
            placeholder="King AJ"
            disabled={isLoading}
          />
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-300">Password</label>
          <input
            id="password"
            name="password"
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-2 block w-full rounded-2xl border border-slate-700 bg-slate-800 px-4 py-3 text-white focus:border-yellow-500 focus:outline-none"
            placeholder="KWAME-C26"
            disabled={isLoading}
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full rounded-2xl bg-linear-to-r from-yellow-500 to-amber-600 px-6 py-4 text-lg font-semibold text-slate-950 transition hover:from-yellow-400 hover:to-amber-500 disabled:opacity-60"
        >
          {isLoading ? "Unlocking..." : "Open Secret Profile"}
        </button>
      </form>
    </div>
  );
}
