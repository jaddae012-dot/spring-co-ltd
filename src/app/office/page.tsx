import Link from "next/link";
import { departments } from "@/data/office";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Digital Office — SPRING.CO.LTD",
  description:
    "Explore the departments and teams that power SPRING.CO.LTD — from CEO administration to HR, Finance, Marketing, PR, and Operations.",
};

export default function OfficePage() {
  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="py-24 relative bg-grid">
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-green-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-blue-500/8 rounded-full blur-3xl" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-sm text-green-400 mb-6">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              Corporate Administration
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Digital <span className="gradient-text">Office</span>
            </h1>
            <p className="text-xl text-gray-400 leading-relaxed">
              The nerve center of SPRING.CO.LTD — meet the departments and teams
              that drive our operations, strategy, and growth.
            </p>
          </div>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="py-12 border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { label: "Departments", value: departments.length, icon: "🏢" },
              {
                label: "Team Members",
                value: departments.reduce((sum, d) => sum + d.team.length + 1, 0),
                icon: "👥",
              },
              { label: "Subsidiaries Managed", value: "6", icon: "🌐" },
              { label: "Status", value: "Active", icon: "🟢" },
            ].map((stat, i) => (
              <div key={i} className="glass rounded-2xl p-5 text-center">
                <div className="text-2xl mb-2">{stat.icon}</div>
                <div className="text-2xl font-bold text-white">{stat.value}</div>
                <div className="text-xs text-gray-500 mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Department Cards */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <h2 className="text-3xl font-bold mb-4">
              Our <span className="gradient-text">Departments</span>
            </h2>
            <p className="text-gray-400 max-w-2xl">
              Each department plays a vital role in the success of SPRING.CO.LTD
              and its family of companies.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {departments.map((dept) => (
              <Link key={dept.id} href={`/office/${dept.id}`}>
                <div className="glass rounded-2xl p-6 hover:bg-white/10 transition-all duration-300 group h-full flex flex-col">
                  {/* Header */}
                  <div className="flex items-center gap-4 mb-4">
                    <div
                      className={`w-14 h-14 rounded-xl bg-gradient-to-br ${dept.color} flex items-center justify-center text-2xl shadow-lg`}
                    >
                      {dept.icon}
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white group-hover:text-green-400 transition-colors">
                        {dept.name}
                      </h3>
                      <p className="text-xs text-gray-500">
                        {dept.team.length + 1} team member{dept.team.length > 0 ? "s" : ""}
                      </p>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-gray-400 text-sm leading-relaxed mb-5 flex-1">
                    {dept.description}
                  </p>

                  {/* Head */}
                  <div className="flex items-center gap-3 pt-4 border-t border-white/5">
                    <div className="w-9 h-9 rounded-full bg-white/5 flex items-center justify-center text-lg">
                      {dept.head.avatar}
                    </div>
                    <div>
                      <p className="text-white text-sm font-medium">
                        {dept.head.name}
                      </p>
                      <p className="text-gray-500 text-xs">{dept.head.role}</p>
                    </div>
                    <svg
                      className="w-5 h-5 text-gray-600 ml-auto group-hover:text-green-400 group-hover:translate-x-1 transition-all"
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
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-24 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Need to Reach a <span className="gradient-text">Department</span>?
          </h2>
          <p className="text-gray-400 mb-8 max-w-xl mx-auto">
            Click on any department to see the full team, responsibilities, and
            contact information.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold hover:from-green-600 hover:to-emerald-700 transition-all duration-300 shadow-lg shadow-green-500/20"
          >
            General Inquiries
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </Link>
        </div>
      </section>
    </div>
  );
}
