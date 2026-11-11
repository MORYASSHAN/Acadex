"use client";

import { useState } from "react";
import { contact } from "@/content/site";
import Button from "../ui/Button";

/** Email-only contact: one big address, a mailto button and a copy button. No form. */
export default function Contact() {
  const [copied, setCopied] = useState(false);
  const mailto = `mailto:${contact.email}?subject=${encodeURIComponent(contact.emailSubject)}`;

  async function copy() {
    try {
      await navigator.clipboard.writeText(contact.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      window.location.href = mailto;
    }
  }

  return (
    <section id="contact" data-theme="ink" className="container-x scroll-mt-24 py-[11vh]">
      <p data-reveal className="kicker faintc">
        ({contact.label})
      </p>
      <h2 data-reveal className="display mt-6 text-[clamp(3.2rem,9vw,8.6rem)] leading-[0.86]">Let&apos;s talk</h2>
      <p data-reveal data-delay="80" className="soft mt-6 max-w-[52ch] text-[18px] leading-relaxed">
        {contact.intro}
      </p>

      {/* the address itself is the call to action */}
      <a
        data-reveal
        data-delay="120"
        href={mailto}
        className="group mt-[6vh] block w-fit max-w-full"
      >
        <span className="display accent block whitespace-nowrap text-[clamp(1.25rem,5.8vw,5.2rem)] normal-case leading-[1]">{contact.email}</span>
        <span className="mt-2 block h-[3px] origin-left scale-x-[0.25] bg-[var(--ac)] transition-transform duration-700 ease-[var(--ease-out-quint)] group-hover:scale-x-100" />
      </a>

      <div data-reveal data-delay="160" className="mt-8 flex flex-wrap items-center gap-3">
        <Button href={mailto} variant="accent" arrow>
          {contact.emailCta}
        </Button>
        <button
          type="button"
          onClick={copy}
          className="inline-flex h-12 items-center rounded-[14px] border-2 border-[color-mix(in_srgb,var(--fg)_35%,transparent)] px-6 text-[15px] font-medium transition-colors hover:border-[var(--fg)]"
          aria-live="polite"
        >
          {copied ? `✓ ${contact.copied}` : contact.copyCta}
        </button>
        <span className="faintc text-[14px]">{contact.reply}</span>
      </div>

      <div className="mt-[7vh] grid gap-4 md:grid-cols-2">
        <div data-reveal className="card rounded-[24px] p-7">
          <p className="text-[18px] tracking-[-0.02em]">{contact.hoursTitle}</p>
          <p className="soft mt-2 text-[15px] leading-relaxed">{contact.hours}</p>
        </div>
        <div data-reveal data-delay="80" className="card rounded-[24px] p-7">
          <p className="text-[18px] tracking-[-0.02em]">{contact.priorityTitle}</p>
          <ul className="soft mt-2 space-y-1.5 text-[15px] leading-relaxed">
            {contact.priority.map((p) => (
              <li key={p}>{p}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
