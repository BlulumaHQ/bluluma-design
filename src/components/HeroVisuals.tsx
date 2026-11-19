import { Check, Mail, Moon, Plus, TrendingUp } from "lucide-react";
import { useLang } from "@/lib/i18n";
import { PACKAGES, type IndustryVariant } from "@/lib/packagePricing";

/** Static hero screenshots (SEO-named files in /public/images/hero). */
export const HERO_IMAGES = {
  tsai: { src: "/images/hero/tsai-orthodontics-vancouver-website-design.webp", domain: "tsaiorthodontics.ca", alt: "Tsai Orthodontics website designed by Bluluma" },
  friendly: { src: "/images/hero/friendly-dental-centre-richmond-website-design.webp", domain: "friendlydental.ca", alt: "Friendly Dental Centre website designed by Bluluma" },
  ericKim: { src: "/images/hero/eric-kim-realty-vancouver-realtor-website.webp", domain: "erickimrealty.com", alt: "Eric Kim Realty REALTOR® website designed by Bluluma" },
  onePark: { src: "/images/hero/one-park-richmond-presale-website.webp", domain: "one-park-home.bluluma.com", alt: "One Park pre-sale project website designed by Bluluma" },
  ttop: { src: "/images/hero/ttop-chicken-richmond-restaurant-website.webp", domain: "ttopchicken.com", alt: "TTOP Chicken restaurant website designed by Bluluma" },
  kchen: { src: "/images/hero/k-chen-construction-vancouver-website.webp", domain: "kchencm.com", alt: "K. Chen Construction website designed by Bluluma" },
  shootingstar: { src: "/images/hero/shootingstar-travel-website-design.webp", domain: "shootingstartravel.ca", alt: "Shootingstar Travel website designed by Bluluma" },
  elevate: { src: "/images/hero/elevate-international-education-website-design.webp", domain: "elevateeducation.ca", alt: "Elevate International Education website designed by Bluluma" },
} as const;

type Shot = (typeof HERO_IMAGES)[keyof typeof HERO_IMAGES];

export function HvBrowser({ shot, className = "", eager = false }: { shot: Shot; className?: string; eager?: boolean }) {
  return (
    <div className={`hv-browser ${className}`}>
      <div className="hv-browser-bar" aria-hidden="true"><i /><i /><i /><span>{shot.domain}</span></div>
      <img src={shot.src} alt={shot.alt} width={1554} height={739} loading={eager ? "eager" : "lazy"} decoding="async" {...(eager ? { fetchpriority: "high" } : {})} />
    </div>
  );
}

export function HealthcareVisual({ eager = false }: { eager?: boolean }) {
  const { t } = useLang();
  return (
    <div className="hv-stage hv-stage-healthcare">
      <div className="hv-slots-bg" aria-hidden="true" />
      <HvBrowser shot={HERO_IMAGES.friendly} className="hv-hc-back" eager={eager} />
      <HvBrowser shot={HERO_IMAGES.tsai} className="hv-hc-front" eager={eager} />
      <div className="hv-card hv-card-dark hv-hc-booking">
        <span className="hv-card-tag"><Moon size={14} aria-hidden="true" />{t("hv.hc.bookingTag")}</span>
        <strong>{t("hv.hc.bookingTitle")}</strong>
        <p>{t("hv.hc.bookingSub")}</p>
      </div>
      <div className="hv-card hv-card-light hv-hc-slots" aria-hidden="true">
        <span className="hv-card-tag hv-muted">{t("hv.hc.tomorrow")}</span>
        <div className="hv-slot-row"><span>9:00</span><span className="is-picked">10:30</span><span>2:15</span></div>
      </div>
    </div>
  );
}

