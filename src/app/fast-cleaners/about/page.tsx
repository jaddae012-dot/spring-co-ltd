import type { Metadata } from "next";

export const metadata: Metadata = { title: "About" };

export default function FastCleanersAbout() {
  return (
    <div className="pt-24">
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-16">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">About <span className="text-cyan-500">Fast Cleaners</span></h1>
            <p className="text-gray-400 text-lg">A SPRING.CO.LTD company bringing professional cleaning excellence to Ghana.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
            <div className="glass rounded-2xl p-8">
              <h2 className="text-2xl font-bold text-white mb-4">Our Story</h2>
              <div className="space-y-4 text-gray-400 leading-relaxed">
                <p>Fast Cleaners was founded to raise the standard of professional cleaning services in Ghana. As a subsidiary of SPRING.CO.LTD, we combine corporate excellence with hands-on service delivery.</p>
                <p>We believe that a clean environment is essential for productivity, health, and well-being. That&apos;s why we invest in training our staff, using quality products, and maintaining the highest service standards.</p>
                <p>From individual homes to large commercial complexes, Fast Cleaners delivers consistent, reliable, and affordable cleaning solutions.</p>
              </div>
            </div>
            <div className="space-y-6">
              <div className="glass rounded-2xl p-8">
                <h3 className="text-xl font-bold text-white mb-3">🎯 Mission</h3>
                <p className="text-gray-400">To provide top-quality, affordable cleaning services that create healthier, happier living and working environments for our clients.</p>
              </div>
              <div className="glass rounded-2xl p-8">
                <h3 className="text-xl font-bold text-white mb-3">🔭 Vision</h3>
                <p className="text-gray-400">To be the most trusted and preferred cleaning service provider across Ghana and West Africa.</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { value: "1,000+", label: "Cleanings Done" },
              { value: "300+", label: "Happy Clients" },
              { value: "50+", label: "Trained Staff" },
              { value: "4.9★", label: "Client Rating" },
            ].map((stat) => (
              <div key={stat.label} className="glass rounded-2xl p-6 text-center">
                <div className="text-3xl md:text-4xl font-black text-cyan-500">{stat.value}</div>
                <div className="text-gray-400 text-sm mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
