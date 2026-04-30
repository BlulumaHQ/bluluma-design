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

const dentistArticles: Article[] = [
  {
    title: "How Far Can AI Automation Go for a Dental Clinic?",
    slug: "ai-automation-for-dental-clinics",
    date: "2026-04-30",
    category: "AI Automation",
    industry: "Dentist",
    tags: ["AI", "Dental Clinic", "Automation", "Front Desk"],
    excerpt:
      "Most dental clinics still rely heavily on front desk staff for repetitive tasks. With the right setup, AI can handle a large portion of daily communication.",
    seoTitle: "AI Automation for Dental Clinics | Sonykun Design",
    metaDescription:
      "Learn how AI automation can reduce front desk workload and improve patient communication for dental clinics.",
    content: [
      "Most dental clinics still rely heavily on front desk staff for repetitive tasks. With the right setup, AI can handle a large portion of daily communication — without replacing your team.",
      "What AI Can Realistically Do Today",
      "AI can answer common questions like clinic hours, insurance coverage, pricing ranges, and service availability. These are the same questions front desk staff answer dozens of times per day.",
      "AI can also collect basic patient information before appointments, making intake faster and reducing manual data entry.",
      "Filtering Serious Inquiries",
      "A well-configured AI assistant can filter serious inquiries from general questions, so your team only spends time on conversations that actually move the business forward.",
      "Reducing Missed Calls",
      "An AI receptionist reduces workload and missed calls, especially during lunch hours, after hours, and busy mornings. Missed calls are missed patients.",
      "Operating More Efficiently",
      "Clinics can operate more efficiently without hiring additional staff. AI is not a replacement for your team — it is a layer that handles repetitive work so your staff can focus on patients.",
      "The Practical Takeaway",
      "AI automation in a dental clinic should be practical, not flashy. Start with the highest-volume questions, automate them well, and expand from there.",
    ].join("\n\n"),
  },
  {
    title: "How to Make AI Recommend Your Dental Clinic",
    slug: "make-ai-recommend-your-dental-clinic",
    date: "2026-04-30",
    category: "AEO",
    industry: "Dentist",
    tags: ["AEO", "SEO", "AI Search", "Dental Clinic"],
    excerpt:
      "Patients are starting to ask AI tools instead of Google. If your clinic is not structured properly online, AI will not mention you.",
    seoTitle: "How to Make AI Recommend Your Dental Clinic | Sonykun Design",
    metaDescription:
      "Learn how Answer Engine Optimization (AEO) helps dental clinics get recommended by AI tools like ChatGPT and Google AI.",
    content: [
      "Patients are starting to ask AI tools like ChatGPT and Google AI instead of searching directly on Google. If your clinic is not structured properly online, AI will not mention you.",
      "Why SEO Alone Is Not Enough Anymore",
      "Before, the goal was to rank on Google. A patient typed a query, scanned the results, and clicked a link.",
      "Now, AI answers the question directly. The patient may never see a list of websites — they only see the recommendation the AI gives them.",
      "What Is AEO (Answer Engine Optimization)",
      "AEO is the practice of structuring your website content so that AI tools can clearly understand who you are, what you offer, and why you are a credible answer to a patient's question.",
      "It relies on structured content, clear service descriptions, FAQ-style formatting, and consistent location and business information.",
      "What You Need on Your Website",
      "- Dedicated service pages for each treatment (cleaning, implants, Invisalign, etc.) — not one long page",
      "- FAQ sections that answer real patient questions in plain language",
      "- Consistent business information (name, address, phone, hours) across the site",
      "- A strong, organized website structure that AI can parse easily",
      "The Bottom Line",
      "If your clinic is not structured properly, AI tools will never recommend you — no matter how good your dentistry is.",
    ].join("\n\n"),
  },
  {
    title: "AI Receptionist for Dental Clinics: Save Time and Capture More Patients",
    slug: "ai-receptionist-for-dental-clinics",
    date: "2026-04-30",
    category: "AI Automation",
    industry: "Dentist",
    tags: ["AI Receptionist", "Lead Capture", "Dental Clinic", "Patient Experience"],
    excerpt:
      "An AI receptionist can handle incoming questions, reduce missed opportunities, and improve patient experience.",
    seoTitle: "AI Receptionist for Dental Clinics | Sonykun Design",
    metaDescription:
      "How an AI receptionist helps dental clinics handle inquiries, capture leads, and improve patient experience.",
    content: [
      "An AI receptionist can handle incoming questions, reduce missed opportunities, and improve patient experience — without replacing your real staff.",
      "Handling After-Hours Inquiries",
      "Most patient inquiries do not happen during business hours. Evenings and weekends are when people actually research dentists. An AI receptionist responds immediately, even when your clinic is closed.",
      "Answering Repetitive Questions Instantly",
      "Hours, pricing ranges, insurance, parking, services offered — these questions take up a large share of front desk time. AI handles them instantly and consistently.",
      "Capturing Leads Instead of Losing Them",
      "When a patient calls and no one picks up, that lead is usually gone. An AI assistant captures the name, contact info, and reason for inquiry so your team can follow up the next morning.",
      "Working Alongside Your Real Staff",
      "AI is not a replacement for human care. It works as a first layer — handling common questions and intake — so your team can focus on the conversations that matter.",
      "Improving Response Speed",
      "Faster response times mean more booked patients. In service businesses, the first clinic to respond usually wins the patient.",
      "Realistic Expectations",
      "An AI receptionist will not solve everything. It will not replace clinical judgment or personal relationships. But for the repetitive, high-volume parts of front desk work, it is a practical tool that pays for itself quickly.",
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

export const articles: Article[] = [
  ...realtorArticles,
  ...dentistArticles,
  ...legacyAsArticles,
];

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
