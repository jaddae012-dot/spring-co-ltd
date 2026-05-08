import { redirect } from "next/navigation";
import { getSession } from "@/lib/session";

export default async function AdminEntryPage() {
  const session = await getSession();

  if (!session.isLoggedIn) {
    redirect("/prime-college/admin/login");
  }

  if (session.userType === "student") {
    redirect("/prime-college/dashboard");
  }

  redirect("/prime-college/admin/dashboard");
}