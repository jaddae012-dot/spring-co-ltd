import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/session";

export async function GET(req: NextRequest) {
  const session = await getSession();
  session.destroy();
  return NextResponse.redirect(new URL("/fast-cleaners/admin/login", req.url));
}