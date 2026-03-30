import { Link } from "react-router-dom";
import logo from "@/assets/bluluma-logo.svg";
import { useLang } from "@/lib/i18n";

const Footer = () => {
  const { t } = useLang();

  const navLinks = [
    { label: "Solutions", to: "/solutions" },
    { label: "Work", to: "/work" },
    { label: "Process", to: "/process" },
    { label: "Pricing", to: "/pricing" },
    { label: "Insights", to: "/insights" },
    { label: "Contact", to: "/contact" },
  ];

  const serviceLinks = [
    { label: "Conversion Websites", to: "/solutions" },
    { label: "AI Automation", to: "/solutions" },
    { label: "Brand Identity", to: "/solutions" },
  ];

  return (
    <footer className="border-t border-border bg-card relative overflow-hidden">
      <div className="logo-motif absolute inset-0 pointer-events-none" />
      <div className="section-container py-20 md:py-24 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-14 lg:gap-16">
          {/* Brand */}
          <div>
            <img src={logo} alt="Bluluma logo" className="h-14 md:h-[75px] w-auto mb-6" />
            <p className="text-base text-muted-foreground max-w-sm leading-relaxed">
              {t("footer.desc")}
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-base font-semibold mb-5">{t("footer.navigation")}</h4>
            <nav className="flex flex-col gap-3.5">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className="text-base text-muted-foreground hover:text-primary transition-colors duration-200"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-base font-semibold mb-5">Services</h4>
            <nav className="flex flex-col gap-3.5">
              {serviceLinks.map((link) => (
                <Link
                  key={link.label}
                  to={link.to}
                  className="text-base text-muted-foreground hover:text-primary transition-colors duration-200"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-base font-semibold mb-5">{t("footer.contact")}</h4>
            <div className="flex flex-col gap-3.5 text-base text-muted-foreground">
              <span>support@bluluma.com</span>
              <span>Vancouver, BC, Canada</span>
            </div>
          </div>
        </div>

        <div className="border-t border-border mt-16 pt-10 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
          <span>
            © 2026{" "}
            <a href="https://bluluma.com" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">
              Bluluma Design
            </a>
            . All rights reserved.
          </span>
          <span>
            Web Design by{" "}
            <a href="https://bluluma.com" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">
              Bluluma
            </a>
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
