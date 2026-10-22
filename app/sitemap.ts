import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site-url";

// Tells Google (Search Console → Sitemaps) which pages exist. Served at /sitemap.xml.
const PAGES: [path: string, priority: number][] = [
  ["/", 1],
  ["/about", 0.8], ["/membership", 0.9], ["/products", 0.9], ["/services", 0.8], ["/msacco", 0.8],
  ["/branches", 0.8], ["/contact", 0.8], ["/news", 0.7], ["/media", 0.5], ["/publications", 0.6], ["/faqs", 0.5],
  ["/loans", 0.8], ["/loans/business", 0.7], ["/loans/agricultural", 0.7], ["/loans/school-fees", 0.7],
  ["/loans/development", 0.7], ["/loans/home-improvement", 0.7], ["/loans/boda-boda", 0.7],
  ["/loans/medical", 0.7], ["/loans/emergency", 0.7],
  ["/savings", 0.8], ["/savings/ordinary", 0.7], ["/savings/voluntary", 0.7], ["/savings/fixed-deposit", 0.7],
  ["/savings/junior", 0.7], ["/savings/individual", 0.7], ["/savings/group", 0.7], ["/savings/institutional", 0.7],
  ["/privacy-policy", 0.2], ["/terms-of-use", 0.2],
];

export default function sitemap(): MetadataRoute.Sitemap {
  return PAGES.map(([path, priority]) => ({ url: `${SITE_URL}${path}`, changeFrequency: "weekly", priority }));
}
