import Link from "next/link";

export default function FastCleanersHome() {
  return (
    <div className="pt-24">
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0" aria-hidden="true" style={{ contain: "paint" }}>
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-2xl" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-teal-500/10 rounded-full blur-2xl" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="inline-flex items-center px-4 py-2 rounded-full glass text-sm text-gray-300 mb-6">
              <span className="w-2 h-2 rounded-full bg-cyan-400 mr-2 animate-pulse" />A SPRING.CO.LTD Company
            </div>
            <h1 className="text-5xl md:text-7xl font-black tracking-tight mb-6">
              <span className="text-cyan-500">FAST</span><span className="text-white"> CLEANERS</span>
            </h1>
            <p className="text-xl text-gray-400 mb-4 leading-relaxed">Professional cleaning services for <span className="text-cyan-400 font-semibold">homes, offices, and commercial spaces</span> across Ghana.</p>
            <p className="text-gray-500 mb-8">Spotless results, reliable service, affordable prices. Your clean space is just a booking away.</p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/fast-cleaners/book" className="px-8 py-4 rounded-2xl bg-gradient-to-r from-cyan-500 to-teal-600 text-white font-semibold text-lg transition-colors duration-200 shadow-lg shadow-cyan-500/25 text-center">Book a Cleaning</Link>
              <Link href="/fast-cleaners/services" className="px-8 py-4 rounded-2xl glass text-white font-semibold text-lg hover:bg-white/10 transition-colors duration-200 text-center">Our Services</Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-[#060e1a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-5xl font-bold text-center mb-16">Why Choose <span className="text-cyan-500">Fast Cleaners</span>?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: "✨", title: "Spotless Results", desc: "We don't cut corners. Every surface cleaned to perfection." },
              { icon: "⏰", title: "On-Time Service", desc: "Punctual, professional teams that respect your schedule." },
              { icon: "🛡️", title: "Trusted Staff", desc: "Background-checked, trained, and insured cleaning professionals." },
              { icon: "💰", title: "Fair Pricing", desc: "Transparent pricing with no hidden fees. Get a quote instantly." },
              { icon: "🧴", title: "Quality Products", desc: "Eco-friendly, effective cleaning products safe for your family." },
              { icon: "📱", title: "Easy Booking", desc: "Book online or by phone. Flexible scheduling to suit you." },
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
          <h2 className="text-3xl md:text-5xl font-bold text-center mb-16">How It <span className="text-cyan-500">Works</span></h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { step: "1", title: "Book Online", desc: "Choose your service and pick a convenient date and time." },
              { step: "2", title: "We Clean", desc: "Our trained team arrives on time with all equipment and supplies." },
              { step: "3", title: "Enjoy", desc: "Relax in your spotless space. Satisfaction guaranteed!" },
            ].map((s) => (
              <div key={s.step} className="text-center">
                <div className="w-16 h-16 rounded-full bg-gradient-to-r from-cyan-500 to-teal-600 flex items-center justify-center text-white text-2xl font-black mx-auto mb-4">{s.step}</div>
                <h3 className="text-xl font-bold text-white mb-2">{s.title}</h3>
                <p className="text-gray-400">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-[#060e1a]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">Ready for a <span className="text-cyan-500">Clean Space</span>?</h2>
          <p className="text-gray-400 text-lg mb-10">Book your cleaning today and experience the Fast Cleaners difference.</p>
          <Link href="/fast-cleaners/book" className="inline-flex px-10 py-4 rounded-2xl bg-gradient-to-r from-cyan-500 to-teal-600 text-white font-semibold text-lg transition-colors duration-200 shadow-lg">Book Now</Link>
        </div>
      </section>
    </div>
  );
}
