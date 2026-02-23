import type { Metadata } from "next";

export const metadata: Metadata = { title: "About" };

export default function PrimeCollegeAbout() {
  return (
    <div className="pt-24">
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-16">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">About <span className="text-blue-500">Prime College</span></h1>
            <p className="text-gray-400 text-lg">A SPRING.CO.LTD institution committed to excellence in education and workforce development in Ghana.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
            <div className="glass rounded-2xl p-8">
              <h2 className="text-2xl font-bold text-white mb-4">Our Story</h2>
              <div className="space-y-4 text-gray-400 leading-relaxed">
                <p>Prime College was established as the educational arm of SPRING.CO.LTD with a clear mission: to bridge the gap between education and industry in Ghana.</p>
                <p>We recognized that many graduates struggle to find employment because their education doesn&apos;t align with market demands. Prime College was built to change that—offering practical, skills-based programs that prepare students for real careers.</p>
                <p>Today, we serve students across Accra and beyond, offering flexible learning options including full-time, part-time, and online programs.</p>
              </div>
            </div>
            <div className="space-y-6">
              <div className="glass rounded-2xl p-8">
                <h3 className="text-xl font-bold text-white mb-3">🎯 Mission</h3>
                <p className="text-gray-400">To provide accessible, high-quality education that equips students with practical skills, critical thinking, and professional values for the modern workforce.</p>
              </div>
              <div className="glass rounded-2xl p-8">
                <h3 className="text-xl font-bold text-white mb-3">🔭 Vision</h3>
                <p className="text-gray-400">To be the leading skills-based educational institution in West Africa, known for producing industry-ready graduates and driving economic growth.</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
            {[
              { value: "16+", label: "Programs" },
              { value: "500+", label: "Students" },
              { value: "95%", label: "Completion Rate" },
              { value: "80%", label: "Job Placement" },
            ].map((stat) => (
              <div key={stat.label} className="glass rounded-2xl p-6 text-center">
                <div className="text-3xl md:text-4xl font-black text-blue-500">{stat.value}</div>
                <div className="text-gray-400 text-sm mt-1">{stat.label}</div>
              </div>
            ))}
          </div>

          <div className="glass rounded-2xl p-8">
            <h2 className="text-2xl font-bold text-white mb-6">Core Values</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { icon: "📖", title: "Excellence", desc: "We maintain the highest standards in teaching and learning." },
                { icon: "🤝", title: "Integrity", desc: "Honesty and ethical conduct in everything we do." },
                { icon: "💡", title: "Innovation", desc: "Embracing new methods and technologies in education." },
                { icon: "🌍", title: "Inclusivity", desc: "Education accessible to all, regardless of background." },
                { icon: "🔗", title: "Industry Alignment", desc: "Programs designed with employer needs at the center." },
                { icon: "🌱", title: "Growth", desc: "Fostering continuous learning and personal development." },
              ].map((v) => (
                <div key={v.title} className="flex gap-4">
                  <span className="text-2xl">{v.icon}</span>
                  <div>
                    <h3 className="font-semibold text-white">{v.title}</h3>
                    <p className="text-gray-400 text-sm">{v.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
