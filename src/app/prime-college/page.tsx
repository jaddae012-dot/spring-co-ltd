import Link from "next/link";

export default function PrimeCollegeHome() {
  return (
    <div className="pt-24">
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0" aria-hidden="true" style={{ contain: "paint" }}>
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-2xl" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-2xl" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="inline-flex items-center px-4 py-2 rounded-full glass text-sm text-gray-300 mb-6">
              <span className="w-2 h-2 rounded-full bg-blue-400 mr-2 animate-pulse" />A SPRING.CO.LTD Company
            </div>
            <h1 className="text-5xl md:text-7xl font-black tracking-tight mb-6">
              <span className="text-blue-500">PRIME</span><span className="text-white"> COLLEGE</span>
            </h1>
            <p className="text-xl text-gray-400 mb-4 leading-relaxed">Excellence in education — empowering the next generation with <span className="text-blue-400 font-semibold">knowledge, skills, and values</span>.</p>
            <p className="text-gray-500 mb-8">Academic programs, vocational training, and professional development for a brighter future.</p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/prime-college/programs" className="px-8 py-4 rounded-2xl bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold text-lg transition-colors duration-200 shadow-lg shadow-blue-500/25 text-center">Explore Programs</Link>
              <Link href="/prime-college/admissions" className="px-8 py-4 rounded-2xl glass text-white font-semibold text-lg hover:bg-white/10 transition-colors duration-200 text-center">Apply Now</Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-[#060e1a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-5xl font-bold text-center mb-16">Why <span className="text-blue-500">Prime College</span>?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: "📚", title: "Quality Education", desc: "Industry-relevant curriculum designed by experts and updated regularly." },
              { icon: "👨‍🏫", title: "Expert Instructors", desc: "Learn from experienced professionals who are passionate about teaching." },
              { icon: "💼", title: "Career Support", desc: "Job placement assistance, career counseling, and industry connections." },
              { icon: "🌐", title: "E-Learning Platform", desc: "Learn anywhere, anytime with our modern online learning platform." },
              { icon: "🏆", title: "Certified Programs", desc: "Earn recognized certifications that boost your career prospects." },
              { icon: "🤝", title: "Community", desc: "Join a vibrant community of learners, alumni, and industry partners." },
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
          <h2 className="text-3xl md:text-5xl font-bold mb-6">Start Your <span className="text-blue-500">Journey</span></h2>
          <p className="text-gray-400 text-lg mb-10">Admissions are open. Take the first step toward your future.</p>
          <Link href="/prime-college/admissions" className="inline-flex px-10 py-4 rounded-2xl bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold text-lg transition-colors duration-200 shadow-lg">Apply Now</Link>
        </div>
      </section>
    </div>
  );
}
