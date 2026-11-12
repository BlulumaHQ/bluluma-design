import { useEffect, useState } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { Button } from './ui/button';
import { useLang } from '@/lib/i18n';
const testimonials = [
  { quote: 'testimonial.1.quote', name: 'Patrick Wu', company: 'Friendly Dental Centre' },
  { quote: 'testimonial.2.quote', name: 'Sarah Thompson', company: 'Headwater Developments' },
  { quote: 'testimonial.3.quote', name: 'Daniel Wong', company: 'BTN Real Estate Advisory' },
  { quote: 'testimonial.4.quote', name: 'Jessica Lee', company: 'NuEra Nutra' },
  { quote: 'testimonial.5.quote', name: 'Ryan Patel', company: 'Vita Environmental' },
  { quote: 'testimonial.6.quote', name: 'David Nguyen', company: 'Pacific Interior Studio' },
];
export default function HomeTestimonials() {
  const { t } = useLang();
  const [slide, setSlide] = useState(0);
  const [perSlide, setPerSlide] = useState(3);
  useEffect(() => {
    const change = () => { setPerSlide(window.innerWidth < 768 ? 1 : 3); setSlide(0); };
    change(); window.addEventListener('resize', change);
    return () => window.removeEventListener('resize', change);
  }, []);
  const total = Math.ceil(testimonials.length / perSlide);
  return <div className="home-testimonials" role="region" aria-roledescription="carousel" aria-label={t('home.testimonials.carousel')}><div className="home-testimonials-window"><div className="home-testimonials-track" style={{ transform: `translateX(-${slide * 100}%)` }}>{Array.from({length: total},(_,i) => <div className="home-testimonials-slide" key={i} aria-hidden={slide !== i}>{testimonials.slice(i * perSlide,(i+1)*perSlide).map((item,index) => <article className="home-card home-testimonial" key={item.name}><span className="home-quote-mark" aria-hidden="true">“</span><blockquote>{t(item.quote)}</blockquote><div className="home-testimonial-person"><strong>{i === 0 && index === 0 ? t('home.testimonial.1.name') : item.name}</strong><p>{i === 0 && index === 0 ? t('home.testimonial.1.company') : item.company}</p></div></article>)}</div>)}</div></div><div className="home-testimonial-controls"><Button variant="ghost" onClick={() => setSlide(s => Math.max(0,s-1))} disabled={slide === 0} aria-label={t('home.carousel.prev')}><ArrowLeft />{t('prev')}</Button><div className="home-testimonial-dots">{Array.from({length:total},(_,i) => <Button key={i} variant="ghost" className={`home-testimonial-dot ${i === slide ? 'is-active' : ''}`} onClick={() => setSlide(i)} aria-label={`${t('home.testimonials.carousel')} ${i+1}`} aria-pressed={i === slide} />)}</div><Button variant="ghost" onClick={() => setSlide(s => Math.min(total-1,s+1))} disabled={slide === total-1} aria-label={t('home.carousel.next')}>{t('next')}<ArrowRight /></Button></div></div>;
}
