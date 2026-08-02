/**
 * Production Scene Layout
 *
 * All positions are in pixels based on a 3300x2550 design.
 * Adjust these values to move lines and images.
 *
 * TIPS:
 * - Increase `top` to move down, decrease to move up
 * - Increase `left` to move right, decrease to move left
 * - The grid lines use percentage positions (0-100)
 * - Images reveal when both lines forming their (row, col) intersection meet
 */

export const DESIGN_WIDTH = 3300;
export const DESIGN_HEIGHT = 2550;

// Global offset to shift all images (in pixels)
export const IMAGE_OFFSET_Y = 0; // Increase to move all images down
export const IMAGE_OFFSET_X = 0; // Increase to move all images right

export const LINE_COLOR = "#a8a8a8";

/** Breakpoint matching max-[768px] / @media (max-width: 768px) elsewhere */
export const MOBILE_LAYOUT_MAX_WIDTH = 768;

/** Line draw duration (seconds) — must match ProductionScene clip-path transition */
export const LINE_DRAW_DURATION = 0.8;

export type GridLine = {
  position: number;
  solidStart: number;
  solidEnd: number;
  weight: number;
  /** When true, line is not rendered at ≤ MOBILE_LAYOUT_MAX_WIDTH */
  hiddenOnMobile?: boolean;
};

// Horizontal lines (position is % from top)
// solidStart/solidEnd define where the solid part is (rest is dotted)
// Set hiddenOnMobile: true to hide a line on mobile
export const HORIZONTAL_LINES: GridLine[] = [
  { position: 0.0, solidStart: 0, solidEnd: 100, weight: 1 },
  { position: 17.0, solidStart: 0, solidEnd: 28, weight: 1.5, hiddenOnMobile: true },
  { position: 32.4, solidStart: 0, solidEnd: 28, weight: 1.5, hiddenOnMobile: true },
  { position: 43.4, solidStart: 0, solidEnd: 18, weight: 1.5 },
  { position: 57.7, solidStart: 18, solidEnd: 50, weight: 1.5 },
  { position: 71.0, solidStart: 10.5, solidEnd: 50, weight: 1.5 },
  { position: 85.8, solidStart: 0, solidEnd: 50, weight: 1.5 },
  { position: 100.0, solidStart: 0, solidEnd: 100, weight: 1 },
];

// Vertical lines (position is % from left)
export const VERTICAL_LINES: GridLine[] = [
  { position: 0.0, solidStart: 0, solidEnd: 100, weight: 1, hiddenOnMobile: true },
  { position: 5.3, solidStart: 0, solidEnd: 85, weight: 2, hiddenOnMobile: true },
  { position: 27.9, solidStart: 0, solidEnd: 71, weight: 1.5, hiddenOnMobile: true },
  { position: 32.8, solidStart: 0, solidEnd: 57, weight: 1.5, hiddenOnMobile: true },
  { position: 40.1, solidStart: 0, solidEnd: 43, weight: 1, hiddenOnMobile: true },
  { position: 50.0, solidStart: 0, solidEnd: 100, weight: 1 },
  { position: 63.6, solidStart: 0, solidEnd: 43, weight: 1, hiddenOnMobile: true },
  { position: 72.2, solidStart: 0, solidEnd: 57, weight: 1.5 },
  { position: 81.8, solidStart: 0, solidEnd: 71, weight: 1.5 },
  { position: 89.8, solidStart: 0, solidEnd: 85, weight: 2, hiddenOnMobile: true },
  { position: 95.6, solidStart: 0, solidEnd: 100, weight: 1 },
];

/** Row positions (%) — index into HORIZONTAL_LINES */
export const GRID_ROWS = HORIZONTAL_LINES.map((line) => line.position);

/** Column positions (%) — index into VERTICAL_LINES */
export const GRID_COLS = VERTICAL_LINES.map((line) => line.position);

/**
 * Cell image mapping — image appears when corner (row, col) is complete:
 * horizontal line `row` has drawn past column `col`, and
 * vertical line `col` has drawn past row `row`.
 *
 * left/top/width/height remain absolute design pixels for placement.
 */
export type CellImage = {
  src: string;
  /** 0-indexed horizontal line index (GRID_ROWS) */
  row: number;
  /** 0-indexed vertical line index (GRID_COLS) */
  col: number;
  left: number;
  top: number;
  width: number;
  height: number;
  articleId: string;
};

export const CELL_IMAGES: CellImage[] = [
  { src: "/assets/production/infinite2.png", row: 6, col: 0, left: -1, top: 2169, width: 920, height: 402, articleId: "infinite-feed" },
  { src: "/assets/production/johor1.png", row: 5, col: 0, left: -3, top: 1820, width: 348, height: 352, articleId: "johor-land" },
  { src: "/assets/production/echo2.png", row: 4, col: 6, left: 2102, top: 1480, width: 278, height: 327, articleId: "echocardiogram" },
  { src: "/assets/production/johor3.png", row: 5, col: 2, left: 920, top: 1814, width: 730, height: 379, articleId: "johor-land" },
  { src: "/assets/production/johor2.png", row: 2, col: 2, left: 927, top: 833, width: 315, height: 280, articleId: "johor-land" },
  { src: "/assets/production/online1.png", row: 2, col: 4, left: 1236, top: 832, width: 861, height: 640, articleId: "problems-online" },
  { src: "/assets/production/echo1.png", row: 1, col: 5, left: 1650, top: 444, width: 735, height: 389, articleId: "echocardiogram" },
  { src: "/assets/production/infinite1.png", row: 0, col: 8, left: 2702, top: -30, width: 598, height: 868, articleId: "infinite-feed" },
  { src: "/assets/production/egg2.png", row: 2, col: 7, left: 2383, top: 838, width: 318, height: 972, articleId: "fried-egg" },
  { src: "/assets/production/egg1.png", row: 5, col: 7, left: 2389, top: 1817, width: 572, height: 369, articleId: "fried-egg" },
  { src: "/assets/production/johor4.png", row: 3, col: 1, left: 350, top: 1106, width: 570, height: 702, articleId: "johor-land" },
];

/** @deprecated Prefer CELL_IMAGES — kept for any external references */
export const GRID_IMAGES = CELL_IMAGES;
