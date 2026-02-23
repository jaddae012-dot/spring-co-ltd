import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

export const metadata: Metadata = {
  title: "SPRING.CO.LTD — Building Tomorrow's Enterprises Today",
  description:
    "SPRING.CO.LTD is a dynamic multinational conglomerate driving innovation across agriculture, technology, education, logistics, and community development.",
  keywords: [
    "SPRING.CO.LTD",
    "multinational",
    "conglomerate",
    "Ghana",
    "Africa",
    "AGRITECH",
    "SPRING STUDIO GH",
    "FASTRIDER",
    "PRIME COLLEGE",
    "FAST CLEANERS",
    "SPRING CO-OPERATIVE UNION",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} bg-[#0a1628] text-white antialiased`}
      >
        <Navbar />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
