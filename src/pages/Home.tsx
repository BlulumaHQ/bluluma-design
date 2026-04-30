import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect, useCallback, useMemo, FormEvent } from "react";
import { projects } from "@/lib/projects";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useLang } from "@/lib/i18n";
import friendlyDental from "@/assets/projects/friendly-dental.jpg";
import liveAtHeadwater from "@/assets/projects/live-at-headwater.jpg";
import btnRealEstate from "@/assets/projects/btn-real-estate.jpg";
import nueranutra from "@/assets/projects/nuera-nutra.jpg";
import vitaEnvironmental from "@/assets/projects/vita-environmental.jpg";
import spaAlita from "@/assets/projects/spa-alita.jpg";
import presotea from "@/assets/projects/presotea.jpg";
import hsinHsin from "@/assets/projects/hsin-hsin-art-framing.jpg";
import sonykunDesign from "@/assets/projects/sonykun-design.jpg";
import kchenConstruction from "@/assets/projects/kchen-construction.jpg";
import helenLam from "@/assets/projects/helen-lam-real-estate.jpg";
import calinClub from "@/assets/projects/calin-club.jpg";
import conceptLuxury from "@/assets/projects/concept-luxury-realtor.jpg";
import conceptPersonal from "@/assets/projects/concept-personal-brand-realtor.jpg";
import conceptMobile from "@/assets/projects/concept-mobile-listings.jpg";
import { Target, Zap, Gem, AlertTriangle, CheckCircle2, ArrowRight, X, Check } from "lucide-react";

const projectImages: Record<string, string> = {
  "friendly-dental": friendlyDental,
  "live-at-headwater": liveAtHeadwater,
  "btn-real-estate": btnRealEstate,
  "nuera-nutra": nueranutra,
  "vita-environmental": vitaEnvironmental,
  "spa-alita": spaAlita,
  presotea,
  "hsin-hsin-art-framing": hsinHsin,
  "sonykun-design": sonykunDesign,
  "kchen-construction": kchenConstruction,
  "helen-lam-real-estate": helenLam,
  "calin-club": calinClub,
};

const projectResults: Record<string, string> = {
  "friendly-dental": "+40% Patient Inquiries",
  "live-at-headwater": "+2x Lead Conversion",
  "btn-real-estate": "+35% More Leads",
  "nuera-nutra": "+60% Online Sales",
  "vita-environmental": "Improved User Flow",
  "spa-alita": "+45% Bookings",
  presotea: "Stronger Brand Presence",
  "hsin-hsin-art-framing": "+25% Sales Inquiries",
  "sonykun-design": "+3x Portfolio Views",
  "kchen-construction": "+50% Project Leads",
  "helen-lam-real-estate": "+30% Client Reach",
  "calin-club": "+55% Membership Signups",
};

const caseStudyProjects = projects.filter((p) => p.caseStudy);

