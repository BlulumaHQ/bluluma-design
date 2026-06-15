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
  1:  { size: "100% auto",   position: "center",        repeat: "no-repeat", opacity: 0.9,  mask: "radial-gradient(ellipse 70% 80% at 50% 50%, #000 40%, transparent 90%)" },
  2:  { size: "140% auto",   position: "left center",   repeat: "no-repeat", opacity: 0.85, mask: "linear-gradient(to right, #000 30%, transparent 90%)" },
  3:  { size: "140% auto",   position: "right center",  repeat: "no-repeat", opacity: 0.85, mask: "linear-gradient(to left, #000 30%, transparent 90%)" },
  4:  { size: "120% auto",   position: "top center",    repeat: "no-repeat", opacity: 0.9,  mask: "linear-gradient(to bottom, #000 20%, transparent 85%)" },
  5:  { size: "120% auto",   position: "bottom center", repeat: "no-repeat", opacity: 0.9,  mask: "linear-gradient(to top, #000 20%, transparent 85%)" },
  6:  { size: "160% auto",   position: "30% 40%",       repeat: "no-repeat", opacity: 0.8,  mask: "radial-gradient(ellipse 60% 70% at 30% 40%, #000 30%, transparent 80%)" },
  7:  { size: "160% auto",   position: "70% 60%",       repeat: "no-repeat", opacity: 0.8,  mask: "radial-gradient(ellipse 60% 70% at 70% 60%, #000 30%, transparent 80%)" },
  8:  { size: "80% auto",    position: "center",        repeat: "repeat-x",  opacity: 0.7,  mask: "linear-gradient(to right, transparent, #000 20%, #000 80%, transparent)" },
  9:  { size: "180% auto",   position: "center",        repeat: "no-repeat", opacity: 0.85, mask: "radial-gradient(ellipse 80% 60% at 50% 50%, #000 35%, transparent 85%)", transform: "rotate(-6deg) scale(1.1)" },
  10: { size: "150% auto",   position: "center",        repeat: "no-repeat", opacity: 0.85, mask: "radial-gradient(ellipse 70% 70% at 50% 50%, #000 30%, transparent 80%)", transform: "rotate(8deg) scale(1.1)" },
};

const HexPattern = ({ variation = 1, className = "" }: Props) => {
  const a = ARRANGEMENTS[variation];
  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
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