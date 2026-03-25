function capPercent(value: number): number {
  return Math.max(0, Math.min(100, value));
}

function percentWidthClass(percent: number): string {
  const level = Math.round(capPercent(percent) / (100 / 12));
  const classes = [
    "w-0",
    "w-1/12",
    "w-2/12",
    "w-3/12",
    "w-4/12",
    "w-5/12",
    "w-6/12",
    "w-7/12",
    "w-8/12",
    "w-9/12",
    "w-10/12",
    "w-11/12",
    "w-full",
  ];
  return classes[Math.max(0, Math.min(12, level))];
}

interface ProgressMeterProps {
  label: string;
  valueLabel: string;
  percent: number;
  tone?: "cyan" | "emerald" | "amber";
  helperText?: string;
}

export default function ProgressMeter({
  label,
  valueLabel,
  percent,
  tone = "cyan",
  helperText,
}: ProgressMeterProps) {
  const toneClass =
    tone === "emerald"
      ? "bg-emerald-400"
      : tone === "amber"
        ? "bg-amber-400"
        : "bg-cyan-400";

  const safePercent = capPercent(percent);

  return (
    <div>
      <div className="flex items-center justify-between text-sm mb-2">
        <p className="text-slate-300">{label}</p>
        <p className="font-semibold">{valueLabel}</p>
      </div>
      <div className="h-2.5 rounded-full bg-slate-800 overflow-hidden">
        <div
          className={`h-full rounded-full ${toneClass} ${percentWidthClass(safePercent)} transition-all duration-500`}
        />
      </div>
      {helperText ? <p className="text-xs text-amber-300 mt-2">{helperText}</p> : null}
    </div>
  );
}
