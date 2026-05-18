import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const sessionCookie = request.cookies.get("prime-college-session");
  const pathname = request.nextUrl.pathname;

  const isAdminArea = pathname === "/admin" || pathname.startsWith("/admin/");
  const isAdminApi = pathname === "/api/admin" || pathname.startsWith("/api/admin/");

  if (pathname.startsWith("/prime-college/admin/login")) {
    return NextResponse.next();
  }

  if (!sessionCookie?.value) {
    if (isAdminApi) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    if (isAdminArea) {
      const loginUrl = new URL("/prime-college/admin/login", request.url);
      loginUrl.searchParams.set("from", request.nextUrl.pathname);
      return NextResponse.redirect(loginUrl);
    }

    if (pathname.startsWith("/prime-college/admin")) {
      const loginUrl = new URL("/prime-college/admin/login", request.url);
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
    "/admin",
    "/admin/:path*",
    "/api/admin/:path*",
  ],
};
