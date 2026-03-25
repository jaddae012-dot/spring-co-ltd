import SubsidiaryNavbar from "@/components/SubsidiaryNavbar";
import SubsidiaryFooter from "@/components/SubsidiaryFooter";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: { default: "PRIME COLLEGE — Excellence in Education", template: "%s — PRIME COLLEGE" },
  description: "Excellence in education — empowering the next generation with knowledge, skills, and values.",
};

const navLinks = [
  { href: "/prime-college", label: "Home" },
  { href: "/prime-college/programs", label: "Programs" },
  { href: "/prime-college/admissions", label: "Admissions" },
  { href: "/prime-college/about", label: "About" },
  { href: "/prime-college/login", label: "Login" },
  { href: "/prime-college/contact", label: "Contact" },
];

export default function PrimeCollegeLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SubsidiaryNavbar name="PRIME COLLEGE" shortName="Prime College" logo="/logos/Prime%20College.png" icon="🎓" color="#3b82f6" gradient="from-blue-500 to-indigo-600" links={navLinks} ctaLabel="Apply Now" ctaHref="/prime-college/admissions" />
      <main className="min-h-screen">{children}</main>
      <SubsidiaryFooter name="PRIME COLLEGE" color="#3b82f6" description="Excellence in education — empowering the next generation with knowledge, skills, and values." links={navLinks} />
    </>
  );
}
