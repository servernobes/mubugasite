"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { readLang } from "./LanguageSwitcher";

// Records one anonymous page view per page visited (page_views table, see supabase/analytics.sql).
// Stored: page path, referring site (first page of a visit only), device type, language and a random
// browser id for counting unique visitors. No names, IP addresses or cookies.

const BOT = /bot|crawl|spider|slurp|preview|lighthouse|headless|facebookexternalhit|whatsapp\/|curl|wget/i;

function visitorId(): string {
  try {
    let id = localStorage.getItem("vid");
    if (!id) { id = crypto.randomUUID(); localStorage.setItem("vid", id); }
    return id;
  } catch {
    return "unknown";
  }
}

function device(): "mobile" | "tablet" | "desktop" {
  const w = window.innerWidth;
  return w < 640 ? "mobile" : w < 1024 ? "tablet" : "desktop";
}

// Referring site's host name, only on the first page of a browser session and only if it's another site
function source(): string | null {
  try {
    if (sessionStorage.getItem("visit-started")) return null;
    sessionStorage.setItem("visit-started", "1");
  } catch {}
  try {
    const host = document.referrer ? new URL(document.referrer).hostname : "";
    return host && host !== location.hostname ? host.slice(0, 100) : null;
  } catch {
    return null;
  }
}

export default function VisitTracker() {
  const path = usePathname();

  useEffect(() => {
    if (!path || BOT.test(navigator.userAgent) || (navigator as Navigator & { webdriver?: boolean }).webdriver) return;
    if (location.hostname === "localhost" || location.hostname === "127.0.0.1") return;   // don't count local testing
    createClient()
      .from("page_views")
      .insert({ path: path.slice(0, 300), source: source(), visitor_id: visitorId(), device: device(), lang: readLang() })
      .then(() => {}, () => {});   // never interrupt the visitor if recording fails
  }, [path]);

  return null;
}
