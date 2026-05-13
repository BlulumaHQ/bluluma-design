export type ProjectIndustry =
  | "Dental"
  | "Realtor"
  | "Restaurant"
  | "Construction"
  | "Beauty"
  | "Medical"
  | "Local Business"
  | "E-Commerce"
  | "Professional Services"
  | "Other";

export const portfolioIndustries: Array<ProjectIndustry | "All"> = [
  "All",
  "Dental",
  "Realtor",
  "Restaurant",
  "Construction",
  "Beauty",
  "Medical",
  "Local Business",
  "E-Commerce",
  "Professional Services",
  "Other",
];

export interface ProjectPreview {
  image: string;
  url?: string;
}

export interface Project {
  slug: string;
  name: string;
  industry: ProjectIndustry;
  services: string[];
  description: string;
  image: string;
  featured?: boolean;
  caseStudy?: boolean;
  liveUrl?: string;
  year: number;
  beforeImage?: string;
  previewA?: ProjectPreview;
  previewB?: ProjectPreview;
  summary?: string;
  challenge?: string;
  strategy?: string;
  outcome?: string;
}

export const projects: Project[] = [
  {
    slug: "friendly-dental",
    name: "Friendly Dental",
    industry: "Dental",
    services: ["Brand Identity", "Website Platform", "Marketing Collateral"],
    description: "Modern dental clinic brand and website designed to communicate trust, clarity, and professionalism.",
    image: "/projects/friendly-dental.jpg",
    featured: true,
    caseStudy: true,
    liveUrl: "https://friendlydental.ca",
    year: 2025,
    summary: "A conversion-focused clinic website and identity system built to make first-time patients feel confident booking care.",
    challenge: "The clinic looked modern in person but outdated online, with weak mobile calls-to-action and no consistent trust system across touchpoints.",
    strategy: "We simplified the information flow, strengthened service hierarchy, and paired a calmer healthcare brand language with clearer booking paths.",
    outcome: "The finished experience feels credible, welcoming, and easier to convert from search and referral traffic.",
  },
  {
    slug: "live-at-headwater",
    name: "Live at Headwater",
    industry: "Realtor",
    services: ["Brand Identity", "Website Platform", "Marketing Collateral"],
    description: "Brand identity and digital platform for a modern residential development.",
    image: "/projects/live-at-headwater.jpg",
    featured: true,
    caseStudy: true,
    liveUrl: "https://liveatheadwater.ca",
    year: 2025,
    summary: "A premium pre-sales website designed to turn development interest into qualified buyer inquiries.",
    challenge: "The project needed to sell an unfinished lifestyle and capture demand before visitors could physically experience the property.",
    strategy: "We built an editorial narrative around location, aspiration, and floor-plan discovery, with lead capture woven into the journey.",
    outcome: "The new site gave the sales team a sharper digital story and a stronger platform for early-stage buyer conversion.",
  },
  {
    slug: "btn-real-estate",
    name: "BTN Real Estate",
    industry: "Professional Services",
    services: ["Brand Identity", "Website Platform"],
    description: "Brand and website platform created for a real estate development advisory firm.",
    image: "/projects/btn-real-estate.jpg",
    featured: true,
    caseStudy: true,
    liveUrl: "https://btn.bluluma.com",
    year: 2026,
    summary: "A sharper advisory website built to position BTN as a credible strategic partner rather than another generic real estate firm.",
    challenge: "The old site undersold expertise and gave potential clients little reason to trust BTN with high-value development decisions.",
    strategy: "We used tighter messaging, restrained visual design, and clearer service pathways to emphasize authority and consultation quality.",
    outcome: "BTN now has a more premium digital presence that supports higher-trust introductions and sales conversations.",
  },
  {
    slug: "nuera-nutra",
    name: "NuEra Nutra",
    industry: "E-Commerce",
    services: ["Website Platform"],
    description: "Modern ecommerce website designed for a nutrition brand.",
    image: "/projects/nuera-nutra.jpg",
    featured: true,
    caseStudy: true,
    liveUrl: "https://nueranutra.com",
    year: 2026,
    summary: "An ecommerce storefront streamlined for product trust, repeat browsing, and clearer purchase decisions.",
    challenge: "The brand needed a cleaner online retail experience that could explain product value quickly without overwhelming shoppers.",
    strategy: "We focused on clearer product architecture, more confident visual hierarchy, and a calmer path from discovery to checkout.",
    outcome: "The site feels more premium and product-led, with a better foundation for scaling digital sales.",
  },
  {
    slug: "vita-environmental",
    name: "Vita Environmental",
    industry: "Construction",
    services: ["Website Platform"],
    description: "Professional website for an environmental construction services company.",
    image: "/projects/vita-environmental.jpg",
    liveUrl: "https://vitaenv.com",
    year: 2025,
    summary: "A service-led website that makes a technical construction offering easier to understand for commercial decision-makers.",
    challenge: "Vita needed to feel established and easy to assess, without relying on dense language or generic contractor design patterns.",
    strategy: "We restructured the content around capability, proof, and trust signals while keeping the visual system clean and direct.",
    outcome: "The result is a more credible lead-generation platform for a specialized construction business.",
  },
  {
    slug: "spa-alita",
    name: "Spa Alita",
    industry: "Beauty",
    services: ["Website Platform"],
    description: "Elegant website for a premium spa and wellness brand.",
    image: "/projects/spa-alita.jpg",
    liveUrl: "https://spaalita.ca",
    year: 2025,
    summary: "A softer luxury website that balances calm atmosphere with practical booking clarity.",
    challenge: "The brand needed to feel premium without losing ease-of-use for mobile visitors exploring treatments and making appointments.",
    strategy: "We focused on elegant pacing, service grouping, and a more polished visual rhythm that supports trust and relaxation.",
    outcome: "The website now presents the spa as a higher-value experience with a cleaner path to booking.",
  },
  {
    slug: "presotea",
    name: "PresoTea",
    industry: "Restaurant",
    services: ["Website Platform", "Marketing Collateral"],
    description: "Website and marketing materials for a popular bubble tea franchise.",
    image: "/projects/presotea.jpg",
    liveUrl: "https://presoteabc.ca/",
    year: 2024,
    summary: "A brighter franchise website built to support menu discovery, brand consistency, and franchise-wide trust.",
    challenge: "The business needed a more organized digital presence that could support customer browsing and brand perception across locations.",
    strategy: "We clarified menu presentation, tightened the brand language, and created a cleaner consumer-facing browsing experience.",
    outcome: "The new site feels more coherent and easier to use for both customers and franchise marketing.",
  },
  {
    slug: "hsin-hsin-art-framing",
    name: "Hsin Hsin Art & Framing",
    industry: "Local Business",
    services: ["Brand Identity", "Website Platform", "Marketing Collateral"],
    description: "Brand identity and website for a premium art and custom framing studio.",
    image: "/projects/hsin-hsin-art-framing.jpg",
    liveUrl: "https://hsinhsin.ca/",
    year: 2024,
    summary: "A refined local business website that showcases craftsmanship while keeping the brand approachable and service-oriented.",
    challenge: "The studio needed to communicate bespoke quality online without becoming visually cluttered or overly boutique.",
    strategy: "We paired a cleaner showcase structure with more disciplined typography and service storytelling.",
    outcome: "The site now feels more premium, more trustworthy, and easier for new clients to explore.",
  },
  {
    slug: "sonykun-design",
    name: "Sonykun Design",
    industry: "Professional Services",
    services: ["Brand Identity", "Website Platform", "Marketing Collateral"],
    description: "Brand and portfolio website for a multidisciplinary creative studio.",
    image: "/projects/sonykun-design.jpg",
    liveUrl: "https://sonykun-design.lovable.app/",
    year: 2026,
    summary: "A cleaner portfolio website built to frame creative work with stronger hierarchy and higher perceived value.",
    challenge: "The studio needed a portfolio presence that felt curated and professional, not experimental or inconsistent.",
    strategy: "We simplified project presentation, used more deliberate spacing, and created a polished browsing rhythm.",
    outcome: "The portfolio now reads as a more mature creative business and supports stronger first impressions.",
  },
  {
    slug: "kchen-construction",
    name: "K. Chen Construction Management",
    industry: "Construction",
    services: ["Brand Identity", "Website Platform", "Marketing Collateral"],
    description: "Brand identity and website for a construction management firm.",
    image: "/projects/kchen-construction.jpg",
    caseStudy: true,
    liveUrl: "https://kchencm.com/",
    year: 2026,
    summary: "A construction management brand and website designed to communicate reliability, structure, and commercial confidence.",
    challenge: "The firm needed a more established presence to match the scale and seriousness of the projects they pursue.",
    strategy: "We used clearer brand structure, stronger messaging hierarchy, and a more disciplined site architecture.",
    outcome: "The new system presents the company as more credible and easier to evaluate at a glance.",
  },
  {
    slug: "helen-lam-real-estate",
    name: "Helen Lam Real Estate",
    industry: "Realtor",
    services: ["Website Platform", "MLS IDX Integration"],
    description: "Real estate website with MLS IDX integration for property search.",
    image: "/projects/helen-lam-real-estate.jpg",
    caseStudy: true,
    liveUrl: "https://helenlam.ca/",
    year: 2025,
    summary: "A realtor website optimized for personal trust, listing discovery, and on-the-go mobile usability.",
    challenge: "The site needed to balance agent branding with practical browsing tools for active buyers and sellers.",
    strategy: "We paired stronger personal positioning with simplified property-search entry points and clearer service messaging.",
    outcome: "The experience feels more polished for clients while staying useful as a daily sales tool.",
  },
  {
    slug: "calin-club",
    name: "Calin Club",
    industry: "Other",
    services: ["Brand Identity", "Website Platform", "Marketing Collateral"],
    description: "Brand identity and website for a luxury lifestyle membership club.",
    image: "/projects/calin-club.jpg",
    liveUrl: "http://calinclub.ca/",
    year: 2024,
    summary: "A brand-led membership website built to feel more exclusive, elevated, and conversion-ready.",
    challenge: "The brand needed to signal premium membership value quickly without depending on overly flashy design gimmicks.",
    strategy: "We centered the experience on lifestyle positioning, cleaner storytelling, and more deliberate call-to-action flow.",
    outcome: "The finished site supports a more aspirational brand perception and better sign-up intent.",
  },
];
