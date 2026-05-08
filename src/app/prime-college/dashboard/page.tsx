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

type AdmissionSnapshot = {
  applicationRef: string;
  status: string;
  submittedAt: string;
  lastStatusUpdateAt: string;
};

type PortalItem = {
  title: string;
  description?: string;
  meta?: string;
  href?: string;
};

type PortalActionItem = {
  label: string;
  href: string;
  description: string;
};

type TimelineItem = {
  label: string;
  value: string;
};

type StudentPortalContext = {
  studentId: string;
  email: string;
  program: string;
};

type StudentPortalData = {
  actions: PortalActionItem[];
  classes: PortalItem[];
  deadlines: PortalItem[];
  announcements: PortalItem[];
  alerts: string[];
  timeline: TimelineItem[];
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

function splitList(value: string): string[] {
  return value
    .split(/\r?\n|;/)
    .map((item) => item.trim())
    .filter(Boolean);
}

function joinMeta(parts: string[]): string {
  return parts.filter(Boolean).join(" | ");
}

function splitTargets(value: string): string[] {
  return value
    .split(/,|\r?\n|;/)
    .map((item) => normalizeId(item))
    .filter(Boolean);
}

function collectIndexedFields(
  row: Record<string, unknown>,
  prefixes: string[],
  max = 8
): string[] {
  const values: string[] = [];

  for (let index = 1; index <= max; index += 1) {
    const aliases = prefixes.flatMap((prefix) => [
      `${prefix}${index}`,
      `${prefix} ${index}`,
      `${prefix}_${index}`,
    ]);
    const value = getField(row, aliases);
    if (value) values.push(value);
  }

  return values;
}

function collectListFields(
  row: Record<string, unknown>,
  listAliases: string[],
  indexedPrefixes: string[]
): string[] {
  const listValues = splitList(getField(row, listAliases));
  const indexedValues = collectIndexedFields(row, indexedPrefixes);
  return [...listValues, ...indexedValues];
}

function rowTargetsStudent(
  row: Record<string, unknown>,
  context: StudentPortalContext
): boolean {
  const rowStudentId = getField(row, ["StudentID", "Student ID", "ID"]);
  if (rowStudentId) {
    const studentTargets = splitTargets(rowStudentId);
    return (
      studentTargets.includes(normalizeId(context.studentId)) ||
      studentTargets.includes("all") ||
      studentTargets.includes("general")
    );
  }

  const rowEmail = getField(row, ["Email", "Email Address", "StudentEmail", "Student Email"]);
  if (rowEmail) {
    const emailTargets = rowEmail
      .split(/,|\r?\n|;/)
      .map((item) => item.trim().toLowerCase())
      .filter(Boolean);
    return emailTargets.includes(context.email.toLowerCase());
  }

  const rowProgram = getField(row, ["Program", "Course", "Programme"]);
  if (rowProgram) {
    const programTargets = splitTargets(rowProgram);
    return (
      programTargets.includes(normalizeId(context.program)) ||
      programTargets.includes("all") ||
      programTargets.includes("general")
    );
  }

  const audience = getField(row, ["Audience", "Target", "VisibleTo", "Scope"]);
  if (audience) {
    const normalizedAudience = normalizeId(audience);
    return ["all", "general", "student", "students"].includes(normalizedAudience);
  }

  return true;
}

async function getFirstAvailableSheetRows(
  sheetNames: string[]
): Promise<Record<string, unknown>[]> {
  for (const sheetName of sheetNames) {
    try {
      const rows = (await getGoogleSheetData(sheetName)) as Record<string, unknown>[];
      if (rows.length > 0) return rows;
    } catch {
      // Optional dashboard tabs can be added over time.
    }
  }

  return [];
}

async function getStudentData(studentId: string) {
  const students = await getGoogleSheetData("students");
  const student = students.find((row: any) => {
    const id = getField(row, ["StudentID", "Student ID", "ID"]);
    return normalizeId(id) === normalizeId(studentId);
  });
  return student;
}

async function getResources(program: string): Promise<ResourceItem[]> {
  try {
    const rows = (await getGoogleSheetData("resources")) as Record<string, unknown>[];
    const programKey = normalizeId(program);
    return rows
      .map((row) => ({
        title: String(row.Title ?? row.title ?? "").trim(),
        description: String(row.Description ?? row.description ?? "").trim(),
        link: String(row.Link ?? row.URL ?? row.ResourceURL ?? "").trim(),
        course: String(row.Course ?? row.Program ?? "").trim(),
        uploadedBy: String(row.UploadedBy ?? row.Author ?? "").trim(),
      }))
      .filter((item) => item.title || item.link)
      .sort((a, b) => {
        const score = (item: ResourceItem) => {
          const courseKey = normalizeId(item.course);
          if (!programKey || !courseKey) return 0;
          if (courseKey === programKey) return 2;
          if (courseKey === "general" || courseKey === "all") return 1;
          return 0;
        };
        return score(b) - score(a);
      })
      .slice(0, 8);
  } catch {
    return [];
  }
}

async function getLatestAdmissionByEmail(email: string): Promise<AdmissionSnapshot | null> {
  const normalizedEmail = String(email || "").trim().toLowerCase();
  if (!normalizedEmail) return null;

  try {
    const rows = (await getGoogleSheetData("applications")) as Record<string, unknown>[];
    let events: Record<string, unknown>[] = [];
    try {
      events = (await getGoogleSheetData("applications_events")) as Record<string, unknown>[];
    } catch {
      events = [];
    }

    const match = rows
      .map((row) => {
        const rowEmail = getField(row, ["Email", "Email Address"]).toLowerCase();
        const submittedAt =
          getField(row, ["SubmittedAt", "Submitted At", "Timestamp"]) ||
          new Date(0).toISOString();

        return {
          email: rowEmail,
          applicationRef: getField(row, ["ApplicationRef", "Reference", "Application Reference"]),
          status: getField(row, ["Status", "WorkflowStatus", "ApplicationStatus"]) || "Submitted",
          submittedAt,
          lastStatusUpdateAt:
            getField(row, ["LastStatusUpdateAt", "Last Status Update At", "UpdatedAt"]) ||
            submittedAt,
        };
      })
      .filter((row) => row.email === normalizedEmail)
      .sort(
        (a, b) => new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime()
      )[0];

    if (!match) return null;

    const latestEvent = events
      .map((row) => ({
        applicationRef: getField(row, ["ApplicationRef", "Reference", "Application Reference"]),
        status: getField(row, ["Status", "WorkflowStatus", "ApplicationStatus"]),
        updatedAt: getField(row, ["UpdatedAt", "Timestamp", "SubmittedAt"]),
      }))
      .filter(
        (event) => event.applicationRef.toLowerCase() === match.applicationRef.toLowerCase()
      )
      .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())[0];

    return {
      applicationRef: match.applicationRef,
      status: latestEvent?.status || match.status,
      submittedAt: match.submittedAt,
      lastStatusUpdateAt: latestEvent?.updatedAt || match.lastStatusUpdateAt,
    };
  } catch {
    return null;
  }
}

