import Link from "next/link";
import type { Metadata } from "next";
import FormWrapper from "@/components/FormWrapper";

export const metadata: Metadata = { title: "Become a Rider" };

export default function BecomeRider() {
  return (
    <div className="pt-24">
      {/* Hero */}
      <section className="py-24 relative">
        <div className="absolute inset-0" aria-hidden="true">
          <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-red-700/10 rounded-full blur-2xl" />
          <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-red-500/8 rounded-full blur-2xl" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="inline-flex items-center px-4 py-2 rounded-full glass text-sm text-gray-300 mb-6">
              <span className="w-2 h-2 rounded-full bg-red-600 mr-2 animate-pulse" />
              Join Our Team
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Become a <span className="text-red-700">FastRider</span>
            </h1>
            <p className="text-xl text-gray-400 mb-4 leading-relaxed">
              Earn money on your own schedule. Ride with us and become part of
              Ghana&apos;s fastest-growing delivery network.
            </p>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16 bg-[#060e1a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">
            Why Ride With <span className="text-red-700">Us</span>?
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: "💰", title: "Competitive Earnings", desc: "Earn per delivery plus bonuses for peak hours and high performance." },
              { icon: "🕐", title: "Flexible Hours", desc: "Work when you want. Choose your own schedule — full-time or part-time." },
              { icon: "📱", title: "Easy-to-Use App", desc: "Accept orders, navigate, and track earnings all from your phone." },
              { icon: "🛡️", title: "Insurance Coverage", desc: "Ride with peace of mind — we provide rider insurance and support." },
              { icon: "📈", title: "Growth Opportunities", desc: "Top riders can become team leads, trainers, or fleet managers." },
              { icon: "🤝", title: "Supportive Community", desc: "Join a team of riders who support each other and grow together." },
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

      {/* Requirements */}
      <section className="py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-10">
            <span className="text-red-700">Requirements</span>
          </h2>
          <div className="glass rounded-2xl p-8">
            <ul className="space-y-4">
              {[
                "Valid Ghana driver's license (motorcycle or car)",
                "Own a motorcycle or bicycle in good condition",
                "Smartphone with data connection",
                "Must be 18 years or older",
                "Good knowledge of your city's roads",
                "Clean background record",
                "Customer-friendly attitude",
              ].map((req, i) => (
                <li key={i} className="flex items-center gap-3 text-gray-300">
                  <svg className="w-5 h-5 text-red-700 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  {req}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Application Form */}
      <section className="py-16 bg-[#060e1a]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold mb-4">
              Apply <span className="text-red-700">Now</span>
            </h2>
            <p className="text-gray-400">
              Fill in your details and we&apos;ll get back to you within 48 hours.
            </p>
          </div>

          <div className="glass rounded-2xl p-8 md:p-10">
            <FormWrapper subject="FastRider - Rider Application" buttonText="Submit Application" buttonClass="w-full px-8 py-4 rounded-xl bg-gradient-to-r from-red-700 to-red-500 text-white font-semibold text-lg transition-colors duration-200 shadow-lg shadow-red-700/20">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Full Name</label>
                  <input
                    type="text"
                    name="full_name"
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-red-700/50 focus:ring-1 focus:ring-red-700/50 transition-colors"
                    placeholder="Your full name"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Phone Number</label>
                  <input
                    type="tel"
                    name="phone"
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-red-700/50 focus:ring-1 focus:ring-red-700/50 transition-colors"
                    placeholder="+233 XXX XXX XXX"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-2">Email</label>
                <input
                  type="email"
                  name="email"
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-red-700/50 focus:ring-1 focus:ring-red-700/50 transition-colors"
                  placeholder="your@email.com"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm text-gray-400 mb-2">City</label>
                  <input
                    type="text"
                    name="city"
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-red-700/50 focus:ring-1 focus:ring-red-700/50 transition-colors"
                    placeholder="e.g. Accra"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Vehicle Type</label>
                  <select name="vehicle_type" className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-red-700/50 focus:ring-1 focus:ring-red-700/50 transition-colors">
                    <option value="" className="bg-[#0a1628]">Select vehicle</option>
                    <option value="motorcycle" className="bg-[#0a1628]">Motorcycle</option>
                    <option value="bicycle" className="bg-[#0a1628]">Bicycle</option>
                    <option value="car" className="bg-[#0a1628]">Car</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-2">
                  Do you have a valid driver&apos;s license?
                </label>
                <div className="flex gap-6">
                  <label className="flex items-center gap-2 text-gray-300 cursor-pointer">
                    <input type="radio" name="license" value="yes" className="accent-red-700" />
                    Yes
                  </label>
                  <label className="flex items-center gap-2 text-gray-300 cursor-pointer">
                    <input type="radio" name="license" value="no" className="accent-red-700" />
                    No
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-2">Why do you want to ride with FastRider?</label>
                <textarea
                  rows={3}
                  name="motivation"
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-red-700/50 focus:ring-1 focus:ring-red-700/50 transition-colors resize-none"
                  placeholder="Tell us a little about yourself..."
                />
              </div>
            </FormWrapper>
          </div>
        </div>
      </section>
    </div>
  );
}
