"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const dashboardTabs = [
  { href: "/spring-cooperative/dashboard/overview", label: "Overview", icon: "🏠" },
  { href: "/spring-cooperative/dashboard/savings", label: "Savings", icon: "💰" },
  { href: "/spring-cooperative/dashboard/loans", label: "Loans", icon: "💳" },
  { href: "/spring-cooperative/dashboard/investments", label: "Investments", icon: "📈" },
  { href: "/spring-cooperative/dashboard/profile", label: "Profile", icon: "👤" },
];

const fieldOfficeTabs = [
  { href: "/spring-cooperative/field-office/customers", label: "Customers", icon: "👥" },
  { href: "/spring-cooperative/field-office/transactions", label: "Transactions", icon: "🧾" },
  { href: "/spring-cooperative/field-office/balance", label: "Balance", icon: "💵" },
  { href: "/spring-cooperative/field-office/profile", label: "Profile", icon: "👤" },
];

export default function BottomNavigation() {
  const pathname = usePathname();
  const isDashboardRoute = pathname?.startsWith("/spring-cooperative/dashboard");
  const isFieldOfficeRoute = pathname?.startsWith("/spring-cooperative/field-office");

  if (!isDashboardRoute && !isFieldOfficeRoute) return null;

  const tabs = isDashboardRoute ? dashboardTabs : fieldOfficeTabs;

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-slate-800 bg-slate-950/95 shadow-[0_-20px_50px_-30px_rgba(0,0,0,0.7)] backdrop-blur-lg md:hidden">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
        {tabs.map((tab) => {
          const isActive = pathname === tab.href;
          return (
            <Link
              key={tab.href}
              href={tab.href}
              aria-current={isActive ? "page" : undefined}
              className={`flex flex-col items-center justify-center gap-1 rounded-3xl px-3 py-2 text-center text-xs font-semibold transition ${
                isActive
                  ? "bg-slate-900 text-cyan-300 shadow-[0_0_0_1px_rgba(56,189,248,0.25)]"
                  : "text-slate-400 hover:text-white hover:bg-slate-900/50"
              }`}
            >
              <span className="text-base">{tab.icon}</span>
              <span>{tab.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
