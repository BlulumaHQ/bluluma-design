import { Link } from "react-router-dom";
import type { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { type Article, localizeArticle } from "@/lib/articles";
import { useLang } from "@/lib/i18n";
import { insightImages } from "@/pages/insightImages";

interface Props {
  heading: ReactNode;
  moreHref: string;
  moreLabel: string;
  articles: Article[];
}

/** Insight cards with feature images, shared by the industry landing pages. */
const IndustryInsights = ({ heading, moreHref, moreLabel, articles }: Props) => {
  const { lang, t } = useLang();
  return (
    <section id="insights" className="hc-section">
      <div className="hc-container">
        <div className="hc-section-heading">
          {heading}
          <Button variant="link" asChild className="hc-text-link"><Link to={moreHref}>{moreLabel} →</Link></Button>
        </div>
        <div className="hc-grid hc-grid-three">
          {articles.map((raw) => {
            const article = localizeArticle(raw, lang);
            const img = insightImages[article.slug] ?? article.featuredImage;
            return (
              <Link key={article.slug} to={`/insights/${article.slug}`} className="hc-card hc-insight hc-insight--media">
                {img && (
                  <div className="hc-insight-image">
                    <img src={img} alt="" loading="lazy" decoding="async" width={1600} height={1200} />
                  </div>
                )}
                <div className="hc-insight-body">
                  <time dateTime={article.date}>
                    {new Date(article.date).toLocaleDateString(lang === "zh" ? "zh-TW" : "en-US", { year: "numeric", month: "short", day: "numeric", timeZone: "UTC" })}
                  </time>
                  <h3>{article.title}</h3>
                  <p>{article.excerpt}</p>
                  <span className="hc-read-more">{t("hc.readMore")} →</span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default IndustryInsights;
