import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/session";

const SECRET_USERNAME = "King AJ";
const SECRET_PASSWORD = "KWAME-C26";

function normalizeText(value: unknown): string {
  return String(value ?? "").trim();
}

function sanitizeReturnTo(value: unknown): string {
  const path = normalizeText(value);

  if (!path) {
    return "/spring-cooperative/business-profile";
  }

  if (!path.startsWith("/spring-cooperative/")) {
    return "/spring-cooperative/business-profile";
  }

  return path;
}

export async function POST(req: NextRequest) {
  try {
    const session = await getSession();
    const body = await req.json();
    const username = normalizeText(body.username);
    const password = normalizeText(body.password);
    const returnTo = sanitizeReturnTo(body.returnTo);

    if (!username || !password) {
      return NextResponse.json({ message: "Username and password are required." }, { status: 400 });
    }

    if (username !== SECRET_USERNAME || password !== SECRET_PASSWORD) {
      return NextResponse.json({ message: "Invalid secret login credentials." }, { status: 401 });
    }

    session.isLoggedIn = true;
    session.id = "king-aj";
    session.name = "King AJ";
    session.userType = "admin";
    await session.save();

    return NextResponse.json({ message: "Login successful", returnTo }, { status: 200 });
  } catch (error) {
    console.error("Spring Cooperative secret login error:", error);
    return NextResponse.json({ message: "Login failed. Please try again later." }, { status: 500 });
  }
}