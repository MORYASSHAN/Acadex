import { featureStrip } from "@/content/site";

/** Giant feature words sliding across the top of the stage, in place of the old "trusted by" list. */
export default function FeatureStrip() {
  const items = [...featureStrip.items, ...featureStrip.items];
  return (
    <section data-theme="paper" aria-label={featureStrip.label} className="overflow-hidden py-14">
      <ul className="sr-only">
        {featureStrip.items.map((f) => (
          <li key={f}>{f}</li>
        ))}
      </ul>
      <div aria-hidden className="marquee-track flex w-max items-center">
        {items.map((f, i) => (
          <span key={i} className="display flex items-center whitespace-nowrap text-[clamp(3rem,7vw,6.5rem)]">
            <span className={i % 2 ? "faintc" : ""}>{f}</span>
            <span className="mx-[0.35em] inline-block h-[0.22em] w-[0.22em] rounded-full bg-[var(--ac)]" />
          </span>
        ))}
      </div>
    </section>
  );
}
