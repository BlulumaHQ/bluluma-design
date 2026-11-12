import SiteFinalCTA from "@/components/SiteFinalCTA";
import { useEffect } from "react";
import { Link, Navigate, NavLink, useParams } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";
import FeedPortfolioCard from "@/components/FeedPortfolioCard";
import { useLang } from "@/lib/i18n";
import { feedCategories, itemInCategory, usePortfolioFeed } from "@/lib/portfolioFeed";

const PER_PAGE = 20;
const SITE = "https://bluluma-design-agency.lovable.app";

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

const Work = ({ category: categoryProp }: { category?: string }) => {
  const { lang } = useLang();
  const tt = (en: string, zh: string) => (lang === "zh" ? zh : en);
  const params = useParams<{ category?: string; page?: string }>();
  const activeSlug = categoryProp ?? params.category;
  const { items: all, loading, error } = usePortfolioFeed();
  const cats = feedCategories(all);
  const activeCat = activeSlug ? cats.find((c) => c.slug === activeSlug) : undefined;
  const items = activeSlug ? all.filter((i) => itemInCategory(i, activeSlug)) : all;

  const page = Math.max(1, parseInt(params.page ?? "1", 10) || 1);
  const totalPages = Math.max(1, Math.ceil(items.length / PER_PAGE));
  const pageItems = items.slice((page - 1) * PER_PAGE, page * PER_PAGE);
  const baseUrl = activeSlug ? `/portfolio/${activeSlug}` : "/portfolio";
  const canonicalPath = page > 1 ? `${baseUrl}/page/${page}` : baseUrl;

  const heading = activeCat
    ? `${activeCat.name} ${tt("Portfolio", "作品集")}`
    : tt("All Portfolio Projects", "全部作品集");
  const description = tt(
    "Browse every Bluluma client website by industry. Real projects, real businesses.",
    "依產業瀏覽 Bluluma 所有客戶網站作品。",
  );

  useEffect(() => {
    const title = `${activeCat ? `${activeCat.name} Portfolio` : "Portfolio"}${page > 1 ? ` — Page ${page}` : ""} | Bluluma`;
    document.title = title;
    setMeta("description", description);
    setMeta("og:title", title, "property");
    setMeta("og:description", description, "property");
    setMeta("og:url", `${SITE}${canonicalPath}`, "property");
    setMeta("og:type", "website", "property");
    setCanonical(`${SITE}${canonicalPath}`);
  }, [activeCat?.name, page, description, canonicalPath]);

  if (!loading && !error && activeSlug && !activeCat) return <Navigate to="/portfolio" replace />;
  if (!loading && !error && page > totalPages)
    return <Navigate to={totalPages > 1 ? `${baseUrl}/page/${totalPages}` : baseUrl} replace />;

  const pageLink = (n: number) => (n === 1 ? baseUrl : `${baseUrl}/page/${n}`);
  const rowCls = (isActive: boolean) =>
    `group flex items-center justify-between gap-3 border-l-2 py-2.5 pl-4 pr-3 text-sm transition-colors ${
      isActive
        ? "border-primary bg-primary/5 text-primary font-semibold"
        : "border-transparent text-muted-foreground hover:border-border hover:text-foreground"
    }`;

  return (
    <div className="site-page site-page-work">
      <section className="site-page-hero section-dark section-border">
        <div className="section-container py-14 md:py-20">
          <nav aria-label="Breadcrumb" className="mb-5 flex flex-wrap items-center gap-1.5 text-xs uppercase tracking-[0.14em] text-muted-foreground">
            <Link to="/" className="hover:text-foreground">{tt("Home", "首頁")}</Link>
            <ChevronRight size={12} className="opacity-50" />
            {activeCat ? (
              <>
                <Link to="/portfolio" className="hover:text-foreground">{tt("Portfolio", "作品集")}</Link>
                <ChevronRight size={12} className="opacity-50" />
                <span className="text-foreground">{activeCat.name}</span>
              </>
            ) : (
              <span className="text-foreground">{tt("Portfolio", "作品集")}</span>
            )}
          </nav>
          <h1 className="text-4xl font-bold md:text-5xl">{heading}</h1>
          <p className="mt-4 max-w-2xl text-muted-foreground">{description}</p>
        </div>
      </section>

      <section className="isolate section-border section-subtle-bg relative overflow-hidden">
        <div className="site-container section-padding">
          <div className="grid gap-8 lg:grid-cols-[280px,1fr] lg:gap-10 xl:gap-12">
            <aside className="site-portfolio-sidebar lg:sticky lg:top-[110px] lg:self-start">
              <nav aria-label={tt("Portfolio categories", "作品分類")} className="text-sm">
                <p className="mb-4 pl-4 text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                  {tt("Portfolio", "作品集")}
                </p>
                <ul className="flex flex-col">
                  <li>
                    <NavLink to="/portfolio" end className={() => rowCls(!activeSlug)}>
                      <span>{tt("All Projects", "全部作品")}</span>
                      <span className="tabular-nums text-xs text-muted-foreground">{all.length || ""}</span>
                    </NavLink>
                  </li>
                  {cats.map((c) => (
                    <li key={c.slug}>
                      <NavLink to={`/portfolio/${c.slug}`} className={() => rowCls(activeSlug === c.slug)}>
                        <span className="leading-snug">{c.name}</span>
                        <span className="tabular-nums text-xs text-muted-foreground">{c.count}</span>
                      </NavLink>
                    </li>
                  ))}
                </ul>
              </nav>
            </aside>

            <div className="site-page site-page-work">
              {loading && <p className="py-12 text-center text-sm text-muted-foreground">{tt("Loading portfolio…", "正在載入作品…")}</p>}
              {!loading && error && <p className="py-12 text-center text-sm text-destructive">{tt("Unable to load portfolio projects.", "無法載入作品資料。")}</p>}
              {!loading && !error && items.length === 0 && (
                <p className="py-12 text-center text-sm text-muted-foreground">{tt("No portfolio projects in this category yet.", "此分類目前沒有作品。")}</p>
              )}
              {pageItems.length > 0 && (
                <>
                  <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
                    {pageItems.map((item) => (
                      <FeedPortfolioCard key={item.id} item={item} />
                    ))}
                  </div>
                  {totalPages > 1 && (
                    <nav aria-label="Pagination" className="mt-12 flex items-center justify-between gap-3 border-t border-border pt-6">
                      {page > 1 ? (
                        <Link to={pageLink(page - 1)} className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
                          <ChevronLeft size={14} /> {tt("Previous", "上一頁")}
                        </Link>
                      ) : <span />}
                      <div className="flex items-center gap-1.5 text-sm">
                        {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
                          <Link key={n} to={pageLink(n)} className={`min-w-8 rounded-md px-2.5 py-1.5 text-center tabular-nums transition-colors ${n === page ? "bg-foreground text-background" : "text-muted-foreground hover:text-foreground"}`}>
                            {n}
                          </Link>
                        ))}
                      </div>
                      {page < totalPages ? (
                        <Link to={pageLink(page + 1)} className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
                          {tt("Next", "下一頁")} <ChevronRight size={14} />
                        </Link>
                      ) : <span />}
                    </nav>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </section>
      <SiteFinalCTA />
    </div>
  );
};

export default Work;
