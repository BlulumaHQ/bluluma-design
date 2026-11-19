import { Link } from "react-router-dom";
import { useLang } from "@/lib/i18n";

const IMG = "/images/branding";

const Eyebrow = ({ children, tone = "teal" }: { children: React.ReactNode; tone?: "teal" | "blue" | "light" }) => (
  <p className={`br-eyebrow br-eyebrow--${tone}`}>{children}</p>
);

const SWATCHES = [
  { name: "Deep Wellness Blue", hex: "#07516A", role: "br.colour.primary" },
  { name: "Restorative Teal", hex: "#55989B", role: "br.colour.secondary" },
  { name: "Charcoal", hex: "#343A40", role: "br.colour.text" },
  { name: "Soft Ivory", hex: "#F7F8F5", role: "br.colour.bg", border: true },
  { name: "White", hex: "#FFFFFF", role: "br.colour.space", border: true },
];

/** /services/branding-design — AccuQi Wellness featured case study. */
const BrandingDesignPage = () => {
  const { t, lang } = useLang();
  const zh = lang === "zh";
  const a = (en: string, zhText: string) => (zh ? zhText : en);

  return (
    <div className="br-page">
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@500;600&family=Lato:wght@400;700&display=swap"
      />

      {/* Hero */}
      <section className="br-hero">
        <div className="br-wrap br-g2">
          <div>
            <p className="br-crumb">
              <Link to="/services">{t("br.crumb")}</Link> <span aria-hidden="true">/</span>{" "}
              <span aria-current="page">{t("svc.brand.title")}</span>
            </p>
            <h1 className="br-h1">
              {t("br.h1a")} <span>{t("br.h1b")}</span>
            </h1>
            <p className="br-sub">{t("br.sub")}</p>
            <div className="br-actions">
              <Link to="/proposal" className="br-btn br-btn--primary">{t("br.cta")}</Link>
              <a href="#accuqi" className="br-btn br-btn--ghost">{t("br.seeCase")}</a>
            </div>
          </div>
          <figure className="br-hero-fig">
            <img
              src={`${IMG}/accuqi-wellness-storefront-signage-window-graphics.webp`}
              width={1536}
              height={1024}
              alt={a("AccuQi Wellness storefront with hanging sign and window graphics designed by Bluluma", "Bluluma 為 AccuQi Wellness 設計的店面吊牌與櫥窗貼")}
            />
            <figcaption>{t("br.heroCap")}</figcaption>
          </figure>
        </div>
      </section>

      {/* What you get */}
      <section className="br-get">
        <div className="br-wrap">
          <Eyebrow tone="blue">{t("br.get.eyebrow")}</Eyebrow>
          <h2 className="br-h2">{t("br.get.h")}</h2>
          <div className="br-g4">
            {[1, 2, 3, 4].map((n) => (
              <div key={n} className="br-card">
                <p className="br-num">0{n}</p>
                <h3>{t(`br.get.${n}.h`)}</h3>
                <p>{t(`br.get.${n}.b`)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Case study intro */}
      <section id="accuqi" className="br-case">
        <div className="br-wrap br-g2">
          <div>
            <Eyebrow tone="light">{t("br.case.eyebrow")}</Eyebrow>
            <h2 className="br-serif br-case-h">Care.<br />Balance.<br />Renewal.</h2>
            <p className="br-case-body">{t("br.case.body")}</p>
            <dl className="br-dl">
              <dt>{t("br.case.client")}</dt><dd>AccuQi Wellness</dd>
              <dt>{t("br.case.industry")}</dt><dd>{t("br.case.industryV")}</dd>
              <dt>{t("br.case.scope")}</dt><dd>{t("br.case.scopeV")}</dd>
            </dl>
          </div>
          <img
            className="br-shadow"
            src={`${IMG}/accuqi-wellness-brand-guidelines-cover.webp`}
            width={2200}
            height={1238}
            loading="lazy"
            alt={a("AccuQi Wellness brand guidelines cover", "AccuQi Wellness 品牌指南封面")}
          />
        </div>
      </section>

      {/* Logo system */}
      <section className="br-ivory">
        <div className="br-wrap">
          <div className="br-g2 br-g2--end">
            <div>
              <Eyebrow>{t("br.logo.eyebrow")}</Eyebrow>
              <h2 className="br-serif br-h2s">{t("br.logo.h")}</h2>
            </div>
            <p className="br-lato">{t("br.logo.b")}</p>
          </div>
          <img
            className="br-framed"
            src={`${IMG}/accuqi-wellness-logo-design.webp`}
            width={2200}
            height={1238}
            loading="lazy"
            alt={a("AccuQi Wellness logo design in stacked and horizontal versions", "AccuQi Wellness Logo 設計：直式與橫式版本")}
          />
          <img
            className="br-framed br-mt"
            src={`${IMG}/accuqi-wellness-logo-variations.webp`}
            width={2200}
            height={1238}
            loading="lazy"
            alt={a("AccuQi logo variations: reversed, monochrome, wordmark, icon and app icon", "AccuQi Logo 變化版本：反白、單色、文字標、圖示與 App 圖示")}
          />
        </div>
      </section>

      {/* Colour & type */}
      <section className="br-white">
        <div className="br-wrap">
          <Eyebrow>{t("br.colour.eyebrow")}</Eyebrow>
          <h2 className="br-serif br-h2s br-mb">{t("br.colour.h")}</h2>
          <div className="br-g5">
            {SWATCHES.map((s) => (
              <div key={s.hex}>
                <div className={`br-swatch${s.border ? " br-swatch--border" : ""}`} style={{ background: s.hex }} />
                <p className="br-sw-name">{s.name}</p>
                <p className="br-sw-meta">{s.hex} · {t(s.role)}</p>
              </div>
            ))}
          </div>
          <div className="br-g2 br-type">
            <div className="br-type-card">
              <span className="br-serif br-aa">Aa</span>
              <div>
                <p className="br-type-label">{t("br.type.head")}</p>
                <p className="br-serif br-type-name">Cormorant Garamond</p>
                <p className="br-sw-meta">Medium 500 · Semibold 600</p>
              </div>
            </div>
            <div className="br-type-card">
              <span className="br-lato br-aa br-aa--sans">Aa</span>
              <div>
                <p className="br-type-label">{t("br.type.body")}</p>
                <p className="br-lato br-type-name">Lato</p>
                <p className="br-sw-meta">Regular 400 · Bold 700</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* From guide to street */}
      <section className="br-street">
        <div className="br-wrap">
          <div className="br-g2 br-g2--end">
            <div>
              <Eyebrow tone="light">{t("br.street.eyebrow")}</Eyebrow>
              <h2 className="br-serif br-h2s">{t("br.street.h")}</h2>
            </div>
            <p className="br-street-b">{t("br.street.b")}</p>
          </div>
          <img
            className="br-elev"
            src={`${IMG}/accuqi-wellness-window-graphics-design.webp`}
            width={1800}
            height={595}
            loading="lazy"
            alt={a("AccuQi Wellness window graphics drawn to scale for every panel", "AccuQi Wellness 櫥窗貼設計，每片依實際尺寸繪製")}
          />
          <div className="br-g3 br-street-points">
            {[1, 2, 3].map((n) => (
              <div key={n}>
                <h3>{t(`br.street.${n}.h`)}</h3>
                <p>{t(`br.street.${n}.b`)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Applications */}
      <section className="br-ivory">
        <div className="br-wrap">
          <Eyebrow>{t("br.app.eyebrow")}</Eyebrow>
          <h2 className="br-serif br-h2s br-mb">{t("br.app.h")}</h2>
          <div className="br-g3">
            {[
              { f: "accuqi-wellness-business-card-design.webp", w: 1024, h: 1024, k: "br.app.cards", en: "AccuQi Wellness business card design", z: "AccuQi Wellness 名片設計" },
              { f: "accuqi-wellness-branded-merchandise.webp", w: 1024, h: 1024, k: "br.app.mug", en: "AccuQi Wellness branded teal mug", z: "AccuQi Wellness 品牌馬克杯" },
              { f: "accuqi-wellness-staff-apparel.webp", w: 1122, h: 1402, k: "br.app.shirt", en: "AccuQi Wellness staff T-shirt", z: "AccuQi Wellness 員工 T 恤" },
            ].map((m) => (
              <figure key={m.f} className="br-app">
                <img src={`${IMG}/${m.f}`} width={m.w} height={m.h} loading="lazy" alt={a(m.en, m.z)} />
                <figcaption>{t(m.k)}</figcaption>
              </figure>
            ))}
          </div>
          <img
            className="br-framed br-mt-lg"
            src={`${IMG}/accuqi-wellness-brand-mood-board.webp`}
            width={2200}
            height={1238}
            loading="lazy"
            alt={a("AccuQi Wellness brand mood board: soft light, natural texture, unhurried space", "AccuQi Wellness 品牌情境板：柔和光線、自然材質、從容空間")}
          />
        </div>
      </section>

      {/* Process */}
      <section className="br-white">
        <div className="br-wrap">
          <Eyebrow tone="blue">{t("br.proc.eyebrow")}</Eyebrow>
          <h2 className="br-h2">{t("br.proc.h")}</h2>
          <div className="br-g4">
            {[1, 2, 3, 4].map((n) => (
              <div key={n} className="br-step">
                <p className="br-num">{t("br.proc.step")} {n}</p>
                <h3>{t(`br.proc.${n}.h`)}</h3>
                <p>{t(`br.proc.${n}.b`)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="br-final">
        <div className="br-wrap">
          <h2>{t("br.final.h")}</h2>
          <p>{t("br.final.b")}</p>
          <div className="br-actions br-actions--center">
            <Link to="/proposal" className="br-btn br-btn--primary">{t("br.cta")}</Link>
            <Link to="/services/web-design" className="br-btn br-btn--dark">{t("br.final.web")}</Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BrandingDesignPage;
