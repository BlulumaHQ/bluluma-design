import { useParams, Link } from "react-router-dom";
import HexPattern from "@/components/HexPattern";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { insights } from "@/lib/insights";
import { useLang } from "@/lib/i18n";

const RevealSection = ({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) => {
  const ref = useScrollReveal<HTMLDivElement>({ delay });
  return <div ref={ref} className={className}>{children}</div>;
};

interface ServiceData {
  titleKey: string;
  introKey: string;
  metaDescription: string;
  sections: { headingKey: string; bodyKey: string }[];
  relatedInsights: string[];
  relatedServices: { titleKey: string; to: string }[];
}

const serviceData: Record<string, ServiceData> = {
  "web-design": {
    titleKey: "svc.web-design.title",
    introKey: "svc.web-design.intro",
    metaDescription: "Custom website design and development by Bluluma Design Agency. Modern, fast, and conversion-optimized websites for growing businesses.",
    sections: [
      { headingKey: "svc.web-design.s1.h", bodyKey: "svc.web-design.s1.b" },
      { headingKey: "svc.web-design.s2.h", bodyKey: "svc.web-design.s2.b" },
      { headingKey: "svc.web-design.s3.h", bodyKey: "svc.web-design.s3.b" },
      { headingKey: "svc.web-design.s4.h", bodyKey: "svc.web-design.s4.b" },
    ],
    relatedInsights: ["how-ai-is-changing-website-design", "how-to-build-a-website-that-converts", "best-website-design-for-small-businesses"],
    relatedServices: [
      { titleKey: "svc.ecom.title", to: "/services/ecommerce-websites" },
      { titleKey: "svc.mkt.title", to: "/services/digital-marketing" },
    ],
  },
  "ecommerce-websites": {
    titleKey: "svc.ecom.title",
    introKey: "svc.ecom.intro",
    metaDescription: "Shopify and custom ecommerce website design by Bluluma. Online stores built for product presentation, user experience, and sales conversion.",
    sections: [
      { headingKey: "svc.ecom.s1.h", bodyKey: "svc.ecom.s1.b" },
      { headingKey: "svc.ecom.s2.h", bodyKey: "svc.ecom.s2.b" },
      { headingKey: "svc.ecom.s3.h", bodyKey: "svc.ecom.s3.b" },
      { headingKey: "svc.ecom.s4.h", bodyKey: "svc.ecom.s4.b" },
    ],
    relatedInsights: ["shopify-vs-custom-ecommerce", "how-to-build-a-website-that-converts"],
    relatedServices: [
      { titleKey: "svc.web-design.title", to: "/services/web-design" },
      { titleKey: "svc.brand.title", to: "/services/branding-design" },
    ],
  },
  "branding-design": {
    titleKey: "svc.brand.title",
    introKey: "svc.brand.intro",
    metaDescription: "Professional branding and identity design by Bluluma. Logo design, visual systems, and brand guidelines for businesses that want to stand out.",
    sections: [
      { headingKey: "svc.brand.s1.h", bodyKey: "svc.brand.s1.b" },
      { headingKey: "svc.brand.s2.h", bodyKey: "svc.brand.s2.b" },
      { headingKey: "svc.brand.s3.h", bodyKey: "svc.brand.s3.b" },
      { headingKey: "svc.brand.s4.h", bodyKey: "svc.brand.s4.b" },
    ],
    relatedInsights: ["branding-mistakes-startups-make", "best-website-design-for-small-businesses"],
    relatedServices: [
      { titleKey: "svc.web-design.title", to: "/services/web-design" },
      { titleKey: "svc.mkt.title", to: "/services/digital-marketing" },
    ],
  },
  "ai-automation": {
    titleKey: "svc.ai.title",
    introKey: "svc.ai.intro",
    metaDescription: "AI-powered business automation by Bluluma. Chatbots, workflow automation, and intelligent tools that streamline operations for modern businesses.",
    sections: [
      { headingKey: "svc.ai.s1.h", bodyKey: "svc.ai.s1.b" },
      { headingKey: "svc.ai.s2.h", bodyKey: "svc.ai.s2.b" },
      { headingKey: "svc.ai.s3.h", bodyKey: "svc.ai.s3.b" },
      { headingKey: "svc.ai.s4.h", bodyKey: "svc.ai.s4.b" },
    ],
    relatedInsights: ["how-ai-is-changing-website-design"],
    relatedServices: [
      { titleKey: "svc.web-design.title", to: "/services/web-design" },
      { titleKey: "svc.mkt.title", to: "/services/digital-marketing" },
    ],
  },
  "digital-marketing": {
    titleKey: "svc.mkt.title",
    introKey: "svc.mkt.intro",
    metaDescription: "Digital marketing services by Bluluma. SEO, social media marketing, and paid advertising for businesses that want to grow online.",
    sections: [
      { headingKey: "svc.mkt.s1.h", bodyKey: "svc.mkt.s1.b" },
      { headingKey: "svc.mkt.s2.h", bodyKey: "svc.mkt.s2.b" },
      { headingKey: "svc.mkt.s3.h", bodyKey: "svc.mkt.s3.b" },
      { headingKey: "svc.mkt.s4.h", bodyKey: "svc.mkt.s4.b" },
    ],
    relatedInsights: ["how-to-build-a-website-that-converts", "best-website-design-for-small-businesses"],
    relatedServices: [
      { titleKey: "svc.web-design.title", to: "/services/web-design" },
      { titleKey: "svc.ai.title", to: "/services/ai-automation" },
    ],
  },
};

const ServiceDetail = () => {
  const { slug } = useParams();
  const { t } = useLang();
  const service = slug ? serviceData[slug] : undefined;

  if (!service) {
    return (
      <div className="section-container section-padding">
        <h1 className="text-2xl font-bold">{t("services.not-found")}</h1>
        <Link to="/services" className="text-primary mt-4 inline-block text-sm">{t("services.back")}</Link>
      </div>
    );
  }

  const relatedArticles = service.relatedInsights
    .map((s) => insights.find((i) => i.slug === s))
    .filter(Boolean);

  return (
    <div>
      {/* Hero */}
      <section className="section-border relative overflow-hidden">
        <div className="logo-motif absolute inset-0 pointer-events-none" />
        <div className="section-container py-16 md:py-24 relative z-10">
          <RevealSection>
            <Link to="/services" className="text-xs text-muted-foreground hover:text-foreground transition-colors mb-6 inline-block">
              {t("services.back")}
            </Link>
            <h1 className="text-3xl md:text-5xl font-bold max-w-3xl">{t(service.titleKey)}</h1>
            <p className="mt-4 text-muted-foreground max-w-2xl leading-relaxed">{t(service.introKey)}</p>
          </RevealSection>
        </div>
      </section>

      {/* Content Sections */}
      <section>
        <div className="section-container section-padding max-w-3xl">
          {service.sections.map((section, i) => (
            <RevealSection key={i} delay={i * 100}>
              <div className="mb-12 last:mb-0">
                <h2 className="text-xl md:text-2xl font-semibold mb-4">{t(section.headingKey)}</h2>
                <p className="text-muted-foreground leading-relaxed">{t(section.bodyKey)}</p>
              </div>
            </RevealSection>
          ))}
        </div>
      </section>

      {/* Related Insights */}
      {relatedArticles.length > 0 && (
        <section className="isolate section-border relative overflow-hidden">
        <HexPattern variation={4} />
          <div className="section-container section-padding">
            <RevealSection>
              <h2 className="text-2xl font-bold mb-8">{t("services.related-insights")}</h2>
            </RevealSection>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedArticles.map((article, i) => (
                <RevealSection key={article!.slug} delay={i * 80}>
                  <Link
                    to={`/insights/${article!.slug}`}
                    className="block border border-border p-6 group hover:border-primary transition-colors"
                  >
                    <span className="text-[10px] uppercase tracking-widest text-primary font-medium">{article!.tag}</span>
                    <h3 className="text-sm font-semibold mt-2 mb-2 group-hover:text-primary transition-colors">{article!.title}</h3>
                    <p className="text-xs text-muted-foreground leading-relaxed">{article!.summary}</p>
                  </Link>
                </RevealSection>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Related Services */}
      <section className="section-border">
        <div className="section-container py-8">
          <div className="flex flex-wrap items-center gap-4">
            <span className="text-xs text-muted-foreground">{t("services.related")}</span>
            {service.relatedServices.map((rs) => (
              <Link key={rs.to} to={rs.to} className="text-xs font-medium text-primary hover:underline">{t(rs.titleKey)}</Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-border">
        <div className="section-container py-16 md:py-24 text-center">
          <RevealSection>
            <h2 className="text-2xl md:text-3xl font-bold mb-4">{t("services.detail.cta.title")}</h2>
            <p className="text-muted-foreground max-w-lg mx-auto mb-8 leading-relaxed">{t("services.detail.cta.text")}</p>
            <Link
              to="/proposal"
              className="inline-block bg-primary text-primary-foreground px-8 py-3 text-sm font-medium hover:bg-primary/90 transition-colors"
            >
              {t("services.cta.start")}
            </Link>
          </RevealSection>
        </div>
      </section>
    </div>
  );
};

export default ServiceDetail;
