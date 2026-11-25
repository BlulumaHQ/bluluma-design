import friendlyDental from "@/assets/projects/friendly-dental-website-design.webp";
import liveAtHeadwater from "@/assets/projects/live-at-headwater-website-design.webp";
import btnRealEstate from "@/assets/projects/btn-real-estate-website-design.webp";
import nueranutra from "@/assets/projects/nuera-nutra-website-design.webp";
import vitaEnvironmental from "@/assets/projects/vita-environmental-website-design.webp";
import spaAlita from "@/assets/projects/spa-alita-website-design.webp";
import presotea from "@/assets/projects/presotea-website-design.webp";
import hsinHsinArt from "@/assets/projects/hsin-hsin-art-framing-website-design.webp";
import sonykunDesign from "@/assets/projects/sonykun-design-website-design.webp";
import kchenConstruction from "@/assets/projects/kchen-construction-website-design.webp";
import helenLam from "@/assets/projects/helen-lam-real-estate-website-design.webp";
import calinClub from "@/assets/projects/calin-club-website-design.webp";
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
};

export const getProjectImage = (project: Project) => projectImageMap[project.slug] ?? project.image;

export const featuredPortfolioProjects = [...projects]
  .filter((project) => project.featured)
  .sort((a, b) => b.year - a.year);

export const caseStudyProjects = [...projects]
  .filter((project) => project.caseStudy)
  .sort((a, b) => b.year - a.year)
  .slice(0, 6);
