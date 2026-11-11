import { describe, expect, it } from "vitest";
import { selectHealthcareProjects } from "./healthcarePortfolio";
import type { FeedItem } from "./portfolioFeed";

const item = (id: string, categories: string[] | null, category: string | null = null) => ({ id, categories, category } as FeedItem);

describe("Healthcare project selection", () => {
  it("shows six unique healthcare projects without changing feed order", () => {
    const feed = Array.from({ length: 8 }, (_, i) => item(String(i), ["Dental / Healthcare"]));
    const result = selectHealthcareProjects(feed, 6, () => 0.3);
    expect(result).toHaveLength(6);
    expect(new Set(result.map((row) => row.id)).size).toBe(6);
    expect(feed.map((row) => row.id)).toEqual(["0", "1", "2", "3", "4", "5", "6", "7"]);
  });
  it("includes multiple-category projects and falls back only for an empty categories array", () => {
    const feed = [item("multi", ["Automotive", "Dental / Healthcare"]), item("fallback", [], "Dental / Healthcare"), item("excluded", ["Automotive"], "Dental / Healthcare")];
    expect(selectHealthcareProjects(feed).map((row) => row.id).sort()).toEqual(["fallback", "multi"]);
  });
});