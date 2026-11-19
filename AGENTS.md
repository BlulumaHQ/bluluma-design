# Architecture

- Keep portfolio listings and details on the existing central CMS `portfolio_feed` reader; presentation changes must not alter its filtering or ordering.
- Share screenshot scrolling and per-preview hint state through `PortfolioScreenshotViewport`; card previews defer touch scrolling to the page, while phone previews remain scrollable.
- Industry pages share IndustryHeader, IndustryHeroCollage, IndustryWork, and the industry-theme/legacy healthcare-theme palette; category selectors sample feed copies and counts use the full matching pool so CMS ordering remains unchanged.
- Match industry categories directly against feed-derived category slugs; keep legacy category redirects in portfolioRedirects and project URLs on the existing slug resolver to avoid redirect loops without changing CMS filtering.
- Homepage project curation lives in a pure selector that samples feed copies; preview auto-scrolling is opt-in so other portfolio surfaces retain their behavior.
- Homepage carousel timing is isolated in useHeroCarousel; homepage/chrome styling uses site-* and home-* selectors so legacy industry styles remain unchanged.
- Interior-page restyling is scoped under site-page, with SiteFinalCTA and SiteBrowserFrame for presentation only; protected homepage/chrome/industry selectors and portfolio/form logic remain independent.
- Package pricing (Nov 2026: Healthcare $1,688 + $149/mo, Realtor $1,288 + $68/mo, Pre-sale from $6,888 + $399/mo during sales) lives only in src/lib/packagePricing.ts (PACKAGES) and renders through PackagePricing / PlanPrice / IndustryLandingHero; never hardcode prices elsewhere. Portfolio titles render through displayTitle() (suffix stripped) plus VersionBadge ("Version A/B", from versionLetter()); detail pages link to the sibling version. Bluluma does not market "two design directions" — never add that claim to copy.

# SEO rules (required on every change)

- Whenever you change a page's content, update that page's title/description in src/lib/seoRoutes.ts (both en and zh) and set its `updated` date to today — it feeds sitemap <lastmod>. Do not leave meta descriptions describing old content or old prices.
- Page meta comes from seoRoutes via LocaleHead; do not add per-page useDocumentMeta overrides for routes listed there.
- Hero/marketing images live in public/images/<section>/ with descriptive, hyphenated SEO filenames (e.g. tsai-orthodontics-vancouver-website-design.webp), WebP, with width/height and meaningful alt text. Never use CMS/Supabase screenshot URLs for hero images.
- Every static route must ship real body text in the pre-rendered HTML (scripts/prerenderPlugin.ts), not an empty #root, so non-JS crawlers and AI search can read it.
- All copy is bilingual: add the zh (Traditional Chinese, Taiwan wording) string for every new en string.
- Homepage hero slides and industry landing heroes share components in src/components/HeroVisuals.tsx and IndustryLandingHero.tsx; styles in src/styles/hero.css.

