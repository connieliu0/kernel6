import { useEffect, useRef } from "react";
import { consumptionBodyParagraphs } from "../data/consumptionBodyText";

const PULL_SCROLL_RATIO = 0.85;

export function ConsumptionBodyText() {
  const trackRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const update = () => {
      const card = cardRef.current;
      const track = trackRef.current;
      if (!card || !track) return;

      const viewportHeight = window.innerHeight;
      const pullDistance = viewportHeight * PULL_SCROLL_RATIO;
      const restingTop = viewportHeight * 0.12;
      const scrollY = window.scrollY;
      const cardHeight = card.offsetHeight;

      track.style.height = `${pullDistance + cardHeight + viewportHeight * 0.5}px`;

      if (scrollY <= pullDistance) {
        const progress = scrollY / pullDistance;
        const top = viewportHeight - progress * (viewportHeight - restingTop);
        card.style.top = `${top}px`;
        card.style.opacity = progress < 0.04 ? "0" : String(Math.min(1, (progress - 0.04) / 0.35));
        card.style.pointerEvents = progress > 0.85 ? "auto" : "none";
      } else {
        card.style.top = `${restingTop - (scrollY - pullDistance)}px`;
        card.style.opacity = "1";
        card.style.pointerEvents = "auto";
      }
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);

    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <div ref={trackRef} className="relative z-30" aria-hidden={false}>
      <article
        ref={cardRef}
        className="consumption-body-text pointer-events-none fixed left-1/2 w-[500px] max-w-[calc(100%-2.5rem)] -translate-x-1/2 bg-black/90 px-8 py-10 text-[16px] leading-[1.6] text-white"
        style={{ top: "100vh", opacity: 0, willChange: "top, opacity" }}
      >
        {consumptionBodyParagraphs.map((paragraph, index) => (
          <p key={index} className={index > 0 ? "mt-6" : undefined}>
            {paragraph}
          </p>
        ))}
      </article>
    </div>
  );
}
