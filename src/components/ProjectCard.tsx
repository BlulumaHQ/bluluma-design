import { Link } from "react-router-dom";
import type { Project } from "@/lib/projects";

interface ProjectCardProps {
  project: Project;
  imageImport: string;
}

const ProjectCard = ({ project, imageImport }: ProjectCardProps) => (
  <Link to={`/work/${project.slug}`} className="group block">
    <div className="card-border overflow-hidden">
      <div className="aspect-[4/3] overflow-hidden">
        <img
          src={imageImport}
          alt={project.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
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
              {service}
            </span>
          ))}
        </div>
        <span className="inline-block mt-4 text-sm font-medium text-primary">
          View Project →
        </span>
      </div>
    </div>
  </Link>
);

export default ProjectCard;
