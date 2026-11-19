// Single source of truth for Bluluma package pricing (Nov 2026).
// Three core industries, each with its own plan. Everything else is a custom quote.
// Never hardcode these prices anywhere else — import from here.

export type IndustryVariant = "healthcare" | "realtor" | "presale";
export type PackageVariant = "generic" | IndustryVariant;

type Bi = { en: string; zh: string };

export interface IndustryPackage {
  /** Shown before the setup price, e.g. "From". */
  setupPrefix?: Bi;
  setup: string;
  monthly: string;
  /** Short note after the monthly price, e.g. "12-month plan". */
  monthlyNote: Bi;
  name: Bi;
  /** Four short lines for hero price cards. */
  highlights: Bi[];
  launch: Bi[];
  monthlyItems: Bi[];
  term: Bi;
  href: string;
}

export const INDUSTRY_ORDER: IndustryVariant[] = ["healthcare", "realtor", "presale"];

export const PACKAGES: Record<IndustryVariant, IndustryPackage> = {
  healthcare: {
    setup: "$1,688",
    monthly: "$149",
    monthlyNote: { en: "12-month plan", zh: "12 個月方案" },
    name: { en: "Clinic Growth Plan", zh: "診所成長方案" },
    highlights: [
      { en: "Custom website with one-tap booking", zh: "客製網站，一鍵預約" },
      { en: "Service pages built for bookings", zh: "以預約為核心的服務頁面" },
      { en: "12 months of local SEO", zh: "12 個月在地 SEO" },
      { en: "Hosting, updates and a monthly report", zh: "主機代管、內容更新與每月報告" },
    ],
    launch: [
      { en: "Custom design — two directions to choose from", zh: "客製化設計，提供兩種方向任你選" },
      { en: "Service pages built for bookings", zh: "以預約為核心的服務項目頁面" },
      { en: "Conversion strategy: clear offer, CTA structure, booking forms", zh: "轉換策略：清楚的訴求、CTA 結構與預約表單" },
      { en: "SEO foundation and Google Business Profile setup", zh: "SEO 基礎架構與 Google 商家檔案設定" },
      { en: "Lead capture with instant auto-reply and notifications", zh: "詢問表單即時自動回覆與通知" },
      { en: "Mobile-first build, tested on every device", zh: "行動裝置優先，各種裝置完整測試" },
    ],
    monthlyItems: [
      { en: "Hosting, SSL, backups and security updates", zh: "主機代管、SSL、備份與安全更新" },
      { en: "Up to 30 minutes of content updates", zh: "每月最多 30 分鐘內容更新" },
      { en: "1 SEO article + Google Business Profile update", zh: "1 篇 SEO 文章與 Google 商家檔案更新" },
      { en: "Monthly performance report", zh: "每月成效報告" },
    ],
    term: {
      en: "12-month plan. After 12 months: $99/month for hosting and care, or stay at $149 to keep SEO going.",
      zh: "12 個月方案。期滿後可改為每月 $99 主機與維護，或維持每月 $149 繼續 SEO。",
    },
    href: "/healthcare",
  },
  realtor: {
    setup: "$1,288",
    monthly: "$68",
    monthlyNote: { en: "12-month plan", zh: "12 個月方案" },
    name: { en: "Realtor Plan", zh: "房仲方案" },
    highlights: [
      { en: "Custom design, not a template", zh: "客製設計，不是套版" },
      { en: "CREA DDF® listings that update themselves", zh: "CREA DDF® 房源自動更新" },
      { en: "Pre-sale listings and sold homes, auto-posted", zh: "預售房源與成交物件自動發佈" },
      { en: "Fully managed — you never log in", zh: "全程代管，你完全不用登入" },
    ],
    launch: [
      { en: "Custom personal-brand design — two directions to choose from", zh: "客製個人品牌設計，提供兩種方向任你選" },
      { en: "CREA DDF® auto-listings, synced daily", zh: "CREA DDF® 自動房源，每日同步" },
      { en: "Sold listings move to Sold automatically", zh: "成交物件自動移至「已售出」" },
      { en: "Pre-sale listing manager for projects not on CREA", zh: "預售房源管理，放上 CREA 沒有的建案" },
      { en: "Lead forms with instant auto-reply", zh: "詢問表單即時自動回覆" },
      { en: "Mobile-first build, tested on every device", zh: "行動裝置優先，各種裝置完整測試" },
    ],
    monthlyItems: [
      { en: "Hosting, SSL, backups and security updates", zh: "主機代管、SSL、備份與安全更新" },
      { en: "CREA DDF® sync monitoring", zh: "CREA DDF® 同步監控" },
      { en: "Pre-sale and sold listing updates", zh: "預售與成交物件更新" },
      { en: "Up to 30 minutes of content updates", zh: "每月最多 30 分鐘內容更新" },
    ],
    term: { en: "12-month plan, then month-to-month. SEO available as an add-on.", zh: "12 個月方案，之後按月續約。SEO 可另外加購。" },
    href: "/real-estate",
  },
  presale: {
    setupPrefix: { en: "From", zh: "起價" },
    setup: "$6,888",
    monthly: "$399",
    monthlyNote: { en: "during your sales period", zh: "銷售期間" },
    name: { en: "Pre-sale Launch Plan", zh: "預售建案上市方案" },
    highlights: [
      { en: "Project launch website", zh: "建案上市網站" },
      { en: "VIP registration with auto email follow-up", zh: "VIP 登記與自動 email 跟進" },
      { en: "Floorplans buyers can browse", zh: "買家可瀏覽的戶型圖" },
      { en: "Leads sent to your sales team instantly", zh: "名單即時送到銷售團隊" },
    ],
    launch: [
      { en: "Custom project design — two directions to choose from", zh: "客製建案設計，提供兩種方向任你選" },
      { en: "Teaser page and VIP registration", zh: "預告頁與 VIP 登記" },
      { en: "Floorplans and pricing released when you're ready", zh: "依你的時程釋出戶型圖與價格" },
      { en: "Automatic email follow-up for every registrant", zh: "每位登記者自動 email 跟進" },
      { en: "Leads routed to your sales team in real time", zh: "名單即時送到銷售團隊" },
      { en: "Mobile-first build, tested on every device", zh: "行動裝置優先，各種裝置完整測試" },
    ],
    monthlyItems: [
      { en: "Hosting, SSL, backups and security updates", zh: "主機代管、SSL、備份與安全更新" },
      { en: "Up to 2 hours of updates (pricing, floorplan releases)", zh: "每月最多 2 小時更新（價目表、戶型釋出）" },
      { en: "VIP list management and exports", zh: "VIP 名單管理與匯出" },
      { en: "Monthly registration report", zh: "每月登記報告" },
    ],
    term: { en: "Monthly fee runs only during your sales period. Final quote depends on project scope.", zh: "月費只在銷售期間收取。最終報價依建案規模而定。" },
    href: "/presale",
  },
};

