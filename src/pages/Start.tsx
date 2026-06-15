import { useState, useEffect, FormEvent } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { Check, X } from "lucide-react";

const Reveal = ({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) => {
  const ref = useScrollReveal<HTMLDivElement>({ delay });
  return <div ref={ref} className={className}>{children}</div>;
};

const inputClass =
  "w-full border border-border px-4 py-3 text-sm bg-background text-foreground rounded-lg focus:outline-none focus:border-primary transition-colors placeholder:text-muted-foreground";

const NEEDS = [
  "Website Design",
  "Branding / Logo",
  "Marketing / Social Media",
  "AI Automation",
  "Full Package",
];

const Start = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [needs, setNeeds] = useState<string[]>([]);

  useEffect(() => {
    const prevTitle = document.title;
    document.title = "Start Your Project | Bluluma Design";
    const meta = document.querySelector('meta[name="description"]');
    const prevDesc = meta?.getAttribute("content") ?? null;
    if (meta) {
      meta.setAttribute(
        "content",
        "Request a proposal for website design, branding, marketing, and automation services. Bluluma Design helps businesses build a stronger online presence."
      );
    }
    return () => {
      document.title = prevTitle;
      if (meta && prevDesc !== null) meta.setAttribute("content", prevDesc);
    };
  }, []);

  const toggleNeed = (n: string) =>
    setNeeds((prev) => (prev.includes(n) ? prev.filter((x) => x !== n) : [...prev, n]));

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      const fd = new FormData(e.currentTarget);
      fd.set("needs", needs.join(", "));
      const res = await fetch("https://formspree.io/f/xlgprnry", {
        method: "POST",
        body: fd,
        headers: { Accept: "application/json" },
      });
      if (res.ok) {
        navigate("/thank-you");
      } else {
        setError("Something went wrong. Please try again.");
        setSubmitting(false);
      }
    } catch {
      setError("Network error. Please try again.");
      setSubmitting(false);
    }
  };

  const scrollToForm = () => {
    const el = document.getElementById("proposal-form");
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div>
      {/* Hero (Dark) */}
      <section className="section-dark section-border relative overflow-hidden">
        <div className="logo-motif absolute inset-0 pointer-events-none" />
        <div className="section-container py-24 md:py-36 relative z-10">
          <Reveal>
            <p className="text-label mb-4">Start Your Project</p>
            <h1 className="text-4xl md:text-6xl font-extrabold leading-tight max-w-3xl">
              Tell Us About Your Project
            </h1>
            <p className="mt-6 text-lg max-w-2xl leading-relaxed" style={{ color: "hsl(220 10% 60%)" }}>
              Share a few details about your business and what you need. We'll review your request and prepare a tailored proposal for you.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Intro */}
      <section>
        <div className="section-container pt-20 md:pt-24 pb-4">
          <Reveal>
            <div className="max-w-3xl">
              <p className="text-base md:text-lg leading-relaxed text-muted-foreground">
                We work with businesses that want a stronger online presence — from branding and website design to marketing and automation.
              </p>
              <p className="mt-4 text-base md:text-lg leading-relaxed text-muted-foreground">
                This form helps us understand your needs so we can recommend the right approach.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Form */}
      <section id="proposal-form" className="scroll-mt-24">
        <div className="section-container py-16 md:py-20">
          <Reveal>
            <div className="max-w-3xl">
              <p className="text-label mb-3">Project Intake</p>
              <h2 className="text-2xl md:text-4xl font-extrabold mb-10">Project Details</h2>

              <form onSubmit={handleSubmit} className="space-y-8">
                <input type="hidden" name="source" value="bluluma start project" />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="name" className="text-sm font-medium block mb-2">Full Name *</label>
                    <input id="name" name="name" type="text" required maxLength={100} className={inputClass} />
                  </div>
                  <div>
                    <label htmlFor="email" className="text-sm font-medium block mb-2">Email Address *</label>
                    <input id="email" name="email" type="email" required maxLength={255} className={inputClass} />
                  </div>
                  <div>
                    <label htmlFor="business" className="text-sm font-medium block mb-2">Business Name</label>
                    <input id="business" name="business" type="text" maxLength={150} className={inputClass} />
                  </div>
                  <div>
                    <label htmlFor="website" className="text-sm font-medium block mb-2">Website (optional)</label>
                    <input id="website" name="website" type="text" maxLength={255} placeholder="https://" className={inputClass} />
                  </div>
                  <div>
                    <label htmlFor="industry" className="text-sm font-medium block mb-2">Industry</label>
                    <select id="industry" name="industry" className={inputClass} defaultValue="">
                      <option value="" disabled>Select industry</option>
                      <option value="Dental Clinic">Dental Clinic</option>
                      <option value="Real Estate">Real Estate</option>
                      <option value="Retail / E-commerce">Retail / E-commerce</option>
                      <option value="Professional Services">Professional Services</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="budget" className="text-sm font-medium block mb-2">Budget Range *</label>
                    <select id="budget" name="budget" required className={inputClass} defaultValue="">
                      <option value="" disabled>Select budget range</option>
                      <option value="Under $1,000">Under $1,000</option>
                      <option value="$1,000 – $3,000">$1,000 – $3,000</option>
                      <option value="$3,000 – $8,000">$3,000 – $8,000</option>
                      <option value="$8,000+">$8,000+</option>
                    </select>
                  </div>
                  <div className="md:col-span-2">
                    <label htmlFor="timeline" className="text-sm font-medium block mb-2">Timeline *</label>
                    <select id="timeline" name="timeline" required className={inputClass} defaultValue="">
                      <option value="" disabled>Select timeline</option>
                      <option value="ASAP">ASAP</option>
                      <option value="Within 2–4 weeks">Within 2–4 weeks</option>
                      <option value="Within 1–2 months">Within 1–2 months</option>
                      <option value="Flexible">Flexible</option>
                    </select>
                  </div>
                </div>

                <div>
                  <span className="text-sm font-medium block mb-3">What do you need?</span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {NEEDS.map((n) => {
                      const active = needs.includes(n);
                      return (
                        <button
                          type="button"
                          key={n}
                          onClick={() => toggleNeed(n)}
                          className={`flex items-center justify-between text-left px-4 py-3 rounded-lg border text-sm transition-all ${
                            active
                              ? "border-primary bg-primary/5 text-foreground"
                              : "border-border bg-background text-foreground hover:border-primary/50"
                          }`}
                          aria-pressed={active}
                        >
                          <span className="font-medium">{n}</span>
                          <span
                            className={`flex items-center justify-center w-5 h-5 rounded border ${
                              active ? "bg-primary border-primary text-primary-foreground" : "border-border"
                            }`}
                          >
                            {active && <Check size={12} strokeWidth={3} />}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div>
                  <label htmlFor="details" className="text-sm font-medium block mb-2">Project Details *</label>
                  <textarea
                    id="details"
                    name="details"
                    rows={6}
                    required
                    maxLength={2000}
                    className={`${inputClass} resize-none`}
                    placeholder="Tell us about your business, what you currently have, and what you're looking to improve."
                  />
                </div>

                {error && <p className="text-sm text-destructive">{error}</p>}

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={submitting}
                    className="inline-flex items-center px-8 py-4 cta-solid text-sm font-semibold rounded-lg disabled:opacity-50"
                  >
                    {submitting ? "Sending..." : "Request a Proposal"}
                  </button>
                  <p className="mt-4 text-xs text-muted-foreground">
                    Typical response within 1 business day.
                  </p>
                </div>
              </form>
            </div>
          </Reveal>
        </div>
      </section>

      {/* What Happens Next */}
      <section className="bg-secondary/40 border-t border-border">
        <div className="section-container section-padding">
          <Reveal>
            <p className="text-label mb-3">Process</p>
            <h2 className="text-2xl md:text-4xl font-extrabold mb-12 max-w-2xl">What Happens Next</h2>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {[
              { n: "01", title: "Review", desc: "We review your submission and understand your business needs." },
              { n: "02", title: "Proposal", desc: "We prepare a clear proposal with scope, timeline, and pricing." },
              { n: "03", title: "Project Start", desc: "Once approved, we begin your project with a structured process." },
            ].map((s, i) => (
              <Reveal key={s.n} delay={i * 100}>
                <div className="bg-background border border-border rounded-2xl p-8 h-full">
                  <span className="text-sm font-semibold text-primary tracking-wider">{s.n}</span>
                  <h3 className="mt-4 text-xl font-bold">{s.title}</h3>
                  <p className="mt-3 text-base text-muted-foreground leading-relaxed">{s.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Fit / Not Fit */}
      <section>
        <div className="section-container section-padding">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            <Reveal>
              <div className="border border-border rounded-2xl p-8 md:p-10 h-full">
                <p className="text-label mb-3">Best Fit</p>
                <h2 className="text-2xl md:text-3xl font-extrabold mb-8">Who This Is Best For</h2>
                <ul className="space-y-4">
                  {[
                    "Businesses that want a professional website",
                    "Companies looking to improve their branding",
                    "Clinics or agents who want more leads",
                    "Owners who want a clear, structured approach",
                    "Clients who are ready to invest in their business",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <span className="flex-shrink-0 mt-1 w-5 h-5 rounded-full bg-primary/10 text-primary flex items-center justify-center">
                        <Check size={12} strokeWidth={3} />
                      </span>
                      <span className="text-base leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>

            <Reveal delay={100}>
              <div className="border border-border rounded-2xl p-8 md:p-10 h-full bg-muted/30">
                <p className="text-label mb-3">Honest Note</p>
                <h2 className="text-2xl md:text-3xl font-extrabold mb-8">Not the Right Fit If</h2>
                <ul className="space-y-4">
                  {[
                    "You are only looking for the cheapest option",
                    "You need instant same-day delivery",
                    "You are not sure what you want yet",
                    "You are not ready to invest in your business",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <span className="flex-shrink-0 mt-1 w-5 h-5 rounded-full bg-muted text-muted-foreground flex items-center justify-center">
                        <X size={12} strokeWidth={3} />
                      </span>
                      <span className="text-base leading-relaxed text-muted-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="section-dark relative overflow-hidden">
        <div className="logo-motif absolute inset-0 pointer-events-none" />
        <div className="section-container py-20 md:py-28 relative z-10 text-center">
          <Reveal>
            <h2 className="text-3xl md:text-5xl font-extrabold max-w-3xl mx-auto leading-tight">
              Ready to Get Started?
            </h2>
            <p className="mt-6 text-lg max-w-2xl mx-auto leading-relaxed" style={{ color: "hsl(220 10% 60%)" }}>
              Tell us about your project and we'll prepare a proposal tailored to your business.
            </p>
            <div className="mt-10">
              <button
                type="button"
                onClick={scrollToForm}
                className="inline-flex items-center px-8 py-4 cta-solid text-sm font-semibold rounded-lg"
              >
                Request a Proposal
              </button>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
};

export default Start;
