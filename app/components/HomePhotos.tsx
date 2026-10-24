import Image from "next/image";
import { createCachedClient } from "@/lib/supabase/cached";

// Single photos for homepage sections, set in Admin → Homepage Photos (gallery_images.section = key).
// A section without a photo simply shows no photo — nothing appears on the site until one is uploaded.
export type HomePhoto = { storage_url: string; alt_text: string };
export type PhotoSection = "about" | "agri" | "savings" | "loans" | "msacco" | "community" | "footer" | "hero" | "membership";

/** Latest published photo for each requested section (call from a "use cache" component). */
export async function getHomePhotos(sections: PhotoSection[]): Promise<Partial<Record<PhotoSection, HomePhoto>>> {
  const { data } = await createCachedClient().from("gallery_images")
    .select("section, storage_url, alt_text")
    .in("section", sections).eq("published", true)
    .order("created_at", { ascending: false });
  const out: Partial<Record<PhotoSection, HomePhoto>> = {};
  for (const r of data ?? []) {
    const s = r.section as PhotoSection;
    if (!out[s]) out[s] = { storage_url: r.storage_url, alt_text: r.alt_text };
  }
  return out;
}

/** Tall rounded photo shown beside a list (Savings & Accounts, Credit Products) */
export function SidePhoto({ photo, className = "" }: { photo: HomePhoto; className?: string }) {
  return (
    <div className={`relative rounded-2xl overflow-hidden border border-line aspect-[4/3] lg:aspect-[4/5] bg-tint-strong ${className}`}>
      <Image src={photo.storage_url} alt={photo.alt_text || "Mubuga SACCO"} fill
        sizes="(min-width: 1024px) 40vw, 100vw" className="object-cover" />
    </div>
  );
}

/** Photo behind a brand-coloured band, tinted so white text stays readable */
export function BandBackdrop({ photo }: { photo: HomePhoto }) {
  return (
    <>
      <Image src={photo.storage_url} alt="" fill sizes="100vw" className="object-cover" aria-hidden />
      <div aria-hidden className="absolute inset-0 bg-gradient-to-r from-brand via-brand/90 to-brand/70" />
    </>
  );
}
