// One icon per loan product (24×24 outline paths, drawn with stroke). Keys are the loan slugs;
// any loan added later in the admin gets the fallback credit-card icon.
const LOAN_ICONS: Record<string, string> = {
  business: "M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z", // briefcase
  agricultural: "M12 21V11m0 4c0-4.5 3-7.5 7.5-7.5 0 4.5-3 7.5-7.5 7.5zm0-4C12 6.5 9 3.5 4.5 3.5 4.5 8 7.5 11 12 11z",                                                                // sprouting plant
  "school-fees": "M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422A12.083 12.083 0 0121 17.5c0 .5-.03 1-.09 1.5M12 14l-6.16-3.422A12.083 12.083 0 003 17.5c0 .5.03 1 .09 1.5M12 14v7", // graduation cap
  development: "M13 7h8m0 0v8m0-8l-8 8-4-4-6 6",                                                                                                              // rising arrow
  "home-improvement": "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6", // house
  "boda-boda": "M5.5 18a3 3 0 100-6 3 3 0 000 6zm13 0a3 3 0 100-6 3 3 0 000 6zM5.5 15h4l3-5h3.5l2.5 5M12.5 10l-1-3H9",                                          // motorbike
  medical: "M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z",                     // heart
  emergency: "M13 10V3L4 14h7v7l9-11h-7z",                                                                                                                      // lightning bolt
};

const FALLBACK = "M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"; // credit card

export function loanIcon(slug: string): string {
  return LOAN_ICONS[slug] ?? FALLBACK;
}
