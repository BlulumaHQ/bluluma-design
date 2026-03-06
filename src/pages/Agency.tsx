import { Link } from "react-router-dom";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useLang } from "@/lib/i18n";
import agencyImage from "@/assets/bluluma-logo-3d-sign.jpg";

const RevealDiv = ({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) => {
  const ref = useScrollReveal<HTMLDivElement>({ delay });
  return <div ref={ref} className={className}>{children}</div>;
};

const Agency = () => {
  const { t, lang } = useLang();

  return (
    <div>
      <section className="section-border">
        <div className="section-container py-16 md:py-24">
          <h1 className="text-4xl md:text-5xl font-bold">{t("agency.title")}</h1>
        </div>
      </section>

      <section>
        <div className="section-container section-padding">
          <RevealDiv>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-stretch">
              <div className="border border-border overflow-hidden">
                <img
                  src={agencyImage}
                  alt="Bluluma Design Agency studio and office"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="space-y-6 text-muted-foreground leading-relaxed flex flex-col justify-center">
                <p>{t("agency.p1")}</p>
                <p>{t("agency.p2")}</p>
                {t("agency.p3") && <p className="whitespace-pre-line">{t("agency.p3")}</p>}
              </div>
            </div>
          </RevealDiv>

          <RevealDiv delay={100}>
            <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-px bg-border border border-border">
              {[
                { labelKey: "agency.focus", valueKey: "agency.focus.value" },
                { labelKey: "agency.location", valueKey: "agency.location.value" },
                { labelKey: "agency.founded", value: "2024" },
              ].map((item) => (
                <div key={item.labelKey} className="bg-background p-8">
                  <span className="text-label block mb-2">{t(item.labelKey)}</span>
                  <p className="text-lg font-semibold">{"valueKey" in item ? t(item.valueKey!) : item.value}</p>
                </div>
              ))}
            </div>
          </RevealDiv>

          <div className="mt-16 pt-16 border-t border-border space-y-16">
            <RevealDiv delay={0}>
              <h3 className="text-sm font-semibold uppercase tracking-widest text-primary mb-4">{t("agency.vision")}</h3>
              <p className="text-muted-foreground leading-relaxed max-w-2xl">
                {t("agency.vision.text")}
              </p>
            </RevealDiv>

            <RevealDiv delay={100}>
              <h3 className="text-sm font-semibold uppercase tracking-widest text-primary mb-4">{t("agency.mission")}</h3>
              <p className="text-muted-foreground leading-relaxed max-w-2xl">
                {t("agency.mission.text")}
              </p>
            </RevealDiv>

            <RevealDiv delay={200}>
              <h3 className="text-sm font-semibold uppercase tracking-widest text-primary mb-4">{t("agency.values")}</h3>
              <ul className="text-muted-foreground leading-relaxed space-y-2 max-w-2xl">
                <li>{t("agency.values.1")}</li>
                <li>{t("agency.values.2")}</li>
                <li>{t("agency.values.3")}</li>
                <li>{t("agency.values.4")}</li>
                <li>{t("agency.values.5")}</li>
              </ul>
            </RevealDiv>
          </div>

          <RevealDiv delay={100}>
            <div className="mt-16 pt-16 border-t border-border text-center">
              <h2 className="text-3xl font-bold mb-4">{t("agency.work-with-us")}</h2>
              <p className="text-muted-foreground mb-8">{t("agency.work-with-us-sub")}</p>
              <Link to="/contact" className="cta-button inline-flex items-center px-8 py-3 bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors">
                {t("cta.contact-us")}
              </Link>
            </div>
          </RevealDiv>
        </div>
      </section>
    </div>
  );
};

export default Agency;
