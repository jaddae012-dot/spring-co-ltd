import Link from "next/link";

export default function CooperativePortalOverview() {
  return (
    <div className="pt-24">
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0" aria-hidden="true" style={{ contain: "paint" }}>
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-yellow-500/10 rounded-full blur-2xl" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-2xl" />
        </div>
        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="inline-flex items-center px-4 py-2 rounded-full glass text-sm text-gray-300 mb-6">
              <span className="w-2 h-2 rounded-full bg-yellow-400 mr-2 animate-pulse" />Member Portal
            </div>
            <h1 className="text-5xl md:text-7xl font-black tracking-tight mb-6">
              Access your <span className="text-yellow-500">SPRING CO-OPERATIVE</span> member dashboard
            </h1>
            <p className="text-xl text-gray-400 mb-4 leading-relaxed">
              The member portal gives you secure visibility into savings, balances, application status, and cooperative benefits — all in one place.
            </p>
            <p className="text-gray-500 mb-8">
              Log in with your application reference and registered phone or ID number to view your account, track progress, and stay connected with SPRING CO-OPERATIVE UNION.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/spring-cooperative/login" className="px-8 py-4 rounded-2xl bg-gradient-to-r from-yellow-500 to-amber-600 text-white font-semibold text-lg transition-colors duration-200 shadow-lg shadow-yellow-500/25 text-center">Access Portal</Link>
              <Link href="/spring-cooperative/membership" className="px-8 py-4 rounded-2xl glass text-white font-semibold text-lg hover:bg-white/10 transition-colors duration-200 text-center">Apply for Membership</Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-[#060e1a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-5xl font-bold text-center mb-16">Portal Features</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: "📊", title: "Account Balance", desc: "View your current savings balance and transaction summary at a glance." },
              { icon: "📝", title: "Application Status", desc: "Track your membership application or approval progress in real time." },
              { icon: "💳", title: "Savings Commitments", desc: "Review your scheduled contributions and upcoming payment expectations." },
              { icon: "🤝", title: "Member Benefits", desc: "See your cooperative benefits, dividend eligibility, and welfare support." },
              { icon: "📩", title: "Secure Messaging", desc: "Contact cooperative support directly from the portal for faster service." },
              { icon: "🔒", title: "Secure Access", desc: "Protected login ensures only verified members can access account information." },
            ].map((item) => (
              <div key={item.title} className="glass rounded-2xl p-8 hover:bg-white/10 transition-colors duration-200">
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
                <p className="text-gray-400 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl border border-slate-800 bg-slate-900/80 p-10 shadow-2xl shadow-black/20">
            <div className="grid gap-8 lg:grid-cols-2">
              <div>
                <h2 className="text-3xl font-bold text-white mb-4">Why the portal matters</h2>
                <p className="text-gray-400 leading-relaxed mb-4">
                  The member portal transforms your cooperative experience from a paper-based process into a modern digital service. Members can monitor funds, stay informed, and make better financial decisions with transparent access to their records.
                </p>
                <ul className="space-y-3 text-gray-300">
                  <li>• Instant access to balance and savings details</li>
                  <li>• Visibility into loan and credit facility status</li>
                  <li>• Clear view of when your next contribution is due</li>
                  <li>• A secure hub for cooperative communication</li>
                </ul>
              </div>
              <div className="rounded-3xl bg-yellow-500/10 p-8 border border-yellow-500/20">
                <h3 className="text-2xl font-semibold text-white mb-4">Get started</h3>
                <p className="text-gray-300 mb-6">Once your membership is approved, use the login portal to manage your account and access member-only services.</p>
                <div className="flex flex-col gap-3">
                  <Link href="/spring-cooperative/login" className="rounded-2xl bg-yellow-500 px-6 py-4 text-center font-semibold text-slate-950 transition hover:bg-yellow-400">Go to Member Login</Link>
                  <Link href="/spring-cooperative/membership" className="rounded-2xl border border-yellow-500/30 px-6 py-4 text-center font-semibold text-white transition hover:border-yellow-400">Apply for Membership</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
