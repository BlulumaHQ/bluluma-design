import { Link } from "react-router-dom";
import { useState } from "react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { getLatestByIndustry } from "@/lib/articles";
import {
  LayoutDashboard,
  Sparkles,
  PhoneCall,
  MapPin,
  ShieldCheck,
  Bot,
  Smartphone,
  Stethoscope,
} from "lucide-react";
import logo from "@/assets/bluluma-logo.svg";
import heroImg from "@/assets/dentist/hero.jpg";
import smilecraftImg from "@/assets/dentist/smilecraft.jpg";
import brightpathImg from "@/assets/dentist/brightpath.jpg";
import westsideImg from "@/assets/dentist/westside.jpg";
import puresmileImg from "@/assets/dentist/puresmile.jpg";
import citycoreImg from "@/assets/dentist/citycore.jpg";
import gentletouchImg from "@/assets/dentist/gentletouch.jpg";

const Reveal = ({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) => {
  const ref = useScrollReveal({ delay });
  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
};

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

/* ── Local minimal header for /dentist only ── */
const DentistHeader = () => {
  const [open, setOpen] = useState(false);
  const links = [
    { label: "Home", to: "#top" },
    { label: "Problem", to: "#problem" },
    { label: "What We Build", to: "#solution" },
    { label: "Examples", to: "#portfolio" },
    { label: "Insights", to: "#insights" },
    { label: "Contact", to: "#cta" },
  ];
  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-md border-b border-border">
      <div className="section-container flex items-center justify-between h-20">
        <a href="#top" className="flex-shrink-0 flex items-center gap-3">
          <img src={logo} alt="Sonykun Design logo" className="h-10 w-auto" />
          <span className="text-sm font-semibold text-muted-foreground hidden sm:inline">
            for Dental Clinics
          </span>
        </a>

        <nav className="hidden lg:flex items-center gap-7">
          {links.map((l) => (
            <a
              key={l.label}
              href={l.to}
              className="text-[14px] font-semibold text-foreground hover:text-primary transition-colors"
            >
              {l.label}
            </a>
          ))}
          <a
            href="/proposal"
            className="cta-solid px-5 py-2.5 text-sm font-semibold rounded-lg"
          >
            Request a Proposal
          </a>
          <Link
            to="/"
            className="text-xs text-muted-foreground hover:text-primary transition-colors"
          >
            Sonykun →
          </Link>
        </nav>

        <button
          className="lg:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          <span className={`block w-6 h-px bg-foreground transition-transform ${open ? "rotate-45 translate-y-[3.5px]" : ""}`} />
          <span className={`block w-6 h-px bg-foreground transition-opacity ${open ? "opacity-0" : ""}`} />
          <span className={`block w-6 h-px bg-foreground transition-transform ${open ? "-rotate-45 -translate-y-[3.5px]" : ""}`} />
        </button>
      </div>
      {open && (
        <nav className="lg:hidden border-t border-border bg-background">
          <div className="section-container py-6 flex flex-col gap-4">
            {links.map((l) => (
              <a
                key={l.label}
                href={l.to}
                onClick={() => setOpen(false)}
                className="text-base font-semibold text-foreground"
              >
                {l.label}
              </a>
            ))}
            <a
              href="/proposal"
              onClick={() => setOpen(false)}
              className="w-full text-center cta-solid px-6 py-3.5 text-base font-semibold rounded-lg"
            >
              Request a Proposal
            </a>
            <Link to="/" className="text-xs text-muted-foreground">
              Sonykun →
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
};

const DentistFooter = () => (
  <footer className="section-dark border-t border-border">
    <div
      className="section-container py-12 flex flex-col md:flex-row justify-between items-center gap-4 text-sm"
      style={{ color: "hsl(220 10% 55%)" }}
    >
      <span>© 2026 Bluluma. All rights reserved.</span>
      <span>
        Web Design by{" "}
        <Link to="/" className="hover:text-primary transition-colors">
          Bluluma
        </Link>
      </span>
    </div>
  </footer>
);

/* ── Page ── */
const Dentist = () => {
  const insights = getLatestByIndustry("Dentist", 3);

  const problems = [
    {
      title: "Outdated Website Structure",
      desc: "Many clinic websites are hard to navigate and don't clearly explain services, making it difficult for patients to take action.",
    },
    {
      title: "No Lead Capture System",
      desc: "Patients visit but leave without booking because there's no clear call-to-action or easy contact method.",
    },
    {
      title: "Front Desk Overload",
      desc: "Staff spend too much time answering repetitive questions instead of focusing on patients.",
    },
  ];

  const solution = [
    { icon: LayoutDashboard, label: "High-conversion dental website" },
    { icon: Stethoscope, label: "Clear service pages (cleaning, implants, Invisalign, etc.)" },
    { icon: Smartphone, label: "Mobile-friendly design" },
    { icon: PhoneCall, label: "Click-to-call and booking request" },
    { icon: MapPin, label: "Google Map + location clarity" },
    { icon: ShieldCheck, label: "Trust sections (reviews, certifications)" },
    { icon: Sparkles, label: "Basic branding setup if needed" },
    { icon: Bot, label: "AI-ready structure for future automation" },
  ];

  const portfolio = [
    {
      name: "SmileCraft Dental Clinic",
      tag: "Family Dental",
      desc: "Clean modern clinic, focus on family dentistry.",
      image: smilecraftImg,
    },
    {
      name: "BrightPath Dental Studio",
      tag: "Cosmetic",
      desc: "High-end aesthetic dental branding.",
      image: brightpathImg,
    },
    {
      name: "WestSide Dental Care",
      tag: "Community Clinic",
      desc: "Local community clinic feel.",
      image: westsideImg,
    },
    {
      name: "PureSmile Implant Centre",
      tag: "Implant Specialist",
      desc: "Implant-focused professional site.",
      image: puresmileImg,
    },
    {
      name: "CityCore Dental Group",
      tag: "Multi-Location",
      desc: "Multi-location clinic branding.",
      image: citycoreImg,
    },
    {
      name: "GentleTouch Family Dental",
      tag: "Patient-First",
      desc: "Friendly, patient-first design.",
      image: gentletouchImg,
    },
  ];

  return (
    <div id="top" className="flex flex-col min-h-screen">
      <DentistHeader />

      <main className="flex-1">
        {/* HERO (dark) */}
        <section className="section-dark section-border">
          <div className="section-container py-16 md:py-24 grid lg:grid-cols-2 gap-12 items-center">
            <Reveal>
              <span className="text-xs uppercase tracking-widest text-primary font-semibold">
                For Dental Clinics
              </span>
              <h1 className="mt-4 text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                Websites for Dental Clinics That Actually Bring in Patients
              </h1>
              <p
                className="mt-6 text-lg leading-relaxed"
                style={{ color: "hsl(220 10% 70%)" }}
              >
                We help dental clinics build professional websites, improve online visibility, and use AI tools to reduce front desk workload and increase patient inquiries.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <a
                  href="/proposal"
                  className="cta-solid inline-block text-center px-8 py-4 text-base font-semibold rounded-lg"
                >
                  Request a Proposal for My Clinic
                </a>
                <a
                  href="#portfolio"
                  className="inline-block text-center px-8 py-4 text-base font-semibold rounded-lg border border-border hover:border-primary hover:text-primary transition-colors"
                >
                  Start Your Project
                </a>
              </div>
              <p className="mt-6 text-sm" style={{ color: "hsl(220 10% 60%)" }}>
                Website design, branding, and AI automation support for dental clinics.
              </p>
            </Reveal>

            <Reveal delay={120}>
              <div className="rounded-xl overflow-hidden border border-border shadow-2xl shadow-primary/10">
                <img
                  src={heroImg}
                  alt="Modern bright dental clinic interior"
                  className="w-full h-auto block"
                  width={1600}
                  height={1024}
                />
              </div>
            </Reveal>
          </div>
        </section>

        {/* PROBLEM */}
        <section id="problem" className="section-border bg-background">
          <div className="section-container section-padding">
            <Reveal>
              <span className="text-xs uppercase tracking-widest text-primary font-semibold">
                The Problem
              </span>
              <h2 className="mt-3 text-3xl md:text-4xl font-bold max-w-3xl">
                Most Dental Websites Look Fine — But Don't Bring Patients
              </h2>
            </Reveal>

            <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-6">
              {problems.map((p, i) => (
                <Reveal key={p.title} delay={i * 80}>
                  <div className="h-full p-8 border border-border rounded-lg bg-background hover:border-primary/40 hover:-translate-y-1 transition-all">
                    <div className="text-primary text-sm font-bold tracking-widest">
                      0{i + 1}
                    </div>
                    <h3 className="mt-3 text-xl font-bold">{p.title}</h3>
                    <p className="mt-3 text-muted-foreground leading-relaxed text-base">
                      {p.desc}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* SOLUTION */}
        <section id="solution" className="section-border bg-background">
          <div className="section-container section-padding">
            <Reveal>
              <span className="text-xs uppercase tracking-widest text-primary font-semibold">
                What We Build
              </span>
              <h2 className="mt-3 text-3xl md:text-4xl font-bold max-w-2xl">
                What We Build for Dental Clinics
              </h2>
              <p className="mt-4 text-muted-foreground max-w-2xl leading-relaxed">
                A clear, conversion-focused website system designed around how patients actually choose a dentist.
              </p>
            </Reveal>

            <div className="mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {solution.map((s, i) => {
                const Icon = s.icon;
                return (
                  <Reveal key={s.label} delay={i * 60}>
                    <div className="h-full p-6 border border-border rounded-lg bg-background hover:border-primary/40 hover:-translate-y-1 transition-all">
                      <div className="w-11 h-11 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                        <Icon className="w-5 h-5 text-primary" />
                      </div>
                      <p className="text-sm font-semibold leading-snug">
                        {s.label}
                      </p>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </section>

        {/* PORTFOLIO */}
        <section id="portfolio" className="section-border bg-background">
          <div className="section-container section-padding">
            <Reveal>
              <span className="text-xs uppercase tracking-widest text-primary font-semibold">
                Examples
              </span>
              <h2 className="mt-3 text-3xl md:text-4xl font-bold max-w-2xl">
                Dental Website Examples
              </h2>
              <p className="mt-4 text-muted-foreground max-w-2xl leading-relaxed">
                Sample dental clinic website concepts — design direction, structure, and conversion approach.
              </p>
            </Reveal>

            <div className="mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {portfolio.map((p, i) => (
                <Reveal key={p.name} delay={i * 60}>
                  <div className="group border border-border rounded-lg overflow-hidden bg-background hover:border-primary/40 hover:shadow-lg hover:shadow-primary/10 hover:-translate-y-1 transition-all duration-300 h-full flex flex-col">
                    <div className="aspect-[4/3] bg-muted overflow-hidden">
                      <img
                        src={p.image}
                        alt={`${p.name} dental website mockup`}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                        loading="lazy"
                      />
                    </div>
                    <div className="p-6 flex flex-col flex-1">
                      <span className="inline-block w-fit text-[10px] uppercase tracking-widest text-primary font-semibold border border-primary/30 bg-primary/5 rounded px-2 py-1 mb-3">
                        {p.tag}
                      </span>
                      <h3 className="text-lg font-bold">{p.name}</h3>
                      <p className="mt-2 text-sm text-muted-foreground leading-relaxed flex-1">
                        {p.desc}
                      </p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>

            <p className="mt-8 text-xs text-muted-foreground">
              Mock portfolio examples for presentation purposes.
            </p>
          </div>
        </section>

        {/* INSIGHTS */}
        <section id="insights" className="section-border bg-background">
          <div className="section-container section-padding">
            <div className="flex items-end justify-between flex-wrap gap-4 mb-12">
              <Reveal>
                <span className="text-xs uppercase tracking-widest text-primary font-semibold">
                  Insights
                </span>
                <h2 className="mt-3 text-3xl md:text-4xl font-bold">
                  Insights for Dental Clinics
                </h2>
              </Reveal>
              <Link
                to="/insights/dentist"
                className="text-sm font-semibold text-primary hover:underline"
              >
                View More Dental Insights →
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {insights.map((a, i) => (
                <Reveal key={a.slug} delay={i * 80}>
                  <Link
                    to={`/insights/${a.slug}`}
                    className="block p-6 md:p-8 border border-border rounded-lg h-full bg-background hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10 transition-all hover:-translate-y-1"
                  >
                    <div className="text-[10px] uppercase tracking-widest text-muted-foreground font-medium mb-3">
                      {formatDate(a.date)}
                    </div>
                    <h3 className="text-lg font-bold mb-3">{a.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {a.excerpt}
                    </p>
                    <span className="mt-5 inline-block text-xs text-primary font-semibold">
                      Read More →
                    </span>
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* CTA (dark) */}
        <section id="cta" className="section-dark">
          <div className="section-container py-20 md:py-28 text-center">
            <Reveal>
              <h2 className="text-3xl md:text-5xl font-bold max-w-3xl mx-auto leading-tight">
                Ready to Improve Your Dental Clinic Website?
              </h2>
              <p
                className="mt-5 max-w-2xl mx-auto text-lg leading-relaxed"
                style={{ color: "hsl(220 10% 65%)" }}
              >
                We help dental clinics build better websites, improve online visibility, and prepare for AI-driven search and automation.
              </p>
              <Link
                to="/proposal"
                className="mt-10 inline-block cta-solid px-10 py-4 text-base font-semibold rounded-lg"
              >
                Request a Proposal for My Clinic
              </Link>
            </Reveal>
          </div>
        </section>
      </main>

      <DentistFooter />
    </div>
  );
};

export default Dentist;