function mapActionRows(
  rows: Record<string, unknown>[],
  context: StudentPortalContext
): PortalActionItem[] {
  return rows
    .filter((row) => rowTargetsStudent(row, context))
    .map((row) => ({
      label: getField(row, ["Label", "Title", "Action", "ButtonText", "Name"]),
      href:
        getField(row, ["Href", "Link", "URL", "Path"]) ||
        "/prime-college/contact",
      description: getField(row, ["Description", "Details", "Subtitle", "HelpText"]),
    }))
    .filter((item) => item.label)
    .slice(0, 6);
}

function mapClassRows(
  rows: Record<string, unknown>[],
  context: StudentPortalContext
): PortalItem[] {
  return rows
    .filter((row) => rowTargetsStudent(row, context))
    .map((row) => {
      const title =
        getField(row, ["Title", "Class", "ClassName", "Class Name", "Course", "Module"]) ||
        "Class session";
      const schedule = getField(row, ["Schedule", "Time", "Date", "ClassTime", "Class Time"]);
      const location = getField(row, ["Location", "Room", "Venue"]);
      const tutor = getField(row, ["Tutor", "Instructor", "Lecturer"]);

      return {
        title,
        description: getField(row, ["Description", "Details", "Notes"]),
        meta: joinMeta([schedule, location, tutor]),
        href: getField(row, ["Href", "Link", "URL", "MeetingLink", "Meeting Link"]),
      };
    })
    .filter((item) => item.title || item.description || item.meta)
    .slice(0, 8);
}

