import { useParams, Link } from "react-router-dom";
import { getArticleBySlug } from "@/lib/articles";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { insightImages, insightInlineImages } from "@/pages/insightImages";

const RevealSection = ({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) => {
  const ref = useScrollReveal({ delay });
  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
};

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

const InsightDetail = () => {
  const { slug } = useParams();
  const article = slug ? getArticleBySlug(slug) : undefined;

  if (!article) {
    return (
      <div className="section-container section-padding">
        <h1 className="text-2xl font-bold">Insight not found</h1>
        <Link to="/insights" className="text-primary mt-4 inline-block text-sm">
          ← Back to Insights
        </Link>
      </div>
    );
  }

  const heroImage = article.featuredImage ?? insightImages[article.slug];
  const inlineImages = insightInlineImages[article.slug] || [];
  const paragraphs = article.content.split(/\n{2,}/).filter(Boolean);

  const isRealtor = article.industry === "Realtor";
  const isDentist = article.industry === "Dentist";

  return (
    <div>
      {/* SEO-style hero */}
      <section className="section-border">
        <div className="section-container py-16 md:py-24">
          <Link
            to="/insights"
            className="text-xs text-muted-foreground hover:text-foreground transition-colors duration-200 mb-6 inline-block"
          >
            ← Back to Insights
          </Link>
          <div className="flex flex-wrap items-center gap-2 mb-4 text-[10px] uppercase tracking-widest font-medium">
            <span className="text-primary">{article.category}</span>
            <span className="text-muted-foreground">·</span>
            <Link
              to={
                isRealtor
                  ? "/insights/realtor"
                  : isDentist
                    ? "/insights/dentist"
                    : "/insights"
              }
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              {article.industry}
            </Link>
            <span className="text-muted-foreground">·</span>
            <span className="text-muted-foreground normal-case tracking-normal">
              {formatDate(article.date)}
            </span>
          </div>
          <h1 className="text-3xl md:text-5xl font-bold max-w-3xl">
            {article.title}
          </h1>
          <p className="mt-4 text-muted-foreground max-w-2xl leading-relaxed">
            {article.excerpt}
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            {article.tags.map((t) => (
              <span
                key={t}
                className="text-[11px] px-2.5 py-1 border border-border rounded text-muted-foreground"
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Hero image */}
      {heroImage && (
        <section className="section-border">
          <div className="section-container">
            <div className="aspect-[21/9] border border-border overflow-hidden">
              <img
                src={heroImage}
                alt={article.title}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </section>
      )}

      {/* Content */}
      <section>
        <div className="section-container section-padding max-w-3xl">
          {paragraphs.map((p, i) => {
            const trimmed = p.trim();
            const isList = trimmed
              .split("\n")
              .every((l) => l.trim().startsWith("-"));
            return (
              <RevealSection key={i} delay={i * 40}>
                <div className="mb-6">
                  {isList ? (
                    <ul className="list-disc pl-6 space-y-2 text-muted-foreground leading-relaxed">
                      {trimmed.split("\n").map((line, j) => (
                        <li key={j}>{line.replace(/^-\s*/, "")}</li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-muted-foreground leading-relaxed text-base md:text-lg">
                      {trimmed}
                    </p>
                  )}
                </div>
                {inlineImages[i] && i < paragraphs.length - 1 && i > 0 && i % 3 === 0 && (
                  <div className="my-10 border border-border overflow-hidden rounded-lg">
                    <img
                      src={inlineImages[i % inlineImages.length]}
                      alt={`${article.title} — illustration`}
                      className="w-full h-auto object-cover aspect-[16/9]"
                      loading="lazy"
                    />
                  </div>
                )}
              </RevealSection>
            );
          })}
        </div>
      </section>

      {/* Industry-aware CTA */}
      <section className="section-dark section-border">
        <div className="section-container py-16 md:py-24 text-center">
          <RevealSection>
            {isRealtor ? (
              <>
                <h2 className="text-2xl md:text-3xl font-bold mb-4">
                  Need a better real estate website?
                </h2>
                <p
                  className="max-w-lg mx-auto mb-8 leading-relaxed"
                  style={{ color: "hsl(220 10% 60%)" }}
                >
                  Request a tailored proposal for a real estate website
                  built to convert visitors into buyers and sellers.
                </p>
                <Link
                  to="/realtor"
                  className="inline-block cta-solid px-8 py-3.5 text-sm font-semibold rounded-lg"
                >
                  View Realtor Website Service
                </Link>
              </>
            ) : isDentist ? (
              <>
                <h2 className="text-2xl md:text-3xl font-bold mb-4">
                  Need a better dental practice website?
                </h2>
                <p
                  className="max-w-lg mx-auto mb-8 leading-relaxed"
                  style={{ color: "hsl(220 10% 60%)" }}
                >
                  Dental websites built to attract new patients and build
                  trust from the first visit.
                </p>
                <Link
                  to="/proposal"
                  className="inline-block cta-solid px-8 py-3.5 text-sm font-semibold rounded-lg"
                >
                  Talk to Bluluma
                </Link>
              </>
            ) : (
              <>
                <h2 className="text-2xl md:text-3xl font-bold mb-4">
                  Planning a Website Refresh?
                </h2>
                <p
                  className="max-w-lg mx-auto mb-8 leading-relaxed"
                  style={{ color: "hsl(220 10% 60%)" }}
                >
                  If you're evaluating whether your website needs a redesign or
                  structural update, we can help map the next step.
                </p>
                <Link
                  to="/proposal"
                  className="inline-block cta-solid px-8 py-3.5 text-sm font-semibold rounded-lg"
                >
                  Request a Quote
                </Link>
              </>
            )}
          </RevealSection>
        </div>
      </section>
    </div>
  );
};

export default InsightDetail;
