"use client";

import { useState } from "react";
import { footer } from "@/content/site";
import { themes } from "@/lib/themes";
import { LogoMark } from "./ui/Logo";

const ink = { "--bg": themes.ink.bg, "--fg": themes.ink.fg, "--ac": themes.ink.ac } as React.CSSProperties;

export default function Footer({ home = true }: { home?: boolean }) {
  const [state, setState] = useState<"idle" | "sending" | "done" | "error">("idle");
  const href = (h: string) => (home || !h.startsWith("#") ? h : `/${h}`);

  async function subscribe(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    setState("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ topic: "newsletter", email: new FormData(form).get("email") }),
      });
      if (!res.ok) throw new Error();
      setState("done");
      form.reset();
    } catch {
      setState("error");
    }
  }

  return (
    <footer className="stage overflow-hidden" style={ink}>
      <div className="container-x pt-20">
        <div className="rule grid gap-12 border-t pt-14 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <LogoMark className="h-9 w-auto text-[var(--fg)]" />
            <p className="soft mt-5 max-w-[36ch] text-[15px] leading-relaxed">{footer.blurb}</p>
            <ul className="mt-5 space-y-2 text-[14px]">
              {footer.points.map((p) => (
                <li key={p} className="flex items-center gap-2.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-[var(--ac)]" />
                  {p}
                </li>
              ))}
            </ul>
          </div>

          {footer.groups.map((g) => (
            <div key={g.title} className="lg:col-span-2">
              <p className="kicker faintc">{g.title}</p>
              <ul className="mt-5 space-y-2.5">
                {g.links.map((l) => (
                  <li key={l.label}>
                    <a href={href(l.href)} className="text-[17px] tracking-[-0.02em] transition-opacity hover:opacity-60">
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div className="lg:col-span-4">
            <p className="kicker faintc">{footer.newsletter.title}</p>
            <p className="soft mt-5 max-w-[40ch] text-[15px] leading-relaxed">{footer.newsletter.body}</p>
            <form onSubmit={subscribe} className="card mt-5 flex gap-2 rounded-2xl p-1.5">
              <label className="sr-only" htmlFor="newsletter-email">
                Email
              </label>
              <input
                id="newsletter-email"
                name="email"
                type="email"
                required
                placeholder={footer.newsletter.placeholder}
                className="min-w-0 flex-1 bg-transparent px-3 text-[15px] outline-none placeholder:text-[color-mix(in_srgb,var(--fg)_40%,transparent)]"
              />
              <button
                type="submit"
                disabled={state === "sending"}
                className="shrink-0 rounded-[12px] bg-[var(--ac)] px-4 py-2.5 text-[14px] font-medium text-[var(--bg)] transition-opacity hover:opacity-90 disabled:opacity-60"
              >
                {footer.newsletter.cta}
              </button>
            </form>
            <p className="mt-2 h-5 text-[13px]" aria-live="polite">
              {state === "done" && <span className="accent">You&apos;re on the list.</span>}
              {state === "error" && <span className="text-[#ff8a8a]">Couldn&apos;t sign you up. Please try again.</span>}
            </p>
            <ul className="mt-4 flex gap-5">
              {footer.socials.map((s) => (
                <li key={s.label}>
                  <a href={s.href} target="_blank" rel="noopener noreferrer" className="text-[15px] transition-opacity hover:opacity-60">
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <p aria-hidden className="display mb-6 mt-16 select-none whitespace-nowrap text-center text-[19vw] leading-[0.82] tracking-[-0.01em]">
        Acadex
      </p>

      <div className="container-x">
        <div className="rule flex flex-col gap-2 border-t py-7 text-[13px] sm:flex-row sm:justify-between">
          <span className="faintc">{footer.copyright}</span>
          <span className="faintc">{footer.tagline}</span>
        </div>
      </div>
    </footer>
  );
}
