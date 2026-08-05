import { formatCurrency, getDashboardMember, parseNumeric } from "@/lib/springCoopDashboard";

export default async function DashboardLoansPage() {
  const member = await getDashboardMember();
  const loanAmount = parseNumeric(member.loanBalance);
  const loanStatus = member.membershipStatus?.toLowerCase() === "active" ? "Ready for application" : "Review membership status";

  return (
    <div className="min-h-screen bg-[#020814] text-slate-100 pt-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 pb-24">
        <section className="rounded-4xl border border-slate-800 bg-slate-950/95 p-8 shadow-2xl shadow-slate-950/40">
          <p className="text-xs uppercase tracking-[0.35em] text-cyan-300/70">SPRING CO-OPERATIVE UNION</p>
          <h1 className="mt-4 text-4xl font-semibold text-white">Loans</h1>
          <p className="mt-4 text-slate-400">View loan readiness, repayment status, and outstanding obligation details.</p>

          <div className="mt-8 grid gap-4 lg:grid-cols-3">
            <div className="rounded-3xl border border-slate-800 bg-slate-900/80 p-6">
              <p className="text-sm text-slate-400">Outstanding loan balance</p>
              <p className="mt-2 text-3xl font-semibold text-white">{formatCurrency(member.loanBalance)}</p>
            </div>
            <div className="rounded-3xl border border-slate-800 bg-slate-900/80 p-6">
              <p className="text-sm text-slate-400">Loan eligibility</p>
              <p className="mt-2 text-3xl font-semibold text-white">{loanStatus}</p>
            </div>
            <div className="rounded-3xl border border-slate-800 bg-slate-900/80 p-6">
              <p className="text-sm text-slate-400">Estimated available credit</p>
              <p className="mt-2 text-3xl font-semibold text-white">{formatCurrency(Math.max(0, 15000 - loanAmount))}</p>
            </div>
          </div>

          <div className="mt-8 rounded-3xl border border-slate-800 bg-slate-900/80 p-6">
            <p className="text-sm uppercase tracking-[0.35em] text-slate-400">Loan guidance</p>
            <p className="mt-3 text-slate-300">Your cooperative loan amount is calculated against your membership tier and savings history. Keep contributions consistent for better approval terms.</p>
          </div>
        </section>
      </div>
    </div>
  );
}
