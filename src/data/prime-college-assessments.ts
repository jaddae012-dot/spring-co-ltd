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
}

export const primeCollegeAssessments: PrimeCollegeAssessment[] = [
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

export function getAssessmentById(id: string) {
  return primeCollegeAssessments.find((assessment) => assessment.id === id) ?? null;
}
