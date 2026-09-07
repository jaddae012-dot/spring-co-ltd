import { NextRequest, NextResponse } from "next/server";
import { appendGoogleSheetRow, getGoogleSheetData } from "@/lib/sheets";
import { getSession } from "@/lib/session";

function asText(value: unknown): string {
  return String(value ?? "").trim();
}

function normalizeAssessmentRows(rows: Record<string, unknown>[]) {
  return rows
    .map((row) => {
      const assessmentId = asText(row.AssessmentID ?? row["Assessment ID"] ?? row.ID ?? row.id);
      const title = asText(row.Title ?? row.title);
      const course = asText(row.Course ?? row.course);
      const type = (asText(row.Type ?? row.type).toLowerCase() === "assignment" ? "assignment" : "quiz") as "quiz" | "assignment";
      const durationMinutes = Number(asText(row.DurationMinutes ?? row["Duration Minutes"] ?? "0")) || 0;
      const dueDate = asText(row.DueDate ?? row["Due Date"] ?? row.dueDate);
      const status = (asText(row.Status ?? row.status) || "Open") as "Open" | "Closed" | "Draft";
      const instructions = asText(row.Instructions ?? row.instructions);
      const questionsJson = asText(row.QuestionsJSON ?? row["Questions JSON"] ?? row.questions);
      const assignmentMode = asText(row.AssignmentMode ?? row["Assignment Mode"] ?? "all").toLowerCase() === "selected" ? "selected" : "all";
      const assignedStudentIds = asText(row.AssignedStudentIDs ?? row["Assigned Student IDs"] ?? row.AssignedStudentIds)
        .split(/[\s,]+/)
        .map((value) => value.trim())
        .filter(Boolean);
      const createdBy = asText(row.CreatedBy ?? row["Created By"] ?? row.createdBy);
      const createdAt = asText(row.CreatedAt ?? row["Created At"] ?? row.createdAt);

      if (!assessmentId || !title) return null;

      let questions: unknown[] = [];
      if (questionsJson) {
        try {
          const parsed = JSON.parse(questionsJson);
          questions = Array.isArray(parsed) ? parsed : [];
        } catch {
          questions = [];
        }
      }

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
        createdBy,
        createdAt,
      };
    })
    .filter(Boolean);
}

export async function GET() {
  const session = await getSession();

  if (!session.isLoggedIn || (session.userType !== "student" && session.userType !== "tutor" && session.userType !== "admin")) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const rows = (await getGoogleSheetData("prime_college_assessments")) as Record<string, unknown>[];
    return NextResponse.json({ assessments: normalizeAssessmentRows(rows) });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Could not fetch assessments.";

    if (message.toLowerCase().includes("parse range")) {
      return NextResponse.json({ assessments: [] });
    }

    return NextResponse.json({ message: "Could not fetch assessments." }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const session = await getSession();

  if (!session.isLoggedIn || (session.userType !== "tutor" && session.userType !== "admin")) {
    return NextResponse.json({ message: "Only tutors and admins can publish assessments." }, { status: 403 });
  }

  try {
    const body = await req.json();
    const title = asText(body.title);
    const course = asText(body.course);
    const type = asText(body.type).toLowerCase() === "assignment" ? "assignment" : "quiz";
    const durationMinutes = Number(asText(body.durationMinutes || body.duration)) || 20;
    const dueDate = asText(body.dueDate);
    const instructions = asText(body.instructions);
    const questions = Array.isArray(body.questions) ? body.questions : [];
    const assignmentMode = asText(body.assignmentMode).toLowerCase() === "selected" ? "selected" : "all";
    const assignedStudentIds = Array.isArray(body.assignedStudentIds)
      ? body.assignedStudentIds.map((value: unknown) => asText(value)).filter(Boolean)
      : [];
    const createdBy = session.name || session.id || "Tutor";
    const createdAt = new Date().toISOString();

    if (!title || !course || !dueDate || questions.length === 0) {
      return NextResponse.json({ message: "Title, course, due date, and at least one question are required." }, { status: 400 });
    }

    if (assignmentMode === "selected" && assignedStudentIds.length === 0) {
      return NextResponse.json({ message: "Select at least one student for a targeted assessment." }, { status: 400 });
    }

    for (const question of questions) {
      const prompt = asText(question?.prompt);
      if (!prompt) {
        return NextResponse.json({ message: "Each question must have a prompt." }, { status: 400 });
      }

      if (question?.type === "multiple-choice") {
        const options = Array.isArray(question?.options)
          ? question.options.map((opt: unknown) => asText(opt))
          : [];
        if (options.filter(Boolean).length < 2 || !asText(question?.correctAnswer)) {
          return NextResponse.json({ message: "Multiple-choice questions need at least two options and a correct answer." }, { status: 400 });
        }
      }
    }

    const assessmentId = `assessment-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
    const row = [
      assessmentId,
      title,
      course,
      type,
      String(durationMinutes),
      dueDate,
      "Open",
      instructions,
      JSON.stringify(questions),
      assignmentMode,
      assignedStudentIds.join(","),
      createdBy,
      createdAt,
    ];

    await appendGoogleSheetRow("prime_college_assessments", row);

    return NextResponse.json({
      message: "Assessment published successfully.",
      assessment: {
        id: assessmentId,
        title,
        course,
        type,
        durationMinutes,
        dueDate,
        status: "Open",
        instructions,
        questions,
        assignmentMode,
        assignedStudentIds,
        createdBy,
        createdAt,
      },
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Could not publish assessment.";

    if (message.toLowerCase().includes("parse range")) {
      return NextResponse.json(
        {
          message:
            "Create a sheet tab named prime_college_assessments with headers: AssessmentID, Title, Course, Type, DurationMinutes, DueDate, Status, Instructions, QuestionsJSON, CreatedBy, CreatedAt.",
        },
        { status: 400 }
      );
    }

    return NextResponse.json({ message: "Could not publish assessment." }, { status: 500 });
  }
}
