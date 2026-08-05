import { getDashboardMember } from "@/lib/springCoopDashboard";

export default async function DashboardProfilePage() {
  const member = await getDashboardMember();

  return (
    <div className="min-h-screen bg-[#020814] text-slate-100 pt-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 pb-24">
        <section className="rounded-4xl border border-slate-800 bg-slate-950/95 p-10 shadow-2xl shadow-slate-950/40">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.35em] text-cyan-300/70">SPRING CO-OPERATIVE UNION</p>
              <h1 className="mt-4 text-4xl font-semibold text-white">Profile</h1>
              <p className="mt-3 max-w-2xl text-slate-400">Your member profile page shows only personal membership details and contact data.</p>
            </div>
          </div>

          <div className="mt-10 grid gap-6 lg:grid-cols-[1fr_0.9fr]">
            <div className="rounded-4xl border border-slate-800 bg-slate-900/80 p-8 shadow-xl shadow-slate-950/20">
              <div className="space-y-6">
                <div>
                  <p className="text-sm uppercase tracking-[0.35em] text-slate-500">Member name</p>
                  <p className="mt-2 text-3xl font-semibold text-white">{member.fullName || "No name available"}</p>
                </div>
                <div>
                  <p className="text-sm uppercase tracking-[0.35em] text-slate-500">Joined date</p>
                  <p className="mt-2 text-2xl font-semibold text-white">{member.joinedDate || "Not available"}</p>
                </div>
                <div>
                  <p className="text-sm uppercase tracking-[0.35em] text-slate-500">Membership status</p>
                  <p className="mt-2 text-2xl font-semibold text-white">{member.membershipStatus || "Pending"}</p>
                </div>
                <div>
                  <p className="text-sm uppercase tracking-[0.35em] text-slate-500">Membership tier</p>
                  <p className="mt-2 text-2xl font-semibold text-white">{member.membershipTier || "Standard"}</p>
                </div>
              </div>
            </div>

            <div className="rounded-4xl border border-slate-800 bg-slate-900/80 p-8 shadow-xl shadow-slate-950/20">
              <p className="text-sm uppercase tracking-[0.35em] text-slate-500">Contact details</p>
              <div className="mt-6 grid gap-4">
                <div className="rounded-3xl bg-slate-950/70 p-5">
                  <p className="text-sm text-slate-400">Email</p>
                  <p className="mt-2 text-lg font-semibold text-white">{member.email || "Not available"}</p>
                </div>
                <div className="rounded-3xl bg-slate-950/70 p-5">
                  <p className="text-sm text-slate-400">Phone</p>
                  <p className="mt-2 text-lg font-semibold text-white">{member.phoneNumber || "Not available"}</p>
                </div>
                <div className="rounded-3xl bg-slate-950/70 p-5">
                  <p className="text-sm text-slate-400">Branch</p>
                  <p className="mt-2 text-lg font-semibold text-white">{member.branch || "Not available"}</p>
                </div>
                <div className="rounded-3xl bg-slate-950/70 p-5">
                  <p className="text-sm text-slate-400">Address</p>
                  <p className="mt-2 text-lg font-semibold text-white">{member.address || "Not available"}</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