const RevealSection = ({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) => {
  const ref = useScrollReveal<HTMLDivElement>({ delay });
  return <div ref={ref} className={className}>{children}</div>;
};

const SharpQuote = () => (
  <svg width="160" height="120" viewBox="0 0 160 120" fill="none" className="absolute top-4 left-5 pointer-events-none select-none" style={{ opacity: 0.08 }}>
    <polygon points="0,0 60,0 36,120 0,120" fill="hsl(220 55% 55%)" />
    <polygon points="72,0 132,0 108,120 72,120" fill="hsl(250 50% 60%)" />
  </svg>
);

const testimonials = [
  { quoteKey: "testimonial.1.quote", name: "Michael Chen", company: "Friendly Dental Group", resultKey: "testimonial.brand-website" },
  { quoteKey: "testimonial.2.quote", name: "Sarah Thompson", company: "Headwater Developments", resultKey: "testimonial.brand-website" },
  { quoteKey: "testimonial.3.quote", name: "Daniel Wong", company: "BTN Real Estate Advisory", resultKey: "testimonial.website-platform" },
  { quoteKey: "testimonial.4.quote", name: "Jessica Lee", company: "NuEra Nutra", resultKey: "testimonial.brand-website" },
  { quoteKey: "testimonial.5.quote", name: "Ryan Patel", company: "Vita Environmental", resultKey: "testimonial.website-platform" },
  { quoteKey: "testimonial.6.quote", name: "David Nguyen", company: "Pacific Interior Studio", resultKey: "testimonial.brand-website" },
];

const TestimonialsCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const { t } = useLang();

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const desktopSlideCount = Math.ceil(testimonials.length / 2);
  const totalSlides = isMobile ? testimonials.length : desktopSlideCount;

  const goTo = useCallback((index: number) => {
    setCurrentSlide(Math.max(0, Math.min(index, totalSlides - 1)));
  }, [totalSlides]);

  const renderCard = (testimonial: typeof testimonials[0], i: number) => (
    <div key={i} className="border border-border rounded-lg p-10 relative transition-all duration-300 hover:border-primary/50 bg-background" style={{ minHeight: 300 }}>
      <SharpQuote />
      <blockquote className="text-lg text-foreground leading-relaxed mb-8 relative z-10 pt-16 whitespace-pre-line">"{t(testimonial.quoteKey)}"</blockquote>
      <div className="border-t border-border pt-5 flex items-center justify-between relative z-10">
        <div>
          <p className="text-base font-semibold">{testimonial.name}</p>
          <p className="text-sm text-muted-foreground">{testimonial.company}</p>
        </div>
        <span className="text-xs text-muted-foreground border border-border rounded px-3 py-1">{t(testimonial.resultKey)}</span>
      </div>
    </div>
  );

  return (
    <div className="relative">
      <div className="overflow-hidden">
        <div className="flex" style={{ transform: `translateX(-${currentSlide * 100}%)`, transition: "transform 500ms ease-in-out" }}>
          {isMobile
            ? testimonials.map((testimonial, i) => (
                <div key={i} className="w-full flex-shrink-0 px-1" style={{ minWidth: "100%" }}>
                  {renderCard(testimonial, i)}
                </div>
              ))
            : Array.from({ length: desktopSlideCount }, (_, slideIdx) => {
                const pair = testimonials.slice(slideIdx * 2, slideIdx * 2 + 2);
                return (
                  <div key={slideIdx} className="w-full flex-shrink-0" style={{ minWidth: "100%" }}>
                    <div className="grid grid-cols-2 gap-8">
                      {pair.map((testimonial, i) => renderCard(testimonial, i))}
                    </div>
                  </div>
                );
              })}
        </div>
      </div>
      <div className="flex items-center justify-between mt-8">
        <button onClick={() => goTo(currentSlide - 1)} disabled={currentSlide === 0} className="text-sm text-muted-foreground hover:text-foreground disabled:opacity-30 transition-colors">{t("prev")}</button>
        <div className="flex gap-3">
          {Array.from({ length: totalSlides }, (_, i) => (
            <button key={i} onClick={() => goTo(i)} className={`w-2.5 h-2.5 rounded-full transition-colors duration-200 ${currentSlide === i ? "bg-primary" : "bg-border"}`} aria-label={`Go to slide ${i + 1}`} />
          ))}
        </div>
        <button onClick={() => goTo(currentSlide + 1)} disabled={currentSlide === totalSlides - 1} className="text-sm text-muted-foreground hover:text-foreground disabled:opacity-30 transition-colors">{t("next")}</button>
      </div>
    </div>
  );
};

