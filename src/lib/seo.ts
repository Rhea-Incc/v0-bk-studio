export const SITE_DOMAINS = [
  "https://thebk.studio",
  "https://bkstudio.lucene.co",
] as const;

export const PUBLIC_PATHS = [
  "/",
  "/framework",
  "/services",
  "/work",
  "/studio",
  "/industries",
  "/contact",
  "/industries/boutique-hotels",
  "/industries/safari-lodges",
  "/industries/luxury-airbnb",
  "/industries/travel-brands",
  "/industries/restaurants",
  "/industries/coach-transport",
] as const;

export const canonicalUrl = (path = "/", domain = SITE_DOMAINS[0]) => {
  const safePath = path.startsWith("/") ? path : `/${path}`;
  return `${domain}${safePath}`;
};

export const buildSitemapXml = (domains = SITE_DOMAINS) => {
  const entries = PUBLIC_PATHS.map((path) => {
    const loc = `${domains[0]}${path}`;
    return `  <url>\n    <loc>${loc}</loc>\n    <lastmod>2026-08-18</lastmod>\n    <changefreq>monthly</changefreq>\n    <priority>${path === "/" ? "1.0" : "0.8"}</priority>\n  </url>`;
  }).join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${entries}\n</urlset>\n`;
};

export const buildRobotsTxt = (domains = SITE_DOMAINS) => {
  const sitemapLines = domains
    .map((domain) => `Sitemap: ${domain}/sitemap.xml`)
    .join("\n");

  return [
    "User-agent: *",
    "Allow: /",
    "",
    "Disallow: /auth",
    "Disallow: /_authenticated/",
    "Disallow: /dashboard",
    "Disallow: /onboarding",
    "Disallow: /admin",
    "",
    sitemapLines,
    "",
  ].join("\n");
};

export const organizationSchema = (domain = SITE_DOMAINS[0]) => ({
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "BK Studio",
  url: domain,
  logo: `${domain}/favicon.ico`,
  description: "BK Studio builds hospitality growth systems for boutique hotels, safari lodges, luxury Airbnb portfolios, travel brands, restaurants, and coach operators.",
  email: "studio@bk.studio",
  areaServed: "Worldwide",
  sameAs: SITE_DOMAINS,
  contactPoint: [{
    "@type": "ContactPoint",
    contactType: "sales",
    email: "studio@bk.studio",
    areaServed: "Worldwide",
    availableLanguage: ["English"],
  }],
});

export const professionalServiceSchema = (name: string, description: string, url: string, domain = SITE_DOMAINS[0]) => ({
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name,
  description,
  url,
  areaServed: "Worldwide",
  provider: {
    "@type": "Organization",
    name: "BK Studio",
    url: domain,
    sameAs: SITE_DOMAINS,
  },
  contactPoint: [{
    "@type": "ContactPoint",
    contactType: "sales",
    email: "studio@bk.studio",
    areaServed: "Worldwide",
  }],
});

export const contactPageSchema = (domain = SITE_DOMAINS[0]) => ({
  "@context": "https://schema.org",
  "@type": "ContactPage",
  name: "Contact BK Studio",
  url: `${domain}/contact`,
  description: "Book a strategy session with BK Studio for your hospitality brand, property, or growth challenge.",
  publisher: {
    "@type": "Organization",
    name: "BK Studio",
    url: domain,
    logo: `${domain}/favicon.ico`,
  },
  mainEntity: {
    "@type": "Organization",
    name: "BK Studio",
    email: "studio@bk.studio",
  },
});
