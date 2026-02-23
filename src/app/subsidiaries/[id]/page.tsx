import { subsidiaries } from "@/data/subsidiaries";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateStaticParams() {
  return subsidiaries.map((sub) => ({ id: sub.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const subsidiary = subsidiaries.find((s) => s.id === id);
  if (!subsidiary) return {};
  return {
    title: `${subsidiary.name} — SPRING.CO.LTD`,
    description: subsidiary.description,
  };
}

export default async function SubsidiaryPage({ params }: Props) {
  const { id } = await params;
  const subsidiary = subsidiaries.find((s) => s.id === id);

  if (!subsidiary) {
    notFound();
  }

  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="py-24 relative bg-grid">
        <div className="absolute inset-0">
          <div
            className="absolute top-1/3 left-1/4 w-96 h-96 rounded-full blur-3xl"
            style={{ backgroundColor: `${subsidiary.color}15` }}
          />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/subsidiaries"
            className="inline-flex items-center text-sm text-gray-400 hover:text-green-400 transition-colors mb-8"
          >
            <svg
              className="w-4 h-4 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Back to Subsidiaries
          </Link>

          <div className="flex items-start gap-6 mb-8">
            <div
              className={`w-24 h-24 rounded-2xl ${subsidiary.logo ? 'bg-white' : `bg-gradient-to-br ${subsidiary.gradient}`} flex items-center justify-center text-5xl shadow-2xl flex-shrink-0 overflow-hidden`}
            >
              {subsidiary.logo ? <Image src={subsidiary.logo} alt={subsidiary.name} width={96} height={96} className="w-full h-full object-contain p-2" /> : subsidiary.icon}
            </div>
            <div>
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-3">
                {subsidiary.name}
              </h1>
              <p className="text-lg text-gray-400">
                A SPRING.CO.LTD subsidiary — Est. {subsidiary.established}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* About */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold mb-6">
                About{" "}
                <span className="gradient-text">{subsidiary.shortName}</span>
              </h2>
              <p className="text-gray-400 text-lg leading-relaxed">
                {subsidiary.longDescription}
              </p>
            </div>

            <div className="glass rounded-2xl p-8">
              <h3 className="text-xl font-bold text-white mb-6">
                Our Services
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {subsidiary.services.map((service, i) => (
                  <div
                    key={i}
                    className="flex items-center space-x-3 p-3 rounded-xl hover:bg-white/5 transition-colors"
                  >
                    <div
                      className="w-2 h-2 rounded-full flex-shrink-0"
                      style={{ backgroundColor: subsidiary.color }}
                    />
                    <span className="text-gray-300 text-sm">{service}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-[#060e1a]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Interested in{" "}
            <span className="gradient-text">{subsidiary.shortName}</span>?
          </h2>
          <p className="text-gray-400 text-lg mb-10">
            Get in touch to learn more about our services or explore partnership
            opportunities.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="px-8 py-4 rounded-2xl bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold hover:from-green-600 hover:to-emerald-700 transition-all duration-300 shadow-lg"
            >
              Contact Us
            </Link>
            <Link
              href="/subsidiaries"
              className="px-8 py-4 rounded-2xl glass text-white font-semibold hover:bg-white/10 transition-all duration-300"
            >
              View All Companies
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
