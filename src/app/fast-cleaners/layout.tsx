import SubsidiaryNavbar from "@/components/SubsidiaryNavbar";
import SubsidiaryFooter from "@/components/SubsidiaryFooter";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: { template: "%s — FAST CLEANERS", default: "FAST CLEANERS — Professional Cleaning Services" },
  description: "Professional cleaning services for homes, offices, and commercial spaces across Ghana.",
};

const navLinks = [
  { href: "/fast-cleaners", label: "Home" },
  { href: "/fast-cleaners/services", label: "Services" },
  { href: "/fast-cleaners/about", label: "About" },
  { href: "/fast-cleaners/contact", label: "Contact" },
];

export default function FastCleanersLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SubsidiaryNavbar
        name="FAST CLEANERS"
        shortName="Fast Cleaners"
        icon="🧹"
        color="#06b6d4"
        gradient="from-cyan-500 to-teal-600"
        links={navLinks}
        ctaLabel="Book Cleaning"
        ctaHref="/fast-cleaners/book"
      />
      {children}
      <SubsidiaryFooter
        name="FAST CLEANERS"
        color="#06b6d4"
        links={navLinks}
        description="Professional cleaning services delivering spotless results for homes, offices, and commercial spaces across Ghana."
      />
    </>
  );
}
