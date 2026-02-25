import Link from "next/link";
import { notFound } from "next/navigation";
import { departments, getDepartmentById } from "@/data/office";
import type { Metadata } from "next";

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  return departments.map((d) => ({ id: d.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const dept = getDepartmentById(id);
  if (!dept) return { title: "Department Not Found" };
  return {
    title: `${dept.name} — SPRING.CO.LTD Digital Office`,
    description: dept.description,
  };
}

export default async function DepartmentPage({ params }: Props) {
  const { id } = await params;
  const dept = getDepartmentById(id);

  if (!dept) notFound();

  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="py-24 relative bg-grid">
        <div className="absolute inset-0">
          <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-green-500/8 rounded-full blur-3xl" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-gray-500 mb-8">
            <Link href="/" className="hover:text-green-400 transition-colors">
              Home
            </Link>
            <span>/</span>
            <Link href="/office" className="hover:text-green-400 transition-colors">
              Digital Office
            </Link>
            <span>/</span>
            <span className="text-gray-400">{dept.shortName}</span>
          </div>

          <div className="flex flex-col md:flex-row items-start gap-6">
            <div
              className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${dept.color} flex items-center justify-center text-4xl shadow-xl flex-shrink-0`}
            >
              {dept.icon}
            </div>
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                {dept.name}
              </h1>
              <p className="text-xl text-gray-400 leading-relaxed max-w-2xl">
                {dept.description}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-12">
              {/* Responsibilities */}
              <div>
                <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                  <span className="w-1 h-8 rounded-full bg-gradient-to-b from-green-500 to-emerald-600" />
                  Key Responsibilities
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {dept.responsibilities.map((item, i) => (
                    <div
                      key={i}
                      className="glass rounded-xl p-4 flex items-center gap-3 hover:bg-white/10 transition-colors"
                    >
                      <div className="w-8 h-8 rounded-lg bg-green-500/10 flex items-center justify-center text-green-400 text-sm font-bold flex-shrink-0">
                        {i + 1}
                      </div>
                      <span className="text-gray-300 text-sm">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Team */}
              <div>
                <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                  <span className="w-1 h-8 rounded-full bg-gradient-to-b from-blue-500 to-indigo-600" />
                  Team Members
                </h2>

                {/* Department Head */}
                <div className="glass rounded-2xl p-6 mb-6 border border-green-500/20">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="px-2.5 py-1 rounded-full bg-green-500/15 text-green-400 text-xs font-semibold">
                      Department Head
                    </span>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-xl bg-white/5 flex items-center justify-center text-3xl">
                      {dept.head.avatar}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-white">
                        {dept.head.name}
                      </h3>
                      <p className="text-gray-400 text-sm">{dept.head.role}</p>
                      <a
                        href={`mailto:${dept.head.email}`}
                        className="text-green-400 text-sm hover:text-green-300 transition-colors"
                      >
                        {dept.head.email}
                      </a>
                    </div>
                  </div>
                </div>

                {/* Team Members */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {dept.team.map((member, i) => (
                    <div
                      key={i}
                      className="glass rounded-xl p-5 hover:bg-white/10 transition-colors"
                    >
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-12 h-12 rounded-lg bg-white/5 flex items-center justify-center text-2xl">
                          {member.avatar}
                        </div>
                        <div>
                          <h4 className="text-white font-semibold text-sm">
                            {member.name}
                          </h4>
                          <p className="text-gray-500 text-xs">{member.role}</p>
                        </div>
                      </div>
                      <a
                        href={`mailto:${member.email}`}
                        className="text-green-400 text-xs hover:text-green-300 transition-colors"
                      >
                        {member.email}
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Quick Links */}
              <div className="glass rounded-2xl p-6">
                <h3 className="text-lg font-bold text-white mb-4">
                  Quick Links
                </h3>
                <div className="space-y-2">
                  {dept.tools.map((tool, i) => (
                    <Link
                      key={i}
                      href={tool.href}
                      className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/10 transition-colors group"
                    >
                      <span className="text-lg">{tool.icon}</span>
                      <span className="text-gray-300 text-sm group-hover:text-white transition-colors">
                        {tool.label}
                      </span>
                      <svg
                        className="w-4 h-4 text-gray-600 ml-auto group-hover:text-green-400 transition-colors"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Contact Card */}
              <div className="glass rounded-2xl p-6">
                <h3 className="text-lg font-bold text-white mb-4">
                  Contact This Department
                </h3>
                <p className="text-gray-400 text-sm mb-4">
                  Reach the {dept.shortName} team directly.
                </p>
                <a
                  href={`mailto:${dept.head.email}`}
                  className="flex items-center justify-center gap-2 w-full px-5 py-3 rounded-xl bg-gradient-to-r from-green-500 to-emerald-600 text-white text-sm font-semibold hover:from-green-600 hover:to-emerald-700 transition-all duration-300 shadow-lg shadow-green-500/20"
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                  Email {dept.shortName}
                </a>
              </div>

              {/* Other Departments */}
              <div className="glass rounded-2xl p-6">
                <h3 className="text-lg font-bold text-white mb-4">
                  Other Departments
                </h3>
                <div className="space-y-2">
                  {departments
                    .filter((d) => d.id !== dept.id)
                    .map((d) => (
                      <Link
                        key={d.id}
                        href={`/office/${d.id}`}
                        className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-white/10 transition-colors group"
                      >
                        <span className="text-lg">{d.icon}</span>
                        <span className="text-gray-400 text-sm group-hover:text-white transition-colors">
                          {d.shortName}
                        </span>
                      </Link>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
