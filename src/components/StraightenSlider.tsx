import { useMemo } from "react";

type StraightenSliderProps = {
  value: number;
  onChange: (value: number) => void;
};

const TRACK_WIDTH = 220;
const TRACK_HEIGHT = 40;
const BASELINE = TRACK_HEIGHT / 2;
const MAX_AMPLITUDE = 12;
/** Portion of the track (in viewBox units) where the bump decays to flat. */
const DECAY_WIDTH = TRACK_WIDTH * 0.5;
/** One full cycle across the decay region before the track goes flat. */
const WAVELENGTH = DECAY_WIDTH;

function amplitudeAt(x: number) {
  if (x >= DECAY_WIDTH) return 0;
  return MAX_AMPLITUDE * (1 - x / DECAY_WIDTH);
}

function waveY(x: number) {
  const k = (2 * Math.PI) / WAVELENGTH;
  return BASELINE + amplitudeAt(x) * Math.sin(k * x);
}

/** Builds a smooth squiggle-to-straight path (quadratic-through-midpoints smoothing). */
function buildWavePath() {
  const step = 4;
  const points: { x: number; y: number }[] = [];
  for (let x = 0; x <= TRACK_WIDTH; x += step) {
    points.push({ x, y: waveY(x) });
  }
  const last = points[points.length - 1];
  if (last.x !== TRACK_WIDTH) {
    points.push({ x: TRACK_WIDTH, y: waveY(TRACK_WIDTH) });
  }

  let d = `M ${points[0].x},${points[0].y}`;
  for (let i = 1; i < points.length - 1; i++) {
    const curr = points[i];
    const next = points[i + 1];
    const midX = (curr.x + next.x) / 2;
    const midY = (curr.y + next.y) / 2;
    d += ` Q ${curr.x},${curr.y} ${midX},${midY}`;
  }
  const finalPoint = points[points.length - 1];
  d += ` L ${finalPoint.x},${finalPoint.y}`;
  return d;
}

export function StraightenSlider({ value, onChange }: StraightenSliderProps) {
  const wavePath = useMemo(() => buildWavePath(), []);
  const thumbX = value * TRACK_WIDTH;
  const thumbY = waveY(thumbX);
  /** Parent header inverts on the light background, so this flips to black there. */
  const color = "#fff";

  return (
    <label className="straighten-slider pointer-events-auto mt-[0.2vw] flex w-full cursor-pointer flex-col gap-1.5">
      <span className="sr-only">Straighten title</span>
      <div
        className="straighten-slider-track relative w-full"
        style={{ height: TRACK_HEIGHT }}
      >
        <svg
          className="pointer-events-none absolute inset-0 h-full w-full"
          viewBox={`0 0 ${TRACK_WIDTH} ${TRACK_HEIGHT}`}
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path
            d={wavePath}
            fill="none"
            stroke={color}
            strokeWidth={2.5}
            strokeLinecap="round"
            style={{ transition: "stroke 0.3s ease-out" }}
          />
        </svg>
        <div
          className="straighten-slider-thumb pointer-events-none absolute rounded-none transition-[background-color] duration-300 ease-out"
          style={{
            left: `${(thumbX / TRACK_WIDTH) * 100}%`,
            top: thumbY,
            backgroundColor: color,
          }}
        />
        <input
          type="range"
          min={0}
          max={1}
          step={0.01}
          value={value}
          onChange={(event) => onChange(Number(event.target.value))}
          className="straighten-slider-input absolute inset-0 h-full w-full cursor-pointer"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(value * 100)}
          aria-valuetext={`${Math.round(value * 100)}% straight`}
        />
      </div>
    </label>
  );
}
