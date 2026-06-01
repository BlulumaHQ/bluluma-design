import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "@/assets/bluluma-logo.svg";
import { useLang } from "@/lib/i18n";
import { ChevronDown } from "lucide-react";

interface NavChild {
  to: string;
  label?: string;
  labelKey?: string;
}

interface NavItem {
  labelKey: string;
  to?: string;
  children?: NavChild[];
}

const navItems: NavItem[] = [
  { labelKey: "nav.home", to: "/" },
  { labelKey: "nav.services", to: "/services" },
  { labelKey: "nav.portfolio", to: "/portfolio" },
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
    setOpenDropdown(null);
    setMobileOpen(false);
  }, [location.pathname]);

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
          ? "bg-background/95 border-b border-border shadow-sm backdrop-blur-md"
          : "bg-background border-b border-transparent"
      }`}
    >
      <div className="section-container flex h-20 items-center justify-between md:h-24">
        <Link to="/" className="flex-shrink-0">
          <img src={logo} alt="Bluluma logo" className="h-14 w-auto md:h-[75px]" />
        </Link>

        <nav className="hidden items-center gap-9 lg:flex" ref={dropdownRef}>
          {navItems.map((item) => {
            if (item.children) {
              const isOpen = openDropdown === item.labelKey;
              const isActive = item.children.some((child) => location.pathname.startsWith(child.to));
              return (
                <div key={item.labelKey} className="relative">
                  <button
                    onClick={() => setOpenDropdown(isOpen ? null : item.labelKey)}
                    className={`flex items-center gap-1 text-[15px] font-semibold transition-colors ${
                      isActive ? "text-primary" : "text-foreground hover:text-primary"
                    }`}
                  >
                    {t(item.labelKey)}
                    <ChevronDown size={14} className={`transition-transform ${isOpen ? "rotate-180" : ""}`} />
                  </button>
                  {isOpen && (
                    <div className="absolute left-0 top-full z-50 mt-2 min-w-[190px] overflow-hidden rounded-lg border border-border bg-background shadow-lg">
                      {item.children.map((child) => (
                        <Link
                          key={child.to}
                          to={child.to}
                          className="block px-4 py-3 text-sm font-medium text-foreground transition-colors hover:bg-muted hover:text-primary"
                        >
                          {child.labelKey ? t(child.labelKey) : child.label}
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

          <Link to="/proposal" className="cta-solid rounded-lg px-6 py-2.5 text-sm font-semibold">
            {t("cta.get-strategy-short")}
          </Link>

          <div className="flex items-center gap-1 overflow-hidden rounded-md border border-border text-xs font-medium">
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

        <div className="flex items-center gap-3 lg:hidden">
          <div className="flex items-center overflow-hidden rounded-md border border-border text-xs font-medium">
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
          <button className="flex flex-col gap-1.5 p-2" onClick={() => setMobileOpen(!mobileOpen)} aria-label="Toggle menu">
            <span className={`block h-px w-6 bg-foreground transition-transform ${mobileOpen ? "translate-y-[3.5px] rotate-45" : ""}`} />
            <span className={`block h-px w-6 bg-foreground transition-opacity ${mobileOpen ? "opacity-0" : ""}`} />
            <span className={`block h-px w-6 bg-foreground transition-transform ${mobileOpen ? "-translate-y-[3.5px] -rotate-45" : ""}`} />
          </button>
        </div>
      </div>

      {mobileOpen && (
        <nav className="border-t border-border bg-background/95 backdrop-blur-md lg:hidden">
          <div className="section-container flex flex-col gap-4 py-6">
            {navItems.map((item) =>
              item.children ? (
                <div key={item.labelKey} className="flex flex-col gap-2">
                  <span className="text-base font-semibold text-foreground">{t(item.labelKey)}</span>
                  <div className="flex flex-col gap-2 pl-4">
                    {item.children.map((child) => (
                      <Link key={child.to} to={child.to} className="text-sm text-muted-foreground transition-colors hover:text-primary">
                        {child.labelKey ? t(child.labelKey) : child.label}
                      </Link>
                    ))}
                  </div>
                </div>
              ) : (
                <Link
                  key={item.to}
                  to={item.to!}
                  className={`text-base font-semibold transition-colors hover:text-primary ${
                    location.pathname === item.to ? "text-primary" : "text-foreground"
                  }`}
                >
                  {t(item.labelKey)}
                </Link>
              ),
            )}
            <Link to="/proposal" className="cta-solid w-full rounded-lg px-6 py-3.5 text-center text-base font-semibold">
              {t("cta.get-strategy-short")}
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
};

export default Header;
