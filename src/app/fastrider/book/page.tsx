import type { Metadata } from "next";
import FormWrapper from "@/components/FormWrapper";

export const metadata: Metadata = { title: "Book a Ride" };

export default function FastRiderBook() {
  return (
    <div className="pt-24">
      <section className="py-24 relative">
        <div className="absolute inset-0" aria-hidden="true">
          <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-red-700/8 rounded-full blur-2xl" />
        </div>
        <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Book a <span className="text-red-700">Ride</span>
            </h1>
            <p className="text-xl text-gray-400">
              Fill in the details below and we&apos;ll dispatch a rider to your location.
            </p>
          </div>

          <div className="glass rounded-2xl p-8 md:p-10">
            <FormWrapper subject="FastRider - Book a Ride" buttonText="🚀 Book My Ride" buttonClass="w-full px-8 py-4 rounded-xl bg-gradient-to-r from-red-700 to-red-500 text-white font-semibold text-lg transition-colors duration-200 shadow-lg shadow-red-700/20">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Your Name</label>
                  <input
                    type="text"
                    name="name"
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-red-700/50 focus:ring-1 focus:ring-red-700/50 transition-colors"
                    placeholder="Full name"
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
                <label className="block text-sm text-gray-400 mb-2">Pickup Location</label>
                <input
                  type="text"
                  name="pickup_location"
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-red-700/50 focus:ring-1 focus:ring-red-700/50 transition-colors"
                  placeholder="Where should we pick up?"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-2">Drop-off Location</label>
                <input
                  type="text"
                  name="dropoff_location"
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-red-700/50 focus:ring-1 focus:ring-red-700/50 transition-colors"
                  placeholder="Where should we deliver?"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Package Type</label>
                  <select name="package_type" className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-red-700/50 focus:ring-1 focus:ring-red-700/50 transition-colors">
                    <option value="" className="bg-[#0a1628]">Select type</option>
                    <option value="document" className="bg-[#0a1628]">Document / Envelope</option>
                    <option value="small" className="bg-[#0a1628]">Small Parcel (up to 5kg)</option>
                    <option value="medium" className="bg-[#0a1628]">Medium Parcel (5–10kg)</option>
                    <option value="large" className="bg-[#0a1628]">Large Package (10kg+)</option>
                    <option value="food" className="bg-[#0a1628]">Food Delivery</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Delivery Speed</label>
                  <select name="delivery_speed" className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-red-700/50 focus:ring-1 focus:ring-red-700/50 transition-colors">
                    <option value="standard" className="bg-[#0a1628]">Standard (3–5 hours)</option>
                    <option value="express" className="bg-[#0a1628]">Express (1–2 hours)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-2">Additional Notes</label>
                <textarea
                  rows={3}
                  name="notes"
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-red-700/50 focus:ring-1 focus:ring-red-700/50 transition-colors resize-none"
                  placeholder="Any special instructions? (e.g., fragile, call on arrival)"
                />
              </div>

              <p className="text-xs text-gray-600 text-center">
                By booking, you agree to our terms of service. You&apos;ll receive a confirmation SMS shortly.
              </p>
            </FormWrapper>
          </div>
        </div>
      </section>
    </div>
  );
}
