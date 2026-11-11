import { useState } from "react";

interface Props {
  src?: string | null;
  alt: string;
  variant?: "card" | "phone";
}

/** Shared scroll preview; hints disappear permanently after this preview is scrolled. */
const PortfolioScreenshotViewport = ({ src, alt, variant = "card" }: Props) => {
  const [hasScrolled, setHasScrolled] = useState(false);

  return (
    <div className={`portfolio-screenshot portfolio-screenshot--${variant}`}>
      <div
        className="portfolio-screenshot-screen"
        onScroll={(event) => {
          if (event.currentTarget.scrollTop > 0) setHasScrolled(true);
        }}
      >
        {src && <img src={src} alt={alt} loading="lazy" decoding="async" className="block h-auto w-full" />}
      </div>
      {!hasScrolled && <span className="portfolio-scroll-hint" aria-hidden="true">↕ Scroll</span>}
    </div>
  );
};

export default PortfolioScreenshotViewport;