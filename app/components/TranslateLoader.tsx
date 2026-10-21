"use client";
import { useEffect } from "react";
import { LANGUAGES, readLang } from "./LanguageSwitcher";

declare global {
  interface Window {
    google?: { translate?: { TranslateElement: new (opts: object, id: string) => unknown } };
    googleTranslateElementInit?: () => void;
  }
}

// Loads Google Translate only when the visitor picked a language other than English.
// It runs after hydration, so React's server and client HTML still match.
export default function TranslateLoader() {
  useEffect(() => {
    if (readLang() === "en" || document.getElementById("gt-script")) return;

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
  }, []);

  return <div id="google_translate_element" hidden />;
}
