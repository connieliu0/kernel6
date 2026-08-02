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
 */

export const DESIGN_WIDTH = 3300;
export const DESIGN_HEIGHT = 2550;

// Global offset to shift all images (in pixels)
export const IMAGE_OFFSET_Y = 0; // Increase to move all images down
export const IMAGE_OFFSET_X = 0; // Increase to move all images right

export const LINE_COLOR = "#a8a8a8";

/** Breakpoint matching max-[768px] / @media (max-width: 768px) elsewhere */
export const MOBILE_LAYOUT_MAX_WIDTH = 768;

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
  { position: 42.6, solidStart: 0, solidEnd: 18, weight: 1.5 },
  { position: 57.7, solidStart: 18, solidEnd: 50, weight: 1.5 },
  { position: 71.0, solidStart: 10.5, solidEnd: 50, weight: 1.5 },
  { position: 85.0, solidStart: 0, solidEnd: 50, weight: 1.5 },
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

// Images: left/top/width/height are in pixels
// Adjust each image's position individually
// Change `articleId` to group images under a shared hover tooltip
export const GRID_IMAGES: {
  src: string;
  left: number;
  top: number;
  width: number;
  height: number;
  articleId: string;
}[] = [
  { src: "/assets/production/infinite2.png", left: 2, top: 2182, width: 906, height: 618, articleId: "infinite-feed" },
  { src: "/assets/production/johor1.png", left: -3, top: 1820, width: 348, height: 352, articleId: "johor-land" },
  { src: "/assets/production/echo2.png", left: 2102, top: 1480, width: 278, height: 327, articleId: "echocardiogram" },
  { src: "/assets/production/johor3.png", left: 920, top: 1814, width: 730, height: 351, articleId: "johor-land" },
  { src: "/assets/production/johor2.png", left: 920, top: 826, width: 295, height: 252, articleId: "johor-land" },
  { src: "/assets/production/online1.png", left: 1207, top: 815, width: 884, height: 654, articleId: "problems-online" },
  { src: "/assets/production/echo1.png", left: 1650, top: 416, width: 728, height: 396, articleId: "echocardiogram" },
  { src: "/assets/production/infinite1.png", left: 2702, top: -30, width: 598, height: 843, articleId: "infinite-feed" },
  { src: "/assets/production/egg2.png", left: 2390, top: 834, width: 311, height: 972, articleId: "fried-egg" },
  { src: "/assets/production/egg1.png", left: 2389, top: 1817, width: 568, height: 355, articleId: "fried-egg" },
  { src: "/assets/production/johor4.png", left: 350, top: 1106, width: 570, height: 702, articleId: "johor-land" },
];
