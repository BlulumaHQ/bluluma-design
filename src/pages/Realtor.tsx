import { Link } from "react-router-dom";
import { useState } from "react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { getLatestByIndustry } from "@/lib/articles";
import { LayoutDashboard, Building2, FileText } from "lucide-react";
import logo from "@/assets/bluluma-logo.svg";
import heroImg from "@/assets/realtor/hero-mockup.jpg";
import sterlingImg from "@/assets/realtor/sterling-wong.jpg";
import tiffanyImg from "@/assets/realtor/tiffany-tseng.jpg";
import ericImg from "@/assets/realtor/eric-kim.jpg";
import preSaleImg from "@/assets/realtor/pre-sale.jpg";
import helenImg from "@/assets/projects/helen-lam-real-estate.jpg";
import luxuryImg from "@/assets/projects/concept-luxury-realtor.jpg";

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

/* ── Local minimal header for /realtor only ── */
const RealtorHeader = () => {
  const [open, setOpen] = useState(false);
  const links = [
    { label: "Home", to: "#top" },
    { label: "What We Do", to: "#what-we-do" },
    { label: "Listings", to: "#listings" },
    { label: "Portfolio", to: "#portfolio" },
    { label: "Insights", to: "#insights" },
    { label: "Pricing", to: "#pricing" },
    { label: "Contact", to: "#cta" },
  ];
  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-md border-b border-border">
      <div className="section-container flex items-center justify-between h-20">
        <a href="#top" className="flex-shrink-0 flex items-center gap-3">
          <img src={logo} alt="Bluluma logo" className="h-10 w-auto" />
          <span className="text-sm font-semibold text-muted-foreground hidden sm:inline">
            for Realtors
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
            href="#cta"
            className="cta-solid px-5 py-2.5 text-sm font-semibold rounded-lg"
          >
            Get My 2 Free Previews
          </a>
          <Link
            to="/"
            className="text-xs text-muted-foreground hover:text-primary transition-colors"
          >
            Bluluma →
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
              href="#cta"
              onClick={() => setOpen(false)}
              className="w-full text-center cta-solid px-6 py-3.5 text-base font-semibold rounded-lg"
            >
              Get My 2 Free Previews
            </a>
            <Link to="/" className="text-xs text-muted-foreground">
              Bluluma →
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
};

