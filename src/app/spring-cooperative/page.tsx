import Link from "next/link";

export default function SpringCooperativeHome() {
  return (
    <div className="pt-24">
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0" aria-hidden="true" style={{ contain: "paint" }}>
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-yellow-500/10 rounded-full blur-2xl" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-2xl" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="inline-flex items-center px-4 py-2 rounded-full glass text-sm text-gray-300 mb-6">
              <span className="w-2 h-2 rounded-full bg-yellow-400 mr-2 animate-pulse" />A SPRING.CO.LTD Company
            </div>
            <h1 className="text-5xl md:text-7xl font-black tracking-tight mb-6">
              <span className="text-yellow-500">SPRING</span><span className="text-white"> CO-OPERATIVE UNION</span>
            </h1>
            <p className="text-xl text-gray-400 mb-4 leading-relaxed">Empowering communities through <span className="text-yellow-400 font-semibold">savings, credit, and mutual support</span>.</p>
            <p className="text-gray-500 mb-8">Join thousands of members building financial security and community wealth together.</p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/spring-cooperative/membership" className="px-8 py-4 rounded-2xl bg-gradient-to-r from-yellow-500 to-amber-600 text-white font-semibold text-lg transition-colors duration-200 shadow-lg shadow-yellow-500/25 text-center">Become a Member</Link>
              <Link href="/spring-cooperative/services" className="px-8 py-4 rounded-2xl glass text-white font-semibold text-lg hover:bg-white/10 transition-colors duration-200 text-center">Our Services</Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-[#060e1a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-5xl font-bold text-center mb-16">Why Join the <span className="text-yellow-500">Co-operative</span>?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: "💰", title: "Savings & Growth", desc: "Earn competitive returns on your savings with full transparency." },
              { icon: "🏦", title: "Affordable Credit", desc: "Access low-interest loans for business, education, or personal needs." },
              { icon: "🤝", title: "Community Power", desc: "Pool resources with fellow members for greater collective impact." },
              { icon: "📊", title: "Financial Education", desc: "Free workshops on budgeting, investing, and financial planning." },
              { icon: "🛡️", title: "Member Protection", desc: "Insurance and welfare benefits for members and their families." },
              { icon: "🌱", title: "Shared Prosperity", desc: "Dividends distributed to members based on participation." },
            ].map((item, i) => (
              <div key={i} className="glass rounded-2xl p-8 hover:bg-white/10 transition-colors duration-200">
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
                <p className="text-gray-400 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { value: "2,000+", label: "Members" },
              { value: "GH₵5M+", label: "Total Savings" },
              { value: "GH₵3M+", label: "Loans Disbursed" },
              { value: "95%", label: "Repayment Rate" },
            ].map((stat) => (
              <div key={stat.label} className="glass rounded-2xl p-6 text-center">
                <div className="text-3xl md:text-4xl font-black text-yellow-500">{stat.value}</div>
                <div className="text-gray-400 text-sm mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-[#060e1a]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">Start Building Your <span className="text-yellow-500">Future</span></h2>
          <p className="text-gray-400 text-lg mb-10">Membership is open to everyone. Join today and take control of your financial future.</p>
          <Link href="/spring-cooperative/membership" className="inline-flex px-10 py-4 rounded-2xl bg-gradient-to-r from-yellow-500 to-amber-600 text-white font-semibold text-lg transition-colors duration-200 shadow-lg">Join Now</Link>
        </div>
      </section>
    </div>
  );
}
