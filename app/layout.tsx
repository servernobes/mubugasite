import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import TopBar from "./components/TopBar";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import MobileCTA from "./components/MobileCTA";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "Mubuga SACCO Ltd – Development Through Rural Saving",
    template: "%s | Mubuga SACCO Ltd",
  },
  description:
    "Mubuga SACCO Ltd offers savings and credit services to members in Kisoro District, Uganda. Agricultural loans, business loans, savings accounts and more.",
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
    <html lang="en" className={geistSans.variable}>
      <head>
        <link rel="icon" href="/musacco-logo.png" type="image/png"/>
        <link rel="shortcut icon" href="/musacco-logo.png" type="image/png"/>
        <link rel="apple-touch-icon" href="/musacco-logo.png"/>
      </head>
      <body className="min-h-full flex flex-col">
        <TopBar />
        <Navbar />
        {/* pb-14 ensures content is not hidden behind the mobile sticky CTA bar */}
        <main className="flex-1 pb-14 lg:pb-0">{children}</main>
        <Footer />
        <MobileCTA />
      </body>
    </html>
  );
}
