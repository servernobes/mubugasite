import Link from "next/link";
import { createClient } from "@/lib/supabase/server";

export default async function About() {
  const supabase = await createClient();
  const { data: aboutVideos } = await supabase
    .from("videos")
    .select("id, title, video_url, thumbnail_url")
    .eq("published", true)
    .eq("section", "about")
    .order("sort_order")
    .limit(1);

  const introVideo = aboutVideos?.[0] ?? null;

  return (
    <section id="about" className="section-pad bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-14 items-center">

          {/* Image / Video panel */}
          <div className="relative pb-8 md:pb-10">
            <div className="bg-[#001E5A] rounded-2xl h-64 sm:h-[320px] md:h-[380px] overflow-hidden">
              {introVideo ? (
                <video
                  src={introVideo.video_url}
                  poster={introVideo.thumbnail_url ?? undefined}
                  controls
                  preload="metadata"
                  className="w-full h-full object-cover"
                  aria-label={introVideo.title}
                >
                  Your browser does not support video playback.
                </video>
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <div className="text-center text-white/25 px-8">
                    <svg className="w-20 h-20 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1}
                        d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"/>
                    </svg>
                    <p className="text-sm">Add community photograph</p>
                  </div>
                </div>
              )}
            </div>
            {/* Values pills */}
            <div className="absolute -bottom-5 left-4 right-4 grid grid-cols-3 gap-2">
              {["Trust", "Integrity", "Community"].map((v) => (
                <div key={v} className="bg-white border border-[#E2E2EA] rounded-lg py-2 text-center shadow-sm">
                  <p className="text-[#001E5A] font-bold text-xs">{v}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Content */}
          <div className="pt-2 md:pt-0">
            <span className="section-label">About Us</span>
            <h2 className="section-title mb-4 md:mb-5">Financial Services Rooted in Our Community</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              Mubuga SACCO Ltd is a member-owned savings and credit cooperative registered and operating in
              Nyakinama Sub-county, Kisoro District, Uganda. We provide accessible savings and credit
              services to members in the community.
            </p>
            <p className="text-gray-600 leading-relaxed mb-6">
              Our cooperative exists to help members save regularly, access affordable credit and work
              towards productive financial goals. We serve farmers, traders, households, small business
              owners and other community members across Kisoro.
            </p>

            <div className="grid grid-cols-2 gap-3 mb-7">
              <div className="bg-[#FAFAF5] rounded-xl p-4 border border-[#E2E2EA]">
                <div className="w-8 h-8 bg-[#001E5A]/10 rounded-lg flex items-center justify-center mb-2">
                  <svg className="w-4 h-4 text-[#001E5A]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                </div>
                <h4 className="font-bold text-[#001E5A] text-sm mb-1">Our Mission</h4>
                <p className="text-gray-500 text-xs leading-relaxed">[To be confirmed by management]</p>
              </div>
              <div className="bg-[#FAFAF5] rounded-xl p-4 border border-[#E2E2EA]">
                <div className="w-8 h-8 bg-[#FFE100]/20 rounded-lg flex items-center justify-center mb-2">
                  <svg className="w-4 h-4 text-[#001E5A]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
                  </svg>
                </div>
                <h4 className="font-bold text-[#001E5A] text-sm mb-1">Our Vision</h4>
                <p className="text-gray-500 text-xs leading-relaxed">[To be confirmed by management]</p>
              </div>
            </div>

            <Link href="/about"
              className="inline-flex items-center gap-2 text-[#001E5A] font-semibold text-sm hover:underline">
              Learn More About Us
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3"/>
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
