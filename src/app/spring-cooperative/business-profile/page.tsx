import { redirect } from "next/navigation";
import { getSession } from "@/lib/session";
import { companyInfo } from "@/data/company";
import BusinessProfileActions from "./business-profile-actions";
import CompanySecretaryJournal from "@/components/CompanySecretaryJournal";
import {
  businessProfileChapters,
  businessProfileSubsidiaryRows,
} from "@/lib/business-profile-report";

export default async function BusinessProfilePage() {
  const session = await getSession();

  if (!session.isLoggedIn) {
    redirect("/spring-cooperative/secret-login?from=/spring-cooperative/business-profile");
  }

  return (
    <main className="min-h-screen bg-slate-100 py-10 text-slate-900 print:bg-white print:py-0">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <BusinessProfileActions />

        <article
          id="business-profile-document"
          className="rounded-3xl bg-white px-6 py-10 shadow-xl ring-1 ring-slate-200 sm:px-10 lg:px-14 print:rounded-none print:bg-white print:px-0 print:py-0 print:shadow-none print:ring-0"
        >
          <header className="border-b border-slate-200 pb-8 text-center print:border-slate-300">
            <p className="text-xs font-semibold uppercase tracking-[0.45em] text-slate-500">
              Research Paper Style Business Profile
            </p>
            <h1 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              {companyInfo.name}
            </h1>
            <p className="mt-3 text-sm text-slate-600 sm:text-base">{companyInfo.tagline}</p>

            <div className="mt-8 grid gap-3 text-left sm:grid-cols-2 lg:grid-cols-4">
              <div className="rounded-2xl bg-slate-50 p-4 ring-1 ring-slate-200">
                <p className="text-xs uppercase tracking-[0.25em] text-slate-500">Founded</p>
                <p className="mt-2 text-sm font-semibold text-slate-900">{companyInfo.founded}</p>
              </div>
              <div className="rounded-2xl bg-slate-50 p-4 ring-1 ring-slate-200">
                <p className="text-xs uppercase tracking-[0.25em] text-slate-500">Headquarters</p>
                <p className="mt-2 text-sm font-semibold text-slate-900">{companyInfo.headquarters}</p>
              </div>
              <div className="rounded-2xl bg-slate-50 p-4 ring-1 ring-slate-200">
                <p className="text-xs uppercase tracking-[0.25em] text-slate-500">Email</p>
                <p className="mt-2 text-sm font-semibold text-slate-900">{companyInfo.email}</p>
              </div>
              <div className="rounded-2xl bg-slate-50 p-4 ring-1 ring-slate-200">
                <p className="text-xs uppercase tracking-[0.25em] text-slate-500">Phone</p>
                <p className="mt-2 text-sm font-semibold text-slate-900">{companyInfo.phone}</p>
              </div>
            </div>
          </header>

          <section className="mt-10 space-y-10">
            <section className="space-y-3">
              <div className="flex items-baseline gap-3 border-b border-slate-200 pb-2">
                <span className="text-sm font-semibold text-slate-500">Table 1.</span>
                <h2 className="text-2xl font-bold tracking-tight text-slate-900">Table of Contents</h2>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                <ol className="grid gap-3 text-sm text-slate-700 sm:grid-cols-2">
                  {businessProfileChapters.map((chapter) => (
                    <li key={chapter.title} className="flex items-start gap-3">
                      <span className="min-w-24 font-semibold text-slate-900">{chapter.number}</span>
                      <span>{chapter.title}</span>
                    </li>
                  ))}
                </ol>
              </div>
            </section>

            <div className="rounded-2xl bg-slate-50 p-6 ring-1 ring-slate-200 print:bg-white">
              <h2 className="text-lg font-semibold text-slate-900">Keywords</h2>
              <p className="mt-2 text-sm leading-7 text-slate-700">
                Corporate profile, diversified business group, subsidiary structure, service delivery, professional presentation, strategic growth, Ghana.
              </p>
            </div>

            {businessProfileChapters.map((section) => (
              <section key={section.title} className="space-y-3">
                <div className="flex items-baseline gap-3 border-b border-slate-200 pb-2">
                  <span className="text-sm font-semibold text-slate-500">{section.number}.</span>
                  <h2 className="text-2xl font-bold tracking-tight text-slate-900">{section.title}</h2>
                </div>
                <p className="text-base leading-8 text-slate-700">{section.content}</p>
              </section>
            ))}

            <CompanySecretaryJournal />

            <section className="space-y-3">
              <div className="flex items-baseline gap-3 border-b border-slate-200 pb-2">
                <span className="text-sm font-semibold text-slate-500">Table 2.</span>
                <h2 className="text-2xl font-bold tracking-tight text-slate-900">Subsidiary Table</h2>
              </div>

              <div className="overflow-hidden rounded-2xl border border-slate-200">
                <table className="w-full border-collapse text-left text-sm">
                  <thead className="bg-slate-50">
                    <tr>
                      <th className="border-b border-slate-200 px-4 py-3 font-semibold text-slate-700">Subsidiary</th>
                      <th className="border-b border-slate-200 px-4 py-3 font-semibold text-slate-700">Primary Focus</th>
                    </tr>
                  </thead>
                  <tbody>
                    {businessProfileSubsidiaryRows.map((row) => (
                      <tr key={row[0]} className="odd:bg-white even:bg-slate-50">
                        <td className="border-b border-slate-200 px-4 py-3 font-medium text-slate-900">{row[0]}</td>
                        <td className="border-b border-slate-200 px-4 py-3 text-slate-700">{row[1]}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            <section className="space-y-3">
              <div className="flex items-baseline gap-3 border-b border-slate-200 pb-2">
                <span className="text-sm font-semibold text-slate-500">Table 3.</span>
                <h2 className="text-2xl font-bold tracking-tight text-slate-900">Contact Information</h2>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-2xl bg-slate-50 p-5 ring-1 ring-slate-200">
                  <p className="text-xs uppercase tracking-[0.25em] text-slate-500">Headquarters</p>
                  <p className="mt-2 text-base font-semibold text-slate-900">{companyInfo.headquarters}</p>
                </div>
                <div className="rounded-2xl bg-slate-50 p-5 ring-1 ring-slate-200">
                  <p className="text-xs uppercase tracking-[0.25em] text-slate-500">Address</p>
                  <p className="mt-2 text-base font-semibold text-slate-900">{companyInfo.address}</p>
                </div>
                <div className="rounded-2xl bg-slate-50 p-5 ring-1 ring-slate-200">
                  <p className="text-xs uppercase tracking-[0.25em] text-slate-500">Email</p>
                  <p className="mt-2 text-base font-semibold text-slate-900">{companyInfo.email}</p>
                </div>
                <div className="rounded-2xl bg-slate-50 p-5 ring-1 ring-slate-200">
                  <p className="text-xs uppercase tracking-[0.25em] text-slate-500">Phone</p>
                  <p className="mt-2 text-base font-semibold text-slate-900">{companyInfo.phone}</p>
                </div>
              </div>
            </section>
          </section>

          <footer className="mt-12 border-t border-slate-200 pt-6 text-center text-xs leading-6 text-slate-500 print:mt-8">
            <p>
              This profile is prepared as a formal internal document for SPRING CO. LTD and may be exported using the PDF download action above.
            </p>
          </footer>
        </article>
      </div>
    </main>
  );
}