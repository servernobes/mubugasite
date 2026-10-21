import { cacheTag } from "next/cache";
import Image from "next/image";
import Link from "next/link";
import { createCachedClient } from "@/lib/supabase/cached";
import HeroSlider, { type Slide } from "./HeroSlider";

export default async function Hero() {
  "use cache";
  cacheTag("cms"); // cleared by /api/revalidate when the admin saves
  const supabase = createCachedClient();
  const { data } = await supabase
    .from("gallery_images")
    .select("id, storage_url, alt_text, caption")
    .eq("section", "hero")
    .eq("published", true)
    .order("sort_order")
    .limit(10);
  const slides: Slide[] = (data ?? []).map((r) => ({ id: r.id, url: r.storage_url, alt: r.alt_text, caption: r.caption }));

  return (
    <section id="home" className="bg-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 md:py-24 grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-12 items-center">
        {/* Text */}
        <div>
          <span className="inline-block bg-accent/10 text-accent-ink text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full mb-5">
            Kisoro District, Uganda — Est. SACCO
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-brand-ink leading-[1.15] mb-5 md:mb-6">
            Growing Together.<br />
            <span className="text-accent-ink">Building Financial</span><br />
            Futures.
          </h1>
          <p className="text-gray-600 text-lg leading-relaxed mb-8 max-w-lg">
            Discover savings and credit solutions designed to support your goals, strengthen your business and help your family move forward with Mubuga SACCO.
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <Link href="/loans"
              className="inline-flex items-center justify-center bg-brand hover:bg-brand-hover text-white font-bold px-7 py-3.5 rounded-lg transition-colors">
              Explore Our Loans
              <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3"/>
              </svg>
            </Link>
            <Link href="/savings"
              className="inline-flex items-center justify-center border-2 border-brand-ink text-brand-ink hover:bg-brand hover:text-white font-bold px-7 py-3.5 rounded-lg transition-colors">
              Start Saving
            </Link>
          </div>

          {/* Trust bar */}
          <div className="mt-8 pt-6 border-t border-line grid grid-cols-3 gap-3">
            {[
              { label: "Kisoro District", sub: "Head Office" },
              { label: "Est. SACCO", sub: "Kisoro, Uganda" },
              { label: "Multiple Products", sub: "Loans & Savings" },
            ].map((t) => (
              <div key={t.label}>
                <p className="font-bold text-brand-ink text-xs sm:text-sm">{t.label}</p>
                <p className="text-gray-500 text-xs mt-0.5 leading-snug">{t.sub}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Image panel — photo slider when the admin has added photos, otherwise a placeholder */}
        <div className="relative mt-4 md:mt-0">
          {slides.length > 0 ? (
            <div className="relative border border-line rounded-2xl overflow-hidden h-72 sm:h-[380px] md:h-[420px] bg-tint-strong">
              <HeroSlider slides={slides} />
            </div>
          ) : (
          <div className="bg-gradient-to-br from-tint-strong to-warm border border-line rounded-2xl overflow-hidden h-72 sm:h-[380px] md:h-[420px] flex items-end">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center text-brand-ink/30 px-8">
                <svg className="w-20 h-20 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"/>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"/>
                </svg>
                <p className="text-sm font-medium">Add SACCO photography here</p>
                <p className="text-xs mt-1 opacity-70">Farmers · Traders · Community members</p>
              </div>
            </div>
            <div className="relative z-20 m-4 sm:m-5 bg-surface/90 backdrop-blur rounded-xl border border-line px-5 py-4 shadow-sm">
              <p className="text-brand-ink font-bold text-base sm:text-lg">&ldquo;Financial services rooted in our community&rdquo;</p>
              <p className="text-gray-500 text-sm mt-1">Mubuga SACCO Ltd · Kisoro</p>
            </div>
          </div>
          )}
          {/* Floating logo badge */}
          <div className="hidden sm:block absolute -top-4 -right-2 md:-right-4 z-10 bg-white rounded-xl shadow-lg p-2.5 border border-line">
            <Image src="/musacco-logo.png" alt="MUSACCO" width={128} height={128} className="h-20 w-auto"/>
          </div>
        </div>
      </div>

      {/* Service highlights bar */}
      <div className="border-y border-line bg-tint">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-5 sm:py-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {[
            { icon: "M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2z", title: "Savings Solutions", desc: "Safe, accessible savings accounts for every member" },
            { icon: "M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064", title: "Agricultural Financing", desc: "Supporting farmers and rural livelihoods in Kisoro" },
            { icon: "M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4", title: "Business Support", desc: "Credit for traders, shops and small enterprises" },
            { icon: "M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z", title: "Member-Focused", desc: "A cooperative owned and run by its members" },
          ].map((h) => (
            <div key={h.title} className="flex items-start gap-3">
              <div className="bg-brand/10 rounded-lg p-2 shrink-0">
                <svg className="w-5 h-5 text-brand-ink" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={h.icon}/>
                </svg>
              </div>
              <div>
                <p className="font-semibold text-brand-ink text-sm">{h.title}</p>
                <p className="text-gray-500 text-xs mt-0.5 leading-snug">{h.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
