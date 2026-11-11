"use client";

import { useEffect, useRef, useState } from "react";
import { gamify } from "@/content/product";
import { prefersReducedMotion } from "@/lib/runtime";

function useInView<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (prefersReducedMotion()) {
      setInView(true);
      return;
    }
    const io = new IntersectionObserver(([e]) => e.isIntersecting && (setInView(true), io.disconnect()), { threshold: 0.35 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return [ref, inView] as const;
}

function CountUp({ to, run }: { to: number; run: boolean }) {
  const [v, setV] = useState(0);
  useEffect(() => {
    if (!run) return;
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / 1400);
      setV(Math.round(to * (1 - Math.pow(1 - t, 3))));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [to, run]);
  return <>{v}</>;
}

export default function Gamify() {
  const [ref, inView] = useInView<HTMLDivElement>();
  const g = gamify;
  const r = 70;
  const c = 2 * Math.PI * r;

  return (
    <section id="engagement" data-theme="lilac" className="container-x scroll-mt-24 py-[11vh]">
      <p data-reveal className="kicker faintc">
        ({g.label})
      </p>
      <h2 data-reveal className="display mt-6 max-w-[14ch] text-[clamp(2.6rem,6.4vw,6.4rem)]">{g.title}</h2>
      <p data-reveal data-delay="80" className="soft mt-6 max-w-[50ch] text-[18px] leading-relaxed">
        {g.intro}
      </p>

      <div ref={ref} className="mt-[6vh] grid gap-4 lg:grid-cols-12">
        {/* ranking */}
        <div data-reveal className="bg-fg rounded-[32px] p-8 sm:p-10 lg:col-span-7">
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <p className="text-[20px] tracking-[-0.02em]">{g.ranking.title}</p>
            <p className="kicker opacity-50">This month</p>
          </div>
          <ol className="mt-8 space-y-4">
            {g.ranking.rows.map((row, i) => (
              <li key={row.name} className="grid grid-cols-[1.6rem_5.2rem_1fr_2.8rem] items-center gap-3 text-[14px] sm:grid-cols-[2.2rem_7.5rem_1fr_3.5rem] sm:text-[15px]">
                <span className="display text-[28px] leading-none">{i + 1}</span>
                <span className="truncate">{row.name}</span>
                <span className="relative h-3 overflow-hidden rounded-full bg-[color-mix(in_srgb,var(--bg)_18%,transparent)]">
                  <span
                    className="absolute inset-y-0 left-0 rounded-full bg-[var(--bg)] transition-[width] duration-[1400ms] ease-[var(--ease-out-quint)]"
                    style={{ width: inView ? `${row.value}%` : "0%", transitionDelay: `${i * 120}ms`, background: i === 0 ? "#ffe94d" : undefined }}
                  />
                </span>
                <span className="text-right tabular-nums">{row.value}%</span>
              </li>
            ))}
          </ol>
        </div>

        {/* goal ring */}
        <div data-reveal data-delay="80" className="card flex flex-col items-center justify-center rounded-[32px] p-8 text-center sm:p-10 lg:col-span-5">
          <div className="relative">
            <svg width="170" height="170" className="-rotate-90" aria-hidden>
              <circle cx="85" cy="85" r={r} fill="none" stroke="currentColor" strokeOpacity="0.12" strokeWidth="14" />
              <circle
                cx="85"
                cy="85"
                r={r}
                fill="none"
                stroke="currentColor"
                strokeWidth="14"
                strokeLinecap="round"
                strokeDasharray={c}
                strokeDashoffset={inView ? c * (1 - g.goal.value / 100) : c}
                style={{ transition: "stroke-dashoffset 1.6s cubic-bezier(0.22,1,0.36,1)" }}
              />
            </svg>
            <span className="display absolute inset-0 grid place-items-center text-[40px]">
              <span>
                <CountUp to={g.goal.value} run={inView} />%
              </span>
            </span>
          </div>
          <p className="display mt-6 text-[36px]">{g.goal.title}</p>
          <p className="soft mt-1 text-[15px]">{g.goal.note}</p>
        </div>

        {/* community votes */}
        <div data-reveal className="card rounded-[32px] p-8 sm:p-10 lg:col-span-5">
          <p className="kicker faintc">{g.community.title}</p>
          <p className="mt-4 text-[22px] tracking-[-0.02em]">{g.community.item}</p>
          <div className="mt-8 flex items-end gap-4">
            <span className="display text-[clamp(3.2rem,5vw,4.6rem)] leading-[0.8]">
              <CountUp to={g.community.votes} run={inView} />
            </span>
            <span className="soft pb-1 text-[15px]">upvotes from classmates</span>
          </div>
        </div>

        {/* event rounds */}
        <div data-reveal data-delay="80" className="card rounded-[32px] p-8 sm:p-10 lg:col-span-7">
          <p className="kicker faintc">Events · round-wise selections</p>
          <p className="mt-4 text-[22px] tracking-[-0.02em]">{g.rounds.title}</p>
          <div className="mt-8 flex items-center gap-3">
            {Array.from({ length: g.rounds.of }).map((_, i) => (
              <div key={i} className="flex flex-1 items-center gap-3">
                <span
                  className={`display grid h-14 w-14 shrink-0 place-items-center rounded-full text-[22px] transition-all duration-700 ${
                    inView && i < g.rounds.round ? "bg-fg" : "border-2 border-current opacity-40"
                  }`}
                  style={{ transitionDelay: `${i * 250}ms` }}
                >
                  {i + 1}
                </span>
                {i < g.rounds.of - 1 && <span className="h-[2px] flex-1 bg-current opacity-25" />}
              </div>
            ))}
          </div>
          <p className="mt-6 text-[15px] font-medium">✓ {g.rounds.status}</p>
        </div>
      </div>
    </section>
  );
}
