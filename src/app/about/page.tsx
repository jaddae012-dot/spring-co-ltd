import { companyInfo } from "@/data/company";
import { subsidiaries } from "@/data/subsidiaries";
import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us — SPRING.CO.LTD",
  description: companyInfo.mission,
};

export default function AboutPage() {
  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="py-24 relative bg-grid">
        <div className="absolute inset-0">
          <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              About <span className="gradient-text">SPRING.CO.LTD</span>
            </h1>
            <p className="text-xl text-gray-400 leading-relaxed">
              {companyInfo.description}
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-24 bg-[#060e1a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="glass rounded-2xl p-10">
              <div className="text-4xl mb-4">🎯</div>
              <h2 className="text-2xl font-bold text-white mb-4">
                Our Mission
              </h2>
              <p className="text-gray-400 leading-relaxed">
                {companyInfo.mission}
              </p>
            </div>
            <div className="glass rounded-2xl p-10">
              <div className="text-4xl mb-4">🔭</div>
              <h2 className="text-2xl font-bold text-white mb-4">
                Our Vision
              </h2>
              <p className="text-gray-400 leading-relaxed">
                {companyInfo.vision}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Our <span className="gradient-text">Story</span>
            </h2>
            <div className="space-y-6 text-gray-400 leading-relaxed text-lg">
              <p>
                Founded in {companyInfo.founded} in {companyInfo.headquarters},
                SPRING.CO.LTD was born from a vision to build and nurture
                world-class enterprises that drive meaningful change across
                Africa.
              </p>
              <p>
                What started as a bold idea has grown into a dynamic
                multinational conglomerate with six thriving subsidiaries
                spanning agriculture, creative services, logistics, education,
                professional services, and community finance.
              </p>
              <p>
                Today, we continue to expand our reach, investing in innovative
                businesses and talented teams that share our passion for
                excellence and our commitment to building a better future.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 bg-[#060e1a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              Our Core <span className="gradient-text">Values</span>
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              The foundation on which we build every company and every
              partnership
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {companyInfo.values.map((value, i) => (
              <div
                key={i}
                className="glass rounded-2xl p-8 hover:bg-white/10 transition-all duration-300 group"
              >
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">
                  {value.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-2">
                  {value.title}
                </h3>
                <p className="text-gray-400 leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio at a Glance */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              Our <span className="gradient-text">Portfolio</span>
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              {subsidiaries.length} companies. Multiple industries. One vision.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {subsidiaries.map((sub) => (
              <Link
                key={sub.id}
                href={`/subsidiaries/${sub.id}`}
                className="glass rounded-2xl p-6 text-center hover:bg-white/10 transition-all duration-300 group"
              >
                <div className="text-4xl mb-3">{sub.logo ? <Image src={sub.logo} alt={sub.name} width={48} height={48} className="w-12 h-12 object-contain mx-auto" /> : sub.icon}</div>
                <h3 className="text-sm font-bold text-white group-hover:text-green-400 transition-colors">
                  {sub.name}
                </h3>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
