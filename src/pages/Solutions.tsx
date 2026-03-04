import { Link } from "react-router-dom";
import { Globe, Fingerprint, ShoppingBag, FileText, Bot, TrendingUp } from "lucide-react";
import { useLang } from "@/lib/i18n";

const solutions = [
  { titleKey: "sol.web-platforms", descKey: "sol.web-platforms.desc", icon: Globe },
  { titleKey: "sol.brand-identity", descKey: "sol.brand-identity.desc", icon: Fingerprint },
  { titleKey: "sol.ecommerce", descKey: "sol.ecommerce.desc", icon: ShoppingBag },
  { titleKey: "sol.marketing", descKey: "sol.marketing.desc", icon: FileText },
  { titleKey: "sol.ai", descKey: "sol.ai.desc", icon: Bot },
  { titleKey: "sol.conversion", descKey: "sol.conversion.desc", icon: TrendingUp },
];

const Solutions = () => {
  const { t } = useLang();

  return (
    <div>
      <section className="section-border">
        <div className="section-container py-16 md:py-24">
          <h1 className="text-4xl md:text-5xl font-bold">{t("solutions.title")}</h1>
          <p className="mt-4 text-muted-foreground max-w-xl">
            {t("solutions.intro")}
          </p>
        </div>
      </section>
      <section className="relative overflow-hidden">
        <div className="logo-motif absolute inset-0 pointer-events-none" />
        <div className="section-container section-padding relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-border border border-border">
            {solutions.map((s) => {
              const Icon = s.icon;
              return (
                <div key={s.titleKey} className="bg-background p-8 flex gap-4 items-start">
                  <Icon size={24} strokeWidth={1.5} className="text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-lg font-semibold mb-3">{t(s.titleKey)}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{t(s.descKey)}</p>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="mt-16 text-center">
            <Link to="/contact" className="inline-flex items-center px-8 py-3 bg-primary text-primary-foreground text-sm font-medium hover:bg-primary-dark transition-colors">
              {t("cta.start-project")}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Solutions;
