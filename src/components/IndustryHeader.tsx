import { Link, useLocation } from "react-router-dom";
import { Check, ChevronDown } from "lucide-react";
import type { CSSProperties } from "react";
import { useLang } from "@/lib/i18n";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import logo from "@/assets/bluluma-logo-2026.svg";

interface Props {
  industryLabel: string;
  industryLabelZh: string;
  dotColor: string;
  anchors: { id: string; label: string }[];
}

const IndustryHeader = ({ industryLabel, industryLabelZh, dotColor, anchors }: Props) => {
  const { lang, setLang, t } = useLang();
  const { pathname } = useLocation();
  const languages = (mobile = false) => (
    <div className={`industry-languages ${mobile ? "industry-languages--mobile" : "industry-desktop"}`} aria-label={t("hc.language")}>
      <Button variant="ghost" size="sm" aria-pressed={lang === "en"} onClick={() => setLang("en")}>EN</Button>
      <span aria-hidden="true">/</span>
      <Button variant="ghost" size="sm" aria-pressed={lang === "zh"} onClick={() => setLang("zh")}>中文</Button>
    </div>
  );
  return (
    <header className="industry-header healthcare-theme">
      <div className="hc-container industry-header-inner">
        <div className="industry-lockup">
          <Button asChild variant="link" className="industry-brand"><Link to="/" aria-label="Bluluma"><span className="industry-logo"><img src={logo} alt="" /></span><span className="industry-wordmark">Bluluma</span></Link></Button>
          <span className="industry-slash" aria-hidden="true">/</span>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="industry-pill"><span className="industry-dot" style={{ "--industry-dot": dotColor } as CSSProperties} />{lang === "zh" ? industryLabelZh : industryLabel}<ChevronDown /></Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="industry-menu healthcare-theme" align="start" sideOffset={10} collisionPadding={12}>
              <DropdownMenuLabel className="industry-menu-label">{t("hc.industries")}</DropdownMenuLabel>
              {[{ path: "/real-estate", key: "hc.realEstate" }, { path: "/healthcare", key: "hc.healthcare" }].map((item) => (
                <DropdownMenuItem key={item.path} asChild className={pathname === item.path ? "industry-menu-current" : ""}><Link to={item.path}>{t(item.key)}{pathname === item.path && <Check className="ml-auto h-4 w-4" />}</Link></DropdownMenuItem>
              ))}
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild className="industry-menu-back"><Link to="/">{t("hc.back")}</Link></DropdownMenuItem>
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