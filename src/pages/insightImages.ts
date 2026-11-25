import insight1 from "@/assets/insights/work-vs-case-studies-cover.webp";
import insight2 from "@/assets/insights/website-refresh-checklist-2026-cover.webp";
import insight3 from "@/assets/insights/brand-identity-systems-cover.webp";
import insight4 from "@/assets/insights/how-we-design-clean-cover.webp";
import insight5 from "@/assets/insights/website-architecture-that-scales-cover.webp";
import insight6 from "@/assets/insights/conversion-ux-without-salesy-design-cover.webp";
import insight7 from "@/assets/insights/premium-agency-website-cover.webp";
import insight8 from "@/assets/insights/ai-in-website-production-cover.webp";
import insight9 from "@/assets/insights/website-mistakes-professional-services-cover.webp";
import insight10 from "@/assets/insights/launch-checklist-modern-websites-cover.webp";
import insight11 from "@/assets/insights/how-ai-is-changing-website-design-cover.webp";
import insight12 from "@/assets/insights/best-website-design-for-small-businesses-cover.webp";
import insight13 from "@/assets/insights/branding-mistakes-startups-make-cover.webp";
import insight14 from "@/assets/insights/how-to-build-a-website-that-converts-cover.webp";
import insight15 from "@/assets/insights/shopify-vs-custom-ecommerce-cover.webp";

import workVs1 from "@/assets/insights/inline/work-vs-case-studies-1.webp";
import workVs2 from "@/assets/insights/inline/work-vs-case-studies-2.webp";
import workVs3 from "@/assets/insights/inline/work-vs-case-studies-3.webp";
import refresh1 from "@/assets/insights/inline/website-refresh-checklist-2026-1.webp";
import refresh2 from "@/assets/insights/inline/website-refresh-checklist-2026-2.webp";
import refresh3 from "@/assets/insights/inline/website-refresh-checklist-2026-3.webp";
import brand1 from "@/assets/insights/inline/brand-identity-systems-1.webp";
import brand2 from "@/assets/insights/inline/brand-identity-systems-2.webp";
import brand3 from "@/assets/insights/inline/brand-identity-systems-3.webp";
import clean1 from "@/assets/insights/inline/how-we-design-clean-1.webp";
import clean2 from "@/assets/insights/inline/how-we-design-clean-2.webp";
import clean3 from "@/assets/insights/inline/how-we-design-clean-3.webp";
import scale1 from "@/assets/insights/inline/website-architecture-that-scales-1.webp";
import scale2 from "@/assets/insights/inline/website-architecture-that-scales-2.webp";
import scale3 from "@/assets/insights/inline/website-architecture-that-scales-3.webp";
import conversion1 from "@/assets/insights/inline/conversion-ux-without-salesy-design-1.webp";
import conversion2 from "@/assets/insights/inline/conversion-ux-without-salesy-design-2.webp";
import conversion3 from "@/assets/insights/inline/conversion-ux-without-salesy-design-3.webp";
import premium1 from "@/assets/insights/inline/premium-agency-website-1.webp";
import premium2 from "@/assets/insights/inline/premium-agency-website-2.webp";
import premium3 from "@/assets/insights/inline/premium-agency-website-3.webp";
import ai1 from "@/assets/insights/inline/ai-in-website-production-1.webp";
import ai2 from "@/assets/insights/inline/ai-in-website-production-2.webp";
import ai3 from "@/assets/insights/inline/ai-in-website-production-3.webp";
import mistakes1 from "@/assets/insights/inline/website-mistakes-professional-services-1.webp";
import mistakes2 from "@/assets/insights/inline/website-mistakes-professional-services-2.webp";
import mistakes3 from "@/assets/insights/inline/website-mistakes-professional-services-3.webp";
import launch1 from "@/assets/insights/inline/launch-checklist-modern-websites-1.webp";
import launch2 from "@/assets/insights/inline/launch-checklist-modern-websites-2.webp";
import launch3 from "@/assets/insights/inline/launch-checklist-modern-websites-3.webp";
import aiChanging1 from "@/assets/insights/inline/how-ai-is-changing-website-design-1.webp";
import aiChanging2 from "@/assets/insights/inline/how-ai-is-changing-website-design-2.webp";
import aiChanging3 from "@/assets/insights/inline/how-ai-is-changing-website-design-3.webp";
import smallBiz1 from "@/assets/insights/inline/best-website-design-for-small-businesses-1.webp";
import smallBiz2 from "@/assets/insights/inline/best-website-design-for-small-businesses-2.webp";
import smallBiz3 from "@/assets/insights/inline/best-website-design-for-small-businesses-3.webp";
import brandingMistakes1 from "@/assets/insights/inline/branding-mistakes-startups-make-1.webp";
import brandingMistakes2 from "@/assets/insights/inline/branding-mistakes-startups-make-2.webp";
import brandingMistakes3 from "@/assets/insights/inline/branding-mistakes-startups-make-3.webp";
import converts1 from "@/assets/insights/inline/how-to-build-a-website-that-converts-1.webp";
import converts2 from "@/assets/insights/inline/how-to-build-a-website-that-converts-2.webp";
import converts3 from "@/assets/insights/inline/how-to-build-a-website-that-converts-3.webp";
import shopify1 from "@/assets/insights/inline/shopify-vs-custom-ecommerce-1.webp";
import shopify2 from "@/assets/insights/inline/shopify-vs-custom-ecommerce-2.webp";
import shopify3 from "@/assets/insights/inline/shopify-vs-custom-ecommerce-3.webp";

