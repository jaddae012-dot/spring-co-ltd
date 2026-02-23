import type { Metadata } from "next";
import FormWrapper from "@/components/FormWrapper";

export const metadata: Metadata = { title: "Contact" };

export default function FastCleanersContact() {
  return (
    <div className="pt-24">
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-16">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">Contact <span className="text-cyan-500">Us</span></h1>
            <p className="text-gray-400 text-lg">Get a free quote or book a cleaning. We respond within the hour.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="space-y-6">
              {[
                { icon: "📍", title: "Office", value: "Accra, Ghana" },
                { icon: "📞", title: "Phone", value: "+233 549 855 250" },
                { icon: "✉️", title: "Email", value: "info@fastcleanersgh.com" },
                { icon: "🕐", title: "Hours", value: "Mon - Sat: 7:00 AM - 7:00 PM" },
              ].map((item) => (
                <div key={item.title} className="glass rounded-2xl p-6 flex gap-4 items-start">
                  <span className="text-2xl">{item.icon}</span>
                  <div>
                    <h3 className="font-semibold text-white">{item.title}</h3>
                    <p className="text-gray-400 text-sm">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="lg:col-span-2 glass rounded-2xl p-8">
              <h2 className="text-2xl font-bold text-white mb-6">Get a Free Quote</h2>
              <FormWrapper subject="Fast Cleaners - Contact" buttonText="Request Quote" buttonClass="w-full py-4 rounded-2xl bg-gradient-to-r from-cyan-500 to-teal-600 text-white font-semibold text-lg transition-colors duration-200 shadow-lg">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">Name</label>
                    <input type="text" name="name" required className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-500" />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">Phone</label>
                    <input type="tel" name="phone" required className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-500" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Service Needed</label>
                  <select name="service" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-500">
                    <option value="">Select a service</option>
                    <option>Home Cleaning</option>
                    <option>Office Cleaning</option>
                    <option>Deep Cleaning</option>
                    <option>Window Cleaning</option>
                    <option>Upholstery Cleaning</option>
                    <option>Post-Construction Cleanup</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Message</label>
                  <textarea rows={4} name="message" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-500" placeholder="Describe your space and requirements..." />
                </div>
              </FormWrapper>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
