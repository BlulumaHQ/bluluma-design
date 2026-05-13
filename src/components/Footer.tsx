import { Link } from "react-router-dom";
import logo from "@/assets/bluluma-logo.svg";
import { useLang } from "@/lib/i18n";
import { Mail, MapPin, ArrowUpRight } from "lucide-react";

const Footer = () => {
  const { t } = useLang();

  const navLinks = [
    { label: "Solutions", to: "/solutions" },
    { label: "Work", to: "/work" },
    { label: "Process", to: "/process" },
    { label: "Pricing", to: "/pricing" },
    { label: "Insights", to: "/insights" },
    { label: "Request a Proposal", to: "/proposal" },
  ];

  const serviceLinks = [
    { label: "Conversion Websites", to: "/solutions" },
    { label: "AI Automation", to: "/solutions" },
    { label: "Brand Identity", to: "/solutions" },
  ];

  return (
    <footer className="section-dark relative overflow-hidden">
      <div className="logo-motif absolute inset-0 pointer-events-none" />

      {/* ───────── MOBILE FOOTER (compact, premium) ───────── */}
      <div className="md:hidden section-container relative z-10 py-10">
        <img src={logo} alt="Bluluma logo" className="h-10 w-auto mb-5" />
        <p className="text-sm leading-relaxed mb-6" style={{ color: "hsl(220 10% 60%)" }}>
          {t("footer.desc")}
        </p>

        <div className="flex flex-col gap-2.5 text-sm mb-6" style={{ color: "hsl(220 10% 65%)" }}>
          <a href="mailto:support@bluluma.com" className="inline-flex items-center gap-2 hover:text-primary transition-colors">
            <Mail size={14} strokeWidth={1.6} />
            support@bluluma.com
          </a>
          <span className="inline-flex items-center gap-2">
            <MapPin size={14} strokeWidth={1.6} />
            Vancouver, BC, Canada
          </span>
        </div>

        <Link
          to="/proposal"
          className="inline-flex items-center justify-center gap-2 w-full h-12 rounded-full cta-solid text-sm font-semibold mb-7"
        >
          {t("cta.get-strategy")}
          <ArrowUpRight size={16} />
        </Link>

        <div
          className="pt-5 flex items-center justify-between text-xs"
          style={{ borderTop: "1px solid hsl(220 14% 22%)", color: "hsl(220 10% 45%)" }}
        >
          <span>© 2026 Bluluma Design</span>
          <a href="https://bluluma.com" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
            bluluma.com
          </a>
        </div>
      </div>

      {/* ───────── DESKTOP FOOTER (unchanged structure) ───────── */}
      <div className="hidden md:block section-container py-20 md:py-24 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-14 lg:gap-16">
          {/* Brand */}
          <div>
            <img src={logo} alt="Bluluma logo" className="h-14 md:h-[75px] w-auto mb-6" />
            <p className="text-base max-w-sm leading-relaxed" style={{ color: "hsl(220 10% 55%)" }}>
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
                  className="text-base transition-colors duration-200 hover:text-primary"
                  style={{ color: "hsl(220 10% 55%)" }}
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
                  className="text-base transition-colors duration-200 hover:text-primary"
                  style={{ color: "hsl(220 10% 55%)" }}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-base font-semibold mb-5">{t("footer.contact")}</h4>
            <div className="flex flex-col gap-3.5 text-base" style={{ color: "hsl(220 10% 55%)" }}>
              <span>support@bluluma.com</span>
              <span>Vancouver, BC, Canada</span>
            </div>
          </div>
        </div>

        <div className="mt-16 pt-10 flex flex-col md:flex-row justify-between items-center gap-4 text-sm" style={{ borderTop: "1px solid hsl(220 14% 22%)", color: "hsl(220 10% 45%)" }}>
          <span>
            © 2026{" "}
            <a href="https://bluluma.com" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
              Bluluma Design
            </a>
            . All rights reserved.
          </span>
          <span>
            Web Design by{" "}
            <a href="https://bluluma.com" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
              Bluluma
            </a>
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
