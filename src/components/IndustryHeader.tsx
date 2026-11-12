import { Link, useLocation } from "react-router-dom";
import { Check, ChevronDown } from "lucide-react";
import type { CSSProperties } from "react";
import { useLang } from "@/lib/i18n";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator } from "@/components/ui/dropdown-menu";

interface Props {
  dotColor: string;
  anchors: { id: string; label: string }[];
}

/** The three industry landing pages, shown as tabs on desktop and a dropdown on small screens. */
const INDUSTRIES = [
  { path: "/healthcare", key: "hc.healthcare" },
  { path: "/real-estate", key: "ind.realtors" },
  { path: "/presale", key: "ind.developers" },
];

const IndustryHeader = ({ dotColor, anchors }: Props) => {
  const { lang, setLang, t } = useLang();
  const { pathname } = useLocation();
  const current = INDUSTRIES.find((i) => i.path === pathname) ?? INDUSTRIES[0];
  const dot = <span className="industry-dot" style={{ "--industry-dot": dotColor } as CSSProperties} />;
  const languages = (mobile = false) => (
    <div className={`industry-languages ${mobile ? "industry-languages--mobile" : "industry-desktop"}`} aria-label={t("hc.language")}>
      <Button variant="ghost" size="sm" aria-pressed={lang === "en"} onClick={() => setLang("en")}>EN</Button>
      <span aria-hidden="true">/</span>
      <Button variant="ghost" size="sm" aria-pressed={lang === "zh"} onClick={() => setLang("zh")}>中文</Button>
    </div>
  );
  return (
    <header className="industry-header">
      <div className="hc-container industry-header-inner">
        <div className="industry-lockup">
          <Link to="/" className="industry-brand" aria-label={t("hc.back")}>
            <img className="industry-logo-full" src="/images/bluluma-logo-white.svg" alt="Bluluma" />
            <img className="industry-logo-icon" src="/images/bluluma-icon-white.svg" alt="Bluluma" />
          </Link>
          <span className="industry-slash" aria-hidden="true">/</span>

          <nav className="industry-tabs" aria-label={t("hc.industries")}>
            {INDUSTRIES.map((item) => {
              const active = item.path === current.path;
              return (
                <Link key={item.path} to={item.path} className="industry-tab" aria-current={active ? "page" : undefined}>
                  {active && dot}
                  {t(item.key)}
                </Link>
              );
            })}
          </nav>

          <DropdownMenu modal={false}>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="industry-pill">{dot}{t(current.key)}<ChevronDown /></Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="industry-menu healthcare-theme" align="start" sideOffset={10} collisionPadding={12}>
              <DropdownMenuLabel className="industry-menu-label">{t("hc.industries")}</DropdownMenuLabel>
              {INDUSTRIES.map((item) => (
                <DropdownMenuItem key={item.path} asChild className={item.path === current.path ? "industry-menu-current" : ""}>
                  <Link to={item.path}>{t(item.key)}{item.path === current.path && <Check className="ml-auto h-4 w-4" />}</Link>
                </DropdownMenuItem>
              ))}
              <div className="industry-mobile-menu">
                <DropdownMenuSeparator />
                {anchors.map((anchor) => <DropdownMenuItem asChild key={anchor.id}><a href={`#${anchor.id}`}>{anchor.label}</a></DropdownMenuItem>)}
                {languages(true)}
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="industry-header-right">
          <nav className="industry-desktop industry-nav" aria-label={t("hc.navigation")}>{anchors.map((anchor) => <Button asChild variant="link" key={anchor.id}><a href={`#${anchor.id}`}>{anchor.label}</a></Button>)}</nav>
          {languages()}
          <Button asChild className="hc-button industry-proposal"><Link to="/proposal">{t("hc.proposal")}</Link></Button>
        </div>
      </div>
    </header>
  );
};

export default IndustryHeader;
