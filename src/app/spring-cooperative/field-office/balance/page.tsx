import { formatCurrency, getFieldOfficeCustomers, getFieldOfficeSession } from "@/lib/fieldOfficeDashboard";

export default async function FieldOfficeBalancePage() {
  const { user, customers } = await getFieldOfficeCustomers();
  const totalBalance = customers.reduce((sum, customer) => sum + Number(customer.balance.replace(/[^0-9.]/g, "")), 0);
  const totalSavings = customers.reduce((sum, customer) => sum + Number(customer.monthlySavings.replace(/[^0-9.]/g, "")), 0);

  return (
    <div className="min-h-screen bg-[#020814] text-slate-100 pt-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 pb-24">
        <section className="rounded-[3rem] border border-slate-800 bg-slate-950/95 p-8 shadow-2xl shadow-slate-950/40">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.35em] text-cyan-300/70">SPRING CO-OPERATIVE FIELD OFFICE</p>
              <h1 className="mt-4 text-4xl font-semibold text-white">Branch balance</h1>
              <p className="mt-3 text-slate-400">Review the current branch balance and contribution totals from your customer portfolio.</p>
            </div>
            <div className="rounded-3xl border border-slate-800 bg-slate-900/80 px-5 py-4 text-sm text-slate-300">
              <p className="font-semibold text-white">Field officer</p>
              <p>{user.name}</p>
              <p>{user.branch || "All branches"}</p>
            </div>
          </div>

          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            <div className="rounded-4xl border border-slate-800 bg-slate-900/80 p-6 shadow-xl shadow-slate-950/20">
              <p className="text-sm uppercase tracking-[0.35em] text-slate-500">Total branch balance</p>
              <p className="mt-4 text-4xl font-semibold text-white">{formatCurrency(totalBalance)}</p>
            </div>
            <div className="rounded-4xl border border-slate-800 bg-slate-900/80 p-6 shadow-xl shadow-slate-950/20">
              <p className="text-sm uppercase tracking-[0.35em] text-slate-500">Monthly savings total</p>
              <p className="mt-4 text-4xl font-semibold text-white">{formatCurrency(totalSavings)}</p>
            </div>
            <div className="rounded-4xl border border-slate-800 bg-slate-900/80 p-6 shadow-xl shadow-slate-950/20">
              <p className="text-sm uppercase tracking-[0.35em] text-slate-500">Active customers</p>
              <p className="mt-4 text-4xl font-semibold text-white">{customers.length}</p>
            </div>
          </div>

          <div className="mt-10 rounded-4xl border border-slate-800 bg-slate-900/80 p-6 shadow-xl shadow-slate-950/20">
            <p className="text-sm uppercase tracking-[0.35em] text-slate-500">Balance summary</p>
            <p className="mt-3 text-slate-300">
              Field office balances are calculated from the member savings balances assigned to your branch. Use the customer list to take action on the latest collections.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
