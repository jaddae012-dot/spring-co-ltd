import SubsidiaryNavbar from "@/components/SubsidiaryNavbar";
import SubsidiaryFooter from "@/components/SubsidiaryFooter";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "FASTRIDER — Fast, Reliable Delivery",
    template: "%s — FASTRIDER",
  },
  description:
    "Fast, reliable, and efficient logistics and delivery services connecting businesses and communities.",
};

const navLinks = [
  { href: "/fastrider", label: "Home" },
  { href: "/fastrider/services", label: "Services" },
  { href: "/fastrider/pricing", label: "Pricing" },
  { href: "/fastrider/track", label: "Track" },
  { href: "/fastrider/about", label: "About" },
  { href: "/fastrider/contact", label: "Contact" },
];

export default function FastRiderLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <SubsidiaryNavbar
        name="FASTRIDER"
        shortName="FastRider"
        logo="/logos/fastrider.png"
        icon="🚀"
        color="#b91c1c"
        gradient="from-red-700 to-red-500"
        links={navLinks}
        ctaLabel="Book a Ride"
        ctaHref="/fastrider/book"
      />
      <main className="min-h-screen">{children}</main>
      <SubsidiaryFooter
        name="FASTRIDER"
        color="#b91c1c"
        description="Fast, reliable, and efficient logistics and delivery services connecting businesses and communities across Ghana."
        links={[
          ...navLinks,
          { href: "/fastrider/book", label: "Book a Ride" },
          { href: "/fastrider/become-rider", label: "Become a Rider" },
        ]}
      />
    </>
  );
}
