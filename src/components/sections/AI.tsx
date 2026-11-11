"use client";

import { useEffect, useRef, useState } from "react";
import { ai } from "@/content/product";
import { prefersReducedMotion } from "@/lib/runtime";

export default function AI() {
  const demoRef = useRef<HTMLDivElement>(null);
  const [typed, setTyped] = useState(0);
  const [done, setDone] = useState(0); // steps completed
  const [run, setRun] = useState(0);

  // start when the demo scrolls into view
  useEffect(() => {
    const el = demoRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setRun((r) => (r === 0 ? 1 : r));
          io.disconnect();
        }
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!run) return;
    const reduce = prefersReducedMotion();
    const prompt = ai.demo.prompt;
    if (reduce) {
      setTyped(prompt.length);
      setDone(ai.demo.steps.length + 1);
      return;
    }
    setTyped(0);
    setDone(0);
    let i = 0;
    const timers: ReturnType<typeof setTimeout>[] = [];
    const typeId = setInterval(() => {
      i += 1;
      setTyped(i);
      if (i >= prompt.length) {
        clearInterval(typeId);
        ai.demo.steps.forEach((_, s) => timers.push(setTimeout(() => setDone(s + 1), 700 + s * 850)));
        timers.push(setTimeout(() => setDone(ai.demo.steps.length + 1), 700 + ai.demo.steps.length * 850));
      }
    }, 28);
    return () => {
      clearInterval(typeId);
      timers.forEach(clearTimeout);
    };
  }, [run]);

  const total = ai.demo.steps.length;

  return (
    <section id="ai" data-theme="ink" className="container-x scroll-mt-24 py-[11vh]">
      <p data-reveal className="kicker faintc">
        ({ai.label})
      </p>
      <h2 data-reveal className="display mt-6 text-[clamp(2.6rem,6.4vw,6.4rem)]">{ai.title}</h2>
      <p data-reveal data-delay="80" className="soft mt-6 max-w-[58ch] text-[18px] leading-relaxed">
        {ai.intro}
      </p>

      <div className="mt-[6vh] grid gap-px overflow-hidden rounded-[28px] md:grid-cols-3">
        {ai.modes.map((m, i) => (
          <div key={m.word} data-reveal data-delay={i * 100} className="card p-8 sm:p-10">
            <p className="display accent text-[clamp(3rem,5vw,4.6rem)]">{m.word}</p>
            <p className="mt-6 text-[20px] tracking-[-0.02em]">{m.title}</p>
            <p className="soft mt-2 text-[16px] leading-relaxed">{m.body}</p>
          </div>
        ))}
      </div>

      {/* prompt → actions */}
      <div ref={demoRef} data-reveal className="mt-5 overflow-hidden rounded-[28px] bg-[#1b1b1f] text-[#e8f4ff] ring-1 ring-white/10">
        <div className="flex items-center justify-between border-b border-white/10 px-6 py-4">
          <p className="kicker text-white/50">Acadex agent</p>
          <button
            type="button"
            onClick={() => setRun((r) => r + 1)}
            className="kicker rounded-full border border-white/15 px-3 py-1.5 text-white/60 transition-colors hover:text-white"
          >
            Replay
          </button>
        </div>
        <div className="grid gap-8 p-6 sm:p-10 lg:grid-cols-2">
          <div>
            <p className="kicker text-white/40">Prompt</p>
            <p className="mt-4 min-h-[4.5em] font-mono text-[clamp(1.05rem,1.6vw,1.35rem)] leading-relaxed">
              <span className="text-[#ffe94d]">› </span>
              {ai.demo.prompt.slice(0, typed)}
              {typed < ai.demo.prompt.length && <span className="ml-0.5 inline-block h-[1.1em] w-[0.55em] translate-y-[0.2em] bg-[#ffe94d] [animation:pulse-soft_1s_steps(1)_infinite]" />}
            </p>
          </div>
          <div>
            <p className="kicker text-white/40">Actions</p>
            <ol className="mt-4 space-y-3">
              {ai.demo.steps.map((s, i) => {
                const state = done > i ? "done" : done === i && typed >= ai.demo.prompt.length ? "busy" : "idle";
                return (
                  <li key={s} className={`flex items-center gap-3 text-[16px] transition-opacity duration-500 ${state === "idle" ? "opacity-30" : "opacity-100"}`}>
                    <span
                      className={`grid h-6 w-6 shrink-0 place-items-center rounded-full border transition-colors duration-300 ${
                        state === "done" ? "border-[#ffe94d] bg-[#ffe94d] text-[#111]" : "border-white/30"
                      }`}
                    >
                      {state === "done" ? (
                        <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2.2">
                          <path d="m3.5 8.5 3 3 6-7" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      ) : state === "busy" ? (
                        <span className="h-2 w-2 rounded-full bg-white [animation:pulse-soft_0.8s_ease-in-out_infinite]" />
                      ) : null}
                    </span>
                    {s}
                  </li>
                );
              })}
            </ol>
            <p className={`mt-6 font-mono text-[13px] text-[#ffe94d] transition-opacity duration-500 ${done > total ? "opacity-100" : "opacity-0"}`}>
              ✓ {ai.demo.done}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
