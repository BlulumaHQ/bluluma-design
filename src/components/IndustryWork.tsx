import { Link } from "react-router-dom";
import { BrowserChrome } from "./IndustryHeroCollage";
import PortfolioScreenshotViewport from "./PortfolioScreenshotViewport";
import { useIndustryProjects, visibleIndustryCount } from "@/lib/industryPortfolio";
import { useLang } from "@/lib/i18n";
import { serviceLabel } from "@/lib/serviceLabels";

export function IndustryStat({ category, label }: { category: string; label: string }) {
  const { count, loading } = useIndustryProjects(category);
  return !loading && visibleIndustryCount(count) ? <div className="hc-stat"><strong>{count}</strong><p>{label}</p></div> : null;
}
const hostname = (url: string | null) => { try { return url ? new URL(url).hostname : ""; } catch { return ""; } };

export default function IndustryWork({ category, limit = 6, badgeSlugs = [] }: { category: string; limit?: number; badgeSlugs?: string[] }) {
  const { items, loading, error } = useIndustryProjects(category, limit);
  const { t, lang } = useLang();
  if (error) return <p role="status">{t("ind.workError")}</p>;
  return <><div className="hc-grid hc-grid-work" aria-busy={loading}>
    {loading ? Array.from({ length: limit }, (_, i) => <div key={i} className="hc-work-skeleton hc-skeleton" />) : items.map((item) => <Link key={item.id} to={`/portfolio/${item.slug}`} className="feed-portfolio-card hc-work-card"><div className="hc-work-browser"><BrowserChrome domain={hostname(item.live_url)} /><PortfolioScreenshotViewport src={item.homepage_full_url || item.featured_image_url} alt={`${item.title} ${t("hc.homepage")}`} /></div><h3><span className="ind-work-title">{item.title}{badgeSlugs.includes(item.slug) && <span className="ind-crea-badge">CREA SYNC</span>}</span><span className="feed-portfolio-arrow" aria-hidden="true">→</span></h3>{item.services?.length ? <p>{item.services.map((s) => serviceLabel(s, lang)).join(" · ")}</p> : null}</Link>)}
  </div>{!loading && !items.length && <p>{t("ind.workEmpty")}</p>}</>;
}