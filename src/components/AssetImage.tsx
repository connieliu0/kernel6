import { useEffect, useRef, useState, type CSSProperties } from "react";

export interface AssetImageProps {
  src: string;
  title: string;
  description: string;
  alt?: string;
  className?: string;
  style?: CSSProperties;
  animationIndex?: number;
}

export function AssetImage({
  src,
  title,
  description,
  alt,
  className = "",
  style,
  animationIndex,
}: AssetImageProps) {
  const shouldAnimate = animationIndex !== undefined;
  const [isHovered, setIsHovered] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [tooltipPlacement, setTooltipPlacement] = useState<"above" | "below">(
    "above",
  );
  const containerRef = useRef<HTMLDivElement>(null);
  const hoverTimeoutRef = useRef<number | null>(null);

  useEffect(() => {
    if (!isHovered) {
      setShowTooltip(false);
      return;
    }

    hoverTimeoutRef.current = window.setTimeout(() => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setTooltipPlacement(rect.top < 120 ? "below" : "above");
      }
      setShowTooltip(true);
    }, 150);

    return () => {
      if (hoverTimeoutRef.current !== null) {
        window.clearTimeout(hoverTimeoutRef.current);
      }
    };
  }, [isHovered]);

  const animationStyle = shouldAnimate
    ? {
        ...style,
        animationDelay: `${2.05 + animationIndex * 0.07}s`,
        ...(isHovered ? { zIndex: 100 } : {}),
      }
    : isHovered
      ? { ...style, zIndex: 100 }
      : style;

  return (
    <div
      ref={containerRef}
      className={`group absolute cursor-pointer transition-transform duration-300 ease-out hover:scale-[1.03] ${shouldAnimate ? "asset-burst-out" : ""} ${className}`}
      style={animationStyle}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onFocus={() => setIsHovered(true)}
      onBlur={() => setIsHovered(false)}
      tabIndex={0}
      role="button"
      aria-label={`${title}: ${description}`}
    >
      <img
        src={src}
        alt={alt ?? title}
        className="pointer-events-none h-full w-full select-none object-contain"
        draggable={false}
      />

      <div
        className={`pointer-events-none absolute left-1/2 z-40 w-max max-w-[220px] -translate-x-1/2 rounded border border-white/15 bg-black/85 px-3 py-2 text-left shadow-lg backdrop-blur-sm transition-all duration-200 ${
          tooltipPlacement === "above" ? "bottom-full mb-2" : "top-full mt-2"
        } ${
          showTooltip
            ? "translate-y-0 opacity-100"
            : tooltipPlacement === "above"
              ? "translate-y-1 opacity-0"
              : "-translate-y-1 opacity-0"
        }`}
      >
        <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-white">
          {title}
        </p>
        <p className="mt-1 text-[11px] leading-snug text-white/75">
          {description}
        </p>
      </div>
    </div>
  );
}
