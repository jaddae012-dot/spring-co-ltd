import type { Metadata } from "next";
import FormWrapper from "@/components/FormWrapper";
export const metadata: Metadata = { title: "Contact" };

export default function springstudioContact() {
  return (
    <div className="pt-24">
      <section className="py-24"><div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"><h1 className="text-4xl md:text-6xl font-bold mb-6">Start a <span className="text-purple-500">Project</span></h1><p className="text-xl text-gray-400 max-w-2xl">Tell us about your vision and let&apos;s create something amazing together.</p></div></section>
      <section className="py-16"><div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"><div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div className="space-y-6">
          {[{icon:"📞",label:"Phone",value:"+233 549 855 250"},{icon:"📧",label:"Email",value:"springstudio@springcoltd.com"},{icon:"📍",label:"Studio",value:"Accra, Ghana"}].map((item,i)=>(<div key={i} className="glass rounded-2xl p-6 flex items-start gap-4"><div className="text-3xl">{item.icon}</div><div><h3 className="text-sm text-gray-400 mb-1">{item.label}</h3><p className="text-white font-medium">{item.value}</p></div></div>))}
        </div>
        <div className="glass rounded-2xl p-8 md:p-10">
          <h2 className="text-2xl font-bold text-white mb-6">Tell Us About Your Project</h2>
          <FormWrapper subject="SPRING STUDIO GH - Project Request" buttonText="Send Request" buttonClass="w-full px-8 py-4 rounded-xl bg-gradient-to-r from-purple-500 to-violet-600 text-white font-semibold text-lg transition-colors duration-200">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div><label className="block text-sm text-gray-400 mb-2">Name</label><input type="text" name="name" className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/50 transition-colors" placeholder="Your name"/></div>
              <div><label className="block text-sm text-gray-400 mb-2">Email</label><input type="email" name="email" className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/50 transition-colors" placeholder="your@email.com"/></div>
            </div>
            <div><label className="block text-sm text-gray-400 mb-2">Service Needed</label>
              <select name="service" className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/50 transition-colors">
                <option value="" className="bg-[#0a1628]">Select a service</option>
                <option value="branding" className="bg-[#0a1628]">Brand Identity & Design</option>
                <option value="uiux" className="bg-[#0a1628]">UI/UX Design</option>
                <option value="photo" className="bg-[#0a1628]">Photography & Videography</option>
                <option value="marketing" className="bg-[#0a1628]">Digital Marketing</option>
                <option value="motion" className="bg-[#0a1628]">Motion Graphics</option>
                <option value="print" className="bg-[#0a1628]">Print & Packaging</option>
              </select>
            </div>
            <div><label className="block text-sm text-gray-400 mb-2">Project Details</label><textarea rows={4} name="project_details" className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/50 transition-colors resize-none" placeholder="Tell us about your project, goals, and timeline..."/></div>
          </FormWrapper>
        </div>
      </div></div></section>
    </div>
  );
}
