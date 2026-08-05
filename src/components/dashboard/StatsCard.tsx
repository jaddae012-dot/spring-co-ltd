interface StatsCardProps {
  label: string;
  value: number;
  color: "blue" | "yellow" | "green" | "red" | "purple" | "cyan";
}

export default function StatsCard({ label, value, color }: StatsCardProps) {
  const colorClasses: Record<string, string> = {
    blue: "bg-blue-500/10 border-blue-500/30 text-blue-400",
    yellow: "bg-yellow-500/10 border-yellow-500/30 text-yellow-400",
    green: "bg-green-500/10 border-green-500/30 text-green-400",
    red: "bg-red-500/10 border-red-500/30 text-red-400",
    purple: "bg-purple-500/10 border-purple-500/30 text-purple-400",
    cyan: "bg-cyan-500/10 border-cyan-500/30 text-cyan-400",
  };

  return (
    <div className={`rounded-xl border p-6 ${colorClasses[color]}`}>
      <p className="text-sm font-medium text-gray-400 mb-2">{label}</p>
      <p className="text-3xl font-bold">{value}</p>
    </div>
  );
}
