"use client";
import { useEffect } from "react";
import { LANGUAGES, readLang } from "./LanguageSwitcher";
import { swapWords, type WordRule } from "@/lib/rufumbira";

declare global {
  interface Window {
    google?: { translate?: { TranslateElement: new (opts: object, id: string) => unknown } };
    googleTranslateElementInit?: () => void;
  }
}

// Watches the page and swaps words in any text Google translates (or that appears later, e.g. after
// navigating). Returns a function that stops watching.
function startRufumbiraSwaps(): (() => void) | undefined {
  let rules: WordRule[] = [];
  try { rules = JSON.parse(document.getElementById("rf-words")?.textContent || "[]"); } catch {}
  if (!rules.length) return;

  const fixNode = (node: Node) => {
    if (node.nodeType === Node.TEXT_NODE) {
      if (node.parentElement?.closest(".notranslate, script, style")) return;
      const before = node.nodeValue ?? "";
      const after = swapWords(before, rules);
      if (after !== before) node.nodeValue = after;       // unchanged text is left alone, so no endless loop
      return;
    }
    if (node.nodeType !== Node.ELEMENT_NODE) return;
    const el = node as Element;
    if (el.closest(".notranslate, script, style")) return;  // never touch untranslated bits (codes, names)
    const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
    for (let t = walker.nextNode(); t; t = walker.nextNode()) {
      if (!t.parentElement?.closest(".notranslate, script, style")) fixNode(t);
    }
  };

  // Batch changes: Google rewrites many text nodes at once
  let pending = new Set<Node>();
  let frame = 0;
  const flush = () => { frame = 0; const nodes = pending; pending = new Set(); nodes.forEach(fixNode); };
  const observer = new MutationObserver((records) => {
    for (const r of records) {
      if (r.type === "characterData") pending.add(r.target);
      r.addedNodes.forEach((n) => pending.add(n));
    }
    if (!frame) frame = requestAnimationFrame(flush);
  });
  observer.observe(document.body, { subtree: true, childList: true, characterData: true });
  fixNode(document.body);
  return () => { observer.disconnect(); cancelAnimationFrame(frame); };
}

// Loads Google Translate only when the visitor picked a language other than English.
// It runs after hydration, so React's server and client HTML still match.
export default function TranslateLoader() {
  useEffect(() => {
    const lang = readLang();
    if (lang === "en") return;

    // Rufumbira: Google outputs Kinyarwanda, so swap in the words Bafumbira use (see lib/rufumbira.ts).
    // Started before the "already loaded" check so it also restarts when React re-runs this effect.
    const stopSwaps = lang === "rw" ? startRufumbiraSwaps() : undefined;
    if (document.getElementById("gt-script")) return stopSwaps;

    // Google replaces text nodes React owns; keep React from crashing when it later updates them
    // (well-known workaround: https://github.com/facebook/react/issues/11538)
    const removeChild = Node.prototype.removeChild;
    Node.prototype.removeChild = function <T extends Node>(this: Node, child: T): T {
      if (child.parentNode !== this) return child;
      return removeChild.call(this, child) as T;
    };
    const insertBefore = Node.prototype.insertBefore;
    Node.prototype.insertBefore = function <T extends Node>(this: Node, node: T, ref: Node | null): T {
      if (ref && ref.parentNode !== this) return node;
      return insertBefore.call(this, node, ref) as T;
    };

    window.googleTranslateElementInit = () => {
      new window.google!.translate!.TranslateElement(
        { pageLanguage: "en", includedLanguages: LANGUAGES.map((l) => l.code).join(","), autoDisplay: false },
        "google_translate_element",
      );
    };
    const s = document.createElement("script");
    s.id = "gt-script";
    s.src = "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
    s.async = true;
    document.body.appendChild(s);
    return stopSwaps;
  }, []);

  return <div id="google_translate_element" hidden />;
}
