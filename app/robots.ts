import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site-url";

// Served at /robots.txt — lets search engines crawl the site and points them to the sitemap.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/", disallow: ["/api/"] },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
