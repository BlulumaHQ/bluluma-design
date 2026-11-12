import { Button } from "@/components/ui/button";
import SiteFinalCTA from "@/components/SiteFinalCTA";
import { Link, useLocation } from "react-router-dom";
import { useState, useMemo, useEffect } from "react";
import {
  articles,
  allCategories,
  allIndustries,
  allTags,
  type Industry,
} from "@/lib/articles";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { insightImages } from "@/pages/insightImages";
import { localizeArticle } from "@/lib/articles";
import { zhLabel } from "@/lib/articlesZh";
import { useLang } from "@/lib/i18n";
import { useDocumentMeta } from "@/lib/useDocumentMeta";

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
    month: "short",
    day: "numeric",
    timeZone: "UTC",
  });

const industryFromPath = (pathname: string): Industry | null => {
  if (pathname.endsWith("/insights/realtor")) return "Realtor";
  if (pathname.endsWith("/insights/dentist")) return "Dentist";
  return null;
};

const Insights = () => {
  const { pathname } = useLocation();
  const { lang } = useLang();
  const zh = lang === "zh";
  const L = (s: string) => (zh ? zhLabel(s) : s);
  const tx = (en: string, z: string) => (zh ? z : en);
  const lockedIndustry = industryFromPath(pathname);

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<string | null>(null);
  const [industry, setIndustry] = useState<Industry | null>(lockedIndustry);
  const [activeTag, setActiveTag] = useState<string | null>(null);

  // Sync when route changes
  useEffect(() => {
    if (lockedIndustry) setIndustry(lockedIndustry);
  }, [lockedIndustry]);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return articles
      .map((a) => localizeArticle(a, lang))
      .filter((a) => (lockedIndustry ? a.industry === lockedIndustry : true))
      .filter((a) => (industry && !lockedIndustry ? a.industry === industry : true))
      .filter((a) => (category ? a.category === category : true))
      .filter((a) => (activeTag ? a.tags.includes(activeTag) : true))
      .filter((a) =>
        q
          ? a.title.toLowerCase().includes(q) ||
            L(a.category).toLowerCase().includes(q) ||
            a.excerpt.toLowerCase().includes(q) ||
            a.tags.some((t) => L(t).toLowerCase().includes(q))
          : true,
      )
      .slice()
      .sort((a, b) => (a.date < b.date ? 1 : -1));
  }, [search, category, industry, activeTag, lockedIndustry, lang]);

  const heroTitle = zh
    ? lockedIndustry
      ? `${L(lockedIndustry)}文章`
      : "文章"
    : lockedIndustry
      ? `${lockedIndustry} Insights`
      : "Insights";
  const heroSubtitle = zh
    ? lockedIndustry
      ? `給${L(lockedIndustry)}的網站、品牌與數位策略實用觀點。`
      : "給服務型企業的網站、品牌與數位策略實用觀點。"
    : lockedIndustry
      ? `Practical website, branding, and digital strategy insights for ${lockedIndustry.toLowerCase()}s.`
      : "Practical website, branding, and digital strategy insights for service businesses.";

  useDocumentMeta({
    title: zh ? `${heroTitle}｜Bluluma` : `${heroTitle} | Bluluma`,
    description: heroSubtitle,
  });

  return (
    <div className="site-page site-page-insights">
      {/* Hero (Dark) */}
      <section className="site-page-hero section-dark section-border">
        <div className="section-container py-16 md:py-24">
          <h1 className="text-4xl md:text-5xl font-bold">{heroTitle}</h1>
          <p
            className="mt-4 max-w-xl leading-relaxed"
           
          >
            {heroSubtitle}
          </p>
          {lockedIndustry && (
            <Link
              to="/insights"
              className="mt-6 inline-block text-sm text-primary hover:underline"
            >
              {tx("← View all Insights", "← 查看所有文章")}
            </Link>
          )}
        </div>
      </section>

      {/* Filters */}
      <section className="isolate section-border bg-background relative overflow-hidden">
        <div className="section-container py-8 space-y-5">
          {/* Search */}
          <div>
            <input
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={tx("Search insights…", "搜尋文章…")}
              className="w-full md:max-w-md px-4 py-3 text-sm border border-border rounded-lg bg-background focus:outline-none focus:border-primary transition-colors"
            />
          </div>

          {/* Category */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-semibold uppercase tracking-widest text-foreground/70 mr-2">
              {tx("Category", "分類")}
            </span>
            <Button variant="ghost"
              onClick={() => setCategory(null)}
              className={`text-xs px-3 py-1.5 border rounded-lg transition-colors ${
                category === null
                  ? "border-primary text-primary bg-primary/5"
                  : "border-border text-muted-foreground hover:border-primary hover:text-primary"
              }`}
            >
              {tx("All", "全部")}
            </Button>
            {allCategories.map((c) => (
              <Button variant="ghost"
                key={c}
                onClick={() => setCategory(category === c ? null : c)}
                className={`text-xs px-3 py-1.5 border rounded-lg transition-colors ${
                  category === c
                    ? "border-primary text-primary bg-primary/5"
                    : "border-border text-foreground/70 hover:border-primary hover:text-primary"
                }`}
              >
                {L(c)}
              </Button>
            ))}
          </div>

          {/* Industry (hidden when locked by route) */}
          {!lockedIndustry && (
            <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs font-semibold uppercase tracking-widest text-foreground/70 mr-2">
                {tx("Industry", "產業")}
              </span>
              <Button variant="ghost"
                onClick={() => setIndustry(null)}
                className={`text-xs px-3 py-1.5 border rounded-lg transition-colors ${
                  industry === null
                    ? "border-primary text-primary bg-primary/5"
                    : "border-border text-muted-foreground hover:border-primary hover:text-primary"
                }`}
              >
                {tx("All", "全部")}
              </Button>
              {allIndustries.map((ind) => (
                <Button variant="ghost"
                  key={ind}
                  onClick={() => setIndustry(industry === ind ? null : ind)}
                  className={`text-xs px-3 py-1.5 border rounded-lg transition-colors ${
                    industry === ind
                      ? "border-primary text-primary bg-primary/5"
                      : "border-border text-foreground/70 hover:border-primary hover:text-primary"
                  }`}
                >
                  {L(ind)}
                </Button>
              ))}
            </div>
          )}

          {/* Tags */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-semibold uppercase tracking-widest text-foreground/70 mr-2">
              {tx("Tags", "標籤")}
            </span>
            <Button variant="ghost"
              onClick={() => setActiveTag(null)}
              className={`text-xs px-3 py-1.5 border rounded-lg transition-colors ${
                activeTag === null
                  ? "border-primary text-primary bg-primary/5"
                  : "border-border text-muted-foreground hover:border-primary hover:text-primary"
              }`}
            >
              {tx("All", "全部")}
            </Button>
            {allTags.map((tag) => (
              <Button variant="ghost"
                key={tag}
                onClick={() => setActiveTag(activeTag === tag ? null : tag)}
                className={`text-xs px-3 py-1.5 border rounded-lg transition-colors ${
                  activeTag === tag
                    ? "border-primary text-primary bg-primary/5"
                    : "border-border text-foreground/70 hover:border-primary hover:text-primary"
                }`}
              >
                {L(tag)}
              </Button>
            ))}
          </div>

          <div className="text-xs text-foreground/70 pt-2">
            {zh
              ? `依日期排序（最新優先）・共 ${filtered.length} 篇`
              : `Sorted by date (newest first) · ${filtered.length} article${filtered.length === 1 ? "" : "s"}`}
          </div>
        </div>
      </section>

      {/* Grid */}
      <section>
        <div className="section-container section-padding">
          {filtered.length === 0 ? (
            <div className="text-center py-16 text-muted-foreground">
              {tx("No articles match your filters.", "沒有符合條件的文章。")}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {filtered.map((a, i) => {
                const img = a.featuredImage ?? insightImages[a.slug];
                return (
                  <RevealSection key={a.slug} delay={i * 60}>
                    <Link
                      to={`/insights/${a.slug}`}
                      className="site-page-card site-insight-card block bg-background border border-border rounded-lg overflow-hidden group transition-all duration-300 hover:-translate-y-1 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10 h-full"
                    >
                      <div className="aspect-[16/9] bg-muted overflow-hidden">
                        {img ? (
                          <img
                            src={img}
                            alt={a.title}
                            className="w-full h-full object-cover"
                            loading="lazy"
                          />
                        ) : (
                          <div className="w-full h-full bg-secondary flex items-center justify-center">
                            <span className="text-primary/40 text-xs uppercase tracking-widest font-semibold">
                              {L(a.category)}
                            </span>
                          </div>
                        )}
                      </div>
                      <div className="p-6 md:p-8">
                        <div className="flex flex-wrap items-center gap-2 mb-3 text-[10px] uppercase tracking-widest font-medium">
                          <span className="text-primary">{L(a.category)}</span>
                          <span className="text-muted-foreground">·</span>
                          <span className="text-muted-foreground">
                            {L(a.industry)}
                          </span>
                          <span className="text-muted-foreground">·</span>
                          <span className="text-muted-foreground normal-case tracking-normal">
                            {formatDate(a.date, lang)}
                          </span>
                        </div>
                        <h3 className="text-lg font-semibold mb-3 group-hover:text-primary transition-colors duration-200">
                          {a.title}
                        </h3>
                        <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                          {a.excerpt}
                        </p>
                        <div className="flex flex-wrap gap-1.5 mb-4">
                          {a.tags.slice(0, 3).map((t) => (
                            <span
                              key={t}
                              className="text-[10px] px-2 py-0.5 border border-border rounded text-muted-foreground"
                            >
                              {L(t)}
                            </span>
                          ))}
                        </div>
                        <span className="text-xs text-primary font-medium inline-flex items-center gap-1 group-hover:gap-2 transition-all duration-200">
                          {tx("Read More", "閱讀全文")}
                          <span>→</span>
                        </span>
                      </div>
                    </Link>
                  </RevealSection>
                );
              })}
            </div>
          )}
        </div>
      </section>
      <SiteFinalCTA />
    </div>
  );
};

export default Insights;
