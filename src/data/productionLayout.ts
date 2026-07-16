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

// Horizontal lines (position is % from top)
// solidStart/solidEnd define where the solid part is (rest is dotted)
export const HORIZONTAL_LINES = [
  { position: 0.0, solidStart: 0, solidEnd: 100, weight: 1 },
  { position: 16.2, solidStart: 0, solidEnd: 28, weight: 1.5 },
  { position: 29.9, solidStart: 0, solidEnd: 28, weight: 1.5 },
  { position: 42.6, solidStart: 0, solidEnd: 18, weight: 1.5 },
  { position: 57.7, solidStart: 18, solidEnd: 50, weight: 1.5 },
  { position: 71.0, solidStart: 10.5, solidEnd: 50, weight: 1.5 },
  { position: 85.0, solidStart: 0, solidEnd: 50, weight: 1.5 },
  { position: 100.0, solidStart: 0, solidEnd: 100, weight: 1 },
];

// Vertical lines (position is % from left)
export const VERTICAL_LINES = [
  { position: 0.0, solidStart: 0, solidEnd: 100, weight: 1 },
  { position: 10.5, solidStart: 0, solidEnd: 85, weight: 2 },
  { position: 18.4, solidStart: 0, solidEnd: 71, weight: 1.5 },
  { position: 27.9, solidStart: 0, solidEnd: 57, weight: 1.5 },
  { position: 36.4, solidStart: 0, solidEnd: 43, weight: 1 },
  { position: 50.0, solidStart: 0, solidEnd: 100, weight: 1 },
  { position: 63.6, solidStart: 0, solidEnd: 43, weight: 1 },
  { position: 72.2, solidStart: 0, solidEnd: 57, weight: 1.5 },
  { position: 81.8, solidStart: 0, solidEnd: 71, weight: 1.5 },
  { position: 89.8, solidStart: 0, solidEnd: 85, weight: 2 },
  { position: 100.0, solidStart: 0, solidEnd: 100, weight: 1 },
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
  { src: "/assets/production/image 129.png", left: 2, top: 2182, width: 906, height: 618, articleId: "infinite-feed" },
  { src: "/assets/production/image 127.png", left: -3, top: 1820, width: 348, height: 352, articleId: "infinite-feed" },
  { src: "/assets/production/Frame 128.png", left: 2102, top: 1480, width: 278, height: 327, articleId: "infinite-feed" },
  { src: "/assets/production/image 132.png", left: 920, top: 1814, width: 730, height: 351, articleId: "johor-land" },
  { src: "/assets/production/image 133.png", left: 920, top: 766, width: 280, height: 340, articleId: "johor-land" },
  { src: "/assets/production/image 131.png", left: 1214, top: 773, width: 882, height: 700, articleId: "johor-land" },
  { src: "/assets/production/image 134.png", left: 1650, top: 416, width: 728, height: 343, articleId: "fried-egg" },
  { src: "/assets/production/image 130.png", left: 2702, top: -30, width: 598, height: 786, articleId: "problems-online" },
  { src: "/assets/production/image 101.png", left: 2388, top: 770, width: 306, height: 1061, articleId: "fried-egg" },
  { src: "/assets/production/Frame 129.png", left: 2389, top: 1817, width: 568, height: 355, articleId: "problems-online" },
  { src: "/assets/production/image 128.png", left: 350, top: 1106, width: 570, height: 702, articleId: "problems-online" },
];
