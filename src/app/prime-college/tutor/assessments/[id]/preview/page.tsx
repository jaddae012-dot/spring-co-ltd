import { notFound, redirect } from "next/navigation";
import { getSession } from "@/lib/session";
import { getAssessmentById } from "@/data/prime-college-assessments";
import AssessmentQuizClient from "@/components/dashboard/AssessmentQuizClient";

interface TutorAssessmentPreviewPageProps {
  params: Promise<{ id: string }>;
}

export default async function TutorAssessmentPreviewPage({ params }: TutorAssessmentPreviewPageProps) {
  const session = await getSession();

  if (!session.isLoggedIn || (session.userType !== "tutor" && session.userType !== "admin")) {
    redirect("/prime-college/login");
  }

  const { id } = await params;
  const assessment = await getAssessmentById(id);

  if (!assessment) {
    notFound();
  }

  return <AssessmentQuizClient assessment={assessment} isPreview />;
}
