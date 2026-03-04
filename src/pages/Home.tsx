import { Link } from "react-router-dom";
import ProjectCard from "@/components/ProjectCard";
import { projects } from "@/lib/projects";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import friendlyDental from "@/assets/projects/friendly-dental.jpg";
import liveAtHeadwater from "@/assets/projects/live-at-headwater.jpg";
import btnRealEstate from "@/assets/projects/btn-real-estate.jpg";
import nueranutra from "@/assets/projects/nuera-nutra.jpg";

const projectImages: Record<string, string> = {
  "friendly-dental": friendlyDental,
  "live-at-headwater": liveAtHeadwater,
  "btn-real-estate": btnRealEstate,
  "nuera-nutra": nueranutra,
};

const featuredProjects = projects.filter((p) => p.featured);
const caseStudyProjects = projects.filter((p) => p.caseStudy);

const capabilities = [
  { title: "Digital Platforms", desc: "Modern websites and scalable digital platforms designed for performance and growth." },
  { title: "Brand Systems", desc: "Strategic identity systems that create consistent and recognizable brands." },
  { title: "Ecommerce Experiences", desc: "Online stores designed to maximize product presentation and conversion." },
  { title: "AI Business Automation", desc: "Automation tools and intelligent workflows that improve operational efficiency." },
];

const workflow = [
  {
    step: "Strategy",
    desc: "Understanding the business, audience, and project goals before design begins.",
    deliverables: ["Project brief", "Site structure", "Design direction"],
  },
  {
    step: "Design",
    desc: "Creating the brand system and visual layout that defines the digital experience.",
    deliverables: ["Brand visuals", "Website layout", "UI design"],
  },
  {
    step: "Build",
    desc: "Developing the website and preparing all assets for launch.",
    deliverables: ["Website development", "Responsive layout", "Performance optimization"],
  },
  {
    step: "Launch",
    desc: "Publishing the website and ensuring everything runs smoothly.",
    deliverables: ["Deployment", "Testing", "Final delivery"],
  },
];

const testimonials = [
  {
    quote: "Bluluma transformed our online presence completely. The new website and brand identity have brought us more patient inquiries than we ever expected.",
    name: "TBD",
    company: "TBD",
    projectType: "Brand + Website",
  },
  {
    quote: "Working with Bluluma was seamless from start to finish. They understood our vision and delivered a platform that truly represents our development.",
    name: "TBD",
    company: "TBD",
    projectType: "Brand + Website",
  },
  {
    quote: "The attention to detail and strategic thinking behind every design decision made all the difference. Our new site performs beyond expectations.",
    name: "TBD",
    company: "TBD",
    projectType: "Website Platform",
  },
  {
    quote: "Bluluma delivered a brand system and website that elevated our entire business. The clarity and professionalism speak for themselves.",
    name: "TBD",
    company: "TBD",
    projectType: "Brand + Website",
  },
];

const industries = [
  "Healthcare & Dental", "Professional Services", "Real Estate & Construction",
  "Lifestyle Businesses", "Creative & Luxury Brands", "Home Services",
  "Retail & Ecommerce", "Education & Training",
];

