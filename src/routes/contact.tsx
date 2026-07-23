import { createFileRoute } from "@tanstack/react-router";
import { PageShell, PageHeader, Eyebrow, media } from "@/components/bk/shared";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — BK Studio" },
      { name: "description", content: "A conversation is the natural first step. Tell us about your property and we'll be in touch." },
      { property: "og:title", content: "Contact — BK Studio" },
      { property: "og:description", content: "Book a strategy session." },
      { property: "og:image", content: media.gravityImg.url },
      { name: "twitter:image", content: media.gravityImg.url },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  return (
    <PageShell>
      <PageHeader
        num="Chapter 11"
        kicker="Contact"
        title={<>Begin with a <span className="italic">conversation.</span></>}
        lede="Tell us about your property, your audience and the outcome you want. We reply personally within two working days."
      />
      <section className="max-w-editorial container-x pb-32 md:pb-48">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16">
          <form className="md:col-span-7 space-y-6" onSubmit={(e) => e.preventDefault()} data-reveal>
            {[
              { l: "Your name", n: "name", t: "text" },
              { l: "Email", n: "email", t: "email" },
              { l: "Brand or property", n: "brand", t: "text" },
              { l: "Website", n: "website", t: "url" },
            ].map((f) => (
              <label key={f.n} className="block">
                <span className="divider-num">{f.l}</span>
                <input type={f.t} name={f.n} className="mt-2 w-full bg-transparent border-b hairline py-3 text-cocoa text-[16px] focus:outline-none focus:border-cocoa transition-colors" />
              </label>
            ))}
            <label className="block">
              <span className="divider-num">What are you building?</span>
              <textarea rows={5} className="mt-2 w-full bg-transparent border-b hairline py-3 text-cocoa text-[16px] focus:outline-none focus:border-cocoa transition-colors resize-none" />
            </label>
            <button type="submit" className="btn btn-primary mt-6">Send Request →</button>
          </form>
          <aside className="md:col-span-4 md:col-start-9 space-y-8" data-reveal>
            <div>
              <Eyebrow num="A">Email</Eyebrow>
              <a href="mailto:studio@bk.studio" className="font-serif text-2xl md:text-3xl text-cocoa mt-3 block break-words">studio@bk.studio</a>
            </div>
            <div>
              <Eyebrow num="B">Offices</Eyebrow>
              <p className="text-espresso text-[15px] leading-[1.7] mt-3">Lisbon · Marrakech · London.<br/>Partners globally.</p>
            </div>
            <div>
              <Eyebrow num="C">Availability</Eyebrow>
              <p className="text-espresso text-[15px] leading-[1.7] mt-3">Taking on three new partners for Q1.</p>
            </div>
          </aside>
        </div>
      </section>
    </PageShell>
  );
}
