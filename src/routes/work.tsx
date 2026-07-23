import { createFileRoute } from "@tanstack/react-router";
import { PageShell, PageHeader, CaseStudies, Community, FinalCTA, media } from "@/components/bk/shared";

export const Route = createFileRoute("/work")({
  head: () => ({
    meta: [
      { title: "Work — BK Studio" },
      { name: "description", content: "Selected engagements from the last twenty-four months. Presented like consulting case files, not campaigns." },
      { property: "og:title", content: "Work — BK Studio" },
      { property: "og:description", content: "Quiet numbers. Loud outcomes." },
      { property: "og:image", content: media.moroccoImg.url },
      { name: "twitter:image", content: media.moroccoImg.url },
    ],
  }),
  component: () => (
    <PageShell>
      <PageHeader
        num="Chapter 05"
        kicker="Selected Work"
        title={<>Quiet numbers. <span className="italic">Loud outcomes.</span></>}
        lede="A small sample of engagements. Editorial presentation, minimal statistics, real results."
      />
      <CaseStudies />
      <Community />
      <FinalCTA />
    </PageShell>
  ),
});
