import { getGoogleSheetData } from "@/lib/sheets";

export type GradeStatus = "Published" | "Draft";

export type GradebookEntry = {
  gradeId: string;
  assessmentId: string;
  assessmentTitle: string;
  studentId: string;
  studentName: string;
  course: string;
  score: number;
  totalMarks: number;
  percentage: number;
  status: GradeStatus;
  feedback: string;
  gradedBy: string;
  gradedAt: string;
};

function text(value: unknown): string {
  return String(value ?? "").trim();
}

function number(value: unknown): number {
  const parsed = Number(text(value));
  return Number.isFinite(parsed) ? parsed : 0;
}

export async function getGradebookEntries(studentId?: string): Promise<GradebookEntry[]> {
  try {
    const rows = (await getGoogleSheetData("prime_college_gradebook")) as Record<string, unknown>[];
    const normalizedStudentId = text(studentId).toLowerCase();

    return rows
      .map((row) => {
        const entry = {
          gradeId: text(row.GradeID ?? row["Grade ID"] ?? row.ID),
          assessmentId: text(row.AssessmentID ?? row["Assessment ID"]),
          assessmentTitle: text(row.AssessmentTitle ?? row["Assessment Title"] ?? row.Title),
          studentId: text(row.StudentID ?? row["Student ID"]),
          studentName: text(row.StudentName ?? row["Student Name"] ?? row.Name),
          course: text(row.Course),
          score: number(row.Score),
          totalMarks: number(row.TotalMarks ?? row["Total Marks"]),
          percentage: number(row.Percentage),
          status: text(row.Status ?? "Draft").toLowerCase() === "published" ? "Published" : "Draft",
          feedback: text(row.Feedback),
          gradedBy: text(row.GradedBy ?? row["Graded By"]),
          gradedAt: text(row.GradedAt ?? row["Graded At"]),
        } satisfies GradebookEntry;

        if (!entry.percentage && entry.totalMarks > 0) {
          entry.percentage = Math.round((entry.score / entry.totalMarks) * 100);
        }

        return entry;
      })
      .filter((entry) => entry.gradeId && entry.studentId && (!normalizedStudentId || entry.studentId.toLowerCase() === normalizedStudentId));
  } catch {
    return [];
  }
}
