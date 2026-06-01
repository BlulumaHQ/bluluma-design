import { useMemo, useState } from "react";
import CmsPortfolioCard from "@/components/CmsPortfolioCard";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useLang } from "@/lib/i18n";
import { usePortfolioItems } from "@/lib/cms";

const RevealDiv = ({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) => {
  const ref = useScrollReveal<HTMLDivElement>({ delay });
  return <div ref={ref} className={`h-full ${className}`}>{children}</div>;
};

const Work = () => {
  const { t, lang } = useLang();
  const tt = (en: string, zh: string) => (lang === "zh" ? zh : en);
  const { items, loading, error } = usePortfolioItems();
  const [activeFilter, setActiveFilter] = useState<string>("All");

  const categoryFilters = useMemo(() => {
    const map = new Map<string, string>();
    items.forEach((it) => {
      if (it.category) map.set(it.category.slug, it.category.name);
    });
    const list = Array.from(map.entries())
      .map(([slug, name]) => ({ slug, name }))
      .sort((a, b) => a.name.localeCompare(b.name));
    return [{ slug: "All", name: tt("All", "全部") }, ...list];
  }, [items, lang]);

  const visibleItems = useMemo(
    () =>
      activeFilter === "All"
        ? items
        : items.filter((item) => item.category?.slug === activeFilter),
    [items, activeFilter],
  );

  return (
    <div>
      <section className="section-dark section-border">
        <div className="section-container py-16 md:py-24">
          <h1 className="text-4xl font-bold md:text-5xl">{t("nav.portfolio")}</h1>
          <p className="mt-4 max-w-2xl text-muted-foreground">{t("work.intro")}</p>
        </div>
      </section>

      <section className="portfolio-layout-shell section-subtle-bg section-border relative">
        <aside
          className="portfolio-edge-sidebar hidden xl:block"
          aria-label={tt("Filter portfolio by industry", "依產業篩選作品")}
        >
          <div className="sticky top-28">
            <p className="mb-5 text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
              {tt("Services", "服務類別")}
            </p>
            <nav className="flex flex-col gap-1.5">
              {categoryFilters.map((cat) => {
                const isActive = activeFilter === cat.slug;
                return (
                  <button
                    key={cat.slug}
                    type="button"
                    onClick={() => setActiveFilter(cat.slug)}
                    className={`flex items-center gap-3 rounded-md px-3 py-2 text-left text-sm transition-colors ${
                      isActive ? "bg-background text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    <span className={`h-px transition-all ${isActive ? "w-6 bg-primary" : "w-3 bg-border"}`} />
                    {cat.name}
                  </button>
                );
              })}
            </nav>
          </div>
        </aside>

        <div className="section-container section-padding">
          <RevealDiv>
            <div className="mb-8 flex items-end justify-between gap-6">
              <div>
                <h2 className="text-2xl font-bold md:text-3xl">{t("work.all.title")}</h2>
                <p className="mt-3 text-sm text-muted-foreground md:text-base">
                  {tt("Direct browsing of client work by industry.", "依產業快速瀏覽客戶作品。")}
                </p>
              </div>
            </div>
          </RevealDiv>

          <div className="mb-8 flex gap-2 overflow-x-auto pb-1 xl:hidden">
            {categoryFilters.map((cat) => (
              <button
                key={cat.slug}
                type="button"
                onClick={() => setActiveFilter(cat.slug)}
                className={`shrink-0 rounded-full border px-4 py-2 text-sm transition-colors ${
                  activeFilter === cat.slug
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border bg-background text-muted-foreground"
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>

          <div className="portfolio-grid grid grid-cols-1 gap-7 md:grid-cols-2 xl:grid-cols-3 xl:gap-8">
            {visibleItems.map((item, index) => (
              <RevealDiv key={item.id} delay={index * 60}>
                <CmsPortfolioCard item={item} />
              </RevealDiv>
            ))}
          </div>

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
          {!loading && !error && visibleItems.length === 0 && (
            <p className="py-12 text-center text-sm text-muted-foreground">
              {tt("No portfolio projects found.", "目前沒有作品。")}
            </p>
          )}
        </div>
      </section>
    </div>
  );
};

export default Work;
