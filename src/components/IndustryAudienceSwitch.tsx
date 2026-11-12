import { Link } from "react-router-dom";
import { Building2, UserRound } from "lucide-react";
import { Button } from "./ui/button";
import { useLang } from "@/lib/i18n";

export default function IndustryAudienceSwitch({ developer }: { developer: boolean }) {
  const { t } = useLang();
  return <nav className="hc-container ind-audience-wrap" aria-label={t("ind.audience")}><div className="ind-audience">
    <Button asChild variant="ghost" className={!developer ? "ind-audience-active" : ""}><Link to="/real-estate" aria-current={!developer ? "page" : undefined}><UserRound size={17} /><span>{t("ind.realtorAudience")}</span></Link></Button>
    <Button asChild variant="ghost" className={developer ? "ind-audience-active" : ""}><Link to="/presale" aria-current={developer ? "page" : undefined}><Building2 size={17} /><span>{t("ind.developerAudience")}</span></Link></Button>
  </div></nav>;
}