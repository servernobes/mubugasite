import { cacheTag } from "next/cache";
import Link from "next/link";
import MsaccoAppButtons from "./MsaccoAppButtons";
import { BandBackdrop, getHomePhotos } from "./HomePhotos";

// Homepage band right after Savings & Loans: bank on your phone via USSD or the MSACCO app.
export default async function MsaccoBanner() {
  "use cache";
  cacheTag("cms"); // cleared by /api/revalidate when the admin saves
  const { msacco: photo } = await getHomePhotos(["msacco"]);   // Admin → Homepage Photos → MSACCO band photo
  return (
    <section id="msacco" className="section-pad bg-surface scroll-mt-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="relative rounded-2xl bg-brand overflow-hidden">
          {photo && <BandBackdrop photo={photo} />}
          <div className="relative grid grid-cols-1 lg:grid-cols-5 gap-8 p-6 sm:p-8 md:p-10 items-center">
            <div className="lg:col-span-3">
              <div className="flex items-center gap-2 mb-3">
                <span className="bg-accent text-white text-xs font-black uppercase tracking-wider px-2.5 py-1 rounded-lg notranslate" translate="no">MSACCO</span>
                <span className="text-white/60 text-xs">Mobile banking</span>
              </div>
              <h2 className="text-white font-extrabold text-2xl sm:text-3xl leading-tight">Bank with Mubuga SACCO on your phone</h2>
              <p className="text-white/75 text-sm sm:text-base leading-relaxed mt-3 max-w-xl">
                Deposit savings, withdraw, repay loans and pay school fees any time, with the MSACCO app or by dialling a short code on MTN or Airtel.
              </p>
              <div className="mt-6">
                <p className="text-white/60 text-xs font-semibold uppercase tracking-wider mb-2">Get the app</p>
                <MsaccoAppButtons light />
              </div>
            </div>

            <div className="lg:col-span-2 space-y-3">
              <p className="text-white/60 text-xs font-semibold uppercase tracking-wider">Or dial</p>
              <div className="grid grid-cols-2 gap-2.5 notranslate" translate="no">
                {[["MTN", "*165*6*3#"], ["Airtel", "*185*7*3*1#"]].map(([net, code]) => (
                  <div key={net} className="bg-white/10 border border-white/20 rounded-xl px-4 py-3">
                    <p className="text-white/60 text-[11px] font-semibold uppercase tracking-wide">{net}</p>
                    <p className="text-white font-extrabold tracking-wider mt-0.5">{code}</p>
                  </div>
                ))}
              </div>
              <p className="text-white/60 text-xs">
                Institution ID: <strong className="text-white notranslate" translate="no">MUBUG/230256</strong>
              </p>
              <Link href="/services"
                className="inline-flex items-center gap-2 bg-accent hover:bg-accent-hover text-white font-bold text-sm px-5 py-2.5 rounded-lg transition-colors">
                How to join MSACCO
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3"/>
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
