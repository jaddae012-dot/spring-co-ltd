import Link from "next/link";
import JobPostingForm from "@/components/JobPostingForm";
import StatCard from "@/components/dashboard/StatCard";
import { getGoogleSheetData } from "@/lib/sheets";

export const dynamic = "force-dynamic";

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

async function getJobStats() {
  try {
    const jobs = (await getGoogleSheetData("FC_Jobs")) as Record<
      string,
      unknown
    >[];

    const stats = {
      total: jobs.length,
      open: 0,
      assigned: 0,
      completed: 0,
    };

    jobs.forEach((job) => {
      const status = getField(job, ["Status", "JobStatus"]).toLowerCase();
      if (status.includes("open")) stats.open++;
      else if (status.includes("assigned")) stats.assigned++;
      else if (status.includes("completed")) stats.completed++;
    });

    return stats;
  } catch {
    return {
      total: 0,
      open: 0,
      assigned: 0,
      completed: 0,
    };
  }
}

async function getRecentJobs() {
  try {
    const jobs = (await getGoogleSheetData("FC_Jobs")) as Record<
      string,
      unknown
    >[];

    return jobs
      .slice(-8)
      .reverse()
      .map((job) => ({
        jobId: getField(job, ["JobID", "Job ID", "JobId"]),
        serviceType: getField(job, ["ServiceType", "Service Type"]),
        region: getField(job, ["Region", "Location"]),
        customerName: getField(job, ["CustomerName", "Customer Name"]),
        status: getField(job, ["Status", "JobStatus"]),
        rate: getField(job, ["Rate", "JobRate"]),
        date: getField(job, ["PreferredDate", "Preferred Date"]),
      }));
  } catch {
    return [];
  }
}

export default async function JobPostingPage() {
  const stats = await getJobStats();
  const recentJobs = await getRecentJobs();

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
                Post Cleaning Jobs
              </h1>
            </div>
            <div className="flex flex-wrap gap-2">
              <Link
                href="/fast-cleaners/admin/dashboard"
                className="rounded-md border border-slate-700 px-3 py-2 text-sm font-semibold text-slate-200 transition hover:border-slate-500 hover:text-white"
              >
                Back to Dashboard
              </Link>
            </div>
          </div>
        </header>

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <StatCard label="Total Jobs" value={stats.total} color="blue" />
          <StatCard label="Open" value={stats.open} color="yellow" />
          <StatCard label="Assigned" value={stats.assigned} color="purple" />
          <StatCard label="Completed" value={stats.completed} color="green" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form */}
          <div className="lg:col-span-2 rounded-lg border border-slate-700 bg-slate-900 p-6">
            <h2 className="text-2xl font-bold mb-2">Create New Job</h2>
            <p className="text-sm text-slate-400 mb-6">
              Post a new cleaning job. Available cleaners in that region will be able to
              see and accept this job.
            </p>
            <JobPostingForm />
          </div>

          {/* Recent Jobs Sidebar */}
          <div className="rounded-lg border border-slate-700 bg-slate-900 p-6">
            <h2 className="text-xl font-bold mb-4">Recent Jobs</h2>
            {recentJobs.length > 0 ? (
              <div className="space-y-3">
                {recentJobs.map((job) => (
                  <div
                    key={job.jobId}
                    className="p-3 rounded-lg bg-slate-800 border border-slate-700 hover:border-slate-600 transition"
                  >
                    <p className="text-xs font-mono text-blue-400">{job.jobId}</p>
                    <p className="text-sm font-semibold text-white mt-1">
                      {job.serviceType}
                    </p>
                    <p className="text-xs text-slate-400">{job.region}</p>
                    <div className="flex items-center justify-between mt-2">
                      <span
                        className={`inline-block px-2 py-1 rounded text-xs font-semibold ${
                          job.status.toLowerCase().includes("open")
                            ? "bg-yellow-900/30 text-yellow-300"
                            : job.status.toLowerCase().includes("assigned")
                            ? "bg-purple-900/30 text-purple-300"
                            : "bg-green-900/30 text-green-300"
                        }`}
                      >
                        {job.status}
                      </span>
                      <span className="text-xs font-semibold text-orange-400">
                        ₵{job.rate}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-slate-400 text-center py-8">No jobs yet</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
