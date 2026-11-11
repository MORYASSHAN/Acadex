"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

/**
 * "Live" product UI. Wrap a screen in <Live active> and everything inside plays its
 * feature animation (counts, check-ins, notifications) each time it becomes active.
 * CSS hooks live in globals.css under `.live`.
 */
const LiveCtx = createContext(true);

export function Live({ active, children, className = "" }: { active: boolean; children: ReactNode; className?: string }) {
  return (
    <LiveCtx.Provider value={active}>
      <div className={`${active ? "live" : ""} ${className}`}>{children}</div>
    </LiveCtx.Provider>
  );
}

/** A number that counts up while its screen is live. */
export function Num({ to, decimals = 0, prefix = "", suffix = "", delay = 0, duration = 1400 }: { to: number; decimals?: number; prefix?: string; suffix?: string; delay?: number; duration?: number }) {
  const live = useContext(LiveCtx);
  const [v, setV] = useState(to);

  useEffect(() => {
    if (!live || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setV(to);
      return;
    }
    setV(0);
    let raf = 0;
    const t0 = performance.now() + delay;
    const tick = (now: number) => {
      const t = Math.min(1, Math.max(0, (now - t0) / duration));
      setV(to * (1 - Math.pow(1 - t, 3)));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [live, to, delay, duration]);

  return (
    <>
      {prefix}
      {v.toLocaleString("en-IN", { minimumFractionDigits: decimals, maximumFractionDigits: decimals })}
      {suffix}
    </>
  );
}

/** Small CSS-var helper for staggered delays. */
export const d = (s: number) => ({ ["--d" as string]: `${s}s` }) as React.CSSProperties;
