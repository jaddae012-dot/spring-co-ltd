import type { Metadata } from "next";
import AdmissionsApplicationForm from "@/components/AdmissionsApplicationForm";

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
            <AdmissionsApplicationForm />
          </div>
        </div>
      </section>
    </div>
  );
}
