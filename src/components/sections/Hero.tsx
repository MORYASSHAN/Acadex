import { hero, links } from "@/content/site";
import HangingLogo from "../HangingLogo";
import Button from "../ui/Button";

export default function Hero() {
  return (
    <section id="top" className="relative overflow-hidden bg-[linear-gradient(180deg,#dcdcdb_0%,#e6e5e2_38%,#ebeae6_78%)]">
      <HangingLogo />

      <div className="container-x relative flex min-h-[100svh] flex-col items-center justify-end pb-[9vh] pt-[300px] text-center sm:pt-[400px] lg:pt-[430px]">
        <p className="eyebrow hero-in max-w-[90vw] text-balance" style={{ animationDelay: "0.1s" }}>
          {hero.badge}
        </p>
        <h1 className="h-display hero-in mt-5 max-w-[11.5em] text-balance text-[clamp(3rem,8vw,8.2rem)]" style={{ animationDelay: "0.2s" }}>
          {hero.title}
        </h1>
        <p className="hero-in mt-7 max-w-[38ch] text-[clamp(1.1rem,1.6vw,1.45rem)] leading-snug text-ink-2" style={{ animationDelay: "0.35s" }}>
          {hero.lead}
        </p>
        <div className="hero-in mt-9 flex flex-wrap items-center justify-center gap-3" style={{ animationDelay: "0.5s" }}>
          <Button href={links.register}>{hero.primary}</Button>
          <Button href={links.login} variant="light">
            {hero.secondary}
          </Button>
        </div>
        <ul className="hero-in mt-9 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-[14px] text-muted" style={{ animationDelay: "0.65s" }}>
          {hero.chips.map((c) => (
            <li key={c} className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-brand" />
              {c}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
