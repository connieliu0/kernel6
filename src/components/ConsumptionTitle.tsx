import {
  consumptionTitleLetters,
  TITLE_DESIGN_HEIGHT,
  TITLE_DESIGN_WIDTH,
  type TitleLetter,
} from "../data/consumptionTitleLayout";
import { TITLE_LETTER_STAGGER_S } from "../data/introTiming";
import { useAssetArticle } from "../context/AssetArticleContext";

function pctX(value: number) {
  return `${(value / TITLE_DESIGN_WIDTH) * 100}%`;
}

function pctY(value: number) {
  return `${(value / TITLE_DESIGN_HEIGHT) * 100}%`;
}

function TitleLetter({ letter, index }: { letter: TitleLetter; index: number }) {
  const startRotation = index % 2 === 0 ? -45 : 45;

  if (letter.wrapperWidth && letter.wrapperHeight) {
    return (
      <span
        className="consumption-letter-wrapper absolute flex items-center justify-center"
        style={{
          left: pctX(letter.x),
          top: pctY(letter.y),
          width: pctX(letter.wrapperWidth),
          height: pctY(letter.wrapperHeight),
          "--start-rotation": `${startRotation}deg`,
          animationDelay: `${index * TITLE_LETTER_STAGGER_S}s`,
        } as React.CSSProperties}
      >
        <span
          className="consumption-title-letter whitespace-nowrap text-white not-italic"
          style={{ transform: `rotate(${letter.rotation}deg)` }}
        >
          {letter.char}
        </span>
      </span>
    );
  }

  return (
    <span
      className="consumption-letter-wrapper consumption-title-letter absolute whitespace-nowrap text-white not-italic"
      style={{
        left: pctX(letter.x),
        top: pctY(letter.y),
        "--start-rotation": `${startRotation}deg`,
        animationDelay: `${index * TITLE_LETTER_STAGGER_S}s`,
      } as React.CSSProperties}
    >
      {letter.char}
    </span>
  );
}

export function ConsumptionTitle() {
  const { hoverFocus } = useAssetArticle();
  const isDefocused = hoverFocus !== null;

  return (
    <h1
      className={`consumption-title pointer-events-none relative z-20 transition-[opacity,filter] duration-300 ease-out ${
        isDefocused ? "opacity-50 blur-[3px]" : "opacity-100 blur-0"
      }`}
      style={{
        aspectRatio: `${TITLE_DESIGN_WIDTH} / ${TITLE_DESIGN_HEIGHT}`,
      }}
      aria-label="The Feed"
    >
      {consumptionTitleLetters.map((letter, index) => (
        <TitleLetter key={`${letter.char}-${index}`} letter={letter} index={index} />
      ))}
    </h1>
  );
}
