import { Outlet, useLocation, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import { ArrowUp } from "lucide-react";
import CookieConsent from "./CookieConsent";

const Layout = () => {
  const { pathname } = useLocation();
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [pathname]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPercent = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);
      setShowScrollTop(scrollPercent > 0.3);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />

      {/* Sticky CTA */}
      <Link
        to="/proposal"
        className="fixed right-0 top-1/2 -translate-y-1/2 z-40 cta-solid text-xs font-semibold px-3 py-6 hidden md:block rounded-l-md"
        style={{ writingMode: "vertical-rl", textOrientation: "mixed" }}
      >
        Request a Proposal
      </Link>

      {/* Scroll to top */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className={`fixed bottom-6 right-6 z-40 w-11 h-11 border border-border bg-background rounded-lg flex items-center justify-center transition-all duration-300 hover:border-primary hover:shadow-lg hover:shadow-primary/10 ${
          showScrollTop ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
        }`}
        aria-label="Scroll to top"
      >
        <ArrowUp size={18} strokeWidth={1.5} />
      </button>
      <CookieConsent />
    </div>
  );
};

export default Layout;
