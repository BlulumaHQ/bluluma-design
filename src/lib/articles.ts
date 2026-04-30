import { insights as legacyInsights } from "./insights";

export type Industry = "Realtor" | "Dentist" | "General";

export interface Article {
  title: string;
  slug: string;
  date: string;
  category: string;
  industry: Industry;
  tags: string[];
  featuredImage?: string;
  excerpt: string;
  content: string;
  seoTitle: string;
  metaDescription: string;
}

const realtorArticles: Article[] = [
  {
    title: "Why Most Realtor Websites Fail to Generate Leads",
    slug: "realtor-websites-fail-to-generate-leads",
    date: "2026-04-29",
    category: "Conversion",
    industry: "Realtor",
    tags: ["Realtor Website", "Lead Generation", "Conversion", "UX"],
    excerpt:
      "Most Realtor websites look professional but fail to generate real leads.",
    seoTitle: "Why Realtor Websites Fail to Generate Leads | Bluluma",
    metaDescription:
      "Learn why most Realtor websites fail to convert visitors into leads.",
    content: [
      "Most Realtor websites are built to look professional, but not to generate leads.",
      "They typically include a homepage, a bio, a few listings, and a contact page. While this may seem complete, it does not guide visitors toward action.",
      "The real problem is not visual design. It is the lack of conversion structure.",
      "A high-performing Realtor website should clearly answer three questions within seconds:",
      "Who are you?",
      "What do you offer?",
      "What should I do next?",
      "Without clear answers, visitors leave.",
      "Common issues include:",
      "- No strong call-to-action",
      "- Listings without clear navigation",
      "- Poor mobile experience",
      "- No trust-building elements",
      "A website should not just display information. It should actively convert visitors into inquiries.",
    ].join("\n\n"),
  },
  {
    title:
      "Feature Listing Pages vs MLS Listings: What Actually Converts Better",
    slug: "feature-listings-vs-mls",
    date: "2026-04-29",
    category: "Conversion",
    industry: "Realtor",
    tags: ["MLS", "Feature Listings", "Realtor Marketing"],
    excerpt: "MLS listings are useful, but they are not designed to convert.",
    seoTitle: "Feature Listings vs MLS Listings for Realtors | Bluluma",
    metaDescription:
      "Discover why feature listing pages outperform MLS listings.",
    content: [
      "Many Realtors rely heavily on MLS listings displayed through IDX.",
      "While MLS listings are useful, they are not designed to convert.",
      "They follow a standardized format, which means every listing looks the same.",
      "A feature listing page allows Realtors to present a property in a more strategic way.",
      "Instead of showing raw data, a feature listing page can include:",
      "- Strong headline",
      "- Curated photo galleries",
      "- Lifestyle-focused descriptions",
      "- Clear call-to-action",
      "MLS listings can still play a role, but high-performing websites combine both.",
    ].join("\n\n"),
  },
  {
    title: "What Makes a High-Converting Real Estate Website in 2026",
    slug: "high-converting-real-estate-website-2026",
    date: "2026-04-29",
    category: "Website Design",
    industry: "Realtor",
    tags: ["Real Estate Website", "UX", "Conversion"],
    excerpt: "A modern real estate website needs more than good design.",
    seoTitle: "High-Converting Real Estate Website Guide 2026 | Bluluma",
    metaDescription:
      "Learn the key elements that make a real estate website convert.",
    content: [
      "A modern real estate website must combine branding, UX, and conversion strategy.",
      "The most effective Realtor websites include:",
      "- Clear positioning",
      "- Strong call-to-action",
      "- Feature listings",
      "- Mobile-first experience",
      "- Trust elements",
      "A website that looks good but lacks direction will not convert.",
    ].join("\n\n"),
  },
];

const legacyAsArticles: Article[] = legacyInsights.map((i) => {
  const content = i.sections
    .map((s) => s.heading + "\n\n" + s.body)
    .join("\n\n");
  return {
    title: i.title,
    slug: i.slug,
    date: "2026-03-01",
    category: i.tag,
    industry: "General" as Industry,
    tags: [i.tag],
    excerpt: i.summary,
    content,
    seoTitle: i.title + " | Bluluma",
    metaDescription: i.summary,
  };
});

export const articles: Article[] = [...realtorArticles, ...legacyAsArticles];

export const allCategories = Array.from(
  new Set(articles.map((a) => a.category)),
).sort();
export const allIndustries: Industry[] = ["Realtor", "Dentist", "General"];
export const allTags = Array.from(
  new Set(articles.flatMap((a) => a.tags)),
).sort();

export const getArticleBySlug = (slug: string) =>
  articles.find((a) => a.slug === slug);

export const getArticlesByIndustry = (industry: Industry) =>
  articles.filter((a) => a.industry === industry);

export const getLatestByIndustry = (industry: Industry, n = 3) =>
  getArticlesByIndustry(industry)
    .slice()
    .sort((a, b) => (a.date < b.date ? 1 : -1))
    .slice(0, n);
