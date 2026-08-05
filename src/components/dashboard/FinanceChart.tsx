interface ChartPoint {
  label: string;
  value: number;
}

interface FinanceChartProps {
  title: string;
  subtitle: string;
  data: ChartPoint[];
  accent?: "cyan" | "emerald" | "yellow";
}

const accentClasses = {
  cyan: "from-cyan-400 via-slate-400 to-cyan-600",
  emerald: "from-emerald-400 via-slate-400 to-emerald-600",
  yellow: "from-yellow-400 via-slate-400 to-yellow-500",
};

export default function FinanceChart({
  title,
  subtitle,
  data,
  accent = "cyan",
}: FinanceChartProps) {
  const maxValue = Math.max(...data.map((point) => point.value), 1);
  const points = data.map((point, index) => {
    const x = index * (100 / Math.max(data.length - 1, 1));
    const y = 100 - (point.value / maxValue) * 84;
    return `${x},${y}`;
  });

  return (
    <section className="rounded-[2rem] border border-slate-800 bg-slate-950/90 p-6 shadow-2xl shadow-slate-950/20">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.35em] text-slate-500">{title}</p>
          <h2 className="mt-3 text-2xl font-semibold text-white">{subtitle}</h2>
        </div>
        <div className="rounded-full border border-slate-800 bg-slate-900/80 px-4 py-2 text-sm text-slate-300">
          {data.length} months of trend
        </div>
      </div>

      <div className="mt-8 min-h-[280px] rounded-[1.75rem] border border-slate-800 bg-slate-900/80 p-4">
        <svg viewBox="0 0 100 100" className="h-full w-full overflow-visible">
          <defs>
            <linearGradient id="chartGradient" x1="0" x2="1" y1="0" y2="1">
              <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.95" />
              <stop offset="100%" stopColor="#0f766e" stopOpacity="0.4" />
            </linearGradient>
          </defs>

          <path
            d={`M0,100 L${points.join(" L")} L100,100 Z`}
            fill="url(#chartGradient)"
            opacity="0.75"
          />
          <path
            d={`M${points.join(" L")}`}
            fill="none"
            stroke="#38bdf8"
            strokeWidth="1.6"
            vectorEffect="non-scaling-stroke"
          />
          {data.map((point, index) => {
            const x = index * (100 / Math.max(data.length - 1, 1));
            const y = 100 - (point.value / maxValue) * 84;
            return (
              <g key={point.label}>
                <circle cx={x} cy={y} r="1.8" fill="#38bdf8" />
                <circle cx={x} cy={y} r="3.5" fill="rgba(56,189,248,0.12)" />
              </g>
            );
          })}
          <g className="text-[2.8px] fill-slate-500" fontFamily="Inter, ui-sans-serif, system-ui, sans-serif">
            {data.map((point, index) => {
              const x = index * (100 / Math.max(data.length - 1, 1));
              return (
                <text key={point.label} x={x} y="98" textAnchor="middle">
                  {point.label}
                </text>
              );
            })}
          </g>
        </svg>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        {data.slice(-2).map((point) => (
          <div key={point.label} className="rounded-3xl border border-slate-800 bg-slate-950/75 p-4 text-sm text-slate-300">
            <p className="font-medium text-slate-200">{point.label}</p>
            <p className="mt-3 text-xl font-semibold text-white">GH₵{point.value.toLocaleString()}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
