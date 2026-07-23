import { createFileRoute } from "@tanstack/react-router";
import { PageShell, PageHeader, WhatWeBuild, ContentSystems, WhoWeHelp, FinalCTA, media } from "@/components/bk/shared";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Services — BK Studio" },
      { name: "description", content: "Content systems, booking funnels, CRM automation, WhatsApp communities, membership and loyalty. Every capability designed to compose." },
      { property: "og:title", content: "Services — BK Studio" },
      { property: "og:description", content: "A quiet catalogue of products, not services." },
      { property: "og:image", content: media.interiorImg.url },
      { name: "twitter:image", content: media.interiorImg.url },
    ],
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
