import Link from "next/link";
import Image from "next/image";

export default function FastRiderHome() {
  return (
    <div className="pt-24">
      {/* Hero */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0" aria-hidden="true" style={{ contain: "paint" }}>
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-red-700/10 rounded-full blur-2xl" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-red-500/10 rounded-full blur-2xl" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center px-4 py-2 rounded-full glass text-sm text-gray-300 mb-6">
                <span className="w-2 h-2 rounded-full bg-red-600 mr-2 animate-pulse" />
                A SPRING.CO.LTD Company
              </div>

              <h1 className="text-5xl md:text-7xl font-black tracking-tight mb-6">
                <span className="text-red-700">Fast</span>
                <span className="text-white">Rider</span>
              </h1>

              <p className="text-xl text-gray-400 mb-4 leading-relaxed">
                Lightning-fast delivery and logistics services across Ghana.
                We get your packages where they need to be — <span className="text-red-600 font-semibold">on time, every time</span>.
              </p>

              <p className="text-gray-500 mb-8">
                From same-day delivery to fleet management, FastRider is your trusted logistics partner.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/fastrider/book"
                  className="px-8 py-4 rounded-2xl bg-gradient-to-r from-red-700 to-red-500 text-white font-semibold text-lg transition-colors duration-200 shadow-lg shadow-red-700/25 text-center"
                >
                  Book a Ride
                </Link>
                <Link
                  href="/fastrider/become-rider"
                  className="px-8 py-4 rounded-2xl glass text-white font-semibold text-lg hover:bg-white/10 transition-colors duration-200 text-center"
                >
                  Become a Rider
                </Link>
              </div>
            </div>

            <div className="flex justify-center">
              <div className="relative">
                <div className="w-72 h-72 md:w-96 md:h-96 rounded-3xl bg-gradient-to-br from-red-700/20 to-red-500/20 flex items-center justify-center">
                  <Image
                    src="/logos/fastrider.png"
                    alt="FastRider"
                    width={300}
                    height={300}
                    className="w-64 h-64 md:w-80 md:h-80 object-contain"
                    priority
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why FastRider */}
      <section className="py-24 bg-[#060e1a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              Why Choose <span className="text-red-700">FastRider</span>?
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Reliable, fast, and technology-driven delivery solutions
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: "⚡", title: "Lightning Fast", desc: "Same-day and express delivery options for urgent packages" },
              { icon: "📍", title: "Real-Time Tracking", desc: "Track your deliveries live from pickup to drop-off" },
              { icon: "🛡️", title: "Safe & Secure", desc: "Your packages are handled with care and fully insured" },
              { icon: "💰", title: "Affordable Rates", desc: "Competitive pricing with no hidden charges" },
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

      {/* How It Works */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              How It <span className="text-red-700">Works</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { step: "01", title: "Book a Ride", desc: "Place your delivery request online or call us. Tell us the pickup and drop-off locations." },
              { step: "02", title: "We Pick Up", desc: "A FastRider arrives at your location to collect the package swiftly and securely." },
              { step: "03", title: "Delivered!", desc: "Your package is delivered to the destination. Track it in real-time all the way." },
            ].map((item, i) => (
              <div key={i} className="text-center">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-red-700 to-red-500 flex items-center justify-center text-white font-bold text-xl mx-auto mb-6">
                  {item.step}
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
                <p className="text-gray-400 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-[#060e1a]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Ready to <span className="text-red-700">Ship</span>?
          </h2>
          <p className="text-gray-400 text-lg mb-10">
            Book a ride now or join our growing team of riders.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/fastrider/book"
              className="px-8 py-4 rounded-2xl bg-gradient-to-r from-red-700 to-red-500 text-white font-semibold text-lg transition-colors duration-200 shadow-lg"
            >
              Book a Ride
            </Link>
            <Link
              href="/fastrider/become-rider"
              className="px-8 py-4 rounded-2xl glass text-white font-semibold text-lg hover:bg-white/10 transition-colors duration-200"
            >
              Become a Rider
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
