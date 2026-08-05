import Link from "next/link";
import { formatCurrency, getFieldOfficeCustomers } from "@/lib/fieldOfficeDashboard";

export default async function FieldOfficeCustomersPage() {
  const { user, customers } = await getFieldOfficeCustomers();

  return (
    <div className="min-h-screen bg-[#020814] text-slate-100 pt-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 pb-24">
        <section className="rounded-[3rem] border border-slate-800 bg-slate-950/95 p-8 shadow-2xl shadow-slate-950/40">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.35em] text-cyan-300/70">SPRING CO-OPERATIVE FIELD OFFICE</p>
              <h1 className="mt-4 text-4xl font-semibold text-white">Customers</h1>
              <p className="mt-3 text-slate-400">
                Manage customer balances and quickly navigate to record new collections for your branch.
              </p>
            </div>
            <div className="rounded-3xl border border-slate-800 bg-slate-900/80 px-5 py-4 text-sm text-slate-300">
              <p className="font-semibold text-white">Field officer</p>
              <p>{user.name}</p>
              <p>{user.branch || "All branches"}</p>
            </div>
          </div>

          <div className="mt-10 grid gap-6 lg:grid-cols-[1.5fr_0.9fr]">
            <div className="space-y-6">
              <div className="rounded-4xl border border-slate-800 bg-slate-900/80 p-6 shadow-xl shadow-slate-950/20">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-sm uppercase tracking-[0.35em] text-slate-500">Customers on record</p>
                    <p className="mt-2 text-3xl font-semibold text-white">{customers.length}</p>
                  </div>
                  <div className="rounded-3xl bg-slate-950/70 px-4 py-3 text-sm text-slate-300">
                    Total branch balance
                    <p className="mt-2 text-xl font-semibold text-white">
                      {formatCurrency(customers.reduce((sum, customer) => sum + Number(customer.balance.replace(/[^0-9.]/g, "")), 0))}
                    </p>
                  </div>
                </div>
              </div>

              <div className="overflow-hidden rounded-4xl border border-slate-800 bg-slate-900/80 shadow-xl shadow-slate-950/20">
                <div className="bg-slate-950/90 px-6 py-5 text-sm uppercase tracking-[0.35em] text-slate-500">Customer list</div>
                <div className="divide-y divide-slate-800">
                  {customers.map((customer) => (
                    <div key={customer.applicationRef} className="flex flex-col gap-4 px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
                      <div>
                        <p className="text-sm text-slate-400">{customer.applicationRef}</p>
                        <p className="mt-1 text-lg font-semibold text-white">{customer.fullName}</p>
                        <p className="mt-1 text-sm text-slate-400">Joined {customer.joinedDate || "unknown"}</p>
                      </div>
                      <div className="space-y-2 text-right">
                        <p className="text-sm uppercase tracking-[0.35em] text-slate-500">Balance</p>
                        <p className="text-xl font-semibold text-white">{formatCurrency(customer.balance)}</p>
                        <Link
                          href={`/spring-cooperative/field-office/transactions?customerRef=${encodeURIComponent(customer.applicationRef)}`}
                          className="inline-flex rounded-full bg-cyan-500/10 px-4 py-2 text-sm font-semibold text-cyan-300 transition hover:bg-cyan-500/20"
                        >
                          Record payment
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="rounded-4xl border border-slate-800 bg-slate-900/80 p-6 shadow-xl shadow-slate-950/20">
              <p className="text-sm uppercase tracking-[0.35em] text-slate-500">Quick links</p>
              <div className="mt-6 grid gap-3">
                <Link
                  href="/spring-cooperative/field-office/transactions"
                  className="rounded-3xl border border-slate-700 bg-slate-950/80 px-4 py-4 text-sm text-slate-200 transition hover:border-cyan-500/30 hover:bg-slate-900/90"
                >
                  View all transactions
                </Link>
                <Link
                  href="/spring-cooperative/field-office/balance"
                  className="rounded-3xl border border-slate-700 bg-slate-950/80 px-4 py-4 text-sm text-slate-200 transition hover:border-cyan-500/30 hover:bg-slate-900/90"
                >
                  Branch balance summary
                </Link>
                <Link
                  href="/spring-cooperative/field-office/profile"
                  className="rounded-3xl border border-slate-700 bg-slate-950/80 px-4 py-4 text-sm text-slate-200 transition hover:border-cyan-500/30 hover:bg-slate-900/90"
                >
                  Your field office profile
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