export const INDUSTRY_LABEL: Record<IndustryVariant, Bi> = {
  healthcare: { en: "Healthcare", zh: "醫療診所" },
  realtor: { en: "Realtors", zh: "房仲" },
  presale: { en: "Pre-sale & Developers", zh: "預售建案與開發商" },
};

export const PACKAGE_NAME: Record<PackageVariant, Bi> = {
  generic: { en: "Website plans", zh: "網站方案" },
  healthcare: PACKAGES.healthcare.name,
  realtor: PACKAGES.realtor.name,
  presale: PACKAGES.presale.name,
};

export const packageLaunch = (v: IndustryVariant): Bi[] => PACKAGES[v].launch;

/** Lowest setup price across the three plans, for "from" anchors. */
export const LOWEST_SETUP = PACKAGES.realtor.setup;

export const CUSTOM_QUOTE_ITEMS: Bi[] = [
  { en: "AI receptionist and workflow automation", zh: "AI 接待員與流程自動化" },
  { en: "Chinese or second-language version", zh: "中文或第二語言版本" },
  { en: "Google Ads and Meta Ads management", zh: "Google Ads 與 Meta 廣告代操" },
  { en: "Social media management and video", zh: "社群媒體經營與影片製作" },
  { en: "Businesses outside our three industries", zh: "三大產業以外的其他行業" },
];
