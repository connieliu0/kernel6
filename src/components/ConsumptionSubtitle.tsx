import {
  consumptionSubtitleWords,
  SUBTITLE_DESIGN_HEIGHT,
  SUBTITLE_DESIGN_WIDTH,
  type SubtitleWord,
} from "../data/consumptionSubtitleLayout";
import { SUBTITLE_START_S, SUBTITLE_WORD_STAGGER_S } from "../data/introTiming";
import { useAssetArticle } from "../context/AssetArticleContext";

function pctX(value: number) {
  return `${(value / SUBTITLE_DESIGN_WIDTH) * 100}%`;
}

function pctY(value: number) {
  return `${(value / SUBTITLE_DESIGN_HEIGHT) * 100}%`;
}

function SubtitleWord({ word, index }: { word: SubtitleWord; index: number }) {
  const animationDelay = `${SUBTITLE_START_S + index * SUBTITLE_WORD_STAGGER_S}s`;

  if (word.wrapperWidth && word.wrapperHeight) {
    return (
      <span
        className="subtitle-word-wrapper absolute flex items-center justify-center"
        style={{
          left: pctX(word.x),
          top: pctY(word.y),
          width: pctX(word.wrapperWidth),
          height: pctY(word.wrapperHeight),
          animationDelay,
        }}
      >
        <span
          className="consumption-subtitle-word whitespace-nowrap text-white not-italic"
          style={{ transform: `rotate(${word.rotation}deg)` }}
        >
          {word.char}
        </span>
      </span>
    );
  }

  return (
    <span
      className="subtitle-word-wrapper consumption-subtitle-word absolute whitespace-nowrap text-white not-italic"
      style={{
        left: pctX(word.x),
        top: pctY(word.y),
        animationDelay,
      }}
    >
      {word.char}
    </span>
  );
}

const SUBTITLE_WIDTH = "min(24vw, 390px)";

export function ConsumptionSubtitle() {
  const { hoverFocus } = useAssetArticle();
  const isDefocused = hoverFocus !== null;

  return (
    <p
      className={`consumption-subtitle pointer-events-none relative z-20 transition-[opacity,filter] duration-300 ease-out ${
        isDefocused ? "opacity-50 blur-[3px]" : "opacity-100 blur-0"
      }`}
      style={{
        width: SUBTITLE_WIDTH,
        aspectRatio: `${SUBTITLE_DESIGN_WIDTH} / ${SUBTITLE_DESIGN_HEIGHT}`,
      }}
      aria-label="is what we eat"
    >
      {consumptionSubtitleWords.map((word, index) => (
        <SubtitleWord key={`${word.char}-${index}`} word={word} index={index} />
      ))}
    </p>
  );
}
