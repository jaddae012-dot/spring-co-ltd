import Link from "next/link";
import { redirect } from "next/navigation";
import { getGoogleSheetData } from "@/lib/sheets";
import { getSession } from "@/lib/session";

type Row = Record<string, unknown>;

function getField(row: Row, aliases: string[]): string {
  const normalizedEntries = Object.entries(row).map(([key, value]) => [
    key.replace(/[^a-zA-Z0-9]/g, "").toLowerCase(),
    value,
  ] as const);

  for (const alias of aliases) {
    const normalizedAlias = alias.replace(/[^a-zA-Z0-9]/g, "").toLowerCase();
    const found = normalizedEntries.find(([key]) => key === normalizedAlias);
    if (found) return String(found[1] ?? "").trim();
  }

  return "";
}

function previewRows(rows: Row[], kind: "student" | "tutor") {
  return rows.slice(0, 10).map((row, index) => {
    const id =
      kind === "student"
        ? getField(row, ["StudentID", "Student ID", "ID"])
        : getField(row, ["TutorID", "Tutor ID", "ID"]);

    const name =
      `${getField(row, ["FirstName", "First Name"])} ${getField(row, [
        "LastName",
        "Last Name",
      ])}`.trim() || "-";

    const hasPin = Boolean(getField(row, ["PIN", "Pin", "Password", "Passcode"]));

    return {
      key: `${kind}-${index}`,
      id: id || "-",
      name,
      hasPin,
    };
  });
}

export default async function AdminTestPage() {
  const session = await getSession();

  if (!session.isLoggedIn || session.userType !== "tutor") {
    redirect("/prime-college/login");
  }

  const students = (await getGoogleSheetData("students")) as Row[];
  const tutors = (await getGoogleSheetData("tutors")) as Row[];

  const studentPreview = previewRows(students, "student");
  const tutorPreview = previewRows(tutors, "tutor");

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 pt-24">
      <div className="container mx-auto px-4 py-8 max-w-5xl">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">Sheets Admin Test</h1>
          <div className="flex items-center gap-3">
            <Link
              href="/prime-college/tutor/dashboard"
              className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-md font-semibold"
            >
              Back to Tutor Dashboard
            </Link>
            <Link
              href="/api/auth/logout"
              className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-md font-semibold"
            >
              Logout
            </Link>
          </div>
        </div>

        <div className="mb-6 rounded-lg border border-amber-500/40 bg-amber-500/10 p-4 text-amber-200">
          This page intentionally hides PIN values and private credentials. It only verifies that rows are being read from Google Sheets.
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="rounded-lg border border-slate-700 bg-slate-900 p-5">
            <p className="text-slate-400 text-sm">Students Loaded</p>
            <p className="text-4xl font-black mt-2">{students.length}</p>
          </div>
          <div className="rounded-lg border border-slate-700 bg-slate-900 p-5">
            <p className="text-slate-400 text-sm">Tutors Loaded</p>
            <p className="text-4xl font-black mt-2">{tutors.length}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <section className="rounded-lg border border-slate-700 bg-slate-900 p-5">
            <h2 className="text-xl font-bold mb-4">Student Preview (Top 10)</h2>
            <div className="space-y-3">
              {studentPreview.map((row) => (
                <div key={row.key} className="rounded-md bg-slate-800 p-3 flex justify-between items-center">
                  <div>
                    <p className="font-semibold">{row.id}</p>
                    <p className="text-sm text-slate-400">{row.name}</p>
                  </div>
                  <span className={`text-xs px-2 py-1 rounded ${row.hasPin ? "bg-emerald-700/40 text-emerald-300" : "bg-red-700/40 text-red-300"}`}>
                    {row.hasPin ? "PIN present" : "PIN missing"}
                  </span>
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-lg border border-slate-700 bg-slate-900 p-5">
            <h2 className="text-xl font-bold mb-4">Tutor Preview (Top 10)</h2>
            <div className="space-y-3">
              {tutorPreview.map((row) => (
                <div key={row.key} className="rounded-md bg-slate-800 p-3 flex justify-between items-center">
                  <div>
                    <p className="font-semibold">{row.id}</p>
                    <p className="text-sm text-slate-400">{row.name}</p>
                  </div>
                  <span className={`text-xs px-2 py-1 rounded ${row.hasPin ? "bg-emerald-700/40 text-emerald-300" : "bg-red-700/40 text-red-300"}`}>
                    {row.hasPin ? "PIN present" : "PIN missing"}
                  </span>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
