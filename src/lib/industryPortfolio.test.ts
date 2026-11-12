import { describe, expect, it } from "vitest";
import { developerAudience, industryClientTitles, industryItems, selectIndustryProjects, visibleIndustryCount } from "./industryPortfolio";
import type { FeedItem } from "./portfolioFeed";

const item = (id: string, categories: string[], title = id) => ({ id, categories, title, category: null } as FeedItem);
describe("industry portfolio rules", () => {
  it("counts every matching feed item including multi-category projects", () => {
    expect(industryItems([item("a", ["Realtor / Realty"]), item("b", ["Automotive", "Realtor / Realty"]), item("c", ["Dental / Healthcare"])], "realtor-realty").length).toBe(2);
  });
  it("supports the live CMS Realtor and Pre-Sale labels for the requested landing categories", () => {
    const feed = [item("eric", ["Realtor"]), item("park", ["Real Estate Development / Pre-Sale"])];
    expect(industryItems(feed, "realtor-realty").map((row) => row.id)).toEqual(["eric"]);
    expect(industryItems(feed, "real-estate-development-presale").map((row) => row.id)).toEqual(["park"]);
  });
  it("hides the stat below three and shows it starting at three", () => {
    expect(visibleIndustryCount(2)).toBe(false);
    expect(visibleIndustryCount(3)).toBe(true);
  });
  it("selects six category projects without mutating CMS order", () => {
    const feed = Array.from({ length: 8 }, (_, i) => item(String(i), ["Real Estate Development / Presale"]));
    expect(selectIndustryProjects(feed, "real-estate-development-presale", 6, () => 0).length).toBe(6);
    expect(feed.map((row) => row.id)).toEqual(["0", "1", "2", "3", "4", "5", "6", "7"]);
  });
  it("deduplicates titles from the first five entries after stripping A/B suffixes", () => {
    expect(industryClientTitles([item("a", [], "One Park - A"), item("b", [], "One Park - B"), item("c", [], "Oviedo - A"), item("d", [], "Four"), item("e", [], "Five"), item("f", [], "Excluded")])).toEqual(["One Park", "Oviedo", "Four", "Five"]);
  });
  it("redirects only developer-targeted Realtor ad requests", () => {
    expect(developerAudience("?for=developer&utm_source=ad")).toBe(true);
    expect(developerAudience("?for=realtor")).toBe(false);
  });
});