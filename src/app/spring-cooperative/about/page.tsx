import type { Metadata } from "next";

export const metadata: Metadata = { title: "About" };

export default function CooperativeAbout() {
  return (
    <div className="pt-24">
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-16">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">About <span className="text-yellow-500">SPRING Co-operative</span></h1>
            <p className="text-gray-400 text-lg">A member-owned financial cooperative under SPRING.CO.LTD, built on trust, transparency, and collective prosperity.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
            <div className="glass rounded-2xl p-8">
              <h2 className="text-2xl font-bold text-white mb-4">Our Story</h2>
              <div className="space-y-4 text-gray-400 leading-relaxed">
                <p>SPRING Co-operative Union was founded with a simple but powerful idea: when people come together to save, invest, and support one another, everyone wins.</p>
                <p>As a subsidiary of SPRING.CO.LTD, we benefit from corporate backing while remaining true to cooperative principles — democratic governance, equal participation, and shared returns.</p>
                <p>Today, we serve over 2,000 members across Greater Accra, providing savings accounts, affordable loans, insurance products, and financial education programs.</p>
              </div>
            </div>
            <div className="space-y-6">
              <div className="glass rounded-2xl p-8">
                <h3 className="text-xl font-bold text-white mb-3">🎯 Mission</h3>
                <p className="text-gray-400">To empower individuals and communities with accessible financial services, fostering economic independence and shared prosperity.</p>
              </div>
              <div className="glass rounded-2xl p-8">
                <h3 className="text-xl font-bold text-white mb-3">🔭 Vision</h3>
                <p className="text-gray-400">To be Ghana&apos;s leading cooperative union, transforming lives through financial inclusion and community development.</p>
              </div>
            </div>
          </div>

          <div className="glass rounded-2xl p-8 mb-20">
            <h2 className="text-2xl font-bold text-white mb-6">Cooperative Principles</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { icon: "🗳️", title: "Democratic Control", desc: "One member, one vote. Every voice matters equally." },
                { icon: "🔓", title: "Open Membership", desc: "Open to all who meet the criteria, without discrimination." },
                { icon: "📈", title: "Economic Participation", desc: "Members contribute and benefit equitably." },
                { icon: "📖", title: "Education & Training", desc: "Continuous learning for members and the community." },
                { icon: "🤝", title: "Cooperation", desc: "Working with other cooperatives for greater impact." },
                { icon: "🌍", title: "Community Focus", desc: "Sustainable development that benefits our communities." },
              ].map((p) => (
                <div key={p.title} className="flex gap-4">
                  <span className="text-2xl">{p.icon}</span>
                  <div>
                    <h3 className="font-semibold text-white">{p.title}</h3>
                    <p className="text-gray-400 text-sm">{p.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { value: "2,000+", label: "Members" },
              { value: "GH₵5M+", label: "Total Assets" },
              { value: "2023", label: "Founded" },
              { value: "12+", label: "Community Programs" },
            ].map((stat) => (
              <div key={stat.label} className="glass rounded-2xl p-6 text-center">
                <div className="text-3xl md:text-4xl font-black text-yellow-500">{stat.value}</div>
                <div className="text-gray-400 text-sm mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
