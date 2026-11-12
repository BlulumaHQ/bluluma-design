import { ArrowRight, Check, Mail } from "lucide-react";
import { useLang } from "@/lib/i18n";
import { Button } from "./ui/button";
import { IndustryReveal } from "./IndustryReveal";

export default function IndustryFeatureDemo({ developer }: { developer: boolean }) {
  const { t } = useLang();
  if (developer) return <div className="ind-registration-demo">
    <div className="ind-demo-form" aria-hidden="true"><span className="ind-gold-label">{t("ind.demoLabel")}</span><div className="ind-demo-fields"><label>{t("ind.firstName")}<input disabled placeholder={t("ind.firstName")} /></label><label>{t("ind.email")}<input disabled placeholder={t("ind.email")} /></label></div><p>{t("ind.interested")}</p><div className="ind-unit-pills">{["oneBed", "twoBed", "townhome", "agent"].map((key) => <span key={key} className={key === "twoBed" ? "ind-unit-selected" : ""}>{t(`ind.${key}`)}</span>)}</div><Button disabled tabIndex={-1} className="ind-demo-submit">{t("ind.register")}</Button></div>
    <div className="ind-routing"><Mail size={20} /><span>{t("ind.routing")}</span></div>
  </div>;
  return <div className="ind-sync"><div className="ind-sync-top"><div className="ind-sync-chips"><span>CREA DDF®</span><ArrowRight size={20} /><span>yourname.ca</span></div><span className="ind-sync-status"><i />{t("ind.syncOn")}</span></div><p className="ind-sync-label">{t("ind.syncLog")}</p><div className="ind-sync-rows">{["new", "price", "sold"].map((key, i) => <IndustryReveal key={key} delay={i * 180}><div className="ind-sync-row"><span className={`ind-sync-tag ind-sync-tag-${key}`}>{t(`ind.${key}`)}</span><span>{t(`ind.sync${key[0].toUpperCase()}${key.slice(1)}`)}</span><time>8:02 AM</time></div></IndustryReveal>)}</div><div className="ind-sync-bottom"><Check size={18} />{t("ind.zeroEdits")}</div></div>;
}