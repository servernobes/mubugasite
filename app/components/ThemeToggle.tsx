"use client";

// Light/dark switch. Icons are swapped with CSS (dark: variant) so server and client markup match.
export default function ThemeToggle({ className = "" }: { className?: string }) {
  const toggle = () => {
    const dark = !document.documentElement.classList.contains("dark");
    document.documentElement.classList.toggle("dark", dark);
    try { localStorage.setItem("theme", dark ? "dark" : "light"); } catch {}
  };

  return (
    <button type="button" onClick={toggle} aria-label="Switch light or dark mode" title="Light / dark mode"
      className={`inline-flex items-center justify-center w-9 h-9 rounded-lg border border-line text-gray-600 hover:text-brand-ink hover:bg-tint transition-colors ${className}`}>
      {/* Moon — shown in light mode */}
      <svg className="w-4.5 h-4.5 dark:hidden" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"/>
      </svg>
      {/* Sun — shown in dark mode */}
      <svg className="w-4.5 h-4.5 hidden dark:block" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"/>
      </svg>
    </button>
  );
}
