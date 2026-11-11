"use client";

import { useEffect, useState } from "react";
import { getLenis } from "@/lib/runtime";
import { links, nav } from "@/content/site";
import Logo from "./ui/Logo";

export default function Nav({ home = true }: { home?: boolean }) {
  const [open, setOpen] = useState(false);
  const [compact, setCompact] = useState(false);

  // collapse the link pill once the page is scrolled, like a toolbar tucking away
  useEffect(() => {
    const onScroll = () => setCompact(window.scrollY > 120);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const lenis = getLenis();
    if (open) lenis?.stop();
    else lenis?.start();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const href = (h: string) => (home || !h.startsWith("#") ? h : `/${h}`);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50">
        <div className="container-x flex items-start justify-between pt-5">
          {/* left pill: logo + links */}
          <div className="flex h-14 items-center rounded-2xl bg-tile/90 pl-5 pr-2 backdrop-blur-md">
            <a href={home ? "#top" : "/"} aria-label="Acadex home" className="mr-2">
              <Logo />
            </a>
            <nav
              aria-label="Main"
              className={`hidden items-center overflow-hidden transition-[max-width,opacity] duration-700 ease-[var(--ease-out-quint)] lg:flex ${
                compact ? "max-w-0 opacity-0" : "max-w-[720px] opacity-100"
              }`}
            >
              {nav.map((item) => (
                <a
                  key={item.href}
                  href={href(item.href)}
                  className="whitespace-nowrap rounded-xl px-3 py-2 text-[15px] text-ink/80 transition-colors hover:text-ink"
                >
                  {item.label}
                </a>
              ))}
            </nav>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="menu"
              aria-label={open ? "Close menu" : "Open menu"}
              className={`grid h-10 w-10 place-items-center rounded-xl text-ink transition-colors hover:bg-black/5 ${compact ? "lg:grid" : "lg:hidden"}`}
            >
              <svg viewBox="0 0 16 16" className="h-4 w-4" fill="currentColor" aria-hidden>
                {open ? (
                  <path d="M3.5 3.5l9 9m0-9-9 9" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                ) : (
                  <>
                    <circle cx="8" cy="3.5" r="1.25" />
                    <circle cx="8" cy="8" r="1.25" />
                    <circle cx="8" cy="12.5" r="1.25" />
                  </>
                )}
              </svg>
            </button>
          </div>

          {/* right pill: account */}
          <div className="flex h-14 items-center gap-1 rounded-2xl bg-tile/90 p-2 backdrop-blur-md">
            <a href={links.login} className="hidden rounded-xl px-4 py-2 text-[15px] text-ink/80 transition-colors hover:text-ink sm:block">
              Log In
            </a>
            <a href={links.register} className="rounded-xl bg-ink px-4 py-2.5 text-[15px] font-medium text-white transition-colors hover:bg-ink-2">
              Signup
            </a>
          </div>
        </div>
      </header>

      {/* menu sheet */}
      <div
        id="menu"
        className={`fixed inset-x-0 top-0 z-40 origin-top transition-all duration-500 ease-[var(--ease-out-quint)] ${
          open ? "pointer-events-auto translate-y-0 opacity-100" : "pointer-events-none -translate-y-4 opacity-0"
        }`}
      >
        <div className="container-x pt-[92px]">
          <div className="rounded-3xl bg-white p-3 shadow-[0_30px_80px_-30px_rgba(0,0,0,0.25)] ring-1 ring-line">
            <ul className="grid gap-1 sm:grid-cols-2 lg:grid-cols-3">
              {nav.map((item) => (
                <li key={item.href}>
                  <a
                    href={href(item.href)}
                    onClick={() => setOpen(false)}
                    className="block rounded-2xl px-5 py-4 text-[22px] tracking-[-0.03em] transition-colors hover:bg-canvas"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
              <li className="sm:hidden">
                <a href={links.login} className="block rounded-2xl px-5 py-4 text-[22px] tracking-[-0.03em] text-muted hover:bg-canvas">
                  Log In
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      {open && <button type="button" aria-label="Close menu" className="fixed inset-0 z-30 cursor-default" onClick={() => setOpen(false)} />}
    </>
  );
}