const legacyImages: Record<string, string> = {
  "work-vs-case-studies": insight1,
  "website-refresh-checklist-2026": insight2,
  "brand-identity-systems": insight3,
  "how-we-design-clean": insight4,
  "website-architecture-that-scales": insight5,
  "conversion-ux-without-salesy-design": insight6,
  "premium-agency-website": insight7,
  "ai-in-website-production": insight8,
  "website-mistakes-professional-services": insight9,
  "launch-checklist-modern-websites": insight10,
  "how-ai-is-changing-website-design": insight11,
  "best-website-design-for-small-businesses": insight12,
  "branding-mistakes-startups-make": insight13,
  "how-to-build-a-website-that-converts": insight14,
  "shopify-vs-custom-ecommerce": insight15,
};

// Designed 4:3 feature images (src/assets/insights/featured/<slug>.webp) override the legacy ones.
const featuredFiles = import.meta.glob("@/assets/insights/featured/*.webp", { eager: true, import: "default" }) as Record<string, string>;
const featuredImages: Record<string, string> = Object.fromEntries(
  Object.entries(featuredFiles).map(([file, url]) => [file.split("/").pop()!.replace(/\.webp$/, ""), url]),
);

export const insightImages: Record<string, string> = { ...legacyImages, ...featuredImages };

export const insightInlineImages: Record<string, string[]> = {
  "work-vs-case-studies": [workVs1, workVs2, workVs3],
  "website-refresh-checklist-2026": [refresh1, refresh2, refresh3],
  "brand-identity-systems": [brand1, brand2, brand3],
  "how-we-design-clean": [clean1, clean2, clean3],
  "website-architecture-that-scales": [scale1, scale2, scale3],
  "conversion-ux-without-salesy-design": [conversion1, conversion2, conversion3],
  "premium-agency-website": [premium1, premium2, premium3],
  "ai-in-website-production": [ai1, ai2, ai3],
  "website-mistakes-professional-services": [mistakes1, mistakes2, mistakes3],
  "launch-checklist-modern-websites": [launch1, launch2, launch3],
  "how-ai-is-changing-website-design": [aiChanging1, aiChanging2, aiChanging3],
  "best-website-design-for-small-businesses": [smallBiz1, smallBiz2, smallBiz3],
  "branding-mistakes-startups-make": [brandingMistakes1, brandingMistakes2, brandingMistakes3],
  "how-to-build-a-website-that-converts": [converts1, converts2, converts3],
  "shopify-vs-custom-ecommerce": [shopify1, shopify2, shopify3],
};
