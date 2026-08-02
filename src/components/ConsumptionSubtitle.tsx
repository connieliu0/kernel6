import { useEffect, useRef, useState } from "react";
import {
  consumptionSubtitleWords,
  SUBTITLE_DESIGN_HEIGHT,
  SUBTITLE_DESIGN_WIDTH,
  SUBTITLE_TAIL_LEARN_WIDTH,
  SUBTITLE_TAIL_STRAIGHTENED_X,
  type SubtitleWord,
} from "../data/consumptionSubtitleLayout";
import { SUBTITLE_START_S, SUBTITLE_WORD_STAGGER_S } from "../data/introTiming";
import { useAssetArticle } from "../context/AssetArticleContext";

const WORD_SWAP_BLUR_MS = 280;

function pctX(value: number) {
  return `${(value / SUBTITLE_DESIGN_WIDTH) * 100}%`;
}

function pctY(value: number) {
  return `${(value / SUBTITLE_DESIGN_HEIGHT) * 100}%`;
}

function SubtitleWord({
  word,
  index,
  straighten,
  label,
  morphing,
}: {
  word: SubtitleWord;
  index: number;
  straighten: number;
  label: string;
  morphing: boolean;
}) {
  const animationDelay = `${SUBTITLE_START_S + index * SUBTITLE_WORD_STAGGER_S}s`;
  const isTail = index === consumptionSubtitleWords.length - 1;
  const targetY = word.straightenedY ?? word.y;
  const y = word.y + (targetY - word.y) * straighten;
  const rotation = word.rotation * (1 - straighten);
  const x = isTail
    ? word.x + (SUBTITLE_TAIL_STRAIGHTENED_X - word.x) * straighten
    : word.x;
  const wrapperWidth =
    isTail && word.wrapperWidth
      ? word.wrapperWidth +
        (SUBTITLE_TAIL_LEARN_WIDTH - word.wrapperWidth) * straighten
      : word.wrapperWidth;

  if (wrapperWidth && word.wrapperHeight) {
    return (
      <span
        className="subtitle-word-wrapper absolute flex items-center justify-center"
        style={{
          left: pctX(x),
          top: pctY(y),
          width: pctX(wrapperWidth),
          height: pctY(word.wrapperHeight),
          animationDelay,
        }}
      >
        <span
          className={`consumption-subtitle-word whitespace-nowrap text-white not-italic transition-[filter,opacity] duration-300 ease-out ${
            isTail && morphing ? "blur-[10px] opacity-40" : "blur-0 opacity-100"
          }`}
          style={{ transform: `rotate(${rotation}deg)` }}
        >
          {label}
        </span>
      </span>
    );
  }

  return (
    <span
      className={`subtitle-word-wrapper consumption-subtitle-word absolute whitespace-nowrap text-white not-italic transition-[filter,opacity] duration-300 ease-out ${
        isTail && morphing ? "blur-[10px] opacity-40" : "blur-0 opacity-100"
      }`}
      style={{
        left: pctX(x),
        top: pctY(y),
        animationDelay,
        transform: `rotate(${rotation}deg)`,
      }}
    >
      {label}
    </span>
  );
}

const SUBTITLE_WIDTH = "min(24vw, 390px)";
const SUBTITLE_WIDTH_INLINE = "100%";

export function ConsumptionSubtitle({
  variant = "overlay",
  straighten = 0,
}: {
  variant?: "overlay" | "inline";
  straighten?: number;
}) {
  const { hoverFocus } = useAssetArticle();
  const isDefocused = hoverFocus !== null;
  const [tailWord, setTailWord] = useState("eat");
  const [tailMorphing, setTailMorphing] = useState(false);
  const tailWordRef = useRef(tailWord);
  tailWordRef.current = tailWord;

  useEffect(() => {
    const target = straighten >= 0.995 ? "learn" : "eat";
    if (target === tailWordRef.current) {
      setTailMorphing(false);
      return;
    }

    let cancelled = false;
    setTailMorphing(true);

    const swapTimer = window.setTimeout(() => {
      if (cancelled) return;
      setTailWord(target);
    }, WORD_SWAP_BLUR_MS);

    const clearTimer = window.setTimeout(() => {
      if (!cancelled) setTailMorphing(false);
    }, WORD_SWAP_BLUR_MS + 80);

    return () => {
      cancelled = true;
      window.clearTimeout(swapTimer);
      window.clearTimeout(clearTimer);
    };
  }, [straighten]);

  const phrase = `is what we ${tailWord}`;

  return (
    <p
      className={`consumption-subtitle pointer-events-none relative z-20 overflow-visible transition-[opacity,filter] duration-300 ease-out ${
        isDefocused ? "opacity-50 blur-[3px]" : "opacity-100 blur-0"
      }`}
      style={{
        width: variant === "inline" ? SUBTITLE_WIDTH_INLINE : SUBTITLE_WIDTH,
        aspectRatio: `${SUBTITLE_DESIGN_WIDTH} / ${SUBTITLE_DESIGN_HEIGHT}`,
      }}
      aria-label={phrase}
    >
      {consumptionSubtitleWords.map((word, index) => {
        const isTail = index === consumptionSubtitleWords.length - 1;
        return (
          <SubtitleWord
            key={`${word.char}-${index}`}
            word={word}
            index={index}
            straighten={straighten}
            label={isTail ? tailWord : word.char}
            morphing={isTail && tailMorphing}
          />
        );
      })}
    </p>
  );
}
