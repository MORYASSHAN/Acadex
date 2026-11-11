"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";
import { prefersReducedMotion } from "@/lib/runtime";
import { apps, type RoleKey } from "@/content/product";
import Scaled from "../product/Scaled";
import Phone from "../product/Phone";
import { CampusScreen, DashboardScreen, FinanceScreen } from "../product/WebScreens";
import { AttendanceDetail, ClassChat, StudentHome, TeacherHome } from "../product/PhoneScreens";
import { Live } from "../product/live";

function Browser({ children }: { children: React.ReactNode }) {
  return (
    <div className="overflow-hidden rounded-[14px] bg-[#1c1c20] shadow-[0_50px_100px_-40px_rgba(0,0,0,0.7)] ring-1 ring-white/10">
      <div className="flex h-8 items-center gap-1.5 px-3.5">
        {["#ff5f57", "#febc2e", "#28c840"].map((c) => (
          <span key={c} className="h-2.5 w-2.5 rounded-full" style={{ background: c }} />
        ))}
        <span className="mx-auto rounded-md bg-white/[0.06] px-10 py-0.5 text-[10px] text-white/45">acadex.ereefian.com</span>
      </div>
      <Scaled w={1000} h={625}>{children}</Scaled>
    </div>
  );
}

function PhoneBox({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`w-[clamp(150px,18vw,270px)] ${className}`}>
      <Scaled w={300} h={620}>
        <Phone>{children}</Phone>
      </Scaled>
    </div>
  );
}

function Devices({ role }: { role: RoleKey }) {
  if (role === "students")
    return (
      <div className="relative flex items-end justify-center gap-6 py-6">
        <PhoneBox className="-rotate-3">
          <StudentHome />
        </PhoneBox>
        <PhoneBox className="mb-10 rotate-3">
          <AttendanceDetail />
        </PhoneBox>
      </div>
    );
  if (role === "teachers")
    return (
      <div className="relative pb-10 pr-6">
        <Browser>
          <CampusScreen />
        </Browser>
        <PhoneBox className="absolute -bottom-2 -left-4 sm:-left-8">
          <TeacherHome />
        </PhoneBox>
      </div>
    );
  if (role === "crs")
    return (
      <div className="relative flex items-end justify-center gap-6 py-6">
        <PhoneBox className="-rotate-2">
          <ClassChat />
        </PhoneBox>
        <PhoneBox className="mb-10 rotate-2">
          <StudentHome />
        </PhoneBox>
      </div>
    );
  return (
    <div className="relative pb-10 pl-6">
      <Browser>
        <DashboardScreen />
      </Browser>
      <div className="absolute -bottom-2 -right-2 w-[46%] sm:-right-6">
        <Browser>
          <FinanceScreen />
        </Browser>
      </div>
    </div>
  );
}

export default function Apps() {
  const root = useRef<HTMLElement>(null);
  const [role, setRole] = useState<RoleKey>("students");
  const [inView, setInView] = useState(false);
  const active = apps.roles.find((r) => r.key === role)!;

  useEffect(() => {
    const el = root.current?.querySelector("[data-devices]");
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold: 0.3 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const el = root.current;
    if (!el || prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        "[data-devices]",
        { y: 80, rotateX: 10, transformPerspective: 1400 },
        { y: -40, rotateX: 0, ease: "none", scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: 1 } },
      );
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} id="apps" data-theme="violet" className="scroll-mt-24 overflow-hidden py-[11vh]">
      <div className="container-x">
        <p data-reveal className="kicker faintc">
          ({apps.label})
        </p>
        <h2 data-reveal className="display mt-6 text-[clamp(2.6rem,6.4vw,6.4rem)]">{apps.title}</h2>
        <p data-reveal data-delay="80" className="soft mt-6 max-w-[54ch] text-[18px] leading-relaxed">
          {apps.intro}
        </p>

        <ul data-reveal data-delay="120" className="mt-8 flex flex-wrap gap-2">
          {apps.platforms.map((p) => (
            <li key={p.name} className="card flex items-center gap-2 rounded-full px-4 py-2 text-[14px]">
              <span className="font-medium">{p.name}</span>
              <span className="faintc">· {p.note}</span>
            </li>
          ))}
        </ul>

        <div role="tablist" aria-label="Choose a role" className="rule mt-[6vh] grid grid-cols-2 border-t md:grid-cols-4">
          {apps.roles.map((r, i) => (
            <button
              key={r.key}
              type="button"
              role="tab"
              aria-selected={role === r.key}
              onClick={() => setRole(r.key)}
              className={`rule group relative py-5 text-left transition-colors duration-300 md:py-6 ${i % 2 === 1 ? "border-l pl-4" : ""} ${i > 0 ? "md:border-l md:pl-5" : ""}`}
            >
              <span className={`absolute left-0 top-0 h-[3px] bg-[var(--ac)] transition-all duration-500 ease-[var(--ease-out-quint)] ${role === r.key ? "w-full" : "w-0"}`} />
              <span className="kicker faintc">0{i + 1}</span>
              <span className={`display mt-2 block text-[clamp(1.5rem,2.4vw,2.2rem)] transition-opacity duration-300 ${role === r.key ? "opacity-100" : "opacity-40 group-hover:opacity-70"}`}>
                {r.name}
              </span>
            </button>
          ))}
        </div>

        <div className="mt-12 grid items-center gap-12 lg:grid-cols-12">
          <div key={active.key} className="lg:col-span-4 [animation:hero-in_0.7s_var(--ease-out-quint)_both]">
            <p className="text-[clamp(1.25rem,1.6vw,1.6rem)] leading-[1.2] tracking-[-0.03em]">{active.body}</p>
            <ul className="mt-8 space-y-3">
              {active.points.map((p) => (
                <li key={p} className="flex gap-3 text-[16px]">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--ac)]" />
                  <span className="soft">{p}</span>
                </li>
              ))}
            </ul>
          </div>
          <div data-devices className="lg:col-span-8">
            <div key={active.key} className="[animation:hero-in_0.8s_var(--ease-out-quint)_both]">
              <Live active={inView}>
                <Devices role={role} />
              </Live>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
