import { companyInfo } from "@/data/company";
import type { Metadata } from "next";
import FormWrapper from "@/components/FormWrapper";

export const metadata: Metadata = {
  title: "Contact Us — SPRING.CO.LTD",
  description:
    "Get in touch with SPRING.CO.LTD. We'd love to hear from you about partnerships, investments, or general inquiries.",
};

export default function ContactPage() {
  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="py-24 relative bg-grid">
        <div className="absolute inset-0">
          <div className="absolute top-1/3 right-1/3 w-96 h-96 bg-green-500/10 rounded-full blur-3xl" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Get In <span className="gradient-text">Touch</span>
            </h1>
            <p className="text-xl text-gray-400 leading-relaxed">
              Whether you&apos;re looking to collaborate, invest, or learn more about
              our companies, we&apos;d love to hear from you.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Content */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Info */}
            <div>
              <h2 className="text-3xl font-bold mb-8">
                Contact <span className="gradient-text">Information</span>
              </h2>

              <div className="space-y-6 mb-12">
                {[
                  {
                    icon: "📍",
                    label: "Our Office",
                    value: companyInfo.address,
                  },
                  {
                    icon: "📧",
                    label: "Email Us",
                    value: companyInfo.email,
                  },
                  {
                    icon: "📞",
                    label: "Call Us",
                    value: companyInfo.phone,
                  },
                  {
                    icon: "🏢",
                    label: "Headquarters",
                    value: companyInfo.headquarters,
                  },
                ].map((item, i) => (
                  <div
                    key={i}
                    className="glass rounded-2xl p-6 flex items-start space-x-4 hover:bg-white/10 transition-all"
                  >
                    <div className="text-3xl">{item.icon}</div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-400 mb-1">
                        {item.label}
                      </h3>
                      <p className="text-white font-medium">{item.value}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="glass rounded-2xl p-8">
                <h3 className="text-xl font-bold text-white mb-4">
                  Office Hours
                </h3>
                <div className="space-y-3 text-gray-400">
                  <div className="flex justify-between">
                    <span>Monday - Friday</span>
                    <span className="text-white">8:00 AM - 5:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Saturday</span>
                    <span className="text-white">9:00 AM - 1:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Sunday</span>
                    <span className="text-red-400">Closed</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="glass rounded-2xl p-8 md:p-10">
              <h2 className="text-2xl font-bold text-white mb-6">
                Send Us a Message
              </h2>
              <FormWrapper subject="SPRING.CO.LTD - Contact" buttonText="Send Message" buttonClass="w-full px-8 py-4 rounded-xl bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold text-lg hover:from-green-600 hover:to-emerald-700 transition-all duration-300 shadow-lg shadow-green-500/20">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">
                      First Name
                    </label>
                    <input
                      type="text"
                      name="first_name"
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-green-500/50 focus:ring-1 focus:ring-green-500/50 transition-all"
                      placeholder="John"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">
                      Last Name
                    </label>
                    <input
                      type="text"
                      name="last_name"
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-green-500/50 focus:ring-1 focus:ring-green-500/50 transition-all"
                      placeholder="Doe"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-green-500/50 focus:ring-1 focus:ring-green-500/50 transition-all"
                    placeholder="john@example.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">
                    Subject
                  </label>
                  <select name="subject_topic" className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-green-500/50 focus:ring-1 focus:ring-green-500/50 transition-all">
                    <option value="" className="bg-[#0a1628]">
                      Select a topic
                    </option>
                    <option value="partnership" className="bg-[#0a1628]">
                      Partnership Inquiry
                    </option>
                    <option value="investment" className="bg-[#0a1628]">
                      Investment Opportunity
                    </option>
                    <option value="careers" className="bg-[#0a1628]">
                      Careers
                    </option>
                    <option value="general" className="bg-[#0a1628]">
                      General Inquiry
                    </option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">
                    Message
                  </label>
                  <textarea
                    rows={5}
                    name="message"
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-green-500/50 focus:ring-1 focus:ring-green-500/50 transition-all resize-none"
                    placeholder="Tell us how we can help..."
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
