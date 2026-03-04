export interface Project {
  slug: string;
  name: string;
  industry: string;
  services: string[];
  description: string;
  image: string;
  featured?: boolean;
  caseStudy?: boolean;
  liveUrl?: string;
}

export const projects: Project[] = [
  {
    slug: "friendly-dental",
    name: "Friendly Dental",
    industry: "Healthcare",
    services: ["Brand Identity", "Website Platform", "Marketing Collateral"],
    description: "Modern dental clinic brand and website designed to communicate trust, clarity, and professionalism.",
    image: "/projects/friendly-dental.jpg",
    featured: true,
    caseStudy: true,
    liveUrl: "https://friendlydental.ca",
  },
  {
    slug: "live-at-headwater",
    name: "Live at Headwater",
    industry: "Real Estate Development",
    services: ["Brand Identity", "Website Platform", "Marketing Collateral"],
    description: "Brand identity and digital platform for a modern residential development.",
    image: "/projects/live-at-headwater.jpg",
    featured: true,
    caseStudy: true,
    liveUrl: "https://liveatheadwater.com",
  },
  {
    slug: "btn-real-estate",
    name: "BTN Real Estate",
    industry: "Real Estate",
    services: ["Brand Identity", "Website Platform"],
    description: "Brand and website platform created for a real estate development advisory firm.",
    image: "/projects/btn-real-estate.jpg",
    featured: true,
    caseStudy: true,
    liveUrl: "https://btnrealestate.com",
  },
  {
    slug: "nuera-nutra",
    name: "NuEra Nutra",
    industry: "Ecommerce",
    services: ["Website Platform"],
    description: "Modern ecommerce website designed for a nutrition brand.",
    image: "/projects/nuera-nutra.jpg",
    featured: true,
    liveUrl: "https://nueranutra.com",
  },
  {
    slug: "vita-environmental",
    name: "Vita Environmental",
    industry: "Construction",
    services: ["Website Platform"],
    description: "Professional website for an environmental construction services company.",
    image: "/projects/vita-environmental.jpg",
    liveUrl: "https://vitaenvironmental.ca",
  },
  {
    slug: "spa-alita",
    name: "Spa Alita",
    industry: "Lifestyle",
    services: ["Website Platform"],
    description: "Elegant website for a premium spa and wellness brand.",
    image: "/projects/spa-alita.jpg",
    liveUrl: "https://spaalita.com",
  },
  {
    slug: "northshore-finance",
    name: "Northshore Finance",
    industry: "Professional Services",
    services: ["Brand Identity", "Website Platform", "Marketing Collateral"],
    description: "Brand system and digital platform for a boutique financial advisory firm.",
    image: "/projects/northshore-finance.jpg",
  },
  {
    slug: "urbanfit-gym",
    name: "UrbanFit Gym",
    industry: "Lifestyle",
    services: ["Brand Identity", "Website Platform", "Marketing Collateral"],
    description: "High-energy fitness brand website designed for member acquisition and retention.",
    image: "/projects/urbanfit-gym.jpg",
  },
  {
    slug: "pacific-interior-studio",
    name: "Pacific Interior Studio",
    industry: "Real Estate & Construction",
    services: ["Brand Identity", "Website Platform", "Marketing Collateral"],
    description: "Refined brand and portfolio website for a Vancouver interior design studio.",
    image: "/projects/pacific-interior-studio.jpg",
  },
  {
    slug: "greenleaf-landscaping",
    name: "GreenLeaf Landscaping",
    industry: "Home Services",
    services: ["Brand Identity", "Website Platform", "Marketing Collateral"],
    description: "Clean, conversion-focused website for a residential landscaping company.",
    image: "/projects/greenleaf-landscaping.jpg",
  },
  {
    slug: "bluewave-consulting",
    name: "Bluewave Consulting",
    industry: "Professional Services",
    services: ["Brand Identity", "Website Platform"],
    description: "Corporate brand and website for a management consulting firm.",
    image: "/projects/bluewave-consulting.jpg",
  },
  {
    slug: "oakridge-dental-group",
    name: "Oakridge Dental Group",
    industry: "Healthcare",
    services: ["Brand Identity", "Website Platform", "Marketing Collateral"],
    description: "Full brand system and website for a multi-location dental practice.",
    image: "/projects/oakridge-dental-group.jpg",
  },
];
