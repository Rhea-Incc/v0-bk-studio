import { createFileRoute } from "@tanstack/react-router";
import { PageShell, PageHeader, WhatWeBuild, ContentSystems, WhoWeHelp, FinalCTA, media } from "@/components/bk/shared";
import { canonicalUrl, professionalServiceSchema } from "@/lib/seo";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Services — BK Studio" },
      { name: "description", content: "BK Studio builds content systems, booking funnels, CRM automation, loyalty programs, and hospitality communities for hotels, lodges, short-term rentals, and destination brands." },
      { property: "og:title", content: "Services — BK Studio" },
      { property: "og:description", content: "A quiet catalogue of hospitality growth products designed to compound over time." },
      { property: "og:image", content: media.interiorImg.url },
      { name: "twitter:image", content: media.interiorImg.url },
    ],
    links: [
      { rel: "canonical", href: canonicalUrl("/services") },
      { rel: "alternate", href: canonicalUrl("/services"), hrefLang: "en" },
      { rel: "alternate", href: "https://bkstudio.lucene.co/services", hrefLang: "en" },
    ],
    script: [{
      type: "application/ld+json",
      children: JSON.stringify(professionalServiceSchema(
        "BK Studio Services",
        "BK Studio builds content systems, booking funnels, CRM automation, loyalty programs, and hospitality communities for hotels, lodges, short-term rentals, and destination brands.",
        canonicalUrl("/services"),
      )),
    }],
  }),
  component: () => (
    <PageShell>
      <PageHeader
        num="Chapter 03"
        kicker="Services"
        title={<>Products, <span className="italic">not services.</span></>}
        lede="Each capability is a discrete, well-made object. They compose into a single growth system tailored to your property."
      />
      <WhatWeBuild />
      <ContentSystems />
      <WhoWeHelp />
      <FinalCTA />
    </PageShell>
  ),
});
