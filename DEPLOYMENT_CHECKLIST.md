# BK Studio deployment checklist

## Domain setup
- [ ] Point thebk.studio to the production hosting origin
- [ ] Point bkstudio.lucene.co to the same production origin or the intended alternate deployment
- [ ] Confirm DNS propagation for apex and www records (if used)
- [ ] Enable HTTPS and automatic certificate renewal
- [ ] Verify both domains resolve correctly in browser and curl

## SEO fundamentals
- [ ] Ensure canonical URLs resolve to the main domain: https://thebk.studio/
- [ ] Keep alternate language/host tags aligned with the active domain set
- [ ] Confirm sitemap is served at https://thebk.studio/sitemap.xml
- [ ] Confirm robots.txt is served at https://thebk.studio/robots.txt
- [ ] Check that private app routes remain excluded from crawl

## Search console and indexing
- [ ] Add thebk.studio to Google Search Console
- [ ] Add bkstudio.lucene.co to Search Console if it should be indexed independently
- [ ] Submit sitemap.xml for both domains
- [ ] Request indexing for the homepage and key landing pages
- [ ] Validate Open Graph and social previews in Facebook/LinkedIn/X sharing tools

## Brand assets
- [ ] Confirm favicon loads from /favicon.svg
- [ ] Confirm manifest is served at /site.webmanifest
- [ ] Confirm OG image renders at /og-image.svg with correct proportions
- [ ] Validate browser tab icon and mobile home screen icon

## Performance and monitoring
- [ ] Run a Lighthouse pass on the homepage and an industry page
- [ ] Check Core Web Vitals after launch
- [ ] Set up uptime monitoring for both domains
- [ ] Review 404s and redirect rules after deployment

## Final launch gate
- [ ] Homepage loads without errors
- [ ] Contact form works
- [ ] Industry pages render
- [ ] PDF monograph file downloads correctly
- [ ] All public routes are indexable and private routes are not
- [ ] Deployment approved for public launch
