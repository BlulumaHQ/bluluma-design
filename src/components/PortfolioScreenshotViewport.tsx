import { useEffect, useRef, useState } from "react";
import { Skeleton } from "./ui/skeleton";

interface Props {
  src?: string | null;
  alt: string;
  variant?: "card" | "phone";
  autoScrollOnHover?: boolean;
}

/** Shared scroll preview; hints disappear permanently after this preview is scrolled. */
const PortfolioScreenshotViewport = ({ src, alt, variant = "card", autoScrollOnHover = false }: Props) => {
  const [hasScrolled, setHasScrolled] = useState(false);
  const [loadedSrc, setLoadedSrc] = useState<string | null>(null);
  const screen = useRef<HTMLDivElement>(null);
  const frame = useRef<number | null>(null);
  const manual = useRef(false);
  const cancel = () => {
    if (frame.current !== null) cancelAnimationFrame(frame.current);
    frame.current = null;
  };
  useEffect(() => () => {
    if (frame.current !== null) cancelAnimationFrame(frame.current);
  }, []);
  const enabled = () => autoScrollOnHover &&
    window.matchMedia("(hover: hover) and (pointer: fine) and (min-width: 768px)").matches &&
    !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const enter = () => {
    if (!enabled()) return;
    cancel();
    manual.current = false;
    let previous: number | null = null;
    const tick = (time: number) => {
      const element = screen.current;
      if (!element || manual.current || !enabled()) { cancel(); return; }
      if (previous !== null) element.scrollTop += 120 * Math.min(time - previous, 100) / 1000;
      previous = time;
      // Keep waiting while a lazy image loads beneath the pointer.
      if (!element.querySelector("img")?.complete || element.scrollTop < element.scrollHeight - element.clientHeight) {
        frame.current = requestAnimationFrame(tick);
      } else frame.current = null;
    };
    frame.current = requestAnimationFrame(tick);
  };
  const leave = () => {
    cancel();
    if (!enabled() || manual.current) return;
    const element = screen.current;
    if (!element) return;
    const top = element.scrollTop;
    const start = performance.now();
    const tick = (time: number) => {
      if (!enabled() || manual.current) { cancel(); return; }
      const progress = Math.min((time - start) / 600, 1);
      element.scrollTop = top * Math.pow(1 - progress, 3);
      if (progress < 1) frame.current = requestAnimationFrame(tick);
      else frame.current = null;
    };
    frame.current = requestAnimationFrame(tick);
  };

  return (
    <div className={`portfolio-screenshot portfolio-screenshot--${variant}`} onMouseEnter={enter} onMouseLeave={leave}>
      {autoScrollOnHover && src && loadedSrc !== src && <Skeleton className="pointer-events-none absolute inset-0 z-10 rounded-none" />}
      <div
        ref={screen}
        className="portfolio-screenshot-screen"
        onWheel={() => { manual.current = true; cancel(); }}
        onScroll={(event) => {
          if (event.currentTarget.scrollTop > 0) setHasScrolled(true);
        }}
      >
        {src && <img src={src} alt={alt} loading="lazy" decoding="async" onLoad={() => setLoadedSrc(src)} onError={() => setLoadedSrc(src)} className="block h-auto w-full" />}
      </div>
      {!hasScrolled && <span className="portfolio-scroll-hint" aria-hidden="true">↕ Scroll</span>}
    </div>
  );
};

export default PortfolioScreenshotViewport;