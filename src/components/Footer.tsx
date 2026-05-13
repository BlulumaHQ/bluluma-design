import { Link } from "react-router-dom";
import logo from "@/assets/bluluma-logo.svg";
import { useLang } from "@/lib/i18n";
import { Mail, MapPin, ArrowUpRight } from "lucide-react";

const Footer = () => {
  const { t } = useLang();

  const navLinks = [
    { label: "Solutions", to: "/solutions" },
    { label: "Portfolio", to: "/portfolio" },
    { label: "Case Study", to: "/case-study" },
    { label: "Process", to: "/process" },
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

      <div className="section-container relative z-10 py-10 md:hidden">
        <img src={logo} alt="Bluluma logo" className="mb-5 h-10 w-auto" />
        <p className="mb-6 text-sm leading-relaxed" style={{ color: "hsl(220 10% 60%)" }}>
          {t("footer.desc")}
        </p>

        <div className="mb-6 flex flex-col gap-2.5 text-sm" style={{ color: "hsl(220 10% 65%)" }}>
          <a href="mailto:support@bluluma.com" className="inline-flex items-center gap-2 transition-colors hover:text-primary">
            <Mail size={14} strokeWidth={1.6} />
            support@bluluma.com
          </a>
          <span className="inline-flex items-center gap-2">
            <MapPin size={14} strokeWidth={1.6} />
            Vancouver, BC, Canada
          </span>
        </div>

        <Link to="/proposal" className="cta-solid mb-7 inline-flex h-12 w-full items-center justify-center gap-2 rounded-full text-sm font-semibold">
          {t("cta.get-strategy")}
          <ArrowUpRight size={16} />
        </Link>

        <div className="flex items-center justify-between pt-5 text-xs" style={{ borderTop: "1px solid hsl(220 14% 22%)", color: "hsl(220 10% 45%)" }}>
          <span>© 2026 Bluluma Design</span>
          <a href="https://bluluma.com" target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-primary">
            bluluma.com
          </a>
        </div>
      </div>

      <div className="section-container relative z-10 hidden py-20 md:block md:py-24">
        <div className="grid grid-cols-1 gap-14 md:grid-cols-2 lg:grid-cols-4 lg:gap-16">
          <div>
            <img src={logo} alt="Bluluma logo" className="mb-6 h-14 w-auto md:h-[75px]" />
            <p className="max-w-sm text-base leading-relaxed" style={{ color: "hsl(220 10% 55%)" }}>
              {t("footer.desc")}
            </p>
          </div>

          <div>
            <h4 className="mb-5 text-base font-semibold">{t("footer.navigation")}</h4>
            <nav className="flex flex-col gap-3.5">
              {navLinks.map((link) => (
                <Link key={link.to} to={link.to} className="text-base transition-colors duration-200 hover:text-primary" style={{ color: "hsl(220 10% 55%)" }}>
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          <div>
            <h4 className="mb-5 text-base font-semibold">Services</h4>
            <nav className="flex flex-col gap-3.5">
              {serviceLinks.map((link) => (
                <Link key={link.label} to={link.to} className="text-base transition-colors duration-200 hover:text-primary" style={{ color: "hsl(220 10% 55%)" }}>
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          <div>
            <h4 className="mb-5 text-base font-semibold">{t("footer.contact")}</h4>
            <div className="flex flex-col gap-3.5 text-base" style={{ color: "hsl(220 10% 55%)" }}>
              <span>support@bluluma.com</span>
              <span>Vancouver, BC, Canada</span>
            </div>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-center justify-between gap-4 pt-10 text-sm md:flex-row" style={{ borderTop: "1px solid hsl(220 14% 22%)", color: "hsl(220 10% 45%)" }}>
          <span>
            © 2026 <a href="https://bluluma.com" target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-primary">Bluluma Design</a>. All rights reserved.
          </span>
          <span>
            Web Design by <a href="https://bluluma.com" target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-primary">Bluluma</a>
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
