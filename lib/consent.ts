"use client";
import { useSyncExternalStore } from "react";

// Visitor's cookie choice, stored in this browser only (localStorage "cookie-consent").
//   "all"       → settings remembered, Google Maps load automatically, anonymous visit counting
//   "essential" → settings remembered, Google Maps load automatically, NO visit counting
//   "reject"    → only what the site needs to work; no visit counting; maps load only when tapped
//   null        → not answered yet (the cookie banner is showing)
export type Consent = "all" | "essential" | "reject" | null;

const KEY = "cookie-consent";
const EVENT = "consent-change";

export function getConsent(): Consent {
  try {
    const v = localStorage.getItem(KEY);
    return v === "all" || v === "essential" || v === "reject" ? v : null;
  } catch {
    return null;
  }
}

export function setConsent(value: Exclude<Consent, null>) {
  try { localStorage.setItem(KEY, value); } catch {}
  window.dispatchEvent(new Event(EVENT));
}

/** Re-open the banner (footer "Cookie settings") */
export function resetConsent() {
  try { localStorage.removeItem(KEY); } catch {}
  window.dispatchEvent(new Event(EVENT));
}

function subscribe(cb: () => void) {
  window.addEventListener(EVENT, cb);
  window.addEventListener("storage", cb);   // other tabs
  return () => { window.removeEventListener(EVENT, cb); window.removeEventListener("storage", cb); };
}

/** Current choice; "pending" on the server and before the browser has read it (avoids hydration mismatch). */
export function useConsent(): Consent | "pending" {
  return useSyncExternalStore(subscribe, getConsent, () => "pending" as const);
}
