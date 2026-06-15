import { Link } from "react-router-dom";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useLang } from "@/lib/i18n";
import { ArrowRight, Check, X } from "lucide-react";

const RevealSection = ({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) => {
  const ref = useScrollReveal<HTMLDivElement>({ delay });
  return <div ref={ref} className={className}>{children}</div>;
};

const Pricing = () => {
  const { t } = useLang();

  return (
    <div>
      {/* Hero (Dark) */}
      <section className="section-dark section-border relative overflow-hidden">
        <div className="logo-motif absolute inset-0 pointer-events-none" />
        <div className="section-container py-24 md:py-36 relative z-10">
          <RevealSection>
            <p className="text-label mb-4">{t("pricing.label")}</p>
            <h1 className="text-4xl md:text-6xl font-extrabold leading-tight max-w-3xl">
              {t("pricing.hero.title")}
            </h1>
            <p className="mt-6 text-lg max-w-2xl leading-relaxed" style={{ color: "hsl(220 10% 60%)" }}>
              {t("pricing.hero.sub")}
            </p>
          </RevealSection>
        </div>
      </section>

      {/* Pricing Block (White) */}
      <section className="section-border">
        <div className="section-container section-padding text-center">
          <RevealSection>
            <div className="inline-flex flex-col items-center border border-border p-12 md:p-16 bg-background rounded-xl max-w-lg w-full">
              <p className="text-label mb-4">{t("home.pricing.label")}</p>
              <p className="text-5xl md:text-6xl font-extrabold gradient-text">{t("home.pricing.range")}</p>
              <p className="text-muted-foreground mt-4 text-sm max-w-sm">{t("home.pricing.note")}</p>
              <Link
                to="/proposal"
                className="mt-8 inline-flex items-center gap-2 px-8 py-4 cta-solid text-sm font-semibold rounded-lg"
              >
                {t("cta.get-strategy")}
                <ArrowRight size={16} />
              </Link>
            </div>
          </RevealSection>
        </div>
      </section>

      {/* Qualification (Subtle bg) */}
      <section className="section-border section-subtle-bg">
        <div className="section-container section-padding">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <RevealSection>
              <h2 className="text-2xl md:text-3xl font-bold mb-6">{t("pricing.for.title")}</h2>
              <div className="space-y-4">
                {["pricing.for.1", "pricing.for.2", "pricing.for.3", "pricing.for.4"].map((key) => (
                  <div key={key} className="flex items-start gap-3">
                    <Check size={18} className="text-primary flex-shrink-0 mt-0.5" />
                    <p className="text-foreground">{t(key)}</p>
                  </div>
                ))}
              </div>
            </RevealSection>
            <RevealSection delay={200}>
              <h2 className="text-2xl md:text-3xl font-bold mb-6">{t("pricing.notfor.title")}</h2>
              <div className="space-y-4">
                {["pricing.notfor.1", "pricing.notfor.2", "pricing.notfor.3"].map((key) => (
                  <div key={key} className="flex items-start gap-3">
                    <X size={18} className="text-muted-foreground flex-shrink-0 mt-0.5" />
                    <p className="text-muted-foreground">{t(key)}</p>
                  </div>
                ))}
              </div>
            </RevealSection>
          </div>
        </div>
      </section>

      {/* CTA (Dark) */}
      <section className="section-dark">
        <div className="section-container py-20 md:py-32 text-center">
          <RevealSection>
            <h2 className="text-3xl md:text-5xl font-bold mb-4">{t("home.finalcta.title")}</h2>
            <p className="mb-10 max-w-xl mx-auto" style={{ color: "hsl(220 10% 55%)" }}>{t("home.finalcta.sub")}</p>
            <Link
              to="/proposal"
              className="inline-flex items-center gap-2 px-8 py-4 cta-gradient text-base font-semibold rounded-lg"
            >
              {t("cta.get-strategy")}
              <ArrowRight size={18} />
            </Link>
          </RevealSection>
        </div>
      </section>
    </div>
  );
};

export default Pricing;
