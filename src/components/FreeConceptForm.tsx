import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLang } from "@/lib/i18n";

/** Free homepage concept lead form (Nov 2026 dental FB ad offer). Posts to the shared contact function. */
const GOALS = ["patients", "expertise", "quality", "search", "convert", "unsure"] as const;
const PLANS = ["active", "months", "curious"] as const;

export default function FreeConceptForm() {
  const { t } = useLang();
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [loadedAt] = useState(() => String(Date.now()));

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      const fd = new FormData(e.currentTarget);
      const goal = fd.get("goal");
      const plan = fd.get("plans");
      if (goal) fd.set("goal", t(`fc.goal.${goal}`));
      if (plan) fd.set("plans", t(`fc.plan.${plan}`));
      const res = await fetch("/.netlify/functions/contact", { method: "POST", body: fd, headers: { Accept: "application/json" } });
      if (res.ok) navigate("/thank-you");
      else { setError(t("fc.error")); setSubmitting(false); }
    } catch {
      setError(t("fc.error"));
      setSubmitting(false);
    }
  };

  return (
    <section id="free-concept" className="hc-section hc-soft">
      <div className="hc-container fc-grid">
        <div className="fc-intro">
          <span className="hc-eyebrow">{t("fc.label")}</span>
          <h2 className="hc-h2">{t("fc.title")}</h2>
          <p className="hc-section-description">{t("fc.body")}</p>
          <ul className="fc-list">
            {[1, 2, 3, 4].map((n) => <li key={n}><Check size={16} strokeWidth={2.6} aria-hidden="true" />{t(`fc.get.${n}`)}</li>)}
          </ul>
          <p className="fc-spots">{t("fc.spots")}</p>
        </div>
        <form className="fc-form" onSubmit={onSubmit}>
          <input type="hidden" name="source" value="bluluma healthcare free homepage concept" />
          <input type="hidden" name="_t" value={loadedAt} />
          <div aria-hidden="true" style={{ position: "absolute", left: "-10000px", width: 1, height: 1, overflow: "hidden" }}>
            <label htmlFor="fc-hp">Leave this field empty</label>
            <input type="text" id="fc-hp" name="website_hp" tabIndex={-1} autoComplete="off" defaultValue="" />
          </div>
          <div className="fc-row">
            <label>{t("fc.name")} *<input name="name" type="text" required maxLength={100} autoComplete="name" /></label>
            <label>{t("fc.email")} *<input name="email" type="email" required maxLength={255} autoComplete="email" /></label>
          </div>
          <div className="fc-row">
            <label>{t("fc.practice")} *<input name="practice" type="text" required maxLength={150} autoComplete="organization" /></label>
            <label>{t("fc.website")} *<input name="website" type="text" required maxLength={255} placeholder="yourclinic.ca" inputMode="url" /></label>
          </div>
          <label>{t("fc.goalQ")} *
            <select name="goal" required defaultValue="">
              <option value="" disabled>{t("fc.choose")}</option>
              {GOALS.map((g) => <option key={g} value={g}>{t(`fc.goal.${g}`)}</option>)}
            </select>
          </label>
          <fieldset>
            <legend>{t("fc.planQ")} *</legend>
            {PLANS.map((p) => <label key={p} className="fc-radio"><input type="radio" name="plans" value={p} required />{t(`fc.plan.${p}`)}</label>)}
          </fieldset>
          <Button type="submit" className="hc-button fc-submit" disabled={submitting}>{submitting ? t("fc.sending") : t("fc.submit")}</Button>
          {error && <p role="alert" className="fc-error">{error}</p>}
          <p className="fc-note">{t("fc.note")}</p>
        </form>
      </div>
    </section>
  );
}
