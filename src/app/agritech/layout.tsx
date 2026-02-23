import SubsidiaryNavbar from "@/components/SubsidiaryNavbar";
import SubsidiaryFooter from "@/components/SubsidiaryFooter";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: { default: "AGRITECH — Smart Farming Solutions", template: "%s — AGRITECH" },
  description: "Pioneering agricultural technology solutions for modern farming and sustainable food production across Africa.",
};

const navLinks = [
  { href: "/agritech", label: "Home" },
  { href: "/agritech/services", label: "Solutions" },
  { href: "/agritech/about", label: "About" },
  { href: "/agritech/contact", label: "Contact" },
];

export default function AgritechLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SubsidiaryNavbar name="AGRITECH" shortName="Agritech" icon="🌾" color="#22c55e" gradient="from-green-500 to-emerald-600" links={navLinks} ctaLabel="Get Started" ctaHref="/agritech/contact" />
      <main className="min-h-screen">{children}</main>
      <SubsidiaryFooter name="AGRITECH" color="#22c55e" description="Pioneering agricultural technology solutions for modern farming and sustainable food production across Africa." links={navLinks} />
    </>
  );
}
