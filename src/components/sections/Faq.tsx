"use client";

import { useState } from "react";
import { faq } from "@/content/site";
import Button from "../ui/Button";

export default function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" data-theme="paper" className="container-x scroll-mt-24 py-[11vh]">
      <div className="grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <p data-reveal className="kicker faintc">
            ({faq.label})
          </p>
          <h2 data-reveal className="display mt-6 text-[clamp(2.6rem,5vw,5rem)]">{faq.title}</h2>
          <div data-reveal data-delay="120" className="card mt-10 rounded-[28px] p-7">
            <p className="text-[20px] tracking-[-0.03em]">{faq.more.title}</p>
            <p className="soft mt-2 text-[15px] leading-relaxed">{faq.more.body}</p>
            <div className="mt-6 flex flex-wrap gap-2">
              <Button href="#contact" variant="fg" className="!h-11 !px-5 !text-[14px]">
                {faq.more.primary}
              </Button>
              <Button href="#contact" variant="outline" className="!h-11 !px-5 !text-[14px]">
                {faq.more.secondary}
              </Button>
            </div>
          </div>
        </div>

        <ul className="lg:col-span-7">
          {faq.items.map((item, i) => {
            const isOpen = open === i;
            return (
              <li key={item.q} className="rule border-b first:border-t">
                <button
                  type="button"
                  aria-expanded={isOpen}
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="flex w-full items-center justify-between gap-6 py-6 text-left"
                >
                  <span className="text-[19px] tracking-[-0.02em] sm:text-[21px]">{item.q}</span>
                  <span
                    aria-hidden
                    className={`relative grid h-9 w-9 shrink-0 place-items-center rounded-full transition-colors duration-300 ${isOpen ? "bg-[var(--fg)] text-[var(--bg)]" : "card"}`}
                  >
                    <span className="absolute h-[1.5px] w-3.5 bg-current" />
                    <span className={`absolute h-3.5 w-[1.5px] bg-current transition-transform duration-300 ${isOpen ? "scale-y-0" : ""}`} />
                  </span>
                </button>
                <div className={`grid transition-[grid-template-rows] duration-500 ease-[var(--ease-out-quint)] ${isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
                  <div className="overflow-hidden">
                    <p className="soft max-w-[62ch] pb-7 pr-12 text-[16px] leading-relaxed">{item.a}</p>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
