import { createFileRoute } from "@tanstack/react-router";
import { PageShell, Hero, WhoWeHelp, Framework, FinalCTA, media } from "@/components/bk/shared";
import { canonicalUrl } from "@/lib/seo";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "BK Studio — Hospitality Growth Systems" },
      { name: "description", content: "BK Studio designs hospitality growth systems for boutique hotels, safari lodges, luxury Airbnb brands, travel companies, restaurants, and coach operators — with direct booking funnels, content systems, CRM, and retention strategy." },
      { property: "og:title", content: "BK Studio — Hospitality Growth Systems" },
      { property: "og:description", content: "Hospitality growth systems for boutique hotels, safari lodges, travel brands, restaurants, and coach operators — built around editorial content, direct booking, and retention." },
      { property: "og:image", content: media.gravityImg.url },
      { name: "twitter:image", content: media.gravityImg.url },
    ],
    links: [
      { rel: "canonical", href: canonicalUrl("/") },
      { rel: "alternate", href: canonicalUrl("/"), hrefLang: "en" },
      { rel: "alternate", href: "https://bkstudio.lucene.co/", hrefLang: "en" },
    ],
  }),
  component: () => (
    <PageShell>
      <Hero />
      <WhoWeHelp />
      <Framework full={false} />
      <FinalCTA />
    </PageShell>
  ),
});
