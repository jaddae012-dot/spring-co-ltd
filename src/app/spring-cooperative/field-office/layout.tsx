"use client";

import { usePathname } from "next/navigation";
import BottomNavigation from "@/components/BottomNavigation";

export default function SpringCooperativeFieldOfficeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isLoginPath = pathname?.endsWith("/login");

  return (
    <>
      <div className="min-h-screen bg-[#020814] text-slate-100">
        {!isLoginPath ? (
          <header className="border-b border-slate-800 bg-slate-950/95 px-4 py-6 shadow-sm shadow-slate-950/20">
            <div className="mx-auto flex max-w-6xl flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
              <div className="max-w-3xl">
                <p className="text-xs uppercase tracking-[0.35em] text-cyan-300/70">SPRING CO-OPERATIVE FIELD OFFICE</p>
                <h1 className="mt-2 text-3xl font-semibold text-white">Field office dashboard</h1>
                <p className="mt-3 text-sm leading-6 text-slate-400">
                  Record customer collections, review balances, and keep member accounts updated from the field.
                </p>
              </div>
              <div className="flex justify-end">
                <a
                  href="/api/auth/logout"
                  className="inline-flex items-center rounded-full border border-rose-500/20 bg-rose-500/10 px-4 py-2 text-sm font-semibold text-rose-300 transition hover:bg-rose-500/20 hover:text-white"
                >
                  Logout
                </a>
              </div>
            </div>
          </header>
        ) : null}

        <main className="pb-28">{children}</main>
      </div>
      {!isLoginPath ? <BottomNavigation /> : null}
    </>
  );
}
