import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "@/assets/bluluma-logo.svg";
import { useLang } from "@/lib/i18n";
import { ChevronDown } from "lucide-react";

interface NavItem {
  labelKey: string;
  to?: string;
  children?: { label: string; to: string }[];
}

const navItems: NavItem[] = [
  { labelKey: "nav.home", to: "/" },
  { labelKey: "nav.services", to: "/services" },
  { labelKey: "nav.portfolio", to: "/work" },
  { labelKey: "nav.insights", to: "/insights" },
  {
    labelKey: "nav.industries",
    children: [
      { label: "Realtor", to: "/realtor" },
      { label: "Dentist", to: "/dentist" },
    ],
  },
  { labelKey: "nav.contact", to: "/contact" },
];

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const { lang, setLang, t } = useLang();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-background/95 backdrop-blur-md border-b border-border shadow-sm"
          : "bg-background border-b border-transparent"
      }`}
    >
      <div className="section-container flex items-center justify-between h-20 md:h-24">
        <Link to="/" className="flex-shrink-0">
          <img src={logo} alt="Bluluma logo" className="h-14 md:h-[75px] w-auto" />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-9" ref={dropdownRef}>
          {navItems.map((item) => {
            if (item.children) {
              const isOpen = openDropdown === item.labelKey;
              return (
                <div key={item.labelKey} className="relative">
                  <button
                    onClick={() => setOpenDropdown(isOpen ? null : item.labelKey)}
                    className="text-[15px] font-semibold text-foreground hover:text-primary transition-colors flex items-center gap-1"
                  >
                    {t(item.labelKey)}
                    <ChevronDown size={14} className={`transition-transform ${isOpen ? "rotate-180" : ""}`} />
                  </button>
                  {isOpen && (
                    <div className="absolute top-full left-0 mt-2 min-w-[180px] bg-background border border-border rounded-lg shadow-lg overflow-hidden z-50">
                      {item.children.map((c) => (
                        <Link
                          key={c.to}
                          to={c.to}
                          onClick={() => setOpenDropdown(null)}
                          className="block px-4 py-3 text-sm font-medium text-foreground hover:bg-primary/5 hover:text-primary transition-colors"
                        >
                          {c.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              );
            }
            return (
              <Link
                key={item.to}
                to={item.to!}
                className={`text-[15px] font-semibold transition-colors hover:text-primary ${
                  location.pathname === item.to ? "text-primary" : "text-foreground"
                }`}
              >
                {t(item.labelKey)}
              </Link>
            );
          })}
          <Link
            to="/start"
            className="cta-solid px-6 py-2.5 text-sm font-semibold rounded-lg"
          >
            {t("cta.get-strategy-short")}
          </Link>
          <div className="flex items-center gap-1 text-xs font-medium border border-border rounded-md overflow-hidden">
            <button
              onClick={() => setLang("en")}
              className={`px-2.5 py-1.5 transition-colors ${lang === "en" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"}`}
            >
              EN
            </button>
            <button
              onClick={() => setLang("zh")}
              className={`px-2.5 py-1.5 transition-colors ${lang === "zh" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"}`}
            >
              中文
            </button>
          </div>
        </nav>

        {/* Mobile toggle */}
        <div className="lg:hidden flex items-center gap-3">
          <div className="flex items-center text-xs font-medium border border-border rounded-md overflow-hidden">
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
        <nav className="lg:hidden border-t border-border bg-background/95 backdrop-blur-md">
          <div className="section-container py-6 flex flex-col gap-4">
            {navItems.map((item) => {
              if (item.children) {
                return (
                  <div key={item.labelKey} className="flex flex-col gap-2">
                    <span className="text-base font-semibold text-foreground">
                      {t(item.labelKey)}
                    </span>
                    <div className="pl-4 flex flex-col gap-2">
                      {item.children.map((c) => (
                        <Link
                          key={c.to}
                          to={c.to}
                          onClick={() => setMobileOpen(false)}
                          className="text-sm text-muted-foreground hover:text-primary transition-colors"
                        >
                          {c.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                );
              }
              return (
                <Link
                  key={item.to}
                  to={item.to!}
                  onClick={() => setMobileOpen(false)}
                  className={`text-base font-semibold transition-colors hover:text-primary ${
                    location.pathname === item.to ? "text-primary" : "text-foreground"
                  }`}
                >
                  {t(item.labelKey)}
                </Link>
              );
            })}
            <Link
              to="/start"
              onClick={() => setMobileOpen(false)}
              className="w-full text-center cta-solid px-6 py-3.5 text-base font-semibold rounded-lg"
            >
              {t("cta.get-strategy-short")}
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
};

export default Header;
