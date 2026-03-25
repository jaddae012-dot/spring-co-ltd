"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [id, setId] = useState("");
  const [pin, setPin] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    router.prefetch("/prime-college/dashboard");
    router.prefetch("/prime-college/tutor/dashboard");
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    setSuccess("");

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, pin }),
      });

      if (res.ok) {
        const { userType } = await res.json();
        setSuccess("Login successful. Redirecting...");

        if (userType === "student") {
          router.replace("/prime-college/dashboard");
        } else if (userType === "tutor") {
          router.replace("/prime-college/tutor/dashboard");
        } else {
          setSuccess("");
          setError("Invalid user type received.");
        }
      } else {
        const { message } = await res.json();
        setSuccess("");
        setError(message || "Login failed. Please check your credentials.");
      }
    } catch (error) {
      setSuccess("");
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 pt-24">
      <div className="w-full max-w-md p-8 space-y-8 bg-gray-800 rounded-2xl shadow-lg">
        <div className="text-center">
          <h1 className="text-3xl font-black tracking-tight text-white">
            <span className="text-blue-500">PRIME</span>
            <span className="text-white">COLLEGE</span>
          </h1>
          <p className="mt-2 text-gray-400">Portal Login</p>
        </div>
        <form className="space-y-6" onSubmit={handleSubmit}>
          {error && (
            <div className="p-3 bg-red-500/20 text-red-300 rounded-lg text-center">
              {error}
            </div>
          )}
          {success && (
            <div className="p-3 bg-emerald-500/20 text-emerald-300 rounded-lg text-center animate-pulse">
              {success}
            </div>
          )}
          <div>
            <label htmlFor="id" className="text-sm font-medium text-gray-300">
              Student / Tutor ID
            </label>
            <input
              id="id"
              name="id"
              type="text"
              autoComplete="username"
              required
              value={id}
              onChange={(e) => setId(e.target.value)}
              className="mt-1 block w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="e.g., PC-2026-0001 or TUT-001"
              disabled={isLoading}
            />
          </div>
          <div>
            <label htmlFor="pin" className="text-sm font-medium text-gray-300">
              PIN
            </label>
            <input
              id="pin"
              name="pin"
              type="password"
              autoComplete="current-password"
              required
              value={pin}
              onChange={(e) => setPin(e.target.value)}
              className="mt-1 block w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Your 4 or 6-digit PIN"
              disabled={isLoading}
            />
          </div>
          <div>
            <button
              type="submit"
              className="w-full px-8 py-3 rounded-lg bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold text-lg transition-colors duration-200 shadow-lg shadow-blue-500/25 disabled:opacity-50"
              disabled={isLoading}
            >
              {isLoading ? (success ? "Redirecting..." : "Logging in...") : "Login"}
            </button>
          </div>
        </form>
        <div className="text-center text-sm text-gray-400">
          <p>
            Forgot your PIN?{" "}
            <Link
              href="/contact"
              className="font-medium text-blue-400 hover:text-blue-300"
            >
              Contact Support
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

