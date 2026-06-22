export interface TitleLetter {
  char: string;
  /** Position in the 1231×972 Figma frame */
  x: number;
  y: number;
  rotation: number;
  /** Wrapper size for centered rotation (Figma flex containers) */
  wrapperWidth?: number;
  wrapperHeight?: number;
}

/** Title letter positions — THE / FEED two-line layout */
export const TITLE_DESIGN_WIDTH = 1231;
export const TITLE_DESIGN_HEIGHT = 650;
export const TITLE_FONT_SIZE = 300;
export const TITLE_LETTER_SPACING = 24;

export const consumptionTitleLetters: TitleLetter[] = [
  {
    char: "T",
    x: -52,
    y: -15,
    rotation: -18.64,
    wrapperWidth: 280,
    wrapperHeight: 340,
  },
  {
    char: "H",
    x: 320,
    y: -8,
    rotation: -7.9,
    wrapperWidth: 290,
    wrapperHeight: 335,
  },
  {
    char: "E",
    x: 720,
    y: -20,
    rotation: 8.54,
    wrapperWidth: 250,
    wrapperHeight: 325,
  },
  {
    char: "F",
    x: -40,
    y: 310,
    rotation: 7.06,
    wrapperWidth: 260,
    wrapperHeight: 330,
  },
  {
    char: "E",
    x: 280,
    y: 335,
    rotation: 9.25,
    wrapperWidth: 250,
    wrapperHeight: 325,
  },
  {
    char: "E",
    x: 560,
    y: 320,
    rotation: -8.78,
    wrapperWidth: 250,
    wrapperHeight: 325,
  },
  {
    char: "D",
    x: 840,
    y: 340,
    rotation: -7.9,
    wrapperWidth: 270,
    wrapperHeight: 330,
  },
];
