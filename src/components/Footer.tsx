import { Link } from "react-router-dom";
import logo from "@/assets/bluluma-logo.svg";
import { useLang } from "@/lib/i18n";

const Footer = () => {
  const { t } = useLang();

  const footerLinks = [
    { labelKey: "nav.work", to: "/work" },
    { labelKey: "nav.industries", to: "/industries" },
    { labelKey: "nav.solutions", to: "/solutions" },
    { labelKey: "nav.insights", to: "/insights" },
    { labelKey: "nav.contact", to: "/contact" },
  ];

  return (
    <footer className="border-t border-border bg-background relative overflow-hidden">
      <div className="logo-motif absolute inset-0 pointer-events-none" />
      <div className="section-container py-16 md:py-20 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <img src={logo} alt="Bluluma Design Agency logo" className="h-14 md:h-[75px] w-auto mb-6" />
            <p className="text-sm text-muted-foreground max-w-sm leading-relaxed">
              {t("footer.desc")}
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-sm font-semibold mb-4">{t("footer.navigation")}</h4>
            <nav className="flex flex-col gap-3">
              {footerLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200"
                >
                  {t(link.labelKey)}
                </Link>
              ))}
            </nav>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm font-semibold mb-4">{t("footer.contact")}</h4>
            <div className="flex flex-col gap-3 text-sm text-muted-foreground">
              <span>support@bluluma.com</span>
              <span>Vancouver, BC, Canada</span>
            </div>
          </div>
        </div>

        <div className="border-t border-border mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-muted-foreground">
          <span><a href="https://bluluma.com" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">Bluluma</a> Design. Copyright © 2026 All Rights Reserved.</span>
          <span>Web Design by <a href="https://bluluma.com" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">Bluluma</a></span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
