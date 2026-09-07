import { redirect } from "next/navigation";
import { getSession } from "@/lib/session";
import TutorAssessmentBuilder from "@/components/dashboard/TutorAssessmentBuilder";

export default async function NewTutorAssessmentPage() {
  const session = await getSession();

  if (!session.isLoggedIn || session.userType !== "tutor") {
    redirect("/prime-college/login");
  }

  return (
    <div className="min-h-screen bg-slate-950 pt-24 text-white">
      <div className="mx-auto max-w-6xl px-4 py-8">
        <TutorAssessmentBuilder />
      </div>
    </div>
  );
}
