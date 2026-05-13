import friendlyDental from "@/assets/projects/friendly-dental.jpg";
import liveAtHeadwater from "@/assets/projects/live-at-headwater.jpg";
import btnRealEstate from "@/assets/projects/btn-real-estate.jpg";
import nueranutra from "@/assets/projects/nuera-nutra.jpg";
import vitaEnvironmental from "@/assets/projects/vita-environmental.jpg";
import spaAlita from "@/assets/projects/spa-alita.jpg";
import presotea from "@/assets/projects/presotea.jpg";
import hsinHsinArt from "@/assets/projects/hsin-hsin-art-framing.jpg";
import sonykunDesign from "@/assets/projects/sonykun-design.jpg";
import kchenConstruction from "@/assets/projects/kchen-construction.jpg";
import helenLam from "@/assets/projects/helen-lam-real-estate.jpg";
import calinClub from "@/assets/projects/calin-club.jpg";
import bluewaveConsulting from "@/assets/projects/bluewave-consulting.jpg";
import greenleafLandscaping from "@/assets/projects/greenleaf-landscaping.jpg";
import northshoreFinance from "@/assets/projects/northshore-finance.jpg";
import oakridgeDentalGroup from "@/assets/projects/oakridge-dental-group.jpg";
import pacificInteriorStudio from "@/assets/projects/pacific-interior-studio.jpg";
import urbanfitGym from "@/assets/projects/urbanfit-gym.jpg";
import { projects, type Project } from "@/lib/projects";

export const projectImageMap: Record<string, string> = {
  "friendly-dental": friendlyDental,
  "live-at-headwater": liveAtHeadwater,
  "btn-real-estate": btnRealEstate,
  "nuera-nutra": nueranutra,
  "vita-environmental": vitaEnvironmental,
  "spa-alita": spaAlita,
  presotea,
  "hsin-hsin-art-framing": hsinHsinArt,
  "sonykun-design": sonykunDesign,
  "kchen-construction": kchenConstruction,
  "helen-lam-real-estate": helenLam,
  "calin-club": calinClub,
  "bluewave-consulting": bluewaveConsulting,
  "greenleaf-landscaping": greenleafLandscaping,
  "northshore-finance": northshoreFinance,
  "oakridge-dental-group": oakridgeDentalGroup,
  "pacific-interior-studio": pacificInteriorStudio,
  "urbanfit-gym": urbanfitGym,
};

export const getProjectImage = (project: Project) => projectImageMap[project.slug] ?? project.image;

export const featuredPortfolioProjects = [...projects]
  .filter((project) => project.featured)
  .sort((a, b) => b.year - a.year);

export const caseStudyProjects = [...projects]
  .filter((project) => project.caseStudy)
  .sort((a, b) => b.year - a.year)
  .slice(0, 6);
