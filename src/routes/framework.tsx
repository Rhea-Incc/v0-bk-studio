import { createFileRoute } from "@tanstack/react-router";
import { PageShell, PageHeader, Framework, Automation, FinalCTA, media } from "@/components/bk/shared";

export const Route = createFileRoute("/framework")({
  head: () => ({
    meta: [
      { title: "The Booking Engine Framework™ — BK Studio" },
      { name: "description", content: "Seven stages. One operating system for hospitality growth. Content, discovery, capture, booking, experience, retention, referral." },
      { property: "og:title", content: "The Booking Engine Framework™" },
      { property: "og:description", content: "A journey engineered end to end for hospitality brands." },
      { property: "og:image", content: media.signalImg.url },
      { name: "twitter:image", content: media.signalImg.url },
    ],
  }),
  component: () => (
    <PageShell>
      <PageHeader
        num="Chapter 04"
        kicker="Framework"
        title={<>A journey engineered <span className="italic">end to end.</span></>}
        lede="The Booking Engine Framework™ is our operating system for hospitality growth. Seven stages, each measurable, each hand-off deliberate."
      />
      <Framework />
      <Automation />
      <FinalCTA />
    </PageShell>
  ),
});
