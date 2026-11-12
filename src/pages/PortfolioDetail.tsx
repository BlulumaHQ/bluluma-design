import SiteBrowserFrame from "@/components/SiteBrowserFrame";
import SiteFinalCTA from "@/components/SiteFinalCTA";
import { useEffect } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { ArrowLeft, ChevronRight, ExternalLink } from "lucide-react";
import { useLang } from "@/lib/i18n";
import { serviceLabel } from "@/lib/serviceLabels";
import { itemInCategory, usePortfolioFeed } from "@/lib/portfolioFeed";
import Work from "./Work";
import PortfolioScreenshotViewport from "@/components/PortfolioScreenshotViewport";


const setMeta = (name: string, content: string, attr: "name" | "property" = "name") => {
  let el = document.querySelector<HTMLMetaElement>(`meta[${attr}="${name}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, name);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
};

/** Handles /portfolio/:slug — renders a category listing if the slug is a category, otherwise the project detail. */
const PortfolioDetail = () => {
  const { lang } = useLang();
  const tt = (en: string, zh: string) => (lang === "zh" ? zh : en);
  const { slug, category } = useParams<{ slug?: string; category?: string }>();
  const { items, loading, error } = usePortfolioFeed();
  const item = items.find((i) => i.slug === slug);
  const isCategory = !slug && !!category;

  useEffect(() => {
    if (!item) return;
    const zh = lang === "zh";
    const services = (item.services ?? []).filter(Boolean).map((sv) => serviceLabel(sv, lang));
    const cat = zh ? item.categories_zh?.[0] ?? item.categories?.[0] : item.categories?.[0];
    // Keep in sync with scripts/prerenderPlugin.ts (portfolioPages).
    const title = zh ? `${item.title}｜網站設計作品｜Bluluma` : `${item.title} — Website Design | Bluluma Portfolio`;
    const description = zh
      ? `Bluluma 為 ${item.title} 打造的網站作品${cat ? `（${cat}）` : ""}。服務內容：${services.join("、") || "網站設計"}。`
      : item.excerpt?.trim() || `${item.title} website designed and built by Bluluma${cat ? ` (${cat})` : ""}. Services: ${services.join(", ") || "Website Design"}.`;
    document.title = title;
    setMeta("description", description);
    setMeta("og:description", description, "property");
    setMeta("og:title", title, "property");
    if (item.featured_image_url) setMeta("og:image", item.featured_image_url, "property");
  }, [item, lang]);

  if (slug && category) return <Navigate to={`/portfolio/${slug}`} replace />;
  if (isCategory) {
    if (loading) return <div className="section-container section-padding" />;
    const catMatch = items.some((i) => itemInCategory(i, category));
    if (catMatch) return <Work category={category} />;
    const proj = items.find((i) => i.slug === category);
    if (proj && category) return <PortfolioDetailView slugOverride={category} />;
    return <Navigate to="/portfolio" replace />;
  }
  return <PortfolioDetailView slugOverride={slug ?? ""} />;

  function PortfolioDetailView({ slugOverride }: { slugOverride: string }) {
    const it = items.find((i) => i.slug === slugOverride);
    if (loading) return <div className="section-container section-padding"><p className="py-24 text-center text-sm text-muted-foreground">{tt("Loading project…", "正在載入作品…")}</p></div>;
    if (error || !it) {
      return (
        <div className="section-container section-padding">
          <h1 className="text-3xl font-bold">{tt("Project not found", "找不到此作品")}</h1>
          <Link to="/portfolio" className="mt-6 inline-flex items-center gap-2 text-sm text-primary"><ArrowLeft size={14} /> {tt("Back to Portfolio", "回到作品集")}</Link>
        </div>
      );
    }
    const services = (it.services ?? []).filter(Boolean).map((s) => serviceLabel(s, lang));
    const gallery = Array.isArray(it.gallery) ? it.gallery : [];
    const pages = gallery.filter((g) => g?.type === "page_screenshot" && g.url);
    const mobile = gallery.find((g) => g?.type === "mobile_screenshot" && g.url);

    return (
      <article className="site-page site-page-portfoliodetail">
        <section className="site-page-hero isolate section-border section-subtle-bg relative overflow-hidden">
          <div className="section-container py-10 md:py-14">
            <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-1.5 text-xs uppercase tracking-[0.14em] text-muted-foreground">
              <Link to="/" className="hover:text-foreground">{tt("Home", "首頁")}</Link>
              <ChevronRight size={12} className="opacity-50" />
              <Link to="/portfolio" className="hover:text-foreground">{tt("Portfolio", "作品集")}</Link>
              <ChevronRight size={12} className="opacity-50" />
              <span className="text-foreground">{it.title}</span>
            </nav>
            <div className="mt-8 grid items-center gap-10 lg:grid-cols-[1fr,1.3fr]">
              <div>
                <h1 className="text-3xl font-bold md:text-5xl">{it.title}</h1>
                {services.length > 0 && (
                  <div className="mt-5 flex flex-wrap gap-1.5">
                    {services.map((s) => (
                      <span key={s} className="site-project-tag rounded-full border px-2.5 py-1 text-xs font-medium">{s}</span>
                    ))}
                  </div>
                )}
                {it.live_url && (
                  <a href={it.live_url} target="_blank" rel="noopener noreferrer" className="site-button mt-7 inline-flex items-center gap-2">
                    {tt("Visit Website", "瀏覽網站")} <ExternalLink size={14} />
                  </a>
                )}
              </div>
              {it.featured_image_url && (
                <SiteBrowserFrame><img src={it.featured_image_url} alt={`${it.title} website`} loading="lazy" decoding="async" className="w-full h-auto" /></SiteBrowserFrame>
              )}
            </div>
          </div>
        </section>

        {pages.length > 0 && (
          <section className="section-border">
            <div className="section-container section-padding">
              <h2 className="text-2xl font-bold md:text-3xl">{tt("Pages", "頁面")}</h2>
              <div className="mt-8 columns-1 gap-6 md:columns-2">
                {pages.map((g, i) => (
                  <figure key={g.url + i} className="mb-6 break-inside-avoid">
                    <SiteBrowserFrame>
                      <img src={g.url} alt={g.caption || `${it.title} page ${i + 1}`} loading="lazy" decoding="async" className="block h-auto w-full" />
                    </SiteBrowserFrame>
                    {g.caption && <figcaption className="mt-2 text-sm text-muted-foreground">{g.caption}</figcaption>}
                  </figure>
                ))}
              </div>
            </div>
          </section>
        )}

        {mobile && (
          <section className="section-border">
            <div className="section-container section-padding">
              <h2 className="text-center text-2xl font-bold md:text-3xl">{tt("Mobile", "手機版")}</h2>
              <div className="mx-auto mt-8 w-[280px] max-w-full rounded-[2.5rem] border-[10px] border-foreground bg-foreground p-0 shadow-xl">
                <PortfolioScreenshotViewport key={mobile.url} src={mobile.url} alt={mobile.caption || `${it.title} mobile`} variant="phone" />
              </div>
              {mobile.caption && <p className="mt-3 text-center text-sm text-muted-foreground">{mobile.caption}</p>}
            </div>
          </section>
        )}
        <SiteFinalCTA />
      </article>
    );
  }
};

export default PortfolioDetail;
