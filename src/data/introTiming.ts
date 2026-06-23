/** Intro sequence — phases overlap so text, phone, and assets blend together. */

export const TITLE_LETTER_STAGGER_S = 0.07;

export const SUBTITLE_START_S = 0.4;
export const SUBTITLE_WORD_STAGGER_S = 0.14;

export const PHONE_FADE_START_S = 0.85;
export const PHONE_FADE_DURATION_S = 0.9;

export const ASSET_BURST_START_S = 1.35;
export const ASSET_BURST_STAGGER_S = 0.08;
const ASSET_BURST_DURATION_S = 0.8;
const ASSET_COUNT = 11;

export const ASSETS_INTRO_COMPLETE_MS =
  (ASSET_BURST_START_S +
    (ASSET_COUNT - 1) * ASSET_BURST_STAGGER_S +
    ASSET_BURST_DURATION_S +
    0.15) *
  1000;
