import { describe, expect, it } from "vitest";
import { selectHomepageProjects } from "./homepagePortfolio";
import type { FeedItem } from "./portfolioFeed";

const item = (id: number, featured = true, categories = [`Category ${id % 4}`], overrides: Partial<FeedItem> = {}) =>
  ({ id: String(id), title: `Client ${id}`, slug: `client-${id}`, is_featured: featured, categories, ...overrides } as FeedItem);
const steady = () => 0.5;

describe("homepage curated selection", () => {
  it("uses only featured projects when twelve eligible favourites exist, without mutating feed order", () => {
    const feed = [...Array.from({ length: 24 }, (_, i) => item(i)), item(30, false)];
    const original = [...feed];
    const selected = selectHomepageProjects(feed, 12, steady);
    expect(selected).toHaveLength(12);
    expect(selected.every((row) => row.is_featured === true)).toBe(true);
    expect(feed).toEqual(original);
  });
  it("deduplicates A/B/C versions by either title or slug", () => {
    const feed = [
      item(1, true, ["One"], { title: "Acme - A", slug: "different-one" }),
      item(2, true, ["Two"], { title: "Acme - B", slug: "different-two" }),
      item(3, true, ["Three"], { title: "Separate title", slug: "different-one-c" }),
    ];
    expect(selectHomepageProjects(feed, 12, () => 0.999)).toHaveLength(1);
  });
  it("caps the first category at three and does not count secondary categories", () => {
    const feed = Array.from({ length: 8 }, (_, i) => item(i, true, ["Healthcare", `Other ${i}`]));
    expect(selectHomepageProjects(feed, 12, steady)).toHaveLength(3);
    const multi = Array.from({ length: 12 }, (_, i) => item(i, true, [`Category ${i % 4}`, "Shared"]));
    expect(selectHomepageProjects(multi, 12, steady)).toHaveLength(12);
  });
  it("fills from non-featured projects under the same category and client rules", () => {
    const feed = [item(0), item(1), item(2), ...Array.from({ length: 21 }, (_, i) => item(i + 3, false))];
    const selected = selectHomepageProjects(feed, 12, steady);
    expect(selected).toHaveLength(12);
    expect(selected.filter((row) => row.is_featured)).toHaveLength(3);
    expect(new Set(selected.map((row) => row.title)).size).toBe(12);
    for (let i = 0; i < 4; i++) expect(selected.filter((row) => row.categories?.[0] === `Category ${i}`)).toHaveLength(3);
  });
  it("falls back to the single category for an empty array", () => {
    const feed = Array.from({ length: 5 }, (_, i) => item(i, true, [], { category: "Healthcare" }));
    expect(selectHomepageProjects(feed, 12, steady)).toHaveLength(3);
  });
  it("never returns more than twelve, even with a larger requested limit", () => {
    const feed = Array.from({ length: 40 }, (_, i) => item(i, true, [`Category ${i}`]));
    expect(selectHomepageProjects(feed, 50, steady)).toHaveLength(12);
    expect(selectHomepageProjects(feed, 5, steady)).toHaveLength(5);
  });
});