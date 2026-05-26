
import { getIronSession } from "iron-session";
import { cookies } from "next/headers";
import { sessionOptions } from "./session-options";

export interface SessionData {
  isLoggedIn: boolean;
  id: string;
  name?: string;
  userType: "student" | "tutor" | "admin";
}

export async function getSession() {
  const cookieStore = await cookies();
  const session = await getIronSession<SessionData>(cookieStore, sessionOptions);
  return session;
}
