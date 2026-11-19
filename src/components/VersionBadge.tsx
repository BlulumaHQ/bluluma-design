import { useLang } from "@/lib/i18n";
import { versionLetter } from "@/lib/displayTitle";

/** Small "Version A / B" label for portfolio items that were proposed in two versions. */
export default function VersionBadge({ title, className = "" }: { title: string; className?: string }) {
  const { lang } = useLang();
  const v = versionLetter(title);
  if (!v) return null;
  return <span className={`version-badge ${className}`}>{lang === "zh" ? `版本 ${v}` : `Version ${v}`}</span>;
}
