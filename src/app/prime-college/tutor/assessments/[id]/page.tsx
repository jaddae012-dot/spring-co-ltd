import { redirect } from "next/navigation";

interface TutorAssessmentPageProps {
  params: Promise<{ id: string }>;
}

export default async function TutorAssessmentPage({ params }: TutorAssessmentPageProps) {
  const { id } = await params;
  redirect(`/prime-college/tutor/assessments/${id}/preview`);
}