export function RealtorVisual({ eager = false }: { eager?: boolean }) {
  const { t } = useLang();
  const rows = [
    { icon: Plus, title: "hv.rt.added", sub: "hv.rt.addedSub", strong: true },
    { icon: TrendingUp, title: "hv.rt.price", sub: "hv.rt.priceSub" },
    { icon: Check, title: "hv.rt.sold", sub: "hv.rt.soldSub" },
  ];
  return (
    <div className="hv-stage hv-stage-realtor">
      <HvBrowser shot={HERO_IMAGES.ericKim} className="hv-rt-window hv-bleed" eager={eager} />
      <div className="hv-card hv-card-panel hv-rt-sync">
        <div className="hv-row-between">
          <span className="hv-card-tag">{t("hv.rt.syncTag")}</span>
          <span className="hv-live"><i />{t("hv.rt.live")}</span>
        </div>
        {rows.map((r) => (
          <div key={r.title} className="hv-sync-row">
            <span className={`hv-sync-icon ${r.strong ? "is-strong" : ""}`}><r.icon size={16} aria-hidden="true" /></span>
            <span><b>{t(r.title)}</b><small>{t(r.sub)}</small></span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function PresaleVisual({ eager = false }: { eager?: boolean }) {
  const { t } = useLang();
  return (
    <div className="hv-stage hv-stage-presale">
      <div className="hv-ps-photo hv-bleed">
        <img src={HERO_IMAGES.onePark.src} alt={HERO_IMAGES.onePark.alt} width={1554} height={739} loading={eager ? "eager" : "lazy"} decoding="async" />
      </div>
      <div className="hv-card hv-card-light hv-ps-form" role="img" aria-label={t("hv.ps.demo")}>
        <div className="hv-row-between">
          <span className="hv-card-tag hv-blue">{t("hv.ps.vipTag")}</span>
          <span className="hv-chip">{t("hv.ps.vipBadge")}</span>
        </div>
        <strong className="hv-ps-title">{t("hv.ps.vipTitle")}</strong>
        <span className="hv-field"><small>{t("hv.ps.name")}</small><i /></span>
        <span className="hv-field"><small>{t("hv.ps.email")}</small><i /></span>
        <span className="hv-field"><small>{t("hv.ps.type")}</small>
          <span className="hv-beds"><em>{t("hv.ps.bed1")}</em><em className="is-picked">{t("hv.ps.bed2")}</em><em>{t("hv.ps.bed3")}</em></span>
        </span>
        <span className="hv-fake-button">{t("hv.ps.join")}</span>
      </div>
      <div className="hv-card hv-card-panel hv-ps-toast">
        <span className="hv-sync-icon is-strong"><Mail size={16} aria-hidden="true" /></span>
        <span><b>{t("hv.ps.toast")}</b><small>{t("hv.ps.toastSub")}</small></span>
      </div>
    </div>
  );
}

export function EveryoneStrip() {
  const shots = [HERO_IMAGES.ttop, HERO_IMAGES.kchen, HERO_IMAGES.shootingstar, HERO_IMAGES.elevate];
  return (
    <div className="hv-strip" aria-hidden="false">
      <div className="hv-strip-row">
        {shots.map((s, i) => <HvBrowser key={s.domain} shot={s} className={`hv-strip-card ${i % 2 === 0 ? "is-high" : ""}`} />)}
      </div>
    </div>
  );
}

export function HvPriceLine({ variant }: { variant: IndustryVariant }) {
  const { lang, t } = useLang();
  const p = PACKAGES[variant];
  if (variant === "presale") {
    return lang === "zh"
      ? <p className="hv-price-line">{t("hv.price.presale")} <strong>{p.setup}</strong> 起</p>
      : <p className="hv-price-line">{t("hv.price.presale")} from <strong>{p.setup}</strong></p>;
  }
  return <p className="hv-price-line">{t("hv.from")} <strong>{p.setup}</strong> {t("hv.setup")} + <strong>{p.monthly}{t("hv.perMonth")}</strong> · {t(`hv.price.${variant}`)}</p>;
}
