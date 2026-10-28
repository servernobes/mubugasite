import type { Metadata } from "next";
import { SITE_URL } from "./site-url";
import { MISSION, REG_NO } from "./sacco-profile";

// Search engine text for the site: page titles and descriptions, link previews (WhatsApp, Facebook, X)
// and the business details Google reads (JSON-LD in layout.tsx).

export const SITE_NAME = "Mubuga SACCO Ltd";

export const SITE_DESCRIPTION =
  "Mubuga SACCO Ltd (MUSACCO) is a member-owned savings and credit cooperative in Nyakinama, Kisoro District, Uganda, serving the community since 2005. Savings accounts, agricultural, business and school fees loans, and MSACCO mobile banking.";

// Made by app/opengraph-image.tsx; named on every page because a page's own openGraph replaces the site-wide one
export const SHARE_IMAGE = { url: "/opengraph-image", width: 1200, height: 630, alt: "Mubuga SACCO Ltd – Savings & Loans in Kisoro, Uganda" };

export const KEYWORDS = [
  "Mubuga SACCO", "MUSACCO", "Mubuga SACCO Ltd", "SACCO in Kisoro", "Kisoro SACCO", "Nyakinama SACCO",
  "savings and credit cooperative Uganda", "loans in Kisoro", "agricultural loans Uganda", "school fees loan",
  "boda boda loan", "savings account Kisoro", "MSACCO mobile banking", "Ikigega cy'abaturage kirwanya ubukene",
];

/**
 * Title, description, canonical link and link-preview text for one page.
 *   export const metadata = pageMeta("/about", "About Us", "Who we are …");
 */
export function pageMeta(path: string, title: string, description: string): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: { title: `${title} | ${SITE_NAME}`, description, url: path, siteName: SITE_NAME, locale: "en_UG", type: "website", images: [SHARE_IMAGE] },
    twitter: { card: "summary_large_image", title: `${title} | ${SITE_NAME}`, description, images: [SHARE_IMAGE.url] },
  };
}

/** Business details for Google (shown in search results and alongside the Google Business Profile). */
export function organizationJsonLd(sameAs: string[] = []) {
  return {
    "@context": "https://schema.org",
    "@type": "FinancialService",
    "@id": `${SITE_URL}/#organization`,
    name: SITE_NAME,
    alternateName: ["MUSACCO", "Mubuga SACCO"],
    slogan: "Development Through Rural Saving",
    description: MISSION,
    url: SITE_URL,
    logo: `${SITE_URL}/musacco-logo.png`,
    image: `${SITE_URL}/opengraph-image`,
    foundingDate: "2005",
    identifier: `Reg. No. ${REG_NO}`,
    email: "mubugasacco@gmail.com",
    telephone: "+256394841360",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Nyakinama Sub-county",
      postOfficeBoxNumber: "99",
      addressLocality: "Kisoro",
      addressRegion: "Kisoro District",
      addressCountry: "UG",
    },
    areaServed: { "@type": "AdministrativeArea", name: "Kisoro District, Uganda" },
    openingHoursSpecification: [
      { "@type": "OpeningHoursSpecification", dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"], opens: "08:00", closes: "17:00" },
      { "@type": "OpeningHoursSpecification", dayOfWeek: "Saturday", opens: "08:30", closes: "14:00" },
    ],
    currenciesAccepted: "UGX",
    ...(sameAs.length ? { sameAs } : {}),
  };
}
