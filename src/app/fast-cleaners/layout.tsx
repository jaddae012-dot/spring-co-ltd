import SubsidiaryNavbar from "@/components/SubsidiaryNavbar";
import SubsidiaryFooter from "@/components/SubsidiaryFooter";
import { subsidiaries } from "@/data/subsidiaries";
import type { Metadata } from "next";

const subsidiary = subsidiaries.find((s) => s.id === "fast-cleaners");
if (!subsidiary) throw new Error("Fast Cleaners subsidiary data not found");
const fastCleaners = subsidiary;

export const metadata: Metadata = {
  title: { template: `%s — ${fastCleaners.name}`, default: `${fastCleaners.name} — ${fastCleaners.description}` },
  description: fastCleaners.longDescription,
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
        name={fastCleaners.name}
        shortName={fastCleaners.shortName}
        icon={fastCleaners.icon}
        logo={fastCleaners.logo}
        logoSize="lg"
        color={fastCleaners.color}
        gradient={fastCleaners.gradient}
        links={navLinks}
        ctaLabel="Book Cleaning"
        ctaHref="/fast-cleaners/book"
      />
      {children}
      <SubsidiaryFooter
        name={fastCleaners.name}
        color={fastCleaners.color}
        links={navLinks}
        description={fastCleaners.description}
      />
    </>
  );
}
