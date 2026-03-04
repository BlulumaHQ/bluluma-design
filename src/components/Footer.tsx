import { Link } from "react-router-dom";
import logo from "@/assets/bluluma-logo.svg";

const Footer = () => (
  <footer className="border-t border-border bg-background relative overflow-hidden">
    <div className="logo-motif absolute inset-0 pointer-events-none" />
    <div className="section-container py-16 md:py-20 relative z-10">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
        {/* Brand */}
        <div className="lg:col-span-2">
          <img src={logo} alt="Bluluma Design" className="h-16 mb-6" />
          <p className="text-sm text-muted-foreground max-w-sm leading-relaxed">
            Bluluma Design is a Vancouver-based digital studio specializing in websites, brand systems, and digital platforms.
          </p>
        </div>

        {/* Navigation */}
        <div>
          <h4 className="text-sm font-semibold mb-4">Navigation</h4>
          <nav className="flex flex-col gap-3">
            {[
              { label: "Work", to: "/work" },
              { label: "Industries", to: "/industries" },
              { label: "Solutions", to: "/solutions" },
              { label: "Insights", to: "/insights" },
              { label: "Contact", to: "/contact" },
            ].map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        {/* Contact */}
        <div>
          <h4 className="text-sm font-semibold mb-4">Contact</h4>
          <div className="flex flex-col gap-3 text-sm text-muted-foreground">
            <span>hello@blulumadesign.com</span>
            <span>Vancouver, BC, Canada</span>
          </div>
        </div>
      </div>

      <div className="border-t border-border mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-muted-foreground">
        <span>© Bluluma Design</span>
        <span>Web Design by Bluluma</span>
      </div>
    </div>
  </footer>
);

export default Footer;
