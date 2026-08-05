interface StatCardProps {
  label: string;
  value: number | string;
  color?: "blue" | "yellow" | "purple" | "green";
  subtitle?: string;
  // allow passing a description (old prop name used in some pages)
  description?: string;
  // optional accent tailwind classes (e.g. "text-cyan-300")
  accent?: string;
}

const colorClasses = {
  blue: "border-blue-500/20 text-blue-300",
  yellow: "border-yellow-500/20 text-yellow-300",
  purple: "border-purple-500/20 text-purple-300",
  green: "border-emerald-500/20 text-emerald-300",
};

export default function StatCard({ label, value, color = "blue", subtitle, description, accent }: StatCardProps) {
  const displaySubtitle = description ?? subtitle;
  return (
    <div className={`group relative overflow-hidden rounded-[1.75rem] border bg-slate-950/85 p-6 shadow-[0_30px_80px_-40px_rgba(0,0,0,0.75)] transition duration-300 hover:-translate-y-1 hover:border-white/10 ${colorClasses[color]}`}>
      <div className="pointer-events-none absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-cyan-400/70 via-slate-400/30 to-emerald-400/70 opacity-0 transition duration-300 group-hover:opacity-100" />
      <p className={`text-xs uppercase tracking-[0.32em] text-slate-500 ${accent ?? ""}`}>{label}</p>
      <p className="mt-4 text-3xl font-semibold text-white">{value}</p>
      {displaySubtitle ? <p className="mt-2 text-sm text-slate-400">{displaySubtitle}</p> : null}
    </div>
  );
}
