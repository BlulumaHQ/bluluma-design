import { Fragment } from "react";
import { Link } from "react-router-dom";
import { Check } from "lucide-react";
import IndustryHeader from "./IndustryHeader";
import IndustryHeroCollage from "./IndustryHeroCollage";
import IndustryWork, { IndustryStat } from "./IndustryWork";
import IndustryAudienceSwitch from "./IndustryAudienceSwitch";
import IndustryFeatureDemo from "./IndustryFeatureDemo";
import RealtorPricing from "./RealtorPricing";
import { IndustryReveal as Reveal } from "./IndustryReveal";
import Footer from "./Footer";
import { Button } from "./ui/button";
import { getLatestByIndustry } from "@/lib/articles";
import { useLang } from "@/lib/i18n";
import { industryClientTitles, useIndustryProjects } from "@/lib/industryPortfolio";

export default function PropertyIndustryPage({ developer }: { developer: boolean }) {
  const { lang, t } = useLang();
  const prefix = developer ? "ps" : "rt";
  const text = (key: string) => t(`${prefix}.${key}`);
  const category = developer ? "real-estate-development-presale" : "realtor-realty";
  const { all } = useIndustryProjects(category);
  const clients = developer ? industryClientTitles(all) : ["Eric Kim", "Vicky Chai", "Sterling Wong", "Tony Lin", "Shella & Tony Chan", "Helen Lam"];
  const insights = getLatestByIndustry("Realtor", 3);
  const heading = (label: string, title: string) => <><span className="hc-eyebrow">{label}</span><h2 className="hc-h2">{title}</h2></>;
  const proposal = (className = "hc-button") => <Button asChild className={className}><Link to="/proposal">{t("hc.proposal")}</Link></Button>;
  return <div className="industry-theme healthcare-theme ind-property hc-page" id="top">
    <IndustryHeader industryLabel={developer ? "Developers & Pre-sale" : "Realtors"} industryLabelZh={developer ? "開發商與預售" : "房仲"} dotColor="var(--ind-accent)" anchors={[{ id: "feature", label: text("featureNav") }, { id: "build", label: t("hc.nav.build") }, { id: "work", label: t("hc.nav.work") }, { id: "process", label: t("hc.nav.process") }]} />
    <main className="hc-main">
      <section className="hc-hero hc-dark ind-property-hero"><IndustryAudienceSwitch developer={developer} /><div className="hc-container hc-two-columns">
        <Reveal><span className="hc-hero-badge"><span className="hc-dot" />{text("badge")}</span><h1 className="hc-h1">{text("heroTitle")} <span>{text("heroAccent")}</span></h1><p className="hc-hero-description">{text("heroDescription")}</p><div className="hc-actions">{proposal()}<Button variant="outline" asChild className="hc-button hc-button-outline"><a href="#work">{text("see")}</a></Button></div><IndustryStat category={category} label={text("stat")} /></Reveal>
        <IndustryHeroCollage windowA={developer ? { slug: "one-park-home-a", domain: "one-park-home.bluluma.com" } : { slug: "erickimrealty", domain: "erickimrealty.com" }} windowB={developer ? { slug: "oviedoproperties-a", domain: "oviedoproperties" } : { slug: "vickychairealty", domain: "vickychairealty.com" }} phoneSlug={developer ? "one-park-home-a" : "sterlingwongrealty"} note={{ tag: text("noteTag"), title: text("noteTitle"), sub: text("noteSub") }} />
      </div></section>
      <section className="hc-client-strip"><div className="hc-container"><span>{text("clients")}</span><div>{clients.map((client, i) => <Fragment key={client}>{i > 0 && <i>·</i>}{client}</Fragment>)}</div></div></section>
      <section className="hc-section hc-soft"><div className="hc-container"><Reveal>{heading(t("ind.problem"), text("problemTitle"))}</Reveal><div className="hc-grid hc-grid-three">{[1, 2, 3].map((n) => <Reveal key={n} delay={n * 70}><article className="hc-card hc-problem-card"><span className="hc-number">0{n}</span><h3>{text(`problem.${n}.title`)}</h3><p>{text(`problem.${n}.body`)}</p></article></Reveal>)}</div></div></section>
      <section id="feature" className="hc-section hc-dark"><div className="hc-container hc-two-columns"><Reveal>{heading(text("featureLabel"), text("featureTitle"))}<p className="hc-section-description">{text("featureBody")}</p><ul className="hc-ai-list">{[1, 2, 3].map((n) => <li key={n}><span className="hc-dot" />{text(`feature.${n}`)}</li>)}</ul></Reveal><IndustryFeatureDemo developer={developer} /></div></section>
      <section id="build" className="hc-section"><div className="hc-container hc-build-grid"><Reveal>{heading(t("hc.build.label"), text("buildTitle"))}<p className="hc-section-description">{text("buildBody")}</p></Reveal><div className="hc-build-list">{Array.from({ length: 8 }, (_, i) => <div key={i} className="hc-build-row"><span><Check size={16} /></span>{text(`build.${i + 1}`)}</div>)}</div></div></section>
      <section id="work" className="hc-section hc-soft"><div className="hc-container"><div className="hc-section-heading"><Reveal>{heading(t("hc.work.label"), text("workTitle"))}</Reveal><Button variant="link" asChild className="hc-text-link"><Link to={`/portfolio/${category}`}>{text("workAll")} →</Link></Button></div><IndustryWork category={category} limit={6} badgeSlugs={developer ? undefined : ["erickimrealty"]} /></div></section>
      {!developer && <RealtorPricing />}
      <section className="ind-cross-section"><div className="hc-container"><div className="ind-cross"><div><span className="ind-gold-label">{text("crossLabel")}</span><h2>{text("crossTitle")}</h2></div><Button asChild variant="outline" className="hc-button ind-outline-dark"><Link to={developer ? "/real-estate" : "/presale"}>{text("crossButton")} →</Link></Button></div></div></section>
      <section id="process" className="hc-section hc-soft"><div className="hc-container"><Reveal>{heading(t("hc.process.label"), t("ind.processTitle"))}</Reveal><div className="hc-grid hc-grid-four">{[1, 2, 3, 4].map((n) => <Reveal key={n} delay={n * 80}><article className="hc-card"><span className="hc-step-number">{n}</span><h3>{text(`process.${n}.title`)}</h3><p>{text(`process.${n}.body`)}</p></article></Reveal>)}</div></div></section>
      {!developer && <section id="insights" className="hc-section"><div className="hc-container"><div className="hc-section-heading"><Reveal>{heading(t("hc.insights.label"), t("ind.insightsTitle"))}</Reveal><Button variant="link" asChild className="hc-text-link"><Link to="/insights/realtor">{t("ind.insightsMore")} →</Link></Button></div><div className="hc-grid hc-grid-three">{insights.map((article) => <Link key={article.slug} to={`/insights/${article.slug}`} className="hc-card hc-insight"><time dateTime={article.date}>{new Date(article.date).toLocaleDateString(lang === "zh" ? "zh-TW" : "en-US", { year: "numeric", month: "short", day: "numeric" })}</time><h3>{lang === "zh" ? t(`rt.article.${article.slug}.title`) : article.title}</h3><p>{lang === "zh" ? t(`rt.article.${article.slug}.excerpt`) : article.excerpt}</p><span className="hc-read-more">{t("hc.readMore")} →</span></Link>)}</div></div></section>}
      <section id="cta" className="hc-final-section"><div className="hc-container"><div className="hc-final hc-dark"><h2 className="hc-h2">{text("finalTitle")}</h2><p>{text("finalBody")}</p>{proposal("hc-button hc-button-light")}</div></div></section>
    </main><div className="ind-trademark">{t("ind.trademarks")}</div><Footer />
  </div>;
}