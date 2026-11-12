import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useLang } from "@/lib/i18n";

/** Shared final band for interior pages that do not already have a CTA. */
export default function SiteFinalCTA() {
  const { t } = useLang();
  return (
    <section className="site-page-final">
      <div className="site-container">
        <div className="home-final site-dark">
          <h2>{t("home.finalcta.title")}</h2>
          <p>{t("home.finalcta.sub")}</p>
          <Button asChild variant="siteLight"><Link to="/proposal">{t("cta.start-project")}</Link></Button>
        </div>
      </div>
    </section>
  );
}