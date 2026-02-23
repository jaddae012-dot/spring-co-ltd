import type { Metadata } from "next";
export const metadata: Metadata = { title: "About" };

export default function springstudioAbout() {
  return (
    <div className="pt-24">
      <section className="py-24"><div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"><h1 className="text-4xl md:text-6xl font-bold mb-6">About <span className="text-purple-500">SPRING STUDIO</span></h1><p className="text-xl text-gray-400 max-w-2xl">The creative engine of SPRING.CO.LTD.</p></div></section>
      <section className="py-16"><div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 text-gray-400 text-lg leading-relaxed">
        <p><span className="text-purple-500 font-semibold">SPRING STUDIO GH</span> is a premier creative agency founded in 2023 as part of the SPRING.CO.LTD family. We live at the intersection of art and strategy.</p>
        <p>Our diverse team of designers, photographers, videographers, and digital marketers brings brands to life through compelling visual storytelling and innovative design.</p>
        <p>We&apos;ve worked with startups, SMEs, and established brands across Ghana and beyond, delivering creative solutions that drive real business results.</p>
      </div></section>
      <section className="py-16 bg-[#060e1a]"><div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 md:grid-cols-4 gap-6">
        {[{value:"2023",label:"Founded"},{value:"50+",label:"Projects"},{value:"30+",label:"Clients"},{value:"100%",label:"Passion"}].map((s,i)=>(<div key={i} className="glass rounded-2xl p-6 text-center"><div className="text-3xl font-bold text-purple-500 mb-1">{s.value}</div><div className="text-sm text-gray-400">{s.label}</div></div>))}
      </div></section>
    </div>
  );
}
