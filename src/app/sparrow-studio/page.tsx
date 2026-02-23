import Link from "next/link";

export default function springstudioHome() {
  return (
    <div className="pt-24">
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0" aria-hidden="true" style={{ contain: "paint" }}>
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-2xl" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-violet-500/10 rounded-full blur-2xl" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="inline-flex items-center px-4 py-2 rounded-full glass text-sm text-gray-300 mb-6">
              <span className="w-2 h-2 rounded-full bg-purple-400 mr-2 animate-pulse" />A SPRING.CO.LTD Company
            </div>
            <h1 className="text-5xl md:text-7xl font-black tracking-tight mb-6">
              <span className="text-purple-500">SPRING</span><span className="text-white"> STUDIO</span><span className="text-purple-400 text-3xl ml-2">GH</span>
            </h1>
            <p className="text-xl text-gray-400 mb-4 leading-relaxed">Where creativity meets strategy. We craft <span className="text-purple-400 font-semibold">visual experiences</span> that tell your brand&apos;s story.</p>
            <p className="text-gray-500 mb-8">Brand identity, UI/UX design, photography, videography, and digital marketing — all under one roof.</p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/sparrow-studio/portfolio" className="px-8 py-4 rounded-2xl bg-gradient-to-r from-purple-500 to-violet-600 text-white font-semibold text-lg transition-colors duration-200 shadow-lg shadow-purple-500/25 text-center">View Our Work</Link>
              <Link href="/sparrow-studio/contact" className="px-8 py-4 rounded-2xl glass text-white font-semibold text-lg hover:bg-white/10 transition-colors duration-200 text-center">Start a Project</Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-[#060e1a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-5xl font-bold text-center mb-16">What We <span className="text-purple-500">Create</span></h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: "🎨", title: "Brand Identity", desc: "Logos, brand guidelines, visual systems that make your brand unforgettable." },
              { icon: "💻", title: "UI/UX Design", desc: "Beautiful, intuitive digital experiences for web and mobile applications." },
              { icon: "📸", title: "Photography", desc: "Professional photography for products, events, corporate portraits, and more." },
              { icon: "🎬", title: "Videography", desc: "Cinematic video production from concept to final cut — ads, docs, social content." },
              { icon: "📱", title: "Digital Marketing", desc: "Strategic social media, content marketing, and ad campaigns that convert." },
              { icon: "✏️", title: "Motion Graphics", desc: "Animated graphics and visual effects that bring your message to life." },
            ].map((item, i) => (
              <div key={i} className="glass rounded-2xl p-8 hover:bg-white/10 transition-colors duration-200">
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
                <p className="text-gray-400 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">Let&apos;s Create <span className="text-purple-500">Together</span></h2>
          <p className="text-gray-400 text-lg mb-10">Have a project in mind? Let&apos;s bring your vision to life.</p>
          <Link href="/sparrow-studio/contact" className="inline-flex px-10 py-4 rounded-2xl bg-gradient-to-r from-purple-500 to-violet-600 text-white font-semibold text-lg transition-colors duration-200 shadow-lg">Start a Project</Link>
        </div>
      </section>
    </div>
  );
}
