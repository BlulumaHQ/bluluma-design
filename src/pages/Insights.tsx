import { Link } from "react-router-dom";
import { insights, insightTags } from "@/lib/insights";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useState } from "react";

import insight1 from "@/assets/insights/insight-1.jpg";
import insight2 from "@/assets/insights/insight-2.jpg";
import insight3 from "@/assets/insights/insight-3.jpg";
import insight4 from "@/assets/insights/insight-4.jpg";
import insight5 from "@/assets/insights/insight-5.jpg";
import insight6 from "@/assets/insights/insight-6.jpg";
import insight7 from "@/assets/insights/insight-7.jpg";
import insight8 from "@/assets/insights/insight-8.jpg";
import insight9 from "@/assets/insights/insight-9.jpg";
import insight10 from "@/assets/insights/insight-10.jpg";
import insight11 from "@/assets/insights/insight-11.jpg";
import insight12 from "@/assets/insights/insight-12.jpg";
import insight13 from "@/assets/insights/insight-13.jpg";
import insight14 from "@/assets/insights/insight-14.jpg";
import insight15 from "@/assets/insights/insight-15.jpg";

// Inline images per article
import workVs1 from "@/assets/insights/inline/work-vs-1.jpg";
import workVs2 from "@/assets/insights/inline/work-vs-2.jpg";
import workVs3 from "@/assets/insights/inline/work-vs-3.jpg";
import refresh1 from "@/assets/insights/inline/refresh-1.jpg";
import refresh2 from "@/assets/insights/inline/refresh-2.jpg";
import refresh3 from "@/assets/insights/inline/refresh-3.jpg";
import brand1 from "@/assets/insights/inline/brand-1.jpg";
import brand2 from "@/assets/insights/inline/brand-2.jpg";
import brand3 from "@/assets/insights/inline/brand-3.jpg";
import clean1 from "@/assets/insights/inline/clean-1.jpg";
import clean2 from "@/assets/insights/inline/clean-2.jpg";
import clean3 from "@/assets/insights/inline/clean-3.jpg";
import scale1 from "@/assets/insights/inline/scale-1.jpg";
import scale2 from "@/assets/insights/inline/scale-2.jpg";
import scale3 from "@/assets/insights/inline/scale-3.jpg";
import conversion1 from "@/assets/insights/inline/conversion-1.jpg";
import conversion2 from "@/assets/insights/inline/conversion-2.jpg";
import conversion3 from "@/assets/insights/inline/conversion-3.jpg";
import premium1 from "@/assets/insights/inline/premium-1.jpg";
import premium2 from "@/assets/insights/inline/premium-2.jpg";
import premium3 from "@/assets/insights/inline/premium-3.jpg";
import ai1 from "@/assets/insights/inline/ai-1.jpg";
import ai2 from "@/assets/insights/inline/ai-2.jpg";
import ai3 from "@/assets/insights/inline/ai-3.jpg";
import mistakes1 from "@/assets/insights/inline/mistakes-1.jpg";
import mistakes2 from "@/assets/insights/inline/mistakes-2.jpg";
import mistakes3 from "@/assets/insights/inline/mistakes-3.jpg";
import launch1 from "@/assets/insights/inline/launch-1.jpg";
import launch2 from "@/assets/insights/inline/launch-2.jpg";
import launch3 from "@/assets/insights/inline/launch-3.jpg";
import aiChanging1 from "@/assets/insights/inline/ai-changing-1.jpg";
import aiChanging2 from "@/assets/insights/inline/ai-changing-2.jpg";
import aiChanging3 from "@/assets/insights/inline/ai-changing-3.jpg";
import smallBiz1 from "@/assets/insights/inline/small-biz-1.jpg";
import smallBiz2 from "@/assets/insights/inline/small-biz-2.jpg";
import smallBiz3 from "@/assets/insights/inline/small-biz-3.jpg";
import brandingMistakes1 from "@/assets/insights/inline/branding-mistakes-1.jpg";
import brandingMistakes2 from "@/assets/insights/inline/branding-mistakes-2.jpg";
import brandingMistakes3 from "@/assets/insights/inline/branding-mistakes-3.jpg";
import converts1 from "@/assets/insights/inline/converts-1.jpg";
import converts2 from "@/assets/insights/inline/converts-2.jpg";
import converts3 from "@/assets/insights/inline/converts-3.jpg";
import shopify1 from "@/assets/insights/inline/shopify-1.jpg";
import shopify2 from "@/assets/insights/inline/shopify-2.jpg";
import shopify3 from "@/assets/insights/inline/shopify-3.jpg";