function mapDeadlineRows(
  rows: Record<string, unknown>[],
  context: StudentPortalContext
): PortalItem[] {
  return rows
    .filter((row) => rowTargetsStudent(row, context))
    .map((row) => {
      const title =
        getField(row, ["Title", "Assignment", "Task", "Deadline", "Name"]) ||
        "Assignment deadline";
      const dueDate = getField(row, ["DueDate", "Due Date", "DeadlineDate", "Date"]);
      const course = getField(row, ["Course", "Module", "Subject", "Program"]);
      const status = getField(row, ["Status", "State"]);

      return {
        title,
        description: getField(row, ["Description", "Details", "Notes"]),
        meta: joinMeta([course, dueDate ? `Due ${dueDate}` : "", status]),
        href: getField(row, ["Href", "Link", "URL"]),
      };
    })
    .filter((item) => item.title || item.description || item.meta)
    .slice(0, 8);
}

function mapAnnouncementRows(
  rows: Record<string, unknown>[],
  context: StudentPortalContext
): PortalItem[] {
  return rows
    .filter((row) => rowTargetsStudent(row, context))
    .map((row) => {
      const message = getField(row, ["Message", "Announcement", "Notice", "Description", "Details"]);
      return {
        title: getField(row, ["Title", "Subject", "Heading"]) || "Announcement",
        description: message,
        meta: joinMeta([
          getField(row, ["Date", "PublishedAt", "Published At"]),
          getField(row, ["Author", "PostedBy", "Posted By"]),
        ]),
        href: getField(row, ["Href", "Link", "URL"]),
      };
    })
    .filter((item) => item.title || item.description)
    .slice(0, 8);
}

function mapAlertRows(
  rows: Record<string, unknown>[],
  context: StudentPortalContext
): string[] {
  return rows
    .filter((row) => rowTargetsStudent(row, context))
    .map((row) => getField(row, ["Message", "Alert", "Notice", "Description", "Details"]))
    .filter(Boolean)
    .slice(0, 6);
}

function mapTimelineRows(
  rows: Record<string, unknown>[],
  context: StudentPortalContext
): TimelineItem[] {
  return rows
    .filter((row) => rowTargetsStudent(row, context))
    .sort((a, b) => {
      const aOrder = getFieldNumber(a, ["Order", "Step", "Sequence"]) ?? 999;
      const bOrder = getFieldNumber(b, ["Order", "Step", "Sequence"]) ?? 999;
      return aOrder - bOrder;
    })
    .map((row) => ({
      label: getField(row, ["Label", "Title", "Stage", "Step", "Name"]),
      value: getField(row, ["Value", "Status", "Description", "Details"]),
    }))
    .filter((item) => item.label || item.value)
    .slice(0, 6);
}

