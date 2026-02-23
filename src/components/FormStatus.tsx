"use client";

export default function FormStatus({ status, message }: { status: string; message: string }) {
  if (status === "idle") return null;

  return (
    <div
      className={`rounded-xl px-6 py-4 text-sm font-medium ${
        status === "success"
          ? "bg-green-500/20 text-green-300 border border-green-500/30"
          : status === "error"
          ? "bg-red-500/20 text-red-300 border border-red-500/30"
          : "bg-white/10 text-gray-300 border border-white/10"
      }`}
    >
      {status === "loading" ? "Sending..." : message}
    </div>
  );
}
