import { useId } from "react";

export type GeometricVariant =
  | "cubes"
  | "hexagons"
  | "triangles"
  | "diamonds"
  | "isoGrid"
  | "stacked";

export type GeometricTone = "light" | "dark" | "blueTint" | "blueOnLight" | "ivory";

interface Props {
  variant?: GeometricVariant;
  tone?: GeometricTone;
  /** Fade direction for the radial/linear mask overlay */
  fade?: "center" | "left" | "right" | "top" | "bottom" | "none";
  className?: string;
  /** Stroke opacity override (0-1) */
  opacity?: number;
}

const TONE_STYLES: Record<GeometricTone, { bg: string; stroke: string; defaultOpacity: number }> = {
  light:        { bg: "transparent",                  stroke: "#0a0a0a", defaultOpacity: 0.22 },
  ivory:        { bg: "hsl(40 30% 97%)",              stroke: "#8b7355", defaultOpacity: 0.20 },
  dark:         { bg: "hsl(220 20% 10%)",             stroke: "#8aa6dc", defaultOpacity: 0.18 },
  blueTint:     { bg: "hsl(220 40% 97%)",             stroke: "#5887DA", defaultOpacity: 0.28 },
  blueOnLight:  { bg: "transparent",                  stroke: "#5887DA", defaultOpacity: 0.22 },
};

/** Single tile path data per variant. Tile is 80x80 unless noted. */
function tilePath(variant: GeometricVariant): { size: number; d: string } {
  switch (variant) {
    case "cubes":
      // isometric cube
      return {
        size: 80,
        d: "M40 10 L70 27 L70 60 L40 77 L10 60 L10 27 Z M40 10 L40 43 M40 43 L70 27 M40 43 L10 27",
      };
    case "hexagons":
      return {
        size: 80,
        d: "M40 6 L72 24 L72 56 L40 74 L8 56 L8 24 Z",
      };
    case "triangles":
      return {
        size: 80,
        d: "M0 70 L40 5 L80 70 Z M40 5 L40 70 M0 70 L80 70",
      };
    case "diamonds":
      return {
        size: 80,
        d: "M40 4 L76 40 L40 76 L4 40 Z M40 4 L40 76 M4 40 L76 40",
      };
    case "isoGrid":
      return {
        size: 80,
        d: "M0 40 L40 16 L80 40 L40 64 Z M40 16 L40 64 M0 40 L80 40",
      };
    case "stacked":
      // overlapping cubes — denser feel
      return {
        size: 100,
        d: "M50 10 L80 27 L80 60 L50 77 L20 60 L20 27 Z M50 10 L50 43 L80 27 M50 43 L20 27 M30 35 L60 52 L60 85 L30 102 L0 85 L0 52 Z",
      };
  }
}

function fadeStyle(fade: Props["fade"]): React.CSSProperties {
  switch (fade) {
    case "center":
      return { WebkitMaskImage: "radial-gradient(ellipse at center, #000 35%, transparent 75%)", maskImage: "radial-gradient(ellipse at center, #000 35%, transparent 75%)" };
    case "left":
      return { WebkitMaskImage: "linear-gradient(to right, #000, transparent)", maskImage: "linear-gradient(to right, #000, transparent)" };
    case "right":
      return { WebkitMaskImage: "linear-gradient(to left, #000, transparent)", maskImage: "linear-gradient(to left, #000, transparent)" };
    case "top":
      return { WebkitMaskImage: "linear-gradient(to bottom, #000, transparent)", maskImage: "linear-gradient(to bottom, #000, transparent)" };
    case "bottom":
      return { WebkitMaskImage: "linear-gradient(to top, #000, transparent)", maskImage: "linear-gradient(to top, #000, transparent)" };
    default:
      return {};
  }
}

const GeometricPattern = ({
  variant = "cubes",
  tone = "light",
  fade = "center",
  className = "",
  opacity,
}: Props) => {
  const id = useId().replace(/:/g, "");
  const { bg, stroke, defaultOpacity } = TONE_STYLES[tone];
  const { size, d } = tilePath(variant);
  const op = opacity ?? defaultOpacity;

  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
      style={{ background: bg, ...fadeStyle(fade) }}
    >
      <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id={`p-${id}`} width={size} height={size} patternUnits="userSpaceOnUse">
            <path d={d} fill="none" stroke={stroke} strokeWidth={0.6} strokeOpacity={op} />
          </pattern>
          <pattern id={`p2-${id}`} width={size * 1.6} height={size * 1.6} patternUnits="userSpaceOnUse" patternTransform="translate(20 14)">
            <path d={d} fill="none" stroke={stroke} strokeWidth={0.45} strokeOpacity={op * 0.55} />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#p-${id})`} />
        <rect width="100%" height="100%" fill={`url(#p2-${id})`} />
      </svg>
    </div>
  );
};

export default GeometricPattern;