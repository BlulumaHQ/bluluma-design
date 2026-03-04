import { Link } from "react-router-dom";
import { useState, useEffect, useCallback } from "react";
import ProjectCard from "@/components/ProjectCard";
import { projects } from "@/lib/projects";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useLang } from "@/lib/i18n";
import friendlyDental from "@/assets/projects/friendly-dental.jpg";
import liveAtHeadwater from "@/assets/projects/live-at-headwater.jpg";
import btnRealEstate from "@/assets/projects/btn-real-estate.jpg";
import nueranutra from "@/assets/projects/nuera-nutra.jpg";
import { Heart, Briefcase, Building2, Sparkles, Palette, Wrench, ShoppingCart, GraduationCap } from "lucide-react";

const projectImages: Record<string, string> = {
  "friendly-dental": friendlyDental,
  "live-at-headwater": liveAtHeadwater,
  "btn-real-estate": btnRealEstate,
  "nuera-nutra": nueranutra,
};

const featuredProjects = projects.filter((p) => p.featured);
const caseStudyProjects = projects.filter((p) => p.caseStudy);

const industries = [
  { name: "Healthcare & Dental", key: "ind.healthcare-dental", icon: Heart },
  { name: "Professional Services", key: "ind.professional-services", icon: Briefcase },
  { name: "Real Estate & Construction", key: "ind.real-estate-construction", icon: Building2 },
  { name: "Lifestyle Businesses", key: "ind.lifestyle-businesses", icon: Sparkles },
  { name: "Creative & Luxury Brands", key: "ind.creative-luxury-brands", icon: Palette },
  { name: "Home Services", key: "ind.home-services", icon: Wrench },
  { name: "Retail & Ecommerce", key: "ind.retail-ecommerce", icon: ShoppingCart },
  { name: "Education & Training", key: "ind.education-training", icon: GraduationCap },
];

