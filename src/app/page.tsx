import Link from "next/link";
import Image from "next/image";
import { subsidiaries } from "@/data/subsidiaries";
import { companyInfo } from "@/data/company";

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-grid">
        {/* Background decorations - using will-change for GPU acceleration */}
        <div className="absolute inset-0" aria-hidden="true" style={{ willChange: 'transform', contain: 'paint' }}>
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-green-500/10 rounded-full blur-2xl" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-2xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-purple-500/5 rounded-full blur-2xl" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-20">
          <div className="animate-fade-in-up">
            <div className="inline-flex items-center px-4 py-2 rounded-full glass text-sm text-gray-300 mb-8">
              <span className="w-2 h-2 rounded-full bg-green-400 mr-2 animate-pulse" />
              Multinational Conglomerate — Est. {companyInfo.founded}
            </div>

            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight mb-6">
              <span className="gradient-text">SPRING</span>
              <span className="text-white">.CO.LTD</span>
            </h1>

            <p className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto mb-4 font-light">
              {companyInfo.tagline}
            </p>

            <p className="text-base md:text-lg text-gray-500 max-w-2xl mx-auto mb-10">
              {companyInfo.description}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/subsidiaries"
                prefetch={true}
                className="px-8 py-4 rounded-2xl bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold text-lg hover:from-green-600 hover:to-emerald-700 transition-colors duration-200 shadow-2xl shadow-green-500/25"
              >
                Explore Our Companies
              </Link>
              <Link
                href="/about"
                prefetch={true}
                className="px-8 py-4 rounded-2xl glass text-white font-semibold text-lg hover:bg-white/10 transition-colors duration-200"
              >
                Learn More
              </Link>
            </div>
          </div>

          {/* Stats */}
          <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {[
              { value: "6", label: "Subsidiaries" },
              { value: "5+", label: "Industries" },
              { value: "2023", label: "Founded" },
              { value: "Ghana", label: "Headquarters" },
            ].map((stat, i) => (
              <div
                key={i}
                className="glass rounded-2xl p-6 hover:bg-white/10 transition-all duration-300"
              >
                <div className="text-3xl md:text-4xl font-bold gradient-text mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Subsidiaries Grid */}
      <section className="py-24 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              Our <span className="gradient-text">Companies</span>
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Six dynamic subsidiaries driving innovation across multiple
              industries
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {subsidiaries.map((sub) => (
              <Link
                key={sub.id}
                href={sub.route}
                className="group glass rounded-2xl p-8 hover:bg-white/10 transition-all duration-300 hover:-translate-y-1"
              >
                <div className="text-5xl mb-4">{sub.logo ? <Image src={sub.logo} alt={sub.name} width={64} height={64} className="w-16 h-16 object-contain" /> : sub.icon}</div>
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-green-400 transition-colors">
                  {sub.name}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  {sub.description}
                </p>
                <div className="mt-4 flex items-center text-green-400 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                  Learn more
                  <svg
                    className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform"
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
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Values/Why Us Section */}
      <section className="py-24 relative bg-[#060e1a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              Our <span className="gradient-text">Values</span>
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              The principles that guide everything we do
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {companyInfo.values.map((value, i) => (
              <div
                key={i}
                className="glass rounded-2xl p-8 hover:bg-white/10 transition-all duration-300"
              >
                <div className="text-4xl mb-4">{value.icon}</div>
                <h3 className="text-lg font-bold text-white mb-2">
                  {value.title}
                </h3>
                <p className="text-gray-400 text-sm">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-green-500/10 rounded-full blur-3xl" />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Ready to <span className="gradient-text">Partner</span> with Us?
          </h2>
          <p className="text-gray-400 text-lg mb-10 max-w-2xl mx-auto">
            Whether you&apos;re looking to collaborate, invest, or join our team,
            we&apos;d love to hear from you.
          </p>
          <Link
            href="/contact"
            className="inline-flex px-10 py-4 rounded-2xl bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold text-lg hover:from-green-600 hover:to-emerald-700 transition-all duration-300 shadow-2xl shadow-green-500/25 hover:shadow-green-500/40 hover:-translate-y-0.5"
          >
            Contact Us Today
          </Link>
        </div>
      </section>
    </>
  );
}
