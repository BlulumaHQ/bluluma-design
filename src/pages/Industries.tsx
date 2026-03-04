import { Link, useParams } from "react-router-dom";
import { Heart, Briefcase, Building2, Sparkles, Palette, Wrench, ShoppingCart, GraduationCap } from "lucide-react";
import { projects } from "@/lib/projects";

/* ── Project images (reuse from Work) ── */
import friendlyDental from "@/assets/projects/friendly-dental.jpg";
import liveAtHeadwater from "@/assets/projects/live-at-headwater.jpg";
import btnRealEstate from "@/assets/projects/btn-real-estate.jpg";
import nueranutra from "@/assets/projects/nuera-nutra.jpg";
import vitaEnvironmental from "@/assets/projects/vita-environmental.jpg";
import spaAlita from "@/assets/projects/spa-alita.jpg";
import northshoreFinance from "@/assets/projects/northshore-finance.jpg";
import urbanfitGym from "@/assets/projects/urbanfit-gym.jpg";
import pacificInterior from "@/assets/projects/pacific-interior-studio.jpg";
import greenleafLandscaping from "@/assets/projects/greenleaf-landscaping.jpg";
import bluewaveConsulting from "@/assets/projects/bluewave-consulting.jpg";
import oakridgeDental from "@/assets/projects/oakridge-dental-group.jpg";

const projectImages: Record<string, string> = {
  "friendly-dental": friendlyDental,
  "live-at-headwater": liveAtHeadwater,
  "btn-real-estate": btnRealEstate,
  "nuera-nutra": nueranutra,
  "vita-environmental": vitaEnvironmental,
  "spa-alita": spaAlita,
  "northshore-finance": northshoreFinance,
  "urbanfit-gym": urbanfitGym,
  "pacific-interior-studio": pacificInterior,
  "greenleaf-landscaping": greenleafLandscaping,
  "bluewave-consulting": bluewaveConsulting,
  "oakridge-dental-group": oakridgeDental,
};

interface IndustryData {
  slug: string;
  name: string;
  desc: string;
  icon: typeof Heart;
  overview: string;
  whatWeBuild: string[];
  projectSlugs: string[];
}

