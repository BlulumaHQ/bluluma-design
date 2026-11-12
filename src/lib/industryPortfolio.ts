import { useMemo } from "react";
import { itemInCategory, usePortfolioFeed, type FeedItem } from "./portfolioFeed";

export const industryItems = (items: FeedItem[], category: string) => items.filter((item) => itemInCategory(item, category));
export const visibleIndustryCount = (count: number) => count >= 3;
export const developerAudience = (search: string) => new URLSearchParams(search).get("for") === "developer";
export const industryClientTitles = (items: FeedItem[]) => [...new Set(items.slice(0, 5).map((item) => item.title.replace(/\s*-\s*[AB]$/i, "").trim()))];

export function selectIndustryProjects(items: FeedItem[], category: string, limit = 6, random = Math.random) {
  const pool = industryItems(items, category);
  for (let i = pool.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1));
    [pool[i], pool[j]] = [pool[j], pool[i]];
  }
  return pool.slice(0, limit);
}

export function useIndustryProjects(category: string, limit = 6) {
  const feed = usePortfolioFeed();
  const all = useMemo(() => industryItems(feed.items, category), [feed.items, category]);
  const items = useMemo(() => selectIndustryProjects(feed.items, category, limit), [feed.items, category, limit]);
  return { items, all, count: all.length, loading: feed.loading, error: feed.error };
}