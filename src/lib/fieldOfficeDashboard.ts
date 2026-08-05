import { redirect } from "next/navigation";
import { getGoogleSheetData } from "@/lib/sheets";
import { getSession } from "@/lib/session";

export type FieldOfficeUser = {
  officeId: string;
  name: string;
  branch: string;
  phone: string;
  email: string;
};

function normalizeText(value: unknown): string {
  return String(value ?? "").trim();
}

function normalizeId(value: unknown): string {
  return normalizeText(value).replace(/[^a-zA-Z0-9]/g, "").toLowerCase();
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
  })
    .format(amount)
    .replace("$", "GH₵");
}

export function parseNumeric(value: string) {
  return Number(value.replace(/[^0-9.]/g, "")) || 0;
}

export async function authenticateFieldOfficeUser(officeId: string, secret: string) {
  const normalizedOfficeId = normalizeId(officeId);
  const normalizedSecret = normalizeId(secret);

  const rows = (await getGoogleSheetData("spring_cooperative_field_office_users")) as Record<string, unknown>[];
  return rows.find((row) => {
    const rowOfficeId = getField(row, ["OfficeID", "Office ID", "Username", "Email", "Login"]);
    const rowSecret = getField(row, ["PIN", "Pin", "Password", "Secret", "Passcode"]);

    return (
      normalizeId(rowOfficeId) === normalizedOfficeId &&
      normalizeId(rowSecret) === normalizedSecret
    );
  });
}

export async function getFieldOfficeUser(officeId: string) {
  const normalizedOfficeId = normalizeId(officeId);
  const rows = (await getGoogleSheetData("spring_cooperative_field_office_users")) as Record<string, unknown>[];
  const found = rows.find((row) => {
    const rowOfficeId = getField(row, ["OfficeID", "Office ID", "Username", "Email", "Login"]);
    return normalizeId(rowOfficeId) === normalizedOfficeId;
  });

  if (!found) return null;

  return {
    officeId: normalizeText(getField(found, ["OfficeID", "Office ID", "Username", "Email", "Login"])),
    name: normalizeText(getField(found, ["Name", "FullName", "Representative", "AgentName"])) || "Field Office Rep",
    branch: normalizeText(getField(found, ["Branch", "OfficeBranch", "BranchName"])) || "",
    phone: normalizeText(getField(found, ["Phone", "PhoneNumber", "Phone Number", "Contact"])),
    email: normalizeText(getField(found, ["Email", "EmailAddress", "Email Address"])),
  } as FieldOfficeUser;
}

export async function getFieldOfficeSession() {
  const session = await getSession();
  if (!session.isLoggedIn || session.userType !== "fieldOffice") {
    redirect("/spring-cooperative/field-office/login");
  }

  const user = await getFieldOfficeUser(session.id);
  if (!user) {
    redirect("/spring-cooperative/field-office/login");
  }

  return { session, user };
}

export async function getFieldOfficeCustomers() {
  const { user } = await getFieldOfficeSession();
  const rows = (await getGoogleSheetData("spring_cooperative_memberships")) as Record<string, unknown>[];

  const customers = rows.map((row) => ({
    applicationRef: getField(row, ["ApplicationRef", "Application Reference", "Reference", "application_ref"]),
    fullName: getField(row, ["FullName", "Name", "ApplicantName", "full_name"]),
    membershipStatus: getField(row, ["Status", "ApplicationStatus", "status"]),
    branch: getField(row, ["Branch", "branch"]),
    balance: getField(row, ["Balance", "CurrentBalance", "balance"]),
    monthlySavings: getField(row, ["MonthlySavings", "monthly_savings", "SavingsCommitment"]),
    phoneNumber: getField(row, ["Phone", "PhoneNumber", "Phone Number", "phone"]),
    email: getField(row, ["Email", "EmailAddress", "email"]),
    joinedDate: getField(row, ["JoinedDate", "DateJoined", "joined_date"]),
  })) as Array<{
    applicationRef: string;
    fullName: string;
    membershipStatus: string;
    branch: string;
    balance: string;
    monthlySavings: string;
    phoneNumber: string;
    email: string;
    joinedDate: string;
  }>;

  const trimmedBranch = user.branch.trim();
  const filtered = trimmedBranch
    ? customers.filter((customer) => customer.branch.toLowerCase() === trimmedBranch.toLowerCase())
    : customers;

  return {
    user,
    customers: filtered.sort((a, b) => a.fullName.localeCompare(b.fullName)),
  };
}

export async function getFieldOfficeTransactions() {
  const { user } = await getFieldOfficeSession();
  const rows = (await getGoogleSheetData("spring_cooperative_field_office_transactions")) as Record<string, unknown>[];

  const transactions = rows
    .map((row) => ({
      recordedAt: getField(row, ["Timestamp", "RecordedAt", "CreatedAt", "Date", "DateTime"]),
      officeId: getField(row, ["OfficeID", "Office ID", "FieldOfficeID", "OfficeRef"]),
      customerRef: getField(row, ["CustomerRef", "Customer Reference", "ApplicationRef", "Reference"]),
      amount: getField(row, ["Amount", "TransactionAmount", "Payment"]),
      transactionType: getField(row, ["Type", "TransactionType", "Transaction"]),
      note: getField(row, ["Note", "Notes", "Description"]),
    }))
    .sort((a, b) => {
      const dateA = new Date(a.recordedAt).getTime() || 0;
      const dateB = new Date(b.recordedAt).getTime() || 0;
      return dateB - dateA;
    });

  return { user, transactions };
}
