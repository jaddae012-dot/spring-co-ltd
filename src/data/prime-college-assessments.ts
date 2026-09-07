import { getGoogleSheetData } from "@/lib/sheets";

export type AssessmentType = "quiz" | "assignment";
export type QuestionType = "multiple-choice" | "short-answer";

export interface AssessmentQuestion {
  id: string;
  type: QuestionType;
  prompt: string;
  options?: string[];
  correctAnswer?: string;
  marks: number;
}

export interface PrimeCollegeAssessment {
  id: string;
  title: string;
  course: string;
  type: AssessmentType;
  durationMinutes: number;
  dueDate: string;
  status: "Open" | "Closed" | "Draft";
  instructions: string;
  questions: AssessmentQuestion[];
  assignmentMode: "all" | "selected";
  assignedStudentIds: string[];
  createdBy?: string;
  createdAt?: string;
}

const fallbackAssessments: PrimeCollegeAssessment[] = [
  {
    id: "business-communication-quiz",
    title: "Business Communication Quiz",
    course: "Business Communication",
    type: "quiz",
    durationMinutes: 20,
    dueDate: "2026-09-12",
    status: "Open",
    instructions:
      "Answer each question carefully. You have 20 minutes to complete this timed quiz. Submit once you are done. The timer will auto-submit when time expires.",
    assignmentMode: "all",
    assignedStudentIds: [],
    questions: [
      {
        id: "q1",
        type: "multiple-choice",
        prompt: "Which of the following is the most effective way to communicate professionally in a workplace email?",
        options: [
          "Use informal greetings and slang to sound friendly",
          "Keep the message clear, respectful, and specific",
          "Write a very long email with no structure",
          "Avoid details so the email remains short",
        ],
        correctAnswer: "Keep the message clear, respectful, and specific",
        marks: 5,
      },
      {
        id: "q2",
        type: "multiple-choice",
        prompt: "What is the main purpose of active listening in a classroom discussion?",
        options: [
          "To speak before others finish",
          "To understand and respond appropriately",
          "To avoid asking questions",
          "To shorten the discussion",
        ],
        correctAnswer: "To understand and respond appropriately",
        marks: 5,
      },
      {
        id: "q3",
        type: "multiple-choice",
        prompt: "Which phrase is most appropriate for a formal presentation opening?",
        options: [
          "Hey guys, let me tell you what I think",
          "Good morning everyone, thank you for your attention",
          "I am not sure if this is useful",
          "Quickly, let us just start",
        ],
        correctAnswer: "Good morning everyone, thank you for your attention",
        marks: 5,
      },
      {
        id: "q4",
        type: "short-answer",
        prompt: "In one sentence, explain why clarity is important in professional communication.",
        marks: 10,
      },
    ],
  },
  {
    id: "research-reflection-assignment",
    title: "Research Reflection Assignment",
    course: "Research Methods",
    type: "assignment",
    durationMinutes: 45,
    dueDate: "2026-09-15",
    status: "Open",
    instructions:
      "Write a short reflection on how research helps decision-making in real-world business and academic practice. Submit your answer in plain text or upload a document.",
    assignmentMode: "all",
    assignedStudentIds: [],
    questions: [
      {
        id: "a1",
        type: "short-answer",
        prompt: "Describe how research improves problem-solving in everyday work and study situations.",
        marks: 15,
      },
      {
        id: "a2",
        type: "short-answer",
        prompt: "State one challenge researchers face and how it can be managed.",
        marks: 10,
      },
    ],
  },
];

function asText(value: unknown): string {
  return String(value ?? "").trim();
}

function parseQuestions(raw: unknown): AssessmentQuestion[] {
  if (!raw) return [];

  try {
    const parsed = JSON.parse(String(raw));
    if (Array.isArray(parsed)) return parsed as AssessmentQuestion[];
  } catch {
    // The sheet may store a simple string or an older format.
  }

  return [];
}

export async function getPrimeCollegeAssessments(options?: { studentId?: string; program?: string }): Promise<PrimeCollegeAssessment[]> {
  try {
    const rows = (await getGoogleSheetData("prime_college_assessments")) as Record<string, unknown>[];

    const normalized = rows
      .map((row) => {
        const assessmentId = asText(row.AssessmentID ?? row["Assessment ID"] ?? row.ID ?? row.id);
        const title = asText(row.Title ?? row.title);
        const course = asText(row.Course ?? row.course);
        const type = asText(row.Type ?? row.type).toLowerCase() === "assignment" ? "assignment" : "quiz";
        const durationMinutes = Number(asText(row.DurationMinutes ?? row["Duration Minutes"] ?? "0")) || 0;
        const dueDate = asText(row.DueDate ?? row["Due Date"] ?? row.dueDate);
        const status = (asText(row.Status ?? row.status) || "Open") as PrimeCollegeAssessment["status"];
        const instructions = asText(row.Instructions ?? row.instructions);
        const questions = parseQuestions(row.QuestionsJSON ?? row["Questions JSON"] ?? row.questions);
        const assignmentMode = asText(row.AssignmentMode ?? row["Assignment Mode"] ?? "all").toLowerCase() === "selected" ? "selected" : "all";
        const assignedStudentIds = asText(row.AssignedStudentIDs ?? row["Assigned Student IDs"] ?? row.AssignedStudentIds)
          .split(/[\s,]+/)
          .map((value) => value.trim().toLowerCase())
          .filter(Boolean);

        if (!assessmentId || !title) return null;

        return {
          id: assessmentId,
          title,
          course,
          type,
          durationMinutes,
          dueDate,
          status: ["Open", "Closed", "Draft"].includes(status) ? status : "Open",
          instructions,
          questions,
          assignmentMode,
          assignedStudentIds,
          createdBy: asText(row.CreatedBy ?? row["Created By"] ?? row.createdBy),
          createdAt: asText(row.CreatedAt ?? row["Created At"] ?? row.createdAt),
        } satisfies PrimeCollegeAssessment;
      })
      .filter(Boolean) as PrimeCollegeAssessment[];

    if (normalized.length > 0) {
      const studentId = asText(options?.studentId).toLowerCase();
      const program = asText(options?.program).toLowerCase();
      return normalized.filter((assessment) => {
        if (assessment.assignmentMode === "selected") {
          return Boolean(studentId && assessment.assignedStudentIds.includes(studentId));
        }
        return !program || assessment.course.toLowerCase() === program;
      });
    }
  } catch {
    // Fall back to the built-in demo set if the sheet is not yet populated.
  }

  return fallbackAssessments;
}

export async function getAssessmentById(id: string, studentId?: string) {
  const normalizedId = id.trim().toLowerCase();
  let assessments = await getPrimeCollegeAssessments();
  let assessment = assessments.find((item) => item.id.trim().toLowerCase() === normalizedId) ?? null;

  // A slow Sheets response can briefly produce the fallback set during development.
  // Retry once before treating a valid assessment URL as missing.
  if (!assessment) {
    await new Promise((resolve) => setTimeout(resolve, 500));
    assessments = await getPrimeCollegeAssessments();
    assessment = assessments.find((item) => item.id.trim().toLowerCase() === normalizedId) ?? null;
  }

  if (!assessment || !studentId || assessment.assignmentMode === "all") return assessment;
  return assessment.assignedStudentIds.includes(studentId.trim().toLowerCase()) ? assessment : null;
}

export const primeCollegeAssessments = fallbackAssessments;
