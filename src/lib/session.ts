
import { getIronSession } from "iron-session";
import { cookies } from "next/headers";
import { sessionOptions } from "./session-options";

export interface SessionData {
  isLoggedIn: boolean;
  id: string;
  userType: "student" | "tutor";
}

export async function getSession() {
  const session = await getIronSession<SessionData>(
    await cookies(),
    sessionOptions
  );
  return session;
}
