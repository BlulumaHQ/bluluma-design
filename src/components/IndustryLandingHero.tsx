import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { Check } from "lucide-react";
import { Button } from "./ui/button";
import { useLang } from "@/lib/i18n";
import { INDUSTRY_LABEL, PACKAGES, type IndustryVariant } from "@/lib/packagePricing";
import { HealthcareVisual, PresaleVisual, RealtorVisual } from "./HeroVisuals";

type Testimonial = { quote: string; name: string; company: string };

interface Props {
  variant: IndustryVariant;
  title: string;
  accent: string;
  description: string;
  secondaryLabel: string;
  testimonial?: Testimonial;
  top?: ReactNode;
  /** Replaces the plan/price card with a free-offer card and points the primary CTA at an on-page anchor. */
  offer?: { href: string; cta: string; label: string; value: string; sub: string; note: string; items: string[] };
}

/** Landing-page hero shared by /healthcare, /real-estate and /presale (Nov 2026 design). */
export default function IndustryLandingHero({ variant, title, accent, description, secondaryLabel, testimonial, top, offer }: Props) {
  const { lang, t } = useLang();
  const zh = lang === "zh";
  const p = PACKAGES[variant];
  const tx = (b: { en: string; zh: string }) => (zh ? b.zh : b.en);
  const light = variant === "healthcare";
  const visual = variant === "healthcare" ? <HealthcareVisual eager /> : variant === "realtor" ? <RealtorVisual eager /> : <PresaleVisual eager />;
  const primary = variant === "presale" ? t("hv.bookCall") : t("hv.getProposal");
  return (
    <section className={`lp-hero lp-${variant} ${light ? "lp-light" : ""}`}>
      {top}
      <div className="site-container lp-grid">
        <div className="lp-copy">
          <nav aria-label="Breadcrumb" className="lp-breadcrumb">
            <Link to="/industries">{t("hv.breadcrumb")}</Link> <span aria-hidden="true">/</span> <span aria-current="page">{tx(INDUSTRY_LABEL[variant])}</span>
          </nav>
          <h1 className="hv-title">{title} <span>{accent}</span></h1>
          <p className="hv-description">{description}</p>
          <div className="lp-actions">
            <Button asChild variant="site">{offer ? <a href={offer.href}>{offer.cta}</a> : <Link to="/proposal">{primary}</Link>}</Button>
            <Button asChild variant="siteOutline" className="hv-outline"><a href="#work">{secondaryLabel}</a></Button>
          </div>
          {offer ? (
            <div className="lp-plan lp-offer">
              <div className="lp-plan-price">
                <span className="lp-plan-label">{offer.label}</span>
                <span className="lp-plan-setup">{offer.value}</span>
                <span className="lp-plan-monthly"><strong>{offer.sub}</strong></span>
                <span className="lp-plan-note">{offer.note}</span>
              </div>
              <div className="lp-plan-divider" aria-hidden="true" />
              <ul>{offer.items.map((h) => <li key={h}><Check size={16} strokeWidth={2.6} aria-hidden="true" />{h}</li>)}</ul>
            </div>
          ) : (
            <div className="lp-plan">
              <div className="lp-plan-price">
                <span className="lp-plan-label">{tx(p.name).toUpperCase()}</span>
                <span className="lp-plan-setup">{p.setupPrefix ? `${tx(p.setupPrefix)} ` : ""}{p.setup}</span>
                <span className="lp-plan-monthly">{variant === "presale" ? "+ " : `${t("hv.setup")} + `}<strong>{p.monthly}{t("hv.perMonth")}</strong>{variant === "presale" ? ` · ${tx(p.monthlyNote)}` : ""}</span>
                <span className="lp-plan-note">{variant === "presale" ? t("lp.planHint") : tx(p.monthlyNote)}</span>
              </div>
              <div className="lp-plan-divider" aria-hidden="true" />
              <ul>{p.highlights.map((h) => <li key={h.en}><Check size={16} strokeWidth={2.6} aria-hidden="true" />{tx(h)}</li>)}</ul>
            </div>
          )}
        </div>
        <div className="lp-side">
          <div className="hv-visual">{visual}</div>
          {testimonial && (
            <figure className="lp-quote">
              <svg aria-hidden="true" width="28" height="22" viewBox="0 0 28 22"><path d="M0 22V12C0 5 4 1 11 0l1 3C8 4 6 7 6 10h5v12H0zm16 0V12c0-7 4-11 11-12l1 3c-4 1-6 4-6 7h5v12H16z" fill="#C9D5F2" /></svg>
              <blockquote>{testimonial.quote}</blockquote>
              <figcaption><strong>{testimonial.name}</strong> · {testimonial.company}</figcaption>
            </figure>
          )}
        </div>
      </div>
    </section>
  );
}
