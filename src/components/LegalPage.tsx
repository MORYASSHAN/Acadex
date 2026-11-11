import Nav from "./Nav";
import Footer from "./Footer";

export default function LegalPage({ title, intro, sections }: { title: string; intro: string; sections: { h: string; p: string }[] }) {
  return (
    <>
      <Nav home={false} />
      <main className="relative z-10 rounded-b-[48px] bg-canvas">
        <article className="container-x pb-[14vh] pt-40">
          <a href="/" className="text-[15px] text-muted transition-colors hover:text-ink">
            ← Back to Home
          </a>
          <p className="eyebrow mt-12">Legal</p>
          <h1 className="h-display mt-5 text-[clamp(2.8rem,6.5vw,6rem)]">{title}</h1>
          <p className="mt-8 max-w-[60ch] text-[19px] leading-relaxed text-ink-2">{intro}</p>
          <div className="mt-16 grid gap-px overflow-hidden rounded-[28px] bg-line ring-1 ring-line md:grid-cols-2">
            {sections.map((s) => (
              <section key={s.h} className="bg-canvas p-8 sm:p-10">
                <h2 className="text-[24px] tracking-[-0.03em]">{s.h}</h2>
                <p className="mt-4 text-[16px] leading-relaxed text-muted">{s.p}</p>
              </section>
            ))}
          </div>
        </article>
      </main>
      <Footer home={false} />
    </>
  );
}
