import type { Metadata } from "next";
import FormWrapper from "@/components/FormWrapper";

export const metadata: Metadata = { title: "Admissions" };

export default function AdmissionsPage() {
  return (
    <div className="pt-24">
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-16">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="text-blue-500">Admissions</span>
            </h1>
            <p className="text-gray-400 text-lg">Begin your journey at Prime College. Follow the steps below and submit your application.</p>
          </div>

          {/* Steps */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-16">
            {[
              { step: "01", title: "Choose Program", desc: "Browse our programs and select the course that matches your goals." },
              { step: "02", title: "Fill Application", desc: "Complete the application form below with your details." },
              { step: "03", title: "Submit Documents", desc: "Upload or deliver your certificates and ID documents." },
              { step: "04", title: "Get Admitted", desc: "Receive your admission letter and begin your studies." },
            ].map((s) => (
              <div key={s.step} className="glass rounded-2xl p-6">
                <div className="text-3xl font-black text-blue-500 mb-3">{s.step}</div>
                <h3 className="text-white font-semibold mb-2">{s.title}</h3>
                <p className="text-gray-400 text-sm">{s.desc}</p>
              </div>
            ))}
          </div>

          {/* Requirements */}
          <div className="glass rounded-2xl p-8 mb-16">
            <h2 className="text-2xl font-bold text-white mb-6">Requirements</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                "BECE / WASSCE certificate or equivalent",
                "Valid national ID (Ghana Card / Passport)",
                "2 passport-size photographs",
                "Application fee payment receipt",
                "Recommendation letter (optional)",
                "Personal statement / essay (optional)",
              ].map((req, i) => (
                <div key={i} className="flex items-start gap-3">
                  <span className="text-blue-400 mt-1">✓</span>
                  <span className="text-gray-300">{req}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Application Form */}
          <div className="glass rounded-2xl p-8">
            <h2 className="text-2xl font-bold text-white mb-8">Application Form</h2>
            <FormWrapper subject="Prime College - Admission Application" buttonText="Submit Application" buttonClass="w-full py-4 rounded-2xl bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold text-lg transition-colors duration-200 shadow-lg">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Full Name *</label>
                  <input type="text" name="full_name" required className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500" />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Email Address *</label>
                  <input type="email" name="email" required className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500" />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Phone Number *</label>
                  <input type="tel" name="phone" required className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500" />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Date of Birth *</label>
                  <input type="date" name="date_of_birth" required className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500" />
                </div>
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-2">Program of Interest *</label>
                <select name="program" required className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500">
                  <option value="">Select a program</option>
                  <optgroup label="Business & Management">
                    <option>Business Administration</option>
                    <option>Accounting & Finance</option>
                    <option>Marketing & Sales</option>
                    <option>Project Management</option>
                  </optgroup>
                  <optgroup label="Information Technology">
                    <option>Software Development</option>
                    <option>Web Design & Development</option>
                    <option>Cybersecurity</option>
                    <option>Data Science & Analytics</option>
                  </optgroup>
                  <optgroup label="Creative Arts & Media">
                    <option>Graphic Design</option>
                    <option>Photography & Videography</option>
                    <option>Digital Marketing</option>
                    <option>Fashion Design</option>
                  </optgroup>
                  <optgroup label="Vocational Training">
                    <option>Electrical Engineering</option>
                    <option>Plumbing & Pipefitting</option>
                    <option>Carpentry & Joinery</option>
                    <option>Automotive Technology</option>
                  </optgroup>
                </select>
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-2">Preferred Study Mode *</label>
                <select name="study_mode" required className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500">
                  <option value="">Select mode</option>
                  <option>Full-Time</option>
                  <option>Part-Time</option>
                  <option>Online</option>
                </select>
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-2">Previous Qualification</label>
                <input type="text" name="previous_qualification" placeholder="e.g. WASSCE, HND, Diploma..." className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-blue-500" />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-2">Additional Information</label>
                <textarea rows={4} name="additional_info" placeholder="Tell us about yourself or any questions..." className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-blue-500" />
              </div>
            </FormWrapper>
          </div>
        </div>
      </section>
    </div>
  );
}
