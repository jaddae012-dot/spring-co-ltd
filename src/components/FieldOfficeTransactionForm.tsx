"use client";

import { useState } from "react";

interface FieldOfficeTransactionFormProps {
  customerRef: string;
  customerName?: string;
}

export default function FieldOfficeTransactionForm({ customerRef, customerName }: FieldOfficeTransactionFormProps) {
  const [amount, setAmount] = useState("");
  const [transactionType, setTransactionType] = useState("collection");
  const [note, setNote] = useState("");
  const [status, setStatus] = useState<{ type: "success" | "error"; message: string } | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus(null);
    setIsSubmitting(true);

    const parsedAmount = Number(amount.replace(/[^0-9.]/g, ""));
    if (!customerRef || Number.isNaN(parsedAmount) || parsedAmount <= 0) {
      setStatus({ type: "error", message: "Please provide a valid amount and customer." });
      setIsSubmitting(false);
      return;
    }

    try {
      const res = await fetch("/api/spring-cooperative/field-office/transaction", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ customerRef, amount: parsedAmount, transactionType, note }),
      });

      const data = await res.json();
      if (!res.ok) {
        setStatus({ type: "error", message: data.message || "Could not record the transaction." });
      } else {
        setAmount("");
        setNote("");
        setStatus({ type: "success", message: data.message || "Transaction recorded successfully." });
      }
    } catch (error) {
      setStatus({ type: "error", message: "An unexpected error occurred. Please try again." });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form className="rounded-4xl border border-slate-800 bg-slate-900/90 p-6 shadow-xl shadow-slate-950/30" onSubmit={handleSubmit}>
      <div className="flex flex-col gap-4">
        <div>
          <p className="text-sm uppercase tracking-[0.35em] text-slate-500">Record payment</p>
          <p className="mt-2 text-sm text-slate-300">
            {customerName ? `Collect funds from ${customerName}.` : "Select a customer to update their balance."}
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <label className="block text-sm text-slate-300">
            Amount
            <input
              value={amount}
              onChange={(event) => setAmount(event.target.value)}
              type="text"
              placeholder="e.g. 250.00"
              className="mt-2 w-full rounded-2xl border border-slate-700 bg-slate-950/80 px-4 py-3 text-white focus:border-cyan-500 focus:outline-none"
            />
          </label>

          <label className="block text-sm text-slate-300">
            Transaction type
            <select
              value={transactionType}
              onChange={(event) => setTransactionType(event.target.value)}
              className="mt-2 w-full rounded-2xl border border-slate-700 bg-slate-950/80 px-4 py-3 text-white focus:border-cyan-500 focus:outline-none"
            >
              <option value="collection">Collection</option>
              <option value="refund">Refund</option>
              <option value="adjustment">Adjustment</option>
            </select>
          </label>
        </div>

        <label className="block text-sm text-slate-300">
          Note
          <textarea
            value={note}
            onChange={(event) => setNote(event.target.value)}
            rows={3}
            placeholder="Optional note for the transaction"
            className="mt-2 w-full rounded-2xl border border-slate-700 bg-slate-950/80 px-4 py-3 text-white focus:border-cyan-500 focus:outline-none"
          />
        </label>

        {status ? (
          <div className={`rounded-2xl px-4 py-3 text-sm ${status.type === "success" ? "bg-emerald-500/10 text-emerald-200 border border-emerald-500/20" : "bg-rose-500/10 text-rose-200 border border-rose-500/20"}`}>
            {status.message}
          </div>
        ) : null}

        <button
          type="submit"
          disabled={isSubmitting || !customerRef}
          className="inline-flex w-full items-center justify-center rounded-2xl bg-linear-to-r from-yellow-500 to-amber-600 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:from-yellow-400 hover:to-amber-500 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSubmitting ? "Recording transaction..." : "Record transaction"}
        </button>
      </div>
    </form>
  );
}
