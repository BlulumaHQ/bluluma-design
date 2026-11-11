import { useMemo } from "react";
import { itemInCategory, usePortfolioFeed, type FeedItem } from "./portfolioFeed";

/** Sample a copy; never mutate the CMS ordering used by portfolio listings. */
export function selectHealthcareProjects(items: FeedItem[], limit = 6, random = Math.random): FeedItem[] {
  const pool = items.filter((item) => itemInCategory(item, "dental-healthcare"));
  for (let i = pool.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1));
    [pool[i], pool[j]] = [pool[j], pool[i]];
  }
  return pool.slice(0, limit);
}

export function useHealthcareProjects() {
  const { items, loading, error } = usePortfolioFeed();
  const selected = useMemo(() => selectHealthcareProjects(items, 6), [items]);
  return { items: selected, loading, error };
}