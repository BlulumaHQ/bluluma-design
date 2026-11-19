import { Link } from "react-router-dom";
import { Check } from "lucide-react";
import { useLang } from "@/lib/i18n";
import {
  CUSTOM_QUOTE_ITEMS,
  PACKAGE_MONTHLY,
  PACKAGE_MONTHLY_ITEMS,
  PACKAGE_NAME,
  PACKAGE_SETUP,
  PACKAGE_TERM,
  packageLaunch,
  type PackageVariant,
} from "@/lib/packagePricing";
import { IndustryReveal as Reveal } from "./IndustryReveal";

type Props = { variant?: PackageVariant; showHeading?: boolean };

export default function PackagePricing({ variant = "generic", showHeading = true }: Props) {
  const { lang } = useLang();
  const zh = lang === "zh";
  const tx = (b: { en: string; zh: string }) => (zh ? b.zh : b.en);
  const tt = (en: string, z: string) => (zh ? z : en);

  const List = ({ items }: { items: { en: string; zh: string }[] }) => (
    <ul className="space-y-2.5 text-sm">
      {items.map((it) => (
        <li key={it.en} className="flex gap-2.5">
          <Check size={16} className="text-primary flex-shrink-0 mt-0.5" />
          <span className="text-muted-foreground leading-relaxed">{tx(it)}</span>
        </li>
      ))}
    </ul>
  );

  return (
    <section id="pricing" className="package-pricing section-border bg-background scroll-mt-24">
      <div className="section-container section-padding">
        {showHeading && (
          <Reveal>
            <span className="text-xs uppercase tracking-widest text-primary font-semibold">{tt("Pricing", "價格")}</span>
            <h2 className="mt-3 text-3xl md:text-4xl font-bold max-w-2xl">
              {tt("One package. One clear price.", "一個方案，一個清楚的價格。")}
            </h2>
            <p className="mt-4 text-base text-muted-foreground max-w-2xl leading-relaxed">
              {tt(
                "Website, conversion strategy, SEO and ongoing care in one plan — so your site keeps working after launch.",
                "網站、轉換策略、SEO 與持續維護整合在同一個方案，讓網站上線後持續為你帶來客戶。"
              )}
            </p>
          </Reveal>
        )}

        <div className={`${showHeading ? "mt-12" : ""} grid grid-cols-1 lg:grid-cols-3 gap-6`}>
          <Reveal className="lg:col-span-2">
            <div className="h-full p-8 md:p-10 border border-primary rounded-xl bg-primary/5">
              <div className="text-xs uppercase tracking-widest text-primary font-semibold">{tx(PACKAGE_NAME[variant])}</div>
              <div className="mt-4 flex flex-wrap items-baseline gap-x-4 gap-y-1 text-foreground">
                <span className="inline-flex items-baseline gap-2 whitespace-nowrap">
                  <span className="text-4xl md:text-5xl font-extrabold">{PACKAGE_SETUP}</span>
                  <span className="text-sm text-muted-foreground">{tt("setup", "建置費")}</span>
                </span>
                <span className="inline-flex items-baseline gap-2 whitespace-nowrap">
                  <span className="text-2xl md:text-3xl font-bold">+ {PACKAGE_MONTHLY}</span>
                  <span className="text-sm text-muted-foreground">{tt("/ month", "／月")}</span>
                </span>
              </div>
              <p className="mt-2 text-xs text-muted-foreground">{tx(PACKAGE_TERM[variant])}</p>

              <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-sm font-bold mb-4">{tt("Launch — one-time", "上線建置（一次性）")}</h3>
                  <List items={packageLaunch(variant)} />
                </div>
                <div>
                  <h3 className="text-sm font-bold mb-4">{tt("Every month", "每月包含")}</h3>
                  <List items={PACKAGE_MONTHLY_ITEMS} />
                </div>
              </div>

              <Link to="/proposal" className="mt-10 inline-flex items-center justify-center px-8 py-3.5 text-sm font-semibold rounded-lg site-button">
                {tt("Get started", "開始合作")}
              </Link>
            </div>
          </Reveal>

          <Reveal delay={100}>
            <div className="h-full p-8 md:p-10 border border-border rounded-xl bg-background flex flex-col">
              <div className="text-xs uppercase tracking-widest text-primary font-semibold">{tt("Add-ons & other projects", "加購與其他專案")}</div>
              <div className="mt-4 text-3xl font-extrabold text-foreground">{tt("Custom quote", "另行報價")}</div>
              <p className="mt-2 mb-6 text-sm text-muted-foreground leading-relaxed">
                {tt("Priced to your scope after a short conversation.", "簡單了解需求後，依範圍報價。")}
              </p>
              <div className="flex-1"><List items={CUSTOM_QUOTE_ITEMS} /></div>
              <Link to="/proposal" className="mt-8 inline-flex items-center justify-center px-6 py-3.5 text-sm font-semibold rounded-lg border border-border hover:border-primary hover:text-primary transition-colors">
                {tt("Get a quote", "索取報價")}
              </Link>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
