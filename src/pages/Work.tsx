import { useMemo, useState } from "react";
import PortfolioCard from "@/components/PortfolioCard";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useLang } from "@/lib/i18n";
import { getProjectImage } from "@/lib/portfolio-system";
import { portfolioIndustries, projects, type ProjectIndustry } from "@/lib/projects";

const RevealDiv = ({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) => {
  const ref = useScrollReveal<HTMLDivElement>({ delay });
  return <div ref={ref} className={`h-full ${className}`}>{children}</div>;
};

const Work = () => {
  const { t, lang } = useLang();
  const tt = (en: string, zh: string) => (lang === "zh" ? zh : en);
  const [activeFilter, setActiveFilter] = useState<ProjectIndustry | "All">("All");

  const visibleProjects = useMemo(
    () =>
      [...projects]
        .sort((a, b) => b.year - a.year)
        .filter((project) => activeFilter === "All" || project.industry === activeFilter),
    [activeFilter],
  );

  return (
    <div>
      <section className="section-dark section-border">
        <div className="section-container py-16 md:py-24">
          <h1 className="text-4xl font-bold md:text-5xl">{t("nav.portfolio")}</h1>
          <p className="mt-4 max-w-2xl text-muted-foreground">{t("work.intro")}</p>
        </div>
      </section>

      <section className="portfolio-layout-shell section-subtle-bg section-border relative">
        <aside
          className="portfolio-edge-sidebar hidden xl:block"
          aria-label={tt("Filter portfolio by industry", "依產業篩選作品")}
        >
          <div className="sticky top-28">
            <p className="mb-5 text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
              {tt("Industries", "產業")}
            </p>
            <nav className="flex flex-col gap-1.5">
              {portfolioIndustries.map((industry) => {
                const isActive = activeFilter === industry;
                return (
                  <button
                    key={industry}
                    type="button"
                    onClick={() => setActiveFilter(industry)}
                    className={`flex items-center gap-3 rounded-md px-3 py-2 text-left text-sm transition-colors ${
                      isActive ? "bg-background text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    <span className={`h-px transition-all ${isActive ? "w-6 bg-primary" : "w-3 bg-border"}`} />
                    {industry}
                  </button>
                );
              })}
            </nav>
          </div>
        </aside>

        <div className="section-container section-padding">
          <RevealDiv>
            <div className="mb-8 flex items-end justify-between gap-6">
              <div>
                <h2 className="text-2xl font-bold md:text-3xl">{t("work.all.title")}</h2>
                <p className="mt-3 text-sm text-muted-foreground md:text-base">
                  {tt("Direct browsing of client work by industry.", "依產業快速瀏覽客戶作品。")}
                </p>
              </div>
            </div>
          </RevealDiv>

          <div className="mb-8 flex gap-2 overflow-x-auto pb-1 xl:hidden">
            {portfolioIndustries.map((industry) => (
              <button
                key={industry}
                type="button"
                onClick={() => setActiveFilter(industry)}
                className={`shrink-0 rounded-full border px-4 py-2 text-sm transition-colors ${
                  activeFilter === industry
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border bg-background text-muted-foreground"
                }`}
              >
                {industry}
              </button>
            ))}
          </div>

          <div className="portfolio-grid grid grid-cols-1 gap-7 md:grid-cols-2 xl:grid-cols-3 xl:gap-8">
            {visibleProjects.map((project, index) => (
              <RevealDiv key={project.slug} delay={index * 60}>
                <PortfolioCard project={project} imageImport={getProjectImage(project)} />
              </RevealDiv>
            ))}
          </div>

          {visibleProjects.length === 0 && (
            <p className="py-12 text-center text-sm text-muted-foreground">
              {tt("No projects found in this industry.", "此產業目前沒有作品。")}
            </p>
          )}
        </div>
      </section>
    </div>
  );
};

export default Work;
