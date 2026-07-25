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

  const inputClass = "w-full border border-border px-4 py-3 text-sm bg-background text-foreground rounded-lg focus:outline-none focus:border-primary transition-colors placeholder:text-muted-foreground";

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
        setError(t("contact.form.error.generic"));
        setSubmitting(false);
      }
    } catch {
      setError(t("contact.form.error.network"));
      setSubmitting(false);
    }
  };

  return (
    <div>
      {/* Hero (Dark) */}
      <section className="section-dark section-border relative overflow-hidden">
        <div className="logo-motif absolute inset-0 pointer-events-none" />
        <div className="section-container py-24 md:py-36 relative z-10">
          <RevealSection>
            <p className="text-label mb-4">{t("contact.label")}</p>
            <h1 className="text-4xl md:text-6xl font-extrabold leading-tight max-w-3xl">
              {t("contact.hero.title")}
            </h1>
            <p className="mt-6 text-lg max-w-2xl leading-relaxed" style={{ color: "hsl(220 10% 60%)" }}>
              {t("contact.hero.sub")}
            </p>
          </RevealSection>
        </div>
      </section>

      {/* Form (White) */}
      <section>
        <div className="section-container section-padding">
          <RevealSection>
            <form onSubmit={handleSubmit} className="space-y-6 max-w-3xl">
              <input type="hidden" name="source" value="bluluma contact form" />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="text-sm font-medium block mb-2">{t("contact.form.name")} *</label>
                  <input type="text" id="name" name="name" required className={inputClass} />
                </div>
                <div>
                  <label htmlFor="email" className="text-sm font-medium block mb-2">{t("contact.form.email")} *</label>
                  <input type="email" id="email" name="email" required className={inputClass} />
                </div>
                <div>
                  <label htmlFor="current_url" className="text-sm font-medium block mb-2">{t("contact.form.website")}</label>
                  <input type="text" id="current_url" name="current_url" className={inputClass} />
                </div>
                <div>
                  <label htmlFor="budget" className="text-sm font-medium block mb-2">{t("contact.form.budget")}</label>
                  <select id="budget" name="budget" className={inputClass}>
                    <option value="">{t("contact.form.budget.select")}</option>
                    <option value="$1,500 - $3,000">$1,500 – $3,000</option>
                    <option value="$3,000 - $5,000">$3,000 – $5,000</option>
                    <option value="$5,000 - $10,000">$5,000 – $10,000</option>
                    <option value="$10,000+">$10,000+</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="timeline" className="text-sm font-medium block mb-2">{t("contact.form.timeline")}</label>
                  <select id="timeline" name="timeline" className={inputClass}>
                    <option value="">{t("contact.form.timeline.select")}</option>
                    <option value="ASAP">{t("contact.form.timeline.asap")}</option>
                    <option value="1-2 months">{t("contact.form.timeline.1-2")}</option>
                    <option value="3-6 months">{t("contact.form.timeline.3-6")}</option>
                    <option value="Flexible">{t("contact.form.timeline.flexible")}</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="project_type" className="text-sm font-medium block mb-2">{t("contact.form.project-type")} *</label>
                  <select id="project_type" name="project_type" required className={inputClass}>
                    <option value="">{t("contact.form.project-type.select")}</option>
                    <option value="Conversion Website System">{t("contact.form.project.website")}</option>
                    <option value="AI Automation System">{t("contact.form.project.ai")}</option>
                    <option value="Brand Identity System">{t("contact.form.project.brand")}</option>
                    <option value="Ecommerce Platform">{t("contact.form.project.ecom")}</option>
                    <option value="Other / Not Sure Yet">{t("contact.form.project.other")}</option>
                  </select>
                </div>
              </div>
              <div>
                <label htmlFor="message" className="text-sm font-medium block mb-2">{t("contact.form.details")} *</label>
                <textarea
                  id="message" name="message" rows={5} required
                  className={`${inputClass} resize-none`}
                  placeholder={t("contact.form.details.placeholder")}
                />
              </div>
              {error && <p className="text-sm text-destructive">{error}</p>}
              <button
                type="submit"
                disabled={submitting}
                className="inline-flex items-center px-8 py-4 cta-solid text-sm font-semibold rounded-lg disabled:opacity-50"
              >
                {submitting ? t("contact.form.sending") : t("cta.get-strategy")}
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
                  <h3 className="text-label mb-2">{t("footer.email")}</h3>
                  <p className="font-medium">support@bluluma.com</p>
                </div>
                <div>
                  <h3 className="text-label mb-2">{t("footer.location")}</h3>
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
