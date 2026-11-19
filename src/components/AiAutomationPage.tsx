import { Link } from "react-router-dom";
import { Check, MessageSquare, Phone } from "lucide-react";
import { useLang } from "@/lib/i18n";
import { Faq } from "@/components/ConversionWebsitesPage";

/** /services/ai-automation — managed AI receptionist and follow-up automation. */
const AiAutomationPage = () => {
  const { t } = useLang();
  const exIcons = [Phone, MessageSquare, Check];

  return (
    <div className="br-page sp-page">
      {/* Hero */}
      <section className="sp-dark-hero">
        <div className="br-wrap br-g2">
          <div>
            <p className="br-crumb sp-crumb-dark">
              <Link to="/services">{t("sp.services")}</Link> <span aria-hidden="true">/</span>{" "}
              <span aria-current="page">{t("svc.ai.title")}</span>
            </p>
            <h1 className="br-h1 sp-h1-dark">{t("aip.h1a")} <span>{t("aip.h1b")}</span></h1>
            <p className="br-sub sp-sub-dark">{t("aip.sub")}</p>
            <div className="br-actions">
              <Link to="/proposal" className="br-btn br-btn--primary">{t("sp.quote")}</Link>
              <a href="#automations" className="br-btn br-btn--dark">{t("aip.seeWhat")}</a>
            </div>
          </div>
          <div className="sp-flow">
            <p className="sp-flow-label">{t("aip.ex")}</p>
            {[1, 2, 3].map((n) => {
              const Icon = exIcons[n - 1];
              return (
                <div key={n} className="sp-flow-step">
                  <span className={`sp-flow-icon${n === 3 ? " sp-flow-icon--done" : ""}`}><Icon aria-hidden="true" size={18} /></span>
                  <div>
                    <p className="sp-flow-h">{t(`aip.ex.${n}.h`)}</p>
                    <p className="sp-flow-b">{t(`aip.ex.${n}.b`)}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* What we automate */}
      <section id="automations" className="br-white">
        <div className="br-wrap">
          <p className="br-eyebrow br-eyebrow--blue">{t("aip.what.eyebrow")}</p>
          <h2 className="br-h2">{t("aip.what.h")}</h2>
          <div className="br-g3">
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <div key={n} className="br-card sp-auto">
                {n === 3 && <p className="sp-tag">{t("aip.inPkg")}</p>}
                <h3>{t(`aip.w.${n}.h`)}</h3>
                <p>{t(`aip.w.${n}.b`)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Managed */}
      <section className="br-get">
        <div className="br-wrap br-g2 sp-top">
          <div>
            <p className="br-eyebrow br-eyebrow--blue">{t("aip.run.eyebrow")}</p>
            <h2 className="br-h2 sp-h2-tight">{t("aip.run.h")}</h2>
            <p className="sp-lead">{t("aip.run.b")}</p>
          </div>
          <ol className="sp-steps">
            {[1, 2, 3, 4].map((n) => (
              <li key={n}>
                <span>{n}</span>
                <div>
                  <p className="sp-steps-h">{t(`aip.run.${n}.h`)}</p>
                  <p className="sp-steps-b">{t(`aip.run.${n}.b`)}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Pricing */}
      <section className="br-white">
        <div className="br-wrap br-g2 sp-stretch">
          <div className="sp-panel">
            <p className="br-eyebrow br-eyebrow--blue">{t("aip.price.eyebrow")}</p>
            <h2 className="sp-h3">{t("aip.price.h")}</h2>
            <p className="sp-lead">{t("aip.price.b")}</p>
            <Link to="/proposal" className="br-btn br-btn--primary">{t("sp.quote")}</Link>
          </div>
          <div className="sp-panel sp-panel--dark">
            <p className="br-eyebrow sp-light">{t("aip.site.eyebrow")}</p>
            <h2 className="sp-h3">{t("aip.site.h")}</h2>
            <p className="sp-lead">{t("aip.site.b")}</p>
            <Link to="/services/web-design#packages" className="br-btn br-btn--dark">{t("aip.site.cta")}</Link>
          </div>
        </div>
      </section>

      <section className="br-get">
        <div className="br-wrap sp-narrow">
          <h2 className="sp-h3">{t("sp.questions")}</h2>
          <Faq prefix="aip.faq" count={3} />
        </div>
      </section>

      <section className="br-final">
        <div className="br-wrap">
          <h2>{t("aip.final.h")}</h2>
          <p>{t("aip.final.b")}</p>
          <div className="br-actions br-actions--center">
            <Link to="/proposal" className="br-btn br-btn--primary">{t("sp.quote")}</Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AiAutomationPage;
