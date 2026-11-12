import { useLang } from "@/lib/i18n";
import { IndustryReveal as Reveal } from "./IndustryReveal";

export default function RealtorPricing() {
  const { lang } = useLang();
  const tt = (en: string, zh: string) => lang === "zh" ? zh : en;
  const pricing = [
    {
      name: tt("Basic Realtor Website", "基礎房仲網站"),
      price: "$499",
      desc: tt("A clean, mobile-friendly Realtor website ready to launch fast.", "簡潔、行動裝置友善的房仲網站，可快速上線。"),
      features: [
        tt("Up to 5 pages", "最多 5 頁"),
        tt("Mobile-friendly design", "行動裝置友善設計"),
        tt("Contact form", "聯絡表單"),
        tt("Basic SEO structure", "基本 SEO 架構"),
        tt("Featured listing section", "精選房源區塊"),
        tt("Free hosting available", "提供免費代管選項"),
      ],
      cta: tt("Start with Basic", "選擇基礎方案"),
    },
    {
      name: tt("Business Realtor Website", "商業房仲網站"),
      price: "$875",
      desc: tt("A stronger conversion-focused website built for active Realtors.", "為活躍房仲打造、更聚焦轉換的網站。"),
      features: [
        tt("Up to 8 pages", "最多 8 頁"),
        tt("Stronger conversion layout", "更強的轉換版面"),
        tt("Feature listing pages", "精選房源頁面"),
        tt("Lead-focused CTA structure", "以客戶轉換為核心的 CTA 結構"),
        tt("Google Map / service area", "Google 地圖／服務區域"),
        tt("Basic SEO setup", "基本 SEO 設定"),
        tt("Free hosting available", "提供免費代管選項"),
      ],
      cta: tt("Start with Business", "選擇商業方案"),
      featured: true,
    },
    {
      name: tt("Premium Realtor Website", "頂級房仲網站"),
      price: "$1,499+",
      desc: tt("A fully custom system with advanced layouts and ongoing listing support.", "完全客製化系統，含進階版面與持續性房源維護。"),
      features: [
        tt("Up to 12 pages", "最多 12 頁"),
        tt("Advanced custom layout", "進階客製化版面"),
        tt("Feature listing system", "精選房源系統"),
        tt("Listing content support", "房源內容維護"),
        tt("Branding refinement", "品牌優化"),
        tt("SEO-friendly page structure", "SEO 友善頁面結構"),
        tt("Optional MLS / IDX integration as add-on", "可加購 MLS / IDX 整合"),
      ],
      cta: tt("Start with Premium", "選擇頂級方案"),
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
                {tt("Simple, accessible Realtor pricing.", "簡單、平易近人的房仲方案價格。")}
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
                    <a
                      href="/proposal"
                      className={`mt-8 inline-block text-center px-6 py-3.5 text-sm font-semibold rounded-lg ${
                        p.featured
                          ? "cta-solid"
                          : "border border-border hover:border-primary hover:text-primary transition-colors"
                      }`}
                    >
                      {p.cta}
                    </a>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>


  );
}
