import { Link } from "react-router-dom";
import { Check } from "lucide-react";
import { useLang } from "@/lib/i18n";
import { INDUSTRY_LABEL, INDUSTRY_ORDER, PACKAGES } from "@/lib/packagePricing";
import { PlanPrice } from "@/components/PackagePricing";

const HERO = "/images/hero";

export const CheckList = ({ keys }: { keys: string[] }) => {
  const { t } = useLang();
  return (
    <ul className="sp-checks">
      {keys.map((k) => (
        <li key={k}><Check aria-hidden="true" size={20} strokeWidth={2.4} />{t(k)}</li>
      ))}
    </ul>
  );
};

export const Faq = ({ prefix, count }: { prefix: string; count: number }) => {
  const { t } = useLang();
  return (
    <div className="sp-faq">
      {Array.from({ length: count }, (_, i) => i + 1).map((n) => (
        <details key={n} open={n === 1}>
          <summary>{t(`${prefix}.${n}.q`)}</summary>
          <p>{t(`${prefix}.${n}.a`)}</p>
        </details>
      ))}
    </div>
  );
};

/** /services/web-design — Conversion Websites. */
const ConversionWebsitesPage = () => {
  const { t, lang } = useLang();
  const zh = lang === "zh";

  return (
    <div className="br-page sp-page">
      {/* Hero */}
      <section className="br-hero">
        <div className="br-wrap br-g2">
          <div>
            <p className="br-crumb">
              <Link to="/services">{t("sp.services")}</Link> <span aria-hidden="true">/</span>{" "}
              <span aria-current="page">{t("svc.web-design.title")}</span>
            </p>
            <h1 className="br-h1">{t("cw.h1a")} <span>{t("cw.h1b")}</span></h1>
            <p className="br-sub">{t("cw.sub")}</p>
            <div className="br-actions">
              <a href="#packages" className="br-btn br-btn--primary">{t("cw.seePackages")}</a>
              <Link to="/proposal" className="br-btn br-btn--ghost">{t("sp.quote")}</Link>
            </div>
          </div>
          <div className="sp-hero-visual">
            <div className="sp-browser">
              <div className="sp-browser-bar" aria-hidden="true"><span /><span /><span /></div>
              <img src={`${HERO}/tsai-orthodontics-vancouver-website-design.webp`} width={1554} height={739} alt={t("cw.heroAlt")} />
            </div>
            <div className="sp-float">
              <p className="sp-float-k">{t("cw.badge.k")}</p>
              <p className="sp-float-v">{t("cw.badge.v")}</p>
              <p className="sp-float-n">{t("cw.badge.n")}</p>
            </div>
          </div>
        </div>
      </section>

      {/* What makes it convert */}
      <section className="br-get">
        <div className="br-wrap">
          <p className="br-eyebrow br-eyebrow--blue">{t("cw.why.eyebrow")}</p>
          <h2 className="br-h2">{t("cw.why.h")}</h2>
          <div className="br-g4">
            {[1, 2, 3, 4].map((n) => (
              <div key={n} className="br-card">
                <p className="br-num">0{n}</p>
                <h3>{t(`cw.why.${n}.h`)}</h3>
                <p>{t(`cw.why.${n}.b`)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Packages */}
      <section id="packages" className="br-white">
        <div className="br-wrap">
          <p className="br-eyebrow br-eyebrow--blue">{t("cw.pkg.eyebrow")}</p>
          <h2 className="br-h2 sp-h2-tight">{t("cw.pkg.h")}</h2>
          <p className="sp-lead">{t("cw.pkg.b")}</p>
          <div className="br-g4 sp-pkgs">
            {INDUSTRY_ORDER.map((v) => {
              const p = PACKAGES[v];
              return (
                <div key={v} className="sp-pkg">
                  <p className="br-num">{zh ? INDUSTRY_LABEL[v].zh : INDUSTRY_LABEL[v].en}</p>
                  <div className="sp-pkg-price"><PlanPrice variant={v} size="sm" /></div>
                  <p className="sp-pkg-note">{zh ? p.monthlyNote.zh : p.monthlyNote.en}</p>
                  <ul>
                    {p.highlights.slice(0, 3).map((h) => <li key={h.en}>{zh ? h.zh : h.en}</li>)}
                  </ul>
                  <Link to={p.href} className="br-btn br-btn--ghost sp-pkg-btn">{t("cw.pkg.more")}</Link>
                </div>
              );
            })}
            <div className="sp-pkg sp-pkg--dark">
              <p className="br-num sp-light">{t("cw.pkg.other")}</p>
              <p className="sp-pkg-quote">{t("cw.pkg.otherH")}</p>
              <p className="sp-pkg-note">{t("cw.pkg.otherB")}</p>
              <ul>
                <li>{t("cw.pkg.other1")}</li>
                <li>{t("cw.pkg.other2")}</li>
                <li>{t("cw.pkg.other3")}</li>
              </ul>
              <Link to="/proposal" className="br-btn br-btn--primary sp-pkg-btn">{t("sp.quote")}</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Included */}
      <section className="br-get">
        <div className="br-wrap br-g2 sp-top">
          <div>
            <p className="br-eyebrow br-eyebrow--blue">{t("cw.launch.eyebrow")}</p>
            <h2 className="sp-h3">{t("cw.launch.h")}</h2>
            <CheckList keys={[1, 2, 3, 4, 5].map((n) => `cw.launch.${n}`)} />
          </div>
          <div>
            <p className="br-eyebrow br-eyebrow--blue">{t("cw.month.eyebrow")}</p>
            <h2 className="sp-h3">{t("cw.month.h")}</h2>
            <CheckList keys={[1, 2, 3, 4].map((n) => `cw.month.${n}`)} />
          </div>
        </div>
      </section>

      {/* Work + testimonial */}
      <section className="br-white">
        <div className="br-wrap">
          <div className="sp-row">
            <h2 className="br-h2 sp-h2-flush">{t("cw.work.h")}</h2>
            <Link to="/portfolio" className="sp-link">{t("cw.work.all")}</Link>
          </div>
          <div className="br-g3">
            {[
              { f: "friendly-dental-centre-richmond-website-design.webp", n: "Friendly Dental Centre", k: "cw.work.hc" },
              { f: "eric-kim-realty-vancouver-realtor-website.webp", n: "Eric Kim Realty", k: "cw.work.re" },
              { f: "one-park-richmond-presale-website.webp", n: "One Park", k: "cw.work.ps" },
            ].map((w) => (
              <figure key={w.f} className="sp-work">
                <img src={`${HERO}/${w.f}`} width={1554} height={739} loading="lazy" alt={`${w.n} — ${t(w.k)}`} />
                <figcaption>{w.n} <span>· {t(w.k)}</span></figcaption>
              </figure>
            ))}
          </div>
          <blockquote className="sp-quote">
            <p>“{t("lp.hc.quote")}”</p>
            <footer><strong>Patrick Wu</strong> · Friendly Dental Centre</footer>
          </blockquote>
        </div>
      </section>

      {/* Process + FAQ */}
      <section className="br-get">
        <div className="br-wrap">
          <p className="br-eyebrow br-eyebrow--blue">{t("cw.proc.eyebrow")}</p>
          <h2 className="br-h2">{t("cw.proc.h")}</h2>
          <div className="br-g4">
            {[1, 2, 3, 4].map((n) => (
              <div key={n} className="br-step">
                <p className="br-num">{t("sp.step")} {n}</p>
                <h3>{t(`cw.proc.${n}.h`)}</h3>
                <p>{t(`cw.proc.${n}.b`)}</p>
              </div>
            ))}
          </div>
          <Faq prefix="cw.faq" count={3} />
        </div>
      </section>

      <section className="br-final">
        <div className="br-wrap">
          <h2>{t("cw.final.h")}</h2>
          <p>{t("cw.final.b")}</p>
          <div className="br-actions br-actions--center">
            <Link to="/proposal" className="br-btn br-btn--primary">{t("sp.proposal")}</Link>
            <Link to="/pricing" className="br-btn br-btn--dark">{t("cw.final.pricing")}</Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ConversionWebsitesPage;
