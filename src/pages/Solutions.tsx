import { Link } from "react-router-dom";
import { Target, Zap, Gem, ArrowRight, CheckCircle2 } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useLang } from "@/lib/i18n";

const RevealSection = ({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) => {
  const ref = useScrollReveal<HTMLDivElement>({ delay });
  return <div ref={ref} className={className}>{children}</div>;
};

const Solutions = () => {
  const { t } = useLang();

  const solutions = [
    {
      icon: Target,
      titleKey: "sol.cws.title",
      descKey: "sol.cws.desc",
      features: ["sol.cws.f1", "sol.cws.f2", "sol.cws.f3", "sol.cws.f4"],
    },
    {
      icon: Zap,
      titleKey: "sol.ai.title",
      descKey: "sol.ai.desc",
      features: ["sol.ai.f1", "sol.ai.f2", "sol.ai.f3", "sol.ai.f4"],
    },
    {
      icon: Gem,
      titleKey: "sol.brand.title",
      descKey: "sol.brand.desc",
      features: ["sol.brand.f1", "sol.brand.f2", "sol.brand.f3", "sol.brand.f4"],
    },
  ];

  return (
    <div>
      {/* Hero (Dark) */}
      <section className="section-dark section-border relative overflow-hidden">
        <div className="logo-motif absolute inset-0 pointer-events-none" />
        <div className="section-container py-24 md:py-36 relative z-10">
          <RevealSection>
            <p className="text-label mb-4">{t("sol.label")}</p>
            <h1 className="text-4xl md:text-6xl font-extrabold leading-tight max-w-3xl">
              {t("sol.hero.title")}
            </h1>
            <p className="mt-6 text-lg max-w-2xl leading-relaxed" style={{ color: "hsl(220 10% 60%)" }}>
              {t("sol.hero.sub")}
            </p>
          </RevealSection>
        </div>
      </section>

      {/* Solution Sections (alternating white / subtle) */}
      {solutions.map((sol, idx) => {
        const Icon = sol.icon;
        return (
          <section key={idx} className={`section-border ${idx % 2 === 0 ? "" : "section-subtle-bg"}`}>
            <div className="section-container section-padding">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
                <RevealSection>
                  <Icon size={40} strokeWidth={1.5} className="text-primary mb-6" />
                  <h2 className="text-3xl md:text-4xl font-bold mb-4">{t(sol.titleKey)}</h2>
                  <p className="text-lg text-muted-foreground leading-relaxed mb-8">{t(sol.descKey)}</p>
                  <Link
                    to="/contact"
                    className="inline-flex items-center gap-2 px-6 py-3 cta-solid text-sm font-semibold rounded-lg"
                  >
                    {t("cta.start-project")}
                    <ArrowRight size={16} />
                  </Link>
                </RevealSection>
                <RevealSection delay={200}>
                  <div className="space-y-4">
                    {sol.features.map((fKey, i) => (
                      <div key={i} className="flex items-start gap-3 p-4 border border-border bg-background rounded-lg">
                        <CheckCircle2 size={18} className="text-primary flex-shrink-0 mt-0.5" />
                        <p className="text-sm font-medium text-foreground">{t(fKey)}</p>
                      </div>
                    ))}
                  </div>
                </RevealSection>
              </div>
            </div>
          </section>
        );
      })}

      {/* CTA (Dark) */}
      <section className="section-dark">
        <div className="section-container py-20 md:py-32 text-center">
          <RevealSection>
            <h2 className="text-3xl md:text-5xl font-bold mb-4">{t("home.finalcta.title")}</h2>
            <p className="mb-10 max-w-xl mx-auto" style={{ color: "hsl(220 10% 55%)" }}>{t("home.finalcta.sub")}</p>
            <Link
              to="/contact"
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

export default Solutions;