async function getStudentPortalData(
  context: StudentPortalContext,
  studentData: Record<string, unknown>
): Promise<StudentPortalData> {
  const [
    actionRows,
    classRows,
    deadlineRows,
    announcementRows,
    alertRows,
    timelineRows,
  ] = await Promise.all([
    getFirstAvailableSheetRows(["portal_actions", "student_actions"]),
    getFirstAvailableSheetRows(["student_classes", "classes", "class_schedule"]),
    getFirstAvailableSheetRows(["student_deadlines", "deadlines", "assignments"]),
    getFirstAvailableSheetRows(["student_announcements", "announcements", "notices"]),
    getFirstAvailableSheetRows(["student_alerts", "portal_alerts"]),
    getFirstAvailableSheetRows(["student_timeline", "portal_timeline"]),
  ]);

  const rowClasses = collectListFields(
    studentData,
    ["UpcomingClasses", "ClassSchedule", "Classes"],
    ["NextClass", "UpcomingClass", "Class"]
  ).map((title) => ({ title }));
  const rowDeadlines = collectListFields(
    studentData,
    ["Deadlines", "AssignmentDeadlines", "Assignments"],
    ["Deadline", "Assignment", "Task"]
  ).map((title) => ({ title }));
  const rowAnnouncements = collectListFields(
    studentData,
    ["Announcements", "Notices"],
    ["Announcement", "Notice"]
  ).map((description) => ({ title: "Announcement", description }));
  const rowAlerts = collectListFields(
    studentData,
    ["Alerts", "PortalAlerts", "StudentAlerts"],
    ["Alert", "PortalAlert", "StudentAlert"]
  );

  return {
    actions: mapActionRows(actionRows, context),
    classes: [...mapClassRows(classRows, context), ...rowClasses].slice(0, 8),
    deadlines: [...mapDeadlineRows(deadlineRows, context), ...rowDeadlines].slice(0, 8),
    announcements: [
      ...mapAnnouncementRows(announcementRows, context),
      ...rowAnnouncements,
    ].slice(0, 8),
    alerts: [...mapAlertRows(alertRows, context), ...rowAlerts].slice(0, 8),
    timeline: mapTimelineRows(timelineRows, context),
  };
}

