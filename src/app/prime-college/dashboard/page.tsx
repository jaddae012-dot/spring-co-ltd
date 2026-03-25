
import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";
import { getGoogleSheetData } from "@/lib/sheets";
import Link from "next/link";
import StatCard from "@/components/dashboard/StatCard";
import SectionCard from "@/components/dashboard/SectionCard";
import ProgressMeter from "@/components/dashboard/ProgressMeter";

type ResourceItem = {
  title: string;
  description: string;
  link: string;
  course: string;
  uploadedBy: string;
};

function normalizeId(value: unknown): string {
  return String(value ?? "").replace(/[^a-zA-Z0-9]/g, "").toLowerCase();
}

function getField(row: Record<string, unknown>, aliases: string[]): string {
  const normalizedEntries = Object.entries(row).map(([key, value]) => [
    key.replace(/[^a-zA-Z0-9]/g, "").toLowerCase(),
    value,
  ] as const);

  for (const alias of aliases) {
    const normalizedAlias = alias.replace(/[^a-zA-Z0-9]/g, "").toLowerCase();
    const found = normalizedEntries.find(([key]) => key === normalizedAlias);
    if (found) {
      return String(found[1] ?? "").trim();
    }
  }

  return "";
}

function getFieldNumber(
  row: Record<string, unknown>,
  aliases: string[]
): number | null {
  const value = getField(row, aliases);
  if (!value) return null;

  const normalized = value.replace(/[^0-9.]/g, "");
  const parsed = Number(normalized);
  return Number.isFinite(parsed) ? parsed : null;
}

function capPercent(value: number): number {
  return Math.max(0, Math.min(100, value));
}

async function getStudentData(studentId: string) {
  const students = await getGoogleSheetData("students");
  const student = students.find((row: any) => {
    const id = getField(row, ["StudentID", "Student ID", "ID"]);
    return normalizeId(id) === normalizeId(studentId);
  });
  return student;
}

async function getResources(): Promise<ResourceItem[]> {
  try {
    const rows = (await getGoogleSheetData("resources")) as Record<string, unknown>[];
    return rows
      .map((row) => ({
        title: String(row.Title ?? row.title ?? "").trim(),
        description: String(row.Description ?? row.description ?? "").trim(),
        link: String(row.Link ?? row.URL ?? row.ResourceURL ?? "").trim(),
        course: String(row.Course ?? row.Program ?? "").trim(),
        uploadedBy: String(row.UploadedBy ?? row.Author ?? "").trim(),
      }))
      .filter((item) => item.title || item.link)
      .slice(0, 8);
  } catch {
    // If the resources sheet does not exist yet, show an empty state instead of crashing.
    return [];
  }
}

