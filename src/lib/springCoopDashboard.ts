import { redirect } from "next/navigation";
import { getSession } from "@/lib/session";
import { getGoogleSheetData } from "@/lib/sheets";

export type SpringCoopMember = {
  sessionId: string;
  fullName: string;
  membershipStatus: string;
  membershipTier: string;
  monthlySavings: string;
  balance: string;
  loanBalance: string;
  sharesValue: string;
  dividendAmount: string;
  lastUpdated: string;
  branch: string;
  joinedDate: string;
  phoneNumber: string;
  email: string;
  address: string;
  occupation: string;
  nextOfKin: string;
};

function normalizeId(value: unknown): string {
  return String(value ?? "").replace(/[^a-zA-Z0-9]/g, "").toLowerCase();
}

function getField(row: Record<string, unknown>, aliases: string[]): string {
  const normalizedEntries = Object.entries(row).map(([key, value]) => [
    key.replace(/[^a-zA-Z0-9]/g, "").toLowerCase(),
    value,
  ] as const);

  for (const alias of aliases) {
    const normalizedAlias = alias.replace(/[^a-zA-Z0-9]/g, "").toLowerCase();
    const found = normalizedEntries.find(([key]) => key === normalizedAlias);
    if (found) {
      return String(found[1] ?? "").trim();
    }
  }

  return "";
}

export function formatCurrency(value: number | string) {
  const amount = typeof value === "number" ? value : Number(String(value).replace(/[^0-9.]/g, ""));
  if (Number.isNaN(amount)) return "GH₵0.00";
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 2,
  }).format(amount).replace("$", "GH₵");
}

export function parseNumeric(value: string) {
  return Number(value.replace(/[^0-9.]/g, "")) || 0;
}

export function getStatusBadgeClasses(status: string) {
  const normalized = status.trim().toLowerCase();
  if (normalized === "approved" || normalized === "active") {
    return "rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-2 text-sm font-semibold text-emerald-300";
  }
  if (normalized === "pending") {
    return "rounded-full border border-amber-500/30 bg-amber-500/10 px-4 py-2 text-sm font-semibold text-amber-300";
  }
  return "rounded-full border border-slate-700 bg-slate-950/80 px-4 py-2 text-sm text-slate-300";
}

async function getMemberData(applicationRef: string) {
  const rows = (await getGoogleSheetData("spring_cooperative_memberships")) as Record<string, unknown>[];
  return rows.find((row) => {
    const ref = getField(row, ["ApplicationRef", "Application Reference", "Reference", "application_ref"]);
    return normalizeId(ref) === normalizeId(applicationRef);
  });
}

export async function getDashboardMember() {
  const session = await getSession();
  if (!session.isLoggedIn) {
    redirect("/spring-cooperative/login");
  }

  const memberData = await getMemberData(session.id);
  if (!memberData) {
    redirect("/spring-cooperative/login");
  }

  return {
    sessionId: session.id,
    fullName: getField(memberData, ["FullName", "Name", "ApplicantName", "full_name"]),
    membershipStatus: getField(memberData, ["Status", "ApplicationStatus", "status"]),
    membershipTier: getField(memberData, ["Tier", "MembershipTier", "membership_tier"]),
    monthlySavings: getField(memberData, ["MonthlySavings", "monthly_savings", "SavingsCommitment"]),
    balance: getField(memberData, ["Balance", "CurrentBalance", "balance"]),
    loanBalance: getField(memberData, ["LoanBalance", "loan_balance", "outstanding_loan"]),
    sharesValue: getField(memberData, ["SharesValue", "ShareValue", "shares_value"]),
    dividendAmount: getField(memberData, ["Dividend", "DividendAmount", "dividend_amount"]),
    lastUpdated: getField(memberData, ["LastUpdated", "UpdatedAt", "last_updated"]),
    branch: getField(memberData, ["Branch", "branch"]),
    joinedDate: getField(memberData, ["JoinedDate", "DateJoined", "joined_date"]),
    phoneNumber: getField(memberData, ["Phone", "PhoneNumber", "phone_number"]),
    email: getField(memberData, ["Email", "EmailAddress", "email"]),
    address: getField(memberData, ["Address", "ResidentialAddress", "address"]),
    occupation: getField(memberData, ["Occupation", "JobTitle", "occupation"]),
    nextOfKin: getField(memberData, ["NextOfKin", "NextOfKinName", "next_of_kin"]),
  } as SpringCoopMember;
}
