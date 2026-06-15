import { useEffect } from "react";
import LinePattern from "@/components/LinePattern";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, ChevronRight, ExternalLink } from "lucide-react";
import { useLang } from "@/lib/i18n";
import { getPortfolioUrl, usePortfolioBySlug } from "@/lib/cms";

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

const PortfolioDetail = () => {
  const { category, slug } = useParams<{ category: string; slug: string }>();
  const { lang } = useLang();
  const tt = (en: string, zh: string) => (lang === "zh" ? zh : en);
  const { item, loading, error } = usePortfolioBySlug(category, slug);

  useEffect(() => {
    if (!item) return;
    const title =
      item.seo_title ||
      `${item.title} Website Design Portfolio | Bluluma`;
    const desc =
      item.seo_description ||
      item.details?.short_summary ||
      item.excerpt ||
      `${item.title} — website design project by Bluluma.`;
    const url = `${SITE}${getPortfolioUrl(item)}`;
    const prev = document.title;
    document.title = title;
    setMeta("description", desc);
    setMeta("og:title", title, "property");
    setMeta("og:description", desc, "property");
    setMeta("og:url", url, "property");
    setMeta("og:type", "article", "property");
    if (item.featured_image_url) setMeta("og:image", item.featured_image_url, "property");
    setCanonical(url);
    return () => {
      document.title = prev;
    };
  }, [item]);

  if (loading) {
    return (
      <div className="section-container section-padding">
        <p className="py-24 text-center text-sm text-muted-foreground">
          {tt("Loading project…", "正在載入作品…")}
        </p>
      </div>
    );
  }

  if (error || !item) {
    return (
      <div className="section-container section-padding">
        <h1 className="text-3xl font-bold">{tt("Project not found", "找不到此作品")}</h1>
        <p className="mt-4 text-muted-foreground">
          {tt("This project may have been moved or is no longer available.", "此作品可能已移除或無法存取。")}
        </p>
        <Link to="/portfolio" className="mt-6 inline-flex items-center gap-2 text-sm text-primary">
          <ArrowLeft size={14} /> {tt("Back to Portfolio", "回到作品集")}
        </Link>
      </div>
    );
  }

  const liveUrl = item.details?.live_url || null;
  const services = item.details?.services ?? [];
  const summary = item.details?.short_summary || item.excerpt || "";

  return (
    <article>
      <section className="section-border section-subtle-bg relative overflow-hidden">
        <LinePattern variation={1} />
        <div className="section-container py-10 md:py-14">
          <nav
            aria-label="Breadcrumb"
            className="flex flex-wrap items-center gap-1.5 text-xs uppercase tracking-[0.14em] text-muted-foreground"
          >
            <Link to="/" className="hover:text-foreground">{tt("Home", "首頁")}</Link>
            <ChevronRight size={12} className="opacity-50" />
            <Link to="/portfolio" className="hover:text-foreground">{tt("Portfolio", "作品集")}</Link>
            {item.category && (
              <>
                <ChevronRight size={12} className="opacity-50" />
                <span className="hover:text-foreground">{item.category.name}</span>
              </>
            )}
            <ChevronRight size={12} className="opacity-50" />
            <span className="text-foreground">{item.title}</span>
          </nav>

          <h1 className="mt-6 text-3xl font-bold md:text-5xl">{item.title}</h1>
          {summary && (
            <p className="mt-4 max-w-2xl text-base text-muted-foreground md:text-lg">{summary}</p>
          )}

          <div className="mt-6 flex flex-wrap gap-3">
            {liveUrl && (
              <a
                href={liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
              >
                {tt("Open Live Website", "查看官網")} <ExternalLink size={14} />
              </a>
            )}
            <Link
              to="/portfolio"
              className="inline-flex items-center gap-2 rounded-lg border border-border px-5 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              <ArrowLeft size={14} /> {tt("Back to Portfolio", "回到作品集")}
            </Link>
          </div>
        </div>
      </section>

      <section className="section-border">
        <div className="section-container section-padding">
          {item.featured_image_url ? (
            <div className="portfolio-preview-viewport rounded-lg border border-border bg-muted" style={{ maxHeight: 720 }}>
              <img
                src={item.featured_image_url}
                alt={`${item.title} website screenshot`}
                className="block w-full h-auto"
              />
            </div>
          ) : null}

          <div className="mt-10 grid gap-10 md:grid-cols-3">
            <div className="md:col-span-2">
              {item.body_content ? (
                <div
                  className="prose prose-sm md:prose-base max-w-none text-foreground"
                  dangerouslySetInnerHTML={{ __html: item.body_content }}
                />
              ) : (
                <p className="text-muted-foreground">{summary}</p>
              )}
            </div>
            <aside className="space-y-6">
              {item.details?.client_name && (
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                    {tt("Client", "客戶")}
                  </p>
                  <p className="mt-1 text-sm">{item.details.client_name}</p>
                </div>
              )}
              {item.details?.project_year && (
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                    {tt("Year", "年份")}
                  </p>
                  <p className="mt-1 text-sm">{item.details.project_year}</p>
                </div>
              )}
              {item.category && (
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                    {tt("Category", "分類")}
                  </p>
                  <p className="mt-1 text-sm">{item.category.name}</p>
                </div>
              )}
              {services.length > 0 && (
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                    {tt("Services", "服務項目")}
                  </p>
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {services.map((s) => (
                      <span
                        key={s}
                        className="rounded-full border border-border bg-muted px-2.5 py-1 text-[11px] font-medium text-muted-foreground"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </aside>
          </div>
        </div>
      </section>
    </article>
  );
};

export default PortfolioDetail;