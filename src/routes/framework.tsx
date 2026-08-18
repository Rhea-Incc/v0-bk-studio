import { createFileRoute } from "@tanstack/react-router";
import { PageShell, PageHeader, Framework, Automation, FinalCTA, media } from "@/components/bk/shared";
import { canonicalUrl, professionalServiceSchema } from "@/lib/seo";

export const Route = createFileRoute("/framework")({
  head: () => ({
    meta: [
      { title: "The Booking Engine Framework™ — BK Studio" },
      { name: "description", content: "The Booking Engine Framework™ is BK Studio’s operating system for hospitality growth, covering content, discovery, lead capture, booking, experience, retention, and referral." },
      { property: "og:title", content: "The Booking Engine Framework™ — BK Studio" },
      { property: "og:description", content: "A journey engineered end to end for hospitality brands, travel operators, and destination businesses." },
      { property: "og:image", content: media.signalImg.url },
      { name: "twitter:image", content: media.signalImg.url },
    ],
    links: [
      { rel: "canonical", href: canonicalUrl("/framework") },
      { rel: "alternate", href: canonicalUrl("/framework"), hrefLang: "en" },
      { rel: "alternate", href: "https://bkstudio.lucene.co/framework", hrefLang: "en" },
    ],
    script: [{
      type: "application/ld+json",
      children: JSON.stringify(professionalServiceSchema(
        "The Booking Engine Framework™",
        "The Booking Engine Framework™ is BK Studio’s operating system for hospitality growth, covering content, discovery, lead capture, booking, experience, retention, and referral.",
        canonicalUrl("/framework"),
      )),
    }],
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
