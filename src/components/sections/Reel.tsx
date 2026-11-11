"use client";

import { useEffect, useRef, useState } from "react";
import { ScrollTrigger } from "@/lib/gsap";
import { prefersReducedMotion } from "@/lib/runtime";
import { reel } from "@/content/product";
import Scaled from "../product/Scaled";
import Phone from "../product/Phone";
import { CampusScreen, DashboardScreen, FinanceScreen } from "../product/WebScreens";
import { AttendanceDetail, StudentHome, TeacherHome } from "../product/PhoneScreens";
import { Live } from "../product/live";

/** A 1000 × 625 canvas with a phone in the middle and a soft coloured backdrop. */
function PhoneStage({ bg, children, side }: { bg: string; children: React.ReactNode; side?: React.ReactNode }) {
  return (
    <div className="relative grid h-[625px] w-[1000px] place-items-center overflow-hidden" style={{ background: bg }}>
      <div className="absolute inset-0 opacity-[0.18] [background-image:radial-gradient(rgba(255,255,255,0.9)_1px,transparent_1px)] [background-size:22px_22px]" />
      {side}
      <div className="relative origin-center scale-[0.92]">{children}</div>
    </div>
  );
}

function Frame({ k }: { k: string }) {
  switch (k) {
    case "dashboard":
      return <DashboardScreen />;
    case "student":
      return (
        <PhoneStage bg="linear-gradient(160deg,#6d66ff,#3b32c8)">
          <Phone>
            <StudentHome />
          </Phone>
        </PhoneStage>
      );
    case "teacher":
      return (
        <PhoneStage bg="linear-gradient(160deg,#ffe94d,#f7c948)">
          <Phone>
            <TeacherHome />
          </Phone>
        </PhoneStage>
      );
    case "attendance":
      return (
        <PhoneStage
          bg="linear-gradient(160deg,#1f1f24,#0e0e10)"
          side={
            <>
              <div className="absolute left-[64px] top-[120px] w-[230px] rounded-[18px] bg-white p-4 text-[#14161c] shadow-2xl">
                <p className="text-[11px] text-[#6b7180]">Below threshold</p>
                <p className="text-[30px] font-semibold leading-none">9</p>
                <p className="mt-1 text-[10.5px] text-[#be123c]">Students under 75%</p>
              </div>
              <div className="absolute bottom-[120px] right-[64px] w-[240px] rounded-[18px] bg-white p-4 text-[#14161c] shadow-2xl">
                <p className="text-[11px] text-[#6b7180]">Marked today</p>
                <p className="text-[30px] font-semibold leading-none">30/32</p>
                <p className="mt-1 text-[10.5px] text-[#15803d]">Synced · works offline</p>
              </div>
            </>
          }
        >
          <Phone>
            <AttendanceDetail />
          </Phone>
        </PhoneStage>
      );
    case "campus":
      return <CampusScreen />;
    default:
      return <FinanceScreen />;
  }
}

export default function Reel() {
  const root = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const [step, setStep] = useState(0);
  const [inView, setInView] = useState(false);
  const n = reel.steps.length;

  // only play the live demo once the reel is on screen
  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold: 0.2 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const el = root.current;
    const pin = pinRef.current;
    if (!el || !pin) return;
    const reduce = prefersReducedMotion();
    const desktop = window.matchMedia("(min-width: 1024px)").matches;

    if (desktop && !reduce) {
      const st = ScrollTrigger.create({
        trigger: pin,
        start: "top top",
        end: () => `+=${window.innerHeight * (n - 1) * 0.5}`,
        pin: true,
        anticipatePin: 1,
        onUpdate: (self) => setStep(Math.min(n - 1, Math.floor(self.progress * n * 0.999))),
      });
      return () => st.kill();
    }
    // phones and tablets: cycle on a timer while the section is on screen
    let id: ReturnType<typeof setInterval> | undefined;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !id) id = setInterval(() => setStep((s) => (s + 1) % n), 2800);
      if (!e.isIntersecting && id) {
        clearInterval(id);
        id = undefined;
      }
    });
    io.observe(el);
    return () => {
      io.disconnect();
      if (id) clearInterval(id);
    };
  }, [n]);

  const current = reel.steps[step];

  return (
    <section ref={root} id="product" data-theme="paper" aria-label="Product tour">
      <div ref={pinRef} className="flex min-h-[100svh] flex-col justify-center overflow-hidden py-16 lg:h-screen lg:py-0">
        <h2 className="display container-x whitespace-nowrap text-center text-[11vw] leading-[0.86] lg:text-[7.6vw]">
          <span data-reveal className="inline-block">
            {reel.title}
          </span>
        </h2>

        <div className="container-x mt-8 grid items-center gap-6 lg:mt-[4vh] lg:grid-cols-[1fr_minmax(0,46vw)_1fr]">
          <p data-reveal className="display text-center text-[10vw] lg:text-left lg:text-[3.6vw]">
            {reel.left}
          </p>

          <div data-reveal data-delay="80">
            <div className="kicker mb-2 flex items-center justify-between">
              <span key={current.key} className="[animation:hero-in_0.6s_var(--ease-out-quint)_both]">
                {current.label}
              </span>
              <span>
                {String(step + 1).padStart(2, "0")} / {String(n).padStart(2, "0")}
              </span>
            </div>
            <div className="relative overflow-hidden rounded-[18px] shadow-[0_40px_80px_-40px_rgba(0,0,0,0.5)]">
              {/* sizer */}
              <div className="invisible">
                <Scaled w={1000} h={625}>
                  <div />
                </Scaled>
              </div>
              {reel.steps.map((s, i) => (
                <div
                  key={s.key}
                  aria-hidden={i !== step}
                  className="absolute inset-0 transition-[clip-path] duration-[900ms] ease-[var(--ease-out-quint)]"
                  style={{ clipPath: i === step ? "inset(0 0 0 0)" : i < step ? "inset(0 0 100% 0)" : "inset(100% 0 0 0)", zIndex: i === step ? 2 : 1 }}
                >
                  <Scaled w={1000} h={625}>
                    {/* each screen plays its feature (counts, check-ins, alerts) when it comes into view */}
                    <Live active={i === step && inView}>
                      <Frame k={s.key} />
                    </Live>
                  </Scaled>
                </div>
              ))}
            </div>
            <p key={`c-${current.key}`} className="soft mt-3 min-h-[3em] text-center text-[15px] leading-snug [animation:hero-in_0.6s_var(--ease-out-quint)_both]">
              {current.caption}
            </p>
            <div className="mt-1 flex justify-center gap-1.5" aria-hidden>
              {reel.steps.map((s, i) => (
                <span key={s.key} className={`h-1 rounded-full transition-all duration-500 ${i === step ? "w-6 bg-[var(--fg)]" : "w-1.5 bg-[color-mix(in_srgb,var(--fg)_25%,transparent)]"}`} />
              ))}
            </div>
          </div>

          <p data-reveal data-delay="120" className="display text-center text-[10vw] lg:text-right lg:text-[3.6vw]">
            {reel.right}
          </p>
        </div>
      </div>
    </section>
  );
}
