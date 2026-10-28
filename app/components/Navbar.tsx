"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import LanguageSwitcher from "./LanguageSwitcher";
import WelcomeTour from "./WelcomeTour";

// MSACCO is reached from the Services page, so it has no menu entry
const moreLinks = [
  { label: "Media Centre", href: "/media" },
  { label: "Reports & Publications", href: "/publications" },
  { label: "FAQs", href: "/faqs" },
];

type NavLink = { label: string; href: string; also?: string[]; children?: { label: string; href: string }[] };

const navLinks: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Membership", href: "/membership" },
  { label: "Savings & Loans", href: "/products", also: ["/loans", "/savings"] },
  { label: "Services", href: "/services", also: ["/msacco"] },
  { label: "Branches", href: "/branches" },
  { label: "News & Updates", href: "/news" },
  { label: "Contact Us", href: "/contact" },
  { label: "More", href: "#", children: moreLinks },
];

// Current page = exact match, or a sub-page (/news/some-article); "also" lists related sections
function isActive(path: string, l: NavLink): boolean {
  if (l.children) return l.children.some((c) => isActive(path, c));
  if (l.href === "/") return path === "/";
  return [l.href, ...(l.also ?? [])].some((h) => path === h || path.startsWith(h + "/"));
}

export default function Navbar() {
  const path = usePathname();
  const [open, setOpen] = useState(false);
  const [dropdown, setDropdown] = useState<string | null>(null);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);

  return (
    <nav className="sticky top-0 z-50 bg-surface border-b border-line shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between h-[72px] lg:h-[84px]">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 shrink-0">
          <Image src="/musacco-logo.png" alt="Mubuga SACCO Ltd" width={128} height={128} className="h-14 lg:h-16 w-auto" priority/>
          {/* Name text shows on phones/tablets and very wide screens; hidden on laptops so all menu links fit */}
          <div className="leading-tight hidden sm:block lg:hidden 2xl:block">
            <p className="text-brand-ink font-extrabold text-sm tracking-tight notranslate" translate="no">Mubuga SACCO</p>
            <p className="text-accent-ink text-[10px] font-bold tracking-widest uppercase">Ltd · Kisoro, Uganda</p>
          </div>
        </Link>

        {/* Desktop nav */}
        <ul data-tour="menu" data-nav="desktop" className="hidden lg:flex items-center gap-0.5">
          {navLinks.map((l) => (
            <li key={l.label} className="relative"
              onMouseEnter={() => l.children && setDropdown(l.label)}
              onMouseLeave={() => setDropdown(null)}>
              <Link href={l.href} aria-current={isActive(path, l) && !l.children ? "page" : undefined}
                className={`relative flex items-center gap-1 px-1.5 xl:px-2.5 py-2 text-[13px] xl:text-sm whitespace-nowrap rounded-md transition-colors hover:text-brand-ink hover:bg-soft ${
                  isActive(path, l) ? "font-semibold text-brand-ink" : "font-medium text-ink"}`}>
                {l.label}
                {/* Underline marking the current page */}
                {isActive(path, l) && <span aria-hidden className="absolute left-2 right-2 bottom-0.5 h-0.5 rounded-full bg-brand-ink/35" />}
                {l.children && (
                  <svg className="w-3.5 h-3.5 opacity-40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7"/>
                  </svg>
                )}
              </Link>
              {l.children && dropdown === l.label && (
                <div className="absolute top-full left-0 w-64 bg-surface border border-line rounded-xl shadow-lg py-1 z-50 max-h-[70vh] overflow-y-auto">
                  {l.children.map((c) => (
                    <Link key={c.href} href={c.href} aria-current={isActive(path, c) ? "page" : undefined}
                      className={`block px-4 py-2.5 text-sm hover:bg-soft hover:text-brand-ink transition-colors ${
                        isActive(path, c) ? "font-semibold text-brand-ink" : "text-ink"}`}>
                      {c.label}
                    </Link>
                  ))}
                </div>
              )}
            </li>
          ))}
        </ul>

        {/* Desktop CTA */}
        <div data-nav="desktop" className="hidden lg:flex items-center gap-2">
          <div data-tour="language"><LanguageSwitcher /></div>
          {/* Red button only on very wide screens; "Contact Us" is also in the menu */}
          <Link href="/contact"
            className="hidden 2xl:inline-block bg-accent hover:bg-accent-hover text-white text-sm font-bold px-5 py-2.5 rounded-lg transition-colors">
            Contact Us
          </Link>
        </div>

        {/* Mobile toggles */}
        <div data-nav="mobile" className="lg:hidden flex items-center gap-1.5 sm:gap-2">
        <div data-tour="language"><LanguageSwitcher /></div>
        <button data-tour="menu" onClick={() => setOpen(!open)} className="p-2 rounded-md text-brand-ink hover:bg-soft" aria-label="Toggle menu">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {open
              ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/>
              : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16"/>}
          </svg>
        </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div data-nav="mobile-menu" className="lg:hidden border-t border-line bg-surface px-4 sm:px-6 pb-4 max-h-[75vh] overflow-y-auto">
          {navLinks.map((l) => (
            <div key={l.label}>
              <div className="flex items-center justify-between">
                <Link href={l.href} onClick={() => !l.children && setOpen(false)}
                  aria-current={isActive(path, l) && !l.children ? "page" : undefined}
                  className={`flex items-center gap-2 py-3 text-sm ${isActive(path, l) ? "font-bold text-brand-ink" : "font-medium text-ink"}`}>
                  {isActive(path, l) && <span aria-hidden className="w-1 h-4 rounded-full bg-brand-ink/35" />}
                  {l.label}
                </Link>
                {l.children && (
                  <button onClick={() => setMobileExpanded(mobileExpanded === l.label ? null : l.label)}
                    className="p-1.5 text-gray-400">
                    <svg className={`w-4 h-4 transition-transform ${mobileExpanded === l.label ? "rotate-180" : ""}`}
                      fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7"/>
                    </svg>
                  </button>
                )}
              </div>
              {l.children && mobileExpanded === l.label && (
                <div className="pl-3 pb-2 border-l-2 border-accent-ink ml-1 mb-1">
                  {l.children.map((c) => (
                    <Link key={c.href} href={c.href} onClick={() => setOpen(false)}
                      aria-current={isActive(path, c) ? "page" : undefined}
                      className={`block py-2 text-sm hover:text-brand-ink ${isActive(path, c) ? "font-semibold text-brand-ink" : "text-gray-500"}`}>
                      {c.label}
                    </Link>
                  ))}
                </div>
              )}
              <div className="border-b border-line"/>
            </div>
          ))}
          <Link href="/contact" onClick={() => setOpen(false)}
            className="mt-4 block text-center bg-accent hover:bg-accent-hover text-white text-sm font-bold py-3 rounded-lg transition-colors">
            Contact Us
          </Link>
        </div>
      )}
      <WelcomeTour />
    </nav>
  );
}
