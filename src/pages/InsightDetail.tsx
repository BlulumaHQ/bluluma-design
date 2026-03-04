import { useParams, Link } from "react-router-dom";
import { insights } from "@/lib/insights";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { insightImages, insightInlineImages } from "@/pages/Insights";

const RevealSection = ({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) => {
  const ref = useScrollReveal({ delay });
  return <div ref={ref} className={className}>{children}</div>;
};

const InsightDetail = () => {
  const { slug } = useParams();
  const insight = insights.find((i) => i.slug === slug);

  if (!insight) {
    return (
      <div className="section-container section-padding">
        <h1 className="text-2xl font-bold">Insight not found</h1>
        <Link to="/insights" className="text-primary mt-4 inline-block text-sm">
          ← Back to Insights
        </Link>
      </div>
    );
  }

  const heroImage = insightImages[insight.slug];
  const inlineImages = insightInlineImages[insight.slug] || [];

  return (
    <div>
      {/* Hero */}
      <section className="section-border">
        <div className="section-container py-16 md:py-24">
          <Link
            to="/insights"
            className="text-xs text-muted-foreground hover:text-foreground transition-colors duration-200 mb-6 inline-block"
          >
            ← Back to Insights
          </Link>
          <span className="text-[10px] uppercase tracking-widest text-primary font-medium block mb-3">
            {insight.tag}
          </span>
          <h1 className="text-3xl md:text-5xl font-bold max-w-3xl">{insight.title}</h1>
          <p className="mt-4 text-muted-foreground max-w-2xl leading-relaxed">
            {insight.summary}
          </p>
        </div>
      </section>

      {/* Hero Image */}
      <section className="section-border">
        <div className="section-container">
          <div className="aspect-[21/9] border border-border overflow-hidden">
            {heroImage ? (
              <img src={heroImage} alt={insight.title} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full bg-secondary flex items-center justify-center">
                <span className="text-muted-foreground text-xs opacity-40">Article Hero Image</span>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Content Sections with inline images */}
      <section>
        <div className="section-container section-padding max-w-3xl">
          {insight.sections.map((section, i) => (
            <RevealSection key={i} delay={i * 100}>
              <div className="mb-12 last:mb-0">
                <h2 className="text-xl md:text-2xl font-semibold mb-4">{section.heading}</h2>
                <p className="text-muted-foreground leading-relaxed">{section.body}</p>
              </div>
              {/* Insert a unique inline image after some sections */}
              {inlineImages[i] && i < insight.sections.length - 1 && (
                <div className="mb-12 border border-border overflow-hidden">
                  <img
                    src={inlineImages[i]}
                    alt={`${insight.title} - visual ${i + 1}`}
                    className="w-full h-auto object-cover aspect-[16/9]"
                    loading="lazy"
                  />
                </div>
              )}
            </RevealSection>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="section-border">
        <div className="section-container py-16 md:py-24 text-center">
          <RevealSection>
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Planning a Website Refresh?</h2>
            <p className="text-muted-foreground max-w-lg mx-auto mb-8 leading-relaxed">
              If you're evaluating whether your website needs a redesign or structural update, we can help map the next step.
            </p>
            <Link
              to="/contact"
              className="inline-block border border-primary text-primary px-8 py-3 text-sm font-medium hover:bg-primary hover:text-primary-foreground transition-colors duration-200"
            >
              Request a Quote
            </Link>
          </RevealSection>
        </div>
      </section>
    </div>
  );
};

export default InsightDetail;
