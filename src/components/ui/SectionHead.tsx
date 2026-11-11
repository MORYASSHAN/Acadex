import type { ReactNode } from "react";

/** Mono eyebrow, large calm headline and an optional intro, the way every section opens. */
export default function SectionHead({
  label,
  title,
  intro,
  aside,
  className = "",
  titleClass = "max-w-[20ch]",
}: {
  label: string;
  title: string;
  intro?: string;
  aside?: ReactNode;
  className?: string;
  titleClass?: string;
}) {
  return (
    <div className={`grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end ${className}`}>
      <div>
        <p data-reveal className="eyebrow">
          {label}
        </p>
        <h2 data-reveal data-delay="60" className={`h-section mt-5 text-[clamp(2.1rem,4.6vw,4.4rem)] ${titleClass}`}>
          {title}
        </h2>
        {intro && (
          <p data-reveal data-delay="120" className="mt-6 max-w-[56ch] text-[17px] leading-relaxed text-muted sm:text-[19px]">
            {intro}
          </p>
        )}
      </div>
      {aside && (
        <div data-reveal data-delay="160">
          {aside}
        </div>
      )}
    </div>
  );
}
