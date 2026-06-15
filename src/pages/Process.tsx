import { Link } from "react-router-dom";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useLang } from "@/lib/i18n";
import { Search, Palette, Code, Rocket, TrendingUp, ArrowRight } from "lucide-react";

const RevealSection = ({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) => {
  const ref = useScrollReveal<HTMLDivElement>({ delay });
  return <div ref={ref} className={className}>{children}</div>;
};

const steps = [
  { num: "01", icon: Search, titleKey: "process.s1.title", descKey: "process.s1.desc" },
  { num: "02", icon: Palette, titleKey: "process.s2.title", descKey: "process.s2.desc" },
  { num: "03", icon: Code, titleKey: "process.s3.title", descKey: "process.s3.desc" },
  { num: "04", icon: Rocket, titleKey: "process.s4.title", descKey: "process.s4.desc" },
  { num: "05", icon: TrendingUp, titleKey: "process.s5.title", descKey: "process.s5.desc" },
];

const Process = () => {
  const { t } = useLang();

  return (
    <div>
      {/* Hero (Dark) */}
      <section className="section-dark section-border relative overflow-hidden">
        <div className="logo-motif absolute inset-0 pointer-events-none" />
        <div className="section-container py-24 md:py-36 relative z-10">
          <RevealSection>
            <p className="text-label mb-4">{t("process.label")}</p>
            <h1 className="text-4xl md:text-6xl font-extrabold leading-tight max-w-3xl">
              {t("process.hero.title")}
            </h1>
            <p className="mt-6 text-lg max-w-2xl leading-relaxed" style={{ color: "hsl(220 10% 60%)" }}>
              {t("process.hero.sub")}
            </p>
          </RevealSection>
        </div>
      </section>

      {/* Steps (White) */}
      <section>
        <div className="section-container section-padding">
          <div className="space-y-0">
            {steps.map((step, i) => {
              const Icon = step.icon;
              return (
                <RevealSection key={i} delay={i * 100}>
                  <div className={`grid grid-cols-1 md:grid-cols-[120px_1fr] gap-8 py-12 ${i < steps.length - 1 ? "border-b border-border" : ""}`}>
                    <div className="flex md:flex-col items-center md:items-start gap-4">
                      <span className="text-5xl font-extrabold text-primary/20">{step.num}</span>
                      <Icon size={28} strokeWidth={1.5} className="text-primary" />
                    </div>
                    <div>
                      <h2 className="text-2xl md:text-3xl font-bold mb-3">{t(step.titleKey)}</h2>
                      <p className="text-muted-foreground leading-relaxed max-w-2xl">{t(step.descKey)}</p>
                    </div>
                  </div>
                </RevealSection>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA (Dark) */}
      <section className="section-dark">
        <div className="section-container py-20 md:py-32 text-center">
          <RevealSection>
            <h2 className="text-3xl md:text-5xl font-bold mb-4">{t("process.cta.title")}</h2>
            <p className="mb-10 max-w-xl mx-auto" style={{ color: "hsl(220 10% 55%)" }}>{t("process.cta.sub")}</p>
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

export default Process;
