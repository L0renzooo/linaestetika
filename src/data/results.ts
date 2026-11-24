import type { TreatmentSlug } from "./services";

/**
 * Approved results gallery — intentionally EMPTY.
 *
 * Add an entry only when ALL of the following are confirmed by the client:
 * - written publishing consent of the client
 * - genuine before/after pair of the same person, same conditions
 * - treatment and date confirmed
 * - crop is not identifiable (no full face)
 * - no retouching of the result
 *
 * The photos in public/images/client/pery-linaestetika (*) are NOT used yet.
 */
export type ResultEntry = {
  id: string;
  treatment: TreatmentSlug;
  before: string;
  after: string;
  alt: string;
  consentConfirmed: true;
  pairConfirmed: true;
  note?: string;
};

export const results: ResultEntry[] = [];

/** Verified reviews (Bookio/Google) — empty until a public, verifiable source is provided. */
export type Review = { author: string; text: string; source: string; url: string; date: string };
export const reviews: Review[] = [];
