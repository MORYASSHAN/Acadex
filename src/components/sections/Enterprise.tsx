import { enterprise, links, onboarding } from "@/content/site";
import Button from "../ui/Button";

/** Enterprise / request-quote block and the three onboarding steps, on one violet stage. */
export default function Enterprise() {
  return (
    <section id="onboarding" data-theme="violet" className="container-x scroll-mt-24 py-[11vh]">
      <p data-reveal className="kicker faintc">
        ({enterprise.label})
      </p>
      <h2 data-reveal className="display mt-6 max-w-[16ch] text-[clamp(2.4rem,5vw,5rem)]">{enterprise.title}</h2>
      <p data-reveal data-delay="80" className="soft mt-6 max-w-[56ch] text-[18px] leading-relaxed">
        {enterprise.body}
      </p>
      <ul data-reveal data-delay="100" className="mt-8 flex flex-wrap gap-2">
        {enterprise.tags.map((t) => (
          <li key={t} className="card rounded-full px-4 py-2 text-[14px]">
            {t}
          </li>
        ))}
      </ul>
      <div data-reveal data-delay="140" className="mt-10 flex flex-wrap gap-3">
        <Button href="#contact" variant="accent" arrow>
          {enterprise.primary}
        </Button>
        <Button href="#contact" variant="outline">
          {enterprise.secondary}
        </Button>
      </div>

      <div className="mt-[9vh]">
        <p data-reveal className="kicker faintc">
          ({onboarding.label})
        </p>
        <p data-reveal className="display mt-6 max-w-[18ch] text-[clamp(2rem,3.4vw,3.2rem)]">
          {onboarding.title}
        </p>
        <ol className="mt-8 grid gap-4 md:grid-cols-3">
          {onboarding.steps.map((s, i) => (
            <li key={s} data-reveal data-delay={i * 110} className="card flex min-h-[220px] flex-col justify-between rounded-[32px] p-8">
              <span className="display accent text-[clamp(3.4rem,5vw,4.8rem)] leading-[0.8]">0{i + 1}</span>
              <p className="max-w-[22ch] text-[19px] leading-snug tracking-[-0.03em]">{s}</p>
            </li>
          ))}
        </ol>
        <div data-reveal className="mt-10">
          <Button href={links.register} variant="fg" arrow>
            {onboarding.cta}
          </Button>
        </div>
      </div>
    </section>
  );
}
