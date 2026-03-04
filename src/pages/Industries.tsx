import { Link, useParams } from "react-router-dom";
import { Heart, Briefcase, Building2, Sparkles, Palette, Wrench, ShoppingCart, GraduationCap } from "lucide-react";
import { projects } from "@/lib/projects";
import { useLang } from "@/lib/i18n";

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
  nameKey: string;
  descKey: string;
  overviewKey: string;
  icon: typeof Heart;
  whatWeBuildKeys: string[];
  projectSlugs: string[];
}

const industries: IndustryData[] = [
  {
    slug: "healthcare-dental",
    nameKey: "ind.healthcare-dental",
    descKey: "ind.healthcare-dental.desc",
    overviewKey: "ind.healthcare-dental.overview",
    icon: Heart,
    whatWeBuildKeys: ["ind.healthcare-dental.wb.1", "ind.healthcare-dental.wb.2", "ind.healthcare-dental.wb.3", "ind.healthcare-dental.wb.4", "ind.healthcare-dental.wb.5"],
    projectSlugs: ["friendly-dental", "oakridge-dental-group"],
  },
  {
    slug: "professional-services",
    nameKey: "ind.professional-services",
    descKey: "ind.professional-services.desc",
    overviewKey: "ind.professional-services.overview",
    icon: Briefcase,
    whatWeBuildKeys: ["ind.professional-services.wb.1", "ind.professional-services.wb.2", "ind.professional-services.wb.3", "ind.professional-services.wb.4", "ind.professional-services.wb.5"],
    projectSlugs: ["northshore-finance", "bluewave-consulting"],
  },
  {
    slug: "real-estate-construction",
    nameKey: "ind.real-estate-construction",
    descKey: "ind.real-estate-construction.desc",
    overviewKey: "ind.real-estate-construction.overview",
    icon: Building2,
    whatWeBuildKeys: ["ind.real-estate-construction.wb.1", "ind.real-estate-construction.wb.2", "ind.real-estate-construction.wb.3", "ind.real-estate-construction.wb.4", "ind.real-estate-construction.wb.5"],
    projectSlugs: ["live-at-headwater", "vita-environmental"],
  },
  {
    slug: "lifestyle-businesses",
    nameKey: "ind.lifestyle-businesses",
    descKey: "ind.lifestyle-businesses.desc",
    overviewKey: "ind.lifestyle-businesses.overview",
    icon: Sparkles,
    whatWeBuildKeys: ["ind.lifestyle-businesses.wb.1", "ind.lifestyle-businesses.wb.2", "ind.lifestyle-businesses.wb.3", "ind.lifestyle-businesses.wb.4", "ind.lifestyle-businesses.wb.5"],
    projectSlugs: ["spa-alita", "urbanfit-gym"],
  },
  {
    slug: "creative-luxury-brands",
    nameKey: "ind.creative-luxury-brands",
    descKey: "ind.creative-luxury-brands.desc",
    overviewKey: "ind.creative-luxury-brands.overview",
    icon: Palette,
    whatWeBuildKeys: ["ind.creative-luxury-brands.wb.1", "ind.creative-luxury-brands.wb.2", "ind.creative-luxury-brands.wb.3", "ind.creative-luxury-brands.wb.4", "ind.creative-luxury-brands.wb.5"],
    projectSlugs: ["pacific-interior-studio"],
  },
  {
    slug: "home-services",
    nameKey: "ind.home-services",
    descKey: "ind.home-services.desc",
    overviewKey: "ind.home-services.overview",
    icon: Wrench,
    whatWeBuildKeys: ["ind.home-services.wb.1", "ind.home-services.wb.2", "ind.home-services.wb.3", "ind.home-services.wb.4", "ind.home-services.wb.5"],
    projectSlugs: ["greenleaf-landscaping"],
  },
  {
    slug: "retail-ecommerce",
    nameKey: "ind.retail-ecommerce",
    descKey: "ind.retail-ecommerce.desc",
    overviewKey: "ind.retail-ecommerce.overview",
    icon: ShoppingCart,
    whatWeBuildKeys: ["ind.retail-ecommerce.wb.1", "ind.retail-ecommerce.wb.2", "ind.retail-ecommerce.wb.3", "ind.retail-ecommerce.wb.4", "ind.retail-ecommerce.wb.5"],
    projectSlugs: ["nuera-nutra"],
  },
  {
    slug: "education-training",
    nameKey: "ind.education-training",
    descKey: "ind.education-training.desc",
    overviewKey: "ind.education-training.overview",
    icon: GraduationCap,
    whatWeBuildKeys: ["ind.education-training.wb.1", "ind.education-training.wb.2", "ind.education-training.wb.3", "ind.education-training.wb.4", "ind.education-training.wb.5"],
    projectSlugs: [],
  },
];

