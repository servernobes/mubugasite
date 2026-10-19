"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

const loanLinks = [
  { label: "Business / Commercial Loan", href: "/loans/business" },
  { label: "Agricultural Loan", href: "/loans/agricultural" },
  { label: "School Fees Loan", href: "/loans/school-fees" },
  { label: "Development Loan", href: "/loans/development" },
  { label: "Home Improvement Loan", href: "/loans/home-improvement" },
  { label: "Boda Boda Loan", href: "/loans/boda-boda" },
  { label: "Medical Loan", href: "/loans/medical" },
  { label: "Emergency Loan", href: "/loans/emergency" },
];

const savingsLinks = [
  { label: "Ordinary Savings", href: "/savings/ordinary" },
  { label: "Voluntary Savings", href: "/savings/voluntary" },
  { label: "Junior / Minor Savings", href: "/savings/junior" },
  { label: "VSLA Savings", href: "/savings/vsla" },
  { label: "School Fees Collection", href: "/savings/school-fees-collection" },
];

const moreLinks = [
  { label: "Services", href: "/services" },
  { label: "MSACCO Mobile", href: "/msacco" },
  { label: "Branches", href: "/branches" },
  { label: "News & Updates", href: "/news" },
  { label: "FAQs", href: "/faqs" },
  { label: "Contact Us", href: "/contact" },
];

const navLinks = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Loans", href: "/loans", children: loanLinks },
  { label: "Savings", href: "/savings", children: savingsLinks },
  { label: "More", href: "#", children: moreLinks },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [dropdown, setDropdown] = useState<string | null>(null);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-[#E2E2EA] shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between h-[66px]">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 shrink-0">
          <Image src="/musacco-logo.png" alt="Mubuga SACCO Ltd" width={48} height={48} className="h-11 w-auto" priority/>
          <div className="leading-tight hidden sm:block">
            <p className="text-[#001E5A] font-extrabold text-sm tracking-tight">Mubuga SACCO</p>
            <p className="text-[#D2003C] text-[10px] font-bold tracking-widest uppercase">Ltd · Kisoro, Uganda</p>
          </div>
        </Link>

        {/* Desktop nav */}
        <ul className="hidden lg:flex items-center gap-0.5">
          {navLinks.map((l) => (
            <li key={l.label} className="relative"
              onMouseEnter={() => l.children && setDropdown(l.label)}
              onMouseLeave={() => setDropdown(null)}>
              <Link href={l.href}
                className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-[#0D0D2B] hover:text-[#001E5A] hover:bg-[#F4F4F6] rounded-md transition-colors">
                {l.label}
                {l.children && (
                  <svg className="w-3.5 h-3.5 opacity-40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7"/>
                  </svg>
                )}
              </Link>
              {l.children && dropdown === l.label && (
                <div className="absolute top-full left-0 w-56 bg-white border border-[#E2E2EA] rounded-xl shadow-lg py-1 z-50">
                  {l.children.map((c) => (
                    <Link key={c.href} href={c.href}
                      className="block px-4 py-2.5 text-sm text-[#0D0D2B] hover:bg-[#F4F4F6] hover:text-[#001E5A] transition-colors">
                      {c.label}
                    </Link>
                  ))}
                </div>
              )}
            </li>
          ))}
        </ul>

        {/* Desktop CTA */}
        <div className="hidden lg:flex items-center gap-3">
          <Link href="/contact"
            className="bg-[#D2003C] hover:bg-[#A8002E] text-white text-sm font-bold px-5 py-2.5 rounded-lg transition-colors">
            Contact Us
          </Link>
        </div>

        {/* Mobile toggle */}
        <button onClick={() => setOpen(!open)} className="lg:hidden p-2 rounded-md text-[#001E5A] hover:bg-[#F4F4F6]" aria-label="Toggle menu">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {open
              ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/>
              : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16"/>}
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="lg:hidden border-t border-[#E2E2EA] bg-white px-4 sm:px-6 pb-4 max-h-[75vh] overflow-y-auto">
          {navLinks.map((l) => (
            <div key={l.label}>
              <div className="flex items-center justify-between">
                <Link href={l.href} onClick={() => !l.children && setOpen(false)}
                  className="block py-3 text-sm font-semibold text-[#0D0D2B]">
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
                <div className="pl-3 pb-2 border-l-2 border-[#D2003C] ml-1 mb-1">
                  {l.children.map((c) => (
                    <Link key={c.href} href={c.href} onClick={() => setOpen(false)}
                      className="block py-2 text-sm text-gray-500 hover:text-[#001E5A]">
                      {c.label}
                    </Link>
                  ))}
                </div>
              )}
              <div className="border-b border-[#E2E2EA]"/>
            </div>
          ))}
          <Link href="/contact" onClick={() => setOpen(false)}
            className="mt-4 block text-center bg-[#D2003C] hover:bg-[#A8002E] text-white text-sm font-bold py-3 rounded-lg transition-colors">
            Contact Us
          </Link>
        </div>
      )}
    </nav>
  );
}
