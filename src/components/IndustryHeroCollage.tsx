import { useEffect, useState } from "react";
import { fetchHeroShots, type HeroShot } from "@/lib/cms";
import { useLang } from "@/lib/i18n";

export const BrowserChrome = ({ domain }: { domain: string }) => (
  <div className="hc-browser-chrome" aria-hidden="true"><span className="hc-browser-dots"><i /><i /><i /></span><span>{domain}</span></div>
);

interface Props {
  windowA: { slug: string; domain: string };
  windowB: { slug: string; domain: string };
  phoneSlug: string;
  note: { tag: string; title: string; sub: string };
}

export default function IndustryHeroCollage({ windowA, windowB, phoneSlug, note }: Props) {
  const { t } = useLang();
  const [shots, setShots] = useState<HeroShot[]>([]);
  const [loading, setLoading] = useState(true);
  const a = windowA.slug, b = windowB.slug;
  useEffect(() => {
    let active = true;
    setLoading(true);
    fetchHeroShots([a, b, phoneSlug]).then((data) => { if (active) setShots(data); })
      .catch(() => { if (active) setShots([]); }).finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, [a, b, phoneSlug]);
  const mobile = shots.find((shot) => shot.slug === phoneSlug)?.mobile_url;
  return <div className="hc-collage" role="group" aria-label={t("ind.collage")} aria-busy={loading}>
    {[windowA, windowB].map((window, index) => <div key={index} className={`hc-browser hc-browser-${index === 0 ? "a" : "b"} ${loading ? "hc-skeleton" : ""}`}><BrowserChrome domain={window.domain} />{shots.find((shot) => shot.slug === window.slug)?.featured_image_url && <img loading="lazy" decoding="async" src={shots.find((shot) => shot.slug === window.slug)?.featured_image_url ?? undefined} alt={`${window.domain} ${t("hc.homepage")}`} />}</div>)}
    <div className={`hc-collage-phone ${loading ? "hc-skeleton" : ""}`}>{mobile && <img loading="lazy" decoding="async" src={mobile} alt={`${phoneSlug} ${t("ind.mobile")}`} />}</div>
    <div className="hc-booking-note"><div className="hc-booking-label"><span className="hc-dot" />{note.tag}</div><strong>{note.title}</strong><p>{note.sub}</p></div>
  </div>;
}