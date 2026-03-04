import { Link, useParams } from "react-router-dom";
import { projects } from "@/lib/projects";
import friendlyDental from "@/assets/projects/friendly-dental.jpg";
import liveAtHeadwater from "@/assets/projects/live-at-headwater.jpg";
import btnRealEstate from "@/assets/projects/btn-real-estate.jpg";

const projectImages: Record<string, string> = {
  "friendly-dental": friendlyDental,
  "live-at-headwater": liveAtHeadwater,
  "btn-real-estate": btnRealEstate,
};

const caseStudyProjects = projects.filter((p) => p.caseStudy);

export const CaseStudyList = () => (
  <div>
    <section className="section-border">
      <div className="section-container py-16 md:py-24">
        <h1 className="text-4xl md:text-5xl font-bold">Case Studies</h1>
        <p className="mt-4 text-muted-foreground max-w-xl">
          In-depth looks at how we solve design and digital challenges for our clients.
        </p>
      </div>
    </section>
    <section>
      <div className="section-container section-padding">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {caseStudyProjects.map((project) => (
            <Link
              key={project.slug}
              to={`/case-studies/${project.slug}`}
              className="group card-border overflow-hidden"
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={projectImages[project.slug]}
                  alt={project.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-6">
                <h3 className="text-lg font-semibold mb-1">{project.name}</h3>
                <p className="text-sm text-muted-foreground mb-1">{project.industry}</p>
                <span className="text-sm font-medium text-primary">Read Case Study →</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  </div>
);

export const CaseStudyDetail = () => {
  const { slug } = useParams();
  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    return (
      <div className="section-container section-padding text-center">
        <h1 className="text-2xl font-bold">Case study not found</h1>
        <Link to="/case-studies" className="text-primary mt-4 inline-block">← Back to Case Studies</Link>
      </div>
    );
  }

  return (
    <div>
      <section className="section-border">
        <div className="section-container py-16 md:py-24">
          <Link to="/case-studies" className="text-sm text-muted-foreground hover:text-foreground mb-6 inline-block">← Case Studies</Link>
          <h1 className="text-4xl md:text-5xl font-bold">{project.name}</h1>
        </div>
      </section>

      {projectImages[project.slug] && (
        <section className="section-border">
          <div className="section-container py-12">
            <div className="card-border overflow-hidden">
              <img src={projectImages[project.slug]} alt={project.name} className="w-full" />
            </div>
          </div>
        </section>
      )}

      <section>
        <div className="section-container section-padding">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div>
              <h3 className="text-label mb-2">Client</h3>
              <p className="font-medium">{project.name}</p>
            </div>
            <div>
              <h3 className="text-label mb-2">Industry</h3>
              <p className="font-medium">{project.industry}</p>
            </div>
            <div>
              <h3 className="text-label mb-2">Services</h3>
              <p className="font-medium">{project.services.join(", ")}</p>
            </div>
          </div>

          <div className="mt-16 max-w-2xl space-y-12">
            <div>
              <h2 className="text-2xl font-bold mb-4">Project Overview</h2>
              <p className="text-muted-foreground leading-relaxed">{project.description}</p>
            </div>
            <div>
              <h2 className="text-2xl font-bold mb-4">Challenge</h2>
              <p className="text-muted-foreground leading-relaxed">TBD</p>
            </div>
            {project.services.includes("Brand Identity") && (
              <div>
                <h2 className="text-2xl font-bold mb-4">Brand Identity</h2>
                <p className="text-muted-foreground leading-relaxed">TBD</p>
              </div>
            )}
            <div>
              <h2 className="text-2xl font-bold mb-4">Website Platform</h2>
              <p className="text-muted-foreground leading-relaxed">TBD</p>
            </div>
            {project.services.includes("Marketing Collateral") && (
              <div>
                <h2 className="text-2xl font-bold mb-4">Marketing Collateral</h2>
                <p className="text-muted-foreground leading-relaxed">TBD</p>
              </div>
            )}
            <div>
              <h2 className="text-2xl font-bold mb-4">Final Result</h2>
              <p className="text-muted-foreground leading-relaxed">TBD</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