export default async function StudentDashboard() {
  const session = await getSession();

  if (!session.isLoggedIn || session.userType !== "student") {
    redirect("/prime-college/login");
  }

  const [studentData, resources] = await Promise.all([
    getStudentData(session.id),
    getResources(),
  ]);

  if (!studentData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
        <p>Could not find student data.</p>
      </div>
    );
  }

  const firstName = getField(studentData, ["FirstName", "First Name"]);
  const lastName = getField(studentData, ["LastName", "Last Name"]);
  const rowFullName =
    getField(studentData, ["Name", "FullName", "StudentName"]) ||
    `${firstName} ${lastName}`.trim();
  const fullName = (session.name || rowFullName || "Student").trim();
  const studentId = getField(studentData, ["StudentID", "Student ID", "ID"]);
  const program = getField(studentData, ["Program", "Course", "Programme"]);
  const email = getField(studentData, ["Email", "Email Address"]);
  const phone = getField(studentData, ["Phone", "Phone Number", "Contact"]);
  const semester =
    getField(studentData, ["Semester", "Current Semester", "Level"]) || "N/A";

  const gpa = getFieldNumber(studentData, ["GPA", "Current GPA", "CGPA"]);
  const attendance = getFieldNumber(studentData, [
    "Attendance",
    "AttendancePercent",
    "Attendance Percentage",
  ]);
  const creditsCompleted =
    getFieldNumber(studentData, ["CompletedCredits", "Credits Completed"]) || 0;
  const creditsTotal =
    getFieldNumber(studentData, ["TotalCredits", "Credits Required"]) || 120;

  const completionRate = capPercent((creditsCompleted / creditsTotal) * 100);
  const attendanceRate = capPercent(attendance ?? 0);

  const upcomingClasses = [
    getField(studentData, ["NextClass1", "UpcomingClass1", "Class1"]),
    getField(studentData, ["NextClass2", "UpcomingClass2", "Class2"]),
    getField(studentData, ["NextClass3", "UpcomingClass3", "Class3"]),
  ].filter(Boolean);

  const deadlines = [
    getField(studentData, ["Deadline1", "Assignment1", "Task1"]),
    getField(studentData, ["Deadline2", "Assignment2", "Task2"]),
    getField(studentData, ["Deadline3", "Assignment3", "Task3"]),
  ].filter(Boolean);

  const announcements = [
    getField(studentData, ["Announcement1", "Notice1"]),
    getField(studentData, ["Announcement2", "Notice2"]),
    getField(studentData, ["Announcement3", "Notice3"]),
  ].filter(Boolean);

  const nameParts = fullName.split(/\s+/).filter(Boolean);
  const initials =
    ((nameParts[0]?.charAt(0) || "") +
      (nameParts[1]?.charAt(0) || nameParts[0]?.charAt(1) || ""))
      .toUpperCase() || "ST";

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 text-white pt-24">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div>
            <div className="mb-8 rounded-2xl border border-blue-500/20 bg-slate-900/70 backdrop-blur p-6 shadow-xl">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5">
                <div className="flex items-center gap-4">
                  <div className="h-14 w-14 rounded-full bg-blue-600/80 flex items-center justify-center text-lg font-black">
                    {initials}
                  </div>
                  <div>
                    <p className="text-sm text-slate-300">Welcome back</p>
                    <h1 className="text-3xl font-black tracking-tight">{fullName}</h1>
                    <p className="text-slate-400 text-sm mt-1">
                      {studentId || "No Student ID"} • {program || "Program Not Set"} • Semester {semester}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Link
                    href="/prime-college"
                    className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md"
                  >
                    College Home
                  </Link>
                  <Link
                    href="/api/auth/logout"
                    className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-md"
                  >
                    Logout
                  </Link>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-7">
              <StatCard label="Current GPA" value={gpa !== null ? gpa.toFixed(2) : "N/A"} />
              <StatCard
                label="Attendance"
                value={attendance !== null ? `${attendanceRate.toFixed(0)}%` : "N/A"}
              />
              <StatCard label="Credits Completed" value={String(creditsCompleted)} />
              <StatCard label="Credits Required" value={String(creditsTotal)} />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-7">
              <div className="rounded-xl border border-slate-700 bg-slate-900/80 p-5 lg:col-span-2">
                <h2 className="text-xl font-bold mb-4">Progress Overview</h2>
                <div className="space-y-5">
                  <ProgressMeter
                    label="Program completion"
                    valueLabel={`${completionRate.toFixed(0)}%`}
                    percent={completionRate}
                    tone="cyan"
                  />
                  <ProgressMeter
                    label="Attendance health"
                    valueLabel={attendance !== null ? `${attendanceRate.toFixed(0)}%` : "N/A"}
                    percent={attendance !== null ? attendanceRate : 0}
                    tone={attendanceRate < 75 ? "amber" : "emerald"}
                    helperText={
                      attendance !== null && attendanceRate < 75
                        ? "Attendance is below recommended threshold. Contact your class advisor."
                        : undefined
                    }
                  />
                </div>
              </div>

              <div className="rounded-xl border border-slate-700 bg-slate-900/80 p-5">
                <h2 className="text-xl font-bold mb-4">Quick Actions</h2>
                <div className="grid gap-3">
                  <Link href="/prime-college/programs" className="rounded-md bg-slate-800 hover:bg-slate-700 p-3 font-semibold">
                    View My Program
                  </Link>
                  <Link href="/prime-college/admissions" className="rounded-md bg-slate-800 hover:bg-slate-700 p-3 font-semibold">
                    Admissions Information
                  </Link>
                  <Link href="/prime-college/contact" className="rounded-md bg-slate-800 hover:bg-slate-700 p-3 font-semibold">
                    Contact Academic Office
                  </Link>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-7">
              <SectionCard title="Learning Resources" className="lg:col-span-3">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {resources.length > 0 ? (
                    resources.map((resource, index) => (
                      <a
                        key={`${resource.title}-${index}`}
                        href={resource.link || "#"}
                        target="_blank"
                        rel="noreferrer"
                        className="rounded-md bg-slate-800 hover:bg-slate-700 p-3"
                      >
                        <p className="font-semibold text-sm">{resource.title || "Untitled Resource"}</p>
                        {resource.description ? (
                          <p className="text-xs text-slate-400 mt-1">{resource.description}</p>
                        ) : null}
                        <p className="text-xs text-blue-300 mt-2">
                          {resource.course || "General"}
                          {resource.uploadedBy ? ` • by ${resource.uploadedBy}` : ""}
                        </p>
                      </a>
                    ))
                  ) : (
                    <p className="text-sm text-slate-400">No resources uploaded yet.</p>
                  )}
                </div>
              </SectionCard>

              <SectionCard title="Upcoming Classes">
                <div className="space-y-3">
                  {upcomingClasses.length > 0 ? (
                    upcomingClasses.map((item, idx) => (
                      <div key={`${item}-${idx}`} className="rounded-md bg-slate-800 p-3 text-slate-200">
                        {item}
                      </div>
                    ))
                  ) : (
                    <p className="text-slate-400 text-sm">
                      No class schedule published yet for your profile.
                    </p>
                  )}
                </div>
              </SectionCard>

              <SectionCard title="Assignment Deadlines">
                <div className="space-y-3">
                  {deadlines.length > 0 ? (
                    deadlines.map((item, idx) => (
                      <div key={`${item}-${idx}`} className="rounded-md bg-slate-800 p-3 text-slate-200">
                        {item}
                      </div>
                    ))
                  ) : (
                    <p className="text-slate-400 text-sm">No active deadlines found.</p>
                  )}
                </div>
              </SectionCard>

              <SectionCard title="Announcements">
                <div className="space-y-3">
                  {announcements.length > 0 ? (
                    announcements.map((item, idx) => (
                      <div key={`${item}-${idx}`} className="rounded-md bg-blue-900/40 border border-blue-500/20 p-3 text-blue-100">
                        {item}
                      </div>
                    ))
                  ) : (
                    <p className="text-slate-400 text-sm">No new announcements right now.</p>
                  )}
                </div>
              </SectionCard>
            </div>

            <div className="rounded-xl border border-slate-700 bg-slate-900/80 p-5">
              <h3 className="text-lg font-bold mb-4">Profile Summary</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <p>
                  <strong className="text-slate-300">Student ID:</strong> {studentId || "N/A"}
                </p>
                <p>
                  <strong className="text-slate-300">Program:</strong> {program || "N/A"}
                </p>
                <p>
                  <strong className="text-slate-300">Email:</strong> {email || "N/A"}
                </p>
                <p>
                  <strong className="text-slate-300">Phone:</strong> {phone || "N/A"}
                </p>
              </div>
              <p className="mt-4 text-xs text-slate-500">
                Last synced from Google Sheets during this page request.
              </p>
            </div>
        </div>
      </div>
    </div>
  );
}
