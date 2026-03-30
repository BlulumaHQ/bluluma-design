import { useLang } from "@/lib/i18n";
import { useState, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const RevealSection = ({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) => {
  const ref = useScrollReveal<HTMLDivElement>({ delay });
  return <div ref={ref} className={className}>{children}</div>;
};

const Contact = () => {
  const { t } = useLang();
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const inputClass = "w-full border border-border px-4 py-3 text-sm bg-card text-foreground focus:outline-none focus:border-primary transition-colors placeholder:text-muted-foreground";

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      const res = await fetch("https://formspree.io/f/xlgprnry", {
        method: "POST",
        body: new FormData(e.currentTarget),
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

  return (
    <div>
      {/* Hero */}
      <section className="section-border relative overflow-hidden">
        <div className="logo-motif absolute inset-0 pointer-events-none" />
        <div className="section-container py-24 md:py-36 relative z-10">
          <RevealSection>
            <p className="text-label mb-4">{t("contact.label")}</p>
            <h1 className="text-4xl md:text-6xl font-extrabold leading-tight max-w-3xl">
              {t("contact.hero.title")}
            </h1>
            <p className="mt-6 text-lg text-muted-foreground max-w-2xl leading-relaxed">
              {t("contact.hero.sub")}
            </p>
          </RevealSection>
        </div>
      </section>

      {/* Form */}
      <section>
        <div className="section-container section-padding">
          <RevealSection>
            <form onSubmit={handleSubmit} className="space-y-6 max-w-3xl">
              <input type="hidden" name="source" value="bluluma contact form" />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="text-sm font-medium block mb-2">Name *</label>
                  <input type="text" id="name" name="name" required className={inputClass} />
                </div>
                <div>
                  <label htmlFor="email" className="text-sm font-medium block mb-2">Email *</label>
                  <input type="email" id="email" name="email" required className={inputClass} />
                </div>
                <div>
                  <label htmlFor="current_url" className="text-sm font-medium block mb-2">Website URL</label>
                  <input type="text" id="current_url" name="current_url" className={inputClass} />
                </div>
                <div>
                  <label htmlFor="budget" className="text-sm font-medium block mb-2">Budget Range</label>
                  <select id="budget" name="budget" className={inputClass}>
                    <option value="">Select budget range</option>
                    <option value="$1,500 - $3,000">$1,500 – $3,000</option>
                    <option value="$3,000 - $5,000">$3,000 – $5,000</option>
                    <option value="$5,000 - $10,000">$5,000 – $10,000</option>
                    <option value="$10,000+">$10,000+</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="timeline" className="text-sm font-medium block mb-2">Timeline</label>
                  <select id="timeline" name="timeline" className={inputClass}>
                    <option value="">Select timeline</option>
                    <option value="ASAP">ASAP</option>
                    <option value="1-2 months">1–2 months</option>
                    <option value="3-6 months">3–6 months</option>
                    <option value="Flexible">Flexible</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="project_type" className="text-sm font-medium block mb-2">Project Type *</label>
                  <select id="project_type" name="project_type" required className={inputClass}>
                    <option value="">Select project type</option>
                    <option value="Conversion Website System">Conversion Website System</option>
                    <option value="AI Automation System">AI Automation System</option>
                    <option value="Brand Identity System">Brand Identity System</option>
                    <option value="Ecommerce Platform">Ecommerce Platform</option>
                    <option value="Other / Not Sure Yet">Other / Not Sure Yet</option>
                  </select>
                </div>
              </div>
              <div>
                <label htmlFor="message" className="text-sm font-medium block mb-2">Project Details *</label>
                <textarea
                  id="message" name="message" rows={5} required
                  className={`${inputClass} resize-none`}
                  placeholder="Tell us about your project, goals, and what you're looking to achieve."
                />
              </div>
              {error && <p className="text-sm text-destructive">{error}</p>}
              <button
                type="submit"
                disabled={submitting}
                className="inline-flex items-center px-8 py-4 bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary-dark transition-colors disabled:opacity-50"
              >
                {submitting ? "Sending..." : t("cta.get-strategy")}
              </button>
            </form>
          </RevealSection>

          <RevealSection delay={200}>
            <div className="mt-16 pt-16 border-t border-border max-w-3xl">
              <p className="text-muted-foreground">
                {t("contact.response")}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
                <div>
                  <h3 className="text-label mb-2">Email</h3>
                  <p className="font-medium">support@bluluma.com</p>
                </div>
                <div>
                  <h3 className="text-label mb-2">Location</h3>
                  <p className="font-medium">Vancouver, BC, Canada</p>
                </div>
              </div>
            </div>
          </RevealSection>
        </div>
      </section>
    </div>
  );
};

export default Contact;