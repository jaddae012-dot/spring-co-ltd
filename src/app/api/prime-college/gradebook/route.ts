import { NextRequest, NextResponse } from "next/server";
import { appendGoogleSheetRow, updateGoogleSheetRow } from "@/lib/sheets";
import { getGradebookEntries } from "@/lib/gradebook";
import { getSession } from "@/lib/session";
import { getAssessmentById } from "@/data/prime-college-assessments";

function text(value: unknown): string {
  return String(value ?? "").trim();
}

export async function GET() {
  const session = await getSession();

  if (!session.isLoggedIn) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const entries = await getGradebookEntries(session.userType === "student" ? session.id : undefined);
  return NextResponse.json({ entries });
}

export async function POST(request: NextRequest) {
  const session = await getSession();

  if (!session.isLoggedIn) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();

    if (session.userType === "student" && body.submission === true) {
      const assessmentId = text(body.assessmentId);
      const assessment = await getAssessmentById(assessmentId, session.id);

      if (!assessment) {
        return NextResponse.json({ message: "Assessment not found or not assigned to this student." }, { status: 404 });
      }

      const answers = body.answers && typeof body.answers === "object" ? body.answers as Record<string, unknown> : {};
      const score = assessment.questions.reduce((total, question) => {
        if (question.type !== "multiple-choice") return total;
        return text(answers[question.id]) === text(question.correctAnswer) ? total + question.marks : total;
      }, 0);
      const totalMarks = assessment.questions.reduce((total, question) => total + question.marks, 0);
      const percentage = totalMarks > 0 ? Math.round((score / totalMarks) * 100) : 0;
      const hasManualQuestions = assessment.questions.some((question) => question.type !== "multiple-choice");
      const status = hasManualQuestions ? "Draft" : "Published";
      const gradeId = `grade-${assessment.id}-${session.id}`;
      const gradedAt = new Date().toISOString();
      const feedback = hasManualQuestions ? "Submitted; short-answer questions require tutor review." : "Automatically graded.";
      const row = [gradeId, assessment.id, assessment.title, session.id, session.name || session.id, assessment.course, String(score), String(totalMarks), String(percentage), status, feedback, "Prime College Portal", gradedAt];
      const existing = (await getGradebookEntries(session.id)).find((entry) => entry.assessmentId === assessment.id);

      if (existing) {
        const updated = await updateGoogleSheetRow("prime_college_gradebook", "GradeID", existing.gradeId, {
          Score: String(score), TotalMarks: String(totalMarks), Percentage: String(percentage), Status: status, Feedback: feedback, GradedAt: gradedAt,
        });
        if (!updated) await appendGoogleSheetRow("prime_college_gradebook", row);
      } else {
        await appendGoogleSheetRow("prime_college_gradebook", row);
      }

      return NextResponse.json({ message: hasManualQuestions ? "Submission saved for tutor review." : "Submission graded and saved.", score, totalMarks, percentage, status });
    }

    if (session.userType !== "tutor" && session.userType !== "admin") {
      return NextResponse.json({ message: "Only tutors and admins can update grades." }, { status: 403 });
    }

    const assessmentId = text(body.assessmentId);
    const gradeId = text(body.gradeId);
    const assessmentTitle = text(body.assessmentTitle);
    const studentId = text(body.studentId);
    const studentName = text(body.studentName);
    const course = text(body.course);
    const score = Number(body.score);
    const totalMarks = Number(body.totalMarks);
    const feedback = text(body.feedback);
    const status = text(body.status).toLowerCase() === "published" ? "Published" : "Draft";

    if (!assessmentId || !studentId || !assessmentTitle || !Number.isFinite(score) || !Number.isFinite(totalMarks) || totalMarks <= 0 || score < 0 || score > totalMarks) {
      return NextResponse.json({ message: "Assessment, student, score, and total marks are required. Score must be within the total marks." }, { status: 400 });
    }

    const percentage = Math.round((score / totalMarks) * 100);
    const savedGradeId = gradeId || `grade-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
    const gradedAt = new Date().toISOString();

    const row = [
      savedGradeId,
      assessmentId,
      assessmentTitle,
      studentId,
      studentName,
      course,
      String(score),
      String(totalMarks),
      String(percentage),
      status,
      feedback,
      session.name || session.id,
      gradedAt,
    ];

    if (gradeId) {
      const updated = await updateGoogleSheetRow("prime_college_gradebook", "GradeID", gradeId, {
        AssessmentID: assessmentId,
        AssessmentTitle: assessmentTitle,
        StudentID: studentId,
        StudentName: studentName,
        Course: course,
        Score: String(score),
        TotalMarks: String(totalMarks),
        Percentage: String(percentage),
        Status: status,
        Feedback: feedback,
        GradedBy: session.name || session.id,
        GradedAt: gradedAt,
      });
      if (!updated) await appendGoogleSheetRow("prime_college_gradebook", row);
    } else {
      await appendGoogleSheetRow("prime_college_gradebook", row);
    }

    return NextResponse.json({
      message: "Grade saved successfully.",
      entry: { gradeId: savedGradeId, assessmentId, assessmentTitle, studentId, studentName, course, score, totalMarks, percentage, status, feedback, gradedBy: session.name || session.id, gradedAt },
    });
  } catch {
    return NextResponse.json({ message: "Could not save grade. Check that the gradebook sheet exists." }, { status: 500 });
  }
}
