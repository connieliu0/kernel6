type StraightenSliderProps = {
  value: number;
  onChange: (value: number) => void;
};

export function StraightenSlider({ value, onChange }: StraightenSliderProps) {
  return (
    <label className="straighten-slider pointer-events-auto mt-[0.8vw] flex w-full cursor-pointer flex-col gap-1.5">
      <span className="sr-only">Straighten title</span>
      <input
        type="range"
        min={0}
        max={1}
        step={0.01}
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(value * 100)}
        aria-valuetext={`${Math.round(value * 100)}% straight`}
      />
    </label>
  );
}
