import { Link, useParams } from "react-router-dom";
import GeometricPattern from "@/components/GeometricPattern";
import { useLang } from "@/lib/i18n";
import { caseStudyProjects, getProjectImage } from "@/lib/portfolio-system";

const CaseStudyList = () => {
  const { lang, t } = useLang();
  const tt = (en: string, zh: string) => (lang === "zh" ? zh : en);

  return (
    <div>
      <section className="section-border relative overflow-hidden">
        <GeometricPattern variant="diamonds" tone="blueOnLight" fade="center" />
        <div className="section-container py-16 md:py-24">
          <h1 className="text-4xl font-bold md:text-5xl">{t("nav.case-studies")}</h1>
          <p className="mt-4 max-w-2xl text-muted-foreground">
            {tt(
              "Selected projects with deeper thinking behind the redesign, conversion structure, and final business outcome.",
              "精選案例會更深入說明改版思路、轉換策略與最後的商業成果。",
            )}
          </p>
        </div>
      </section>

      <section className="section-border">
        <div className="section-container section-padding">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 xl:grid-cols-3">
            {caseStudyProjects.map((project) => (
              <article key={project.slug} className="portfolio-card rounded-xl border border-border bg-card shadow-sm">
                <div className="px-5 pt-5">
                  <div className="flex items-center gap-1.5 rounded-t-xl border border-border border-b-0 bg-muted px-3 py-2">
                    <span className="h-2.5 w-2.5 rounded-full bg-red-400/70" />
                    <span className="h-2.5 w-2.5 rounded-full bg-yellow-400/70" />
                    <span className="h-2.5 w-2.5 rounded-full bg-green-400/70" />
                    <span className="ml-3 text-[11px] text-muted-foreground">{tt("Before / After preview", "改版前後預覽")}</span>
                  </div>
                  <div className="portfolio-preview-box rounded-b-xl border border-border bg-muted">
                    <img src={getProjectImage(project)} alt={`${project.name} case study preview`} loading="lazy" />
                  </div>
                </div>
                <div className="portfolio-card-content p-5 md:p-6">
                  <p className="mb-1.5 text-xs uppercase tracking-[0.12em] text-muted-foreground">{project.industry}</p>
                  <h2 className="mb-2 text-xl font-semibold">{project.name}</h2>
                  <p className="mb-4 text-sm leading-relaxed text-muted-foreground md:text-base">{project.summary || project.description}</p>
                  <div className="space-y-2 pb-5 text-sm text-muted-foreground">
                    <p><span className="font-medium text-foreground">{tt("Problem:", "問題：")}</span> {project.challenge}</p>
                    <p><span className="font-medium text-foreground">{tt("Direction:", "策略：")}</span> {project.strategy}</p>
                    <p><span className="font-medium text-foreground">{tt("Result:", "成果：")}</span> {project.outcome}</p>
                  </div>
                  <div className="mt-auto pt-2">
                    <Link to={`/case-study/${project.slug}`} className="inline-flex rounded-lg border border-border px-4 py-2 text-sm font-medium transition-colors hover:border-primary hover:text-primary">
                      {t("cta.read-case-study")}
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

const CaseStudyDetail = () => {
  const { slug } = useParams();
  const { lang } = useLang();
  const tt = (en: string, zh: string) => (lang === "zh" ? zh : en);
  const project = caseStudyProjects.find((item) => item.slug === slug);

  if (!project) {
    return (
      <div className="section-container section-padding text-center">
        <h1 className="text-2xl font-bold">{tt("Case study not found", "找不到案例研究")}</h1>
        <Link to="/case-study" className="mt-4 inline-block text-primary">{tt("Back to Case Studies", "返回案例研究")}</Link>
      </div>
    );
  }

  return (
    <div>
      <section className="section-border">
        <div className="section-container py-16 md:py-24">
          <Link to="/case-study" className="mb-6 inline-block text-sm text-muted-foreground transition-colors hover:text-foreground">
            {tt("← Case Studies", "← 案例研究")}
          </Link>
          <p className="mb-3 text-xs uppercase tracking-[0.16em] text-muted-foreground">{project.industry}</p>
          <h1 className="text-4xl font-bold md:text-5xl">{project.name}</h1>
          <p className="mt-4 max-w-3xl text-muted-foreground">{project.summary || project.description}</p>
        </div>
      </section>

      <section className="section-border">
        <div className="section-container py-12">
          <div className="mx-auto max-w-4xl">
            <div className="flex items-center gap-1.5 rounded-t-xl border border-border border-b-0 bg-muted px-3 py-2">
              <span className="h-2.5 w-2.5 rounded-full bg-red-400/70" />
              <span className="h-2.5 w-2.5 rounded-full bg-yellow-400/70" />
              <span className="h-2.5 w-2.5 rounded-full bg-green-400/70" />
              <span className="ml-3 text-[11px] text-muted-foreground">{tt("Scrollable website preview", "可滾動網站預覽")}</span>
            </div>
            <div className="portfolio-preview-box rounded-b-xl border border-border bg-muted">
              <img src={getProjectImage(project)} alt={`${project.name} website preview`} loading="lazy" />
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="section-container section-padding">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-[0.95fr_1.45fr]">
            <div className="space-y-6 lg:sticky lg:top-28 lg:self-start">
              <div className="rounded-xl border border-border bg-card p-6">
                <p className="text-xs uppercase tracking-[0.14em] text-muted-foreground">{tt("Before & context", "改版前與背景")}</p>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{project.challenge}</p>
              </div>
              <div className="rounded-xl border border-border bg-card p-6">
                <p className="text-xs uppercase tracking-[0.14em] text-muted-foreground">{tt("Final result", "最終成果")}</p>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{project.outcome}</p>
              </div>
            </div>

            <div className="space-y-12">
              <div>
                <h2 className="text-2xl font-bold">{tt("Design thinking", "設計思路")}</h2>
                <p className="mt-4 text-base leading-relaxed text-muted-foreground">{project.strategy}</p>
              </div>
              <div>
                <h2 className="text-2xl font-bold">{tt("Conversion strategy", "轉換策略")}</h2>
                <p className="mt-4 text-base leading-relaxed text-muted-foreground">{project.summary}</p>
              </div>
              <div>
                <h2 className="text-2xl font-bold">{tt("Business problem solved", "解決的商業問題")}</h2>
                <p className="mt-4 text-base leading-relaxed text-muted-foreground">{project.description}</p>
              </div>
              <div>
                <h2 className="text-2xl font-bold">{tt("Visual improvement", "視覺改善")}</h2>
                <p className="mt-4 text-base leading-relaxed text-muted-foreground">{tt(
                  "The redesign sharpens hierarchy, reduces friction, and gives the brand a cleaner premium presentation without decorative hover effects.",
                  "新版強化了資訊層級、降低操作阻力，並以更乾淨高級的方式呈現品牌，同時移除分散注意力的滑鼠特效。",
                )}</p>
              </div>
              <div className="border-t border-border pt-8">
                <Link to="/proposal" className="inline-flex rounded-lg bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90">
                  {tt("Request a Proposal", "申請提案")}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export { CaseStudyList, CaseStudyDetail };
