// Canonical sidebar list for the Bluluma portfolio navigation.
// `slug` is the pretty URL slug used by the site. The underlying CMS
// category slug(s) it queries are declared in CATEGORY_DB_SLUGS below.
export interface PortfolioCategoryDef {
  slug: string;
  name: string;
  nameZh: string;
  description: { en: string; zh: string };
  seoTitle: string;
}

// Alphabetical order. "Others" is pinned to the bottom; "All Projects" is
// rendered separately by the sidebar above this list.
export const PORTFOLIO_CATEGORIES: PortfolioCategoryDef[] = [
  {
    slug: "artist-tattoo-creative-industry",
    name: "Artist / Tattoo / Creative Industry",
    nameZh: "藝術家 / 刺青 / 創意產業",
    description: {
      en: "Tattoo studios and creative industry portfolio — bold artist-driven brand sites.",
      zh: "刺青與創意產業網站作品集。",
    },
    seoTitle: "Creative Industry Website Design Portfolio | Bluluma",
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
    slug: "construction-architecture",
    name: "Construction / Architecture",
    nameZh: "建築 / 營造",
    description: {
      en: "Construction, architecture and development portfolio — websites that showcase craftsmanship and win project bids.",
      zh: "建築、營造與開發網站作品集。",
    },
    seoTitle: "Construction Website Design Portfolio | Bluluma",
  },
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
    slug: "ecommerce-online-store",
    name: "E-commerce / Online Store",
    nameZh: "電商 / 網路商店",
    description: {
      en: "E-commerce and online store portfolio — product, retail and digital storefronts built for conversion.",
      zh: "電商與網路商店作品集 — 為零售與品牌打造的高轉換購物網站。",
    },
    seoTitle: "E-commerce Website Design Portfolio | Bluluma",
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
    slug: "professional-services-corporate",
    name: "Professional Services / Corporate",
    nameZh: "專業服務 / 企業",
    description: {
      en: "Professional services and corporate portfolio — trusted, conversion-optimised websites for B2B and corporate clients.",
      zh: "專業服務與企業網站作品集。",
    },
    seoTitle: "Corporate Website Design Portfolio | Bluluma",
  },
  {
    slug: "real-estate-development-presale",
    name: "Real Estate Development / Presale",
    nameZh: "建案 / 預售屋",
    description: {
      en: "Real estate development and pre-sale website portfolio — premium project sites for developers and sales teams.",
      zh: "建案與預售屋網站作品集 — 為建商與銷售團隊打造的高端網站。",
    },
    seoTitle: "Real Estate Development Website Portfolio | Bluluma",
  },
  {
    slug: "realtor-realty",
    name: "Realtor / Realty",
    nameZh: "房地產經紀 / 房仲",
    description: {
      en: "Realtor website design portfolio — high-converting agent and team sites built for lead generation.",
      zh: "房地產經紀網站作品集 — 為經紀人打造的高轉換潛在客戶系統。",
    },
    seoTitle: "Realtor Website Design Portfolio | Bluluma",
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
    slug: "travel-tourism-hotel",
    name: "Travel / Tourism / Hotel",
    nameZh: "旅遊 / 觀光 / 酒店",
    description: {
      en: "Travel and tourism website portfolio — destination, tour operator and hospitality experiences.",
      zh: "旅遊與觀光網站作品集。",
    },
    seoTitle: "Travel & Tourism Website Design Portfolio | Bluluma",
  },
  {
    slug: "others",
    name: "Others",
    nameZh: "其他",
    description: {
      en: "Other client projects that don't fit a single industry vertical.",
      zh: "其他不屬於特定產業類別的客戶作品。",
    },
    seoTitle: "Other Projects Portfolio | Bluluma",
  },
];

// Sidebar slug → list of underlying CMS category slugs that roll up into it.
// Where the sidebar slug differs from the CMS slug, the CMS slug must be
// listed here so queries against the CMS use the real slug.
export const CATEGORY_DB_SLUGS: Record<string, string[]> = {
  "artist-tattoo-creative-industry": ["tattoo-creative-industry"],
  "construction-architecture": ["construction-architecture-development"],
  "professional-services-corporate": [
    "professional-services-corporate",
    "automotive",
  ],
  "real-estate-development-presale": ["real-estate-development-pre-sale"],
  "realtor-realty": ["realtor"],
  "travel-tourism-hotel": ["travel-tourism"],
  // E-commerce has no existing CMS slug yet; left empty until tagged.
  "ecommerce-online-store": [],
};

// CMS slugs that are intentionally not shown as their own sidebar entry.
// Items in these categories are merged into another bucket via CATEGORY_DB_SLUGS.
export const HIDDEN_CMS_CATEGORY_SLUGS = new Set<string>(["automotive"]);

// All CMS slugs that map to a visible sidebar entry. Anything outside this
// set is bucketed under "others".
export const VISIBLE_CMS_CATEGORY_SLUGS: Set<string> = new Set(
  PORTFOLIO_CATEGORIES.flatMap((c) =>
    c.slug === "others" ? [] : (CATEGORY_DB_SLUGS[c.slug] ?? [c.slug]),
  ),
);

// Reverse map: CMS category slug → sidebar slug it should display under.
export const CMS_SLUG_TO_SIDEBAR: Record<string, string> = (() => {
  const map: Record<string, string> = {};
  PORTFOLIO_CATEGORIES.forEach((c) => {
    if (c.slug === "others") return;
    const dbSlugs = CATEGORY_DB_SLUGS[c.slug] ?? [c.slug];
    dbSlugs.forEach((s) => {
      map[s] = c.slug;
    });
  });
  return map;
})();

export const OTHERS_SLUG = "others";

// Aliases for backward compatibility / pretty URLs.
// Old route slug → new sidebar slug.
export const CATEGORY_ALIASES: Record<string, string> = {
  // Pre-rename routes
  "real-estate-development": "real-estate-development-presale",
  "real-estate-development-pre-sale": "real-estate-development-presale",
  realtor: "realtor-realty",
  "tattoo-creative-industry": "artist-tattoo-creative-industry",
  "construction-architecture-development": "construction-architecture",
  "travel-tourism": "travel-tourism-hotel",
  // Retired sidebar category — redirect to the merged bucket.
  automotive: "professional-services-corporate",
};

export const resolveCategorySlug = (raw: string): string =>
  CATEGORY_ALIASES[raw] ?? raw;

export const findCategoryDef = (slug: string): PortfolioCategoryDef | undefined =>
  PORTFOLIO_CATEGORIES.find((c) => c.slug === resolveCategorySlug(slug));