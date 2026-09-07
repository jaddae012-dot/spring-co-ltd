import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const sessionCookie = request.cookies.get("prime-college-session");
  const pathname = request.nextUrl.pathname;

  const isAdminArea = pathname === "/admin" || pathname.startsWith("/admin/");
  const isAdminApi = pathname === "/api/admin" || pathname.startsWith("/api/admin/");
  const isSpringCoopBusinessProfile = pathname === "/spring-cooperative/business-profile" || pathname.startsWith("/spring-cooperative/business-profile/");

  if (pathname.startsWith("/prime-college/admin/login")) {
    return NextResponse.next();
  }

  if (pathname.startsWith("/spring-cooperative/secret-login")) {
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

    if (isSpringCoopBusinessProfile) {
      const loginUrl = new URL("/spring-cooperative/secret-login", request.url);
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
    "/prime-college/assessments/:path*",
    "/prime-college/assessments",
    "/prime-college/tutor/dashboard/:path*",    "/prime-college/tutor/assessments",
    "/prime-college/tutor/assessments/:path*",    "/prime-college/admin",
    "/prime-college/admin/:path*",
    "/spring-cooperative/business-profile",
    "/spring-cooperative/business-profile/:path*",
    "/admin",
    "/admin/:path*",
    "/api/admin/:path*",
  ],
};
