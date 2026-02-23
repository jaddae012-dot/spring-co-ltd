import type { Metadata } from "next";

export const metadata: Metadata = { title: "Track Package" };

export default function FastRiderTrack() {
  return (
    <div className="pt-24">
      <section className="py-24 relative">
        <div className="absolute inset-0" aria-hidden="true">
          <div className="absolute top-1/3 left-1/3 w-96 h-96 bg-red-700/8 rounded-full blur-2xl" />
        </div>
        <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Track Your <span className="text-red-700">Package</span>
          </h1>
          <p className="text-xl text-gray-400 mb-12">
            Enter your tracking number to see the real-time status of your delivery.
          </p>

          <div className="glass rounded-2xl p-8 md:p-10">
            <form className="space-y-6">
              <div>
                <label className="block text-sm text-gray-400 mb-2 text-left">
                  Tracking Number
                </label>
                <input
                  type="text"
                  className="w-full px-6 py-4 rounded-xl bg-white/5 border border-white/10 text-white text-lg placeholder-gray-500 focus:outline-none focus:border-red-700/50 focus:ring-1 focus:ring-red-700/50 transition-colors"
                  placeholder="e.g. FR-2026-XXXXX"
                />
              </div>
              <button
                type="submit"
                className="w-full px-8 py-4 rounded-xl bg-gradient-to-r from-red-700 to-red-500 text-white font-semibold text-lg transition-colors duration-200"
              >
                Track Package
              </button>
            </form>

            {/* Placeholder status */}
            <div className="mt-10 pt-8 border-t border-white/10">
              <div className="flex items-center justify-center gap-3 text-gray-500">
                <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <p className="text-gray-500 text-sm mt-3">
                Enter a tracking number above to see delivery status
              </p>
              <p className="text-gray-600 text-xs mt-2">
                Tracking feature coming soon — contact us directly for delivery updates.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
