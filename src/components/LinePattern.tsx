import { useId } from "react";

/**
 * Subtle isometric cube line pattern matching the reference image.
 * Style is FIXED (thin light-gray lines on transparent bg). Only the
 * arrangement varies between pages: scale, rotation, offset, density,
 * and mask shape.
 */
type Variation = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;

interface Props {
  variation?: Variation;
  className?: string;
}

const ARRANGEMENTS: Record<Variation, {
  scale: number;        // tile scale multiplier
  rotate: number;       // degrees
  offsetX: number;      // px
  offsetY: number;      // px
  secondLayer: boolean; // overlay an offset second layer for density
  mask: string;         // CSS mask-image
}> = {
  1: { scale: 1.0, rotate: 0,   offsetX: 0,   offsetY: 0,  secondLayer: true,  mask: "radial-gradient(ellipse 60% 70% at 50% 50%, #000 30%, transparent 80%)" },
  2: { scale: 1.2, rotate: -8,  offsetX: -40, offsetY: 20, secondLayer: false, mask: "linear-gradient(to right, #000, transparent 70%)" },
  3: { scale: 0.85, rotate: 12, offsetX: 30,  offsetY: -10,secondLayer: true,  mask: "linear-gradient(to left, #000, transparent 75%)" },
  4: { scale: 1.4, rotate: 0,   offsetX: 0,   offsetY: 0,  secondLayer: false, mask: "radial-gradient(ellipse 50% 60% at 80% 30%, #000 20%, transparent 70%)" },
  5: { scale: 0.95, rotate: 18, offsetX: -20, offsetY: 30, secondLayer: true,  mask: "linear-gradient(135deg, #000, transparent 75%)" },
  6: { scale: 1.1, rotate: -15, offsetX: 60,  offsetY: 0,  secondLayer: false, mask: "radial-gradient(ellipse 70% 50% at 20% 80%, #000 25%, transparent 75%)" },
  7: { scale: 1.6, rotate: 6,   offsetX: 0,   offsetY: -40,secondLayer: false, mask: "linear-gradient(to bottom, #000, transparent 80%)" },
  8: { scale: 0.75, rotate: 0,  offsetX: 0,   offsetY: 0,  secondLayer: true,  mask: "linear-gradient(to top, #000, transparent 80%)" },
  9: { scale: 1.25, rotate: -22,offsetX: 40,  offsetY: 40, secondLayer: true,  mask: "radial-gradient(ellipse 80% 60% at 50% 100%, #000 30%, transparent 80%)" },
  10:{ scale: 1.0, rotate: 30,  offsetX: -60, offsetY: -30,secondLayer: false, mask: "radial-gradient(ellipse 65% 65% at 30% 40%, #000 25%, transparent 75%)" },
};

const TILE = 70; // px
// Isometric cube — matches the reference: outer hexagon + 3 inner lines forming a cube
const CUBE_PATH =
  "M35 6 L62 22 L62 50 L35 66 L8 50 L8 22 Z M35 6 L35 36 M35 36 L62 22 M35 36 L8 22";

const LinePattern = ({ variation = 1, className = "" }: Props) => {
  const raw = useId();
  const id = raw.replace(/:/g, "");
  const a = ARRANGEMENTS[variation];
  const size = TILE * a.scale;

  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
      style={{
        WebkitMaskImage: a.mask,
        maskImage: a.mask,
      }}
    >
      <svg
        width="100%"
        height="100%"
        xmlns="http://www.w3.org/2000/svg"
        style={{
          transform: `translate(${a.offsetX}px, ${a.offsetY}px) rotate(${a.rotate}deg) scale(1.4)`,
          transformOrigin: "center",
        }}
      >
        <defs>
          <pattern
            id={`lp-${id}`}
            width={size}
            height={size}
            patternUnits="userSpaceOnUse"
          >
            <path
              d={CUBE_PATH}
              fill="none"
              stroke="#1a1a1a"
              strokeWidth={0.6}
              strokeOpacity={0.35}
              transform={`scale(${a.scale})`}
            />
          </pattern>
          {a.secondLayer && (
            <pattern
              id={`lp2-${id}`}
              width={size * 1.7}
              height={size * 1.7}
              patternUnits="userSpaceOnUse"
              patternTransform="translate(18 12)"
            >
              <path
                d={CUBE_PATH}
                fill="none"
                stroke="#1a1a1a"
                strokeWidth={0.5}
                strokeOpacity={0.22}
                transform={`scale(${a.scale * 1.15})`}
              />
            </pattern>
          )}
        </defs>
        <rect x="-20%" y="-20%" width="140%" height="140%" fill={`url(#lp-${id})`} />
        {a.secondLayer && (
          <rect x="-20%" y="-20%" width="140%" height="140%" fill={`url(#lp2-${id})`} />
        )}
      </svg>
    </div>
  );
};

export default LinePattern;