"use client";
import { useState } from "react";
import ProductList from "../components/ProductList";
import LoansIntro from "../components/LoansIntro";

type Loan = { id: string; slug: string; title: string; description: string };
type Saving = { id: string; slug: string; title: string; description: string };

interface Props {
  loans: Loan[];
  savings: Saving[];
  contact: { rate: string };
}

export default function ProductsTabs({ loans, savings, contact }: Props) {
  const [tab, setTab] = useState<"savings" | "loans">("savings");

  return (
    <>
      {/* Tab switcher — scrollable on mobile, fixed on desktop */}
      <div className="flex gap-2 sm:gap-3 mb-8 overflow-x-auto pb-1 -mx-4 px-4 sm:mx-0 sm:px-0 sm:overflow-visible">
        <button
          onClick={() => setTab("savings")}
          className={`flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-lg text-xs sm:text-sm font-bold transition-all whitespace-nowrap shrink-0 ${
            tab === "savings"
              ? "bg-brand text-white shadow-sm"
              : "bg-surface text-brand-ink border border-line hover:border-brand-ink/30"
          }`}
        >
          <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
              d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2z"/>
          </svg>
          Savings ({savings.length})
        </button>
        <button
          onClick={() => setTab("loans")}
          className={`flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-lg text-xs sm:text-sm font-bold transition-all whitespace-nowrap shrink-0 ${
            tab === "loans"
              ? "bg-brand text-white shadow-sm"
              : "bg-surface text-brand-ink border border-line hover:border-brand-ink/30"
          }`}
        >
          <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
              d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"/>
          </svg>
          Loans ({loans.length})
        </button>
      </div>

      {/* ── Savings tab ── */}
      {tab === "savings" && (
        <div>
          <div className="bg-tint rounded-xl border border-line p-5 sm:p-6 mb-5 sm:mb-6">
            <h2 className="font-bold text-brand-ink text-base sm:text-lg mb-2">Saving with Mubuga SACCO</h2>
            <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">
              Open a savings account and begin building your financial future. Regular saving helps you
              manage unexpected expenses, plan for school fees and work towards larger goals. Your savings
              also strengthen your position when applying for a loan.
            </p>
          </div>

          <ProductList kind="savings" items={savings} />
        </div>
      )}

      {/* ── Loans tab ── */}
      {tab === "loans" && (
        <div>
          <LoansIntro rate={contact.rate} />
          <ProductList kind="loans" items={loans} />
        </div>
      )}
    </>
  );
}
