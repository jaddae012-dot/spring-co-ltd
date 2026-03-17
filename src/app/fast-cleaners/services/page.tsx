import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Services" };

const services = [
  {
    icon: "🏠",
    title: "Home Cleaning",
    desc: "Flexible home cleaning options to fit your needs, from a single room to a full house.",
    features: ["Single Room: GHS 120", "Chamber & Hall: GHS 250", "2 Bedroom Apartment: GHS 400", "3 Bedroom Apartment: GHS 600", "4 Bedroom House: From GHS 800"],
    price: "From GHS 120",
  },
  {
    icon: "🏢",
    title: "Office Cleaning",
    desc: "Professional cleaning for small to medium offices. Inspection required for large spaces.",
    features: ["Small Office (1-3 rooms): From GHS 500", "Medium Office: From GHS 1,000", "Large Commercial Space: Inspection Required"],
    price: "From GHS 500",
  },
  {
    icon: "🧽",
    title: "Deep / Intensive Cleaning",
    desc: "Intensive cleaning that reaches every corner, with pricing based on the number of bedrooms.",
    features: ["1-2 Bedroom: GHS 750", "3 Bedroom+: GHS 1,100", "4 Bedroom+: From GHS 1,500"],
    price: "From GHS 750",
  },
  {
    icon: "✨",
    title: "Add-On Services",
    desc: "Specialized cleaning services to complement our main packages.",
    features: ["Carpet Cleaning: GHS 15 per sqm", "Sofa Set Cleaning: GHS 250 - 450", "Door Cleaning: GHS 60", "Fumigation: From GHS 400"],
    price: "From GHS 15",
  },
];

export default function FastCleanersServices() {
  return (
    <div className="pt-24">
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-16">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">Our <span className="text-cyan-500">Services</span></h1>
            <p className="text-gray-400 text-lg">From routine home cleaning to specialized commercial services, we have you covered.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((s) => (
              <div key={s.title} className="glass rounded-2xl p-8 hover:bg-white/10 transition-colors duration-200 flex flex-col">
                <div className="text-4xl mb-4">{s.icon}</div>
                <h3 className="text-xl font-bold text-white mb-2">{s.title}</h3>
                <p className="text-gray-400 text-sm mb-4 flex-grow">{s.desc}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {s.features.map((f) => (
                    <span key={f} className="px-2 py-1 rounded-full bg-cyan-500/20 text-cyan-300 text-xs">{f}</span>
                  ))}
                </div>
                <div className="text-cyan-400 font-bold">{s.price}</div>
              </div>
            ))}
          </div>

          <div className="text-center mt-16">
            <Link href="/fast-cleaners/book" className="inline-flex px-10 py-4 rounded-2xl bg-gradient-to-r from-cyan-500 to-teal-600 text-white font-semibold text-lg transition-colors duration-200 shadow-lg">Book a Cleaning</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
