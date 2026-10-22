// Rufumbira word swaps.
// Google has no Rufumbira, so the site uses its Kinyarwanda (rw) translation and then swaps
// Kinyarwanda words for the ones Bafumbira use (e.g. amafaranga → amashilling).
// Staff edit the list in the admin ("Rufumbira Words"), stored in site_settings.rufumbira_words,
// one rule per line:  kinyarwanda word = rufumbira word

export type WordRule = [from: string, to: string];

export const DEFAULT_RUFUMBIRA_WORDS = `amafaranga = amashilling
ifaranga = isente`;

export function parseRules(text: string | null | undefined): WordRule[] {
  return (text ?? "")
    .split("\n")
    .map((line) => line.split("="))
    .filter((parts) => parts.length === 2)
    .map(([a, b]) => [a.trim(), b.trim()] as WordRule)
    .filter(([a, b]) => a.length > 1 && b.length > 0 && a.length <= 60 && b.length <= 60)
    // longest first, so "amafaranga" is swapped before a shorter rule like "ifaranga" could touch it
    .sort((x, y) => y[0].length - x[0].length)
    .slice(0, 200);
}

// Keep the original's capitals: ALL CAPS stays all caps, a leading capital stays a leading capital
function matchCase(original: string, replacement: string): string {
  if (original.length > 1 && original === original.toUpperCase() && original !== original.toLowerCase()) return replacement.toUpperCase();
  const first = original[0];
  return first && first === first.toUpperCase() && first !== first.toLowerCase()
    ? replacement[0].toUpperCase() + replacement.slice(1)
    : replacement;
}

/** Swap words inside one piece of text. Also catches joined forms such as y'amafaranga or n'amafaranga. */
export function swapWords(text: string, rules: WordRule[]): string {
  let out = text;
  for (const [from, to] of rules) {
    const lower = out.toLowerCase();
    const needle = from.toLowerCase();
    if (!lower.includes(needle)) continue;
    let result = "";
    let i = 0;
    for (let at = lower.indexOf(needle); at !== -1; at = lower.indexOf(needle, i)) {
      result += out.slice(i, at) + matchCase(out.slice(at, at + from.length), to);
      i = at + from.length;
    }
    out = result + out.slice(i);
  }
  return out;
}
