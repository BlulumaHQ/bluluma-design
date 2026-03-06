import { useState, useMemo } from "react";
import ProjectCard from "@/components/ProjectCard";
import { projects, type ProjectCategory } from "@/lib/projects";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useLang } from "@/lib/i18n";
import friendlyDental from "@/assets/projects/friendly-dental.jpg";
import liveAtHeadwater from "@/assets/projects/live-at-headwater.jpg";
import btnRealEstate from "@/assets/projects/btn-real-estate.jpg";
import nueranutra from "@/assets/projects/nuera-nutra.jpg";
import vitaEnvironmental from "@/assets/projects/vita-environmental.jpg";
import spaAlita from "@/assets/projects/spa-alita.jpg";
import presotea from "@/assets/projects/presotea.jpg";
import hsinhsinArt from "@/assets/projects/hsin-hsin-art-framing.jpg";
import sonykunDesign from "@/assets/projects/sonykun-design.jpg";
import kchenConstruction from "@/assets/projects/kchen-construction.jpg";
import helenLam from "@/assets/projects/helen-lam-real-estate.jpg";
import calinClub from "@/assets/projects/calin-club.jpg";

const projectImages: Record<string, string> = {
  "friendly-dental": friendlyDental,
  "live-at-headwater": liveAtHeadwater,
  "btn-real-estate": btnRealEstate,
  "nuera-nutra": nueranutra,
  "vita-environmental": vitaEnvironmental,
  "spa-alita": spaAlita,
  "presotea": presotea,
  "hsin-hsin-art-framing": hsinhsinArt,
  "sonykun-design": sonykunDesign,
  "kchen-construction": kchenConstruction,
  "helen-lam-real-estate": helenLam,
  "calin-club": calinClub,
};

const filters: Array<{ label: string; value: ProjectCategory | "All" }> = [
  { label: "All", value: "All" },
  { label: "Web Design", value: "Web Design" },
  { label: "Branding", value: "Branding" },
  { label: "Ecommerce", value: "Ecommerce" },
  { label: "AI Automation", value: "AI Automation" },
];

const CURRENT_YEAR = new Date().getFullYear();

const RevealDiv = ({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) => {
  const ref = useScrollReveal<HTMLDivElement>({ delay });
  return <div ref={ref}>{children}</div>;
};

const Work = () => {
  const { t } = useLang();
  const [activeFilter, setActiveFilter] = useState<ProjectCategory | "All">("All");

  // Featured case studies — top 3 featured projects sorted by year
  const featuredProjects = useMemo(
    () =>
      [...projects]
        .filter((p) => p.featured)
        .sort((a, b) => b.year - a.year)
        .slice(0, 3),
    []
  );

  // All projects sorted newest first, filtered by category
  const sortedProjects = useMemo(
    () =>
      [...projects]
        .sort((a, b) => b.year - a.year)
        .filter((p) => activeFilter === "All" || p.categories.includes(activeFilter)),
    [activeFilter]
  );

  return (
    <div>
      {/* ── Header ── */}
      <section className="section-border">
        <div className="section-container py-16 md:py-24">
          <h1 className="text-4xl md:text-5xl font-bold">{t("work.title")}</h1>
          <p className="mt-4 text-muted-foreground max-w-xl">
            {t("work.intro")}
          </p>
          <p className="mt-2 text-sm text-muted-foreground max-w-xl">
            {t("work.curated")}
          </p>
        </div>
      </section>

      {/* ── Featured Case Studies ── */}
      <section className="section-border">
        <div className="section-container section-padding">
          <RevealDiv>
            <h2 className="text-2xl md:text-3xl font-bold mb-8">{t("work.featured.title")}</h2>
          </RevealDiv>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredProjects.map((project, i) => (
              <RevealDiv key={project.slug} delay={i * 80}>
                <ProjectCard
                  project={project}
                  imageImport={projectImages[project.slug]}
                  mode="live"
                />
              </RevealDiv>
            ))}
          </div>
        </div>
      </section>

      {/* ── Filters + All Projects ── */}
      <section>
        <div className="section-container section-padding">
          <RevealDiv>
            <h2 className="text-2xl md:text-3xl font-bold mb-6">{t("work.all.title")}</h2>
          </RevealDiv>

          {/* Filter bar */}
          <div className="flex flex-wrap gap-2 mb-8">
            {filters.map((f) => (
              <button
                key={f.value}
                onClick={() => setActiveFilter(f.value)}
                className={`text-xs font-medium px-4 py-2 border transition-colors ${
                  activeFilter === f.value
                    ? "bg-foreground text-background border-foreground"
                    : "border-border text-muted-foreground hover:border-foreground hover:text-foreground"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {sortedProjects.map((project, i) => (
              <RevealDiv key={project.slug} delay={i * 80}>
                <div className="relative">
                  {project.year >= CURRENT_YEAR && (
                    <span className="absolute top-3 left-3 z-10 text-[10px] font-semibold tracking-wider uppercase bg-primary text-primary-foreground px-2.5 py-1">
                      NEW
                    </span>
                  )}
                  <ProjectCard
                    project={project}
                    imageImport={projectImages[project.slug]}
                    mode="live"
                  />
                </div>
              </RevealDiv>
            ))}
          </div>

          {sortedProjects.length === 0 && (
            <p className="text-sm text-muted-foreground py-12 text-center">
              No projects found in this category.
            </p>
          )}
        </div>
      </section>
    </div>
  );
};

export default Work;
