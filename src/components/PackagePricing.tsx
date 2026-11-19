import { Link } from "react-router-dom";
import { Check } from "lucide-react";
import { useLang } from "@/lib/i18n";
import {
  CUSTOM_QUOTE_ITEMS,
  INDUSTRY_LABEL,
  INDUSTRY_ORDER,
  PACKAGES,
  type IndustryVariant,
  type PackageVariant,
} from "@/lib/packagePricing";
import { IndustryReveal as Reveal } from "./IndustryReveal";

type Props = { variant?: PackageVariant; showHeading?: boolean };
type Bi = { en: string; zh: string };

const List = ({ items, tx }: { items: Bi[]; tx: (b: Bi) => string }) => (
  <ul className="space-y-2.5 text-sm">
    {items.map((it) => (
      <li key={it.en} className="flex gap-2.5">
        <Check size={16} className="text-primary flex-shrink-0 mt-0.5" />
        <span className="text-muted-foreground leading-relaxed">{tx(it)}</span>
      </li>
    ))}
  </ul>
);

export function PlanPrice({ variant, size = "lg" }: { variant: IndustryVariant; size?: "lg" | "sm" }) {
  const { lang } = useLang();
  const zh = lang === "zh";
  const p = PACKAGES[variant];
  const tx = (b: Bi) => (zh ? b.zh : b.en);
  const big = size === "lg" ? "text-4xl md:text-5xl" : "text-3xl";
  return (
    <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 text-foreground">
      <span className="inline-flex items-baseline gap-2 whitespace-nowrap">
        {p.setupPrefix && <span className="text-sm text-muted-foreground">{tx(p.setupPrefix)}</span>}
        <span className={`${big} font-extrabold`}>{p.setup}</span>
        <span className="text-sm text-muted-foreground">{zh ? "建置費" : "setup"}</span>
      </span>
      <span className="inline-flex items-baseline gap-2 whitespace-nowrap">
        <span className="text-xl md:text-2xl font-bold">+ {p.monthly}</span>
        <span className="text-sm text-muted-foreground">{zh ? "／月" : "/ month"}</span>
      </span>
    </div>
  );
}

function CustomQuoteCard({ tx, tt }: { tx: (b: Bi) => string; tt: (en: string, zh: string) => string }) {
  return (
    <div className="h-full p-8 md:p-10 border border-border rounded-xl bg-background flex flex-col">
      <div className="text-xs uppercase tracking-widest text-primary font-semibold">{tt("Add-ons & other projects", "加購與其他專案")}</div>
      <div className="mt-4 text-3xl font-extrabold text-foreground">{tt("Get a Quote", "索取報價")}</div>
      <p className="mt-2 mb-6 text-sm text-muted-foreground leading-relaxed">
        {tt("Priced to your scope after a short conversation.", "簡單了解需求後，依範圍報價。")}
      </p>
      <div className="flex-1"><List items={CUSTOM_QUOTE_ITEMS} tx={tx} /></div>
      <Link to="/proposal" className="mt-8 inline-flex items-center justify-center px-6 py-3.5 text-sm font-semibold rounded-lg border border-border hover:border-primary hover:text-primary transition-colors">
        {tt("Get a Quote", "索取報價")}
      </Link>
    </div>
  );
}

