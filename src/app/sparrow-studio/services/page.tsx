import type { Metadata } from "next";
export const metadata: Metadata = { title: "Services" };

export default function SparrowStudioServices() {
  const services = [
    { icon: "🎨", title: "Brand Identity & Design", desc: "Complete brand identity systems including logo design, color palettes, typography, brand guidelines, and stationery design.", features: ["Logo Design", "Brand Guidelines", "Stationery Design", "Brand Strategy"] },
    { icon: "💻", title: "UI/UX Design", desc: "User-centered design for websites, mobile apps, and digital platforms that look beautiful and work intuitively.", features: ["Wireframing", "Prototyping", "User Research", "Design Systems"] },
    { icon: "📸", title: "Photography & Videography", desc: "Professional visual content creation for brands, events, products, and corporate communications.", features: ["Product Photography", "Event Coverage", "Corporate Videos", "Social Media Content"] },
    { icon: "📱", title: "Digital Marketing", desc: "Data-driven marketing strategies across social media, search engines, and digital platforms.", features: ["Social Media Management", "Content Strategy", "Paid Advertising", "Analytics & Reporting"] },
    { icon: "✏️", title: "Motion Graphics", desc: "Animated explainer videos, logo animations, social media animations, and visual effects.", features: ["Explainer Videos", "Logo Animation", "Social Animations", "Title Sequences"] },
    { icon: "🖨️", title: "Print & Packaging", desc: "Eye-catching print materials and packaging designs that stand out on shelves and in hands.", features: ["Packaging Design", "Brochures & Flyers", "Billboard Design", "Menu Design"] },
  ];

  return (
    <div className="pt-24">
      <section className="py-24"><div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"><h1 className="text-4xl md:text-6xl font-bold mb-6">Our <span className="text-purple-500">Services</span></h1><p className="text-xl text-gray-400 max-w-2xl">Full-spectrum creative services to elevate your brand.</p></div></section>
      <section className="py-16"><div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {services.map((s, i) => (
          <div key={i} className="glass rounded-2xl p-8 md:p-10 hover:bg-white/10 transition-colors duration-200">
            <div className="flex flex-col md:flex-row gap-6"><div className="text-5xl flex-shrink-0">{s.icon}</div><div className="flex-1"><h3 className="text-2xl font-bold text-white mb-3">{s.title}</h3><p className="text-gray-400 mb-4 leading-relaxed">{s.desc}</p><div className="flex flex-wrap gap-2">{s.features.map((f, j) => (<span key={j} className="px-3 py-1 rounded-full text-xs font-medium bg-purple-500/10 text-purple-400 border border-purple-500/20">{f}</span>))}</div></div></div>
          </div>
        ))}
      </div></section>
    </div>
  );
}
