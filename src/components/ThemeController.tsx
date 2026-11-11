"use client";

import { useEffect } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { prefersReducedMotion } from "@/lib/runtime";
import { themes, type ThemeName } from "@/lib/themes";

/**
 * Watches every `[data-theme]` section inside `#stage` and morphs the stage colours
 * (--bg, --fg, --ac) to that section's palette as it reaches the middle of the screen.
 */
export default function ThemeController() {
  useEffect(() => {
    const stage = document.getElementById("stage");
    if (!stage) return;
    const reduce = prefersReducedMotion();

    const apply = (name: ThemeName) => {
      const t = themes[name];
      if (!t) return;
      gsap.to(stage, {
        "--bg": t.bg,
        "--fg": t.fg,
        "--ac": t.ac,
        duration: reduce ? 0 : 0.9,
        ease: "power2.out",
        overwrite: "auto",
      });
    };

    const first = stage.querySelector<HTMLElement>("[data-theme]");
    if (first) {
      const t = themes[first.dataset.theme as ThemeName];
      if (t) gsap.set(stage, { "--bg": t.bg, "--fg": t.fg, "--ac": t.ac });
    }

    const triggers = Array.from(stage.querySelectorAll<HTMLElement>("[data-theme]")).map((sec) =>
      ScrollTrigger.create({
        trigger: sec,
        start: "top 55%",
        end: "bottom 55%",
        onEnter: () => apply(sec.dataset.theme as ThemeName),
        onEnterBack: () => apply(sec.dataset.theme as ThemeName),
      }),
    );
    return () => triggers.forEach((t) => t.kill());
  }, []);

  return null;
}
