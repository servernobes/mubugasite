"use cache";
import { cacheTag } from "next/cache";
import type { Metadata } from "next";
import Image from "next/image";
import { createCachedClient } from "@/lib/supabase/cached";

export const metadata: Metadata = {
  title: "Media Centre",
  description: "Videos and photos from Mubuga SACCO Ltd and our community in Kisoro.",
};

export default async function MediaPage() {
  "use cache";
  cacheTag("cms"); // cleared by /api/revalidate when the admin saves
  const supabase = createCachedClient();
  const [{ data: videoData }, { data: photoData }] = await Promise.all([
    supabase.from("videos")
      .select("id, title, description, video_url, thumbnail_url")
      .eq("published", true)
      .order("sort_order"),
    supabase.from("gallery_images")
      .select("id, storage_url, alt_text, caption")
      .eq("published", true)
      .in("section", ["gallery", "general"])   // homepage photos are managed separately
      .order("sort_order"),
  ]);

  const videos = videoData ?? [];
  const photos = photoData ?? [];

  return (
    <>
      <div className="bg-gradient-to-b from-tint-strong to-surface border-b border-line py-10 sm:py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <span className="section-label">Media Centre</span>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-brand-ink mt-1">Videos &amp; Photos</h1>
          <p className="text-gray-600 mt-3 max-w-2xl text-sm sm:text-base">
            See Mubuga SACCO at work: member stories, product guides, events and life in our community.
          </p>
          {videos.length > 0 && photos.length > 0 && (
            <div className="mt-6 flex flex-wrap gap-2">
              {[["Videos", "#videos"], ["Photos", "#photos"]].map(([label, href]) => (
                <a key={href} href={href}
                  className="text-xs font-semibold text-gray-600 hover:text-brand-ink border border-line hover:border-brand-ink/30 bg-surface px-3 py-1.5 rounded-full transition-colors">
                  {label}
                </a>
              ))}
            </div>
          )}
        </div>
      </div>

      {videos.length === 0 && photos.length === 0 && (
        <section className="section-pad bg-tint">
          <p className="text-center text-gray-400 py-10 text-sm">Videos and photos will appear here soon.</p>
        </section>
      )}

      {videos.length > 0 && (
        <section id="videos" className="section-pad bg-tint scroll-mt-28">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <h2 className="section-title mb-8">Videos</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {videos.map((v) => (
                <div key={v.id} className="bg-surface rounded-xl border border-line overflow-hidden hover:shadow-md transition-shadow">
                  <div className="relative bg-brand aspect-video w-full overflow-hidden">
                    <video src={v.video_url} poster={v.thumbnail_url ?? undefined} controls preload="metadata"
                      className="w-full h-full object-cover" aria-label={v.title}>
                      Your browser does not support video playback.
                    </video>
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold text-brand-ink text-sm leading-snug mb-1">{v.title}</h3>
                    {v.description && <p className="text-gray-500 text-xs leading-relaxed">{v.description}</p>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {photos.length > 0 && (
        <section id="photos" className="section-pad bg-surface scroll-mt-28">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <h2 className="section-title mb-8">Photo Gallery</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {photos.map((p) => (
                <a key={p.id} href={p.storage_url} target="_blank" rel="noopener noreferrer"
                  className="group block rounded-xl overflow-hidden border border-line bg-tint">
                  <div className="relative aspect-[4/3]">
                    <Image src={p.storage_url} alt={p.alt_text || p.caption || "Mubuga SACCO photo"} fill
                      sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-300" />
                  </div>
                  {p.caption && <p className="px-3 py-2 text-xs text-gray-600">{p.caption}</p>}
                </a>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