const RevealSection = ({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) => {
  const ref = useScrollReveal<HTMLDivElement>({ delay });
  return <div ref={ref} className={className}>{children}</div>;
};

const FlowArrowRight = () => (
  <svg width="40" height="24" viewBox="0 0 40 24" fill="none" className="hidden md:block flex-shrink-0 mx-2">
    <line x1="0" y1="12" x2="32" y2="12" stroke="hsl(220, 62%, 51%)" strokeWidth="1.5" />
    <polyline points="28,7 34,12 28,17" stroke="hsl(220, 62%, 51%)" strokeWidth="1.5" fill="none" />
  </svg>
);

const FlowArrowDown = () => (
  <svg width="24" height="32" viewBox="0 0 24 32" fill="none" className="block md:hidden mx-auto my-2">
    <line x1="12" y1="0" x2="12" y2="24" stroke="hsl(220, 62%, 51%)" strokeWidth="1.5" />
    <polyline points="7,20 12,26 17,20" stroke="hsl(220, 62%, 51%)" strokeWidth="1.5" fill="none" />
  </svg>
);

const SharpQuote = () => (
  <svg
    width="160"
    height="120"
    viewBox="0 0 160 120"
    fill="none"
    className="absolute top-4 left-5 pointer-events-none select-none"
    style={{ opacity: 0.12 }}
  >
    <polygon points="0,0 60,0 36,120 0,120" fill="#5887da" />
    <polygon points="72,0 132,0 108,120 72,120" fill="#5887da" />
  </svg>
);

const testimonials = [
  {
    quote: "Bluluma transformed our online presence completely. The new website and brand identity have brought us more patient inquiries than we ever expected.",
    name: "Michael Chen",
    company: "Friendly Dental Group",
    projectTypeKey: "testimonial.brand-website",
  },
  {
    quote: "Working with Bluluma was seamless from start to finish. They understood our vision and delivered a platform that truly represents our development.",
    name: "Sarah Thompson",
    company: "Headwater Developments",
    projectTypeKey: "testimonial.brand-website",
  },
  {
    quote: "The attention to detail and strategic thinking behind every design decision made all the difference. Our new site performs beyond expectations.",
    name: "Daniel Wong",
    company: "BTN Real Estate Advisory",
    projectTypeKey: "testimonial.website-platform",
  },
  {
    quote: "Bluluma delivered a brand system and website that elevated our entire business. The clarity and professionalism speak for themselves.",
    name: "Jessica Lee",
    company: "NuEra Nutra",
    projectTypeKey: "testimonial.brand-website",
  },
  {
    quote: "Their process was structured, transparent, and efficient. We launched on time with a website that immediately started generating leads.",
    name: "Ryan Patel",
    company: "Vita Environmental",
    projectTypeKey: "testimonial.website-platform",
  },
  {
    quote: "From strategy to launch, Bluluma brought a level of craft and professionalism that set them apart from every other agency we've worked with.",
    name: "David Nguyen",
    company: "Pacific Interior Studio",
    projectTypeKey: "testimonial.brand-website",
  },
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

  const next = () => goTo(currentSlide + 1);
  const prev = () => goTo(currentSlide - 1);

  return (
    <div className="relative">
      <div className="overflow-hidden">
        <div
          className="flex"
          style={{
            transform: `translateX(-${currentSlide * 100}%)`,
            transition: "transform 500ms ease-in-out",
          }}
        >
          {isMobile ? (
            testimonials.map((testimonial, i) => (
              <div key={i} className="w-full flex-shrink-0 flex-grow-0" style={{ minWidth: "100%" }}>
                <div className="border border-border p-8 relative" style={{ minHeight: 260 }}>
                  <SharpQuote />
                  <blockquote className="text-foreground leading-relaxed mb-6 relative z-10 pt-16">
                    "{testimonial.quote}"
                  </blockquote>
                  <div className="border-t border-border pt-4 flex items-center justify-between relative z-10">
                    <div>
                      <p className="text-sm font-semibold">{testimonial.name}</p>
                      <p className="text-xs text-muted-foreground">{testimonial.company}</p>
                    </div>
                    <span className="text-xs text-muted-foreground border border-border px-2 py-1">
                      {t(testimonial.projectTypeKey)}
                    </span>
                  </div>
                </div>
              </div>
            ))
          ) : (
            Array.from({ length: desktopSlideCount }, (_, slideIdx) => {
              const pair = testimonials.slice(slideIdx * 2, slideIdx * 2 + 2);
              return (
                <div
                  key={slideIdx}
                  className="w-full flex-shrink-0 flex-grow-0"
                  style={{ minWidth: "100%" }}
                >
                  <div className="grid grid-cols-2 gap-8">
                    {pair.map((testimonial, i) => (
                      <div
                        key={i}
                        className="border border-border p-8 relative transition-all duration-300 hover:border-primary"
                        style={{ minHeight: 280 }}
                      >
                        <SharpQuote />
                        <blockquote className="text-foreground leading-relaxed mb-6 relative z-10 pt-16">
                          "{testimonial.quote}"
                        </blockquote>
                        <div className="border-t border-border pt-4 flex items-center justify-between relative z-10">
                          <div>
                            <p className="text-sm font-semibold">{testimonial.name}</p>
                            <p className="text-xs text-muted-foreground">{testimonial.company}</p>
                          </div>
                          <span className="text-xs text-muted-foreground border border-border px-2 py-1">
                            {t(testimonial.projectTypeKey)}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>

      <div className="flex items-center justify-between mt-6">
        <button
          onClick={prev}
          disabled={currentSlide === 0}
          className="text-xs text-muted-foreground hover:text-foreground disabled:opacity-30 transition-colors"
        >
          {t("prev")}
        </button>
        <div className="flex gap-3">
          {Array.from({ length: totalSlides }, (_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className={`w-2 h-2 transition-colors duration-200 ${
                currentSlide === i ? "bg-primary" : "bg-border"
              }`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
        <button
          onClick={next}
          disabled={currentSlide === totalSlides - 1}
          className="text-xs text-muted-foreground hover:text-foreground disabled:opacity-30 transition-colors"
        >
          {t("next")}
        </button>
      </div>
    </div>
  );
};

const InlineQuoteForm = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    company: "",
    currentUrl: "",
    projectType: "",
    message: "",
  });
  const { t } = useLang();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(t("form.submit-thanks"));
  };

  const inputClass = "w-full border border-border px-4 py-3 text-sm bg-background focus:outline-none focus:border-primary transition-colors";

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <input type="text" name="name" placeholder={`${t("form.name")} *`} value={form.name} onChange={handleChange} required className={inputClass} />
        <input type="email" name="email" placeholder={`${t("form.email")} *`} value={form.email} onChange={handleChange} required className={inputClass} />
        <input type="text" name="company" placeholder={`${t("form.company")} *`} value={form.company} onChange={handleChange} required className={inputClass} />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <input type="url" name="currentUrl" placeholder={t("form.current-url")} value={form.currentUrl} onChange={handleChange} className={inputClass} />
        <select name="projectType" value={form.projectType} onChange={handleChange} required className={inputClass}>
          <option value="">{t("form.project-type")} *</option>
          <option value="website">{t("form.opt.website")}</option>
          <option value="brand">{t("form.opt.brand")}</option>
          <option value="ecommerce">{t("form.opt.ecommerce")}</option>
          <option value="marketing">{t("form.opt.marketing")}</option>
          <option value="automation">{t("form.opt.automation")}</option>
          <option value="other">{t("form.opt.other")}</option>
        </select>
        <textarea
          name="message" placeholder={`${t("form.message")} *`} rows={1} value={form.message} onChange={handleChange} required
          className={`${inputClass} resize-none`}
        />
      </div>
      <div>
        <button
          type="submit"
          className="inline-flex items-center px-8 py-3 bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors"
        >
          {t("cta.request-quote")}
        </button>
      </div>
    </form>
  );
};

const Home = () => {
  const { t, lang } = useLang();

  const capKeys = [
    { titleKey: "home.build.cap1.title", descKey: "home.build.cap1.desc" },
    { titleKey: "home.build.cap2.title", descKey: "home.build.cap2.desc" },
    { titleKey: "home.build.cap3.title", descKey: "home.build.cap3.desc" },
    { titleKey: "home.build.cap4.title", descKey: "home.build.cap4.desc" },
  ];

  const workflowKeys = [
    { titleKey: "home.workflow.s1.title", descKey: "home.workflow.s1.desc" },
    { titleKey: "home.workflow.s2.title", descKey: "home.workflow.s2.desc" },
    { titleKey: "home.workflow.s3.title", descKey: "home.workflow.s3.desc" },
    { titleKey: "home.workflow.s4.title", descKey: "home.workflow.s4.desc" },
  ];

  const workflowDeliverables = [
    ["home.workflow.d1.1", "home.workflow.d1.2", "home.workflow.d1.3"],
    ["home.workflow.d2.1", "home.workflow.d2.2", "home.workflow.d2.3"],
    ["home.workflow.d3.1", "home.workflow.d3.2", "home.workflow.d3.3"],
    ["home.workflow.d4.1", "home.workflow.d4.2", "home.workflow.d4.3"],
  ];

  return (
    <div>
      {/* ═══════ HERO ═══════ */}
      <section className="section-border relative overflow-hidden">
        <div className="logo-motif absolute inset-0 pointer-events-none" />
        <div className="section-container py-24 md:py-36 relative z-10">
          <RevealSection>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold leading-[1.05] max-w-4xl">
              {t("home.hero.h1")}
            </h1>
            <p className="mt-6 text-lg md:text-xl text-muted-foreground max-w-2xl leading-relaxed">
              {t("home.hero.sub")}
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                to="/work"
                className="cta-button inline-flex items-center px-6 py-3 bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors"
              >
                {t("cta.view-work")}
              </Link>
              <Link
                to="/contact"
                className="cta-button inline-flex items-center px-6 py-3 border border-foreground text-sm font-medium hover:bg-foreground hover:text-background transition-colors"
              >
                {t("cta.request-quote")}
              </Link>
            </div>
          </RevealSection>
        </div>
      </section>

      {/* ═══════ SELECTED WORK ═══════ */}
      <section className="section-border">
        <div className="section-container py-12 md:py-16">
          <RevealSection>
            <div className="flex items-baseline justify-between mb-4">
              <h2 className="text-3xl md:text-4xl font-bold">{t("home.work.title")}</h2>
              <span className="text-xs text-muted-foreground tracking-wide uppercase hidden md:block">{t("home.work.label")}</span>
            </div>
            {lang === "zh" && t("home.work.intro") && (
              <p className="text-muted-foreground mb-2 max-w-2xl">{t("home.work.intro")}</p>
            )}
            {lang === "zh" && t("home.work.note") && (
              <p className="text-sm text-muted-foreground mb-6">{t("home.work.note")}</p>
            )}
          </RevealSection>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {featuredProjects.map((project, i) => (
              <RevealSection key={project.slug} delay={i * 100}>
                <ProjectCard
                  project={project}
                  imageImport={projectImages[project.slug]}
                  mode="live"
                />
              </RevealSection>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════ WHAT WE BUILD ═══════ */}
      <section className="section-border section-subtle-bg">
        <div className="section-container section-padding">
          <RevealSection>
            <h2 className="text-3xl md:text-4xl font-bold mb-8">{t("home.build.title")}</h2>
          </RevealSection>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-border">
            {capKeys.map((cap, i) => (
              <RevealSection key={i} delay={i * 80} className="flex">
                <div className="bg-background p-8 md:p-10 transition-colors duration-300 hover:bg-secondary flex flex-col w-full">
                  <h3 className="text-xl font-semibold mb-3">{t(cap.titleKey)}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{t(cap.descKey)}</p>
                </div>
              </RevealSection>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════ CASE STUDIES ═══════ */}
      <section className="section-border">
        <div className="section-container section-padding">
          <RevealSection>
            <div className="flex items-baseline justify-between mb-8">
              <h2 className="text-3xl md:text-4xl font-bold">{t("home.casestudies.title")}</h2>
              <span className="text-xs text-muted-foreground tracking-wide uppercase hidden md:block">{t("home.casestudies.label")}</span>
            </div>
          </RevealSection>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {caseStudyProjects.map((project, i) => (
              <RevealSection key={project.slug} delay={i * 100}>
                <Link
                  to={`/case-studies/${project.slug}`}
                  className="group card-border p-6 block transition-all duration-300 hover:border-primary hover:-translate-y-1"
                >
                  {projectImages[project.slug] && (
                    <div className="aspect-[16/9] overflow-hidden mb-4 border border-border">
                      <img
                        src={projectImages[project.slug]}
                        alt={project.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                        loading="lazy"
                      />
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

      {/* ═══════ INDUSTRIES ═══════ */}
      <section className="section-border section-subtle-bg relative overflow-hidden">
        <div className="logo-motif absolute inset-0 pointer-events-none" />
        <div className="section-container py-12 md:py-16 relative z-10">
          <RevealSection>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">{t("home.industries.title")}</h2>
            {lang === "zh" && t("home.industries.intro") && (
              <p className="text-muted-foreground mb-6 max-w-2xl">{t("home.industries.intro")}</p>
            )}
          </RevealSection>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-border">
            {industries.map((ind, i) => {
              const Icon = ind.icon;
              return (
                <RevealSection key={ind.key} delay={i * 60}>
                  <Link
                    to="/industries"
                    className="bg-background p-6 text-sm font-medium block transition-colors duration-300 hover:text-primary flex items-center gap-3"
                  >
                    <Icon size={20} strokeWidth={1.5} className="text-primary flex-shrink-0" />
                    {t(ind.key)}
                  </Link>
                </RevealSection>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══════ HOW WE WORK ═══════ */}
      <section className="section-border">
        <div className="section-container py-12 md:py-16">
          <RevealSection>
            <h2 className="text-3xl md:text-4xl font-bold mb-8">{t("home.workflow.title")}</h2>
          </RevealSection>

          {/* Desktop: horizontal with arrows */}
          <div className="hidden md:flex items-stretch justify-between">
            {workflowKeys.map((w, i) => (
              <div key={i} className="contents">
                <RevealSection delay={i * 150} className="flex-1 flex">
                  <div className="card-border p-6 transition-all duration-300 hover:border-primary hover:-translate-y-1 group flex flex-col w-full">
                    <span className="text-label mb-4 block">0{i + 1}</span>
                    <h3 className="text-lg font-semibold mb-2">{t(w.titleKey)}</h3>
                    <p className="text-sm text-muted-foreground mb-4 leading-relaxed">{t(w.descKey)}</p>
                    <div className="space-y-1 mt-auto">
                      {workflowDeliverables[i].map((dKey) => (
                        <p key={dKey} className="text-xs text-muted-foreground">— {t(dKey)}</p>
                      ))}
                    </div>
                  </div>
                </RevealSection>
                {i < workflowKeys.length - 1 && (
                  <div className="flex items-center self-center pt-8">
                    <FlowArrowRight />
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Mobile: vertical with arrows */}
          <div className="md:hidden space-y-0">
            {workflowKeys.map((w, i) => (
              <div key={i}>
                <RevealSection delay={i * 120}>
                  <div className="card-border p-6 transition-all duration-300 hover:border-primary">
                    <span className="text-label mb-4 block">0{i + 1}</span>
                    <h3 className="text-lg font-semibold mb-2">{t(w.titleKey)}</h3>
                    <p className="text-sm text-muted-foreground mb-4 leading-relaxed">{t(w.descKey)}</p>
                    <div className="space-y-1">
                      {workflowDeliverables[i].map((dKey) => (
                        <p key={dKey} className="text-xs text-muted-foreground">— {t(dKey)}</p>
                      ))}
                    </div>
                  </div>
                </RevealSection>
                {i < workflowKeys.length - 1 && <FlowArrowDown />}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════ TESTIMONIALS ═══════ */}
      <section className="section-border">
        <div className="section-container py-12 md:py-16">
          <RevealSection>
            <h2 className="text-3xl md:text-4xl font-bold mb-8">{t("home.testimonials.title")}</h2>
          </RevealSection>
          <TestimonialsCarousel />
        </div>
      </section>

      {/* ═══════ REQUEST A QUOTE ═══════ */}
      <section>
        <div className="section-container py-12 md:py-16">
          <RevealSection>
            <h2 className="text-3xl md:text-4xl font-bold mb-2">{t("home.quote.title")}</h2>
            <p className="text-muted-foreground mb-6">{t("home.quote.text")}</p>
            <InlineQuoteForm />
          </RevealSection>
        </div>
      </section>
    </div>
  );
};

export default Home;
