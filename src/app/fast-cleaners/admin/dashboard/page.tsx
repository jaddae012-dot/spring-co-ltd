import Link from "next/link";
import { getGoogleSheetData } from "@/lib/sheets";
import FastCleanersWorkflowAdmin from "@/components/dashboard/FastCleanersWorkflowAdmin";
import StatsCard from "@/components/dashboard/StatsCard";

function getField(row: Record<string, unknown>, aliases: string[]): string {
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

async function getEmployeeStats() {
  try {
    const employees = (await getGoogleSheetData("FC_Employees")) as Record<
      string,
      unknown
    >[];

    const stats = {
      total: employees.length,
      pending: 0,
      approved: 0,
      active: 0,
      rejected: 0,
    };

    employees.forEach((emp) => {
      const status = getField(emp, ["Status", "ApplicationStatus"]).toLowerCase();
      if (status.includes("pending")) stats.pending++;
      else if (status.includes("approved")) stats.approved++;
      else if (status.includes("active")) stats.active++;
      else if (status.includes("rejected")) stats.rejected++;
    });

    return stats;
  } catch {
    return {
      total: 0,
      pending: 0,
      approved: 0,
      active: 0,
      rejected: 0,
    };
  }
}

async function getRecentApplications() {
  try {
    const employees = (await getGoogleSheetData("FC_Employees")) as Record<
      string,
      unknown
    >[];

    return employees
      .slice(-10)
      .map((emp) => ({
        ref: getField(emp, ["ApplicationRef", "Application Ref"]),
        name: getField(emp, ["FullName", "Full Name", "Name"]),
        phone: getField(emp, ["Phone", "PhoneNumber"]),
        region: getField(emp, ["Region", "Location"]),
        status: getField(emp, ["Status", "ApplicationStatus"]),
        date: getField(emp, ["SubmittedAt", "Submitted At"]),
      }));
  } catch {
    return [];
  }
}

export default async function FastCleanersAdminDashboard() {
  const stats = await getEmployeeStats();
  const recentApps = await getRecentApplications();

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 pt-24">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <header className="mb-8 rounded-lg border border-slate-800 bg-slate-900 p-5">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                Fast Cleaners Admin
              </p>
              <h1 className="mt-1 text-3xl font-black tracking-tight">
                Employee Management
              </h1>
            </div>
            <div className="flex flex-wrap gap-2">
              <Link
                href="/fast-cleaners"
                className="rounded-md border border-slate-700 px-3 py-2 text-sm font-semibold text-slate-200 transition hover:border-slate-500 hover:text-white"
              >
                Back to Fast Cleaners
              </Link>
            </div>
          </div>
        </header>

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
          <StatsCard
            label="Total Applications"
            value={stats.total}
            color="blue"
          />
          <StatsCard
            label="Pending Review"
            value={stats.pending}
            color="yellow"
          />
          <StatsCard
            label="Approved"
            value={stats.approved}
            color="green"
          />
          <StatsCard
            label="Active Cleaners"
            value={stats.active}
            color="purple"
          />
          <StatsCard
            label="Rejected"
            value={stats.rejected}
            color="red"
          />
        </div>

        {/* Workflow Manager */}
        <FastCleanersWorkflowAdmin />

        {/* Recent Applications */}
        <div className="rounded-lg border border-slate-700 bg-slate-900 p-5">
          <h2 className="text-xl font-bold mb-4">Recent Applications</h2>

          {recentApps.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-slate-300">
                <thead className="border-b border-slate-700 text-slate-400 text-xs font-semibold uppercase">
                  <tr>
                    <th className="px-4 py-2 text-left">Reference</th>
                    <th className="px-4 py-2 text-left">Name</th>
                    <th className="px-4 py-2 text-left">Phone</th>
                    <th className="px-4 py-2 text-left">Region</th>
                    <th className="px-4 py-2 text-left">Status</th>
                    <th className="px-4 py-2 text-left">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800">
                  {recentApps.map((app) => (
                    <tr key={app.ref} className="hover:bg-slate-800/50 transition">
                      <td className="px-4 py-3 font-mono text-xs text-blue-400">
                        {app.ref}
                      </td>
                      <td className="px-4 py-3">{app.name}</td>
                      <td className="px-4 py-3 text-slate-400">{app.phone}</td>
                      <td className="px-4 py-3">{app.region}</td>
                      <td className="px-4 py-3">
                        <span
                          className={`inline-block px-2 py-1 rounded text-xs font-semibold ${
                            app.status.toLowerCase().includes("approved")
                              ? "bg-green-900/30 text-green-300"
                              : app.status.toLowerCase().includes("pending")
                              ? "bg-yellow-900/30 text-yellow-300"
                              : app.status.toLowerCase().includes("rejected")
                              ? "bg-red-900/30 text-red-300"
                              : "bg-slate-700 text-slate-300"
                          }`}
                        >
                          {app.status}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-slate-400 text-xs">
                        {new Date(app.date).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-slate-400 text-center py-8">No applications yet</p>
          )}
        </div>
      </div>
    </div>
  );
}
