import { NextRequest, NextResponse } from "next/server";
import { appendGoogleSheetRow, getGoogleSheetData, updateGoogleSheetRow } from "@/lib/sheets";
import { getSession } from "@/lib/session";

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

function findSheetHeader(row: Record<string, unknown>, aliases: string[]): string | null {
  for (const [key] of Object.entries(row)) {
    const normalizedKey = key.replace(/[^a-zA-Z0-9]/g, "").toLowerCase();
    for (const alias of aliases) {
      const normalizedAlias = alias.replace(/[^a-zA-Z0-9]/g, "").toLowerCase();
      if (normalizedKey === normalizedAlias) {
        return key;
      }
    }
  }
  return null;
}

function parseAmount(value: string) {
  const amount = Number(String(value).replace(/[^0-9.\-]/g, ""));
  return Number.isNaN(amount) ? 0 : amount;
}

export async function POST(req: NextRequest) {
  try {
    const session = await getSession();
    if (!session.isLoggedIn || session.userType !== "fieldOffice") {
      return NextResponse.json({ message: "Unauthorized field office access." }, { status: 401 });
    }

    const body = await req.json();
    const customerRef = normalizeText(body.customerRef);
    const amount = Number(body.amount);
    const transactionType = normalizeText(body.transactionType) || "collection";
    const note = normalizeText(body.note);

    if (!customerRef || Number.isNaN(amount) || amount <= 0) {
      return NextResponse.json({ message: "Customer reference and a valid amount are required." }, { status: 400 });
    }

    const membershipRows = (await getGoogleSheetData("spring_cooperative_memberships")) as Record<string, unknown>[];
    const membershipRow = membershipRows.find((row) => {
      const ref = getField(row, ["ApplicationRef", "Application Reference", "Reference", "application_ref"]);
      return normalizeId(ref) === normalizeId(customerRef);
    });

    let updatedBalance: number | null = null;
    if (membershipRow) {
      const balanceLabel = findSheetHeader(membershipRow, ["Balance", "CurrentBalance", "current_balance", "balance"]);
      const refLabel = findSheetHeader(membershipRow, ["ApplicationRef", "Application Reference", "Reference", "application_ref"]);

      if (balanceLabel && refLabel) {
        const existingBalance = parseAmount(getField(membershipRow, [balanceLabel]));
        const nextBalance = transactionType === "refund" ? Math.max(0, existingBalance - amount) : existingBalance + amount;
        const success = await updateGoogleSheetRow(
          "spring_cooperative_memberships",
          refLabel,
          customerRef,
          { [balanceLabel]: nextBalance.toString() }
        );

        updatedBalance = success ? nextBalance : null;
      }
    }

    await appendGoogleSheetRow("spring_cooperative_field_office_transactions", [
      new Date().toISOString(),
      session.id,
      session.name || "Field Office",
      customerRef,
      transactionType,
      amount.toString(),
      note,
      updatedBalance !== null ? updatedBalance.toString() : "",
    ]);

    return NextResponse.json({
      message: "Transaction recorded successfully.",
      updatedBalance,
    });
  } catch (error) {
    console.error("Field office transaction error:", error);
    return NextResponse.json({ message: "Unable to record transaction. Please try again." }, { status: 500 });
  }
}
