import type { Metadata } from "next";
import FormWrapper from "@/components/FormWrapper";

export const metadata: Metadata = { title: "Book a Cleaning" };

export default function BookCleaningPage() {
  return (
    <div className="pt-24">
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">Book a <span className="text-cyan-500">Cleaning</span></h1>
            <p className="text-gray-400 text-lg">Fill out the form below and we&apos;ll confirm your booking within 30 minutes.</p>
          </div>

          <div className="glass rounded-2xl p-8">
            <FormWrapper subject="Fast Cleaners - Booking" buttonText="Confirm Booking" buttonClass="w-full py-4 rounded-2xl bg-gradient-to-r from-cyan-500 to-teal-600 text-white font-semibold text-lg transition-colors duration-200 shadow-lg">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Full Name *</label>
                  <input type="text" name="full_name" required className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-500" />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Phone Number *</label>
                  <input type="tel" name="phone" required className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-500" />
                </div>
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-2">Address / Location *</label>
                <input type="text" name="address" required placeholder="e.g. East Legon, Accra" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-cyan-500" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Service Type *</label>
                  <select name="service_type" required className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-500">
                    <option value="">Select service</option>
                    <option>Home Cleaning</option>
                    <option>Office Cleaning</option>
                    <option>Deep Cleaning</option>
                    <option>Window Cleaning</option>
                    <option>Upholstery Cleaning</option>
                    <option>Post-Construction Cleanup</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Property Type</label>
                  <select name="property_type" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-500">
                    <option value="">Select type</option>
                    <option>Apartment / Flat</option>
                    <option>House / Bungalow</option>
                    <option>Office / Workspace</option>
                    <option>Commercial Building</option>
                    <option>Construction Site</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Preferred Date *</label>
                  <input type="date" name="preferred_date" required className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-500" />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Preferred Time</label>
                  <select name="preferred_time" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-500">
                    <option>Morning (7AM - 12PM)</option>
                    <option>Afternoon (12PM - 4PM)</option>
                    <option>Evening (4PM - 7PM)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-2">Frequency</label>
                <select name="frequency" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-500">
                  <option>One-Time</option>
                  <option>Weekly</option>
                  <option>Bi-Weekly</option>
                  <option>Monthly</option>
                </select>
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-2">Special Instructions</label>
                <textarea rows={4} name="special_instructions" placeholder="Any specific areas to focus on, access instructions, etc..." className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-cyan-500" />
              </div>
            </FormWrapper>
          </div>
        </div>
      </section>
    </div>
  );
}
