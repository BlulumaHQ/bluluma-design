import IndustryHeroCollage from "./IndustryHeroCollage";
import { useLang } from "@/lib/i18n";
export { BrowserChrome } from "./IndustryHeroCollage";

const HealthcareHeroCollage = () => {
  const { t } = useLang();
  return <IndustryHeroCollage windowA={{ slug: "tsai-orthodontics", domain: "tsaiorthodontics.ca" }} windowB={{ slug: "friendly-dental", domain: "friendlydental.ca" }} phoneSlug="glow-dental" note={{ tag: t("hc.newBooking"), title: t("hc.consultation"), sub: t("hc.captured") }} />;
};

export default HealthcareHeroCollage;