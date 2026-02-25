import Link from "next/link";
import Image from "next/image";
import { subsidiaries } from "@/data/subsidiaries";
import { companyInfo } from "@/data/company";

export default function Footer() {
  return (
    <footer className="bg-[#060e1a] border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center space-x-3 mb-4">
              <Image src="/logos/SPRING.CO.LTD.png" alt="SPRING.CO.LTD" width={40} height={40} className="w-10 h-10 object-contain" />
              <span className="text-xl font-bold tracking-tight">
                SPRING<span className="text-green-400">.CO.LTD</span>
              </span>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed">
              {companyInfo.description}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-3">
              {[
                { href: "/", label: "Home" },
                { href: "/about", label: "About Us" },
                { href: "/subsidiaries", label: "Our Companies" },
                { href: "/office", label: "Digital Office" },
                { href: "/blog", label: "Blog" },
                { href: "/contact", label: "Contact" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-400 text-sm hover:text-green-400 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Our Companies */}
          <div>
            <h3 className="text-white font-semibold mb-4">Our Companies</h3>
            <ul className="space-y-3">
              {subsidiaries.map((sub) => (
                <li key={sub.id}>
                  <Link
                    href={sub.route}
                    className="text-gray-400 text-sm hover:text-green-400 transition-colors"
                  >
                    {sub.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3 text-sm text-gray-400">
              <li className="flex items-start space-x-2">
                <span>📍</span>
                <span>{companyInfo.address}</span>
              </li>
              <li className="flex items-start space-x-2">
                <span>📧</span>
                <span>{companyInfo.email}</span>
              </li>
              <li className="flex items-start space-x-2">
                <span>📞</span>
                <span>{companyInfo.phone}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} SPRING.CO.LTD. All rights reserved.
          </p>
          <div className="flex items-center space-x-6">
            <Link
              href="#"
              className="text-gray-500 text-sm hover:text-green-400 transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="#"
              className="text-gray-500 text-sm hover:text-green-400 transition-colors"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
