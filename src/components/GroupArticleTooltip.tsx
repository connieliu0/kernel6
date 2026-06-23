import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useAssetArticle } from "../context/AssetArticleContext";

const TOOLTIP_GAP = 8;
const VIEWPORT_EDGE = 120;

function resolvePlacement(
  rect: DOMRect,
  preferred: "above" | "below",
): "above" | "below" {
  if (preferred === "above" && rect.top < VIEWPORT_EDGE) return "below";
  if (
    preferred === "below" &&
    rect.bottom > window.innerHeight - VIEWPORT_EDGE
  ) {
    return "above";
  }
  return preferred;
}

export function GroupArticleTooltip() {
  const { hoverFocus, getArticle, getTooltipAnchor } = useAssetArticle();
  const [visible, setVisible] = useState(false);
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const [placement, setPlacement] = useState<"above" | "below">("above");
  const timeoutRef = useRef<number | null>(null);

  const articleId =
    hoverFocus?.type === "article" ? hoverFocus.articleId : null;
  const article = articleId ? getArticle(articleId) : undefined;

  useEffect(() => {
    if (timeoutRef.current !== null) {
      window.clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }

    if (!articleId || !article) {
      setVisible(false);
      return;
    }

    timeoutRef.current = window.setTimeout(() => {
      setVisible(true);
    }, 150);

    return () => {
      if (timeoutRef.current !== null) {
        window.clearTimeout(timeoutRef.current);
      }
    };
  }, [articleId, article]);

  useEffect(() => {
    if (!articleId || !article) return;

    const updatePosition = () => {
      const anchor = getTooltipAnchor(articleId);
      if (!anchor) return;

      const rect = anchor.getBoundingClientRect();
      const resolved = resolvePlacement(
        rect,
        article.tooltipPlacement ?? "above",
      );
      setPlacement(resolved);

      if (resolved === "below") {
        setPosition({
          top: rect.bottom + TOOLTIP_GAP,
          left: rect.left + rect.width / 2,
        });
      } else {
        setPosition({
          top: rect.top - TOOLTIP_GAP,
          left: rect.left + rect.width / 2,
        });
      }
    };

    updatePosition();

    const retry = window.setInterval(updatePosition, 50);
    const stopRetry = window.setTimeout(() => {
      window.clearInterval(retry);
    }, 500);

    window.addEventListener("scroll", updatePosition, { passive: true });
    window.addEventListener("resize", updatePosition);

    return () => {
      window.clearInterval(retry);
      window.clearTimeout(stopRetry);
      window.removeEventListener("scroll", updatePosition);
      window.removeEventListener("resize", updatePosition);
    };
  }, [articleId, article, getTooltipAnchor, hoverFocus, visible]);

  if (!articleId || !article) return null;

  const tooltip = (
    <div
      className={`pointer-events-none fixed z-[200] w-max max-w-[260px] rounded border border-white/15 bg-black/85 px-3 py-2.5 text-left shadow-lg backdrop-blur-sm transition-opacity duration-200 ${
        visible ? "opacity-100" : "opacity-0"
      }`}
      style={{
        top: position.top,
        left: position.left,
        transform:
          placement === "below"
            ? "translateX(-50%)"
            : "translate(-50%, -100%)",
      }}
    >
      <p className="text-[12px] font-semibold leading-snug text-white">
        {article.title}
      </p>
      <p className="mt-1 text-[10px] text-white/55">{article.author}</p>
      <p className="mt-1.5 text-[11px] leading-snug text-white/75">
        {article.description}
      </p>
    </div>
  );

  return createPortal(tooltip, document.body);
}
