import { useRef, type CSSProperties, type KeyboardEvent } from "react";
import { useAssetArticle } from "../context/AssetArticleContext";
import { ASSET_BURST_START_S, ASSET_BURST_STAGGER_S } from "../data/introTiming";

/** Scroll distance on asset click — enough to pull more body text into view. */
const TEXT_REVEAL_SCROLL_RATIO = 0.28;

function canHover() {
  return window.matchMedia("(hover: hover) and (pointer: fine)").matches;
}

export interface AssetImageProps {
  src: string;
  articleId: string;
  alt?: string;
  className?: string;
  style?: CSSProperties;
  animationIndex?: number;
  /** Starting offset for the burst-out animation (relative to final position). */
  burstOffset?: { x: string; y: string };
  objectFit?: "contain" | "cover";
}

export function AssetImage({
  src,
  articleId,
  alt,
  className = "",
  style,
  animationIndex,
  burstOffset,
  objectFit = "contain",
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
    if (!assetsInteractive || !canHover()) return;
    setHoverFocus({ type: "article", articleId });
  };

  const handleMouseLeave = (event: React.MouseEvent) => {
    if (!assetsInteractive || !canHover()) return;

    const relatedTarget = event.relatedTarget;
    if (
      relatedTarget instanceof Element &&
      relatedTarget.closest(`[data-article-id="${articleId}"]`)
    ) {
      return;
    }

    setHoverFocus(null);
  };

  const handleActivate = () => {
    if (!assetsInteractive) return;

    if (canHover()) {
      window.scrollBy({
        top: window.innerHeight * TEXT_REVEAL_SCROLL_RATIO,
        behavior: "smooth",
      });
      return;
    }

    // Touch / no-hover: tap reveals the article tooltip (toggle to dismiss).
    setHoverFocus(isInFocus ? null : { type: "article", articleId });
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLImageElement>) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      handleActivate();
    }
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
          isDimmed ? "opacity-15 blur-[3px]" : "opacity-100 blur-0"
        } ${isHighlighted ? "scale-[1.03]" : "scale-100"}`}
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
          className={`h-full w-full select-none ${
            objectFit === "cover" ? "object-cover" : "object-contain"
          } ${
            assetsInteractive
              ? "pointer-events-auto cursor-zoom-in"
              : "pointer-events-none cursor-default"
          }`}
          draggable={false}
          tabIndex={0}
          role="button"
          aria-label={ariaLabel}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onClick={handleActivate}
          onKeyDown={handleKeyDown}
          onFocus={assetsInteractive ? handleMouseEnter : undefined}
          onBlur={() => {
            if (assetsInteractive && canHover()) setHoverFocus(null);
          }}
        />
      </div>
    </div>
  );
}
