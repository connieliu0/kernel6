export interface SubtitleWord {
  char: string;
  /** Position in the 907×192 Figma frame (node 994:979) */
  x: number;
  y: number;
  rotation: number;
  /** Wrapper size for centered rotation (Figma flex containers) */
  wrapperWidth?: number;
  wrapperHeight?: number;
}

/** Figma node 994:979 — "is what we eat" word positions */
export const SUBTITLE_DESIGN_WIDTH = 906.751;
export const SUBTITLE_DESIGN_HEIGHT = 192.101;
export const SUBTITLE_FONT_SIZE = 128;

export const consumptionSubtitleWords: SubtitleWord[] = [
  {
    char: "is",
    x: 0,
    y: 29.381,
    rotation: -18.12,
    wrapperWidth: 122.502,
    wrapperHeight: 148.713,
  },
  {
    char: "what",
    x: 135,
    y: 0,
    rotation: 10.39,
    wrapperWidth: 281.777,
    wrapperHeight: 173.347,
  },
  {
    char: "we",
    x: 420,
    y: 68.553,
    rotation: -15.16,
    wrapperWidth: 185.969,
    wrapperHeight: 164.856,
  },
  {
    char: "eat",
    x: 570,
    y: 15.673,
    rotation: 0,
    wrapperWidth: 210,
    wrapperHeight: 140,
  },
];

/** Straightened tail slot — sized/positioned for "learn" so it stays on the shared baseline */
export const SUBTITLE_TAIL_STRAIGHTENED_X = 636;
export const SUBTITLE_TAIL_LEARN_WIDTH = 270;
