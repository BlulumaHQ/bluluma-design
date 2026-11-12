import { useParams, Link } from "react-router-dom";
import { getArticleBySlug, localizeArticle } from "@/lib/articles";
import { zhLabel } from "@/lib/articlesZh";
import { useLang } from "@/lib/i18n";
import { useDocumentMeta } from "@/lib/useDocumentMeta";
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

const formatDate = (iso: string, lang: "en" | "zh" = "en") =>
  new Date(iso).toLocaleDateString(lang === "zh" ? "zh-TW" : "en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });

const InsightDetail = () => {
  const { slug } = useParams();
  const { lang } = useLang();
  const zh = lang === "zh";
  const tx = (en: string, z: string) => (zh ? z : en);
  const L = (s: string) => (zh ? zhLabel(s) : s);
  const found = slug ? getArticleBySlug(slug) : undefined;
  const article = found ? localizeArticle(found, lang) : undefined;

  useDocumentMeta({
    title: article ? article.seoTitle : tx("Insight not found | Bluluma", "找不到文章｜Bluluma"),
    description: article ? article.metaDescription : "",
  });

  if (!article) {
    return (
      <div className="section-container section-padding">
        <h1 className="text-2xl font-bold">{tx("Insight not found", "找不到這篇文章")}</h1>
        <Link to="/insights" className="text-primary mt-4 inline-block text-sm">
          {tx("← Back to Insights", "← 回到文章列表")}
        </Link>
      </div>
    );
  }

  const heroImage = insightImages[article.slug] ?? article.featuredImage;
  const inlineImages = insightInlineImages[article.slug] || [];
  const paragraphs = article.content.split(/\n{2,}/).filter(Boolean);

  const isRealtor = article.industry === "Realtor";
  const isDentist = article.industry === "Dentist";

  return (
    <div className="site-page site-page-insightdetail">
      {/* SEO-style hero */}
      <section className="site-page-hero isolate section-border relative overflow-hidden">
        <div className="section-container py-16 md:py-24">
          <Link
            to="/insights"
            className="text-xs text-muted-foreground hover:text-foreground transition-colors duration-200 mb-6 inline-block"
          >
            {tx("← Back to Insights", "← 回到文章列表")}
          </Link>
          <div className="flex flex-wrap items-center gap-2 mb-4 text-[10px] uppercase tracking-widest font-medium">
            <span className="text-primary">{L(article.category)}</span>
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
              {L(article.industry)}
            </Link>
            <span className="text-muted-foreground">·</span>
            <span className="text-muted-foreground normal-case tracking-normal">
              {formatDate(article.date, lang)}
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
                {L(t)}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Hero image */}
      {heroImage && (
        <section className="section-border">
          <div className="section-container">
            <div className="mx-auto max-w-4xl aspect-[4/3] border border-border overflow-hidden">
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
        <div className="section-container section-padding site-article-column">
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
                      alt={`${article.title} — ${tx("illustration", "插圖")}`}
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
      <section className="site-page-cta section-dark section-border">
        <div className="section-container py-16 md:py-24 text-center">
          <RevealSection>
            {isRealtor ? (
              <>
                <h2 className="text-2xl md:text-3xl font-bold mb-4">
                  {tx("Need a better real estate website?", "需要更好的房地產網站嗎？")}
                </h2>
                <p
                  className="max-w-lg mx-auto mb-8 leading-relaxed"
                 
                >
                  {tx(
                    "Request a tailored proposal for a real estate website built to convert visitors into buyers and sellers.",
                    "索取專屬提案，打造能把訪客轉換成買方與賣方的房地產網站。",
                  )}
                </p>
                <Link
                  to="/realtor"
                  className="inline-block site-button px-8 py-3.5 text-sm font-semibold rounded-lg"
                >
                  {tx("View Realtor Website Service", "查看房仲網站服務")}
                </Link>
              </>
            ) : isDentist ? (
              <>
                <h2 className="text-2xl md:text-3xl font-bold mb-4">
                  {tx("Need a better dental practice website?", "需要更好的牙醫診所網站嗎？")}
                </h2>
                <p
                  className="max-w-lg mx-auto mb-8 leading-relaxed"
                 
                >
                  {tx(
                    "Dental websites built to attract new patients and build trust from the first visit.",
                    "為吸引新病患而打造的牙醫診所網站，從第一次造訪就建立信任。",
                  )}
                </p>
                <Link
                  to="/proposal"
                  className="inline-block site-button px-8 py-3.5 text-sm font-semibold rounded-lg"
                >
                  {tx("Talk to Bluluma", "與 Bluluma 聊聊")}
                </Link>
              </>
            ) : (
              <>
                <h2 className="text-2xl md:text-3xl font-bold mb-4">
                  {tx("Planning a Website Refresh?", "正在規劃網站改版嗎？")}
                </h2>
                <p
                  className="max-w-lg mx-auto mb-8 leading-relaxed"
                 
                >
                  {tx(
                    "If you're evaluating whether your website needs a redesign or structural update, we can help map the next step.",
                    "如果你正在評估網站是否需要重新設計或調整架構，我們可以幫你規劃下一步。",
                  )}
                </p>
                <Link
                  to="/proposal"
                  className="inline-block site-button px-8 py-3.5 text-sm font-semibold rounded-lg"
                >
                  {tx("Request a Quote", "索取報價")}
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
