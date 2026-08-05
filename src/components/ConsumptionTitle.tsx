import {
  consumptionTitleLetters,
  TITLE_DESIGN_HEIGHT,
  TITLE_DESIGN_WIDTH,
  type TitleLetter,
} from "../data/consumptionTitleLayout";
import { TITLE_LETTER_STAGGER_S } from "../data/introTiming";
import { useAssetArticle } from "../context/AssetArticleContext";
import { RefreshButton } from "./RefreshButton";

function pctX(value: number) {
  return `${(value / TITLE_DESIGN_WIDTH) * 100}%`;
}

function pctY(value: number) {
  return `${(value / TITLE_DESIGN_HEIGHT) * 100}%`;
}

function TitleLetter({
  letter,
  index,
  straighten,
}: {
  letter: TitleLetter;
  index: number;
  straighten: number;
}) {
  const startRotation = index % 2 === 0 ? -45 : 45;
  const rowBaseline = index < 3 ? 0 : 135;
  const y = letter.y + (rowBaseline - letter.y) * straighten;
  const rotation = letter.rotation * (1 - straighten);

  if (letter.wrapperWidth && letter.wrapperHeight) {
    return (
      <span
        className="consumption-letter-wrapper absolute flex items-center justify-center"
        style={{
          left: pctX(letter.x),
          top: pctY(y),
          width: pctX(letter.wrapperWidth),
          height: pctY(letter.wrapperHeight),
          "--start-rotation": `${startRotation}deg`,
          animationDelay: `${index * TITLE_LETTER_STAGGER_S}s`,
        } as React.CSSProperties}
      >
        <span
          className="consumption-title-letter whitespace-nowrap text-white not-italic"
          style={{ transform: `rotate(${rotation}deg)` }}
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
        top: pctY(y),
        "--start-rotation": `${startRotation}deg`,
        animationDelay: `${index * TITLE_LETTER_STAGGER_S}s`,
        transform: `rotate(${rotation}deg)`,
      } as React.CSSProperties}
    >
      {letter.char}
    </span>
  );
}

export function ConsumptionTitle({
  straighten = 0,
  onToggle,
}: {
  straighten?: number;
  onToggle?: () => void;
}) {
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
        <TitleLetter
          key={`${letter.char}-${index}`}
          letter={letter}
          index={index}
          straighten={straighten}
        />
      ))}
      {onToggle && (
        <span
          className="refresh-button-reveal absolute flex items-center justify-center"
          style={{
            transform: `rotate(${8.78 * (1 - straighten)}deg)`,
            animationDelay: `${(consumptionTitleLetters.length - 1) * TITLE_LETTER_STAGGER_S}s`,
            "--start-rotation": "45deg",
          } as React.CSSProperties}
        >
          <RefreshButton onRefresh={onToggle} />
        </span>
      )}
    </h1>
  );
}
