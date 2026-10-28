import { cacheTag } from "next/cache";
import { createCachedClient } from "@/lib/supabase/cached";
import { DEFAULT_RUFUMBIRA_WORDS, parseRules } from "@/lib/rufumbira";

// Colours chosen in the admin (Appearance page), stored in site_settings.
const HEX = /^#[0-9a-fA-F]{6}$/;

export default async function ThemeStyle() {
  "use cache";
  cacheTag("site-settings"); // cleared by /api/revalidate when the admin saves
  const supabase = createCachedClient();
  const { data: rows } = await supabase
    .from("site_settings")
    .select("key, value")
    .in("key", ["theme_primary", "theme_accent", "theme_highlight", "rufumbira_words"]);

  const s: Record<string, string> = {};
  (rows ?? []).forEach((r) => { s[r.key] = r.value.trim(); });

  // Only accept plain hex values so nothing else can be injected into the stylesheet
  const vars = [
    HEX.test(s.theme_primary ?? "")   && `--brand:${s.theme_primary};`,
    HEX.test(s.theme_accent ?? "")    && `--accent:${s.theme_accent};`,
    HEX.test(s.theme_highlight ?? "") && `--gold:${s.theme_highlight};`,
  ].filter(Boolean).join("");

  // Runs before first paint. The site is always shown in light mode (the dark-mode button was removed),
  // so any dark choice saved by an earlier visit is cleared. Also marks pages shown in Rufumbira or
  // Rukiga/Runyankore ("lang-translated") so the layout can make room for longer words.
  const script = `(function(){try{document.documentElement.classList.remove("dark");localStorage.removeItem("theme");document.documentElement.classList.toggle("lang-translated",(function(c){var i=c.indexOf("googtrans=/en/");return i>-1&&c.slice(i+14,i+16)!=="en"})(document.cookie))}catch(e){}})()`;

  // Rufumbira word swaps for TranslateLoader (JSON; "<" escaped so the text can't close the script tag)
  const words = JSON.stringify(parseRules(s.rufumbira_words ?? DEFAULT_RUFUMBIRA_WORDS)).replace(/</g, "\\u003c");

  return (
    <>
      {vars && <style>{`html:root{${vars}}`}</style>}
      <script dangerouslySetInnerHTML={{ __html: script }} />
      <script id="rf-words" type="application/json" dangerouslySetInnerHTML={{ __html: words }} />
    </>
  );
}
