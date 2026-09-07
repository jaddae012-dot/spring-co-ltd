export type SecretaryEntryCategory =
  | "system"
  | "navigation"
  | "action"
  | "document"
  | "auth";

export interface SecretaryEntry {
  id: string;
  category: SecretaryEntryCategory;
  title: string;
  detail: string;
  path?: string;
  timestamp: string;
  dateLabel: string;
  timeLabel: string;
}

export interface SecretaryEntryInput {
  category: SecretaryEntryCategory;
  title: string;
  detail: string;
  path?: string;
}

export const COMPANY_SECRETARY_STORAGE_KEY = "spring-company-secretary-log";
export const COMPANY_SECRETARY_EVENT = "spring-company-secretary-updated";
export const COMPANY_SECRETARY_MAX_ENTRIES = 150;

export function formatSecretaryDateParts(date: Date) {
  const dateLabel = new Intl.DateTimeFormat("en-GH", {
    year: "numeric",
    month: "short",
    day: "2-digit",
  }).format(date);

  const timeLabel = new Intl.DateTimeFormat("en-GH", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  }).format(date);

  return { dateLabel, timeLabel };
}

export function createSecretaryEntry(input: SecretaryEntryInput, now = new Date()): SecretaryEntry {
  const { dateLabel, timeLabel } = formatSecretaryDateParts(now);

  return {
    id: `${now.getTime()}-${Math.random().toString(36).slice(2, 10)}`,
    category: input.category,
    title: input.title,
    detail: input.detail,
    path: input.path,
    timestamp: now.toISOString(),
    dateLabel,
    timeLabel,
  };
}

export function readSecretaryEntries(): SecretaryEntry[] {
  if (typeof window === "undefined") {
    return [];
  }

  try {
    const raw = window.localStorage.getItem(COMPANY_SECRETARY_STORAGE_KEY);
    if (!raw) return [];

    const parsed = JSON.parse(raw) as SecretaryEntry[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function writeSecretaryEntries(entries: SecretaryEntry[]) {
  window.localStorage.setItem(
    COMPANY_SECRETARY_STORAGE_KEY,
    JSON.stringify(entries.slice(0, COMPANY_SECRETARY_MAX_ENTRIES))
  );
}

export function recordSecretaryEntry(input: SecretaryEntryInput, now = new Date()): SecretaryEntry | null {
  if (typeof window === "undefined") {
    return null;
  }

  const entry = createSecretaryEntry(input, now);
  const entries = [entry, ...readSecretaryEntries()].slice(0, COMPANY_SECRETARY_MAX_ENTRIES);
  writeSecretaryEntries(entries);
  window.dispatchEvent(new CustomEvent(COMPANY_SECRETARY_EVENT, { detail: entry }));

  // Fire-and-forget: attempt to persist the entry server-side for auditability.
  // Do not block or throw on failure — localStorage remains the source of truth for the client.
  try {
    void fetch("/api/spring-cooperative/company-secretary/entries", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ entry }),
      cache: "no-store",
    }).catch((err) => console.warn("Failed to persist secretary entry:", err));
  } catch (e) {
    // ignore
  }
  return entry;
}

export function describeSecretaryPath(pathname: string): string {
  if (!pathname) return "the website";

  const normalized = pathname.replace(/\/+$/, "");

  if (normalized === "/") return "the company home page";
  if (normalized === "/about") return "the corporate about page";
  if (normalized === "/contact") return "the company contact page";
  if (normalized === "/blog") return "the company blog";
  if (normalized === "/subsidiaries") return "the subsidiaries overview page";
  if (normalized === "/spring-cooperative") return "the SPRING Co-operative landing page";
  if (normalized === "/spring-cooperative/login") return "the SPRING Co-operative login page";
  if (normalized === "/spring-cooperative/secret-login") return "the secret access login page";
  if (normalized === "/spring-cooperative/business-profile") return "the private business profile";
  if (normalized.startsWith("/spring-cooperative/")) return `the SPRING Co-operative section at ${normalized}`;

  return `the page at ${normalized}`;
}
