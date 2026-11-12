import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Building2, Stethoscope, UserRound, Store, X, Check } from 'lucide-react';
import { useLang } from '@/lib/i18n';
import { usePortfolioFeed } from '@/lib/portfolioFeed';
import { selectHomepageProjects } from '@/lib/homepagePortfolio';
import FeedPortfolioCard from '@/components/FeedPortfolioCard';
import HomeHeroSlider from '@/components/HomeHeroSlider';
import HomeTestimonials from '@/components/HomeTestimonials';
import { IndustryReveal as Reveal } from '@/components/IndustryReveal';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
export default function Home() {
  const { t } = useLang();
  const { items, loading, error } = usePortfolioFeed();
  const projects = useMemo(() => selectHomepageProjects(items), [items]);
  const audiences = [
    { title: 'hc.healthcare', body: 'home.audience.healthcare', link: 'home.exploreHealthcare', to: '/healthcare', tone: 'healthcare', icon: Stethoscope },
    { title: 'ind.realtors', body: 'home.audience.realtor', link: 'home.exploreRealtor', to: '/real-estate', tone: 'property', icon: UserRound },
    { title: 'ind.developers', body: 'home.audience.developer', link: 'home.exploreDeveloper', to: '/presale', tone: 'property', icon: Building2 },
    { title: 'home.audience.otherTitle', body: 'home.audience.other', link: 'home.audience.all', to: '/portfolio', tone: 'business', icon: Store },
  ];
  const heading = (label: string, title: string) => <><span className="site-eyebrow">{t(label)}</span><h2 className="home-h2">{t(title)}</h2></>;
  return <div className="home-page industry-theme">
    <HomeHeroSlider />
    <section className="home-trust"><div className="site-container"><span>{t('home.trust')}</span><p>Tsai Orthodontics <i>·</i> Eric Kim Realty <i>·</i> TTOP Chicken <i>·</i> K. Chen Construction <i>·</i> Bisou Hair Salon</p></div></section>
    <section className="home-section"><div className="site-container"><Reveal>{heading('home.audience.label','home.audience.title')}</Reveal><div className="home-audience-grid">{audiences.map(a => <Reveal key={a.title}><article className={`home-card home-audience-card home-tone-${a.tone} ${a.tone === 'business' ? 'home-card-soft' : ''}`}><div className="home-audience-icon"><a.icon size={22} /><i /></div><h3>{t(a.title)}</h3><p>{t(a.body)}</p><Button variant="link" asChild className="home-text-link"><Link to={a.to}>{t(a.link)}</Link></Button></article></Reveal>)}</div></div></section>
    <section className="home-section home-soft"><div className="site-container home-two-columns"><Reveal>{heading('home.problem.label','home.problem.fullTitle')}<p className="home-section-description">{t('home.problem.closing')}</p></Reveal><div className="home-problem-grid">{[1,2,3,4].map(i => <Reveal key={i} delay={i*60}><div className="home-card home-problem-card"><X size={18} /><p>{t(`home.problem.b${i}`)}</p></div></Reveal>)}</div></div></section>
    <section className="home-section"><div className="site-container"><Reveal>{heading('home.systems.label','home.systems.title')}</Reveal><div className="home-grid-three">{[1,2,3].map(i => <Reveal key={i} delay={i*80}><article className="home-card home-system-card"><span className="home-system-number">0{i}</span><h3>{t(`home.svc${i}.title`)}</h3><p>{t(`home.svc${i}.desc`)}</p><Button asChild variant="link" className="home-text-link"><Link to="/solutions">{t('cta.learn-more')}</Link></Button></article></Reveal>)}</div></div></section>
    <section className="home-section home-soft" id="results"><div className="site-container"><Reveal><div className="home-section-heading"><div>{heading('home.results.label','home.results.title')}</div><Button asChild variant="link" className="home-text-link"><Link to="/portfolio">{t('home.allProjects')}</Link></Button></div></Reveal>{loading ? <div className="home-portfolio-grid" aria-label={t('ind.collage')}>{Array.from({length:12},(_,i) => <Skeleton key={i} className="aspect-[4/5] rounded-xl" />)}</div> : error ? <p className="home-section-description">{t('ind.workError')}</p> : projects.length === 0 ? <p className="home-section-description">{t('ind.workEmpty')}</p> : <div className="home-portfolio-grid">{projects.map((item,i) => <Reveal key={item.id} delay={i*40}><FeedPortfolioCard item={item} autoScrollOnHover /></Reveal>)}</div>}<div className="home-work-all"><Button asChild variant="outline" className="site-button"><Link to="/portfolio">{t('home.allProjects')}</Link></Button></div></div></section>
    <section className="home-section"><div className="site-container"><Reveal>{heading('home.process.label','home.process.title')}</Reveal><div className="home-grid-four">{[1,2,3,4].map(i => <Reveal key={i} delay={i*80}><article className="home-card"><span className="home-step-number">{i}</span><h3>{t(`home.process.${i}.title`)}</h3><p>{t(`home.process.${i}.body`)}</p></article></Reveal>)}</div></div></section>
    <section className="home-section site-dark home-investment-section"><div className="site-container"><Reveal>{heading('home.why.label','home.why.title')}</Reveal><div className="home-investment-grid"><Reveal className="home-investment-col"><table className="home-comparison"><thead><tr><th>{t('home.diff.col.them')}</th><th>{t('home.diff.col.us')}</th></tr></thead><tbody>{[1,2,3].map(i => <tr key={i}><td>{t(`home.compare.${i}.them`)}</td><td><Check size={15} />{t(`home.compare.${i}.us`)}</td></tr>)}</tbody></table></Reveal><Reveal delay={150} className="home-investment-col"><div className="home-investment-card"><span className="site-eyebrow">{t('home.pricing.label')}</span><p className="home-price">{t('home.pricing.range')}</p><p className="home-investment-note">{t('home.pricing.note')}</p><Button asChild variant="siteLight"><Link to="/proposal">{t('home.fixedQuote')}</Link></Button></div></Reveal></div></div></section>
    <section className="home-section"><div className="site-container"><Reveal>{heading('home.testimonials.label','home.testimonials.heading')}</Reveal><HomeTestimonials /></div></section>
    <section className="home-final-section"><div className="site-container"><Reveal><div className="home-final site-dark"><h2>{t('home.finalcta.title')}</h2><p>{t('home.final.body')}</p><Button asChild variant="siteLight"><Link to="/proposal">{t('hc.proposal')}</Link></Button></div></Reveal></div></section>
  </div>;
}
