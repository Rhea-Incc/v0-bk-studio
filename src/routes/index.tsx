import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";

import heroVideo from "@/assets/hero.mp4.asset.json";
import glassImg from "@/assets/glass.jpg.asset.json";
import timberImg from "@/assets/timber.jpg.asset.json";
import bronzeImg from "@/assets/bronze.jpg.asset.json";
import gravityImg from "@/assets/gravity.png.asset.json";
import signalImg from "@/assets/signal.png.asset.json";
import moroccoImg from "@/assets/morocco.jpg.asset.json";
import interiorImg from "@/assets/interior.jpg.asset.json";
import dotsImg from "@/assets/dots.png.asset.json";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "BK Studio — Hospitality Growth Systems" },
      { name: "description", content: "We build hospitality growth systems. Content, booking funnels, CRM, automation and communities — for hotels, boutique lodges, luxury Airbnb operators and travel brands." },
      { property: "og:title", content: "BK Studio — Hospitality Growth Systems" },
      { property: "og:description", content: "Content, booking, CRM, automation, communities. Everything working together." },
      { property: "og:image", content: gravityImg.url },
      { name: "twitter:image", content: gravityImg.url },
    ],
  }),
  component: Landing,
});

/* ---------- primitives ---------- */

function Eyebrow({ children, num }: { children: React.ReactNode; num?: string }) {
  return (
    <div className="flex items-center gap-4 eyebrow">
      {num && <span className="text-bronze">{num}</span>}
      <span className="h-px w-8 bg-[var(--hairline)]" />
      <span>{children}</span>
    </div>
  );
}

function SectionHead({
  num, kicker, title, lede,
}: { num: string; kicker: string; title: React.ReactNode; lede?: string }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-end">
      <div className="md:col-span-5">
        <Eyebrow num={num}>{kicker}</Eyebrow>
        <h2 className="font-serif text-[clamp(2.4rem,5vw,4.5rem)] leading-[1.02] mt-6 text-cocoa">
          {title}
        </h2>
      </div>
      {lede && (
        <div className="md:col-span-6 md:col-start-7">
          <p className="text-espresso text-[17px] leading-[1.7] max-w-[52ch]">{lede}</p>
        </div>
      )}
    </div>
  );
}

/* ---------- nav ---------- */

