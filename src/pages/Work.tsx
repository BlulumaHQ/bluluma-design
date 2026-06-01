import { useEffect, useMemo } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";
import CmsPortfolioCard from "@/components/CmsPortfolioCard";
import PortfolioSidebar from "@/components/PortfolioSidebar";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useLang } from "@/lib/i18n";
import { usePortfolioPage } from "@/lib/cms";
import {
  CATEGORY_ALIASES,
  findCategoryDef,
  resolveCategorySlug,
} from "@/lib/portfolioCategories";

const PER_PAGE = 12;
const SITE = "https://bluluma-design-agency.lovable.app";

const RevealDiv = ({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) => {
  const ref = useScrollReveal<HTMLDivElement>({ delay });
  return (
    <div ref={ref} className={`h-full ${className}`}>
      {children}
    </div>
  );
};

const setMeta = (name: string, content: string, attr: "name" | "property" = "name") => {
  let el = document.querySelector<HTMLMetaElement>(`meta[${attr}="${name}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, name);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
};
const setCanonical = (href: string) => {
  let el = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", "canonical");
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
};

const Work = () => {
  const { t, lang } = useLang();
  const tt = (en: string, zh: string) => (lang === "zh" ? zh : en);
  const params = useParams<{ category?: string; page?: string }>();

  // Redirect alias slugs (e.g. real-estate-development → canonical DB slug)
  if (params.category && CATEGORY_ALIASES[params.category]) {
    const target = CATEGORY_ALIASES[params.category];
    const tail = params.page ? `/page/${params.page}` : "";
    return <Navigate to={`/portfolio/${target}${tail}`} replace />;
  }

  const rawSlug = params.category;
  const categorySlug = rawSlug ? resolveCategorySlug(rawSlug) : undefined;
  const categoryDef = categorySlug ? findCategoryDef(categorySlug) : undefined;

  // Unknown category → 404-ish state
  if (rawSlug && !categoryDef) {
    return <Navigate to="/portfolio" replace />;
  }

  const page = Math.max(1, parseInt(params.page ?? "1", 10) || 1);
  const { items, total, loading, error } = usePortfolioPage(page, PER_PAGE, categorySlug);
  const totalPages = Math.max(1, Math.ceil(total / PER_PAGE));

  const heading = useMemo(() => {
    if (categoryDef) {
      return lang === "zh"
        ? `${categoryDef.nameZh}網站設計作品`
        : `${categoryDef.name} Website Design Portfolio`;
    }
    return tt("All Portfolio Projects", "全部作品集");
  }, [categoryDef, lang]);

  const description = categoryDef
    ? categoryDef.description[lang === "zh" ? "zh" : "en"]
    : tt(
        "Browse every Bluluma client website by industry. Real projects, real businesses.",
        "依產業瀏覽 Bluluma 所有客戶網站作品。",
      );

  const baseUrl = categoryDef ? `/portfolio/${categoryDef.slug}` : "/portfolio";
  const canonicalPath = page > 1 ? `${baseUrl}/page/${page}` : baseUrl;

  useEffect(() => {
    const title = categoryDef
      ? categoryDef.seoTitle + (page > 1 ? ` — Page ${page}` : "")
      : `Portfolio${page > 1 ? ` — Page ${page}` : ""} | Bluluma`;
    const desc = description;
    const prev = document.title;
    document.title = title;
    setMeta("description", desc);
    setMeta("og:title", title, "property");
    setMeta("og:description", desc, "property");
    setMeta("og:url", `${SITE}${canonicalPath}`, "property");
    setMeta("og:type", "website", "property");
    setCanonical(`${SITE}${canonicalPath}`);
    return () => {
      document.title = prev;
    };
  }, [categoryDef, page, description, canonicalPath]);

  const pageLink = (n: number) =>
    n === 1 ? baseUrl : `${baseUrl}/page/${n}`;

  return (
    <div>
      <section className="section-dark section-border">
        <div className="section-container py-14 md:py-20">
          <nav
            aria-label="Breadcrumb"
            className="mb-5 flex flex-wrap items-center gap-1.5 text-xs uppercase tracking-[0.14em] text-muted-foreground"
          >
            <Link to="/" className="hover:text-foreground">{tt("Home", "首頁")}</Link>
            <ChevronRight size={12} className="opacity-50" />
            {categoryDef ? (
              <>
                <Link to="/portfolio" className="hover:text-foreground">{tt("Portfolio", "作品集")}</Link>
                <ChevronRight size={12} className="opacity-50" />
                <span className="text-foreground">{lang === "zh" ? categoryDef.nameZh : categoryDef.name}</span>
              </>
            ) : (
              <span className="text-foreground">{tt("Portfolio", "作品集")}</span>
            )}
          </nav>
          <h1 className="text-4xl font-bold md:text-5xl">{heading}</h1>
          <p className="mt-4 max-w-2xl text-muted-foreground">{description}</p>
        </div>
      </section>

      <section className="section-border section-subtle-bg">
        <div className="section-container section-padding">
          <div className="grid gap-10 lg:grid-cols-[240px,1fr] xl:gap-12">
            <aside className="lg:sticky lg:top-28 lg:self-start">
              <PortfolioSidebar activeSlug={categoryDef?.slug} />
            </aside>

            <div>
              {loading && (
                <p className="py-12 text-center text-sm text-muted-foreground">
                  {tt("Loading portfolio…", "正在載入作品…")}
                </p>
              )}
              {!loading && error && (
                <p className="py-12 text-center text-sm text-destructive">
                  {tt("Unable to load portfolio projects.", "無法載入作品資料。")}
                </p>
              )}
              {!loading && !error && items.length === 0 && (
                <p className="py-12 text-center text-sm text-muted-foreground">
                  {tt("No portfolio projects in this category yet.", "此分類目前沒有作品。")}
                </p>
              )}

              {items.length > 0 && (
                <>
                  <div className="grid grid-cols-1 gap-7 md:grid-cols-2 xl:grid-cols-3 xl:gap-8">
                    {items.map((item, index) => (
                      <RevealDiv key={item.id} delay={index * 50}>
                        <CmsPortfolioCard item={item} />
                      </RevealDiv>
                    ))}
                  </div>

                  {totalPages > 1 && (
                    <nav
                      aria-label="Pagination"
                      className="mt-12 flex items-center justify-between gap-3 border-t border-border pt-6"
                    >
                      {page > 1 ? (
                        <Link
                          to={pageLink(page - 1)}
                          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
                        >
                          <ChevronLeft size={14} /> {tt("Previous", "上一頁")}
                        </Link>
                      ) : (
                        <span />
                      )}
                      <div className="flex items-center gap-1.5 text-sm">
                        {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
                          <Link
                            key={n}
                            to={pageLink(n)}
                            className={`min-w-8 rounded-md px-2.5 py-1.5 text-center tabular-nums transition-colors ${
                              n === page
                                ? "bg-foreground text-background"
                                : "text-muted-foreground hover:text-foreground"
                            }`}
                          >
                            {n}
                          </Link>
                        ))}
                      </div>
                      {page < totalPages ? (
                        <Link
                          to={pageLink(page + 1)}
                          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
                        >
                          {tt("Next", "下一頁")} <ChevronRight size={14} />
                        </Link>
                      ) : (
                        <span />
                      )}
                    </nav>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Work;
