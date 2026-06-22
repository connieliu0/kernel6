import {
  consumptionSubtitleWords,
  SUBTITLE_DESIGN_HEIGHT,
  SUBTITLE_DESIGN_WIDTH,
  type SubtitleWord,
} from "../data/consumptionSubtitleLayout";

function pctX(value: number) {
  return `${(value / SUBTITLE_DESIGN_WIDTH) * 100}%`;
}

function pctY(value: number) {
  return `${(value / SUBTITLE_DESIGN_HEIGHT) * 100}%`;
}

function SubtitleWord({ word }: { word: SubtitleWord }) {
  if (word.wrapperWidth && word.wrapperHeight) {
    return (
      <span
        className="subtitle-word-wrapper absolute flex items-center justify-center"
        style={{
          left: pctX(word.x),
          top: pctY(word.y),
          width: pctX(word.wrapperWidth),
          height: pctY(word.wrapperHeight),
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
      }}
    >
      {word.char}
    </span>
  );
}

const SUBTITLE_WIDTH = "min(28vw, 460px)";

export function ConsumptionSubtitle() {
  return (
    <p
      className="consumption-subtitle pointer-events-none relative z-20"
      style={{
        width: SUBTITLE_WIDTH,
        aspectRatio: `${SUBTITLE_DESIGN_WIDTH} / ${SUBTITLE_DESIGN_HEIGHT}`,
      }}
      aria-label="is what we eat"
    >
      {consumptionSubtitleWords.map((word, index) => (
        <SubtitleWord key={`${word.char}-${index}`} word={word} />
      ))}
    </p>
  );
}
