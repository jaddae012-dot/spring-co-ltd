import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Services" };

const services = [
  {
    icon: "🏠",
    title: "Home Cleaning",
    desc: "Thorough cleaning of your entire home — living rooms, bedrooms, kitchens, and bathrooms.",
    features: ["Dusting & Wiping", "Vacuuming & Mopping", "Kitchen Deep Clean", "Bathroom Sanitization"],
    price: "From GH₵80",
  },
  {
    icon: "🏢",
    title: "Office Cleaning",
    desc: "Professional cleaning for offices, co-working spaces, and commercial buildings.",
    features: ["Desk & Surface Cleaning", "Floor Care", "Restroom Cleaning", "Trash Removal"],
    price: "From GH₵150",
  },
  {
    icon: "🧽",
    title: "Deep Cleaning",
    desc: "Intensive cleaning that reaches every corner — ideal for move-in/move-out or seasonal refresh.",
    features: ["Behind Appliances", "Window Tracks", "Light Fixtures", "Cabinet Interiors"],
    price: "From GH₵200",
  },
  {
    icon: "🪟",
    title: "Window Cleaning",
    desc: "Crystal-clear windows inside and out, for homes and commercial properties.",
    features: ["Interior & Exterior Glass", "Frame & Sill Cleaning", "Screen Washing", "High-Rise Available"],
    price: "From GH₵60",
  },
  {
    icon: "🛋️",
    title: "Upholstery Cleaning",
    desc: "Professional cleaning for sofas, chairs, mattresses, and carpets.",
    features: ["Stain Removal", "Odor Elimination", "Fabric Protection", "Quick Drying"],
    price: "From GH₵100",
  },
  {
    icon: "🏗️",
    title: "Post-Construction",
    desc: "Clean up after renovation or construction work — removing dust, debris, and residue.",
    features: ["Debris Removal", "Dust & Paint Cleanup", "Floor Polishing", "Final Detailing"],
    price: "From GH₵300",
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
