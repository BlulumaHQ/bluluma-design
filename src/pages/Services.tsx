import { Link } from "react-router-dom";
import { Globe, Fingerprint, ShoppingBag, Bot, TrendingUp, Megaphone } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useLang } from "@/lib/i18n";

const RevealSection = ({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) => {
  const ref = useScrollReveal<HTMLDivElement>({ delay });
  return <div ref={ref} className={className}>{children}</div>;
};

const services = [
  {
    titleKey: "svc.web-design.title",
    descKey: "svc.web-design.desc",
    icon: Globe,
    to: "/services/web-design",
  },
  {
    titleKey: "svc.ecom.title",
    descKey: "svc.ecom.desc",
    icon: ShoppingBag,
    to: "/services/ecommerce-websites",
  },
  {
    titleKey: "svc.brand.title",
    descKey: "svc.brand.desc",
    icon: Fingerprint,
    to: "/services/branding-design",
  },
  {
    titleKey: "svc.ai.title",
    descKey: "svc.ai.desc",
    icon: Bot,
    to: "/services/ai-automation",
  },
  {
    titleKey: "svc.mkt.title",
    descKey: "svc.mkt.desc",
    icon: Megaphone,
    to: "/services/digital-marketing",
  },
];

const Services = () => {
  const { t } = useLang();
  return (
    <div className="site-page site-page-services">
      {/* Hero */}
      <section className="site-page-hero section-border relative overflow-hidden">
        <div className="section-container py-16 md:py-24 relative z-10">
          <RevealSection>
            <h1 className="text-4xl md:text-5xl font-bold">{t("services.page.title")}</h1>
            <p className="mt-4 text-muted-foreground max-w-xl leading-relaxed">{t("services.page.intro")}</p>
          </RevealSection>
        </div>
      </section>

      {/* Services Grid */}
      <section className="relative overflow-hidden">
        <div className="section-container section-padding">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((s, i) => {
              const Icon = s.icon;
              return (
                <RevealSection key={s.to} delay={i * 80}>
                  <Link
                    to={s.to}
                    className="site-page-card block bg-background p-8 md:p-10 group transition-colors duration-300 hover:bg-secondary h-full"
                  >
                    <Icon size={24} strokeWidth={1.5} className="text-primary mb-4" />
                    <h2 className="text-lg font-semibold mb-3 group-hover:text-primary transition-colors">{t(s.titleKey)}</h2>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-4">{t(s.descKey)}</p>
                    <span className="text-xs font-medium text-foreground group-hover:text-primary transition-colors inline-flex items-center gap-1">
                      {t("services.learn-more")} <span className="transition-transform group-hover:translate-x-0.5">→</span>
                    </span>
                  </Link>
                </RevealSection>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="site-page-cta isolate section-border relative overflow-hidden">
        <div className="section-container py-16 md:py-24 text-center">
          <RevealSection>
            <h2 className="text-2xl md:text-3xl font-bold mb-4">{t("services.cta.ready")}</h2>
            <p className="text-muted-foreground max-w-lg mx-auto mb-8 leading-relaxed">{t("services.cta.text")}</p>
            <Link
              to="/proposal"
              className="site-button inline-block bg-primary text-primary-foreground px-8 py-3 text-sm font-medium hover:bg-primary/90 transition-colors"
            >
              {t("services.cta.start")}
            </Link>
          </RevealSection>
        </div>
      </section>
    </div>
  );
};

export default Services;
