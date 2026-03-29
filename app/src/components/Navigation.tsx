"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navigation() {
  const pathname = usePathname();

  const links = [
    { href: "/studio", label: "Studio" },
    { href: "/catalogue", label: "Catalogue" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-warm-white/80 backdrop-blur-xl border-b border-charcoal/5">
      <div className="max-w-[1440px] mx-auto px-8 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 bg-forest flex items-center justify-center">
            <span className="font-serif text-cream text-lg font-normal tracking-tight italic">
              SA
            </span>
          </div>
          <span className="font-serif text-charcoal text-sm tracking-[0.2em] uppercase font-normal hidden sm:block">
            Style Architect
          </span>
        </Link>

        {/* Links */}
        <div className="flex items-center gap-10">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-[13px] tracking-[0.15em] uppercase transition-colors ${
                pathname === link.href
                  ? "text-forest font-medium"
                  : "text-charcoal-light hover:text-forest"
              }`}
            >
              {link.label}
              {pathname === link.href && (
                <span className="block h-px bg-forest mt-0.5 animate-line-grow" />
              )}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
