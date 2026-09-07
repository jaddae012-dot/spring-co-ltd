"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { describeSecretaryPath, recordSecretaryEntry } from "@/lib/company-secretary";

export default function CompanySecretaryTracker() {
  const pathname = usePathname();
  const initialisedRef = useRef(false);
  const previousPathRef = useRef<string | null>(null);

  useEffect(() => {
    if (!pathname) {
      return;
    }

    const readablePath = describeSecretaryPath(pathname);

    if (!initialisedRef.current) {
      initialisedRef.current = true;
      recordSecretaryEntry({
        category: "system",
        title: "Website session started",
        detail: `The company secretary opened a new website session on ${readablePath}.`,
        path: pathname,
      });
    }

    if (previousPathRef.current && previousPathRef.current !== pathname) {
      recordSecretaryEntry({
        category: "navigation",
        title: "Page visited",
        detail: `Navigation moved from ${describeSecretaryPath(previousPathRef.current)} to ${readablePath}.`,
        path: pathname,
      });
    }

    previousPathRef.current = pathname;
  }, [pathname]);

  useEffect(() => {
    const handleSecretaryNote = (event: Event) => {
      const customEvent = event as CustomEvent<unknown>;
      const detail = customEvent.detail as
        | {
            category?: "system" | "navigation" | "action" | "document" | "auth";
            title?: string;
            detail?: string;
            path?: string;
          }
        | undefined;

      if (!detail?.title || !detail?.detail || !detail?.category) {
        return;
      }

      recordSecretaryEntry({
        category: detail.category,
        title: detail.title,
        detail: detail.detail,
        path: detail.path,
      });
    };

    window.addEventListener("spring-company-secretary-note", handleSecretaryNote as EventListener);
    return () => {
      window.removeEventListener("spring-company-secretary-note", handleSecretaryNote as EventListener);
    };
  }, []);

  return null;
}
