import { Link } from "react-router-dom";
import type { Project } from "@/lib/projects";
import { useLang } from "@/lib/i18n";

const serviceKeyMap: Record<string, string> = {
  "Brand Identity": "svc.brand-identity",
  "Website Platform": "svc.website-platform",
  "Marketing Collateral": "svc.marketing-collateral",
  "Website Design": "svc.website-design",
  "Ecommerce Experiences": "svc.ecommerce-experiences",
  "AI Business Automation": "svc.ai-business-automation",
  "Conversion Optimization": "svc.conversion-optimization",
  "MLS IDX Integration": "MLS IDX Integration",
};

interface ProjectCardProps {
  project: Project;
  imageImport: string;
  mode?: "live" | "internal";
}

const ProjectCard = ({ project, imageImport, mode = "internal" }: ProjectCardProps) => {
  const { t } = useLang();
  const isLive = mode === "live" && project.liveUrl;

  const cardContent = (
    <div className="card-border overflow-hidden transition-all duration-300 hover:border-primary/50 hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/5 h-full flex flex-col">
      <div className="h-[240px] md:h-[260px] overflow-hidden relative flex-shrink-0">
        <img
          src={imageImport}
          alt={`${project.name} — website and brand design project by Bluluma Design Agency`}
          className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-[1.02]"
          loading="lazy"
        />
        {isLive && (
          <span className="absolute top-4 right-4 text-xs font-semibold tracking-wide bg-background/90 backdrop-blur-sm border border-border rounded px-3 py-1">
            {t("cta.live")}
          </span>
        )}
      </div>
      <div className="p-8 flex flex-col flex-grow">
        <h3 className="text-xl font-semibold mb-1">{project.name}</h3>
        <p className="text-base text-muted-foreground mb-4">{project.industry}</p>
        <div className="flex flex-wrap gap-2">
          {project.services.map((service) => (
            <span
              key={service}
              className="text-xs text-muted-foreground border border-border rounded px-2.5 py-1"
            >
              {serviceKeyMap[service] ? t(serviceKeyMap[service]) : service}
            </span>
          ))}
        </div>
        <span className="inline-block mt-auto pt-5 text-base font-medium text-primary">
          {isLive ? t("cta.visit-site") : t("cta.view-project")}
        </span>
      </div>
    </div>
  );

  if (isLive) {
    return (
      <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="group block h-full">
        {cardContent}
      </a>
    );
  }

  return (
    <Link to={`/work/${project.slug}`} className="group block h-full">
      {cardContent}
    </Link>
  );
};

export default ProjectCard;
