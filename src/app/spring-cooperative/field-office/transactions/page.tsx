import { getFieldOfficeTransactions, getFieldOfficeSession } from "@/lib/fieldOfficeDashboard";
import FieldOfficeTransactionForm from "@/components/FieldOfficeTransactionForm";

export default async function FieldOfficeTransactionsPage(props: { searchParams?: any }) {
  const { user } = await getFieldOfficeSession();
  const { transactions } = await getFieldOfficeTransactions();
  const selectedCustomer = props.searchParams?.customerRef || "";

  return (
    <div className="min-h-screen bg-[#020814] text-slate-100 pt-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 pb-24">
        <div className="grid gap-6 lg:grid-cols-[1.3fr_0.7fr]">
          <section className="rounded-[3rem] border border-slate-800 bg-slate-950/95 p-8 shadow-2xl shadow-slate-950/40">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.35em] text-cyan-300/70">SPRING CO-OPERATIVE FIELD OFFICE</p>
                <h1 className="mt-4 text-4xl font-semibold text-white">Transactions</h1>
                <p className="mt-3 text-slate-400">Review the latest field collections, adjustments, and customer payments.</p>
              </div>
              <div className="rounded-3xl border border-slate-800 bg-slate-900/80 px-5 py-4 text-sm text-slate-300">
                <p className="font-semibold text-white">Field officer</p>
                <p>{user.name}</p>
                <p>{user.branch || "All branches"}</p>
              </div>
            </div>

            <div className="mt-10 overflow-hidden rounded-4xl border border-slate-800 bg-slate-900/80 shadow-xl shadow-slate-950/20">
              <div className="bg-slate-950/90 px-6 py-5 text-sm uppercase tracking-[0.35em] text-slate-500">Recent transactions</div>
              <div className="divide-y divide-slate-800">
                {transactions.length === 0 ? (
                  <div className="p-6 text-slate-400">No transactions recorded yet.</div>
                ) : (
                  transactions.map((transaction, index) => (
                    <div key={`${transaction.officeId}-${transaction.recordedAt}-${index}`} className="px-6 py-5 sm:flex sm:items-center sm:justify-between">
                      <div>
                        <p className="text-sm text-slate-400">{transaction.recordedAt || "No timestamp"}</p>
                        <p className="mt-1 text-lg font-semibold text-white">{transaction.customerRef}</p>
                        <p className="mt-1 text-sm text-slate-400">{transaction.transactionType}</p>
                      </div>
                      <div className="mt-4 text-right sm:mt-0">
                        <p className="text-sm uppercase tracking-[0.35em] text-slate-500">Amount</p>
                        <p className="mt-1 text-2xl font-semibold text-white">{formatAmount(transaction.amount)}</p>
                        <p className="mt-2 text-sm text-slate-400">{transaction.note || "No note provided"}</p>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </section>

          <aside className="space-y-6">
            <FieldOfficeTransactionForm customerRef={selectedCustomer} customerName={selectedCustomer} />
            <div className="rounded-4xl border border-slate-800 bg-slate-900/80 p-6 shadow-xl shadow-slate-950/20">
              <p className="text-sm uppercase tracking-[0.35em] text-slate-500">Transaction guide</p>
              <ul className="mt-4 space-y-3 text-sm text-slate-300">
                <li>Record customer payments immediately after collection.</li>
                <li>Use refunds only for returned funds or correction entries.</li>
                <li>Keep notes brief but specific for audit reference.</li>
              </ul>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}

function formatAmount(value: string) {
  const amount = Number(value.replace(/[^0-9.]/g, ""));
  if (Number.isNaN(amount)) return "GH₵0.00";
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 2,
  })
    .format(amount)
    .replace("$", "GH₵");
}
