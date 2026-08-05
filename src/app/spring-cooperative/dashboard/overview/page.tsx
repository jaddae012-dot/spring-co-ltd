import { formatCurrency, getDashboardMember, parseNumeric } from "@/lib/springCoopDashboard";
import FinanceChart from "@/components/dashboard/FinanceChart";
import StatCard from "@/components/dashboard/StatCard";
import StatsCard from "@/components/dashboard/StatsCard";

export default async function DashboardOverviewPage() {
  const member = await getDashboardMember();
  const balance = parseNumeric(member.balance);
  const savings = parseNumeric(member.monthlySavings);
  const loanBalance = parseNumeric(member.loanBalance);
  const shareValue = parseNumeric(member.sharesValue);
  const dividend = parseNumeric(member.dividendAmount);
  const credited = Math.max(0, 15000 - loanBalance);
  const projectedAnnual = savings * 12;
  const activeTier = member.membershipTier || "Standard";

  const chartBase = Math.max(balance, 1200);
  const chartData = [
    { label: "Jan", value: Math.round(chartBase * 0.72) },
    { label: "Feb", value: Math.round(chartBase * 0.81) },
    { label: "Mar", value: Math.round(chartBase * 0.88) },
    { label: "Apr", value: Math.round(chartBase * 0.95) },
    { label: "May", value: Math.round(chartBase * 1.05) },
    { label: "Jun", value: Math.round(chartBase * 1.12) },
  ];

  return (
    <div className="min-h-screen bg-[#020814] text-slate-100 pt-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 pb-24">
        <section className="overflow-hidden rounded-[2.5rem] border border-slate-800 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950/90 p-8 shadow-2xl shadow-slate-950/40">
          <div className="flex flex-col gap-8 xl:flex-row xl:items-end xl:justify-between">
            <div className="max-w-2xl space-y-4">
              <p className="text-xs uppercase tracking-[0.35em] text-cyan-300/70">Spring Co-operative Union</p>
              <h1 className="text-5xl font-semibold text-white sm:text-6xl">Member dashboard</h1>
              <p className="max-w-2xl text-lg leading-8 text-slate-400">
                Track your cooperative savings, loan status, investment value, and member benefits from one modern dashboard.
              </p>
              <div className="flex flex-wrap gap-3">
                <span className="inline-flex rounded-full border border-cyan-400/20 bg-cyan-500/10 px-4 py-2 text-sm uppercase tracking-[0.28em] text-cyan-300">
                  {activeTier}
                </span>
                <span className="inline-flex rounded-full border border-slate-700 bg-slate-900/80 px-4 py-2 text-sm uppercase tracking-[0.28em] text-slate-300">
                  {member.membershipStatus || "Active"}
                </span>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 xl:max-w-md">
              <StatsCard label="Monthly savings" value={savings} color="cyan" />
              <StatsCard label="Loan balance" value={loanBalance} color={loanBalance > 0 ? "red" : "green"} />
              <StatsCard label="Share value" value={shareValue} color="purple" />
              <StatsCard label="Dividend earned" value={dividend} color="yellow" />
            </div>
          </div>

          <div className="mt-10 grid gap-6 xl:grid-cols-[1.6fr_1fr]">
            <div className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
                <StatCard
                  label="Total portfolio"
                  value={formatCurrency(balance)}
                  description="Includes savings, shares, and dividends."
                  accent="text-cyan-300"
                />
                <StatCard
                  label="Savings commitment"
                  value={formatCurrency(savings)}
                  description="Monthly cooperative contribution."
                  accent="text-emerald-300"
                />
                <StatCard
                  label="Available credit"
                  value={formatCurrency(credited)}
                  description="Potential loan capacity."
                  accent="text-yellow-300"
                />
                <StatCard
                  label="Projected annual"
                  value={formatCurrency(projectedAnnual)}
                  description="Estimated yearly savings."
                  accent="text-purple-300"
                />
              </div>

              <FinanceChart
                title="Portfolio performance"
                subtitle="Balance growth over the last 6 months"
                data={chartData}
                accent="cyan"
              />
            </div>

            <div className="space-y-6">
              <div className="rounded-[2rem] border border-slate-800 bg-slate-900/90 p-6 shadow-xl shadow-slate-950/20">
                <p className="text-sm uppercase tracking-[0.35em] text-slate-500">Member quick actions</p>
                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  {[
                    { label: "Make a deposit", href: "/spring-cooperative/membership" },
                    { label: "Apply for loan", href: "/spring-cooperative/login" },
                    { label: "View profile", href: "/spring-cooperative/dashboard/profile" },
                    { label: "Investment details", href: "/spring-cooperative/dashboard/investments" },
                  ].map((item) => (
                    <div key={item.label} className="rounded-3xl border border-slate-800 bg-slate-950/80 p-4 text-sm text-slate-300 transition hover:border-cyan-500/30 hover:bg-slate-900/90 hover:text-white">
                      <p className="font-semibold text-white">{item.label}</p>
                      <p className="mt-2 text-slate-400">{item.href.replace(/\/spring-cooperative\//, "")}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-[2rem] border border-slate-800 bg-slate-900/90 p-6 shadow-xl shadow-slate-950/20">
                <p className="text-sm uppercase tracking-[0.35em] text-slate-500">Member benefits</p>
                <ul className="mt-6 space-y-4 text-sm text-slate-300">
                  <li className="flex items-start gap-3">
                    <span className="mt-1 inline-flex h-2.5 w-2.5 rounded-full bg-cyan-400" />
                    <span>Higher savings tiers improve loan terms and dividend payouts.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-1 inline-flex h-2.5 w-2.5 rounded-full bg-emerald-400" />
                    <span>Reinvest dividends to grow your cooperative share value faster.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-1 inline-flex h-2.5 w-2.5 rounded-full bg-yellow-400" />
                    <span>Maintain contributions to keep loan eligibility and portfolio health strong.</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
