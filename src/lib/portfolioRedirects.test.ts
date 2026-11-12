import { describe, expect, it } from "vitest";
import { portfolioCategoryRedirects } from "./portfolioRedirects";

describe("legacy portfolio category redirects", () => {
  it.each([
    ["realtor", "realtor-realty"],
    ["real-estate-development-pre-sale", "real-estate-development-presale"],
    ["construction-architecture-development", "construction-architecture"],
    ["tattoo-creative-industry", "artist-tattoo-creative-industry"],
    ["travel-tourism", "travel-tourism-hotel"],
  ] as const)("redirects %s only toward %s", (oldSlug, canonicalSlug) => {
    expect(portfolioCategoryRedirects[oldSlug]).toBe(canonicalSlug);
    expect(Object.keys(portfolioCategoryRedirects)).not.toContain(canonicalSlug);
  });
});