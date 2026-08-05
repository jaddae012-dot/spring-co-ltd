import { formatCurrency, getDashboardMember } from "@/lib/springCoopDashboard";

export default async function DashboardInvestmentsPage() {
  const member = await getDashboardMember();

  return (
    <div className="min-h-screen bg-[#020814] text-slate-100 pt-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 pb-24">
        <section className="rounded-4xl border border-slate-800 bg-slate-950/95 p-8 shadow-2xl shadow-slate-950/40">
          <p className="text-xs uppercase tracking-[0.35em] text-cyan-300/70">SPRING CO-OPERATIVE UNION</p>
          <h1 className="mt-4 text-4xl font-semibold text-white">Investments</h1>
          <p className="mt-4 text-slate-400">Review share values, dividend returns, and your cooperative investment performance.</p>

          <div className="mt-8 grid gap-4 lg:grid-cols-3">
            <div className="rounded-3xl border border-slate-800 bg-slate-900/80 p-6">
              <p className="text-sm text-slate-400">Share value</p>
              <p className="mt-2 text-3xl font-semibold text-white">{formatCurrency(member.sharesValue)}</p>
            </div>
            <div className="rounded-3xl border border-slate-800 bg-slate-900/80 p-6">
              <p className="text-sm text-slate-400">Dividends earned</p>
              <p className="mt-2 text-3xl font-semibold text-white">{formatCurrency(member.dividendAmount)}</p>
            </div>
            <div className="rounded-3xl border border-slate-800 bg-slate-900/80 p-6">
              <p className="text-sm text-slate-400">Total portfolio</p>
              <p className="mt-2 text-3xl font-semibold text-white">{formatCurrency(member.balance)}</p>
            </div>
          </div>

          <div className="mt-8 rounded-3xl border border-slate-800 bg-slate-900/80 p-6">
            <p className="text-sm uppercase tracking-[0.35em] text-slate-400">Investment insight</p>
            <p className="mt-3 text-slate-300">Your cooperative share value and dividends reflect the return on your member contributions. Continue saving and participating to grow your investment share.</p>
          </div>
        </section>
      </div>
    </div>
  );
}
