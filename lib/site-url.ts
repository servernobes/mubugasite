// Public address of the website, used for the sitemap, robots.txt and metadata.
// Set NEXT_PUBLIC_SITE_URL in Vercel (e.g. https://mubugasacco.co.ug) once you have a custom domain;
// otherwise Vercel's production address is used.
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : "http://localhost:3000")
).replace(/\/$/, "");
