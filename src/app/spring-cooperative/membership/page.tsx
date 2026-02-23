import type { Metadata } from "next";
import FormWrapper from "@/components/FormWrapper";

export const metadata: Metadata = { title: "Membership" };

export default function MembershipPage() {
  return (
    <div className="pt-24">
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-16">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">Become a <span className="text-yellow-500">Member</span></h1>
            <p className="text-gray-400 text-lg">Join the SPRING Co-operative Union and start building your financial future with us.</p>
          </div>

          {/* Benefits */}
          <div className="glass rounded-2xl p-8 mb-12">
            <h2 className="text-2xl font-bold text-white mb-6">Member Benefits</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                "Competitive savings interest rates",
                "Access to low-interest loans",
                "Annual dividend payments",
                "Free financial literacy workshops",
                "Insurance & welfare coverage",
                "Voting rights and governance participation",
                "Access to group investments",
                "Mobile banking access",
                "Networking with other members",
              ].map((b, i) => (
                <div key={i} className="flex items-start gap-3">
                  <span className="text-yellow-400 mt-1">✓</span>
                  <span className="text-gray-300">{b}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Requirements */}
          <div className="glass rounded-2xl p-8 mb-12">
            <h2 className="text-2xl font-bold text-white mb-6">Requirements</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                "Must be 18 years or older",
                "Valid Ghana Card or Passport",
                "2 passport-size photographs",
                "Registration fee: GH₵50",
                "Minimum initial savings: GH₵100",
                "Completed application form",
              ].map((r, i) => (
                <div key={i} className="flex items-start gap-3">
                  <span className="text-yellow-400 mt-1">•</span>
                  <span className="text-gray-300">{r}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Application Form */}
          <div className="glass rounded-2xl p-8">
            <h2 className="text-2xl font-bold text-white mb-8">Membership Application</h2>
            <FormWrapper subject="SPRING Co-operative - Membership Application" buttonText="Submit Application" buttonClass="w-full py-4 rounded-2xl bg-gradient-to-r from-yellow-500 to-amber-600 text-white font-semibold text-lg transition-colors duration-200 shadow-lg">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Full Name *</label>
                  <input type="text" name="full_name" required className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-yellow-500" />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Date of Birth *</label>
                  <input type="date" name="date_of_birth" required className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-yellow-500" />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Phone Number *</label>
                  <input type="tel" name="phone" required className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-yellow-500" />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Email</label>
                  <input type="email" name="email" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-yellow-500" />
                </div>
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-2">Residential Address *</label>
                <input type="text" name="address" required className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-yellow-500" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Occupation</label>
                  <input type="text" name="occupation" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-yellow-500" />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-2">ID Number (Ghana Card) *</label>
                  <input type="text" name="id_number" required className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-yellow-500" />
                </div>
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-2">Next of Kin (Full Name & Phone)</label>
                <input type="text" name="next_of_kin" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-yellow-500" placeholder="e.g. Kwame Mensah - 0241234567" />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-2">Monthly Savings Commitment *</label>
                <select name="monthly_savings" required className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-yellow-500">
                  <option value="">Select amount</option>
                  <option>GH₵50 / month</option>
                  <option>GH₵100 / month</option>
                  <option>GH₵200 / month</option>
                  <option>GH₵500 / month</option>
                  <option>GH₵1,000+ / month</option>
                </select>
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-2">Additional Comments</label>
                <textarea rows={3} name="comments" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-yellow-500" />
              </div>
            </FormWrapper>
          </div>
        </div>
      </section>
    </div>
  );
}
