import SubsidiaryNavbar from "@/components/SubsidiaryNavbar";
import SubsidiaryFooter from "@/components/SubsidiaryFooter";
import { subsidiaries } from "@/data/subsidiaries";
import type { Metadata } from "next";

const subsidiary = subsidiaries.find((s) => s.id === "fast-cleaners");
if (!subsidiary) throw new Error("Fast Cleaners subsidiary data not found");

export const metadata: Metadata = {
  title: { template: `%s — ${subsidiary.name}`, default: `${subsidiary.name} — ${subsidiary.description}` },
  description: subsidiary.longDescription,
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
        {...subsidiary}
        links={navLinks}
        ctaLabel="Book Cleaning"
        ctaHref="/fast-cleaners/book"
      />
      {children}
      <SubsidiaryFooter
        name={subsidiary.name}
        color={subsidiary.color}
        links={navLinks}
        description={subsidiary.description}
      />
    </>
  );
}