const insightImages: Record<string, string> = {
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

const insightInlineImages: Record<string, string[]> = {
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

export { insightImages, insightInlineImages };

const RevealSection = ({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) => {
  const ref = useScrollReveal({ delay });
  return <div ref={ref} className={className}>{children}</div>;
};

const Insights = () => {
  const [activeTag, setActiveTag] = useState<string | null>(null);

  const filtered = activeTag ? insights.filter((i) => i.tag === activeTag) : insights;

  return (
    <div>
      {/* Hero */}
      <section className="section-border">
        <div className="section-container py-16 md:py-24">
          <h1 className="text-4xl md:text-5xl font-bold">Insights</h1>
          <p className="mt-4 text-muted-foreground max-w-xl leading-relaxed">
            Ideas, processes, and practical observations from building brands and websites.
          </p>
          <p className="mt-2 text-muted-foreground max-w-xl leading-relaxed">
            These articles explore design systems, digital platforms, and the thinking behind modern agency work.
          </p>
        </div>
      </section>

      {/* Tags filter */}
      <section className="section-border">
        <div className="section-container py-4">
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setActiveTag(null)}
              className={`text-xs px-3 py-1.5 border transition-colors duration-200 ${
                activeTag === null
                  ? "border-primary text-primary"
                  : "border-border text-muted-foreground hover:border-foreground hover:text-foreground"
              }`}
            >
              All
            </button>
            {insightTags.map((tag) => (
              <button
                key={tag}
                onClick={() => setActiveTag(activeTag === tag ? null : tag)}
                className={`text-xs px-3 py-1.5 border transition-colors duration-200 ${
                  activeTag === tag
                    ? "border-primary text-primary"
                    : "border-border text-muted-foreground hover:border-foreground hover:text-foreground"
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Insights Grid */}
      <section>
        <div className="section-container section-padding">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-border border border-border">
            {filtered.map((insight, i) => (
              <RevealSection key={insight.slug} delay={i * 80}>
                <Link
                  to={`/insights/${insight.slug}`}
                  className="block bg-background group transition-all duration-300 hover:-translate-y-0.5"
                >
                  <div className="aspect-[16/9] bg-secondary border-b border-border overflow-hidden">
                    {insightImages[insight.slug] ? (
                      <img
                        src={insightImages[insight.slug]}
                        alt={`${insight.title} — web design insights from Bluluma Design`}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                        loading="lazy"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-muted-foreground text-xs">
                        <span className="opacity-40">Article Image</span>
                      </div>
                    )}
                  </div>
                  <div className="p-6 md:p-8">
                    <span className="text-[10px] uppercase tracking-widest text-primary font-medium">
                      {insight.tag}
                    </span>
                    <h3 className="text-lg font-semibold mt-2 mb-3 group-hover:text-primary transition-colors duration-200">
                      {insight.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                      {insight.summary}
                    </p>
                    <span className="text-xs text-foreground font-medium inline-flex items-center gap-1 group-hover:text-primary transition-colors duration-200">
                      Read Insight
                      <span className="transition-transform duration-200 group-hover:translate-x-0.5">→</span>
                    </span>
                  </div>
                </Link>
              </RevealSection>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Insights;
