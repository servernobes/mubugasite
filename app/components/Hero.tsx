import { cacheTag } from "next/cache";
import Image from "next/image";
import Link from "next/link";
import { createCachedClient } from "@/lib/supabase/cached";
import HeroSlider, { type Slide } from "./HeroSlider";

// Shown in the photo area until slider photos are added (Admin → Homepage Photos)
function BrandPanel() {
  return (
    <div className="absolute inset-0 overflow-hidden bg-gradient-to-br from-brand to-brand-deep">
      <div aria-hidden className="absolute -right-24 -top-24 w-96 h-96 rounded-full bg-white/5" />
      <div aria-hidden className="absolute -left-16 -bottom-28 w-80 h-80 rounded-full bg-white/5" />
      <div className="absolute inset-0 flex items-center justify-center p-8">
        <div className="bg-white rounded-3xl shadow-2xl p-5 sm:p-7">
          <Image src="/MUSACCO Rural Development Emblem.png" alt="MUSACCO emblem" width={360} height={360} priority
            className="w-40 sm:w-56 lg:w-72 h-auto" />
        </div>
      </div>
      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/40 to-transparent px-5 sm:px-8 pt-16 pb-6">
        <p className="text-white font-bold text-lg sm:text-2xl">&ldquo;Financial services rooted in our community&rdquo;</p>
        <p className="text-white/75 text-sm mt-1">Mubuga SACCO Ltd · Kisoro</p>
      </div>
    </div>
  );
}

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
      {/* Big photo slider on the left, words on the right (stacked on phones: photo first) */}
      <div className="grid grid-cols-1 lg:grid-cols-12">
        <div className="relative lg:col-span-7 h-[58vh] min-h-[320px] max-h-[520px] sm:h-[460px] sm:max-h-none lg:h-[calc(100svh-120px)] lg:min-h-[560px] lg:max-h-[820px] bg-brand">
          {slides.length > 0 ? <HeroSlider slides={slides} /> : <BrandPanel />}
        </div>

        <div className="lg:col-span-5 flex items-center">
          <div className="w-full max-w-xl mx-auto lg:mx-0 px-4 sm:px-8 lg:px-10 xl:px-14 py-10 lg:py-12">
            {/* SACCO motto (Rufumbira/Kinyarwanda) — never machine-translated */}
            <div className="mb-5">
              <span className="notranslate inline-block bg-accent/10 text-accent-ink text-xs sm:text-sm font-bold italic px-3.5 py-1.5 rounded-full"
                translate="no" lang="rw">
                &ldquo;Ikigega cy&rsquo;Abaturage Kirwanya Ubukene&rdquo;
              </span>
              <p className="text-gray-500 text-xs mt-1.5 ml-1">The people&rsquo;s fund that fights poverty</p>
            </div>
            <h1 className="text-3xl sm:text-4xl xl:text-5xl font-extrabold text-brand-ink leading-[1.15] mb-5">
              Growing Together.<br />
              <span className="text-accent-ink">Building Financial</span><br />
              Futures.
            </h1>
            <p className="text-gray-600 text-base sm:text-lg leading-relaxed mb-7">
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
                { label: "Est. 2005", sub: "Serving Kisoro since 2005" },
                { label: "Multiple Products", sub: "Loans & Savings" },
              ].map((t) => (
                <div key={t.label}>
                  <p className="font-bold text-brand-ink text-xs sm:text-sm">{t.label}</p>
                  <p className="text-gray-500 text-xs mt-0.5 leading-snug">{t.sub}</p>
                </div>
              ))}
            </div>
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
