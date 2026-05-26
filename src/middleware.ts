import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const sessionCookie = request.cookies.get("prime-college-session");
  const pathname = request.nextUrl.pathname;

  // Allow authentication endpoints and public fast-cleaners APIs through
  if (
    pathname.startsWith("/api/auth") ||
    pathname.startsWith("/api/fast-cleaners/") ||
    pathname === "/api/fast-cleaners"
  ) {
    return NextResponse.next();
  }

  const isAdminArea =
    pathname === "/admin" ||
    pathname.startsWith("/admin/") ||
    pathname.startsWith("/prime-college/admin") ||
    pathname.startsWith("/fast-cleaners/admin");
  const isAdminApi =
    pathname === "/api/admin" ||
    pathname.startsWith("/api/admin/") ||
    pathname.startsWith("/api/fast-cleaners/admin");

  // Allow the prime-college and fast-cleaners admin login pages through
  if (
    pathname.startsWith("/prime-college/admin/login") ||
    pathname.startsWith("/fast-cleaners/admin/login")
  ) {
    return NextResponse.next();
  }

  if (!sessionCookie?.value) {
    if (isAdminApi) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    if (isAdminArea) {
      // Choose the appropriate login page based on the path
      const targetLogin = pathname.startsWith("/fast-cleaners/admin")
        ? "/fast-cleaners/admin/login"
        : "/prime-college/admin/login";

      const loginUrl = new URL(targetLogin, request.url);
      loginUrl.searchParams.set("from", request.nextUrl.pathname);
      return NextResponse.redirect(loginUrl);
    }

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
    "/prime-college/admin",
    "/prime-college/admin/:path*",
    "/fast-cleaners/admin",
    "/fast-cleaners/admin/:path*",
    "/admin",
    "/admin/:path*",
    "/api/admin/:path*",
    "/api/fast-cleaners/admin/:path*",
  ],
};
