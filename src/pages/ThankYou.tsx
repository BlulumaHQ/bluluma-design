import SiteFinalCTA from "@/components/SiteFinalCTA";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useLang } from "@/lib/i18n";
import { useDocumentMeta } from "@/lib/useDocumentMeta";

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
    gtag?: (...args: unknown[]) => void;
  }
}

const ThankYou = () => {
  const { lang } = useLang();
  const tt = (en: string, zh: string) => (lang === "zh" ? zh : en);
  useDocumentMeta({ title: tt("Thank You | Bluluma", "謝謝你｜Bluluma"), description: "" });
  useEffect(() => {
    // TODO: Replace with real Meta Pixel ID once available
    if (window.fbq) {
      window.fbq('track', 'Lead');
    }
    // TODO: Replace 'AW-XXXXXXXX/XXXXXXXX' with real Google Ads Conversion ID/Label
    if (window.gtag) {
      window.gtag('event', 'conversion', {
        'send_to': 'AW-XXXXXXXX/XXXXXXXX',
      });
    }
    // TODO: Add GA4 event tracking when GA4 property is configured
  }, []);

  return (
    <div className="site-page site-page-thankyou">
      <section className="site-page-hero ">
        <div className="section-container py-24 md:py-40 text-center">
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight">
            {tt("THANK YOU", "謝謝你")}
          </h1>
          <div className="mt-8 max-w-xl mx-auto space-y-4 text-muted-foreground">
            <p>{tt("Thank you for reaching out.", "感謝你與我們聯絡。")}</p>
            <p>
              {tt("Your message has been received and we will review your inquiry shortly.", "我們已收到你的訊息，會盡快審閱你的詢問。")}
            </p>
            <p>
              {tt("If your request is urgent, please email us directly at:", "如有急件，請直接寄信至：")}{" "}
              <a href="mailto:support@bluluma.com" className="text-foreground font-medium underline">
                support@bluluma.com
              </a>
            </p>
          </div>
          <div className="mt-10">
            <Link
              to="/"
              className="site-button inline-flex items-center px-8 py-3 bg-primary text-primary-foreground text-sm font-medium hover:bg-primary-dark transition-colors"
            >
              {tt("Back to Home", "回到首頁")}
            </Link>
          </div>
        </div>
      </section>
      <SiteFinalCTA />
    </div>
  );
};

export default ThankYou;
