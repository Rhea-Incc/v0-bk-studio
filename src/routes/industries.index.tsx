import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell, PageHeader, FinalCTA } from "@/components/bk/shared";
import { industries } from "@/lib/industries";

export const Route = createFileRoute("/industries/")({
  head: () => ({
    meta: [
      { title: "Industries — BK Studio" },
      { name: "description", content: "Growth systems tailored to each hospitality vertical: boutique hotels, safari lodges, luxury villas, travel brands, and restaurants." },
      { property: "og:title", content: "Industries — BK Studio" },
      { property: "og:description", content: "One studio, five hospitality verticals. Each with its own philosophy, pipeline, and deliverables." },
    ],
  }),
  component: IndustriesIndex,
});

function IndustriesIndex() {
  return (
    <PageShell>
      <PageHeader
        num="Chapter 10"
        kicker="Industries"
        title={<>Five verticals. <span className="italic">One studio.</span></>}
        lede="Every hospitality category we serve gets its own philosophy, pipeline, and set of deliverables. Choose yours."
      />
      <section className="max-w-editorial container-x pb-32">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {industries.map((ind, i) => (
            <Link
              key={ind.slug}
              to="/industries/$slug"
              params={{ slug: ind.slug }}
              data-reveal
              data-cursor="on"
              className="group relative overflow-hidden rounded-lg border hairline bg-[var(--linen-2)]"
            >
              <div className="aspect-[16/10] overflow-hidden">
                <img src={ind.hero} alt={ind.name} className="w-full h-full object-cover transition-transform duration-[1400ms] group-hover:scale-[1.05]" loading="lazy" />
              </div>
              <div className="p-6 md:p-8">
                <div className="flex items-center justify-between">
                  <span className="divider-num">{ind.chapter}</span>
                  <span className="divider-num">0{i + 1}</span>
                </div>
                <h2 className="font-serif text-3xl md:text-4xl text-cocoa mt-2">{ind.name}</h2>
                <p className="text-espresso text-[14.5px] leading-relaxed mt-3 max-w-[46ch]">{ind.tagline}</p>
                <div className="mt-6 flex items-center gap-2 text-[12px] text-bronze font-mono">
                  <span>Read the chapter</span><span aria-hidden>→</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
      <FinalCTA />
    </PageShell>
  );
}
