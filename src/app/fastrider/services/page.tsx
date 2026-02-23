import type { Metadata } from "next";

export const metadata: Metadata = { title: "Services" };

export default function FastRiderServices() {
  const services = [
    {
      icon: "📦",
      title: "Last-Mile Delivery",
      desc: "We handle the final and most critical leg of your delivery, ensuring packages reach customers' doorsteps quickly and safely.",
      features: ["Door-to-door delivery", "Signature on delivery", "Photo proof of delivery"],
    },
    {
      icon: "⚡",
      title: "Express Delivery",
      desc: "Need it there fast? Our express service guarantees same-day delivery within the city for time-sensitive packages.",
      features: ["Same-day delivery", "Priority handling", "Dedicated rider assigned"],
    },
    {
      icon: "🏢",
      title: "Business Logistics",
      desc: "Custom logistics solutions for businesses of all sizes. Daily pickups, bulk deliveries, and dedicated fleet services.",
      features: ["Scheduled pickups", "Bulk delivery discounts", "Monthly invoicing"],
    },
    {
      icon: "🛵",
      title: "Courier Services",
      desc: "Documents, parcels, and small packages delivered with speed and care across the city and beyond.",
      features: ["Document delivery", "Fragile item handling", "Intercity delivery"],
    },
    {
      icon: "🚚",
      title: "Fleet Management",
      desc: "End-to-end fleet management solutions for companies looking to optimize their delivery operations.",
      features: ["GPS tracking", "Route optimization", "Driver management"],
    },
    {
      icon: "📊",
      title: "Logistics Consulting",
      desc: "Expert guidance to streamline your supply chain and reduce delivery costs with data-driven strategies.",
      features: ["Supply chain analysis", "Cost optimization", "Process improvement"],
    },
  ];

  return (
    <div className="pt-24">
      {/* Hero */}
      <section className="py-24 relative">
        <div className="absolute inset-0" aria-hidden="true">
          <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-red-700/8 rounded-full blur-2xl" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Our <span className="text-red-700">Services</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl leading-relaxed">
            Comprehensive logistics and delivery solutions tailored to your needs.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, i) => (
              <div key={i} className="glass rounded-2xl p-8 hover:bg-white/10 transition-colors duration-200">
                <div className="text-4xl mb-4">{service.icon}</div>
                <h3 className="text-xl font-bold text-white mb-3">{service.title}</h3>
                <p className="text-gray-400 text-sm mb-4 leading-relaxed">{service.desc}</p>
                <ul className="space-y-2">
                  {service.features.map((f, j) => (
                    <li key={j} className="flex items-center gap-2 text-sm text-gray-300">
                      <div className="w-1.5 h-1.5 rounded-full bg-red-700 flex-shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
