import type { Metadata } from "next";
import FormWrapper from "@/components/FormWrapper";

export const metadata: Metadata = { title: "Contact" };

export default function FastRiderContact() {
  return (
    <div className="pt-24">
      <section className="py-24 relative">
        <div className="absolute inset-0" aria-hidden="true">
          <div className="absolute top-1/3 right-1/3 w-96 h-96 bg-red-700/8 rounded-full blur-2xl" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Contact <span className="text-red-700">FastRider</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl">
            Have questions about our delivery services? We&apos;re here to help.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Info */}
            <div>
              <div className="space-y-6 mb-10">
                {[
                  { icon: "📞", label: "Call Us", value: "+233 549 855 250" },
                  { icon: "📧", label: "Email", value: "fastrider@springcoltd.com" },
                  { icon: "📍", label: "Location", value: "Accra, Ghana" },
                  { icon: "⏰", label: "Hours", value: "Mon–Sat: 7:00 AM – 9:00 PM" },
                ].map((item, i) => (
                  <div key={i} className="glass rounded-2xl p-6 flex items-start gap-4">
                    <div className="text-3xl">{item.icon}</div>
                    <div>
                      <h3 className="text-sm text-gray-400 mb-1">{item.label}</h3>
                      <p className="text-white font-medium">{item.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Form */}
            <div className="glass rounded-2xl p-8 md:p-10">
              <h2 className="text-2xl font-bold text-white mb-6">Send a Message</h2>
              <FormWrapper subject="FastRider - Contact" buttonText="Send Message" buttonClass="w-full px-8 py-4 rounded-xl bg-gradient-to-r from-red-700 to-red-500 text-white font-semibold text-lg transition-colors duration-200">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">Name</label>
                    <input
                      type="text"
                      name="name"
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-red-700/50 focus:ring-1 focus:ring-red-700/50 transition-colors"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">Phone</label>
                    <input
                      type="tel"
                      name="phone"
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-red-700/50 focus:ring-1 focus:ring-red-700/50 transition-colors"
                      placeholder="Your phone"
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
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Message</label>
                  <textarea
                    rows={4}
                    name="message"
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-red-700/50 focus:ring-1 focus:ring-red-700/50 transition-colors resize-none"
                    placeholder="How can we help?"
                  />
                </div>
              </FormWrapper>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