const industries: IndustryData[] = [
  {
    slug: "healthcare-dental",
    name: "Healthcare & Dental",
    desc: "Websites and brand systems for healthcare providers, clinics, and dental practices.",
    icon: Heart,
    overview: "Healthcare and dental practices need digital platforms that communicate trust, professionalism, and accessibility. Patients research online before booking — your website is often the first impression. We design clear, structured websites that help clinics attract new patients, explain services, and simplify the booking process. Our brand systems ensure every touchpoint — from the website to printed materials — feels cohesive and professional.",
    whatWeBuild: [
      "Patient-focused websites with online booking integration",
      "Brand identity systems for clinics and multi-location practices",
      "Service pages structured for SEO and local search visibility",
      "Marketing collateral including business cards, brochures, and signage",
      "HIPAA-aware design and accessibility considerations",
    ],
    projectSlugs: ["friendly-dental", "oakridge-dental-group"],
  },
  {
    slug: "professional-services",
    name: "Professional Services",
    desc: "Digital platforms for law firms, consultancies, and professional service providers.",
    icon: Briefcase,
    overview: "Professional services firms compete on credibility and expertise. A generic website undermines both. We build structured digital platforms that clearly communicate your capabilities, showcase relevant experience, and make it easy for prospective clients to take the next step. Whether you're a financial advisory, law firm, or management consultancy, your website should position you as the obvious choice.",
    whatWeBuild: [
      "Corporate websites with clear service architecture",
      "Brand identity systems that communicate authority and trust",
      "Case study and portfolio sections to demonstrate expertise",
      "Lead generation pages with conversion-focused UX",
      "Marketing collateral for proposals, presentations, and events",
    ],
    projectSlugs: ["northshore-finance", "bluewave-consulting"],
  },
  {
    slug: "real-estate-construction",
    name: "Real Estate & Construction",
    desc: "Websites and brand systems for developers, builders, and real estate firms.",
    icon: Building2,
    overview: "Real estate developments and construction firms require digital platforms that showcase projects with visual impact while providing the practical information buyers and investors need. We design websites that balance stunning visual presentation with structured content — floor plans, availability, location details, and contact pathways all work together to drive engagement and conversions.",
    whatWeBuild: [
      "Development marketing websites with project galleries and floor plans",
      "Brand identity for new developments and construction companies",
      "Interactive site plans and availability tools",
      "Marketing collateral for pre-sales and investor presentations",
      "SEO-optimized pages for local market visibility",
    ],
    projectSlugs: ["live-at-headwater", "vita-environmental"],
  },
  {
    slug: "lifestyle-businesses",
    name: "Lifestyle Businesses",
    desc: "Digital experiences for wellness, fitness, beauty, and lifestyle brands.",
    icon: Sparkles,
    overview: "Lifestyle brands live and die by their aesthetic. Your website needs to feel like an extension of the experience you offer — whether that's a spa, gym, yoga studio, or wellness brand. We design digital experiences that capture the atmosphere and energy of your business, making it effortless for visitors to understand what you offer and book their first visit.",
    whatWeBuild: [
      "Brand-forward websites that capture your atmosphere and energy",
      "Online booking and membership integration",
      "Visual identity systems for physical and digital touchpoints",
      "Social media templates and marketing materials",
      "Photography direction and content strategy",
    ],
    projectSlugs: ["spa-alita", "urbanfit-gym"],
  },
  {
    slug: "creative-luxury-brands",
    name: "Creative & Luxury Brands",
    desc: "High-end digital platforms for creative agencies and luxury brands.",
    icon: Palette,
    overview: "Luxury and creative brands demand a level of design refinement that most agencies cannot deliver. Every pixel matters. We create digital platforms where typography, whitespace, and motion design work together to create an experience that feels premium and intentional. Our approach prioritizes restraint and craft — the hallmarks of true luxury design.",
    whatWeBuild: [
      "Portfolio and showcase websites with refined visual design",
      "Brand identity systems with premium material specifications",
      "Editorial-style content layouts and lookbooks",
      "Ecommerce experiences designed for high-value products",
      "Print collateral with luxury finishing specifications",
    ],
    projectSlugs: ["pacific-interior-studio"],
  },
  {
    slug: "home-services",
    name: "Home Services",
    desc: "Websites for contractors, landscapers, and home service providers.",
    icon: Wrench,
    overview: "Home service businesses need websites that generate leads — not just look good. Homeowners searching for contractors, landscapers, or renovation companies make fast decisions based on professionalism and trust signals. We build clean, conversion-focused websites that clearly present your services, showcase completed projects, and make it easy for visitors to request a quote or call directly.",
    whatWeBuild: [
      "Lead-generation websites with clear service pages",
      "Before/after project galleries",
      "Local SEO optimization for service area visibility",
      "Brand identity for trucks, uniforms, and signage",
      "Google Business Profile optimization",
    ],
    projectSlugs: ["greenleaf-landscaping"],
  },
  {
    slug: "retail-ecommerce",
    name: "Retail & Ecommerce",
    desc: "Online stores and ecommerce platforms designed for conversion.",
    icon: ShoppingCart,
    overview: "Ecommerce success depends on product presentation, user experience, and trust. We design online stores that make products look their best, guide shoppers through intuitive navigation, and remove friction from the checkout process. Whether you're launching a new brand or refreshing an existing store, we build platforms that drive sales and scale with your business.",
    whatWeBuild: [
      "Custom ecommerce websites with optimized product pages",
      "Brand identity systems for retail and DTC brands",
      "Product photography direction and content strategy",
      "Conversion-optimized checkout flows",
      "Marketing collateral and packaging design",
    ],
    projectSlugs: ["nuera-nutra"],
  },
  {
    slug: "education-training",
    name: "Education & Training",
    desc: "Digital platforms for educational institutions and training providers.",
    icon: GraduationCap,
    overview: "Educational institutions and training providers need websites that clearly communicate programs, build credibility, and drive enrollment. We design structured digital platforms that organize complex program information into clear, navigable experiences. Whether you're a university department, professional training provider, or online course creator, your website should make it easy for prospective students to find what they need and take action.",
    whatWeBuild: [
      "Program and course catalog websites with clear navigation",
      "Brand identity systems for educational institutions",
      "Enrollment and registration landing pages",
      "Resource libraries and content management systems",
      "Marketing materials for recruitment campaigns",
    ],
    projectSlugs: [],
  },
];

