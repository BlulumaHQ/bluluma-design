// Single source of truth for Bluluma package pricing (Nov 2026).
// Same package price for every core industry; everything else is a custom quote.
export const PACKAGE_SETUP = "$1,500";
export const PACKAGE_MONTHLY = "$199";

export type PackageVariant = "generic" | "healthcare" | "realtor" | "presale";

type Bi = { en: string; zh: string };

export const PACKAGE_NAME: Record<PackageVariant, Bi> = {
  generic: { en: "Growth System", zh: "成長系統方案" },
  healthcare: { en: "Clinic Growth System", zh: "診所成長系統方案" },
  realtor: { en: "Realtor Growth System", zh: "房仲成長系統方案" },
  presale: { en: "Pre-sale Launch System", zh: "預售建案上市系統方案" },
};

const LAUNCH_COMMON: Bi[] = [
  { en: "Custom design — two directions to choose from", zh: "客製化設計，提供兩種方向任你選" },
  { en: "Conversion strategy: clear offer, CTA structure, lead forms", zh: "轉換策略：清楚的訴求、CTA 結構與詢問表單" },
  { en: "SEO foundation and Google Business Profile setup", zh: "SEO 基礎架構與 Google 商家檔案設定" },
  { en: "Lead capture with instant auto-reply and notifications", zh: "詢問表單即時自動回覆與通知" },
  { en: "Mobile-first build, tested on every device", zh: "行動裝置優先，各種裝置完整測試" },
];

const LAUNCH_EXTRA: Record<PackageVariant, Bi[]> = {
  generic: [],
  healthcare: [{ en: "Service pages built for bookings", zh: "以預約為核心的服務項目頁面" }],
  realtor: [{ en: "CREA DDF® auto-listings, synced daily", zh: "CREA DDF® 自動房源，每日同步" }],
  presale: [{ en: "Teaser and VIP registration, floorplans at release", zh: "預告頁與 VIP 登記，開賣時釋出平面圖" }],
};

export const packageLaunch = (v: PackageVariant): Bi[] => [...LAUNCH_EXTRA[v], ...LAUNCH_COMMON];

export const PACKAGE_MONTHLY_ITEMS: Bi[] = [
  { en: "Hosting, SSL, backups and security updates", zh: "主機代管、SSL、備份與安全更新" },
  { en: "Up to 1 hour of content updates", zh: "每月最多 1 小時內容更新" },
  { en: "1 SEO article + Google Business Profile update", zh: "1 篇 SEO 文章與 Google 商家檔案更新" },
  { en: "2 branded image posts on 2 social platforms", zh: "2 個社群平台各 2 篇品牌圖片貼文" },
  { en: "Monthly performance report", zh: "每月成效報告" },
];

export const PACKAGE_TERM: Record<PackageVariant, Bi> = {
  generic: { en: "12-month plan. Unused hours don't roll over.", zh: "12 個月方案，未使用時數不累積。" },
  healthcare: { en: "12-month plan. Unused hours don't roll over.", zh: "12 個月方案，未使用時數不累積。" },
  realtor: { en: "12-month plan. Unused hours don't roll over.", zh: "12 個月方案，未使用時數不累積。" },
  presale: { en: "Monthly plan runs for 12 months or through your sales period.", zh: "月費方案為期 12 個月，或持續到銷售期結束。" },
};

export const CUSTOM_QUOTE_ITEMS: Bi[] = [
  { en: "AI receptionist and workflow automation", zh: "AI 接待員與流程自動化" },
  { en: "Google Ads and Meta Ads management", zh: "Google Ads 與 Meta 廣告代操" },
  { en: "Full social media management", zh: "完整社群媒體經營" },
  { en: "Video production", zh: "影片製作" },
  { en: "Businesses outside our core industries", zh: "核心產業以外的其他行業" },
];
