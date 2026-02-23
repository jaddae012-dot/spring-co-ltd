import type { Metadata } from "next";
export const metadata: Metadata = { title: "About" };

export default function AgritechAbout() {
  return (
    <div className="pt-24">
      <section className="py-24"><div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"><h1 className="text-4xl md:text-6xl font-bold mb-6">About <span className="text-green-500">AGRITECH</span></h1><p className="text-xl text-gray-400 max-w-2xl">Pioneering agricultural technology for a sustainable future.</p></div></section>
      <section className="py-16"><div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 text-gray-400 text-lg leading-relaxed">
        <p><span className="text-green-500 font-semibold">AGRITECH</span> was founded in 2023 as the first subsidiary of SPRING.CO.LTD, driven by a mission to transform how Africa farms.</p>
        <p>We combine cutting-edge technology — IoT sensors, drone mapping, AI analytics — with deep agricultural expertise to help farmers increase yields, reduce costs, and farm sustainably.</p>
        <p>From smallholder farms to large agribusinesses, our solutions are designed to be accessible, practical, and impactful. We believe technology should work for farmers, not the other way around.</p>
      </div></section>
      <section className="py-16 bg-[#060e1a]"><div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"><div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="glass rounded-2xl p-10"><div className="text-4xl mb-4">🎯</div><h2 className="text-2xl font-bold text-white mb-4">Our Mission</h2><p className="text-gray-400 leading-relaxed">To enhance food security and promote sustainable agriculture across Africa through accessible, technology-driven farming solutions.</p></div>
        <div className="glass rounded-2xl p-10"><div className="text-4xl mb-4">🔭</div><h2 className="text-2xl font-bold text-white mb-4">Our Vision</h2><p className="text-gray-400 leading-relaxed">To be Africa&apos;s leading agricultural technology company, empowering every farmer with the tools to thrive in a changing world.</p></div>
      </div></div></section>
    </div>
  );
}
