import { Link } from "react-router-dom";
import { useLang } from "@/lib/i18n";
import { IndustryReveal as Reveal } from "./IndustryReveal";

export default function RealtorPricing() {
  const { lang } = useLang();
  const tt = (en: string, zh: string) => lang === "zh" ? zh : en;
  const pricing = [
    {
      name: tt("Realtor Website", "房仲網站"),
      price: "$1,500",
      desc: tt("A personal-brand Realtor website with featured listings and a lead-focused layout.", "個人品牌房仲網站，含精選房源與以客戶轉換為核心的版面。"),
      features: [
        tt("Up to 8 pages", "最多 8 頁"),
        tt("Personal-brand design", "個人品牌設計"),
        tt("Featured listing pages", "精選房源頁面"),
        tt("Lead-focused CTA structure", "以客戶轉換為核心的 CTA 結構"),
        tt("Google Map / service area", "Google 地圖／服務區域"),
        tt("Basic SEO setup", "基本 SEO 設定"),
        tt("Free hosting available", "提供免費代管選項"),
      ],
      cta: tt("Start with Realtor Website", "選擇房仲網站"),
      to: "/proposal",
    },
    {
      name: tt("Realtor + CREA Auto-Listings", "房仲網站 + CREA 自動房源"),
      price: "$2,200",
      desc: tt("Your Realtor website connected to CREA DDF®. Listings, prices and sold status sync automatically every day.", "房仲網站串接 CREA DDF®，房源、價格與成交狀態每天自動同步。"),
      features: [
        tt("Everything in Realtor Website", "包含房仲網站全部內容"),
        tt("CREA DDF® listing integration", "CREA DDF® 房源串接"),
        tt("Daily automatic listing sync", "每日自動同步房源"),
        tt("Price and status updates without logging in", "價格與狀態自動更新，不需登入後台"),
        tt("Sold listings move to Sold automatically", "成交房源自動移至已售"),
        tt("Free hosting available", "提供免費代管選項"),
      ],
      cta: tt("Start with Auto-Listings", "選擇自動房源方案"),
      to: "/proposal",
      featured: true,
    },
    {
      name: tt("Pre-sale Development Website", "預售建案網站"),
      price: "$3,500+",
      desc: tt("For developers: launch with a teaser and VIP registration, then release floorplans and pricing.", "適合建商：先以預告頁與 VIP 登記上線，開賣時再釋出平面圖與價格。"),
      features: [
        tt("Teaser and VIP registration", "預告頁與 VIP 登記"),
        tt("Floorplans and pricing at release", "開賣時釋出平面圖與價格"),
        tt("Runs through completion without rebuilding", "直到交屋都不需重建"),
        tt("Advanced custom layout", "進階客製化版面"),
        tt("SEO-friendly page structure", "SEO 友善頁面結構"),
      ],
      cta: tt("See Pre-sale Websites", "查看預售建案網站"),
      to: "/presale",
    },
  ];
  return (
        <section id="pricing" className="section-border bg-background">
          <div className="section-container section-padding">
            <Reveal>
              <span className="text-xs uppercase tracking-widest text-primary font-semibold">
                {tt("Pricing", "價格")}
              </span>
              <h2 className="mt-3 text-3xl md:text-4xl font-bold max-w-2xl">
                {tt("Clear pricing for Realtors and developers.", "給房仲與建商的清楚價格。")}
              </h2>
            </Reveal>
            <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-6">
              {pricing.map((p, i) => (
                <Reveal key={p.name} delay={i * 100}>
                  <div
                    className={`p-8 border rounded-lg h-full flex flex-col ${
                      p.featured
                        ? "border-primary bg-primary/5 shadow-lg shadow-primary/10"
                        : "border-border bg-background"
                    }`}
                  >
                    <div className="text-xs uppercase tracking-widest text-primary font-semibold">
                      {p.name}
                    </div>
                    <div className="mt-3 text-4xl font-bold">{p.price}</div>
                    <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                      {p.desc}
                    </p>
                    <ul className="mt-6 space-y-2.5 text-sm text-muted-foreground flex-1">
                      {p.features.map((f) => (
                        <li key={f} className="flex gap-2">
                          <span className="text-primary">•</span>
                          <span>{f}</span>
                        </li>
                      ))}
                    </ul>
                    <Link
                      to={p.to}
                      className={`mt-8 inline-block text-center px-6 py-3.5 text-sm font-semibold rounded-lg ${
                        p.featured
                          ? "cta-solid"
                          : "border border-border hover:border-primary hover:text-primary transition-colors"
                      }`}
                    >
                      {p.cta}
                    </Link>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>


  );
}