function Nav() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 24);
    on(); window.addEventListener("scroll", on); return () => window.removeEventListener("scroll", on);
  }, []);
  return (
    <header className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${scrolled ? "backdrop-blur-md bg-[color-mix(in_oklab,var(--linen)_82%,transparent)] border-b" : ""}`}>
      <div className="max-w-editorial container-x flex items-center justify-between h-16">
        <a href="#top" className="flex items-center gap-3">
          <img src={dotsImg.url} alt="" className="h-6 w-6 object-contain" />
          <span className="font-serif text-xl tracking-tight text-cocoa">BK Studio</span>
        </a>
        <nav className="hidden md:flex items-center gap-10 text-[13px] text-espresso">
          <a href="#framework" className="hover:text-cocoa">Framework</a>
          <a href="#build" className="hover:text-cocoa">What We Build</a>
          <a href="#work" className="hover:text-cocoa">Work</a>
          <a href="#experience" className="hover:text-cocoa">Experience</a>
        </nav>
        <a href="#cta" className="btn btn-primary text-[12px] py-2.5 px-4">Book a Session</a>
      </div>
    </header>
  );
}

/* ---------- hero ---------- */

function Hero() {
  return (
    <section id="top" className="relative min-h-[100svh] overflow-hidden pt-16">
      {/* video woven into background */}
      <div className="absolute inset-0 -z-10">
        <video
          className="w-full h-full object-cover drift opacity-[0.55]"
          src={heroVideo.url}
          autoPlay muted loop playsInline
          poster={gravityImg.url}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--linen)]/70 via-[var(--linen)]/40 to-[var(--linen)]" />
        <div className="absolute inset-0" style={{
          background: "radial-gradient(1200px 600px at 80% 10%, rgba(176,141,87,0.10), transparent 60%), radial-gradient(900px 500px at 10% 90%, rgba(90,62,43,0.08), transparent 60%)"
        }} />
      </div>

      <div className="max-w-editorial container-x pt-16 md:pt-24 pb-24 relative">
        <div className="grid grid-cols-12 gap-6 md:gap-10">
          <div className="col-span-12 md:col-span-10 lg:col-span-9 fade-up">
            <Eyebrow num="00 / Studio">Hospitality Growth Systems, since 2019</Eyebrow>

            <h1 className="font-serif mt-10 text-[clamp(3rem,9vw,8.5rem)] leading-[0.96] text-cocoa tracking-[-0.02em]">
              We build hospitality<br/>
              <span className="italic text-espresso">growth systems.</span>
            </h1>

            <div className="mt-10 grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
              <div className="md:col-span-6">
                <p className="text-espresso text-[18px] leading-[1.7] max-w-[46ch]">
                  Content. Booking systems. CRM. Automation. Communities.
                  Every part of the guest journey, designed to work together —
                  quietly, and on repeat.
                </p>
              </div>
              <div className="md:col-span-5 md:col-start-8 flex flex-wrap items-center gap-3">
                <a href="#cta" className="btn btn-primary">Book a Strategy Session <span aria-hidden>→</span></a>
                <a href="#framework" className="btn btn-ghost">Explore Our Framework</a>
              </div>
            </div>
          </div>
        </div>

        {/* Flow strip */}
        <div className="mt-20 md:mt-32">
          <FlowStrip />
        </div>
      </div>
    </section>
  );
}

function FlowStrip() {
  const stages = ["Content", "Attention", "Lead Capture", "Booking", "Retention"];
  return (
    <div className="relative">
      <Eyebrow num="01">The Booking Engine · overview</Eyebrow>
      <div className="mt-8 relative">
        <svg viewBox="0 0 1200 40" className="w-full h-10">
          <line x1="0" y1="20" x2="1200" y2="20" stroke="var(--hairline)" strokeWidth="1" />
          <line x1="0" y1="20" x2="1200" y2="20" stroke="var(--bronze)" strokeWidth="1" className="flow-dash" />
          {stages.map((_, i) => {
            const x = (1200 / (stages.length - 1)) * i;
            return (
              <g key={i}>
                <circle cx={x} cy="20" r="4" fill="var(--cocoa)" />
                <circle cx={x} cy="20" r="10" fill="none" stroke="var(--bronze)" strokeOpacity="0.4" className="pulse-dot" style={{ transformOrigin: `${x}px 20px` }} />
              </g>
            );
          })}
        </svg>
        <div className="mt-4 grid grid-cols-5 gap-2 text-center">
          {stages.map((s, i) => (
            <div key={s} className="flex flex-col items-center">
              <span className="divider-num">0{i + 1}</span>
              <span className="mt-1 text-[13px] md:text-[14px] text-cocoa font-medium">{s}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ---------- Who We Help ---------- */

function WhoWeHelp() {
  const cards = [
    { t: "Hotels", d: "Independent and boutique hotel groups.", img: interiorImg.url },
    { t: "Boutique Lodges", d: "Design-forward stays in remarkable places.", img: timberImg.url },
    { t: "Luxury Airbnb", d: "Portfolios of premium short-stay properties.", img: interiorImg.url },
    { t: "Tour Operators", d: "Curated experiences and destination brands.", img: moroccoImg.url },
    { t: "Real Estate", d: "Branded residences and rental properties.", img: glassImg.url },
    { t: "Hospitality Startups", d: "New concepts building their first system.", img: bronzeImg.url },
  ];
  return (
    <section id="who" className="max-w-editorial container-x py-32 md:py-44">
      <SectionHead
        num="02"
        kicker="Who We Help"
        title={<>Brands we <span className="italic">quietly</span> compound.</>}
        lede="We partner with a small number of hospitality operators each year. Long engagements, high signal, measurable outcomes."
      />
      <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {cards.map((c, i) => (
          <article key={c.t} className="group relative overflow-hidden rounded-lg border hairline bg-[var(--linen-2)]">
            <div className="aspect-[4/5] overflow-hidden">
              <img src={c.img} alt={c.t} className="w-full h-full object-cover transition-transform duration-[1400ms] group-hover:scale-[1.04]" loading="lazy" />
            </div>
            <div className="p-6 flex items-start justify-between gap-4">
              <div>
                <span className="divider-num">0{i + 1}</span>
                <h3 className="font-serif text-2xl mt-1 text-cocoa">{c.t}</h3>
                <p className="text-espresso text-[14px] leading-relaxed mt-2 max-w-[32ch]">{c.d}</p>
              </div>
              <span className="text-bronze mt-2" aria-hidden>↗</span>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

/* ---------- What We Build ---------- */

function WhatWeBuild() {
  const products = [
    { n: "01", t: "Content Systems", d: "Editorial calendars, hooks, and story architectures." },
    { n: "02", t: "Booking Funnels", d: "High-intent conversion paths from post to reservation." },
    { n: "03", t: "Landing Pages", d: "Cinematic single-property and campaign pages." },
    { n: "04", t: "CRM Automation", d: "Guest lifecycles, tagged and orchestrated." },
    { n: "05", t: "Lead Management", d: "Inbound triage, qualification, and routing." },
    { n: "06", t: "WhatsApp Communities", d: "Warm, low-effort channels for repeat guests." },
    { n: "07", t: "Membership Programs", d: "Recurring value beyond the single stay." },
    { n: "08", t: "Loyalty Systems", d: "Referrals, tiers and returning revenue." },
    { n: "09", t: "DSP & Paid Media", d: "Precise acquisition, quietly compounding." },
  ];
  return (
    <section id="build" className="relative py-32 md:py-44 border-y hairline bg-[var(--linen-2)]">
      <div className="max-w-editorial container-x">
        <SectionHead
          num="03"
          kicker="What We Build"
          title={<>A quiet catalogue of <span className="italic">products</span>, not services.</>}
          lede="Each capability is a discrete, well-made object. They compose into a single growth system tailored to your property."
        />
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 border-t border-l hairline">
          {products.map((p) => (
            <div key={p.n} className="group border-b border-r hairline p-8 md:p-10 min-h-[220px] flex flex-col justify-between bg-[var(--linen-2)] hover:bg-[var(--linen)] transition-colors">
              <div className="flex items-center justify-between">
                <span className="divider-num">{p.n}</span>
                <span className="text-bronze opacity-0 group-hover:opacity-100 transition-opacity" aria-hidden>→</span>
              </div>
              <div className="mt-8">
                <h3 className="font-serif text-[28px] leading-tight text-cocoa">{p.t}</h3>
                <p className="text-espresso text-[14px] leading-relaxed mt-3 max-w-[36ch]">{p.d}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Framework ---------- */

function Framework() {
  const stages = [
    { t: "Content", d: "Editorial, story-first. Built to travel." },
    { t: "Discovery", d: "Search, social and word-of-mouth surfaces." },
    { t: "Lead Capture", d: "Intent captured with grace, not friction." },
    { t: "Booking", d: "Frictionless paths to a confirmed reservation." },
    { t: "Experience", d: "Anticipation, arrival, memory — orchestrated." },
    { t: "Retention", d: "Warm channels that stay open after check-out." },
    { t: "Referral", d: "Guests who bring the next generation of guests." },
  ];
  return (
    <section id="framework" className="relative py-32 md:py-44 overflow-hidden">
      <div className="absolute inset-x-0 top-0 h-[600px] -z-10 opacity-60">
        <img src={signalImg.url} alt="" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--linen)]/40 via-[var(--linen)]/70 to-[var(--linen)]" />
      </div>
      <div className="max-w-editorial container-x">
        <SectionHead
          num="04"
          kicker="The Booking Engine Framework™"
          title={<>A journey engineered<br/><span className="italic">end to end.</span></>}
          lede="Seven stages. One operating system for hospitality growth. Each stage measurable, each hand-off deliberate."
        />

        <div className="mt-20 relative">
          {/* horizontal rail on desktop */}
          <div className="hidden md:block">
            <svg viewBox="0 0 1400 60" className="w-full h-16">
              <line x1="20" y1="30" x2="1380" y2="30" stroke="var(--hairline)" />
              <line x1="20" y1="30" x2="1380" y2="30" stroke="var(--bronze)" strokeWidth="1" className="flow-dash" />
              {stages.map((_, i) => {
                const x = 20 + (1360 / (stages.length - 1)) * i;
                return (
                  <g key={i}>
                    <circle cx={x} cy="30" r="5" fill="var(--cocoa)" />
                    <circle cx={x} cy="30" r="14" fill="none" stroke="var(--bronze)" strokeOpacity="0.35" />
                  </g>
                );
              })}
            </svg>
            <div className="grid grid-cols-7 gap-4 mt-6">
              {stages.map((s, i) => (
                <div key={s.t} className="text-center px-2">
                  <div className="divider-num">0{i + 1}</div>
                  <h4 className="font-serif text-xl text-cocoa mt-1">{s.t}</h4>
                  <p className="text-espresso text-[12.5px] leading-relaxed mt-2">{s.d}</p>
                </div>
              ))}
            </div>
          </div>

          {/* vertical on mobile */}
          <ol className="md:hidden relative pl-8 space-y-8 border-l hairline">
            {stages.map((s, i) => (
              <li key={s.t} className="relative">
                <span className="absolute -left-[35px] top-1.5 h-3 w-3 rounded-full bg-cocoa ring-4 ring-[var(--bronze)]/25" />
                <div className="divider-num">0{i + 1}</div>
                <h4 className="font-serif text-2xl text-cocoa mt-1">{s.t}</h4>
                <p className="text-espresso text-[14px] leading-relaxed mt-2 max-w-[42ch]">{s.d}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

/* ---------- Case studies ---------- */

function CaseStudies() {
  const cases = [
    {
      img: interiorImg.url,
      client: "Maison Aurel",
      type: "Boutique Hotel · France",
      metrics: [
        { k: "Occupancy", v: "+41%", note: "12-month rolling" },
        { k: "Direct Bookings", v: "3.2×", note: "vs. prior year" },
        { k: "Lead-to-guest", v: "18%", note: "from 6%" },
      ],
    },
    {
      img: moroccoImg.url,
      client: "Atlas Voyages",
      type: "Luxury Tours · Morocco",
      metrics: [
        { k: "Qualified Leads", v: "+280%", note: "quarterly" },
        { k: "Avg. Booking Value", v: "+62%", note: "premium tier" },
        { k: "Repeat Guests", v: "34%", note: "referral loop" },
      ],
    },
    {
      img: timberImg.url,
      client: "North Ridge Lodges",
      type: "Boutique Lodges · Alps",
      metrics: [
        { k: "Engagement", v: "8.7%", note: "on-platform" },
        { k: "CRM Base", v: "12,400", note: "opted-in guests" },
        { k: "Bookings", v: "+96%", note: "off-season" },
      ],
    },
  ];
  return (
    <section id="work" className="max-w-editorial container-x py-32 md:py-44">
      <SectionHead
        num="05"
        kicker="Selected Work"
        title={<>Quiet numbers. <span className="italic">Loud outcomes.</span></>}
        lede="A small sample of engagements from the last twenty-four months. Presented like consulting case files, not campaigns."
      />

      <div className="mt-20 space-y-28">
        {cases.map((c, i) => (
          <article key={c.client} className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-center">
            <div className={`md:col-span-7 ${i % 2 ? "md:order-2" : ""}`}>
              <div className="aspect-[4/3] overflow-hidden rounded-md">
                <img src={c.img} alt={c.client} className="w-full h-full object-cover" loading="lazy" />
              </div>
            </div>
            <div className={`md:col-span-5 ${i % 2 ? "md:order-1" : ""}`}>
              <div className="divider-num">Case 0{i + 1}</div>
              <h3 className="font-serif text-4xl text-cocoa mt-2">{c.client}</h3>
              <p className="text-espresso text-[14px] mt-1">{c.type}</p>
              <div className="mt-10 space-y-6">
                {c.metrics.map((m) => (
                  <div key={m.k} className="grid grid-cols-12 items-baseline gap-4 border-b hairline pb-4">
                    <div className="col-span-5 text-espresso text-[13px]">{m.k}</div>
                    <div className="col-span-4 font-serif text-3xl text-cocoa">{m.v}</div>
                    <div className="col-span-3 text-[12px] text-espresso/70">{m.note}</div>
                  </div>
                ))}
              </div>
              <a href="#cta" className="mt-8 inline-flex items-center gap-2 text-cocoa text-[13px] border-b border-cocoa/40 hover:border-cocoa">Read the case →</a>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

/* ---------- Content Systems (dashboard snapshot) ---------- */

function ContentSystems() {
  return (
    <section className="relative py-32 md:py-44 border-y hairline bg-[var(--linen-2)] overflow-hidden">
      <div className="max-w-editorial container-x">
        <SectionHead
          num="06"
          kicker="Content Systems"
          title={<>Stories that <span className="italic">book rooms.</span></>}
          lede="We treat content as infrastructure. Editorial calendars, hook libraries and story arcs designed to route attention into reservations."
        />

        <div className="mt-16 grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Editorial calendar dashboard */}
          <div className="lg:col-span-7 rounded-xl border hairline bg-[var(--linen)] shadow-[var(--shadow-warm)] overflow-hidden">
            <div className="flex items-center justify-between px-5 py-3 border-b hairline">
              <div className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-[var(--bronze)]" />
                <span className="font-mono text-[11px] tracking-wider text-espresso">bk.studio / editorial · Q3</span>
              </div>
              <div className="flex items-center gap-3 font-mono text-[11px] text-espresso">
                <span>Reels 24</span><span>Carousels 18</span><span>Stories 62</span>
              </div>
            </div>
            <div className="p-5">
              <div className="grid grid-cols-7 gap-1.5">
                {["M","T","W","T","F","S","S"].map((d,i)=>(
                  <div key={i} className="text-[10px] font-mono text-espresso/60 text-center pb-1">{d}</div>
                ))}
                {Array.from({length:35}).map((_,i)=>{
                  const intensity = [0,0.25,0.5,0.15,0.8,0.35,0.6,0,0.9,0.4,0.2,0.55,0.7,0.1,0.3,0.65,0,0.45,0.85,0.25,0.5,0.6,0.2,0.4,0.75,0.1,0.55,0,0.35,0.9,0.3,0.6,0.15,0.5,0.4][i];
                  return (
                    <div key={i} className="aspect-square rounded-sm relative" style={{background:`color-mix(in oklab, var(--bronze) ${intensity*70}%, var(--linen-2))`, borderColor:"var(--hairline)"}}>
                      <span className="absolute top-1 left-1 text-[9px] font-mono text-espresso/60">{i+1}</span>
                    </div>
                  );
                })}
              </div>
              <div className="mt-6 grid grid-cols-3 gap-4 pt-6 border-t hairline">
                <Stat label="Reach" value="1.8M" delta="+38%"/>
                <Stat label="Saves" value="42.1k" delta="+61%"/>
                <Stat label="Bookings attributed" value="312" delta="+22%"/>
              </div>
            </div>
          </div>

          {/* Hook library */}
          <div className="lg:col-span-5 rounded-xl border hairline bg-[var(--linen)] p-6 shadow-[var(--shadow-warm)]">
            <div className="flex items-center justify-between">
              <div className="font-mono text-[11px] tracking-wider text-espresso">Hook Library / top performers</div>
              <span className="text-bronze font-mono text-[11px]">week 34</span>
            </div>
            <ul className="mt-6 space-y-5">
              {[
                { h: "The suite no one is supposed to know about.", ctr: "6.4%" },
                { h: "Three quiet mornings in a house of stone.", ctr: "5.9%" },
                { h: "What the concierge books for herself.", ctr: "5.2%" },
                { h: "A tour designed by the people who live there.", ctr: "4.8%" },
                { h: "Off-season is the season for this villa.", ctr: "4.1%" },
              ].map((r) => (
                <li key={r.h} className="grid grid-cols-12 items-baseline gap-3 pb-4 border-b hairline">
                  <span className="col-span-9 font-serif text-[17px] leading-snug text-cocoa">{r.h}</span>
                  <span className="col-span-3 text-right font-mono text-[12px] text-bronze">{r.ctr}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

function Stat({ label, value, delta }: { label: string; value: string; delta: string }) {
  return (
    <div>
      <div className="font-mono text-[10px] uppercase tracking-widest text-espresso/70">{label}</div>
      <div className="font-serif text-2xl text-cocoa mt-1">{value}</div>
      <div className="font-mono text-[11px] text-bronze mt-0.5">{delta}</div>
    </div>
  );
}

/* ---------- Automation diagram ---------- */

function Automation() {
  const nodes = ["Instagram","Landing Page","CRM","WhatsApp","Booking","Follow-up","Loyalty"];
  return (
    <section className="max-w-editorial container-x py-32 md:py-44">
      <SectionHead
        num="07"
        kicker="Automation"
        title={<>Systems that <span className="italic">run without you.</span></>}
        lede="A single flow — from first impression to loyal returning guest. Every hand-off automated, every touchpoint on-brand."
      />

      <div className="mt-16 rounded-2xl border hairline bg-[var(--linen-2)] p-6 md:p-12 shadow-[var(--shadow-soft)]">
        {/* Desktop diagram */}
        <div className="hidden md:block relative">
          <svg viewBox="0 0 1200 220" className="w-full h-[220px]">
            <defs>
              <marker id="arr" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
                <path d="M0,0 L10,5 L0,10 z" fill="var(--espresso)" />
              </marker>
            </defs>
            {nodes.map((n, i) => {
              const x = 80 + (1040 / (nodes.length - 1)) * i;
              return (
                <g key={n}>
                  <circle cx={x} cy="110" r="34" fill="var(--linen)" stroke="var(--hairline)" />
                  <circle cx={x} cy="110" r="4" fill="var(--bronze)" />
                  <text x={x} y="180" textAnchor="middle" fontSize="12" fill="var(--cocoa)" fontFamily="Inter Tight, sans-serif">{n}</text>
                  {i < nodes.length - 1 && (
                    <line x1={x + 36} y1="110" x2={x + (1040 / (nodes.length - 1)) - 36} y2="110" stroke="var(--espresso)" strokeOpacity="0.4" markerEnd="url(#arr)" strokeDasharray="4 6" />
                  )}
                  <text x={x} y="60" textAnchor="middle" fontSize="10" fill="var(--espresso)" fontFamily="JetBrains Mono, monospace">0{i+1}</text>
                </g>
              );
            })}
          </svg>
        </div>
        {/* Mobile */}
        <ol className="md:hidden space-y-4">
          {nodes.map((n, i) => (
            <li key={n} className="flex items-center gap-4">
              <span className="h-10 w-10 shrink-0 rounded-full bg-[var(--linen)] border hairline grid place-items-center font-mono text-[11px] text-espresso">0{i+1}</span>
              <span className="font-serif text-xl text-cocoa">{n}</span>
            </li>
          ))}
        </ol>

        {/* Insight rail */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-4 gap-6 pt-8 border-t hairline">
          <Stat label="Avg. response time" value="42s" delta="from 6h"/>
          <Stat label="No-show rate" value="3.1%" delta="-58%"/>
          <Stat label="CRM tags active" value="184" delta="fully mapped"/>
          <Stat label="Guest LTV" value="+2.4×" delta="year-on-year"/>
        </div>
      </div>
    </section>
  );
}

/* ---------- Community ---------- */

function Community() {
  return (
    <section className="relative py-32 md:py-44 overflow-hidden">
      <div className="max-w-editorial container-x grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-14 items-center">
        <div className="md:col-span-6 relative">
          <div className="aspect-[4/5] rounded-lg overflow-hidden">
            <img src={glassImg.url} alt="Community" className="w-full h-full object-cover" loading="lazy" />
          </div>
          <div className="absolute -bottom-8 -right-6 w-48 md:w-64 rounded-xl bg-[var(--linen)] border hairline p-4 shadow-[var(--shadow-warm)]">
            <div className="font-mono text-[10px] tracking-widest text-espresso">MEMBERS</div>
            <div className="font-serif text-3xl md:text-4xl text-cocoa mt-1">12,480</div>
            <div className="mt-3 flex items-center gap-1.5">
              {[70,45,88,32,60,50,90].map((h,i)=>(
                <div key={i} className="w-3 rounded-sm" style={{height:h*0.5, background:"color-mix(in oklab, var(--bronze) 60%, var(--linen-2))"}} />
              ))}
            </div>
          </div>
        </div>

        <div className="md:col-span-6">
          <Eyebrow num="08">Community</Eyebrow>
          <h2 className="font-serif text-[clamp(2.2rem,4.4vw,4rem)] leading-[1.05] mt-6 text-cocoa">
            The quietest asset<br/><span className="italic">on your balance sheet.</span>
          </h2>
          <p className="text-espresso text-[16px] leading-[1.7] mt-6 max-w-[52ch]">
            VIP circles, membership tiers, referral loops. We design ecosystems where a first stay becomes a decade of return.
          </p>
          <ul className="mt-10 space-y-4">
            {[
              "VIP guest communities on WhatsApp & private feeds",
              "Membership tiers with genuine, non-gimmick perks",
              "Referral loops that compound month over month",
              "Repeat-guest programmes and off-season retention",
            ].map((t) => (
              <li key={t} className="flex items-start gap-4 border-b hairline pb-4">
                <span className="mt-2 h-1.5 w-1.5 rounded-full bg-bronze shrink-0" />
                <span className="text-cocoa text-[15px]">{t}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

/* ---------- Principles ---------- */

function Principles() {
  const items = [
    ["Systems", "over posts"],
    ["Revenue", "over reach"],
    ["Bookings", "over followers"],
    ["Automation", "over manual work"],
    ["Relationships", "over transactions"],
    ["Brand equity", "over trends"],
  ];
  return (
    <section className="relative py-32 md:py-44 border-y hairline bg-[var(--linen-2)] overflow-hidden">
      <img src={bronzeImg.url} alt="" className="absolute inset-0 w-full h-full object-cover opacity-[0.08] mix-blend-multiply -z-0" />
      <div className="max-w-editorial container-x relative">
        <SectionHead
          num="09"
          kicker="Why BK Studio"
          title={<>Principles, <span className="italic">not features.</span></>}
        />
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 border-t border-l hairline">
          {items.map(([a, b], i) => (
            <div key={a} className="border-b border-r hairline p-8 md:p-12">
              <span className="divider-num">0{i + 1}</span>
              <div className="mt-6 flex flex-wrap items-baseline gap-x-4 gap-y-1">
                <span className="font-serif text-[clamp(2rem,4vw,3.4rem)] text-cocoa leading-none">{a}</span>
                <span className="font-serif italic text-espresso text-[clamp(1.2rem,2vw,1.8rem)]">{b}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Client experience ---------- */

function ClientExperience() {
  const steps = [
    { t: "Discovery", d: "Immersion into your brand, guests and numbers.", w: "Week 01" },
    { t: "Strategy", d: "A single, editable operating document.", w: "Week 02–03" },
    { t: "Content", d: "Story architecture and editorial pipeline.", w: "Week 03–06" },
    { t: "Systems", d: "CRM, funnels, automations wired end-to-end.", w: "Week 04–08" },
    { t: "Launch", d: "Careful go-live. Nothing left assumed.", w: "Week 08" },
    { t: "Optimization", d: "Weekly reads. Quiet, deliberate refinement.", w: "Ongoing" },
    { t: "Scale", d: "New properties, new markets, same system.", w: "Quarter+2" },
  ];
  return (
    <section id="experience" className="max-w-editorial container-x py-32 md:py-44">
      <SectionHead
        num="10"
        kicker="Client Experience"
        title={<>The engagement, <span className="italic">unhurried.</span></>}
        lede="A single timeline, from discovery to scale. Weekly rhythm, quarterly reviews, and a clear sightline throughout."
      />
      <ol className="mt-16 relative border-l hairline">
        {steps.map((s, i) => (
          <li key={s.t} className="pl-8 md:pl-14 pb-12 relative">
            <span className="absolute -left-[7px] top-2 h-3 w-3 rounded-full bg-cocoa ring-4 ring-[var(--bronze)]/25" />
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-10 items-baseline">
              <div className="md:col-span-2 divider-num">{s.w}</div>
              <div className="md:col-span-3">
                <div className="divider-num">0{i + 1}</div>
                <h4 className="font-serif text-3xl text-cocoa mt-1">{s.t}</h4>
              </div>
              <p className="md:col-span-7 text-espresso text-[15px] leading-[1.7] max-w-[54ch]">{s.d}</p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}

/* ---------- Final CTA ---------- */

function FinalCTA() {
  return (
    <section id="cta" className="relative py-32 md:py-48 overflow-hidden border-t hairline">
      <video
        className="absolute inset-0 w-full h-full object-cover opacity-40 -z-10"
        src={heroVideo.url}
        autoPlay muted loop playsInline
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-[var(--linen)]/80 via-[var(--linen)]/70 to-[var(--linen)]" />
      <div className="max-w-editorial container-x text-center">
        <Eyebrow num="11">A conversation</Eyebrow>
        <h2 className="font-serif text-[clamp(2.6rem,7vw,7rem)] leading-[0.98] text-cocoa mt-8">
          Stop renting attention.<br/><span className="italic text-espresso">Start owning your bookings.</span>
        </h2>
        <p className="text-espresso text-[17px] leading-[1.7] max-w-[52ch] mx-auto mt-8">
          We take on a small number of hospitality partners each quarter. A conversation is the natural first step.
        </p>
        <div className="mt-12 flex flex-wrap gap-3 justify-center">
          <a href="#" className="btn btn-primary">Book Your Strategy Session →</a>
          <a href="#work" className="btn btn-ghost">View Case Studies</a>
        </div>
      </div>
    </section>
  );
}

/* ---------- Footer ---------- */

function Footer() {
  return (
    <footer className="border-t hairline">
      <div className="max-w-editorial container-x py-20 grid grid-cols-1 md:grid-cols-12 gap-10">
        <div className="md:col-span-5">
          <div className="flex items-center gap-3">
            <img src={dotsImg.url} alt="" className="h-6 w-6" />
            <span className="font-serif text-2xl text-cocoa">BK Studio</span>
          </div>
          <p className="mt-6 text-espresso text-[14px] max-w-[38ch] leading-relaxed">
            A hospitality growth studio. We build content-driven booking systems for brands worth remembering.
          </p>
        </div>
        <div className="md:col-span-2">
          <div className="divider-num mb-4">Studio</div>
          <ul className="space-y-2 text-cocoa text-[14px]">
            <li><a href="#framework">Framework</a></li>
            <li><a href="#build">Products</a></li>
            <li><a href="#work">Work</a></li>
          </ul>
        </div>
        <div className="md:col-span-2">
          <div className="divider-num mb-4">Social</div>
          <ul className="space-y-2 text-cocoa text-[14px]">
            <li><a href="#">Instagram</a></li>
            <li><a href="#">LinkedIn</a></li>
            <li><a href="#">Journal</a></li>
          </ul>
        </div>
        <div className="md:col-span-3">
          <div className="divider-num mb-4">Contact</div>
          <a href="mailto:studio@bk.studio" className="font-serif text-2xl text-cocoa hover:text-espresso">studio@bk.studio</a>
          <p className="text-espresso text-[13px] mt-3">Working with hospitality brands worldwide.</p>
        </div>
      </div>
      <div className="border-t hairline">
        <div className="max-w-editorial container-x py-6 flex flex-wrap items-center justify-between text-[12px] text-espresso font-mono">
          <div>© {new Date().getFullYear()} BK Studio. All rights reserved.</div>
          <div className="flex gap-6"><a href="#">Privacy</a><a href="#">Terms</a></div>
        </div>
      </div>
    </footer>
  );
}

/* ---------- Landing ---------- */

function Landing() {
  // Reveal on scroll
  const rootRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) e.target.classList.add("fade-up"); });
    }, { threshold: 0.08 });
    rootRef.current?.querySelectorAll("section > *").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <div ref={rootRef} className="relative min-h-screen">
      <Nav />
      <main>
        <Hero />
        <WhoWeHelp />
        <WhatWeBuild />
        <Framework />
        <CaseStudies />
        <ContentSystems />
        <Automation />
        <Community />
        <Principles />
        <ClientExperience />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
}
