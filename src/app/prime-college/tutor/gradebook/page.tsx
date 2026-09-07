import { redirect } from "next/navigation";
import { getSession } from "@/lib/session";
import TutorGradebook from "@/components/dashboard/TutorGradebook";

export default async function TutorGradebookPage() {
  const session = await getSession();
  if (!session.isLoggedIn || (session.userType !== "tutor" && session.userType !== "admin")) {
    redirect("/prime-college/login");
  }

  return <div className="min-h-screen bg-slate-950 px-4 pb-12 pt-24 text-white"><div className="mx-auto max-w-7xl"><TutorGradebook /></div></div>;
}
