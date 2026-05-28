interface StatCardProps {
  label: string;
  value: number | string;
  color?: "blue" | "yellow" | "purple" | "green";
}

const colorClasses = {
  blue: "bg-blue-500/10 text-blue-300 border-blue-500/20",
  yellow: "bg-yellow-500/10 text-yellow-300 border-yellow-500/20",
  purple: "bg-purple-500/10 text-purple-300 border-purple-500/20",
  green: "bg-green-500/10 text-green-300 border-green-500/20",
};

export default function StatCard({ label, value, color = "blue" }: StatCardProps) {
  return (
    <div
      className={`p-4 rounded-lg border ${colorClasses[color]}`}
    >
      <p className="text-sm font-medium text-gray-400">{label}</p>
      <p className="text-3xl font-bold">{value}</p>
    </div>
  );
}
