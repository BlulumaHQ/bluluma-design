import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect, useCallback, useMemo, FormEvent } from "react";
import ProjectCard from "@/components/ProjectCard";
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

const caseStudyProjects = projects.filter((p) => p.caseStudy);

const RevealSection = ({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) => {
  const ref = useScrollReveal<HTMLDivElement>({ delay });
  return <div ref={ref} className={className}>{children}</div>;
};

const SharpQuote = () => (
  <svg width="160" height="120" viewBox="0 0 160 120" fill="none" className="absolute top-4 left-5 pointer-events-none select-none" style={{ opacity: 0.12 }}>
    <polygon points="0,0 60,0 36,120 0,120" fill="hsl(265 80% 60%)" />
    <polygon points="72,0 132,0 108,120 72,120" fill="hsl(265 80% 60%)" />
  </svg>
);

const testimonials = [
  { quoteKey: "testimonial.1.quote", name: "Michael Chen", company: "Friendly Dental Group", projectTypeKey: "testimonial.brand-website" },
  { quoteKey: "testimonial.2.quote", name: "Sarah Thompson", company: "Headwater Developments", projectTypeKey: "testimonial.brand-website" },
  { quoteKey: "testimonial.3.quote", name: "Daniel Wong", company: "BTN Real Estate Advisory", projectTypeKey: "testimonial.website-platform" },
  { quoteKey: "testimonial.4.quote", name: "Jessica Lee", company: "NuEra Nutra", projectTypeKey: "testimonial.brand-website" },
  { quoteKey: "testimonial.5.quote", name: "Ryan Patel", company: "Vita Environmental", projectTypeKey: "testimonial.website-platform" },
  { quoteKey: "testimonial.6.quote", name: "David Nguyen", company: "Pacific Interior Studio", projectTypeKey: "testimonial.brand-website" },
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

  return (
    <div className="relative">
      <div className="overflow-hidden">
        <div className="flex" style={{ transform: `translateX(-${currentSlide * 100}%)`, transition: "transform 500ms ease-in-out" }}>
          {isMobile
            ? testimonials.map((testimonial, i) => (
                <div key={i} className="w-full flex-shrink-0" style={{ minWidth: "100%" }}>
                  <div className="border border-border p-8 relative" style={{ minHeight: 260 }}>
                    <SharpQuote />
                    <blockquote className="text-foreground leading-relaxed mb-6 relative z-10 pt-16 whitespace-pre-line">"{t(testimonial.quoteKey)}"</blockquote>
                    <div className="border-t border-border pt-4 flex items-center justify-between relative z-10">
                      <div>
                        <p className="text-sm font-semibold">{testimonial.name}</p>
                        <p className="text-xs text-muted-foreground">{testimonial.company}</p>
                      </div>
                      <span className="text-xs text-muted-foreground border border-border px-2 py-1">{t(testimonial.projectTypeKey)}</span>
                    </div>
                  </div>
                </div>
              ))
            : Array.from({ length: desktopSlideCount }, (_, slideIdx) => {
                const pair = testimonials.slice(slideIdx * 2, slideIdx * 2 + 2);
                return (
                  <div key={slideIdx} className="w-full flex-shrink-0" style={{ minWidth: "100%" }}>
                    <div className="grid grid-cols-2 gap-8">
                      {pair.map((testimonial, i) => (
                        <div key={i} className="border border-border p-8 relative transition-all duration-300 hover:border-primary" style={{ minHeight: 280 }}>
                          <SharpQuote />
                          <blockquote className="text-foreground leading-relaxed mb-6 relative z-10 pt-16 whitespace-pre-line">"{t(testimonial.quoteKey)}"</blockquote>
                          <div className="border-t border-border pt-4 flex items-center justify-between relative z-10">
                            <div>
                              <p className="text-sm font-semibold">{testimonial.name}</p>
                              <p className="text-xs text-muted-foreground">{testimonial.company}</p>
                            </div>
                            <span className="text-xs text-muted-foreground border border-border px-2 py-1">{t(testimonial.projectTypeKey)}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
        </div>
      </div>
      <div className="flex items-center justify-between mt-6">
        <button onClick={() => goTo(currentSlide - 1)} disabled={currentSlide === 0} className="text-xs text-muted-foreground hover:text-foreground disabled:opacity-30 transition-colors">{t("prev")}</button>
        <div className="flex gap-3">
          {Array.from({ length: totalSlides }, (_, i) => (
            <button key={i} onClick={() => goTo(i)} className={`w-2 h-2 transition-colors duration-200 ${currentSlide === i ? "bg-primary" : "bg-border"}`} aria-label={`Go to slide ${i + 1}`} />
          ))}
        </div>
        <button onClick={() => goTo(currentSlide + 1)} disabled={currentSlide === totalSlides - 1} className="text-xs text-muted-foreground hover:text-foreground disabled:opacity-30 transition-colors">{t("next")}</button>
      </div>
    </div>
  );
};

const Home = () => {
  const { t } = useLang();

  const randomProjects = useMemo(() => {
    const shuffled = [...projects].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, 4);
  }, []);

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
      {/* ═══════ HERO ═══════ */}
      <section className="relative overflow-hidden border-b border-border">
        <div className="logo-motif absolute inset-0 pointer-events-none" />
        <div className="section-container py-28 md:py-40 relative z-10">
          <RevealSection>
            <p className="text-label mb-6">{t("home.hero.trust")}</p>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold leading-[1.05] max-w-4xl">
              <span className="gradient-text">{t("home.hero.h1.line1")}</span>
              <br />
              {t("home.hero.h1.line2")}
            </h1>
            <p className="mt-8 text-lg md:text-xl text-muted-foreground max-w-2xl leading-relaxed">
              {t("home.hero.sub")}
            </p>
            <div className="mt-12 flex flex-col sm:flex-row gap-4">
              <Link
                to="/contact"
                className="cta-button inline-flex items-center justify-center gap-2 px-8 py-4 bg-primary text-primary-foreground text-base font-semibold hover:bg-primary-dark transition-colors"
              >
                {t("cta.get-strategy")}
                <ArrowRight size={18} />
              </Link>
              <Link
                to="/work"
                className="cta-button inline-flex items-center justify-center px-8 py-4 border border-border text-base font-semibold hover:border-primary hover:text-primary transition-colors"
              >
                {t("cta.view-case-studies")}
              </Link>
            </div>
          </RevealSection>
        </div>
      </section>

      {/* ═══════ PROBLEM ═══════ */}
      <section className="section-border section-subtle-bg">
        <div className="section-container section-padding">
          <RevealSection>
            <div className="flex items-start gap-4 mb-6">
              <AlertTriangle size={28} strokeWidth={1.5} className="text-primary flex-shrink-0 mt-1" />
              <h2 className="text-3xl md:text-4xl font-bold">{t("home.problem.title")}</h2>
            </div>
            <p className="text-lg text-muted-foreground mb-10 max-w-2xl">{t("home.problem.intro")}</p>
          </RevealSection>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-border border border-border">
            {["home.problem.b1", "home.problem.b2", "home.problem.b3", "home.problem.b4"].map((key, i) => (
              <RevealSection key={key} delay={i * 80}>
                <div className="bg-background p-8 flex items-start gap-3">
                  <X size={16} className="text-destructive flex-shrink-0 mt-1" />
                  <p className="text-foreground font-medium">{t(key)}</p>
                </div>
              </RevealSection>
            ))}
          </div>
          <RevealSection delay={350}>
            <div className="mt-10 p-8 border border-primary/30 bg-primary/5">
              <p className="text-lg font-semibold text-foreground">{t("home.problem.closing")}</p>
            </div>
          </RevealSection>
        </div>
      </section>

      {/* ═══════ SOLUTION ═══════ */}
      <section className="section-border">
        <div className="section-container section-padding">
          <RevealSection>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">{t("home.solution.title")}</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mb-10">{t("home.solution.intro")}</p>
          </RevealSection>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-border border border-border">
            {["home.solution.i1", "home.solution.i2", "home.solution.i3", "home.solution.i4", "home.solution.i5"].map((key, i) => (
              <RevealSection key={key} delay={i * 60}>
                <div className="bg-background p-6 flex items-start gap-3 h-full">
                  <CheckCircle2 size={18} strokeWidth={1.5} className="text-primary flex-shrink-0 mt-0.5" />
                  <p className="text-sm font-medium text-foreground">{t(key)}</p>
                </div>
              </RevealSection>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════ CORE SERVICES ═══════ */}
      <section className="section-border section-subtle-bg">
        <div className="section-container section-padding">
          <RevealSection>
            <h2 className="text-3xl md:text-4xl font-bold mb-12">{t("home.services.title")}</h2>
          </RevealSection>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((svc, i) => {
              const Icon = svc.icon;
              return (
                <RevealSection key={i} delay={i * 120} className="h-full">
                  <div className="border border-border bg-background p-8 md:p-10 h-full flex flex-col transition-all duration-300 hover:border-primary hover:-translate-y-1">
                    <Icon size={32} strokeWidth={1.5} className="text-primary mb-6" />
                    <h3 className="text-xl font-bold mb-3">{t(svc.titleKey)}</h3>
                    <p className="text-muted-foreground leading-relaxed flex-grow">{t(svc.descKey)}</p>
                    <Link to="/solutions" className="mt-6 text-sm font-medium text-primary inline-flex items-center gap-1 hover:gap-2 transition-all">
                      {t("cta.learn-more")}
                    </Link>
                  </div>
                </RevealSection>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══════ HOW IT WORKS ═══════ */}
      <section className="section-border">
        <div className="section-container section-padding">
          <RevealSection>
            <h2 className="text-3xl md:text-4xl font-bold mb-12">{t("home.howitworks.title")}</h2>
          </RevealSection>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((step, i) => (
              <RevealSection key={i} delay={i * 150} className="h-full">
                <div className="card-border p-8 h-full flex flex-col transition-all duration-300 hover:border-primary hover:-translate-y-1">
                  <span className="text-5xl font-extrabold text-primary/20 mb-4">{step.num}</span>
                  <h3 className="text-xl font-bold mb-3">{t(step.titleKey)}</h3>
                  <p className="text-muted-foreground leading-relaxed">{t(step.descKey)}</p>
                </div>
              </RevealSection>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════ SELECTED WORK ═══════ */}
      <section className="section-border section-subtle-bg">
        <div className="section-container py-16 md:py-24">
          <RevealSection>
            <div className="flex items-baseline justify-between mb-8">
              <h2 className="text-3xl md:text-4xl font-bold">{t("home.work.title")}</h2>
              <span className="text-xs text-muted-foreground tracking-wide uppercase hidden md:block">{t("home.work.label")}</span>
            </div>
          </RevealSection>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {randomProjects.map((project, i) => (
              <RevealSection key={project.slug} delay={i * 100} className="h-full">
                <ProjectCard project={project} imageImport={projectImages[project.slug]} mode="live" />
              </RevealSection>
            ))}
          </div>
          <RevealSection delay={400}>
            <div className="mt-12 text-center">
              <Link to="/work" className="inline-flex items-center px-8 py-3 border border-border text-sm font-medium hover:border-primary hover:text-primary transition-colors">
                {t("cta.view-all-work")}
              </Link>
            </div>
          </RevealSection>
        </div>
      </section>

      {/* ═══════ PROOF / CASE STUDIES ═══════ */}
      <section className="section-border">
        <div className="section-container section-padding">
          <RevealSection>
            <h2 className="text-3xl md:text-4xl font-bold mb-2">{t("home.proof.title")}</h2>
            <p className="text-muted-foreground mb-10">{t("home.proof.sub")}</p>
          </RevealSection>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {caseStudyProjects.map((project, i) => (
              <RevealSection key={project.slug} delay={i * 100}>
                <Link to={`/case-studies/${project.slug}`} className="group card-border p-6 block transition-all duration-300 hover:border-primary hover:-translate-y-1">
                  {projectImages[project.slug] && (
                    <div className="aspect-[16/9] overflow-hidden mb-4 border border-border">
                      <img src={projectImages[project.slug]} alt={project.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.02]" loading="lazy" />
                    </div>
                  )}
                  <h3 className="text-lg font-semibold mb-2">{project.name}</h3>
                  <p className="text-sm text-muted-foreground mb-1">{project.industry}</p>
                  <span className="text-sm font-medium text-primary">{t("cta.read-case-study")}</span>
                </Link>
              </RevealSection>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════ DIFFERENTIATION ═══════ */}
      <section className="section-border section-subtle-bg">
        <div className="section-container section-padding">
          <RevealSection>
            <h2 className="text-3xl md:text-4xl font-bold mb-12">{t("home.diff.title")}</h2>
          </RevealSection>
          <div className="border border-border">
            <div className="grid grid-cols-2 bg-primary/5">
              <div className="p-4 md:p-6 border-r border-border">
                <p className="text-label">{t("home.diff.col.them")}</p>
              </div>
              <div className="p-4 md:p-6">
                <p className="text-label">{t("home.diff.col.us")}</p>
              </div>
            </div>
            {diffItems.map((item, i) => (
              <RevealSection key={i} delay={i * 100}>
                <div className="grid grid-cols-2 border-t border-border">
                  <div className="p-4 md:p-6 border-r border-border text-muted-foreground flex items-start gap-2">
                    <X size={14} className="text-destructive flex-shrink-0 mt-1" />
                    {t(item.them)}
                  </div>
                  <div className="p-4 md:p-6 font-semibold text-foreground flex items-start gap-2">
                    <Check size={14} className="text-primary flex-shrink-0 mt-1" />
                    {t(item.us)}
                  </div>
                </div>
              </RevealSection>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════ PRICING ANCHOR ═══════ */}
      <section className="section-border">
        <div className="section-container section-padding text-center">
          <RevealSection>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">{t("home.pricing.title")}</h2>
            <p className="text-muted-foreground mb-10 max-w-xl mx-auto">{t("home.pricing.sub")}</p>
            <div className="inline-flex flex-col items-center border border-border p-10 md:p-14 bg-card">
              <p className="text-label mb-4">{t("home.pricing.label")}</p>
              <p className="text-5xl md:text-6xl font-extrabold gradient-text">{t("home.pricing.range")}</p>
              <p className="text-muted-foreground mt-4 text-sm">{t("home.pricing.note")}</p>
            </div>
          </RevealSection>
        </div>
      </section>

      {/* ═══════ TESTIMONIALS ═══════ */}
      <section className="section-border section-subtle-bg">
        <div className="section-container py-16 md:py-24">
          <RevealSection>
            <h2 className="text-3xl md:text-4xl font-bold mb-10">{t("home.testimonials.title")}</h2>
          </RevealSection>
          <TestimonialsCarousel />
        </div>
      </section>

      {/* ═══════ FINAL CTA ═══════ */}
      <section>
        <div className="section-container py-20 md:py-32 text-center">
          <RevealSection>
            <h2 className="text-3xl md:text-5xl font-bold mb-4 max-w-3xl mx-auto">{t("home.finalcta.title")}</h2>
            <p className="text-muted-foreground mb-10 max-w-xl mx-auto">{t("home.finalcta.sub")}</p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link
                to="/contact"
                className="cta-button inline-flex items-center justify-center gap-2 px-8 py-4 bg-primary text-primary-foreground text-base font-semibold hover:bg-primary-dark transition-colors"
              >
                {t("cta.get-strategy")}
                <ArrowRight size={18} />
              </Link>
              <Link
                to="/contact"
                className="cta-button inline-flex items-center justify-center px-8 py-4 border border-border text-base font-semibold hover:border-primary hover:text-primary transition-colors"
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