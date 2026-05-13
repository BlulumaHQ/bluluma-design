import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import type { Project } from "@/lib/projects";
import { useLang } from "@/lib/i18n";

interface Source {
  key: string;
  label: string;
  src: string;
  url?: string;
}

interface PortfolioCardProps {
  project: Project;
  imageImport: string;
}

const PortfolioCard = ({ project, imageImport }: PortfolioCardProps) => {
  const { lang } = useLang();
  const tt = (en: string, zh: string) => (lang === "zh" ? zh : en);

  const sources: Source[] = useMemo(() => {
    const list: Source[] = [];
    if (project.beforeImage)
      list.push({ key: "before", label: tt("Before", "改版前"), src: project.beforeImage });
    if (project.previewA)
      list.push({
        key: "previewA",
        label: tt("Preview A", "提案 A"),
        src: project.previewA.image,
        url: project.previewA.url,
      });
    if (project.previewB)
      list.push({
        key: "previewB",
        label: tt("Preview B", "提案 B"),
        src: project.previewB.image,
        url: project.previewB.url,
      });
    if (list.length === 0 || project.liveUrl) {
      list.push({
        key: "live",
        label: tt("Live", "上線版本"),
        src: imageImport,
        url: project.liveUrl,
      });
    }
    return list;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [project, imageImport, lang]);

  const [activeKey, setActiveKey] = useState<string>(sources[0].key);
  const active = sources.find((s) => s.key === activeKey) ?? sources[0];

  const viewportRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sources.some((source) => source.key === activeKey)) {
      setActiveKey(sources[0].key);
    }
  }, [activeKey, sources]);

  // Reset scroll position when switching tabs.
  useEffect(() => {
    if (viewportRef.current) viewportRef.current.scrollTop = 0;
  }, [activeKey]);

  return (
    <article className="portfolio-card rounded-xl border border-border bg-card shadow-sm">
      {sources.length > 1 && (
        <div className="flex flex-wrap gap-1 px-5 pt-5">
          {sources.map((s) => (
            <button
              key={s.key}
              type="button"
              onClick={() => setActiveKey(s.key)}
              className={`text-xs font-medium px-3 py-1.5 rounded-md transition-colors ${
                activeKey === s.key
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground hover:text-foreground"
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>
      )}

      <div className={`px-5 ${sources.length > 1 ? "pt-3" : "pt-5"}`}>
        <div className="flex items-center gap-1.5 rounded-t-xl border border-border border-b-0 bg-muted px-3 py-2">
          <span className="w-2.5 h-2.5 rounded-full bg-red-400/70" />
          <span className="w-2.5 h-2.5 rounded-full bg-yellow-400/70" />
          <span className="w-2.5 h-2.5 rounded-full bg-green-400/70" />
          <span className="ml-3 text-[11px] text-muted-foreground truncate">
            {tt("Scroll inside preview", "可於預覽視窗內滾動")}
          </span>
        </div>
        <div
          ref={viewportRef}
          className="portfolio-preview-box rounded-b-xl border border-border bg-muted"
        >
          {active.src ? (
            <img
              key={active.src}
              src={active.src}
              loading="lazy"
              alt={`${project.name} — full-page website preview by Bluluma Design`}
            />
          ) : (
            <div className="flex h-full items-center justify-center p-6 text-center text-sm text-muted-foreground">
              {tt("Screenshot coming soon.", "預覽圖即將上線。")}
            </div>
          )}
        </div>
      </div>

      <div className="portfolio-card-content p-5 md:p-6">
        <p className="mb-1.5 text-xs uppercase tracking-[0.12em] text-muted-foreground">
          {project.industry}
        </p>
        <h3 className="mb-2 text-xl font-semibold md:text-2xl">{project.name}</h3>
        <p className="mb-5 text-sm leading-relaxed text-muted-foreground md:text-base">
          {project.description}
        </p>

        <div className="mt-auto flex flex-wrap gap-2 pt-2">
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
            >
              {tt("View Live Website", "查看官網")} ↗
            </a>
          )}
          {project.previewA?.url && (
            <a
              href={project.previewA.url}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg border border-border px-4 py-2 text-sm font-medium transition-colors hover:border-primary hover:text-primary"
            >
              {tt("Open Preview A", "查看提案 A")} ↗
            </a>
          )}
          {project.previewB?.url && (
            <a
              href={project.previewB.url}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg border border-border px-4 py-2 text-sm font-medium transition-colors hover:border-primary hover:text-primary"
            >
              {tt("Open Preview B", "查看提案 B")} ↗
            </a>
          )}
          {project.caseStudy && (
            <Link
              to={`/case-study/${project.slug}`}
              className="rounded-lg border border-border px-4 py-2 text-sm font-medium transition-colors hover:border-primary hover:text-primary"
            >
              {tt("View Case Study", "查看案例研究")} →
            </Link>
          )}
        </div>
      </div>
    </article>
  );
};

export default PortfolioCard;