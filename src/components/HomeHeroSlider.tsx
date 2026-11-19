import { useRef, type ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Pause, Play, CalendarCheck, House, Building2 } from 'lucide-react';
import { Button } from './ui/button';
import { useLang } from '@/lib/i18n';
import { HERO_SLIDE_DURATION, useHeroCarousel } from '@/hooks/useHeroCarousel';
import { EveryoneStrip, HealthcareVisual, HvPriceLine, PresaleVisual, RealtorVisual } from './HeroVisuals';
import type { IndustryVariant } from '@/lib/packagePricing';

type Slide = {
  name: string; key: string; light?: boolean; center?: boolean; icon?: typeof House;
  badge: string; title: string; accent: string; description: string;
  primary: string; href: string; secondary: string; work: string; price?: IndustryVariant;
  visual: (eager: boolean) => ReactNode;
};

// Order approved Nov 2026: three industries first, then the general slide.
const slides: Slide[] = [
  { name: 'hc.healthcare', key: 'healthcare', light: true, icon: CalendarCheck, badge: 'hv.badge.healthcare', title: 'hc.heroTitle', accent: 'hc.heroAccent', description: 'hv.desc.healthcare', primary: 'home.exploreHealthcare', href: '/healthcare', secondary: 'hc.seeClinics', work: '/portfolio/dental-healthcare', price: 'healthcare', visual: (e) => <HealthcareVisual eager={e} /> },
  { name: 'ind.realtors', key: 'realtor', icon: House, badge: 'hv.badge.realtor', title: 'rt.heroTitle', accent: 'rt.heroAccent', description: 'hv.desc.realtor', primary: 'home.exploreRealtor', href: '/real-estate', secondary: 'rt.see', work: '/portfolio/realtor-realty', price: 'realtor', visual: (e) => <RealtorVisual eager={e} /> },
  { name: 'ind.developers', key: 'presale', icon: Building2, badge: 'hv.badge.presale', title: 'ps.heroTitle', accent: 'ps.heroAccent', description: 'hv.desc.presale', primary: 'hv.bookCall', href: '/proposal', secondary: 'ps.see', work: '/portfolio/real-estate-development-presale', price: 'presale', visual: (e) => <PresaleVisual eager={e} /> },
  { name: 'home.any', key: 'everyone', center: true, badge: 'home.badge', title: 'home.hero.generalTitle', accent: 'home.hero.generalAccent', description: 'home.hero.generalSub', primary: 'home.getQuote', href: '/proposal', secondary: 'home.seeWork', work: '/portfolio', visual: () => <EveryoneStrip /> },
];

export default function HomeHeroSlider() {
  const { t } = useLang();
  const carousel = useHeroCarousel(slides.length);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const select = (index: number, focus = false) => {
    const next = (index + slides.length) % slides.length;
    carousel.goTo(next);
    if (focus) tabs.current[next]?.focus();
    tabs.current[next]?.scrollIntoView({ block: 'nearest', inline: 'nearest', behavior: 'instant' });
  };
  const active = slides[carousel.index];
  return <section className={`home-hero hv-hero site-dark hv-active-${active.key} ${active.light ? 'hv-light' : ''}`} role="region" aria-roledescription="carousel" aria-label={t('home.carousel')} onMouseEnter={() => carousel.setHovered(true)} onMouseLeave={() => carousel.setHovered(false)} onFocusCapture={() => carousel.setFocused(true)} onBlurCapture={e => { if (!e.currentTarget.contains(e.relatedTarget as Node | null)) carousel.setFocused(false); }}>
    <div className="site-container home-slides" aria-live={carousel.paused ? 'polite' : 'off'}>
      {slides.map((slide, i) => {
        const isActive = i === carousel.index;
        const Icon = slide.icon;
        return <div key={slide.key} id={`home-slide-${i}`} role="tabpanel" aria-roledescription="slide" aria-label={`${i + 1} / ${slides.length} · ${t(slide.name)}`} aria-labelledby={`home-tab-${i}`} aria-hidden={!isActive} className={`home-slide hv-slide hv-slide-${slide.key} ${slide.light ? 'hv-slide-light' : ''} ${slide.center ? 'hv-slide-center' : ''} ${isActive ? 'is-active' : ''}`}>
          <div className="home-slide-copy hv-copy">
            <div className="hv-badge">{Icon ? <Icon size={14} aria-hidden="true" /> : <i />}{t(slide.badge)}</div>
            {i === 0 ? <h1 className="hv-title">{t(slide.title)} <span>{t(slide.accent)}</span></h1> : <h2 className="hv-title">{t(slide.title)} <span>{t(slide.accent)}</span></h2>}
            <p className="hv-description">{t(slide.description)}</p>
            <div className="home-hero-actions"><Button asChild variant="site"><Link to={slide.href} tabIndex={isActive ? 0 : -1}>{t(slide.primary)}</Link></Button><Button asChild variant="siteOutline" className="hv-outline"><Link to={slide.work} tabIndex={isActive ? 0 : -1}>{t(slide.secondary)}</Link></Button></div>
            {slide.price && <HvPriceLine variant={slide.price} />}
          </div>
          <div className="hv-visual">{slide.visual(i === 0)}</div>
        </div>;
      })}
    </div>
    <div className="home-slider-bar"><div className="site-container home-slider-controls"><div role="tablist" aria-label={t('home.carousel')} className="home-slider-tabs" onKeyDown={e => { if (['ArrowRight','ArrowLeft','Home','End'].includes(e.key)) { e.preventDefault(); const focusedIndex = tabs.current.findIndex(tab => tab === document.activeElement); const current = focusedIndex < 0 ? carousel.index : focusedIndex; select(e.key === 'Home' ? 0 : e.key === 'End' ? slides.length - 1 : current + (e.key === 'ArrowRight' ? 1 : -1), true); } }}>
      {slides.map((slide, i) => <Button ref={el => { tabs.current[i] = el; }} key={i} variant="ghost" role="tab" id={`home-tab-${i}`} aria-controls={`home-slide-${i}`} aria-selected={i === carousel.index} tabIndex={i === carousel.index ? 0 : -1} onClick={() => select(i)} className={`home-slider-tab ${i === carousel.index ? 'is-active' : ''}`}><span className="home-tab-progress" style={{ transform: `scaleX(${i === carousel.index ? (carousel.reduced ? 1 : carousel.elapsed / HERO_SLIDE_DURATION) : 0})` }} /><span className="home-tab-number">0{i + 1}</span><span>{t(slide.name)}</span></Button>)}
    </div><div className="home-slider-arrows"><Button variant="ghost" size="icon" className="home-circle-button" onClick={() => select(carousel.index - 1)} aria-label={t('home.carousel.prev')}><ArrowLeft /></Button><Button variant="ghost" size="icon" className="home-circle-button" onClick={() => select(carousel.index + 1)} aria-label={t('home.carousel.next')}><ArrowRight /></Button>{!carousel.reduced && <Button variant="ghost" size="icon" className="home-circle-button" onClick={() => carousel.setStopped(!carousel.stopped)} aria-label={t(carousel.stopped ? 'home.carousel.play' : 'home.carousel.pause')}>{carousel.stopped ? <Play /> : <Pause />}</Button>}</div></div></div>
  </section>;
}
