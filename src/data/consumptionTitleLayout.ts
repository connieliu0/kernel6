export interface TitleLetter {
  char: string;
  /** Position in the Figma frame (node 1018:1164) */
  x: number;
  y: number;
  rotation: number;
  /** Wrapper size for centered rotation (Figma flex containers) */
  wrapperWidth?: number;
  wrapperHeight?: number;
}

/** Figma node 1018:1164 — THE FEED title letter positions */
export const TITLE_DESIGN_WIDTH = 350;
export const TITLE_DESIGN_HEIGHT = 265.01;
export const TITLE_FONT_SIZE = 116.364;
export const TITLE_LETTER_SPACING = 9.3091;

export const consumptionTitleLetters: TitleLetter[] = [
  {
    char: "T",
    x: 0,
    y: 3,
    rotation: -18.64,
    wrapperWidth: 104.346,
    wrapperHeight: 132.607,
  },
  {
    char: "H",
    x: 92,
    y: 0,
    rotation: -7.9,
    wrapperWidth: 100.13,
    wrapperHeight: 126.578,
  },
  {
    char: "E",
    x: 195,
    y: 2,
    rotation: 4.43,
    wrapperWidth: 75.754,
    wrapperHeight: 120.826,
  },
  {
    char: "F",
    x: 9.5,
    y: 141.41,
    rotation: 7.06,
    wrapperWidth: 82.732,
    wrapperHeight: 123.6,
  },
  {
    char: "E",
    x: 96,
    y: 138,
    rotation: -10.89,
    wrapperWidth: 87.712,
    wrapperHeight: 126.57,
  },
  {
    char: "E",
    x: 180,
    y: 135.69,
    rotation: 4.78,
    wrapperWidth: 76.436,
    wrapperHeight: 121.181,
  },
  {
    char: "D",
    x: 260,
    y: 133,
    rotation: 8.78,
    wrapperWidth: 96.767,
    wrapperHeight: 126.851,
  },
];
