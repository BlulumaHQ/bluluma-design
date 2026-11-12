import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Pause, Play } from 'lucide-react';
import { Button } from './ui/button';
import IndustryHeroCollage from './IndustryHeroCollage';
import { useLang } from '@/lib/i18n';
import { HERO_SLIDE_DURATION, useHeroCarousel } from '@/hooks/useHeroCarousel';
const slides = [
  { name: 'home.any', tone: 'business', badge: 'home.badge', title: 'home.hero.generalTitle', accent: 'home.hero.generalAccent', description: 'home.hero.generalSub', primary: 'hc.proposal', href: '/proposal', secondary: 'home.seeWork', work: '/portfolio', a: 'ttop-vancouver-a', ad: 'ttopchicken.com', b: 'kchenconstruction-b', bd: 'kchencm.com', phone: 'bisou-hair', tag: 'home.note.tag', note: 'home.note.title', sub: 'home.note.sub' },
  { name: 'hc.healthcare', tone: 'healthcare', badge: 'hc.badge', title: 'hc.heroTitle', accent: 'hc.heroAccent', description: 'hc.heroDescription', primary: 'home.exploreHealthcare', href: '/healthcare', secondary: 'hc.seeClinics', work: '/portfolio/dental-healthcare', a: 'tsai-orthodontics', ad: 'tsaiorthodontics.ca', b: 'friendly-dental', bd: 'friendlydental.ca', phone: 'glow-dental', tag: 'hc.newBooking', note: 'hc.consultation', sub: 'hc.captured' },
  { name: 'ind.realtors', tone: 'property', badge: 'rt.badge', title: 'rt.heroTitle', accent: 'rt.heroAccent', description: 'rt.heroDescription', primary: 'home.exploreRealtor', href: '/real-estate', secondary: 'rt.see', work: '/portfolio/realtor-realty', a: 'erickimrealty', ad: 'erickimrealty.com', b: 'vickychairealty', bd: 'vickychairealty.com', phone: 'sterlingwongrealty', tag: 'rt.noteTag', note: 'rt.noteTitle', sub: 'rt.noteSub' },
  { name: 'ind.developers', tone: 'property', badge: 'ps.badge', title: 'ps.heroTitle', accent: 'ps.heroAccent', description: 'ps.heroDescription', primary: 'home.exploreDeveloper', href: '/presale', secondary: 'ps.see', work: '/portfolio/real-estate-development-presale', a: 'one-park-home-a', ad: 'one-park-home.bluluma.com', b: 'oviedoproperties-a', bd: 'oviedoproperties', phone: 'one-park-home-a', tag: 'ps.noteTag', note: 'ps.noteTitle', sub: 'ps.noteSub' },
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
  return <section className="home-hero site-dark" role="region" aria-roledescription="carousel" aria-label={t('home.carousel')} onMouseEnter={() => carousel.setHovered(true)} onMouseLeave={() => carousel.setHovered(false)} onFocusCapture={() => carousel.setFocused(true)} onBlurCapture={e => { if (!e.currentTarget.contains(e.relatedTarget as Node | null)) carousel.setFocused(false); }}>
    <div className="site-container home-slides" aria-live={carousel.paused ? 'polite' : 'off'}>
      {slides.map((slide, i) => <div key={slide.name} id={`home-slide-${i}`} role="tabpanel" aria-roledescription="slide" aria-label={`${i + 1} / 4 · ${t(slide.name)}`} aria-labelledby={`home-tab-${i}`} aria-hidden={i !== carousel.index} className={`home-slide home-tone-${slide.tone} ${i === carousel.index ? 'is-active' : ''}`}>
        <div className="home-slide-copy"><div className="home-badge"><i />{t(slide.badge)}</div>
          {i === 0 ? <h1>{t(slide.title)} <span>{t(slide.accent)}</span></h1> : <h2 className="home-slide-title">{t(slide.title)} <span>{t(slide.accent)}</span></h2>}
          <p className="home-slide-description">{t(slide.description)}</p>
          <div className="home-hero-actions"><Button asChild variant="site"><Link to={slide.href} tabIndex={i === carousel.index ? 0 : -1}>{t(slide.primary)}</Link></Button><Button asChild variant="siteOutline"><Link to={slide.work} tabIndex={i === carousel.index ? 0 : -1}>{t(slide.secondary)}</Link></Button></div>
        </div>
        <IndustryHeroCollage windowA={{ slug: slide.a, domain: slide.ad }} windowB={{ slug: slide.b, domain: slide.bd }} phoneSlug={slide.phone} note={{ tag: t(slide.tag), title: t(slide.note), sub: t(slide.sub) }} />
      </div>)}
    </div>
    <div className="home-slider-bar"><div className="site-container home-slider-controls"><div role="tablist" aria-label={t('home.carousel')} className="home-slider-tabs" onKeyDown={e => { if (['ArrowRight','ArrowLeft','Home','End'].includes(e.key)) { e.preventDefault(); const focusedIndex = tabs.current.findIndex(tab => tab === document.activeElement); const current = focusedIndex < 0 ? carousel.index : focusedIndex; select(e.key === 'Home' ? 0 : e.key === 'End' ? 3 : current + (e.key === 'ArrowRight' ? 1 : -1), true); } }}>
      {slides.map((slide, i) => <Button ref={el => { tabs.current[i] = el; }} key={i} variant="ghost" role="tab" id={`home-tab-${i}`} aria-controls={`home-slide-${i}`} aria-selected={i === carousel.index} tabIndex={i === carousel.index ? 0 : -1} onClick={() => select(i)} className={`home-slider-tab home-tone-${slide.tone} ${i === carousel.index ? 'is-active' : ''}`}><span className="home-tab-progress" style={{ transform: `scaleX(${i === carousel.index ? (carousel.reduced ? 1 : carousel.elapsed / HERO_SLIDE_DURATION) : 0})` }} /><span className="home-tab-number">0{i + 1}</span><span>{t(slide.name)}</span></Button>)}
    </div><div className="home-slider-arrows"><Button variant="ghost" size="icon" className="home-circle-button" onClick={() => select(carousel.index - 1)} aria-label={t('home.carousel.prev')}><ArrowLeft /></Button><Button variant="ghost" size="icon" className="home-circle-button" onClick={() => select(carousel.index + 1)} aria-label={t('home.carousel.next')}><ArrowRight /></Button>{!carousel.reduced && <Button variant="ghost" size="icon" className="home-circle-button" onClick={() => carousel.setStopped(!carousel.stopped)} aria-label={t(carousel.stopped ? 'home.carousel.play' : 'home.carousel.pause')}>{carousel.stopped ? <Play /> : <Pause />}</Button>}</div></div></div>
  </section>;
}
