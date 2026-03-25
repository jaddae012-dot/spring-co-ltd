import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const sessionCookie = request.cookies.get("prime-college-session");

  if (!sessionCookie?.value) {
    const loginUrl = new URL("/prime-college/login", request.url);
    loginUrl.searchParams.set("from", request.nextUrl.pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/prime-college/dashboard/:path*",
    "/prime-college/tutor/dashboard/:path*",
    "/prime-college/admin/test/:path*",
  ],
};
