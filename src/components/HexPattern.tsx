import hexAsset from "@/assets/hex-pattern.webp.asset.json";

/**
 * Hexagon line-art background — uses the original reference image.
 * Variations only change how the SAME image is positioned/sized/faded,
 * never the artwork itself.
 */
type Variation = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;

interface Props {
  variation?: Variation;
  className?: string;
}

const ARRANGEMENTS: Record<Variation, {
  size: string;
  position: string;
  repeat: "no-repeat" | "repeat-x" | "repeat";
  opacity: number;
  mask: string;
  transform?: string;
}> = {
  1:  { size: "70% auto", position: "110% 54%", repeat: "no-repeat", opacity: 0.32, mask: "linear-gradient(to left, transparent 0%, #000 22%, #000 65%, transparent 100%)" },
  2:  { size: "66% auto", position: "-8% 50%",  repeat: "no-repeat", opacity: 0.30, mask: "linear-gradient(to right, transparent 0%, #000 22%, #000 65%, transparent 100%)" },
  3:  { size: "64% auto", position: "108% 46%", repeat: "no-repeat", opacity: 0.30, mask: "linear-gradient(to left, transparent 0%, #000 22%, #000 65%, transparent 100%)" },
  4:  { size: "62% auto", position: "82% -14%", repeat: "no-repeat", opacity: 0.28, mask: "linear-gradient(to bottom, transparent 0%, #000 22%, #000 58%, transparent 100%)" },
  5:  { size: "62% auto", position: "18% 118%", repeat: "no-repeat", opacity: 0.28, mask: "linear-gradient(to top, transparent 0%, #000 22%, #000 58%, transparent 100%)" },
  6:  { size: "60% auto", position: "-10% 82%", repeat: "no-repeat", opacity: 0.28, mask: "radial-gradient(ellipse 60% 60% at 0% 100%, #000 24%, transparent 78%)" },
  7:  { size: "60% auto", position: "112% 0%",  repeat: "no-repeat", opacity: 0.28, mask: "radial-gradient(ellipse 60% 60% at 100% 0%, #000 24%, transparent 78%)" },
  8:  { size: "58% auto", position: "-8% 56%",  repeat: "no-repeat", opacity: 0.30, mask: "linear-gradient(to right, transparent 0%, #000 22%, #000 58%, transparent 100%)" },
  9:  { size: "64% auto", position: "112% 34%", repeat: "no-repeat", opacity: 0.28, mask: "radial-gradient(ellipse 60% 56% at 100% 35%, #000 24%, transparent 78%)", transform: "rotate(-4deg)" },
  10: { size: "64% auto", position: "-12% 70%", repeat: "no-repeat", opacity: 0.28, mask: "radial-gradient(ellipse 60% 56% at 0% 70%, #000 24%, transparent 78%)", transform: "rotate(4deg)" },
};

const HexPattern = ({ variation = 1, className = "" }: Props) => {
  const a = ARRANGEMENTS[variation];
  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute inset-0 -z-10 overflow-hidden ${className}`}
    >
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `url(${hexAsset.url})`,
          backgroundSize: a.size,
          backgroundPosition: a.position,
          backgroundRepeat: a.repeat,
          opacity: a.opacity,
          WebkitMaskImage: a.mask,
          maskImage: a.mask,
          transform: a.transform,
          transformOrigin: "center",
        }}
      />
    </div>
  );
};

export default HexPattern;