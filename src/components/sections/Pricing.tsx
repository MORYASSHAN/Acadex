"use client";

import { useState } from "react";
import { links, pricing } from "@/content/site";
import Button from "../ui/Button";

function Cell({ v }: { v: string | boolean }) {
  if (v === true)
    return (
      <svg viewBox="0 0 16 16" className="mx-auto h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" aria-label="Included">
        <path d="m3.5 8.5 3 3 6-7" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  if (v === false)
    return (
      <span className="faintc" aria-label="Not included">
        —
      </span>
    );
  return <span>{v}</span>;
}

export default function Pricing() {
  const [annual, setAnnual] = useState(true);
  const [compare, setCompare] = useState(false);

  return (
    <section id="pricing" data-theme="paper" className="container-x scroll-mt-24 py-[11vh]">
      <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
        <div className="lg:col-span-8">
          <p data-reveal className="kicker faintc">
            ({pricing.label})
          </p>
          <h2 data-reveal className="display mt-6 text-[clamp(2.6rem,5.6vw,5.6rem)]">{pricing.title}</h2>
          <p data-reveal data-delay="80" className="soft mt-6 max-w-[56ch] text-[18px] leading-relaxed">
            {pricing.intro}
          </p>
        </div>
        <div data-reveal data-delay="120" className="lg:col-span-4 lg:justify-self-end">
          <div role="group" aria-label="Billing period" className="card inline-flex items-center gap-1 rounded-full p-1.5">
            {[
              { label: "Monthly", on: !annual, set: false },
              { label: "Annual", on: annual, set: true },
            ].map((o) => (
              <button
                key={o.label}
                type="button"
                aria-pressed={o.on}
                onClick={() => setAnnual(o.set)}
                className={`flex items-center gap-2 rounded-full px-5 py-2.5 text-[15px] transition-all duration-300 ${o.on ? "bg-[var(--fg)] text-[var(--bg)]" : "soft hover:text-[var(--fg)]"}`}
              >
                {o.label}
                {o.set && <span className={`rounded-full px-2 py-0.5 text-[11px] font-medium ${o.on ? "bg-[var(--ac)] text-white" : "card"}`}>{pricing.saveLabel}</span>}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-[5vh] grid gap-4 lg:grid-cols-3">
        {pricing.plans.map((plan, i) => {
          const featured = "featured" in plan && plan.featured;
          const price = annual ? plan.annual : plan.monthly;
          return (
            <article key={plan.name} data-reveal data-delay={i * 90} className={`flex flex-col rounded-[32px] p-8 sm:p-10 ${featured ? "bg-fg" : "card"}`}>
              <div className="flex items-center justify-between">
                <h3 className="display text-[34px]">{plan.name}</h3>
                <span className="kicker opacity-60">{plan.users}</span>
              </div>
              <p className="mt-3 min-h-[3em] text-[15px] leading-relaxed opacity-70">{plan.blurb}</p>

              <div className="mt-8">
                {price === null ? (
                  <>
                    <p className="display text-[clamp(3.4rem,5vw,4.8rem)] leading-[0.86]">Custom</p>
                    <p className="mt-3 text-[14px] opacity-60">{"priceNote" in plan ? plan.priceNote : ""}</p>
                  </>
                ) : (
                  <>
                    <p className="flex items-baseline gap-2">
                      <span className="display text-[clamp(3.4rem,5vw,4.8rem)] leading-[0.86]">${price}</span>
                      <span className="opacity-60">/{annual ? "yr" : "mo"}</span>
                    </p>
                    <p className="mt-3 text-[14px] opacity-60">{annual ? pricing.billedYearly : pricing.billedMonthly}</p>
                  </>
                )}
              </div>

              {"perks" in plan && plan.perks && (
                <ul className="mt-8 space-y-2.5">
                  {plan.perks.map((p) => (
                    <li key={p} className="flex items-center gap-3 text-[15px]">
                      <span className={`h-1.5 w-1.5 rounded-full ${featured ? "bg-[var(--bg)]" : "bg-[var(--ac)]"}`} />
                      {p}
                    </li>
                  ))}
                </ul>
              )}

              <div className="mt-auto pt-10">
                {featured ? (
                  <a
                    href={links.register}
                    className="flex h-12 w-full items-center justify-center gap-2 rounded-[14px] bg-[var(--bg)] text-[15px] font-medium text-[var(--fg)] transition-opacity hover:opacity-90"
                  >
                    {plan.cta} →
                  </a>
                ) : (
                  <Button href={price === null ? "#contact" : links.register} variant="fg" arrow className="w-full">
                    {plan.cta}
                  </Button>
                )}
              </div>
            </article>
          );
        })}
      </div>
      <p data-reveal className="faintc mt-5 text-center text-[14px]">
        {pricing.note}
      </p>

      <div data-reveal className="mt-8 text-center">
        <button
          type="button"
          aria-expanded={compare}
          aria-controls="compare-table"
          onClick={() => setCompare((v) => !v)}
          className="kicker card inline-flex items-center gap-2 rounded-full px-5 py-3 transition-opacity hover:opacity-80"
        >
          {pricing.compareTitle}
          <span className={`transition-transform duration-500 ${compare ? "rotate-45" : ""}`}>+</span>
        </button>
      </div>
      <div id="compare-table" className={`grid transition-[grid-template-rows] duration-700 ease-[var(--ease-out-quint)] ${compare ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
        <div className="overflow-hidden">
        <p className="soft mt-8 text-center text-[16px]">{pricing.compareIntro}</p>
        <div className="mt-6 overflow-x-auto">
          <table className="w-full min-w-[640px] border-collapse text-[15px]">
            <thead>
              <tr className="rule border-b-2 text-left">
                <th scope="col" className="faintc py-4 pr-6 font-normal">
                  Features
                </th>
                {pricing.plans.map((p) => (
                  <th key={p.name} scope="col" className="display px-6 py-4 text-center text-[24px] font-normal">
                    {p.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {pricing.compare.map((row) => (
                <tr key={row.feature} className="rule border-b">
                  <th scope="row" className="py-4 pr-6 text-left font-normal">
                    {row.feature}
                  </th>
                  {row.values.map((v, i) => (
                    <td key={i} className="soft px-6 py-4 text-center">
                      <Cell v={v} />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        </div>
      </div>
    </section>
  );
}
