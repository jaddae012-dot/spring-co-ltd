import type { Metadata } from "next";
export const metadata: Metadata = { title: "Solutions" };

export default function AgritechServices() {
  const solutions = [
    { icon: "🌱", title: "Smart Farming Solutions", desc: "Complete IoT-powered farming systems with automated irrigation, soil monitoring, and climate control for greenhouses and open fields.", features: ["IoT sensor networks", "Automated irrigation", "Climate monitoring", "Yield prediction"] },
    { icon: "📡", title: "Precision Agriculture", desc: "Advanced satellite and drone-based field mapping for targeted interventions and resource optimization.", features: ["Drone field mapping", "Satellite imagery analysis", "Variable rate application", "GPS-guided operations"] },
    { icon: "💼", title: "Agricultural Consultancy", desc: "Expert agronomists provide tailored guidance on crop management, soil health, and modern farming techniques.", features: ["Crop planning", "Soil analysis", "Pest management", "Harvest optimization"] },
    { icon: "📊", title: "Farm Management Systems", desc: "Cloud-based platforms to manage every aspect of your farming operations from planting to sales.", features: ["Inventory tracking", "Financial management", "Worker management", "Compliance reporting"] },
    { icon: "🔬", title: "Crop Monitoring Technology", desc: "AI-powered monitoring systems that detect diseases, pests, and nutrient deficiencies early to prevent crop loss.", features: ["Disease detection", "Pest alerts", "Nutrient analysis", "Growth tracking"] },
    { icon: "🔗", title: "Supply Chain Optimization", desc: "Connect directly to buyers, optimize logistics, and reduce post-harvest losses with our supply chain platform.", features: ["Market access", "Logistics optimization", "Cold chain management", "Price forecasting"] },
  ];

  return (
    <div className="pt-24">
      <section className="py-24 relative">
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">Our <span className="text-green-500">Solutions</span></h1>
          <p className="text-xl text-gray-400 max-w-2xl">Comprehensive agricultural technology solutions for every stage of farming.</p>
        </div>
      </section>
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          {solutions.map((s, i) => (
            <div key={i} className="glass rounded-2xl p-8 md:p-10 hover:bg-white/10 transition-colors duration-200">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="text-5xl flex-shrink-0">{s.icon}</div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-white mb-3">{s.title}</h3>
                  <p className="text-gray-400 mb-4 leading-relaxed">{s.desc}</p>
                  <div className="flex flex-wrap gap-2">
                    {s.features.map((f, j) => (
                      <span key={j} className="px-3 py-1 rounded-full text-xs font-medium bg-green-500/10 text-green-400 border border-green-500/20">{f}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