const serviceKeyMap: Record<string, string> = {
  "Brand Identity": "svc.brand-identity",
  "Website Platform": "svc.website-platform",
  "Marketing Collateral": "svc.marketing-collateral",
  "Website Design": "svc.website-design",
  "Ecommerce Experiences": "svc.ecommerce-experiences",
  "AI Business Automation": "svc.ai-business-automation",
  "Conversion Optimization": "svc.conversion-optimization",
};

const ProjectThumbnail = ({ slug }: { slug: string }) => {
  const project = projects.find((p) => p.slug === slug);
  const { t } = useLang();
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
        <p className="text-xs text-muted-foreground">
          {project.services.map((s) => serviceKeyMap[s] ? t(serviceKeyMap[s]) : s).join(" · ")}
        </p>
        <span className="text-xs font-medium text-primary mt-2 inline-block">
          {project.liveUrl ? t("cta.visit-site") : t("cta.view-project")}
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

export const IndustriesList = () => {
  const { t } = useLang();

  return (
    <div>
      <section className="section-border">
        <div className="section-container py-16 md:py-24">
          <h1 className="text-4xl md:text-5xl font-bold">{t("industries.title")}</h1>
          <p className="mt-4 text-muted-foreground max-w-xl">
            {t("industries.intro")}
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
                    <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors">{t(ind.nameKey)}</h3>
                    <p className="text-sm text-muted-foreground">{t(ind.descKey)}</p>
                    <span className="text-sm font-medium text-primary mt-3 inline-block">{t("cta.learn-more")}</span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
};

export const IndustryDetail = () => {
  const { slug } = useParams();
  const { t } = useLang();
  const industry = industries.find((i) => i.slug === slug);

  if (!industry) {
    return (
      <div className="section-container section-padding text-center">
        <h1 className="text-2xl font-bold">{t("industries.not-found")}</h1>
        <Link to="/industries" className="text-primary mt-4 inline-block">{t("industries.back")}</Link>
      </div>
    );
  }

  const Icon = industry.icon;

  return (
    <div>
      <section className="section-border">
        <div className="section-container py-16 md:py-24">
          <Link to="/industries" className="text-sm text-muted-foreground hover:text-foreground mb-6 inline-block">{t("industries.back")}</Link>
          <div className="flex items-center gap-4 mb-2">
            <Icon size={28} strokeWidth={1.5} className="text-primary" />
            <h1 className="text-4xl md:text-5xl font-bold">{t(industry.nameKey)}</h1>
          </div>
        </div>
      </section>
      <section>
        <div className="section-container section-padding max-w-3xl">
          <div className="space-y-12">
            <div>
              <h2 className="text-2xl font-bold mb-4">{t("industries.overview")}</h2>
              <p className="text-muted-foreground leading-relaxed">{t(industry.overviewKey)}</p>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4">{t("industries.what-we-build")}</h2>
              <ul className="space-y-2">
                {industry.whatWeBuildKeys.map((key, i) => (
                  <li key={i} className="text-muted-foreground leading-relaxed flex gap-2">
                    <span className="text-primary mt-0.5">—</span>
                    {t(key)}
                  </li>
                ))}
              </ul>
            </div>

            {industry.projectSlugs.length > 0 && (
              <div>
                <h2 className="text-2xl font-bold mb-6">{t("industries.featured")}</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {industry.projectSlugs.map((s) => (
                    <ProjectThumbnail key={s} slug={s} />
                  ))}
                </div>
              </div>
            )}

            <div className="pt-8 border-t border-border">
              <Link to="/contact" className="inline-flex items-center px-6 py-3 bg-primary text-primary-foreground text-sm font-medium hover:bg-primary-dark transition-colors">
                {t("cta.start-project")}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
