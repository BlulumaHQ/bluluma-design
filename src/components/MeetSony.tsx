import { Link } from "react-router-dom";
import { useLang } from "@/lib/i18n";
import { Button } from "./ui/button";
import { IndustryReveal as Reveal } from "./IndustryReveal";

export const SONY_PHOTO = "/images/team/sony-lin-creative-director-bluluma.webp";

/** Founder section. `full` is used on the Agency page; the compact version sits on the homepage. */
export default function MeetSony({ full = false }: { full?: boolean }) {
  const { t } = useLang();
  return (
    <section className={`meet-sony ${full ? "meet-sony-full" : ""}`} id="meet-sony">
      <div className="site-container meet-sony-grid">
        <Reveal className="meet-sony-photo">
          <img src={SONY_PHOTO} alt={t("sony.alt")} width={800} height={800} loading="lazy" decoding="async" />
        </Reveal>
        <Reveal delay={100} className="meet-sony-copy">
          <span className="site-eyebrow">{t("sony.label")}</span>
          <h2 className="home-h2">{t("sony.title")}</h2>
          <p className="meet-sony-body">{t(full ? "sony.bodyLong" : "sony.body")}</p>
          <dl className="meet-sony-stats">
            <div><dt>500+</dt><dd>{t("sony.stat1")}</dd></div>
            <div><dt>20+</dt><dd>{t("sony.stat2")}</dd></div>
            <div><dt>EN / 中文</dt><dd>{t("sony.stat3")}</dd></div>
          </dl>
          {!full && <Button asChild variant="link" className="home-text-link"><Link to="/agency">{t("cta.learn-more")}</Link></Button>}
        </Reveal>
      </div>
    </section>
  );
}
