"use client"
import { useEffect, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";

export default function AutoLogoutOnNav() {
  const pathname = usePathname();
  const router = useRouter();
  const prev = useRef<string | null>(null);

  useEffect(() => {
    if (prev.current === null) {
      prev.current = pathname;
      return;
    }
    if (pathname === prev.current) return;

    // Don't trigger while on the login page
    if (pathname === "/fast-cleaners/admin/login") {
      prev.current = pathname;
      return;
    }

    const wasAdmin = prev.current.startsWith("/fast-cleaners/admin");
    const nowAdmin = pathname.startsWith("/fast-cleaners/admin");

    // If navigating between admin pages, log out and redirect to login
    if (wasAdmin && nowAdmin && pathname !== prev.current) {
      (async () => {
        try {
          await fetch("/api/fast-cleaners/admin/logout", { method: "GET", credentials: "same-origin" });
        } catch (e) {
          // best-effort logout
        }
        router.replace("/fast-cleaners/admin/login");
      })();
    }

    prev.current = pathname;
  }, [pathname, router]);

  return null;
}
