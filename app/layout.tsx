import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import TopBar from "./components/TopBar";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import MobileCTA from "./components/MobileCTA";
import ThemeStyle from "./components/ThemeStyle";
import TranslateLoader from "./components/TranslateLoader";
import VisitTracker from "./components/VisitTracker";
import { SITE_URL } from "@/lib/site-url";
import { KEYWORDS, SITE_DESCRIPTION, SITE_NAME, organizationJsonLd } from "@/lib/seo";

// Business details for Google; "<" escaped so the text can't close the script tag
const ORG_JSON_LD = JSON.stringify(
  organizationJsonLd(["https://x.com/mubugasacco", "https://www.tiktok.com/@musacco11"]),
).replace(/</g, "\\u003c");

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  // Google Search Console "HTML tag" verification: set NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION in Vercel
  ...(process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION
    ? { verification: { google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION } }
    : {}),
  title: {
    default: "Mubuga SACCO Ltd – Savings & Loans in Kisoro, Uganda",
    template: "%s | Mubuga SACCO Ltd",
  },
  description: SITE_DESCRIPTION,
  keywords: KEYWORDS,
  applicationName: SITE_NAME,
  openGraph: { siteName: SITE_NAME, locale: "en_UG", type: "website", title: SITE_NAME, description: SITE_DESCRIPTION },
  twitter: { card: "summary_large_image", site: "@mubugasacco", title: SITE_NAME, description: SITE_DESCRIPTION },
  robots: { index: true, follow: true },
  icons: {
    icon: [
      { url: "/musacco-logo.png", type: "image/png" },
    ],
    shortcut: "/musacco-logo.png",
    apple: "/musacco-logo.png",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={geistSans.variable} suppressHydrationWarning>
      <head>
        <ThemeStyle />
        <link rel="icon" href="/musacco-logo.png" type="image/png"/>
        <link rel="shortcut icon" href="/musacco-logo.png" type="image/png"/>
        <link rel="apple-touch-icon" href="/musacco-logo.png"/>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: ORG_JSON_LD }} />
      </head>
      <body className="min-h-full flex flex-col">
        <TopBar />
        <Navbar />
        {/* pb-14 ensures content is not hidden behind the mobile sticky CTA bar */}
        <main className="flex-1 pb-14 lg:pb-0">{children}</main>
        <Footer />
        <MobileCTA />
        <TranslateLoader />
        <VisitTracker />
      </body>
    </html>
  );
}
