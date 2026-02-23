import Link from "next/link";

export default function AgritechHome() {
  return (
    <div className="pt-24">
      {/* Hero */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0" aria-hidden="true" style={{ contain: "paint" }}>
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-green-500/10 rounded-full blur-2xl" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-2xl" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="inline-flex items-center px-4 py-2 rounded-full glass text-sm text-gray-300 mb-6">
              <span className="w-2 h-2 rounded-full bg-green-400 mr-2 animate-pulse" />
              A SPRING.CO.LTD Company
            </div>
            <h1 className="text-5xl md:text-7xl font-black tracking-tight mb-6">
              <span className="text-green-500">AGRI</span><span className="text-white">TECH</span>
            </h1>
            <p className="text-xl text-gray-400 mb-4 leading-relaxed">
              Transforming agriculture through technology. Smart farming solutions for a <span className="text-green-400 font-semibold">sustainable future</span>.
            </p>
            <p className="text-gray-500 mb-8">Empowering farmers with precision tools, data-driven insights, and modern agricultural practices.</p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/agritech/services" className="px-8 py-4 rounded-2xl bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold text-lg transition-colors duration-200 shadow-lg shadow-green-500/25 text-center">
                Our Solutions
              </Link>
              <Link href="/agritech/contact" className="px-8 py-4 rounded-2xl glass text-white font-semibold text-lg hover:bg-white/10 transition-colors duration-200 text-center">
                Talk to Us
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24 bg-[#060e1a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-5xl font-bold text-center mb-16">What We <span className="text-green-500">Offer</span></h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: "🌱", title: "Smart Farming", desc: "IoT sensors, automated irrigation, and data analytics to optimize crop yields." },
              { icon: "📡", title: "Precision Agriculture", desc: "Satellite imagery and drone mapping for precise field management." },
              { icon: "📊", title: "Farm Analytics", desc: "Real-time dashboards tracking soil health, weather patterns, and crop performance." },
              { icon: "🚜", title: "Farm Management", desc: "Complete farm management systems for planning, tracking, and reporting." },
              { icon: "🔬", title: "Crop Monitoring", desc: "AI-powered early detection of pests, diseases, and nutrient deficiencies." },
              { icon: "🔗", title: "Supply Chain", desc: "Connecting farmers directly to markets with optimized supply chain solutions." },
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

      {/* CTA */}
      <section className="py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">Grow <span className="text-green-500">Smarter</span></h2>
          <p className="text-gray-400 text-lg mb-10">Partner with AGRITECH to modernize your farming operations.</p>
          <Link href="/agritech/contact" className="inline-flex px-10 py-4 rounded-2xl bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold text-lg transition-colors duration-200 shadow-lg">
            Get Started
          </Link>
        </div>
      </section>
    </div>
  );
}