const RealtorFooter = () => (
  <footer className="section-dark border-t border-border">
    <div className="section-container py-12 flex flex-col md:flex-row justify-between items-center gap-4 text-sm" style={{ color: "hsl(220 10% 55%)" }}>
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
const Realtor = () => {
  const insights = getLatestByIndustry("Realtor", 3);

  const services = [
    {
      icon: LayoutDashboard,
      title: "Conversion Website Design",
      desc: "A modern website structure designed to guide visitors toward booking, inquiries, and property interest.",
    },
    {
      icon: Building2,
      title: "Feature Listing Pages",
      desc: "Highlight your best properties with custom-designed listing pages, stronger descriptions, image galleries, and clear calls-to-action.",
      highlight: true,
    },
    {
      icon: FileText,
      title: "Listing Content Support",
      desc: "We can help manually manage and update featured listings on your website, so your best properties stay professionally presented.",
    },
  ];

  const portfolio = [
    {
      name: "Sterling Wong",
      desc: "Personal real estate branding with a premium, trust-focused website presence.",
      image: sterlingImg,
      url: "https://sterling-wong-concept-a.lovable.app/",
    },
    {
      name: "Tiffany Tseng",
      desc: "Clean Realtor website structure designed for stronger positioning and lead clarity.",
      image: tiffanyImg,
      url: "https://tiffany-tseng-concept-a.lovable.app/",
    },
    {
      name: "Helen Lam",
      desc: "Modern Realtor presentation with improved service flow and mobile-first layout.",
      image: helenImg,
      url: "https://helenlam-concept-a.lovable.app/",
    },
    {
      name: "Eric Kim Realty",
      desc: "Real estate website concept focused on stronger branding and clearer buyer/seller actions.",
      image: ericImg,
      url: "https://eric-kim-realty-concept-a.lovable.app/",
    },
    {
      name: "Luxury Realtor Website",
      desc: "Luxury-focused layout for high-end property presentation and personal branding.",
      image: luxuryImg,
    },
    {
      name: "Pre-Sale Project Website",
      desc: "Project-focused real estate website structure for development and pre-sale marketing.",
      image: preSaleImg,
    },
  ];

  const steps = [
    { n: "01", title: "Submit", desc: "Tell us about your business and current website." },
    { n: "02", title: "Receive 2 Previews", desc: "We design two redesigned previews — before you pay." },
    { n: "03", title: "Choose Your Direction", desc: "Pick the version that fits your brand and goals." },
    { n: "04", title: "Launch", desc: "We finalize, integrate listings, and launch." },
  ];

  const pricing = [
    {
      name: "Basic Realtor Website",
      price: "$499",
      desc: "A clean, mobile-friendly Realtor website ready to launch fast.",
      features: [
        "Up to 5 pages",
        "Mobile-friendly design",
        "Contact form",
        "Basic SEO structure",
        "Featured listing section",
        "Free hosting available",
      ],
      cta: "Start with Basic",
    },
    {
      name: "Business Realtor Website",
      price: "$875",
      desc: "A stronger conversion-focused website built for active Realtors.",
      features: [
        "Up to 8 pages",
        "Stronger conversion layout",
        "Feature listing pages",
        "Lead-focused CTA structure",
        "Google Map / service area",
        "Basic SEO setup",
        "Free hosting available",
      ],
      cta: "Start with Business",
      featured: true,
    },
    {
      name: "Premium Realtor Website",
      price: "$1,499+",
      desc: "A fully custom system with advanced layouts and ongoing listing support.",
      features: [
        "Up to 12 pages",
        "Advanced custom layout",
        "Feature listing system",
        "Listing content support",
        "Branding refinement",
        "SEO-friendly page structure",
        "Optional MLS / IDX integration as add-on",
      ],
      cta: "Start with Premium",
    },
  ];

  return (
    <div id="top" className="flex flex-col min-h-screen">
      <RealtorHeader />

      <main className="flex-1">
        {/* HERO (dark) */}
        <section className="section-dark section-border">
          <div className="section-container py-16 md:py-24 grid lg:grid-cols-2 gap-12 items-center">
            <Reveal>
              <span className="text-xs uppercase tracking-widest text-primary font-semibold">
                For Realtors
              </span>
              <h1 className="mt-4 text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                Real Estate Websites Built to Attract More Buyers and Sellers
              </h1>
              <p className="mt-6 text-lg leading-relaxed" style={{ color: "hsl(220 10% 70%)" }}>
                Bluluma creates conversion-focused Realtor websites with stronger branding, better listing presentation, and clearer lead flow.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <a
                  href="#cta"
                  className="cta-solid inline-block text-center px-8 py-4 text-base font-semibold rounded-lg"
                >
                  Get My 2 Free Previews
                </a>
                <a
                  href="#what-we-do"
                  className="inline-block text-center px-8 py-4 text-base font-semibold rounded-lg border border-border hover:border-primary hover:text-primary transition-colors"
                >
                  See How It Works
                </a>
              </div>
              <p className="mt-6 text-sm" style={{ color: "hsl(220 10% 60%)" }}>
                Website design, branding, listing presentation, and ongoing content support for Realtors.
              </p>
            </Reveal>

            <Reveal delay={120}>
              <div className="rounded-xl overflow-hidden border border-border shadow-2xl shadow-primary/10">
                <img
                  src={heroImg}
                  alt="Premium Realtor website displayed on laptop and mobile"
                  className="w-full h-auto block"
                  width={1600}
                  height={1024}
                />
              </div>
            </Reveal>
          </div>
        </section>

        {/* WHAT WE DO */}
        <section id="what-we-do" className="section-border bg-background">
          <div className="section-container section-padding">
            <Reveal>
              <span className="text-xs uppercase tracking-widest text-primary font-semibold">
                What We Do
              </span>
              <h2 className="mt-3 text-3xl md:text-4xl font-bold max-w-2xl">
                Three pieces. One conversion system.
              </h2>
            </Reveal>

            <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-6">
              {services.map((s, i) => {
                const Icon = s.icon;
                return (
                  <Reveal key={s.title} delay={i * 80}>
                    <div
                      className={`h-full p-8 border rounded-lg transition-all hover:-translate-y-1 ${
                        s.highlight
                          ? "border-primary bg-primary/5 shadow-lg shadow-primary/10"
                          : "border-border bg-background hover:border-primary/40"
                      }`}
                    >
                      <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-5">
                        <Icon className="w-6 h-6 text-primary" />
                      </div>
                      {s.highlight && (
                        <span className="inline-block text-[10px] uppercase tracking-widest font-semibold text-primary mb-2">
                          Main Focus
                        </span>
                      )}
                      <h3 className="text-xl font-bold mb-3">{s.title}</h3>
                      <p className="text-muted-foreground leading-relaxed text-base">
                        {s.desc}
                      </p>
                    </div>
                  </Reveal>
                );
              })}
            </div>

            <p className="mt-10 text-sm text-muted-foreground max-w-2xl">
              MLS / IDX integration can be added later as an optional advanced setup.
            </p>
          </div>
        </section>

        {/* LISTINGS */}
        <section id="listings" className="section-border bg-background">
          <div className="section-container section-padding grid md:grid-cols-2 gap-12 items-center">
            <Reveal>
              <span className="text-xs uppercase tracking-widest text-primary font-semibold">
                Feature Listings
              </span>
              <h2 className="mt-3 text-3xl md:text-4xl font-bold">
                Listings designed to sell, not just to display.
              </h2>
              <p className="mt-5 text-muted-foreground leading-relaxed">
                Standard MLS pages all look the same. Our Feature Listings approach turns each property into a high-conversion landing page — strong headline, curated photography, lifestyle copywriting, and a clear next step for buyers.
              </p>
              <ul className="mt-6 space-y-3 text-muted-foreground">
                <li>• Strong, headline-driven property pages</li>
                <li>• Curated photo galleries</li>
                <li>• Lifestyle-focused descriptions</li>
                <li>• Clear, single call-to-action per listing</li>
              </ul>
            </Reveal>
            <Reveal delay={120}>
              <div className="rounded-xl overflow-hidden border border-border shadow-lg">
                <img
                  src={luxuryImg}
                  alt="Sample feature listing page mockup"
                  className="w-full h-auto block"
                  loading="lazy"
                />
              </div>
            </Reveal>
          </div>
        </section>

        {/* PORTFOLIO */}
        <section id="portfolio" className="section-border bg-background">
          <div className="section-container section-padding">
            <Reveal>
              <span className="text-xs uppercase tracking-widest text-primary font-semibold">
                Portfolio
              </span>
              <h2 className="mt-3 text-3xl md:text-4xl font-bold max-w-2xl">
                Selected Real Estate Projects
              </h2>
              <p className="mt-4 text-muted-foreground max-w-2xl leading-relaxed">
                A look at recent and concept Realtor websites — branding, structure, and conversion design.
              </p>
            </Reveal>

            <div className="mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {portfolio.map((p, i) => (
                <Reveal key={p.name} delay={i * 60}>
                  <div className="group border border-border rounded-lg overflow-hidden bg-background hover:border-primary/40 hover:shadow-lg hover:shadow-primary/10 hover:-translate-y-1 transition-all duration-300 h-full flex flex-col">
                    <div className="aspect-[4/3] bg-muted overflow-hidden">
                      <img
                        src={p.image}
                        alt={`${p.name} real estate website preview`}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                        loading="lazy"
                      />
                    </div>
                    <div className="p-6 flex flex-col flex-1">
                      <h3 className="text-lg font-bold">{p.name}</h3>
                      <p className="mt-2 text-sm text-muted-foreground leading-relaxed flex-1">
                        {p.desc}
                      </p>
                      {p.url ? (
                        <a
                          href={p.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-5 inline-flex items-center justify-center px-4 py-2.5 text-xs font-semibold rounded-lg border border-border hover:border-primary hover:text-primary transition-colors w-fit"
                        >
                          View Project →
                        </a>
                      ) : (
                        <span className="mt-5 inline-flex items-center px-4 py-2.5 text-xs font-semibold rounded-lg border border-dashed border-border text-muted-foreground w-fit">
                          Concept Sample
                        </span>
                      )}
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* PROCESS */}
        <section className="section-border bg-background">
          <div className="section-container section-padding">
            <Reveal>
              <span className="text-xs uppercase tracking-widest text-primary font-semibold">
                Process
              </span>
              <h2 className="mt-3 text-3xl md:text-4xl font-bold max-w-2xl">
                Submit → 2 previews → choose → launch.
              </h2>
            </Reveal>
            <div className="mt-14 grid grid-cols-1 md:grid-cols-4 gap-6">
              {steps.map((s, i) => (
                <Reveal key={s.n} delay={i * 80}>
                  <div className="p-6 border border-border rounded-lg h-full bg-background">
                    <div className="text-primary text-sm font-bold tracking-widest">
                      {s.n}
                    </div>
                    <h3 className="mt-3 text-lg font-bold">{s.title}</h3>
                    <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                      {s.desc}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* PRICING */}
        <section id="pricing" className="section-border bg-background">
          <div className="section-container section-padding">
            <Reveal>
              <span className="text-xs uppercase tracking-widest text-primary font-semibold">
                Pricing
              </span>
              <h2 className="mt-3 text-3xl md:text-4xl font-bold max-w-2xl">
                Simple, accessible Realtor pricing.
              </h2>
            </Reveal>
            <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-6">
              {pricing.map((p, i) => (
                <Reveal key={p.name} delay={i * 100}>
                  <div
                    className={`p-8 border rounded-lg h-full flex flex-col ${
                      p.featured
                        ? "border-primary bg-primary/5 shadow-lg shadow-primary/10"
                        : "border-border bg-background"
                    }`}
                  >
                    <div className="text-xs uppercase tracking-widest text-primary font-semibold">
                      {p.name}
                    </div>
                    <div className="mt-3 text-4xl font-bold">{p.price}</div>
                    <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                      {p.desc}
                    </p>
                    <ul className="mt-6 space-y-2.5 text-sm text-muted-foreground flex-1">
                      {p.features.map((f) => (
                        <li key={f} className="flex gap-2">
                          <span className="text-primary">•</span>
                          <span>{f}</span>
                        </li>
                      ))}
                    </ul>
                    <a
                      href="#cta"
                      className={`mt-8 inline-block text-center px-6 py-3.5 text-sm font-semibold rounded-lg ${
                        p.featured
                          ? "cta-solid"
                          : "border border-border hover:border-primary hover:text-primary transition-colors"
                      }`}
                    >
                      {p.cta}
                    </a>
                  </div>
                </Reveal>
              ))}
            </div>
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
                  Insights for Realtors
                </h2>
              </Reveal>
              <Link
                to="/insights/realtor"
                className="text-sm font-semibold text-primary hover:underline"
              >
                View More Realtor Insights →
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
                See your new real estate website before you pay.
              </h2>
              <p
                className="mt-5 max-w-xl mx-auto text-lg leading-relaxed"
                style={{ color: "hsl(220 10% 65%)" }}
              >
                Two redesigned previews. Zero risk. Pick the one that fits.
              </p>
              <Link
                to="/contact"
                className="mt-10 inline-block cta-solid px-10 py-4 text-base font-semibold rounded-lg"
              >
                Get My 2 Free Previews
              </Link>
            </Reveal>
          </div>
        </section>
      </main>

      <RealtorFooter />
    </div>
  );
};

export default Realtor;