const Home = () => {
  const { t } = useLang();

  type RealEstateTile = {
    key: string;
    name: string;
    result: string;
    image: string;
    href?: string;
    isConcept?: boolean;
  };

  const realEstateProjects: RealEstateTile[] = [
    {
      key: "live-at-headwater",
      name: "Live at Headwater",
      result: "Luxury-focused redesign to attract high-end buyers",
      image: liveAtHeadwater,
      href: "https://liveatheadwater.ca",
    },
    {
      key: "btn-real-estate",
      name: "BTN Real Estate",
      result: "Improved lead flow with clearer call-to-action",
      image: btnRealEstate,
      href: "https://btn.bluluma.com",
    },
    {
      key: "helen-lam",
      name: "Helen Lam Real Estate",
      result: "MLS IDX integration for easier property browsing",
      image: helenLam,
      href: "https://helenlam.ca",
    },
    {
      key: "concept-luxury",
      name: "Luxury Estate Concept",
      result: "Premium aesthetic positioning for luxury listings",
      image: conceptLuxury,
      isConcept: true,
    },
    {
      key: "concept-personal",
      name: "Realtor Personal Brand Concept",
      result: "Stronger personal branding for competitive markets",
      image: conceptPersonal,
      isConcept: true,
    },
    {
      key: "concept-mobile",
      name: "Mobile Listings Concept",
      result: "Optimized mobile layout for on-the-go buyers",
      image: conceptMobile,
      isConcept: true,
    },
  ];

  const services = [
    { icon: Target, titleKey: "home.svc1.title", descKey: "home.svc1.desc" },
    { icon: Zap, titleKey: "home.svc2.title", descKey: "home.svc2.desc" },
    { icon: Gem, titleKey: "home.svc3.title", descKey: "home.svc3.desc" },
  ];

  const steps = [
    { num: "01", titleKey: "home.step1.title", descKey: "home.step1.desc" },
    { num: "02", titleKey: "home.step2.title", descKey: "home.step2.desc" },
    { num: "03", titleKey: "home.step3.title", descKey: "home.step3.desc" },
  ];

  const diffItems = [
    { them: "home.diff.them1", us: "home.diff.us1" },
    { them: "home.diff.them2", us: "home.diff.us2" },
    { them: "home.diff.them3", us: "home.diff.us3" },
  ];

  return (
    <div>
      {/* ═══════ HERO (DARK) ═══════ */}
      <section className="section-dark relative overflow-hidden">
        <div className="logo-motif absolute inset-0 pointer-events-none" />
        <div className="section-container py-32 md:py-44 relative z-10">
          <RevealSection>
            <p className="text-label mb-8">{t("home.hero.trust")}</p>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold leading-[1.05] max-w-4xl">
              <span className="gradient-text">{t("home.hero.h1.line1")}</span>
              <br />
              {t("home.hero.h1.line2")}
            </h1>
            <p className="mt-10 text-xl md:text-2xl max-w-2xl leading-relaxed" style={{ color: "hsl(220 10% 65%)" }}>
              {t("home.hero.sub")}
            </p>
            <div className="mt-14 flex flex-col sm:flex-row gap-5">
              <Link
                to="/contact"
                className="cta-button cta-gradient inline-flex items-center justify-center gap-2 px-10 py-5 text-lg font-semibold rounded-lg"
              >
                {t("cta.get-strategy")}
                <ArrowRight size={20} />
              </Link>
              <Link
                to="/work"
                className="cta-button inline-flex items-center justify-center px-10 py-5 text-lg font-semibold rounded-lg transition-colors"
                style={{ border: "1px solid hsl(220 14% 22%)", color: "hsl(0 0% 90%)" }}
              >
                See How We Increase Conversions
              </Link>
            </div>
          </RevealSection>
        </div>
      </section>

      {/* ═══════ PROBLEM (WHITE) ═══════ */}
      <section className="section-border">
        <div className="section-container section-padding">
          <RevealSection>
            <div className="flex items-start gap-4 mb-8">
              <AlertTriangle size={32} strokeWidth={1.5} className="text-primary flex-shrink-0 mt-1" />
              <h2 className="text-3xl md:text-5xl font-bold">{t("home.problem.title")}</h2>
            </div>
            <p className="text-xl text-muted-foreground mb-12 max-w-2xl">{t("home.problem.intro")}</p>
          </RevealSection>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-border border border-border rounded-lg overflow-hidden">
            {["home.problem.b1", "home.problem.b2", "home.problem.b3", "home.problem.b4"].map((key, i) => (
              <RevealSection key={key} delay={i * 80}>
                <div className="bg-background p-8 md:p-10 flex items-start gap-4">
                  <X size={18} className="text-destructive flex-shrink-0 mt-1" />
                  <p className="text-lg text-foreground font-medium">{t(key)}</p>
                </div>
              </RevealSection>
            ))}
          </div>
          <RevealSection delay={350}>
            <div className="mt-12 p-10 border border-primary/30 bg-primary/5 rounded-lg">
              <p className="text-xl font-semibold text-foreground">{t("home.problem.closing")}</p>
            </div>
          </RevealSection>
        </div>
      </section>

      {/* ═══════ SOLUTION (SUBTLE BG) ═══════ */}
      <section className="section-border section-subtle-bg">
        <div className="section-container section-padding">
          <RevealSection>
            <h2 className="text-3xl md:text-5xl font-bold mb-5">{t("home.solution.title")}</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mb-12">{t("home.solution.intro")}</p>
          </RevealSection>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-border border border-border rounded-lg overflow-hidden">
            {["home.solution.i1", "home.solution.i2", "home.solution.i3", "home.solution.i4", "home.solution.i5"].map((key, i) => (
              <RevealSection key={key} delay={i * 60}>
                <div className="bg-background p-8 flex items-start gap-4 h-full">
                  <CheckCircle2 size={20} strokeWidth={1.5} className="text-primary flex-shrink-0 mt-0.5" />
                  <p className="text-base font-medium text-foreground">{t(key)}</p>
                </div>
              </RevealSection>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════ CORE SERVICES (WHITE) ═══════ */}
      <section className="section-border">
        <div className="section-container section-padding">
          <RevealSection>
            <h2 className="text-3xl md:text-5xl font-bold mb-14">{t("home.services.title")}</h2>
          </RevealSection>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((svc, i) => {
              const Icon = svc.icon;
              return (
                <RevealSection key={i} delay={i * 120} className="h-full">
                  <div className="border border-border bg-background rounded-lg p-10 md:p-12 h-full flex flex-col transition-all duration-300 hover:border-primary/50 hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/10">
                    <Icon size={36} strokeWidth={1.5} className="text-primary mb-8" />
                    <h3 className="text-2xl font-bold mb-4">{t(svc.titleKey)}</h3>
                    <p className="text-lg text-muted-foreground leading-relaxed flex-grow">{t(svc.descKey)}</p>
                    <Link to="/solutions" className="mt-8 text-base font-medium text-primary inline-flex items-center gap-2 hover:gap-3 transition-all">
                      {t("cta.learn-more")} <ArrowRight size={16} />
                    </Link>
                  </div>
                </RevealSection>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══════ HOW IT WORKS (SUBTLE BG) ═══════ */}
      <section className="section-border section-subtle-bg">
        <div className="section-container section-padding">
          <RevealSection>
            <h2 className="text-3xl md:text-5xl font-bold mb-14">{t("home.howitworks.title")}</h2>
          </RevealSection>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((step, i) => (
              <RevealSection key={i} delay={i * 150} className="h-full">
                <div className="card-border bg-background p-10 h-full flex flex-col transition-all duration-300 hover:border-primary/50 hover:-translate-y-1">
                  <span className="text-6xl font-extrabold gradient-text mb-6">{step.num}</span>
                  <h3 className="text-2xl font-bold mb-4">{t(step.titleKey)}</h3>
                  <p className="text-lg text-muted-foreground leading-relaxed">{t(step.descKey)}</p>
                </div>
              </RevealSection>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════ SELECTED WORK (WHITE) ═══════ */}
      <section className="section-border">
        <div className="section-container section-padding">
          <RevealSection>
            <div className="flex items-baseline justify-between mb-12">
              <h2 className="text-3xl md:text-5xl font-bold">Selected Real Estate Projects</h2>
              <span className="text-xs text-muted-foreground tracking-wide uppercase hidden md:block">{t("home.work.label")}</span>
            </div>
          </RevealSection>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {realEstateProjects.map((tile, i) => {
              const Wrapper: React.ElementType = tile.href ? "a" : "div";
              const wrapperProps = tile.href
                ? { href: tile.href, target: "_blank", rel: "noopener noreferrer" }
                : {};
              return (
                <RevealSection key={tile.key} delay={i * 80} className="h-full">
                  <Wrapper
                    {...wrapperProps}
                    className="group block h-full border border-border bg-background rounded-lg overflow-hidden transition-all duration-300 hover:border-primary/50 hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/10"
                  >
                    <div className="relative aspect-[4/3] overflow-hidden bg-muted">
                      <img
                        src={tile.image}
                        alt={`${tile.name} — real estate website project by Bluluma`}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                        loading="lazy"
                        width={1280}
                        height={960}
                      />
                      {tile.isConcept && (
                        <span className="absolute top-4 left-4 z-10 bg-background/95 backdrop-blur-sm border border-border text-foreground text-[11px] font-semibold tracking-wide uppercase rounded px-2.5 py-1">
                          Sample Concept
                        </span>
                      )}
                    </div>
                    <div className="p-7">
                      <h3 className="text-xl font-semibold mb-2">{tile.name}</h3>
                      <p className="text-base text-muted-foreground leading-relaxed">{tile.result}</p>
                    </div>
                  </Wrapper>
                </RevealSection>
              );
            })}
          </div>
          <RevealSection delay={400}>
            <div className="mt-14 text-center">
              <Link to="/work" className="cta-button inline-flex items-center gap-2 px-10 py-4 border border-border text-base font-semibold rounded-lg hover:border-primary hover:text-primary transition-colors">
                {t("cta.view-all-work")} <ArrowRight size={16} />
              </Link>
            </div>
          </RevealSection>
        </div>
      </section>

      {/* ═══════ PROOF / CASE STUDIES (SUBTLE BG) ═══════ */}
      <section className="section-border section-subtle-bg">
        <div className="section-container section-padding">
          <RevealSection>
            <h2 className="text-3xl md:text-5xl font-bold mb-3">{t("home.proof.title")}</h2>
            <p className="text-xl text-muted-foreground mb-12">{t("home.proof.sub")}</p>
          </RevealSection>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {caseStudyProjects.map((project, i) => (
              <RevealSection key={project.slug} delay={i * 100}>
                <Link to={`/case-studies/${project.slug}`} className="group card-border bg-background p-8 block transition-all duration-300 hover:border-primary/50 hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/10">
                  {projectImages[project.slug] && (
                    <div className="aspect-[16/9] overflow-hidden mb-6 border border-border rounded-md">
                      <img src={projectImages[project.slug]} alt={project.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.02]" loading="lazy" />
                    </div>
                  )}
                  <h3 className="text-xl font-semibold mb-2">{project.name}</h3>
                  <p className="text-base text-muted-foreground mb-3">{project.industry}</p>
                  {projectResults[project.slug] && (
                    <p className="text-sm font-bold text-primary mb-3">{projectResults[project.slug]}</p>
                  )}
                  <span className="text-base font-medium text-primary">{t("cta.read-case-study")}</span>
                </Link>
              </RevealSection>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════ DIFFERENTIATION (WHITE) ═══════ */}
      <section className="section-border">
        <div className="section-container section-padding">
          <RevealSection>
            <h2 className="text-3xl md:text-5xl font-bold mb-14">{t("home.diff.title")}</h2>
          </RevealSection>
          <div className="border border-border rounded-lg overflow-hidden">
            <div className="grid grid-cols-2 bg-primary/5">
              <div className="p-5 md:p-8 border-r border-border">
                <p className="text-label">{t("home.diff.col.them")}</p>
              </div>
              <div className="p-5 md:p-8">
                <p className="text-label">{t("home.diff.col.us")}</p>
              </div>
            </div>
            {diffItems.map((item, i) => (
              <RevealSection key={i} delay={i * 100}>
                <div className="grid grid-cols-2 border-t border-border">
                  <div className="p-5 md:p-8 border-r border-border text-lg text-muted-foreground flex items-start gap-3">
                    <X size={16} className="text-destructive flex-shrink-0 mt-1.5" />
                    {t(item.them)}
                  </div>
                  <div className="p-5 md:p-8 text-lg font-semibold text-foreground flex items-start gap-3">
                    <Check size={16} className="text-primary flex-shrink-0 mt-1.5" />
                    {t(item.us)}
                  </div>
                </div>
              </RevealSection>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════ PRICING ANCHOR (SUBTLE BG) ═══════ */}
      <section className="section-border section-subtle-bg">
        <div className="section-container section-padding text-center">
          <RevealSection>
            <h2 className="text-3xl md:text-5xl font-bold mb-5">{t("home.pricing.title")}</h2>
            <p className="text-xl text-muted-foreground mb-12 max-w-xl mx-auto">{t("home.pricing.sub")}</p>
            <div className="inline-flex flex-col items-center border border-border rounded-xl p-12 md:p-16 bg-background">
              <p className="text-label mb-6">{t("home.pricing.label")}</p>
              <p className="text-5xl md:text-7xl font-extrabold gradient-text">{t("home.pricing.range")}</p>
              <p className="text-lg text-muted-foreground mt-6">{t("home.pricing.note")}</p>
              <p className="text-base text-muted-foreground mt-3">For businesses serious about growth — not basic websites.</p>
            </div>
          </RevealSection>
        </div>
      </section>

      {/* ═══════ TESTIMONIALS (WHITE) ═══════ */}
      <section className="section-border">
        <div className="section-container section-padding">
          <RevealSection>
            <h2 className="text-3xl md:text-5xl font-bold mb-12">{t("home.testimonials.title")}</h2>
          </RevealSection>
          <TestimonialsCarousel />
        </div>
      </section>

      {/* ═══════ FINAL CTA (DARK) ═══════ */}
      <section className="section-dark">
        <div className="section-container py-24 md:py-36 text-center">
          <RevealSection>
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-6 max-w-3xl mx-auto">{t("home.finalcta.title")}</h2>
            <p className="text-xl mb-12 max-w-xl mx-auto" style={{ color: "hsl(220 10% 55%)" }}>{t("home.finalcta.sub")}</p>
            <div className="flex flex-col sm:flex-row justify-center gap-5">
              <Link
                to="/contact"
                className="cta-button cta-gradient inline-flex items-center justify-center gap-2 px-10 py-5 text-lg font-semibold rounded-lg"
              >
                {t("cta.get-strategy")}
                <ArrowRight size={20} />
              </Link>
              <Link
                to="/contact"
                className="cta-button inline-flex items-center justify-center px-10 py-5 text-lg font-semibold rounded-lg transition-colors"
                style={{ border: "1px solid hsl(220 14% 22%)", color: "hsl(0 0% 90%)" }}
              >
                {t("cta.start-project")}
              </Link>
            </div>
          </RevealSection>
        </div>
      </section>
    </div>
  );
};

export default Home;
