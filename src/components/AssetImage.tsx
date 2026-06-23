import { useRef, type CSSProperties } from "react";
import { useAssetArticle } from "../context/AssetArticleContext";
import { ASSET_BURST_START_S, ASSET_BURST_STAGGER_S } from "../data/introTiming";

export interface AssetImageProps {
  src: string;
  articleId: string;
  alt?: string;
  className?: string;
  style?: CSSProperties;
  animationIndex?: number;
  /** Starting offset for the burst-out animation (relative to final position). */
  burstOffset?: { x: string; y: string };
}

export function AssetImage({
  src,
  articleId,
  alt,
  className = "",
  style,
  animationIndex,
  burstOffset,
}: AssetImageProps) {
  const {
    hoverFocus,
    setHoverFocus,
    assetsInteractive,
    getArticle,
    registerTooltipAnchor,
    unregisterTooltipAnchor,
  } = useAssetArticle();
  const shouldAnimate = animationIndex !== undefined;
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  const article = getArticle(articleId);
  const isInFocus =
    hoverFocus?.type === "article" && hoverFocus.articleId === articleId;
  const isDimmed = hoverFocus !== null && !isInFocus;
  const isHighlighted = isInFocus;
  const isTooltipAnchor = article?.tooltipAnchor === src;

  const handleMouseEnter = () => {
    if (!assetsInteractive) return;
    setHoverFocus({ type: "article", articleId });
  };

  const handleMouseLeave = (event: React.MouseEvent) => {
    if (!assetsInteractive) return;

    const relatedTarget = event.relatedTarget;
    if (
      relatedTarget instanceof Element &&
      relatedTarget.closest(`[data-article-id="${articleId}"]`)
    ) {
      return;
    }

    setHoverFocus(null);
  };

  const animationStyle = shouldAnimate
    ? {
        ...style,
        animationDelay: `${ASSET_BURST_START_S + animationIndex * ASSET_BURST_STAGGER_S}s`,
        "--burst-x": burstOffset?.x ?? "-30vw",
        "--burst-y": burstOffset?.y ?? "20vh",
        ...(isHighlighted && assetsInteractive ? { zIndex: 100 } : {}),
      }
    : isHighlighted
      ? { ...style, ...(isHighlighted && assetsInteractive ? { zIndex: 100 } : {}) }
      : style;

  const ariaLabel = article
    ? `${article.title}, ${article.author}: ${article.description}`
    : alt ?? articleId;

  return (
    <div
      ref={containerRef}
      data-article-id={articleId}
      className={`group pointer-events-none absolute ${shouldAnimate ? "asset-burst-out" : ""} ${className}`}
      style={animationStyle}
    >
      <div
        className={`pointer-events-none relative h-full w-full transition-[transform,opacity,filter] duration-300 ease-out ${
          isDimmed ? "scale-[0.96] opacity-40 blur-[3px]" : "scale-100 opacity-100 blur-0"
        } ${isHighlighted ? "scale-[1.03]" : ""}`}
      >
        <img
          ref={(node) => {
            imageRef.current = node;
            if (!isTooltipAnchor) return;
            if (node) registerTooltipAnchor(articleId, node);
            else unregisterTooltipAnchor(articleId);
          }}
          src={src}
          alt={alt ?? article?.title ?? articleId}
          className={`h-full w-full select-none object-contain ${
            assetsInteractive
              ? "pointer-events-auto cursor-pointer"
              : "pointer-events-none cursor-default"
          }`}
          draggable={false}
          tabIndex={0}
          role="button"
          aria-label={ariaLabel}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onFocus={assetsInteractive ? handleMouseEnter : undefined}
          onBlur={() => {
            if (assetsInteractive) setHoverFocus(null);
          }}
        />
      </div>
    </div>
  );
}