export default function PackagePricing({ variant = "generic", showHeading = true }: Props) {
  const { lang } = useLang();
  const zh = lang === "zh";
  const tx = (b: Bi) => (zh ? b.zh : b.en);
  const tt = (en: string, z: string) => (zh ? z : en);

  if (variant === "generic") {
    return (
      <section id="pricing" className="package-pricing section-border bg-background scroll-mt-24">
        <div className="section-container section-padding">
          {showHeading && (
            <Reveal>
              <span className="text-xs uppercase tracking-widest text-primary font-semibold">{tt("Pricing", "價格")}</span>
              <h2 className="mt-3 text-3xl md:text-4xl font-bold max-w-2xl">{tt("A clear plan for each industry.", "每個產業，一個清楚的方案。")}</h2>
            </Reveal>
          )}
          <div className={`${showHeading ? "mt-12" : ""} grid grid-cols-1 lg:grid-cols-3 gap-6`}>
            {INDUSTRY_ORDER.map((v, i) => {
              const p = PACKAGES[v];
              return (
                <Reveal key={v} delay={i * 80}>
                  <div className="h-full p-8 border border-primary/40 rounded-xl bg-primary/5 flex flex-col">
                    <div className="text-xs uppercase tracking-widest text-primary font-semibold">{tx(INDUSTRY_LABEL[v])}</div>
                    <h3 className="mt-2 text-lg font-bold text-foreground">{tx(p.name)}</h3>
                    <div className="mt-4"><PlanPrice variant={v} size="sm" /></div>
                    <p className="mt-2 text-xs text-muted-foreground">{tx(p.term)}</p>
                    <div className="mt-6 flex-1">
                      <h4 className="text-sm font-bold mb-3">{tt("Launch — one-time", "上線建置（一次性）")}</h4>
                      <List items={p.launch} tx={tx} />
                      <h4 className="text-sm font-bold mt-6 mb-3">{tt("Every month", "每月包含")}</h4>
                      <List items={p.monthlyItems} tx={tx} />
                    </div>
                    <Link to={p.href} className="mt-8 inline-flex items-center justify-center px-6 py-3.5 text-sm font-semibold rounded-lg site-button">
                      {tt(`See ${INDUSTRY_LABEL[v].en}`, `查看${INDUSTRY_LABEL[v].zh}方案`)}
                    </Link>
                  </div>
                </Reveal>
              );
            })}
          </div>
          <Reveal delay={120}>
            <div className="mt-6"><CustomQuoteCard tx={tx} tt={tt} /></div>
          </Reveal>
        </div>
      </section>
    );
  }

  const p = PACKAGES[variant];
  return (
    <section id="pricing" className="package-pricing section-border bg-background scroll-mt-24">
      <div className="section-container section-padding">
        {showHeading && (
          <Reveal>
            <span className="text-xs uppercase tracking-widest text-primary font-semibold">{tt("Pricing", "價格")}</span>
            <h2 className="mt-3 text-3xl md:text-4xl font-bold max-w-2xl">{tt("One plan. One clear price.", "一個方案，一個清楚的價格。")}</h2>
          </Reveal>
        )}
        <div className={`${showHeading ? "mt-12" : ""} grid grid-cols-1 lg:grid-cols-3 gap-6`}>
          <Reveal className="lg:col-span-2">
            <div className="h-full p-8 md:p-10 border border-primary rounded-xl bg-primary/5">
              <div className="text-xs uppercase tracking-widest text-primary font-semibold">{tx(p.name)}</div>
              <div className="mt-4"><PlanPrice variant={variant} /></div>
              <p className="mt-2 text-xs text-muted-foreground">{tx(p.term)}</p>
              <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-sm font-bold mb-4">{tt("Launch — one-time", "上線建置（一次性）")}</h3>
                  <List items={p.launch} tx={tx} />
                </div>
                <div>
                  <h3 className="text-sm font-bold mb-4">{tt("Every month", "每月包含")}</h3>
                  <List items={p.monthlyItems} tx={tx} />
                </div>
              </div>
              <Link to="/proposal" className="mt-10 inline-flex items-center justify-center px-8 py-3.5 text-sm font-semibold rounded-lg site-button">
                {variant === "presale" ? tt("Book a Call", "預約通話") : tt("Get a Proposal", "索取提案")}
              </Link>
            </div>
          </Reveal>
          <Reveal delay={100}><CustomQuoteCard tx={tx} tt={tt} /></Reveal>
        </div>
      </div>
    </section>
  );
}
