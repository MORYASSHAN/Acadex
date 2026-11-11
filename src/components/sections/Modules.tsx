"use client";

import { useState } from "react";
import { modules } from "@/content/product";

export default function Modules() {
  const [open, setOpen] = useState(0);
  const total = modules.groups.reduce((n, g) => n + g.items.length, 0);

  return (
    <section id="modules" data-theme="yellow" className="container-x scroll-mt-24 py-[11vh]">
      <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
        <div className="lg:col-span-9">
          <p data-reveal className="kicker faintc">
            ({modules.label})
          </p>
          <h2 data-reveal className="display mt-6 text-[clamp(2.6rem,6vw,6rem)]">{modules.title}</h2>
        </div>
        <div data-reveal data-delay="100" className="lg:col-span-3 lg:text-right">
          <p className="display text-[clamp(4rem,8vw,7.5rem)] leading-[0.8]">{total}</p>
          <p className="soft mt-2 text-[16px]">modules · {modules.intro}</p>
        </div>
      </div>

      <ul className="rule mt-[6vh] border-t">
        {modules.groups.map((g, i) => {
          const isOpen = open === i;
          return (
            <li key={g.name} className="rule border-b">
              <button
                type="button"
                aria-expanded={isOpen}
                onClick={() => setOpen(isOpen ? -1 : i)}
                className="group flex w-full items-center gap-5 py-5 text-left md:gap-10 md:py-6"
              >
                <span className="kicker faintc w-8 shrink-0">0{i + 1}</span>
                <span className={`display flex-1 text-[clamp(1.9rem,4vw,3.8rem)] transition-transform duration-500 ease-[var(--ease-out-quint)] ${isOpen ? "translate-x-0" : "group-hover:translate-x-3"}`}>
                  {g.name}
                </span>
                <span className="kicker soft hidden sm:block">{g.items.length} modules</span>
                <span aria-hidden className={`grid h-11 w-11 shrink-0 place-items-center rounded-full border-2 border-current transition-transform duration-500 ease-[var(--ease-out-quint)] ${isOpen ? "rotate-45" : ""}`}>
                  <svg viewBox="0 0 16 16" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M8 2.5v11M2.5 8h11" strokeLinecap="round" />
                  </svg>
                </span>
              </button>
              <div className={`grid transition-[grid-template-rows] duration-700 ease-[var(--ease-out-quint)] ${isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
                <div className="overflow-hidden">
                  <ul className="grid gap-x-10 gap-y-6 pb-12 pt-2 sm:grid-cols-2 lg:grid-cols-3 md:pl-[4.5rem]">
                    {g.items.map((m) => (
                      <li key={m.name} className="rule border-t pt-4">
                        <p className="text-[18px] font-medium tracking-[-0.02em]">{m.name}</p>
                        {m.body && <p className="soft mt-2 text-[15px] leading-relaxed">{m.body}</p>}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
