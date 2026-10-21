// Intro box above the loan list (same style as the savings intro), with the NB rate line from the signboard
export default function LoansIntro({ rate }: { rate: string }) {
  return (
    <div className="bg-tint rounded-xl border border-line p-5 sm:p-6 mb-5 sm:mb-6">
      <h2 className="font-bold text-brand-ink text-base sm:text-lg mb-2">Borrowing with Mubuga SACCO</h2>
      <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">
        Members can access affordable credit for business, farming, school fees, housing, transport, health and emergencies.
        <strong className="text-brand-ink"> All loans are at {rate} on reducing balance.</strong> Agricultural loans come with a 3-month grace period.
      </p>
    </div>
  );
}
