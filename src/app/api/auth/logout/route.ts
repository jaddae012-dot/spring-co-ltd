
import { getSession } from "@/lib/session";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const session = await getSession();
  session.destroy();

  const referer = req.headers.get("referer") || "";
  let redirectPath = "/";

  try {
    const refererUrl = new URL(referer);
    if (refererUrl.pathname.startsWith("/spring-cooperative")) {
      if (
        refererUrl.pathname.startsWith("/spring-cooperative/business-profile") ||
        refererUrl.pathname.startsWith("/spring-cooperative/secret-login")
      ) {
        redirectPath = "/spring-cooperative/secret-login";
      } else {
        redirectPath = "/spring-cooperative/login";
      }
    } else if (refererUrl.pathname.startsWith("/prime-college")) {
      redirectPath = "/prime-college/login";
    }
  } catch {
    redirectPath = "/";
  }

  return NextResponse.redirect(new URL(redirectPath, req.url));
}
