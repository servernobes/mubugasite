// Google Maps helpers for branch locations.
// branches.map_embed_src (set in the admin) may hold any of:
//   • coordinates          "-1.2853, 29.6926"
//   • a place / address    "Mubuga, Nyakinama, Kisoro"
//   • an embed URL         "https://www.google.com/maps/embed?pb=…"
//   • the full embed code  '<iframe src="https://www.google.com/maps/embed?pb=…" …>'
// When it is empty, the branch address is used. Every result shows a red location pin.

type BranchLocation = { name: string; address: string | null; map_embed_src: string | null };

const COORDS = /^\s*(-?\d{1,2}(?:\.\d+)?)\s*,\s*(-?\d{1,3}(?:\.\d+)?)\s*$/;

function placeQuery(b: BranchLocation): string {
  const v = b.map_embed_src?.trim() ?? "";
  const c = v.match(COORDS);
  if (c) return `${c[1]},${c[2]}`;
  if (v && !/^https?:|<iframe/i.test(v)) return v;                    // admin typed a place name
  return [b.address || b.name, "Kisoro, Uganda"].filter(Boolean).join(", ");
}

/** iframe src for the branch map */
export function mapEmbedSrc(b: BranchLocation): string {
  const v = b.map_embed_src?.trim() ?? "";
  const fromCode = v.match(/src=["']([^"']+)["']/i)?.[1];                // pasted <iframe …> code
  const url = fromCode ?? v;
  if (/^https:\/\/(www\.)?google\.[a-z.]+\/maps\/embed/i.test(url)) return url;
  return `https://maps.google.com/maps?q=${encodeURIComponent(placeQuery(b))}&z=15&output=embed`;
}

/** Link that opens Google Maps directions to the branch */
export function directionsUrl(b: BranchLocation): string {
  return `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(placeQuery(b))}`;
}
