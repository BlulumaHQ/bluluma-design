// Static, indexable routes with per-language <title> and meta description.
// Used at runtime by LocaleHead and at build time by the pre-render plugin
// (vite.config.ts), so keep this file free of "@/..." imports and React.

export interface RouteMeta {
  path: string;
  priority: number;
  en: { title: string; description: string };
  zh: { title: string; description: string };
}

export const seoRoutes: RouteMeta[] = [
  {
    path: "/",
    priority: 1.0,
    en: {
      title: "Vancouver Website Design for Clinics & Real Estate | Bluluma",
      description: "Bilingual English/Chinese websites for dental clinics, medical practices, realtors and pre-sale developers in Vancouver. Custom design built to convert.",
    },
    zh: {
      title: "溫哥華醫療診所、房仲與建案網站設計｜中英雙語｜Bluluma",
      description: "Bluluma 為溫哥華牙醫診所、醫療院所、房仲與預售建案打造高質感中英雙語網站，客製設計、專注帶來詢問與預約。",
    },
  },
  {
    path: "/healthcare",
    priority: 0.9,
    en: {
      title: "Dental & Medical Clinic Website Design Vancouver | Bluluma",
      description: "Bilingual website design for dental clinics, orthodontists and medical practices in Vancouver, with online booking, patient forms and local SEO.",
    },
    zh: {
      title: "溫哥華牙醫與醫療診所網站設計｜Bluluma",
      description: "為溫哥華牙醫診所、矯正診所與醫療院所打造中英雙語網站，包含線上預約、病患表單與在地 SEO。",
    },
  },
  {
    path: "/real-estate",
    priority: 0.9,
    en: {
      title: "Vancouver Realtor Website Design with CREA Listings | Bluluma",
      description: "Personal-brand websites for REALTORS® and teams with CREA DDF® auto-listings, bilingual design and lead capture.",
    },
    zh: {
      title: "溫哥華房仲網站設計・CREA 物件自動同步｜Bluluma",
      description: "為 REALTORS® 與房仲團隊打造個人品牌網站，CREA DDF® 物件自動上架、中英雙語設計與潛在客戶擷取。",
    },
  },
  {
    path: "/presale",
    priority: 0.9,
    en: {
      title: "Pre-Sale & Development Website Design Vancouver | Bluluma",
      description: "Project websites for developers and pre-sale marketing teams, with VIP registration, floorplans and qualified lead routing.",
    },
    zh: {
      title: "溫哥華預售屋與建案網站設計｜Bluluma",
      description: "為建商與預售行銷團隊打造建案網站，包含 VIP 登記、格局圖與合格客戶分流。",
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
    en: {
      title: "Industries We Serve | Bluluma",
      description: "Website design for healthcare, realtors, pre-sale developers and small businesses in Vancouver and beyond.",
    },
    zh: {
      title: "服務產業｜Bluluma",
      description: "為溫哥華及各地的醫療、房仲、預售建商與中小企業提供網站設計。",
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
    en: {
      title: "Custom Website Design Pricing Vancouver | Bluluma",
      description: "Website design and branding investment ranges for small businesses, clinics, realtors and pre-sale developers.",
    },
    zh: {
      title: "網站設計價格｜Bluluma",
      description: "中小企業、診所、房仲與預售建案的網站設計與品牌投資範圍。",
    },
  },
  {
    path: "/agency",
    priority: 0.6,
    en: {
      title: "About Bluluma — Vancouver Design Studio",
      description: "Bluluma is a Vancouver-based studio designing websites, brands and AI-powered tools for growing businesses.",
    },
    zh: {
      title: "關於 Bluluma｜溫哥華設計工作室",
      description: "Bluluma 是位於溫哥華的設計工作室，為成長中的企業設計網站、品牌與 AI 工具。",
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
    path: "/contact",
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
