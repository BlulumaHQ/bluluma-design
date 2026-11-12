import { Link } from "react-router-dom";
import { Check } from "lucide-react";
import type { ReactNode } from "react";
import IndustryHeader from "@/components/IndustryHeader";
import { IndustryStat } from "@/components/IndustryWork";
import HealthcareHeroCollage, { BrowserChrome } from "@/components/HealthcareHeroCollage";
import PortfolioScreenshotViewport from "@/components/PortfolioScreenshotViewport";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useHealthcareProjects } from "@/lib/healthcarePortfolio";
import { getLatestByIndustry } from "@/lib/articles";
import { useLang } from "@/lib/i18n";
import { serviceLabel } from "@/lib/serviceLabels";
import { useDocumentMeta } from "@/lib/useDocumentMeta";

const Reveal = ({ children, delay = 0, className = "" }: { children: ReactNode; delay?: number; className?: string }) => {
  const ref = useScrollReveal({ delay });
  return <div ref={ref} className={`hc-reveal ${className}`}>{children}</div>;
};
const hostname = (url: string | null) => {
  try { return url ? new URL(url).hostname : ""; } catch { return ""; }
};

const Dentist = () => {
  const { lang, t } = useLang();
  const { items, loading, error } = useHealthcareProjects();
  const insights = getLatestByIndustry("Dentist", 3);
  useDocumentMeta({
    title: "Healthcare Website Design | Bluluma",
    description: "Healthcare website design for dental clinics, medical practices and patient-focused healthcare businesses.",
    canonicalPath: "/healthcare",
  });
  const heading = (label: string, title: string) => <><span className="hc-eyebrow">{t(label)}</span><h2 className="hc-h2">{t(title)}</h2></>;
  const proposal = (className = "hc-button") => <Button asChild className={className}><Link to="/proposal">{t("hc.proposal")}</Link></Button>;
  return (
    <div className="healthcare-theme hc-page" id="top">
      <IndustryHeader dotColor="var(--hc-mint)" anchors={[{ id: "build", label: t("hc.nav.build") }, { id: "work", label: t("hc.nav.work") }, { id: "process", label: t("hc.nav.process") }, { id: "insights", label: t("hc.nav.insights") }]} />
      <main className="hc-main">
        <section className="hc-hero hc-dark">
          <div className="hc-container hc-two-columns">
            <Reveal><span className="hc-hero-badge"><span className="hc-dot" />{t("hc.badge")}</span>
              <h1 className="hc-h1">{t("hc.heroTitle")} <span>{t("hc.heroAccent")}</span></h1>
              <p className="hc-hero-description">{t("hc.heroDescription")}</p>
              <div className="hc-actions">{proposal()}<Button variant="outline" asChild className="hc-button hc-button-outline"><a href="#work">{t("hc.seeClinics")}</a></Button></div>
              <IndustryStat category="dental-healthcare" label={t("hc.stat")} />
            </Reveal>
            <HealthcareHeroCollage />
          </div>
        </section>
        <section className="hc-client-strip"><div className="hc-container"><span>{t("hc.clients")}</span><div>Tsai Orthodontics <i>·</i> Friendly Dental Centre <i>·</i> Little Mountain Dental <i>·</i> Dr. Patrick Wu <i>·</i> Yang's Health Clinic</div></div></section>
        <section className="hc-section hc-soft"><div className="hc-container">
          <Reveal>{heading("hc.problem.label", "hc.problem.title")}</Reveal>
          <div className="hc-grid hc-grid-three">{[1, 2, 3].map((n) => <Reveal delay={n * 70} key={n}><article className="hc-card hc-problem-card"><span className="hc-number">0{n}</span><h3>{t(`hc.problem.${n}.title`)}</h3><p>{t(`hc.problem.${n}.body`)}</p></article></Reveal>)}</div>
        </div></section>
        <section id="build" className="hc-section"><div className="hc-container hc-build-grid"><Reveal>{heading("hc.build.label", "hc.build.title")}<p className="hc-section-description">{t("hc.build.body")}</p></Reveal>
          <div className="hc-build-list">{Array.from({ length: 8 }, (_, i) => <div key={i} className="hc-build-row"><span><Check size={16} /></span>{t(`hc.build.${i + 1}`)}</div>)}</div>
        </div></section>
        <section id="ai" className="hc-section hc-dark"><div className="hc-container hc-two-columns">
          <Reveal>{heading("hc.ai.label", "hc.ai.title")}<p className="hc-section-description">{t("hc.ai.body")}</p><ul className="hc-ai-list">{[1, 2, 3].map((n) => <li key={n}><span className="hc-dot" />{t(`hc.ai.${n}`)}</li>)}</ul></Reveal>
          <div className="hc-transcript"><p className="hc-transcript-caption">{t("hc.transcript.caption")}</p><Reveal delay={0}><p className="hc-bubble">{t("hc.transcript.patient1")}</p></Reveal><Reveal delay={200}><p className="hc-bubble hc-bubble-ai">{t("hc.transcript.ai")}</p></Reveal><Reveal delay={400}><p className="hc-bubble">{t("hc.transcript.patient2")}</p></Reveal><Reveal delay={600}><div className="hc-confirmation"><Check size={18} />{t("hc.transcript.confirmed")}</div></Reveal></div>
        </div></section>
        <section id="work" className="hc-section"><div className="hc-container">
          <div className="hc-section-heading"><Reveal>{heading("hc.work.label", "hc.work.title")}</Reveal><Button variant="link" asChild className="hc-text-link"><Link to="/portfolio/dental-healthcare">{t("hc.work.all")} →</Link></Button></div>
          {error ? <p role="status">{t("hc.work.error")}</p> : <div className="hc-grid hc-grid-work" aria-busy={loading}>
            {loading ? Array.from({ length: 6 }, (_, i) => <div key={i} className="hc-work-skeleton hc-skeleton" />) : items.map((item) => <Link key={item.id} to={`/portfolio/${item.slug}`} className="feed-portfolio-card hc-work-card"><div className="hc-work-browser"><BrowserChrome domain={hostname(item.live_url)} /><PortfolioScreenshotViewport src={item.homepage_full_url || item.featured_image_url} alt={`${item.title} ${t("hc.homepage")}`} /></div><h3>{item.title}<span className="feed-portfolio-arrow" aria-hidden="true">→</span></h3>{item.services?.length ? <p>{item.services.map((s) => serviceLabel(s, lang)).join(" · ")}</p> : null}</Link>)}
          </div>}
          {!loading && !error && items.length === 0 && <p>{t("hc.work.empty")}</p>}
        </div></section>
        <section id="process" className="hc-section hc-soft"><div className="hc-container"><Reveal>{heading("hc.process.label", "hc.process.title")}</Reveal><div className="hc-grid hc-grid-four">{[1, 2, 3, 4].map((n) => <Reveal key={n} delay={n * 80}><article className="hc-card"><span className="hc-step-number">{n}</span><h3>{t(`hc.process.${n}.title`)}</h3><p>{t(`hc.process.${n}.body`)}</p></article></Reveal>)}</div></div></section>
        <section id="insights" className="hc-section"><div className="hc-container"><div className="hc-section-heading"><Reveal>{heading("hc.insights.label", "hc.insights.title")}</Reveal><Button variant="link" asChild className="hc-text-link"><Link to="/insights/dentist">{t("hc.insights.more")} →</Link></Button></div><div className="hc-grid hc-grid-three">{insights.map((article) => <Link key={article.slug} to={`/insights/${article.slug}`} className="hc-card hc-insight"><time dateTime={article.date}>{new Date(article.date).toLocaleDateString(lang === "zh" ? "zh-TW" : "en-US", { year: "numeric", month: "short", day: "numeric" })}</time><h3>{lang === "zh" ? t(`hc.article.${article.slug}.title`) : article.title}</h3><p>{lang === "zh" ? t(`hc.article.${article.slug}.excerpt`) : article.excerpt}</p><span className="hc-read-more">{t("hc.readMore")} →</span></Link>)}</div></div></section>
        <section id="cta" className="hc-final-section"><div className="hc-container"><div className="hc-final hc-dark"><h2 className="hc-h2">{t("hc.final.title")}</h2><p>{t("hc.final.body")}</p>{proposal("hc-button hc-button-light")}</div></div></section>
      </main>
      <Footer />
    </div>
  );
};
export default Dentist;
