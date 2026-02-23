import SubsidiaryNavbar from "@/components/SubsidiaryNavbar";
import SubsidiaryFooter from "@/components/SubsidiaryFooter";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: { template: "%s — SPRING CO-OPERATIVE UNION", default: "SPRING CO-OPERATIVE UNION — Empowering Communities" },
  description: "A cooperative union empowering members through savings, credit, and community development across Ghana.",
};

const navLinks = [
  { href: "/spring-cooperative", label: "Home" },
  { href: "/spring-cooperative/services", label: "Services" },
  { href: "/spring-cooperative/membership", label: "Membership" },
  { href: "/spring-cooperative/about", label: "About" },
  { href: "/spring-cooperative/contact", label: "Contact" },
];

export default function SpringCooperativeLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SubsidiaryNavbar
        name="SPRING CO-OP"
        shortName="Spring Co-op"
        icon="🤝"
        color="#eab308"
        gradient="from-yellow-500 to-amber-600"
        links={navLinks}
        ctaLabel="Join Now"
        ctaHref="/spring-cooperative/membership"
      />
      {children}
      <SubsidiaryFooter
        name="SPRING CO-OPERATIVE UNION"
        color="#eab308"
        links={navLinks}
        description="Empowering communities through cooperative savings, investments, and financial inclusion across Ghana."
      />
    </>
  );
}
