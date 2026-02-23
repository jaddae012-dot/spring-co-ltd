import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Services" };

const services = [
  {
    icon: "💰",
    title: "Savings Accounts",
    desc: "Secure savings products with competitive interest rates and flexible terms.",
    features: ["Regular Savings", "Fixed Deposits", "Target Savings", "Group Savings"],
  },
  {
    icon: "🏦",
    title: "Loans & Credit",
    desc: "Affordable loans with low interest for personal, business, and emergency needs.",
    features: ["Personal Loans", "Business Loans", "Emergency Loans", "Education Loans"],
  },
  {
    icon: "📊",
    title: "Financial Education",
    desc: "Free workshops and resources to improve members' financial literacy.",
    features: ["Budgeting Skills", "Investment Basics", "Business Planning", "Debt Management"],
  },
  {
    icon: "🛡️",
    title: "Insurance & Welfare",
    desc: "Protection plans and welfare schemes for members and their families.",
    features: ["Life Cover", "Health Support", "Funeral Assistance", "Disability Benefits"],
  },
  {
    icon: "🤝",
    title: "Group Investments",
    desc: "Pool resources for larger investment opportunities and shared returns.",
    features: ["Real Estate", "Agriculture", "Business Ventures", "Government Bonds"],
  },
  {
    icon: "📱",
    title: "Mobile Banking",
    desc: "Manage your account, make deposits, and apply for loans from your phone.",
    features: ["Account Access", "Mobile Deposits", "Loan Applications", "Transaction History"],
  },
];

export default function CooperativeServices() {
  return (
    <div className="pt-24">
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-16">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">Our <span className="text-yellow-500">Services</span></h1>
            <p className="text-gray-400 text-lg">Financial products and community services designed to empower our members.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((s) => (
              <div key={s.title} className="glass rounded-2xl p-8 hover:bg-white/10 transition-colors duration-200">
                <div className="text-4xl mb-4">{s.icon}</div>
                <h3 className="text-xl font-bold text-white mb-2">{s.title}</h3>
                <p className="text-gray-400 text-sm mb-4">{s.desc}</p>
                <div className="flex flex-wrap gap-2">
                  {s.features.map((f) => (
                    <span key={f} className="px-2 py-1 rounded-full bg-yellow-500/20 text-yellow-300 text-xs">{f}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-16">
            <Link href="/spring-cooperative/membership" className="inline-flex px-10 py-4 rounded-2xl bg-gradient-to-r from-yellow-500 to-amber-600 text-white font-semibold text-lg transition-colors duration-200 shadow-lg">Become a Member</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
