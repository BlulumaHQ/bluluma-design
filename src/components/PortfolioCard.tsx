import { useEffect, useMemo, useRef, useState } from "react";
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
    if (project.beforeImage) list.push({ key: "before", label: tt("Before", "改版前"), src: project.beforeImage });
    if (project.previewA)
      list.push({ key: "previewA", label: tt("Preview A", "提案 A"), src: project.previewA.image, url: project.previewA.url });
    if (project.previewB)
      list.push({ key: "previewB", label: tt("Preview B", "提案 B"), src: project.previewB.image, url: project.previewB.url });
    if (list.length === 0 || project.liveUrl) {
      list.push({ key: "live", label: tt("Live", "上線版本"), src: imageImport, url: project.liveUrl });
    }
    return list;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [project, imageImport, lang]);

  const [activeKey, setActiveKey] = useState<string>(sources[0].key);
  const active = sources.find((s) => s.key === activeKey) ?? sources[0];

  const containerRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const [scrollDist, setScrollDist] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);

  const recalc = () => {
    const img = imgRef.current;
    const c = containerRef.current;
    if (!img || !c) return;
    setScrollDist(Math.max(0, img.offsetHeight - c.offsetHeight));
  };

  useEffect(() => {
    setIsScrolling(false);
    setScrollDist(0);
  }, [activeKey]);

  // Touch / no-hover devices: auto-scroll when card enters viewport.
  useEffect(() => {
    const c = containerRef.current;
    if (!c) return;
    const noHover = typeof window !== "undefined" && window.matchMedia?.("(hover: none)").matches;
    if (!noHover) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsScrolling(true);
        } else {
          setIsScrolling(false);
        }
      },
      { threshold: 0.45 }
    );
    io.observe(c);
    return () => io.disconnect();
  }, []);

  // Tune scroll speed: ~80px per second feels like reading a real page.
  const duration = scrollDist > 0 ? Math.max(3, scrollDist / 80) : 0;

  return (
    <div className="group bg-card border border-border rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:border-primary/40 transition-all duration-300">
      {sources.length > 1 && (
        <div className="flex flex-wrap gap-1 px-4 pt-4">
          {sources.map((s) => (
            <button
              key={s.key}
              type="button"
              onClick={() => setActiveKey(s.key)}
              className={`text-xs font-medium px-3 py-1.5 rounded-md transition-colors ${
                activeKey === s.key
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted/60 text-muted-foreground hover:text-foreground hover:bg-muted"
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>
      )}

      <div className={`px-4 ${sources.length > 1 ? "pt-3" : "pt-4"}`}>
        {/* Browser chrome */}
        <div className="flex items-center gap-1.5 px-3 py-2 bg-muted/50 border border-b-0 border-border rounded-t-lg">
          <span className="w-2.5 h-2.5 rounded-full bg-red-400/70" />
          <span className="w-2.5 h-2.5 rounded-full bg-yellow-400/70" />
          <span className="w-2.5 h-2.5 rounded-full bg-green-400/70" />
        </div>
        <div
          ref={containerRef}
          onMouseEnter={() => setIsScrolling(true)}
          onMouseLeave={() => setIsScrolling(false)}
          className="relative h-[380px] md:h-[460px] overflow-hidden bg-muted border border-border rounded-b-lg"
        >
          <img
            ref={imgRef}
            key={active.src}
            src={active.src}
            onLoad={recalc}
            loading="lazy"
            alt={`${project.name} — full-page website preview by Bluluma Design`}
            style={{
              transform: `translateY(${isScrolling ? -scrollDist : 0}px)`,
              transition: `transform ${duration}s linear`,
            }}
            className="w-full h-auto block will-change-transform"
          />
        </div>
      </div>

      <div className="p-6 md:p-7">
        <p className="text-xs uppercase tracking-[0.12em] text-muted-foreground mb-1.5">{project.industry}</p>
        <h3 className="text-xl md:text-2xl font-semibold mb-2">{project.name}</h3>
        <p className="text-sm md:text-base text-muted-foreground leading-relaxed mb-5">{project.description}</p>

        <div className="flex flex-wrap gap-2">
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:opacity-90 transition"
            >
              {tt("View Live Website", "查看官網")} ↗
            </a>
          )}
          {project.previewA?.url && (
            <a
              href={project.previewA.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium px-4 py-2 rounded-lg border border-border hover:border-primary hover:text-primary transition"
            >
              {tt("Open Preview A", "查看提案 A")} ↗
            </a>
          )}
          {project.previewB?.url && (
            <a
              href={project.previewB.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium px-4 py-2 rounded-lg border border-border hover:border-primary hover:text-primary transition"
            >
              {tt("Open Preview B", "查看提案 B")} ↗
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default PortfolioCard;