/* ────────────────────── Scroll-reveal wrapper ────────────────────── */
const RevealSection = ({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) => {
  const ref = useScrollReveal<HTMLDivElement>({ delay });
  return <div ref={ref} className={className}>{children}</div>;
};

/* ────────────────────── Arrow SVG ────────────────────── */
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

const Home = () => (
  <div>
    {/* ═══════ HERO ═══════ */}
    <section className="section-border relative overflow-hidden">
      <div className="logo-motif absolute inset-0 pointer-events-none" />
      <div className="section-container py-24 md:py-36 relative z-10">
        <RevealSection>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold leading-[1.05] max-w-4xl">
            Design Systems for Modern Businesses
          </h1>
          <p className="mt-6 text-lg md:text-xl text-muted-foreground max-w-2xl leading-relaxed">
            We design and build high-performance websites, brand platforms, and digital experiences that help businesses grow faster.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              to="/work"
              className="cta-button inline-flex items-center px-6 py-3 bg-primary text-primary-foreground text-sm font-medium hover:bg-primary-dark transition-colors"
            >
              View Our Work
            </Link>
            <Link
              to="/contact"
              className="cta-button inline-flex items-center px-6 py-3 border border-foreground text-sm font-medium hover:bg-foreground hover:text-background transition-colors"
            >
              Start a Project
            </Link>
          </div>
        </RevealSection>
      </div>
    </section>

    {/* ═══════ SELECTED WORK (Live Sites) ═══════ */}
    <section className="section-border">
      <div className="section-container section-padding">
        <RevealSection>
          <div className="flex items-baseline justify-between mb-12">
            <h2 className="text-3xl md:text-4xl font-bold">Selected Work</h2>
            <span className="text-xs text-muted-foreground tracking-wide uppercase hidden md:block">Live Sites</span>
          </div>
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
          <h2 className="text-3xl md:text-4xl font-bold mb-12">What We Build</h2>
        </RevealSection>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-border">
          {capabilities.map((cap, i) => (
            <RevealSection key={cap.title} delay={i * 80}>
              <div className="bg-background p-8 md:p-10 transition-colors duration-300 hover:bg-secondary">
                <h3 className="text-xl font-semibold mb-3">{cap.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{cap.desc}</p>
              </div>
            </RevealSection>
          ))}
        </div>
      </div>
    </section>

    {/* ═══════ CASE STUDIES (Behind the Work) ═══════ */}
    <section className="section-border">
      <div className="section-container section-padding">
        <RevealSection>
          <div className="flex items-baseline justify-between mb-12">
            <h2 className="text-3xl md:text-4xl font-bold">Case Studies</h2>
            <span className="text-xs text-muted-foreground tracking-wide uppercase hidden md:block">Behind the Work</span>
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
                <span className="text-sm font-medium text-primary">Read Case Study →</span>
              </Link>
            </RevealSection>
          ))}
        </div>
      </div>
    </section>

    {/* ═══════ INDUSTRIES ═══════ */}
    <section className="section-border section-subtle-bg relative overflow-hidden">
      <div className="logo-motif absolute inset-0 pointer-events-none" />
      <div className="section-container section-padding relative z-10">
        <RevealSection>
          <h2 className="text-3xl md:text-4xl font-bold mb-12">Industries We Work With</h2>
        </RevealSection>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-border">
          {industries.map((ind, i) => (
            <RevealSection key={ind} delay={i * 60}>
              <Link
                to="/industries"
                className="bg-background p-6 text-sm font-medium block transition-colors duration-300 hover:text-primary"
              >
                {ind}
              </Link>
            </RevealSection>
          ))}
        </div>
      </div>
    </section>

    {/* ═══════ HOW WE WORK ═══════ */}
    <section className="section-border">
      <div className="section-container section-padding">
        <RevealSection>
          <h2 className="text-3xl md:text-4xl font-bold mb-12">How We Work</h2>
        </RevealSection>

        {/* Desktop: horizontal with arrows */}
        <div className="hidden md:flex items-stretch justify-between">
          {workflow.map((w, i) => (
            <div key={w.step} className="contents">
              <RevealSection delay={i * 150} className="flex-1 flex">
                <div className="card-border p-6 transition-all duration-300 hover:border-primary hover:-translate-y-1 group flex flex-col w-full">
                  <span className="text-label mb-4 block">0{i + 1}</span>
                  <h3 className="text-lg font-semibold mb-2">{w.step}</h3>
                  <p className="text-sm text-muted-foreground mb-4 leading-relaxed">{w.desc}</p>
                  <div className="space-y-1 mt-auto">
                    {w.deliverables.map((d) => (
                      <p key={d} className="text-xs text-muted-foreground">— {d}</p>
                    ))}
                  </div>
                </div>
              </RevealSection>
              {i < workflow.length - 1 && (
                <div className="flex items-center self-center pt-8">
                  <FlowArrowRight />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Mobile: vertical with arrows */}
        <div className="md:hidden space-y-0">
          {workflow.map((w, i) => (
            <div key={w.step}>
              <RevealSection delay={i * 120}>
                <div className="card-border p-6 transition-all duration-300 hover:border-primary">
                  <span className="text-label mb-4 block">0{i + 1}</span>
                  <h3 className="text-lg font-semibold mb-2">{w.step}</h3>
                  <p className="text-sm text-muted-foreground mb-4 leading-relaxed">{w.desc}</p>
                  <div className="space-y-1">
                    {w.deliverables.map((d) => (
                      <p key={d} className="text-xs text-muted-foreground">— {d}</p>
                    ))}
                  </div>
                </div>
              </RevealSection>
              {i < workflow.length - 1 && <FlowArrowDown />}
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* ═══════ ABOUT BLULUMA ═══════ */}
    <section className="section-border section-subtle-bg">
      <div className="section-container section-padding">
        <RevealSection>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">About Bluluma</h2>
          <div className="max-w-2xl space-y-4 text-muted-foreground leading-relaxed">
            <p>Bluluma Design is a Vancouver-based digital design studio focused on building modern websites, brand systems, and digital platforms for growing businesses.</p>
            <p>Our work combines design thinking, technology, and strategy to create digital experiences that support long-term growth.</p>
          </div>
        </RevealSection>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-px bg-border border border-border">
          <RevealSection delay={0}>
            <div className="bg-background p-8">
              <h3 className="text-sm font-semibold uppercase tracking-widest text-primary mb-4">Vision</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                To build digital brand systems and websites that help businesses grow with clarity and long-term scalability.
              </p>
            </div>
          </RevealSection>
          <RevealSection delay={100}>
            <div className="bg-background p-8">
              <h3 className="text-sm font-semibold uppercase tracking-widest text-primary mb-4">Mission</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                To combine strategic design thinking, modern web technologies, and efficient production workflows to deliver professional digital platforms.
              </p>
            </div>
          </RevealSection>
          <RevealSection delay={200}>
            <div className="bg-background p-8">
              <h3 className="text-sm font-semibold uppercase tracking-widest text-primary mb-4">Values</h3>
              <ul className="text-sm text-muted-foreground leading-relaxed space-y-1">
                <li>Clarity over noise</li>
                <li>Systems thinking</li>
                <li>Craft and speed</li>
                <li>Evidence-led decisions</li>
                <li>Long-term maintainability</li>
              </ul>
            </div>
          </RevealSection>
        </div>
      </div>
    </section>

    {/* ═══════ TESTIMONIALS ═══════ */}
    <section className="section-border">
      <div className="section-container section-padding">
        <RevealSection>
          <h2 className="text-3xl md:text-4xl font-bold mb-12">What Clients Say</h2>
        </RevealSection>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonials.map((t, i) => (
            <RevealSection key={i} delay={i * 100}>
              <div className="card-border p-8 transition-all duration-300 hover:border-primary hover:-translate-y-1">
                <blockquote className="text-foreground leading-relaxed mb-6">
                  "{t.quote}"
                </blockquote>
                <div className="border-t border-border pt-4 flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold">{t.name}</p>
                    <p className="text-xs text-muted-foreground">{t.company}</p>
                  </div>
                  <span className="text-xs text-muted-foreground border border-border px-2 py-1">
                    {t.projectType}
                  </span>
                </div>
              </div>
            </RevealSection>
          ))}
        </div>
      </div>
    </section>

    {/* ═══════ CONTACT CTA ═══════ */}
    <section>
      <div className="section-container section-padding text-center">
        <RevealSection>
          <h2 className="text-3xl md:text-5xl font-bold mb-4">Start Your Project</h2>
          <p className="text-muted-foreground mb-8 max-w-lg mx-auto">
            Tell us about your business and the digital platform you want to build.
          </p>
          <Link
            to="/contact"
            className="cta-button inline-flex items-center px-8 py-3 bg-primary text-primary-foreground text-sm font-medium hover:bg-primary-dark transition-colors"
          >
            Contact Us
          </Link>
        </RevealSection>
      </div>
    </section>
  </div>
);

export default Home;
