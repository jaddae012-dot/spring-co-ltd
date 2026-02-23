import Link from "next/link";

interface SubsidiaryFooterProps {
  name: string;
  color: string;
  links: { href: string; label: string }[];
  description: string;
}

export default function SubsidiaryFooter({
  name,
  color,
  links,
  description,
}: SubsidiaryFooterProps) {
  return (
    <footer className="bg-[#060e1a] border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div>
            <h3 className="text-lg font-bold mb-3" style={{ color }}>
              {name}
            </h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              {description}
            </p>
            <p className="text-gray-600 text-xs mt-4">
              A subsidiary of{" "}
              <Link href="/" className="text-green-400 hover:text-green-300 transition-colors">
                SPRING.CO.LTD
              </Link>
            </p>
          </div>

          <div>
            <h4 className="text-white font-semibold text-sm mb-3">Quick Links</h4>
            <ul className="space-y-2">
              {links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-400 text-sm hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold text-sm mb-3">
              Part of SPRING.CO.LTD
            </h4>
            <p className="text-gray-500 text-sm mb-4">
              Building Tomorrow&apos;s Enterprises Today
            </p>
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-sm text-green-400 hover:text-green-300 transition-colors"
            >
              Visit SPRING.CO.LTD
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-white/5 text-center">
          <p className="text-gray-600 text-xs">
            © {new Date().getFullYear()} {name} — A SPRING.CO.LTD Company. All
            rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
