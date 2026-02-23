import type { Metadata } from "next";

export const metadata: Metadata = { title: "About" };

export default function FastRiderAbout() {
  return (
    <div className="pt-24">
      {/* Hero */}
      <section className="py-24 relative">
        <div className="absolute inset-0" aria-hidden="true">
          <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-red-700/8 rounded-full blur-2xl" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            About <span className="text-red-700">FastRider</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl leading-relaxed">
            Built for speed. Driven by reliability. Powered by technology.
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-6 text-gray-400 text-lg leading-relaxed">
            <p>
              <span className="text-red-700 font-semibold">FASTRIDER</span> was
              founded in 2024 as a subsidiary of SPRING.CO.LTD with a clear mission:
              to revolutionize last-mile delivery in Ghana.
            </p>
            <p>
              We saw the challenges businesses and individuals faced — unreliable
              deliveries, lack of tracking, and unpredictable timelines. FastRider was
              built to solve these problems with a technology-first approach.
            </p>
            <p>
              Today, our growing fleet of trained riders and drivers delivers thousands
              of packages across Ghana. With real-time tracking, dedicated customer
              support, and competitive pricing, we&apos;ve become the trusted delivery
              partner for businesses and individuals alike.
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 bg-[#060e1a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="glass rounded-2xl p-10">
              <div className="text-4xl mb-4">🎯</div>
              <h2 className="text-2xl font-bold text-white mb-4">Our Mission</h2>
              <p className="text-gray-400 leading-relaxed">
                To provide fast, reliable, and affordable delivery services that
                connect businesses and communities, powered by technology and
                exceptional customer service.
              </p>
            </div>
            <div className="glass rounded-2xl p-10">
              <div className="text-4xl mb-4">🔭</div>
              <h2 className="text-2xl font-bold text-white mb-4">Our Vision</h2>
              <p className="text-gray-400 leading-relaxed">
                To become West Africa&apos;s most trusted and innovative logistics
                platform, setting the standard for speed, reliability, and
                customer experience in delivery services.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { value: "2024", label: "Founded" },
              { value: "100+", label: "Active Riders" },
              { value: "10K+", label: "Deliveries" },
              { value: "98%", label: "On-Time Rate" },
            ].map((stat, i) => (
              <div key={i} className="glass rounded-2xl p-6 text-center">
                <div className="text-3xl font-bold text-red-700 mb-1">{stat.value}</div>
                <div className="text-sm text-gray-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