/* ── Project Thumbnail Card ── */
const ProjectThumbnail = ({ slug }: { slug: string }) => {
  const project = projects.find((p) => p.slug === slug);
  if (!project) return null;
  const img = projectImages[slug];

  const card = (
    <div className="card-border overflow-hidden transition-all duration-300 hover:border-primary hover:-translate-y-1 group">
      <div className="aspect-[16/9] overflow-hidden border-b border-border">
        {img ? (
          <img src={img} alt={project.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.02]" loading="lazy" />
        ) : (
          <div className="w-full h-full bg-secondary" />
        )}
      </div>
      <div className="p-5">
        <h4 className="text-sm font-semibold mb-1">{project.name}</h4>
        <p className="text-xs text-muted-foreground">{project.services.join(" · ")}</p>
        <span className="text-xs font-medium text-primary mt-2 inline-block">
          {project.liveUrl ? "Visit Site ↗" : "View Project →"}
        </span>
      </div>
    </div>
  );

  if (project.liveUrl) {
    return (
      <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="block">
        {card}
      </a>
    );
  }
  return <Link to={`/work/${slug}`} className="block">{card}</Link>;
};

export const IndustriesList = () => (
  <div>
    <section className="section-border">
      <div className="section-container py-16 md:py-24">
        <h1 className="text-4xl md:text-5xl font-bold">Industries We Work With</h1>
        <p className="mt-4 text-muted-foreground max-w-xl">
          We build digital platforms for businesses across a range of industries.
        </p>
      </div>
    </section>
    <section>
      <div className="section-container section-padding">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-border border border-border">
          {industries.map((ind) => {
            const Icon = ind.icon;
            return (
              <Link
                key={ind.slug}
                to={`/industries/${ind.slug}`}
                className="group bg-background p-8 hover:bg-secondary transition-colors flex gap-4 items-start"
              >
                <Icon size={24} strokeWidth={1.5} className="text-primary flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors">{ind.name}</h3>
                  <p className="text-sm text-muted-foreground">{ind.desc}</p>
                  <span className="text-sm font-medium text-primary mt-3 inline-block">Learn More →</span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  </div>
);

export const IndustryDetail = () => {
  const { slug } = useParams();
  const industry = industries.find((i) => i.slug === slug);

  if (!industry) {
    return (
      <div className="section-container section-padding text-center">
        <h1 className="text-2xl font-bold">Industry not found</h1>
        <Link to="/industries" className="text-primary mt-4 inline-block">← Back to Industries</Link>
      </div>
    );
  }

  const Icon = industry.icon;

  return (
    <div>
      <section className="section-border">
        <div className="section-container py-16 md:py-24">
          <Link to="/industries" className="text-sm text-muted-foreground hover:text-foreground mb-6 inline-block">← Industries</Link>
          <div className="flex items-center gap-4 mb-2">
            <Icon size={28} strokeWidth={1.5} className="text-primary" />
            <h1 className="text-4xl md:text-5xl font-bold">{industry.name}</h1>
          </div>
        </div>
      </section>
      <section>
        <div className="section-container section-padding max-w-3xl">
          <div className="space-y-12">
            <div>
              <h2 className="text-2xl font-bold mb-4">Overview</h2>
              <p className="text-muted-foreground leading-relaxed">{industry.overview}</p>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4">What We Typically Build</h2>
              <ul className="space-y-2">
                {industry.whatWeBuild.map((item, i) => (
                  <li key={i} className="text-muted-foreground leading-relaxed flex gap-2">
                    <span className="text-primary mt-0.5">—</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {industry.projectSlugs.length > 0 && (
              <div>
                <h2 className="text-2xl font-bold mb-6">Featured Projects</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {industry.projectSlugs.map((s) => (
                    <ProjectThumbnail key={s} slug={s} />
                  ))}
                </div>
              </div>
            )}

            <div className="pt-8 border-t border-border">
              <Link to="/contact" className="inline-flex items-center px-6 py-3 bg-primary text-primary-foreground text-sm font-medium hover:bg-primary-dark transition-colors">
                Start a Project
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
