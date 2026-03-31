"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import ThemeToggle from "@/components/ThemeToggle";

interface SubNavLink {
  href: string;
  label: string;
}

interface SubsidiaryNavbarProps {
  name: string;
  shortName: string;
  logo?: string;
  logoSize?: "md" | "lg";
  icon: string;
  color: string;
  gradient: string;
  links: SubNavLink[];
  ctaLabel?: string;
  ctaHref?: string;
}

function getBrandTextClass(color: string): string {
  const normalized = color.toLowerCase();
  if (normalized === "#22c55e") return "text-green-500";
  if (normalized === "#b91c1c") return "text-red-700";
  if (normalized === "#a855f7") return "text-purple-500";
  if (normalized === "#eab308") return "text-yellow-500";
  if (normalized === "#3b82f6") return "text-blue-500";
  return "text-white";
}

export default function SubsidiaryNavbar({
  name,
  logo,
  logoSize = "md",
  icon,
  color,
  gradient,
  links,
  ctaLabel,
  ctaHref,
}: SubsidiaryNavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const logoSizeClass = logoSize === "lg" ? "w-14 h-14" : "w-10 h-10";
  const logoPixelSize = logoSize === "lg" ? 56 : 40;
  const brandTextClass = getBrandTextClass(color);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!isOpen) {
      document.body.style.overflow = "";
      return;
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsOpen(false);
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [isOpen]);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass glass-blur">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top bar - back to parent */}
        <div className="flex items-center justify-between h-10 border-b border-white/5 text-xs">
          <Link
            href="/"
            className="text-gray-500 hover:text-green-400 transition-colors flex items-center gap-1"
          >
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            SPRING.CO.LTD
          </Link>
          <ThemeToggle compact />
        </div>

        {/* Main navbar */}
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href={links[0]?.href || "/"} className="flex items-center space-x-3 group">
            {logo ? (
              <div className={`${logoSizeClass} rounded-xl flex items-center justify-center overflow-hidden`}>
                <Image src={logo} alt={name} width={logoPixelSize} height={logoPixelSize} className="w-full h-full object-contain" />
              </div>
            ) : (
              <div
                className={`w-10 h-10 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center text-xl transition-transform group-hover:scale-110`}
              >
                {icon}
              </div>
            )}
            <span className={`text-lg font-bold tracking-tight ${brandTextClass}`}>
              {name}
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-1">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-3 py-2 rounded-lg text-sm font-medium text-gray-300 hover:text-white hover:bg-white/10 transition-colors duration-200"
              >
                {link.label}
              </Link>
            ))}
            {ctaLabel && ctaHref && (
              <Link
                href={ctaHref}
                className={`ml-3 px-5 py-2 rounded-xl bg-gradient-to-r ${gradient} text-white text-sm font-semibold shadow-lg transition-colors duration-200`}
              >
                {ctaLabel}
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg text-gray-300 hover:text-white hover:bg-white/10 transition-colors"
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Nav */}
        {isOpen && (
          <div className="md:hidden pb-4 border-t border-white/10 animate-in fade-in duration-200">
            <div className="flex flex-col space-y-1 pt-3">
              {ctaLabel && ctaHref && (
                <Link
                  href={ctaHref}
                  onClick={() => setIsOpen(false)}
                  className={`mx-4 mb-2 px-5 py-3 rounded-xl bg-gradient-to-r ${gradient} text-white text-sm font-semibold text-center transition-colors`}
                >
                  {ctaLabel}
                </Link>
              )}
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="px-4 py-3 rounded-lg text-sm font-medium text-gray-300 hover:text-white hover:bg-white/10 transition-colors"
                >
                  {link.label}
                </Link>
              ))}
              <div className="px-4 pt-2">
                <ThemeToggle />
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
