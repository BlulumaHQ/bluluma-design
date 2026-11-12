import SiteFinalCTA from "@/components/SiteFinalCTA";
import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useLang } from "@/lib/i18n";

const NotFound = () => {
  const location = useLocation();
  const { lang } = useLang();
  const tt = (en: string, zh: string) => (lang === "zh" ? zh : en);

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="site-page site-page-notfound">
      <section className="site-page-hero"><div className="site-container text-center">
        <h1 className="mb-4 text-4xl font-bold">404</h1>
        <p className="mb-4 text-xl text-muted-foreground">{tt("Oops! Page not found", "抱歉，找不到這個頁面")}</p>
        <Link to="/" className="text-primary underline hover:text-primary/90">
          {tt("Return to Home", "回到首頁")}
        </Link>
      </div></section>
      <SiteFinalCTA />
    </div>
  );
};

export default NotFound;
