
import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";
import { getGoogleSheetData } from "@/lib/sheets";
import Link from "next/link";
import SectionCard from "@/components/dashboard/SectionCard";
import ResourceUploadForm from "@/components/dashboard/ResourceUploadForm";

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

function percentWidthClass(percent: number): string {
  const level = Math.round(capPercent(percent) / (100 / 12));
  const classes = [
    "w-0",
    "w-1/12",
    "w-2/12",
    "w-3/12",
    "w-4/12",
    "w-5/12",
    "w-6/12",
    "w-7/12",
    "w-8/12",
    "w-9/12",
    "w-10/12",
    "w-11/12",
    "w-full",
  ];
  return classes[Math.max(0, Math.min(12, level))];
}

async function getTutorData(tutorId: string) {
  const tutors = await getGoogleSheetData("tutors");
  const tutor = tutors.find((row: any) => {
    const id = getField(row, ["TutorID", "Tutor ID", "ID"]);
    return normalizeId(id) === normalizeId(tutorId);
  });
  return tutor;
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
      .slice(0, 10);
  } catch {
    // If the resources sheet does not exist yet, show an empty state instead of crashing.
    return [];
  }
}

export default async function TutorDashboard() {
  const session = await getSession();

  if (!session.isLoggedIn || session.userType !== "tutor") {
    redirect("/prime-college/login");
  }

  const [tutorData, resources] = await Promise.all([
    getTutorData(session.id),
    getResources(),
  ]);

  if (!tutorData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
        <p>Could not find tutor data.</p>
      </div>
    );
  }

  const tutorRecord = tutorData as Record<string, unknown>;

  const firstName = getField(tutorRecord, ["FirstName", "First Name"]);
  const lastName = getField(tutorRecord, ["LastName", "Last Name"]);
  const fullName = `${firstName} ${lastName}`.trim() || "Tutor";
  const tutorId = getField(tutorRecord, ["TutorID", "Tutor ID", "ID"]);
  const email = getField(tutorRecord, ["Email", "Email Address"]);
  const phone = getField(tutorRecord, ["Phone", "Phone Number", "Contact"]);
  const department =
    getField(tutorRecord, ["Department", "Faculty", "School"]) || "N/A";

  const classesAssigned =
    getFieldNumber(tutorRecord, ["ClassesAssigned", "Assigned Classes", "Classes"]) ||
    0;
  const studentsCount =
    getFieldNumber(tutorRecord, ["StudentsCount", "Student Count", "Students"]) ||
    0;
  const gradingPending =
    getFieldNumber(tutorRecord, ["PendingGrades", "Pending Grading", "Grading Pending"]) ||
    0;
  const attendanceAvg =
    getFieldNumber(tutorRecord, ["AttendanceAvg", "Average Attendance", "Attendance"]) ||
    0;
  const passRate =
    getFieldNumber(tutorRecord, ["PassRate", "Course Pass Rate"]) || 0;

  const attendanceSafe = capPercent(attendanceAvg);
  const passRateSafe = capPercent(passRate);

  const todayClasses = [
    getField(tutorRecord, ["TodayClass1", "ClassToday1", "Schedule1"]),
    getField(tutorRecord, ["TodayClass2", "ClassToday2", "Schedule2"]),
    getField(tutorRecord, ["TodayClass3", "ClassToday3", "Schedule3"]),
  ].filter(Boolean);

  const urgentTasks = [
    getField(tutorRecord, ["UrgentTask1", "Task1", "Todo1"]),
    getField(tutorRecord, ["UrgentTask2", "Task2", "Todo2"]),
    getField(tutorRecord, ["UrgentTask3", "Task3", "Todo3"]),
  ].filter(Boolean);

  const announcements = [
    getField(tutorRecord, ["Announcement1", "TutorNotice1", "Notice1"]),
    getField(tutorRecord, ["Announcement2", "TutorNotice2", "Notice2"]),
    getField(tutorRecord, ["Announcement3", "TutorNotice3", "Notice3"]),
  ].filter(Boolean);

  const initials = `${firstName.charAt(0)}${lastName.charAt(0)}`
    .trim()
    .toUpperCase() || "TR";

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-emerald-950 to-slate-900 text-white pt-24">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div>
            <div className="mb-8 rounded-2xl border border-emerald-500/20 bg-slate-900/70 backdrop-blur p-6 shadow-xl">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5">
                <div className="flex items-center gap-4">
                  <div className="h-14 w-14 rounded-full bg-emerald-600/80 flex items-center justify-center text-lg font-black">
                    {initials}
                  </div>
                  <div>
                    <p className="text-sm text-slate-300">Welcome back</p>
                    <h1 className="text-3xl font-black tracking-tight">{fullName}</h1>
                    <p className="text-slate-400 text-sm mt-1">
                      {tutorId || "No Tutor ID"} • {department}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Link
                    href="/prime-college/admin/test"
                    className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2 px-4 rounded-md"
                  >
                    Admin Test
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
              <div className="rounded-xl border border-slate-700 bg-slate-900/80 p-5">
                <p className="text-xs uppercase tracking-wide text-slate-400">Classes Assigned</p>
                <p className="mt-2 text-3xl font-black">{classesAssigned}</p>
              </div>
              <div className="rounded-xl border border-slate-700 bg-slate-900/80 p-5">
                <p className="text-xs uppercase tracking-wide text-slate-400">Students Covered</p>
                <p className="mt-2 text-3xl font-black">{studentsCount}</p>
              </div>
              <div className="rounded-xl border border-slate-700 bg-slate-900/80 p-5">
                <p className="text-xs uppercase tracking-wide text-slate-400">Pending Grading</p>
                <p className="mt-2 text-3xl font-black">{gradingPending}</p>
              </div>
              <div className="rounded-xl border border-slate-700 bg-slate-900/80 p-5">
                <p className="text-xs uppercase tracking-wide text-slate-400">Avg Attendance</p>
                <p className="mt-2 text-3xl font-black">{attendanceSafe.toFixed(0)}%</p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-7">
              <div className="rounded-xl border border-slate-700 bg-slate-900/80 p-5 lg:col-span-2">
                <h2 className="text-xl font-bold mb-4">Teaching Performance</h2>
                <div className="space-y-5">
                  <div>
                    <div className="flex items-center justify-between text-sm mb-2">
                      <p className="text-slate-300">Course pass rate</p>
                      <p className="font-semibold">{passRateSafe.toFixed(0)}%</p>
                    </div>
                    <div className="h-2.5 rounded-full bg-slate-800 overflow-hidden">
                      <div
                        className={`h-full rounded-full bg-emerald-400 ${percentWidthClass(passRateSafe)} transition-all duration-500`}
                      />
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center justify-between text-sm mb-2">
                      <p className="text-slate-300">Attendance trend</p>
                      <p className={`font-semibold ${attendanceSafe < 70 ? "text-amber-300" : "text-cyan-300"}`}>
                        {attendanceSafe.toFixed(0)}%
                      </p>
                    </div>
                    <div className="h-2.5 rounded-full bg-slate-800 overflow-hidden">
                      <div
                        className={`h-full rounded-full ${attendanceSafe < 70 ? "bg-amber-400" : "bg-cyan-400"} ${percentWidthClass(attendanceSafe)} transition-all duration-500`}
                      />
                    </div>
                    {attendanceSafe < 70 && (
                      <p className="text-xs text-amber-300 mt-2">
                        Attendance trend is below target. Consider issuing class reminders.
                      </p>
                    )}
                  </div>
                </div>
              </div>

              <div className="rounded-xl border border-slate-700 bg-slate-900/80 p-5">
                <h2 className="text-xl font-bold mb-4">Quick Actions</h2>
                <div className="grid gap-3">
                  <Link
                    href="/prime-college/admin/test"
                    className="rounded-md bg-slate-800 hover:bg-slate-700 p-3 font-semibold"
                  >
                    Verify Sheet Records
                  </Link>
                  <Link
                    href="/prime-college/contact"
                    className="rounded-md bg-slate-800 hover:bg-slate-700 p-3 font-semibold"
                  >
                    Contact Admin Office
                  </Link>
                  <Link
                    href="/prime-college/programs"
                    className="rounded-md bg-slate-800 hover:bg-slate-700 p-3 font-semibold"
                  >
                    View Program Catalog
                  </Link>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-7">
              <SectionCard title="Upload Resource" className="lg:col-span-1">
                <ResourceUploadForm />
              </SectionCard>

              <SectionCard title="Shared Resources" className="lg:col-span-2">
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
                        <p className="text-xs text-emerald-300 mt-2">
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

              <section className="rounded-xl border border-slate-700 bg-slate-900/80 p-5">
                <h3 className="text-lg font-bold mb-4">Today's Classes</h3>
                <div className="space-y-3">
                  {todayClasses.length > 0 ? (
                    todayClasses.map((item, idx) => (
                      <div key={`${item}-${idx}`} className="rounded-md bg-slate-800 p-3 text-slate-200">
                        {item}
                      </div>
                    ))
                  ) : (
                    <p className="text-slate-400 text-sm">No class entries found for today.</p>
                  )}
                </div>
              </section>

              <section className="rounded-xl border border-slate-700 bg-slate-900/80 p-5">
                <h3 className="text-lg font-bold mb-4">Urgent Tasks</h3>
                <div className="space-y-3">
                  {urgentTasks.length > 0 ? (
                    urgentTasks.map((item, idx) => (
                      <div key={`${item}-${idx}`} className="rounded-md bg-slate-800 p-3 text-slate-200">
                        {item}
                      </div>
                    ))
                  ) : (
                    <p className="text-slate-400 text-sm">No urgent tasks available.</p>
                  )}
                </div>
              </section>

              <section className="rounded-xl border border-slate-700 bg-slate-900/80 p-5">
                <h3 className="text-lg font-bold mb-4">Announcements</h3>
                <div className="space-y-3">
                  {announcements.length > 0 ? (
                    announcements.map((item, idx) => (
                      <div
                        key={`${item}-${idx}`}
                        className="rounded-md bg-emerald-900/30 border border-emerald-500/20 p-3 text-emerald-100"
                      >
                        {item}
                      </div>
                    ))
                  ) : (
                    <p className="text-slate-400 text-sm">No new announcements right now.</p>
                  )}
                </div>
              </section>
            </div>

            <div className="rounded-xl border border-slate-700 bg-slate-900/80 p-5">
              <h3 className="text-lg font-bold mb-4">Tutor Profile</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <p>
                  <strong className="text-slate-300">Tutor ID:</strong> {tutorId || "N/A"}
                </p>
                <p>
                  <strong className="text-slate-300">Department:</strong> {department || "N/A"}
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
