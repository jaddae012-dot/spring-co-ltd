import { ReactNode } from "react";

interface SectionCardProps {
  title: string;
  children: ReactNode;
  className?: string;
}

export default function SectionCard({ title, children, className = "" }: SectionCardProps) {
  return (
    <section className={`rounded-xl border border-slate-700 bg-slate-900/80 p-5 ${className}`.trim()}>
      <h3 className="text-lg font-bold mb-4">{title}</h3>
      {children}
    </section>
  );
}
