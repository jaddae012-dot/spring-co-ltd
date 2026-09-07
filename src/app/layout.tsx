import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CompanySecretaryTracker from "@/components/CompanySecretaryTracker";

const themeInitScript = `(() => {
  try {
    const key = 'spring-theme';
    const saved = localStorage.getItem(key);
    const systemLight = window.matchMedia('(prefers-color-scheme: light)').matches;
    const theme = saved === 'light' || saved === 'dark' ? saved : (systemLight ? 'light' : 'dark');
    const root = document.documentElement;
    root.classList.remove('theme-dark', 'theme-light');
    root.classList.add(theme === 'light' ? 'theme-light' : 'theme-dark');
    root.setAttribute('data-theme', theme);
  } catch (_) {}
})();`;

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
  metadataBase: new URL("https://spring-co-ltd.vercel.app"),
  openGraph: {
    title: "SPRING.CO.LTD — Building Tomorrow's Enterprises Today",
    description:
      "A dynamic multinational conglomerate driving innovation across agriculture, technology, education, logistics, and community development.",
    url: "https://spring-co-ltd.vercel.app",
    siteName: "SPRING.CO.LTD",
    images: [
      {
        url: "/logos/SPRING.CO.LTD.png",
        width: 512,
        height: 512,
        alt: "SPRING.CO.LTD Logo",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "SPRING.CO.LTD — Building Tomorrow's Enterprises Today",
    description:
      "A dynamic multinational conglomerate driving innovation across agriculture, technology, education, logistics, and community development.",
    images: ["/logos/SPRING.CO.LTD.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className="bg-(--app-bg) text-(--app-text) antialiased app-theme-transition">
        <Navbar />
        <CompanySecretaryTracker />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
