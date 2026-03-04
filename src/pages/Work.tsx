import ProjectCard from "@/components/ProjectCard";
import { projects } from "@/lib/projects";
import { useScrollReveal } from "@/hooks/useScrollReveal";
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

const RevealDiv = ({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) => {
  const ref = useScrollReveal<HTMLDivElement>({ delay });
  return <div ref={ref}>{children}</div>;
};

const Work = () => {
  const { t } = useLang();

  return (
    <div>
      <section className="section-border">
        <div className="section-container py-16 md:py-24">
          <h1 className="text-4xl md:text-5xl font-bold">{t("work.title")}</h1>
          <p className="mt-4 text-muted-foreground max-w-xl">
            {t("work.intro")}
          </p>
        </div>
      </section>
      <section>
        <div className="section-container section-padding">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, i) => (
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
    </div>
  );
};

export default Work;
