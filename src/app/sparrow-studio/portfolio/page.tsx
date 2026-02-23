import Link from "next/link";
import type { Metadata } from "next";
export const metadata: Metadata = { title: "Portfolio" };

export default function SparrowStudioPortfolio() {
  const projects = [
    { title: "Brand Identity — TechStart Ghana", category: "Branding", desc: "Complete brand identity for a tech startup including logo, guidelines, and digital assets." },
    { title: "UI/UX — FoodConnect App", category: "UI/UX Design", desc: "Mobile app design for a food delivery platform with user research and prototyping." },
    { title: "Corporate Video — Annual Report", category: "Videography", desc: "Cinematic annual report video highlighting company achievements and culture." },
    { title: "Social Media Campaign — EcoGhana", category: "Digital Marketing", desc: "3-month social media campaign that grew engagement by 300%." },
    { title: "Product Photography — Artisan Collection", category: "Photography", desc: "High-end product photography for a local artisan jewelry brand." },
    { title: "Packaging Design — Fresh Farms", category: "Packaging", desc: "Organic food packaging design that increased shelf visibility by 40%." },
  ];

  return (
    <div className="pt-24">
      <section className="py-24"><div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"><h1 className="text-4xl md:text-6xl font-bold mb-6">Our <span className="text-purple-500">Portfolio</span></h1><p className="text-xl text-gray-400 max-w-2xl">A selection of our recent work across design, media, and marketing.</p></div></section>
      <section className="py-16"><div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((p, i) => (
            <div key={i} className="glass rounded-2xl overflow-hidden group hover:bg-white/10 transition-colors duration-200">
              <div className="h-48 bg-gradient-to-br from-purple-500/20 to-violet-500/20 flex items-center justify-center">
                <span className="text-6xl opacity-50 group-hover:opacity-80 transition-opacity">🎨</span>
              </div>
              <div className="p-6">
                <span className="text-xs font-medium text-purple-400 mb-2 block">{p.category}</span>
                <h3 className="text-lg font-bold text-white mb-2">{p.title}</h3>
                <p className="text-gray-400 text-sm">{p.desc}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-12">
          <p className="text-gray-500 text-sm mb-4">Portfolio images are placeholders — actual project visuals coming soon.</p>
          <Link href="/sparrow-studio/contact" className="inline-flex px-8 py-3 rounded-xl bg-gradient-to-r from-purple-500 to-violet-600 text-white font-semibold transition-colors duration-200">Start Your Project</Link>
        </div>
      </div></section>
    </div>
  );
}