export default async function StudentDashboard() {
  const session = await getSession();

  if (!session.isLoggedIn || session.userType !== "student") {
    redirect("/prime-college/login");
  }

  const studentData = await getStudentData(session.id);

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

  const portalContext = { studentId, email, program };
  const [resources, latestAdmission, portalData] = await Promise.all([
    getResources(program),
    getLatestAdmissionByEmail(email),
    getStudentPortalData(portalContext, studentData),
  ]);

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

  const upcomingClasses = portalData.classes;
  const deadlines = portalData.deadlines;
  const announcements = portalData.announcements;

  const nameParts = fullName.split(/\s+/).filter(Boolean);
  const initials =
    ((nameParts[0]?.charAt(0) || "") +
      (nameParts[1]?.charAt(0) || nameParts[0]?.charAt(1) || ""))
      .toUpperCase() || "ST";
  const admissionStatus =
    latestAdmission?.status ||
    getField(studentData, ["AdmissionStatus", "ApplicationStatus"]) ||
    "Not Found";
  const sheetStanding = getField(studentData, [
    "Standing",
    "AcademicStanding",
    "StudentStanding",
  ]);
  const studentStanding =
    sheetStanding ||
    (attendance !== null && attendanceRate < 75
      ? "Needs Attention"
      : completionRate >= 70
        ? "On Track"
        : "In Progress");
  const actionItems =
    portalData.actions.length > 0
      ? portalData.actions
      : [
          {
            label: "Academic Office",
            href: "/prime-college/contact",
            description: "Ask about fees, documents, schedules, or student records.",
          },
          {
            label: "My Program",
            href: "/prime-college/programs",
            description: "Review your programme structure and course pathway.",
          },
          {
            label: "Admissions",
            href: "/prime-college/admissions",
            description: "Check application steps, requirements, and admission support.",
          },
        ];
  const defaultTimelineItems = [
    { label: "Application", value: latestAdmission ? "Submitted" : "No record" },
    { label: "Admission Review", value: admissionStatus },
    { label: "Enrollment", value: studentId ? "Student profile active" : "Pending ID" },
    { label: "Current Term", value: `Semester ${semester}` },
  ];
  const timelineItems =
    portalData.timeline.length > 0 ? portalData.timeline : defaultTimelineItems;
  const alerts = Array.from(
    new Set(
      [
        ...portalData.alerts,
        attendance !== null && attendanceRate < 75
          ? "Attendance is below the recommended 75% threshold."
          : "",
        deadlines.length > 0
          ? `${deadlines.length} active assignment deadline${deadlines.length === 1 ? "" : "s"}.`
          : "",
        latestAdmission
          ? `Latest admission update: ${latestAdmission.status}.`
          : "No admission workflow update is linked to this email yet.",
      ].filter(Boolean)
    )
  );

  return (
    <div className="min-h-screen bg-slate-950 text-white pt-24">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="mb-8 overflow-hidden rounded-lg border border-slate-800 bg-slate-900 shadow-2xl">
          <div className="border-b border-slate-800 bg-slate-900 px-5 py-3">
            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-300">
                Prime College Student Portal
              </p>
              <div className="flex flex-wrap gap-2">
                <Link
                  href="/prime-college"
                  className="rounded-md border border-slate-700 px-3 py-2 text-sm font-semibold text-slate-200 transition hover:border-slate-500 hover:text-white"
                >
                  College Home
                </Link>
                <Link
                  href="/api/auth/logout"
                  className="rounded-md bg-red-500 px-3 py-2 text-sm font-semibold text-white transition hover:bg-red-600"
                >
                  Logout
                </Link>
              </div>
            </div>
          </div>

          <div className="grid gap-6 p-5 lg:grid-cols-[1.5fr_1fr] lg:p-7">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
              <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-lg bg-slate-800 text-2xl font-black shadow-lg shadow-slate-950/50 ring-1 ring-slate-700">
                {initials}
              </div>
              <div>
                <p className="text-sm text-slate-300">Welcome back</p>
                <h1 className="mt-1 text-3xl font-black tracking-tight md:text-4xl">
                  {fullName}
                </h1>
                <p className="mt-2 text-sm text-slate-400">
                  {studentId || "No Student ID"} | {program || "Program Not Set"} | Semester {semester}
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  <span className="rounded-md border border-slate-700 bg-slate-800 px-3 py-1 text-xs font-bold text-slate-200">
                    {studentStanding}
                  </span>
                  <span className="rounded-md border border-slate-700 bg-slate-800 px-3 py-1 text-xs font-bold text-slate-200">
                    {admissionStatus}
                  </span>
                </div>
              </div>
            </div>

            <div className="rounded-lg border border-slate-800 bg-slate-900 p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                Student Snapshot
              </p>
              <dl className="mt-4 grid grid-cols-2 gap-4 text-sm">
                <div>
                  <dt className="text-slate-500">GPA</dt>
                  <dd className="mt-1 text-xl font-black">{gpa !== null ? gpa.toFixed(2) : "N/A"}</dd>
                </div>
                <div>
                  <dt className="text-slate-500">Attendance</dt>
                  <dd className="mt-1 text-xl font-black">
                    {attendance !== null ? `${attendanceRate.toFixed(0)}%` : "N/A"}
                  </dd>
                </div>
                <div>
                  <dt className="text-slate-500">Credits</dt>
                  <dd className="mt-1 text-xl font-black">{creditsCompleted}/{creditsTotal}</dd>
                </div>
                <div>
                  <dt className="text-slate-500">Semester</dt>
                  <dd className="mt-1 text-xl font-black">{semester}</dd>
                </div>
              </dl>
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
          <StatCard label="Admission Status" value={admissionStatus} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-7">
          <SectionCard title="Progress Overview" className="lg:col-span-2">
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
                    ? "Contact your class advisor to protect your academic standing."
                    : undefined
                }
              />
            </div>
          </SectionCard>

          <SectionCard title="Action Center">
            <div className="grid gap-3">
              {actionItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="rounded-md border border-slate-800 bg-slate-900 p-3 transition hover:border-slate-500 hover:bg-slate-800"
                >
                  <p className="font-semibold text-slate-100">{item.label}</p>
                  <p className="mt-1 text-xs leading-5 text-slate-400">{item.description}</p>
                </Link>
              ))}
            </div>
          </SectionCard>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-7">
          <SectionCard title="Portal Alerts">
            <div className="space-y-3">
              {alerts.map((alert, index) => (
                <div
                  key={`${alert}-${index}`}
                  className="rounded-md border border-slate-800 bg-slate-900 p-3 text-sm text-slate-200"
                >
                  {alert}
                </div>
              ))}
            </div>
          </SectionCard>

          <SectionCard title="Academic Timeline" className="lg:col-span-2">
            <div className="grid gap-3 md:grid-cols-4">
              {timelineItems.map((item, index) => (
                <div key={item.label} className="rounded-md bg-slate-900 p-3">
                  <p className="text-xs font-bold uppercase tracking-wide text-slate-500">
                    Step {index + 1}
                  </p>
                  <p className="mt-2 font-semibold text-slate-100">{item.label}</p>
                  <p className="mt-1 text-xs leading-5 text-slate-400">{item.value}</p>
                </div>
              ))}
            </div>
          </SectionCard>
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
                    className="rounded-md border border-slate-800 bg-slate-900 p-4 transition hover:border-slate-500 hover:bg-slate-800"
                  >
                    <p className="font-semibold text-sm">{resource.title || "Untitled Resource"}</p>
                    {resource.description ? (
                      <p className="text-xs text-slate-400 mt-1 leading-5">{resource.description}</p>
                    ) : null}
                    <p className="text-xs text-slate-300 mt-2">
                      {resource.course || "General"}
                      {resource.uploadedBy ? ` | by ${resource.uploadedBy}` : ""}
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
                upcomingClasses.map((item, idx) => {
                  const content = (
                    <>
                      <p className="font-semibold text-slate-100">{item.title}</p>
                      {item.description ? (
                        <p className="mt-1 text-xs leading-5 text-slate-400">{item.description}</p>
                      ) : null}
                      {item.meta ? (
                        <p className="mt-2 text-xs text-slate-300">{item.meta}</p>
                      ) : null}
                    </>
                  );

                  return item.href ? (
                    <a
                      key={`${item.title}-${idx}`}
                      href={item.href}
                      target="_blank"
                      rel="noreferrer"
                      className="block rounded-md bg-slate-900 p-3 text-sm text-slate-200 transition hover:bg-slate-800"
                    >
                      {content}
                    </a>
                  ) : (
                    <div
                      key={`${item.title}-${idx}`}
                      className="rounded-md bg-slate-900 p-3 text-sm text-slate-200"
                    >
                      {content}
                    </div>
                  );
                })
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
                deadlines.map((item, idx) => {
                  const content = (
                    <>
                      <p className="font-semibold text-slate-100">{item.title}</p>
                      {item.description ? (
                        <p className="mt-1 text-xs leading-5 text-slate-400">{item.description}</p>
                      ) : null}
                      {item.meta ? (
                        <p className="mt-2 text-xs text-slate-300">{item.meta}</p>
                      ) : null}
                    </>
                  );

                  return item.href ? (
                    <a
                      key={`${item.title}-${idx}`}
                      href={item.href}
                      target="_blank"
                      rel="noreferrer"
                      className="block rounded-md bg-slate-900 p-3 text-sm text-slate-200 transition hover:bg-slate-800"
                    >
                      {content}
                    </a>
                  ) : (
                    <div
                      key={`${item.title}-${idx}`}
                      className="rounded-md bg-slate-900 p-3 text-sm text-slate-200"
                    >
                      {content}
                    </div>
                  );
                })
              ) : (
                <p className="text-slate-400 text-sm">No active deadlines found.</p>
              )}
            </div>
          </SectionCard>

          <SectionCard title="Announcements">
            <div className="space-y-3">
              {announcements.length > 0 ? (
                announcements.map((item, idx) => {
                  const content = (
                    <>
                      <p className="font-semibold text-slate-100">{item.title}</p>
                      {item.description ? (
                        <p className="mt-1 text-xs leading-5 text-slate-400">{item.description}</p>
                      ) : null}
                      {item.meta ? (
                        <p className="mt-2 text-xs text-slate-300">{item.meta}</p>
                      ) : null}
                    </>
                  );

                  return item.href ? (
                    <a
                      key={`${item.title}-${idx}`}
                      href={item.href}
                      target="_blank"
                      rel="noreferrer"
                      className="block rounded-md border border-slate-800 bg-slate-900 p-3 text-sm text-slate-200 transition hover:bg-slate-800"
                    >
                      {content}
                    </a>
                  ) : (
                    <div
                      key={`${item.title}-${idx}`}
                      className="rounded-md border border-slate-800 bg-slate-900 p-3 text-sm text-slate-200"
                    >
                      {content}
                    </div>
                  );
                })
              ) : (
                <p className="text-slate-400 text-sm">No new announcements right now.</p>
              )}
            </div>
          </SectionCard>
        </div>

        <SectionCard title="Profile Summary">
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
        </SectionCard>
      </div>
    </div>
  );
}
