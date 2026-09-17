import { notFound, redirect } from "next/navigation";
import { getSession } from "@/lib/session";
import { getAssessmentById } from "@/data/prime-college-assessments";
import AssessmentQuizClient from "@/components/dashboard/AssessmentQuizClient";

interface AssessmentDetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function AssessmentDetailPage({ params }: AssessmentDetailPageProps) {
  const session = await getSession();

  if (!session.isLoggedIn || session.userType !== "student") {
    redirect("/prime-college/login");
  }

  const { id } = await params;
  const assessment = getAssessmentById(id);

  if (!assessment) {
    notFound();
  }

  return <AssessmentQuizClient assessment={assessment} />;
}
