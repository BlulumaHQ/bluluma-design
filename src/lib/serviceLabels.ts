// Portfolio service tags come from the CMS in English (portfolio_details.services).
// Chinese labels for the /zh site; unknown values and "SEO" stay as-is.
const SERVICE_ZH: Record<string, string> = {
  "Website Design": "網站設計",
  "Logo Design": "Logo 設計",
  Branding: "品牌設計",
  "Marketing Materials": "行銷物料",
  SEO: "SEO",
};

export const serviceLabel = (s: string, lang: "en" | "zh") =>
  lang === "zh" ? SERVICE_ZH[s.trim()] ?? s : s;
