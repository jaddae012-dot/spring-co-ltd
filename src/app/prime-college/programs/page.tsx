import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Programs" };

const programs = [
  {
    category: "Business & Management",
    icon: "📊",
    courses: [
      { name: "Business Administration", duration: "2 Years", mode: "Full-Time / Part-Time" },
      { name: "Accounting & Finance", duration: "2 Years", mode: "Full-Time" },
      { name: "Marketing & Sales", duration: "1 Year", mode: "Full-Time / Online" },
      { name: "Project Management", duration: "6 Months", mode: "Part-Time / Online" },
    ],
  },
  {
    category: "Information Technology",
    icon: "💻",
    courses: [
      { name: "Software Development", duration: "2 Years", mode: "Full-Time" },
      { name: "Web Design & Development", duration: "1 Year", mode: "Full-Time / Part-Time" },
      { name: "Cybersecurity", duration: "1 Year", mode: "Full-Time" },
      { name: "Data Science & Analytics", duration: "1 Year", mode: "Full-Time / Online" },
    ],
  },
  {
    category: "Creative Arts & Media",
    icon: "🎨",
    courses: [
      { name: "Graphic Design", duration: "1 Year", mode: "Full-Time / Part-Time" },
      { name: "Photography & Videography", duration: "6 Months", mode: "Part-Time" },
      { name: "Digital Marketing", duration: "6 Months", mode: "Online" },
      { name: "Fashion Design", duration: "2 Years", mode: "Full-Time" },
    ],
  },
  {
    category: "Vocational Training",
    icon: "🔧",
    courses: [
      { name: "Electrical Engineering", duration: "2 Years", mode: "Full-Time" },
      { name: "Plumbing & Pipefitting", duration: "1 Year", mode: "Full-Time" },
      { name: "Carpentry & Joinery", duration: "1 Year", mode: "Full-Time" },
      { name: "Automotive Technology", duration: "2 Years", mode: "Full-Time" },
    ],
  },
];

export default function ProgramsPage() {
  return (
    <div className="pt-24">
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-16">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">Our <span className="text-blue-500">Programs</span></h1>
            <p className="text-gray-400 text-lg">Industry-ready courses designed to equip you with real-world skills and knowledge.</p>
          </div>

          <div className="space-y-12">
            {programs.map((cat) => (
              <div key={cat.category}>
                <div className="flex items-center gap-3 mb-6">
                  <span className="text-3xl">{cat.icon}</span>
                  <h2 className="text-2xl font-bold text-white">{cat.category}</h2>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {cat.courses.map((c) => (
                    <div key={c.name} className="glass rounded-2xl p-6 hover:bg-white/10 transition-colors duration-200">
                      <h3 className="text-white font-semibold mb-3">{c.name}</h3>
                      <div className="flex flex-wrap gap-2 text-xs">
                        <span className="px-2 py-1 rounded-full bg-blue-500/20 text-blue-300">{c.duration}</span>
                        <span className="px-2 py-1 rounded-full bg-indigo-500/20 text-indigo-300">{c.mode}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-16">
            <Link href="/prime-college/admissions" className="inline-flex px-10 py-4 rounded-2xl bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold text-lg transition-colors duration-200 shadow-lg">Apply Now</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
