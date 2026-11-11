"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";
import { prefersReducedMotion } from "@/lib/runtime";
import { LOGO_PATH } from "@/lib/logo";
import { problems } from "@/content/product";

// the Acadex mark is five separate shapes; one per problem
const pieces = LOGO_PATH.split(/(?=M)/).map((d) => d.trim());

// where each piece starts, scattered around the mark (SVG units, degrees)
const scatter = [
  { x: -150, y: -130, r: -38, s: 1.25 },
  { x: 175, y: -95, r: 52, s: 1.15 },
  { x: -185, y: 95, r: 34, s: 1.2 },
  { x: 120, y: 165, r: -58, s: 1.3 },
  { x: 60, y: -215, r: 86, s: 1.1 },
];

function Mark({ refCb }: { refCb: (el: SVGSVGElement | null) => void }) {
  return (
    <svg ref={refCb} viewBox="0 0 193 213" className="h-full w-full overflow-visible" aria-hidden>
      {pieces.map((d, i) => (
        <path
          key={i}
          data-piece={i}
          d={d}
          fill="var(--fg)"
          fillRule="evenodd"
          stroke="var(--fg)"
          strokeWidth="0.6"
        />
      ))}
    </svg>
  );
}

export default function Shards() {
  const root = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement | null>(null);
  const mobileSvg = useRef<SVGSVGElement | null>(null);
  const [step, setStep] = useState(0); // 0..4 problems, 5 = outro
  const n = problems.items.length;

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    if (prefersReducedMotion()) {
      setStep(n);
      return;
    }

    const mm = gsap.matchMedia();

    mm.add("(min-width: 1024px)", () => {
      const svg = svgRef.current;
      const pin = pinRef.current;
      if (!svg || !pin) return;
      const els = gsap.utils.toArray<SVGPathElement>(svg.querySelectorAll("[data-piece]"));
      els.forEach((p, i) => gsap.set(p, { transformOrigin: "50% 50%", x: scatter[i].x, y: scatter[i].y, rotation: scatter[i].r, scale: scatter[i].s, opacity: 0.18 }));

      const tl = gsap.timeline({
        defaults: { ease: "power3.inOut" },
        scrollTrigger: {
          trigger: pin,
          start: "top top",
          end: () => `+=${window.innerHeight * (n + 1) * 0.45}`,
          pin: true,
          scrub: 0.8,
          anticipatePin: 1,
          onUpdate: (self) => setStep(Math.min(n, Math.floor(self.progress * (n + 1) * 0.999))),
        },
      });
      els.forEach((p, i) => {
        tl.to(p, { opacity: 0.55, duration: 0.3 }, i).to(p, { x: 0, y: 0, rotation: 0, scale: 1, opacity: 1, duration: 0.8 }, i + 0.15);
      });
      tl.to(svg, { scale: 1.08, duration: 0.6, ease: "power2.out" }, n).to(svg, { scale: 1, duration: 0.4 }, n + 0.6);
    });

    mm.add("(max-width: 1023px)", () => {
      const svg = mobileSvg.current;
      if (!svg) return;
      const els = gsap.utils.toArray<SVGPathElement>(svg.querySelectorAll("[data-piece]"));
      els.forEach((p, i) => gsap.set(p, { transformOrigin: "50% 50%", x: scatter[i].x * 0.6, y: scatter[i].y * 0.6, rotation: scatter[i].r, opacity: 0.25 }));
      gsap.to(els, {
        x: 0,
        y: 0,
        rotation: 0,
        opacity: 1,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: { trigger: el.querySelector("[data-mobile-list]"), start: "top 80%", end: "bottom 60%", scrub: 1 },
      });
      setStep(n);
    });

    return () => mm.revert();
  }, [n]);

  const outro = step >= n;
  const item = problems.items[Math.min(step, n - 1)];

  return (
    <section ref={root} id="problems" data-theme="ink" aria-labelledby="problems-title" className="scroll-mt-24">
      {/* desktop: pinned, one problem at a time */}
      <div ref={pinRef} className="hidden h-screen lg:block">
        <div className="container-x grid h-full grid-cols-12 items-center gap-8">
          <div className="col-span-7">
            <div className="kicker faintc flex items-center gap-6">
              <span>({problems.label})</span>
              <span>{outro ? "05 / 05" : `${String(step + 1).padStart(2, "0")} / ${String(n).padStart(2, "0")}`}</span>
            </div>
            <h2 id="problems-title" className="sr-only">
              {problems.title}
            </h2>
            <div className="mt-8 min-h-[44vh]">
              <p key={outro ? "outro" : step} className="display text-[4.8vw] [animation:rise_0.9s_var(--ease-out-quint)_both]">
                {outro ? problems.outro : item.title}
              </p>
              {!outro && (
                <p key={`b-${step}`} className="soft mt-8 max-w-[46ch] text-[18px] leading-relaxed [animation:hero-in_0.9s_0.1s_var(--ease-out-quint)_both]">
                  {item.body}
                </p>
              )}
            </div>
            <ol className="mt-6 flex gap-2" aria-hidden>
              {problems.items.map((p, i) => (
                <li key={p.title} className={`h-1 flex-1 rounded-full transition-colors duration-500 ${i <= step ? "bg-[var(--fg)]" : "card-strong"}`} />
              ))}
            </ol>
          </div>
          <div className="col-span-5 flex justify-center">
            <div className="h-[40vh] w-[36vh]">
              <Mark refCb={(e) => (svgRef.current = e)} />
            </div>
          </div>
        </div>
      </div>

      {/* phones and tablets: the full list, with the mark assembling alongside */}
      <div className="container-x py-[10vh] lg:hidden">
        <p className="kicker faintc">({problems.label})</p>
        <p className="display mt-6 text-[12vw]">{problems.title}</p>
        <div className="mx-auto my-14 h-[42vw] w-[38vw]">
          <Mark refCb={(e) => (mobileSvg.current = e)} />
        </div>
        <ol data-mobile-list className="rule border-t">
          {problems.items.map((p, i) => (
            <li key={p.title} className="rule border-b py-7">
              <p className="kicker faintc">0{i + 1}</p>
              <p className="display mt-3 text-[8vw]">{p.title}</p>
              <p className="soft mt-3 text-[16px] leading-relaxed">{p.body}</p>
            </li>
          ))}
        </ol>
        <p className="display accent mt-12 text-[9vw]">{problems.outro}</p>
      </div>
    </section>
  );
}
