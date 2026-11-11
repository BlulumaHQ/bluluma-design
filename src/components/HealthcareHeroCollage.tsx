import { useEffect, useState } from "react";
import { fetchHeroShots, type HeroShot } from "@/lib/cms";
import { useLang } from "@/lib/i18n";

export const BrowserChrome = ({ domain }: { domain: string }) => (
  <div className="hc-browser-chrome" aria-hidden="true"><span className="hc-browser-dots"><i /><i /><i /></span><span>{domain}</span></div>
);

const HealthcareHeroCollage = () => {
  const { t } = useLang();
  const [shots, setShots] = useState<HeroShot[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    let active = true;
    fetchHeroShots(["tsai-orthodontics", "friendly-dental", "glow-dental"])
      .then((data) => { if (active) setShots(data); })
      .catch(() => { if (active) setShots([]); })
      .finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, []);
  const tsai = shots.find((shot) => shot.slug === "tsai-orthodontics");
  const friendly = shots.find((shot) => shot.slug === "friendly-dental");
  const mobile = shots.find((shot) => shot.slug === "glow-dental")?.mobile_url;
  return (
    <div className="hc-collage" role="group" aria-label={t("hc.collage")} aria-busy={loading}>
      <div className={`hc-browser hc-browser-a ${loading ? "hc-skeleton" : ""}`}><BrowserChrome domain="tsaiorthodontics.ca" />{tsai?.featured_image_url && <img loading="lazy" decoding="async" src={tsai.featured_image_url} alt={t("hc.tsaiAlt")} />}</div>
      <div className={`hc-browser hc-browser-b ${loading ? "hc-skeleton" : ""}`}><BrowserChrome domain="friendlydental.ca" />{friendly?.featured_image_url && <img loading="lazy" decoding="async" src={friendly.featured_image_url} alt={t("hc.friendlyAlt")} />}</div>
      <div className={`hc-collage-phone ${loading ? "hc-skeleton" : ""}`}>{mobile && <img loading="lazy" decoding="async" src={mobile} alt={t("hc.mobileAlt")} />}</div>
      <div className="hc-booking-note"><div className="hc-booking-label"><span className="hc-dot" />{t("hc.newBooking")}</div><strong>{t("hc.consultation")}</strong><p>{t("hc.captured")}</p></div>
    </div>
  );
};

export default HealthcareHeroCollage;