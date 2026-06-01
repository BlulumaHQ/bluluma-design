// Canonical sidebar list for the Bluluma portfolio navigation.
// Slugs match the `categories` table in the Bluluma Central CMS.
export interface PortfolioCategoryDef {
  slug: string;
  name: string;
  nameZh: string;
  description: { en: string; zh: string };
  seoTitle: string;
}

export const PORTFOLIO_CATEGORIES: PortfolioCategoryDef[] = [
  {
    slug: "dental-healthcare",
    name: "Dental / Healthcare",
    nameZh: "牙科 / 醫療",
    description: {
      en: "Dental and healthcare website design portfolio — clinic websites built for patient trust, clear services, and booking conversion.",
      zh: "牙科與醫療網站作品集 — 為診所打造信任感與預約轉換的網站。",
    },
    seoTitle: "Dental Website Design Portfolio | Bluluma",
  },
  {
    slug: "beauty-salon-spa-wellness",
    name: "Beauty / Salon / Spa / Wellness",
    nameZh: "美容 / 沙龍 / 水療 / 健康",
    description: {
      en: "Beauty, salon, spa and wellness portfolio — elegant brand websites designed to attract premium clientele.",
      zh: "美容、沙龍、水療與健康品牌網站作品集。",
    },
    seoTitle: "Beauty & Wellness Website Design Portfolio | Bluluma",
  },
  {
    slug: "realtor",
    name: "Realtor",
    nameZh: "房地產經紀",
    description: {
      en: "Realtor website design portfolio — high-converting agent and team sites built for lead generation.",
      zh: "房地產經紀網站作品集 — 為經紀人打造的高轉換潛在客戶系統。",
    },
    seoTitle: "Realtor Website Design Portfolio | Bluluma",
  },
  {
    slug: "real-estate-development-pre-sale",
    name: "Real Estate Development",
    nameZh: "建案 / 預售屋",
    description: {
      en: "Real estate development and pre-sale website portfolio — premium project sites for developers and sales teams.",
      zh: "建案與預售屋網站作品集 — 為建商與銷售團隊打造的高端網站。",
    },
    seoTitle: "Real Estate Development Website Portfolio | Bluluma",
  },
  {
    slug: "construction-architecture-development",
    name: "Construction / Architecture / Development",
    nameZh: "建築 / 營造 / 開發",
    description: {
      en: "Construction, architecture and development portfolio — websites that showcase craftsmanship and win project bids.",
      zh: "建築、營造與開發網站作品集。",
    },
    seoTitle: "Construction Website Design Portfolio | Bluluma",
  },
  {
    slug: "education-school-training",
    name: "Education / School / Training",
    nameZh: "教育 / 學校 / 培訓",
    description: {
      en: "Education, school and training website portfolio — institutional sites that drive enrollment.",
      zh: "教育機構與培訓單位網站作品集。",
    },
    seoTitle: "Education Website Design Portfolio | Bluluma",
  },
  {
    slug: "travel-tourism",
    name: "Travel / Tourism",
    nameZh: "旅遊 / 觀光",
    description: {
      en: "Travel and tourism website portfolio — destination, tour operator and hospitality experiences.",
      zh: "旅遊與觀光網站作品集。",
    },
    seoTitle: "Travel & Tourism Website Design Portfolio | Bluluma",
  },
  {
    slug: "tattoo-creative-industry",
    name: "Tattoo / Creative Industry",
    nameZh: "刺青 / 創意產業",
    description: {
      en: "Tattoo studios and creative industry portfolio — bold artist-driven brand sites.",
      zh: "刺青與創意產業網站作品集。",
    },
    seoTitle: "Creative Industry Website Design Portfolio | Bluluma",
  },
  {
    slug: "restaurant-food-beverage",
    name: "Restaurant / Food / Beverage",
    nameZh: "餐廳 / 美食 / 飲品",
    description: {
      en: "Restaurant, food and beverage portfolio — websites that drive reservations, orders and brand identity.",
      zh: "餐廳、美食與飲品網站作品集。",
    },
    seoTitle: "Restaurant Website Design Portfolio | Bluluma",
  },
  {
    slug: "automotive",
    name: "Automotive",
    nameZh: "汽車產業",
    description: {
      en: "Automotive website portfolio — dealership, service and brand websites with measurable lead generation.",
      zh: "汽車產業網站作品集。",
    },
    seoTitle: "Automotive Website Design Portfolio | Bluluma",
  },
  {
    slug: "professional-services-corporate",
    name: "Professional Services / Corporate",
    nameZh: "專業服務 / 企業",
    description: {
      en: "Professional services and corporate portfolio — trusted, conversion-optimised websites for B2B and corporate clients.",
      zh: "專業服務與企業網站作品集。",
    },
    seoTitle: "Corporate Website Design Portfolio | Bluluma",
  },
];

// Aliases for backward compatibility / pretty URLs from the brief.
export const CATEGORY_ALIASES: Record<string, string> = {
  "real-estate-development": "real-estate-development-pre-sale",
};

export const resolveCategorySlug = (raw: string): string =>
  CATEGORY_ALIASES[raw] ?? raw;

export const findCategoryDef = (slug: string): PortfolioCategoryDef | undefined =>
  PORTFOLIO_CATEGORIES.find((c) => c.slug === resolveCategorySlug(slug));