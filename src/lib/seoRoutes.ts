// Static, indexable routes with per-language <title> and meta description.
// Used at runtime by LocaleHead and at build time by the pre-render plugin
// (vite.config.ts), so keep this file free of "@/..." imports and React.

export interface RouteMeta {
  path: string;
  priority: number;
  /** Date this page's content or meta last changed (YYYY-MM-DD) — update it with every content edit. Feeds sitemap <lastmod>. */
  updated?: string;
  en: { title: string; description: string };
  zh: { title: string; description: string };
}

export const seoRoutes: RouteMeta[] = [
  {
    path: "/",
    priority: 1.0,
    updated: "2026-11-19",
    en: {
      title: "Vancouver Website Design for Clinics, Realtors & Pre-sale | Bluluma",
      description: "Custom websites for dental clinics, Realtors and pre-sale developers in Vancouver. 20+ years, 500+ websites, bilingual EN/中文. Clinic plans from $1,688.",
    },
    zh: {
      title: "溫哥華醫療診所、房仲與預售建案網站設計｜中英雙語｜Bluluma",
      description: "Bluluma 為溫哥華牙醫診所、房仲與預售建案打造客製中英雙語網站。20 年以上經驗、500+ 個網站，價格清楚公開。",
    },
  },
  {
    path: "/healthcare",
    priority: 0.9,
    updated: "2026-11-19",
    en: {
      title: "Dental & Medical Clinic Website Design Vancouver | Bluluma",
      description: "Clinic websites that fill your appointment book: one-tap booking, service pages and 12 months of local SEO. $1,688 setup + $149/month in Vancouver.",
    },
    zh: {
      title: "溫哥華牙醫與醫療診所網站設計｜Bluluma",
      description: "讓預約滿檔的診所網站：一鍵預約、服務頁面與 12 個月在地 SEO。建置費 $1,688＋每月 $149，溫哥華在地團隊。",
    },
  },
  {
    path: "/real-estate",
    priority: 0.9,
    updated: "2026-11-19",
    en: {
      title: "Vancouver Realtor Website Design with CREA Listings | Bluluma",
      description: "Custom REALTOR® websites with CREA DDF® listings that update themselves, auto-posted sold homes and pre-sale listings. $1,288 setup + $68/month, fully managed.",
    },
    zh: {
      title: "溫哥華房仲網站設計・CREA 房源自動同步｜Bluluma",
      description: "客製 REALTOR® 個人品牌網站，CREA DDF® 房源自動更新、成交物件自動發佈。建置費 $1,288＋每月 $68，全程代管。",
    },
  },
  {
    path: "/presale",
    priority: 0.9,
    updated: "2026-11-19",
    en: {
      title: "Pre-Sale & Development Website Design Vancouver | Bluluma",
      description: "Pre-sale project websites that fill your VIP list before launch day: registration, floorplans and leads sent straight to your sales team. From $6,888.",
    },
    zh: {
      title: "溫哥華預售屋與建案網站設計｜Bluluma",
      description: "在開賣前讓 VIP 名單滿載的建案網站：VIP 登記、戶型圖，名單即時送到銷售團隊。建案網站 $6,888 起。",
    },
  },
  {
    path: "/portfolio",
    priority: 0.8,
    en: {
      title: "Portfolio — Website Design Projects | Bluluma",
      description: "Live websites designed and built by Bluluma for healthcare, real estate, pre-sale and small businesses.",
    },
    zh: {
      title: "作品集｜Bluluma 網站設計案例",
      description: "Bluluma 為醫療、房地產、預售建案與中小企業設計並建置的上線網站。",
    },
  },
  {
    path: "/services",
    priority: 0.8,
    en: {
      title: "Services — Web Design, Branding & AI | Bluluma",
      description: "Website design and development, ecommerce, branding, AI automation and digital marketing for growing businesses.",
    },
    zh: {
      title: "服務項目｜網站設計、品牌與 AI｜Bluluma",
      description: "為成長中的企業提供網站設計與開發、電商、品牌、AI 自動化與數位行銷服務。",
    },
  },
  {
    path: "/services/web-design",
    priority: 0.7,
    en: {
      title: "Custom Website Design & Development Vancouver | Bluluma",
      description: "Custom websites built for performance, clarity, and conversion. From single-page sites to complex multi-page platforms.",
    },
    zh: {
      title: "溫哥華客製網站設計與開發｜Bluluma",
      description: "為效能、清晰度與轉換率打造的客製網站。從單頁網站到複雜的多頁平台皆能勝任。",
    },
  },
  {
    path: "/services/ecommerce-websites",
    priority: 0.7,
    en: {
      title: "Ecommerce Websites | Bluluma",
      description: "Shopify, custom-built, and hybrid ecommerce solutions designed to maximize product presentation and sales.",
    },
    zh: {
      title: "電商網站｜Bluluma",
      description: "Shopify、客製與混合式電商方案，最大化商品呈現與銷售表現。",
    },
  },
  {
    path: "/services/branding-design",
    priority: 0.7,
    en: {
      title: "Branding & Identity Design | Bluluma",
      description: "Logo design, visual identity systems, and brand guidelines that create consistent, recognizable brands.",
    },
    zh: {
      title: "品牌與識別設計｜Bluluma",
      description: "Logo 設計、視覺識別系統與品牌指南，打造一致、辨識度高的品牌。",
    },
  },
  {
    path: "/services/ai-automation",
    priority: 0.7,
    en: {
      title: "AI & Business Automation | Bluluma",
      description: "Intelligent workflows, chatbots, and automation tools that streamline operations and improve efficiency.",
    },
    zh: {
      title: "AI 與商業自動化｜Bluluma",
      description: "智慧工作流程、聊天機器人與自動化工具，簡化營運並提升效率。",
    },
  },
  {
    path: "/services/digital-marketing",
    priority: 0.7,
    en: {
      title: "Digital Marketing | Bluluma",
      description: "SEO, social media strategy, and paid advertising campaigns that drive traffic and generate leads.",
    },
    zh: {
      title: "數位行銷｜Bluluma",
      description: "SEO、社群策略與付費廣告活動，帶動流量並產生潛在客戶。",
    },
  },
  {
    path: "/solutions",
    priority: 0.6,
    en: {
      title: "Solutions | Bluluma",
      description: "Website, branding and AI solutions packaged for the way service businesses actually grow.",
    },
    zh: {
      title: "解決方案｜Bluluma",
      description: "依照服務型企業實際成長方式所規劃的網站、品牌與 AI 解決方案。",
    },
  },
  {
    path: "/industries",
    priority: 0.6,
    updated: "2026-11-19",
    en: {
      title: "Industries We Specialize In | Bluluma",
      description: "Bluluma specializes in websites for healthcare clinics, Realtors and pre-sale developers, each with its own plan. Other projects get a custom quote.",
    },
    zh: {
      title: "專精產業｜Bluluma",
      description: "Bluluma 專精醫療診所、房仲與預售建商網站，各有專屬方案；其他專案依需求報價。",
    },
  },
  {
    path: "/case-studies",
    priority: 0.6,
    en: {
      title: "Case Studies | Bluluma",
      description: "How Bluluma approaches website and brand projects: the problem, the process and the result.",
    },
    zh: {
      title: "案例研究｜Bluluma",
      description: "Bluluma 如何進行網站與品牌專案：問題、過程與成果。",
    },
  },
  {
    path: "/process",
    priority: 0.6,
    en: {
      title: "Our Website Design Process | Bluluma",
      description: "How Bluluma plans, designs, builds and launches websites: a clear, structured process from first call to launch.",
    },
    zh: {
      title: "網站設計流程｜Bluluma",
      description: "Bluluma 如何規劃、設計、建置並上線網站：從第一次溝通到上線，清楚且有系統的流程。",
    },
  },
  {
    path: "/pricing",
    priority: 0.6,
    updated: "2026-11-19",
    en: {
      title: "Website Design Pricing for Clinics, Realtors & Developers | Bluluma",
      description: "Clear plans by industry: clinics $1,688 + $149/mo, Realtors $1,288 + $68/mo, pre-sale projects from $6,888. Other projects get a custom quote.",
    },
    zh: {
      title: "網站設計價格｜診所、房仲與建商方案｜Bluluma",
      description: "各產業方案價格公開：診所 $1,688＋每月 $149、房仲 $1,288＋每月 $68、預售建案 $6,888 起。其他專案依需求報價。",
    },
  },
  {
    path: "/agency",
    priority: 0.6,
    updated: "2026-11-19",
    en: {
      title: "About Bluluma — Led by Creative Director Sony Lin",
      description: "Bluluma is a Vancouver design studio led by Sony Lin: 20+ years and 500+ websites for clinics, Realtors and pre-sale developers, in English and Chinese.",
    },
    zh: {
      title: "關於 Bluluma｜創意總監 Sony Lin 帶領的溫哥華設計工作室",
      description: "Bluluma 由創意總監 Sony Lin 帶領，20 年以上經驗、500+ 個網站，專為診所、房仲與預售建案打造中英雙語網站。",
    },
  },
  {
    path: "/insights",
    priority: 0.7,
    en: {
      title: "Insights | Bluluma",
      description: "Practical website, branding, and digital strategy insights for service businesses.",
    },
    zh: {
      title: "文章｜Bluluma",
      description: "給服務型企業的網站、品牌與數位策略實用觀點。",
    },
  },
  {
    path: "/proposal",
    priority: 0.7,
    en: {
      title: "Contact Bluluma — Start Your Project",
      description: "Tell us about your business and website goals, and we'll map the next step.",
    },
    zh: {
      title: "聯絡我們｜Bluluma",
      description: "告訴我們你的事業與網站目標，我們會幫你規劃下一步。",
    },
  },
];

export const routeMetaFor = (path: string) => {
  const clean = path !== "/" ? path.replace(/\/+$/, "") : path;
  return seoRoutes.find((r) => r.path === clean);
};
