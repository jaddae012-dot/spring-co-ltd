import SubsidiaryNavbar from "@/components/SubsidiaryNavbar";
import SubsidiaryFooter from "@/components/SubsidiaryFooter";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: { default: "SPRING STUDIO GH — Creative Powerhouse", template: "%s — SPRING STUDIO GH" },
  description: "A creative powerhouse delivering world-class design, branding, and digital media solutions.",
};

const navLinks = [
  { href: "/sparrow-studio", label: "Home" },
  { href: "/sparrow-studio/services", label: "Services" },
  { href: "/sparrow-studio/portfolio", label: "Portfolio" },
  { href: "/sparrow-studio/about", label: "About" },
  { href: "/sparrow-studio/contact", label: "Contact" },
];

export default function springstudioLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SubsidiaryNavbar name="SPRING STUDIO GH" shortName="SPRING STUDIO" icon="🎨" color="#a855f7" gradient="from-purple-500 to-violet-600" links={navLinks} ctaLabel="Start a Project" ctaHref="/sparrow-studio/contact" />
      <main className="min-h-screen">{children}</main>
      <SubsidiaryFooter name="SPRING STUDIO GH" color="#a855f7" description="A creative powerhouse delivering world-class design, branding, and digital media solutions." links={navLinks} />
    </>
  );
}
