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
    <div className="card-border overflow-hidden transition-all duration-300 hover:border-primary hover:-translate-y-1">
      <div className="aspect-[4/3] overflow-hidden relative">
        <img
          src={imageImport}
          alt={`${project.name} — website and brand design project by Bluluma Design Agency`}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
          loading="lazy"
        />
        {isLive && (
          <span className="absolute top-4 right-4 text-xs font-semibold tracking-wide bg-background/90 backdrop-blur-sm border border-border px-3 py-1">
            {t("cta.live")}
          </span>
        )}
      </div>
      <div className="p-6">
        <h3 className="text-lg font-semibold mb-1">{project.name}</h3>
        <p className="text-sm text-muted-foreground mb-3">{project.industry}</p>
        <div className="flex flex-wrap gap-2">
          {project.services.map((service) => (
            <span
              key={service}
              className="text-xs text-muted-foreground border border-border px-2 py-1"
            >
              {serviceKeyMap[service] ? t(serviceKeyMap[service]) : service}
            </span>
          ))}
        </div>
        <span className="inline-block mt-4 text-sm font-medium text-primary">
          {isLive ? t("cta.visit-site") : t("cta.view-project")}
        </span>
      </div>
    </div>
  );

  if (isLive) {
    return (
      <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="group block">
        {cardContent}
      </a>
    );
  }

  return (
    <Link to={`/work/${project.slug}`} className="group block">
      {cardContent}
    </Link>
  );
};

export default ProjectCard;
