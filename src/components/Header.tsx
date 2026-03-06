import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "@/assets/bluluma-logo.svg";
import { useLang } from "@/lib/i18n";

const navLinks = [
  { labelKey: "nav.home", to: "/" },
  { labelKey: "nav.work", to: "/work" },
  { labelKey: "nav.case-studies", to: "/case-studies" },
  { labelKey: "nav.industries", to: "/industries" },
  { labelKey: "nav.services", to: "/services" },
  { labelKey: "nav.solutions", to: "/solutions" },
  { labelKey: "nav.agency", to: "/agency" },
  { labelKey: "nav.insights", to: "/insights" },
  { labelKey: "nav.contact", to: "/contact" },
];

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const { lang, setLang, t } = useLang();

  return (
    <header className="border-b border-border bg-background sticky top-0 z-50">
      <div className="section-container flex items-center justify-between h-20 md:h-24">
        <Link to="/" className="flex-shrink-0">
          <img src={logo} alt="Bluluma Design Agency logo" className="h-14 md:h-[75px] w-auto" />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`text-sm font-medium transition-colors hover:text-primary ${
                location.pathname === link.to
                  ? "text-primary"
                  : "text-foreground"
              }`}
            >
              {t(link.labelKey)}
            </Link>
          ))}
          {/* Language switcher */}
          <div className="flex items-center gap-1 text-xs font-medium border border-border">
            <button
              onClick={() => setLang("en")}
              className={`px-2 py-1 transition-colors ${lang === "en" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"}`}
            >
              EN
            </button>
            <button
              onClick={() => setLang("zh")}
              className={`px-2 py-1 transition-colors ${lang === "zh" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"}`}
            >
              中文
            </button>
          </div>
        </nav>

        {/* Mobile toggle + lang switcher */}
        <div className="lg:hidden flex items-center gap-3">
          <div className="flex items-center text-xs font-medium border border-border">
            <button
              onClick={() => setLang("en")}
              className={`px-2 py-1 transition-colors ${lang === "en" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"}`}
            >
              EN
            </button>
            <button
              onClick={() => setLang("zh")}
              className={`px-2 py-1 transition-colors ${lang === "zh" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"}`}
            >
              中文
            </button>
          </div>
          <button
            className="flex flex-col gap-1.5 p-2"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            <span className={`block w-6 h-px bg-foreground transition-transform ${mobileOpen ? "rotate-45 translate-y-[3.5px]" : ""}`} />
            <span className={`block w-6 h-px bg-foreground transition-opacity ${mobileOpen ? "opacity-0" : ""}`} />
            <span className={`block w-6 h-px bg-foreground transition-transform ${mobileOpen ? "-rotate-45 -translate-y-[3.5px]" : ""}`} />
          </button>
        </div>
      </div>

      {/* Mobile nav */}
      {mobileOpen && (
        <nav className="lg:hidden border-t border-border bg-background">
          <div className="section-container py-6 flex flex-col gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setMobileOpen(false)}
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  location.pathname === link.to
                    ? "text-primary"
                    : "text-foreground"
                }`}
              >
                {t(link.labelKey)}
              </Link>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
};

export default Header;
