import { subsidiaries } from "@/data/subsidiaries";
import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Our Subsidiaries — SPRING.CO.LTD",
  description:
    "Explore the six dynamic companies under SPRING.CO.LTD driving innovation across agriculture, creative services, logistics, education, cleaning, and community finance.",
};

export default function SubsidiariesPage() {
  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="py-24 relative bg-grid">
        <div className="absolute inset-0">
          <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-green-500/10 rounded-full blur-3xl" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Our <span className="gradient-text">Subsidiaries</span>
            </h1>
            <p className="text-xl text-gray-400 leading-relaxed">
              Six innovative companies, each a leader in its industry, united
              under the SPRING.CO.LTD umbrella.
            </p>
          </div>
        </div>
      </section>

      {/* All Subsidiaries */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-8">
            {subsidiaries.map((sub, index) => (
              <Link
                key={sub.id}
                href={sub.route}
                className="group block glass rounded-2xl p-8 md:p-10 hover:bg-white/10 transition-all duration-300 hover:-translate-y-1"
              >
                <div className="flex flex-col md:flex-row md:items-center gap-6">
                  <div className="flex-shrink-0">
                    <div
                      className={`w-20 h-20 rounded-2xl ${sub.logo ? 'bg-white' : `bg-gradient-to-br ${sub.gradient}`} flex items-center justify-center text-4xl shadow-lg overflow-hidden`}
                    >
                      {sub.logo ? <Image src={sub.logo} alt={sub.name} width={80} height={80} className="w-full h-full object-contain p-1" /> : sub.icon}
                    </div>
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-xs font-mono text-gray-500">
                        0{index + 1}
                      </span>
                      <h2 className="text-2xl font-bold text-white group-hover:text-green-400 transition-colors">
                        {sub.name}
                      </h2>
                    </div>
                    <p className="text-gray-400 leading-relaxed mb-4">
                      {sub.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {sub.services.slice(0, 3).map((service, i) => (
                        <span
                          key={i}
                          className="px-3 py-1 rounded-full text-xs font-medium bg-white/5 text-gray-300 border border-white/10"
                        >
                          {service}
                        </span>
                      ))}
                      {sub.services.length > 3 && (
                        <span className="px-3 py-1 rounded-full text-xs font-medium bg-white/5 text-gray-400 border border-white/10">
                          +{sub.services.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-full glass flex items-center justify-center group-hover:bg-green-500/20 transition-all">
                      <svg
                        className="w-5 h-5 text-gray-400 group-hover:text-green-400 group-hover:translate-x-0.5 transition-all"
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
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
