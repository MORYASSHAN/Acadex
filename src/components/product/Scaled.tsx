"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

/**
 * Renders children at a fixed design size (w × h) and scales them to fit the parent's width,
 * so product UI stays pixel-consistent at every screen size.
 */
export default function Scaled({ w, h, children, className = "" }: { w: number; h: number; children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [s, setS] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ro = new ResizeObserver(([e]) => setS(e.contentRect.width / w));
    ro.observe(el);
    return () => ro.disconnect();
  }, [w]);

  return (
    <div ref={ref} className={`relative w-full ${className}`} style={{ aspectRatio: `${w} / ${h}` }}>
      <div
        className="absolute left-0 top-0 origin-top-left"
        style={{ width: w, height: h, transform: `scale(${s})`, visibility: s ? "visible" : "hidden" }}
      >
        {children}
      </div>
    </div>
  );
}
