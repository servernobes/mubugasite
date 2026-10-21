"use client";
import { useState, useMemo } from "react";

type Method = "reducing" | "flat";

export default function LoanCalculator() {
  const [amount, setAmount] = useState(1000000);
  const [rate, setRate] = useState(1.8);
  const [months, setMonths] = useState(12);
  const [method, setMethod] = useState<Method>("reducing");

  const results = useMemo(() => {
    const r = rate / 100;
    if (method === "flat") {
      const interest = amount * r * months;
      const total = amount + interest;
      const monthly = total / months;
      return { monthly, total, interest };
    }
    // Reducing balance
    if (r === 0) {
      const m = amount / months;
      return { monthly: m, total: amount, interest: 0 };
    }
    const m = (amount * r * Math.pow(1 + r, months)) / (Math.pow(1 + r, months) - 1);
    const total = m * months;
    return { monthly: m, total, interest: total - amount };
  }, [amount, rate, months, method]);

  const fmt = (n: number) => "UGX " + Math.round(n).toLocaleString();

  return (
    <section id="calculator" className="section-pad bg-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <span className="section-label">Tools</span>
            <h2 className="section-title">Loan Repayment Calculator</h2>
            <p className="text-gray-500 mt-3 max-w-xl mx-auto text-sm">
              All MUSACCO loans are at <strong className="text-brand-ink">1.8% per month on reducing balance</strong>. Use this tool to estimate your repayments.
            </p>
          </div>

          <div className="bg-tint rounded-2xl border border-line p-5 sm:p-7 md:p-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
              {/* Inputs */}
              <div className="space-y-7">
                {/* Method selector */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Calculation Method</label>
                  <div className="flex gap-2">
                    {(["reducing", "flat"] as Method[]).map((m) => (
                      <button key={m} onClick={() => setMethod(m)}
                        className={`flex-1 py-2 px-2 rounded-lg text-xs sm:text-sm font-semibold border transition-colors ${method === m ? "bg-brand text-white border-brand-ink" : "bg-surface text-gray-600 border-line hover:border-brand-ink"}`}>
                        {m === "reducing" ? "Reducing Balance" : "Flat Rate"}
                      </button>
                    ))}
                  </div>
                  <p className="text-xs text-gray-400 mt-1.5">Select the method applicable to your loan. Confirm with SACCO staff.</p>
                </div>

                {[
                  { label: "Loan Amount (UGX)", val: fmt(amount), min: 100000, max: 50000000, step: 100000, value: amount, set: setAmount, lo: "100K", hi: "50M" },
                  { label: "Monthly Interest Rate (%)", val: `${rate}%`, min: 0.5, max: 10, step: 0.5, value: rate, set: setRate, lo: "0.5%", hi: "10%" },
                  { label: "Loan Term (months)", val: `${months} mo`, min: 1, max: 60, step: 1, value: months, set: setMonths, lo: "1 month", hi: "60 months" },
                ].map((f) => (
                  <div key={f.label}>
                    <div className="flex justify-between mb-2">
                      <label className="text-sm font-semibold text-gray-700">{f.label}</label>
                      <span className="text-brand-ink font-bold text-sm">{f.val}</span>
                    </div>
                    <input type="range" min={f.min} max={f.max} step={f.step} value={f.value}
                      onChange={(e) => f.set(Number(e.target.value))} className="w-full accent-brand"/>
                    <div className="flex justify-between text-xs text-gray-400 mt-1">
                      <span>{f.lo}</span><span>{f.hi}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Results */}
              <div className="flex flex-col gap-4 justify-center">
                <div className="bg-brand rounded-xl p-5 sm:p-6 text-center">
                  <p className="text-white/70 text-sm mb-1">Estimated Monthly Payment</p>
                  <p className="text-2xl sm:text-3xl font-extrabold text-gold break-all">{fmt(results.monthly)}</p>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-surface rounded-xl border border-line p-3 sm:p-4 text-center">
                    <p className="text-gray-400 text-xs mb-1">Total Repayment</p>
                    <p className="text-brand-ink font-bold text-sm sm:text-base break-all">{fmt(results.total)}</p>
                  </div>
                  <div className="bg-surface rounded-xl border border-line p-3 sm:p-4 text-center">
                    <p className="text-gray-400 text-xs mb-1">Total Interest</p>
                    <p className="text-accent-ink font-bold text-sm sm:text-base break-all">{fmt(results.interest)}</p>
                  </div>
                </div>
                <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
                  <p className="text-amber-800 text-xs leading-relaxed">
                    <strong>Disclaimer:</strong> These figures are estimates for illustration only. Actual rates, fees and repayment schedules must be confirmed with Mubuga SACCO staff before applying.
                  </p>
                </div>
                <a href="/contact?enquiry=loans"
                  className="block text-center bg-accent hover:bg-accent-hover text-white font-bold px-6 py-3 rounded-lg transition-colors">
                  Enquire About a Loan
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
