import { getFieldOfficeSession } from "@/lib/fieldOfficeDashboard";

export default async function FieldOfficeProfilePage() {
  const { user } = await getFieldOfficeSession();

  return (
    <div className="min-h-screen bg-[#020814] text-slate-100 pt-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 pb-24">
        <section className="rounded-[3rem] border border-slate-800 bg-slate-950/95 p-8 shadow-2xl shadow-slate-950/40">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.35em] text-cyan-300/70">SPRING CO-OPERATIVE FIELD OFFICE</p>
              <h1 className="mt-4 text-4xl font-semibold text-white">Field officer profile</h1>
              <p className="mt-3 text-slate-400">Your account details and branch information are shown here for quick reference.</p>
            </div>
          </div>

          <div className="mt-10 grid gap-6 lg:grid-cols-2">
            <div className="rounded-4xl border border-slate-800 bg-slate-900/80 p-8 shadow-xl shadow-slate-950/20">
              <p className="text-sm uppercase tracking-[0.35em] text-slate-500">Field officer</p>
              <div className="mt-6 space-y-5">
                <div>
                  <p className="text-sm uppercase tracking-[0.35em] text-slate-500">Name</p>
                  <p className="mt-2 text-3xl font-semibold text-white">{user.name}</p>
                </div>
                <div>
                  <p className="text-sm uppercase tracking-[0.35em] text-slate-500">Branch</p>
                  <p className="mt-2 text-2xl font-semibold text-white">{user.branch || "Not assigned"}</p>
                </div>
                <div>
                  <p className="text-sm uppercase tracking-[0.35em] text-slate-500">Office ID</p>
                  <p className="mt-2 text-2xl font-semibold text-white">{user.officeId}</p>
                </div>
              </div>
            </div>

            <div className="rounded-4xl border border-slate-800 bg-slate-900/80 p-8 shadow-xl shadow-slate-950/20">
              <p className="text-sm uppercase tracking-[0.35em] text-slate-500">Contact info</p>
              <div className="mt-6 space-y-5">
                <div>
                  <p className="text-sm uppercase tracking-[0.35em] text-slate-500">Phone</p>
                  <p className="mt-2 text-2xl font-semibold text-white">{user.phone || "Not available"}</p>
                </div>
                <div>
                  <p className="text-sm uppercase tracking-[0.35em] text-slate-500">Email</p>
                  <p className="mt-2 text-2xl font-semibold text-white">{user.email || "Not available"}</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
