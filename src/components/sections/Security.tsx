"use client";

import { useEffect, useRef, useState } from "react";
import { security } from "@/content/product";
import { LogoMark } from "../ui/Logo";

/** Defence in depth: one ring per layer, lighting up as each layer scrolls past. */
function Rings({ active }: { active: number }) {
  const n = security.layers.length;
  return (
    <svg viewBox="0 0 640 640" className="h-full w-full" aria-hidden>
      {security.layers.map((_, i) => {
        const r = 300 - i * 34;
        const c = 2 * Math.PI * r;
        const lit = i <= active;
        return (
          <g key={i}>
            <circle cx="320" cy="320" r={r} fill="none" stroke="var(--fg)" strokeOpacity="0.14" strokeWidth="1" />
            <circle
              cx="320"
              cy="320"
              r={r}
              fill="none"
              stroke="var(--fg)"
              strokeWidth={i === active ? 3 : 1.6}
              strokeDasharray={c}
              strokeDashoffset={lit ? 0 : c}
              transform="rotate(-90 320 320)"
              style={{ transition: "stroke-dashoffset 1.2s cubic-bezier(0.22,1,0.36,1), stroke-width .4s" }}
            />
            <g style={{ opacity: lit ? 1 : 0.25, transition: "opacity .6s" }}>
              <circle cx="320" cy={320 - r} r="11" fill={i === active ? "var(--ac)" : "var(--bg)"} stroke="var(--fg)" strokeWidth="1.4" />
              <text x="320" y={320 - r + 4} textAnchor="middle" fontSize="11" fontFamily="var(--font-geist-mono)" fill={i === active ? "var(--bg)" : "var(--fg)"}>
                {i + 1}
              </text>
            </g>
          </g>
        );
      })}
      <circle cx="320" cy="320" r={300 - n * 34} fill="var(--fg)" fillOpacity={active >= n - 1 ? 1 : 0.1} style={{ transition: "fill-opacity .8s" }} />
    </svg>
  );
}

export default function Security() {
  const [active, setActive] = useState(-1);
  const listRef = useRef<HTMLOListElement>(null);

  useEffect(() => {
    const items = Array.from(listRef.current?.querySelectorAll<HTMLElement>("[data-layer]") ?? []);
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(Number((e.target as HTMLElement).dataset.layer));
        });
      },
      { rootMargin: "-45% 0px -45% 0px" },
    );
    items.forEach((it) => io.observe(it));
    return () => io.disconnect();
  }, []);

  const n = security.layers.length;
  const all = active >= n - 1;

  return (
    <section id="security" data-theme="mint" className="container-x scroll-mt-24 py-[11vh]">
      <p data-reveal className="kicker faintc">
        ({security.label})
      </p>
      <h2 data-reveal className="display mt-6 text-[clamp(2.6rem,6.4vw,6.4rem)]">{security.title}</h2>
      <p data-reveal data-delay="80" className="soft mt-6 max-w-[54ch] text-[18px] leading-relaxed">
        {security.intro}
      </p>

      <div className="mt-[5vh] grid gap-10 lg:grid-cols-2">
        <ol ref={listRef} className="order-2 lg:order-1 lg:py-[8vh]">
          {security.layers.map((l, i) => (
            <li
              key={l.name}
              data-layer={i}
              className={`rule border-t py-6 transition-opacity duration-500 last:border-b ${active === i ? "opacity-100" : "opacity-45"}`}
            >
              <div className="flex items-baseline gap-5">
                <span className="kicker faintc w-6">0{i + 1}</span>
                <div>
                  <p className="display text-[clamp(1.6rem,2.4vw,2.3rem)]">{l.name}</p>
                  <p className="soft mt-3 max-w-[44ch] text-[16px] leading-relaxed">{l.body}</p>
                </div>
              </div>
            </li>
          ))}
        </ol>
        <div className="order-1 lg:order-2">
          <div className="sticky top-[12vh] mx-auto aspect-square w-full max-w-[480px]">
            <Rings active={active} />
            <div className="pointer-events-none absolute inset-0 grid place-items-center">
              <LogoMark className={`h-[11%] w-auto transition-colors duration-700 ${all ? "text-[var(--bg)]" : "text-[var(--fg)]"}`} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
