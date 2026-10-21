import { cacheTag } from "next/cache";
import { createCachedClient } from "@/lib/supabase/cached";

// Colours and default mode chosen in the admin (Appearance page), stored in site_settings.
const HEX = /^#[0-9a-fA-F]{6}$/;
const MODES = ["light", "dark", "system"] as const;

export default async function ThemeStyle() {
  "use cache";
  cacheTag("site-settings"); // cleared by /api/revalidate when the admin saves
  const supabase = createCachedClient();
  const { data: rows } = await supabase
    .from("site_settings")
    .select("key, value")
    .in("key", ["theme_primary", "theme_accent", "theme_highlight", "theme_default_mode"]);

  const s: Record<string, string> = {};
  (rows ?? []).forEach((r) => { s[r.key] = r.value.trim(); });

  // Only accept plain hex values so nothing else can be injected into the stylesheet
  const vars = [
    HEX.test(s.theme_primary ?? "")   && `--brand:${s.theme_primary};`,
    HEX.test(s.theme_accent ?? "")    && `--accent:${s.theme_accent};`,
    HEX.test(s.theme_highlight ?? "") && `--gold:${s.theme_highlight};`,
  ].filter(Boolean).join("");

  const mode = MODES.includes(s.theme_default_mode as (typeof MODES)[number]) ? s.theme_default_mode : "light";

  // Runs before first paint: visitor's saved choice, else the admin default, else light
  const script = `(function(){try{var m=localStorage.getItem("theme")||${JSON.stringify(mode)};if(m==="system")m=matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light";document.documentElement.classList.toggle("dark",m==="dark")}catch(e){}})()`;

  return (
    <>
      {vars && <style>{`html:root{${vars}}`}</style>}
      <script dangerouslySetInnerHTML={{ __html: script }} />
    </>
  );
}
