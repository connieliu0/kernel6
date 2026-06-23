import { useCallback, useEffect, useRef, useState } from "react";
import { consumptionBodyParagraphs } from "../data/consumptionBodyText";
import { ASSETS_INTRO_COMPLETE_MS } from "../data/introTiming";
import { SignupForm } from "./SignupForm";

const PULL_SCROLL_RATIO = 0.85;
const BODY_LINE_HEIGHT = 16 * 1.6;
const CARD_PADDING_TOP = 40;

export function ConsumptionBodyText() {
  const trackRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLElement>(null);
  const signupRef = useRef<HTMLDivElement>(null);
  const [peekRevealed, setPeekRevealed] = useState(false);
  const [peekHeight, setPeekHeight] = useState(0);
  const isRevealingRef = useRef(false);

  useEffect(() => {
    const measure = () => {
      const signupHeight = signupRef.current?.offsetHeight ?? 0;
      setPeekHeight(CARD_PADDING_TOP + signupHeight + BODY_LINE_HEIGHT);
    };

    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  useEffect(() => {
    const timer = window.setTimeout(() => setPeekRevealed(true), ASSETS_INTRO_COMPLETE_MS);
    return () => window.clearTimeout(timer);
  }, []);

  const update = useCallback(() => {
    const card = cardRef.current;
    const track = trackRef.current;
    if (!card || !track || peekHeight === 0) return;

    const viewportHeight = window.innerHeight;
    const pullDistance = viewportHeight * PULL_SCROLL_RATIO;
    const restingTop = viewportHeight * 0.12;
    const peekTop = viewportHeight - peekHeight;
    const scrollY = window.scrollY;
    const cardHeight = card.offsetHeight;

    track.style.height = `${pullDistance + cardHeight + viewportHeight * 0.5}px`;

    if (!peekRevealed) {
      card.style.top = `${viewportHeight}px`;
      card.style.opacity = "0";
      card.style.transform = "translateX(-50%) translateY(20px)";
      card.style.pointerEvents = "none";
      return;
    }

    if (scrollY <= pullDistance) {
      const progress = scrollY / pullDistance;
      const top = peekTop - progress * (peekTop - restingTop);
      card.style.top = `${top}px`;
      card.style.opacity = "1";
      card.style.transform = "translateX(-50%) translateY(0)";
      card.style.pointerEvents = "auto";
    } else {
      card.style.top = `${restingTop - (scrollY - pullDistance)}px`;
      card.style.opacity = "1";
      card.style.transform = "translateX(-50%) translateY(0)";
      card.style.pointerEvents = "auto";
    }
  }, [peekRevealed, peekHeight]);

  useEffect(() => {
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);

    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [update]);

  useEffect(() => {
    if (!peekRevealed || peekHeight === 0 || isRevealingRef.current) return;

    const card = cardRef.current;
    if (!card) return;

    isRevealingRef.current = true;
    const viewportHeight = window.innerHeight;

    card.style.top = `${viewportHeight}px`;
    card.style.opacity = "0";
    card.style.transform = "translateX(-50%) translateY(20px)";
    card.style.transition =
      "top 0.9s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.9s ease-out, transform 0.9s ease-out";

    requestAnimationFrame(() => {
      update();
    });

    const timer = window.setTimeout(() => {
      card.style.transition = "";
    }, 950);

    return () => window.clearTimeout(timer);
  }, [peekRevealed, peekHeight, update]);

  return (
    <div ref={trackRef} className="pointer-events-none relative z-30" aria-hidden={false}>
      <article
        ref={cardRef}
        className="consumption-body-text pointer-events-none fixed left-1/2 w-[500px] max-w-[calc(100%-2.5rem)] bg-black/90 px-8 py-10 text-[16px] leading-[1.6] text-white"
        style={{ top: "100vh", opacity: 0, willChange: "top, opacity, transform" }}
      >
        <div ref={signupRef}>
          <SignupForm />
        </div>
        {consumptionBodyParagraphs.map((paragraph, index) => (
          <p key={index} className={index > 0 ? "mt-6" : undefined}>
            {paragraph}
          </p>
        ))}
      </article>
    </div>
  );
}
