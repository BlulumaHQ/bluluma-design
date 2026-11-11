import { itemCategories, type FeedItem } from "./portfolioFeed";

/** Sample copies of the feed, preferring favourites without changing CMS ordering. */
export function selectHomepageProjects(items: FeedItem[], limit = 12, random = Math.random): FeedItem[] {
  const shuffle = (pool: FeedItem[]) => {
    const copy = [...pool];
    for (let i = copy.length - 1; i > 0; i--) {
      const j = Math.floor(random() * (i + 1));
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
  };
  const result: FeedItem[] = [];
  const titles = new Set<string>();
  const slugs = new Set<string>();
  const counts = new Map<string, number>();
  const maximum = Math.max(0, Math.min(12, Math.floor(limit)));
  const pool = [
    ...shuffle(items.filter((item) => item.is_featured === true)),
    ...shuffle(items.filter((item) => item.is_featured !== true)),
  ];
  for (const item of pool) {
    if (result.length >= maximum) break;
    const title = item.title.trim().replace(/\s+-\s+[abc]$/i, "").trim().toLowerCase();
    const slug = item.slug.replace(/-[abc]$/i, "").toLowerCase();
    const category = (itemCategories(item)[0] ?? "").trim().toLowerCase();
    if (titles.has(title) || slugs.has(slug) || (counts.get(category) ?? 0) >= 3) continue;
    result.push(item);
    titles.add(title);
    slugs.add(slug);
    counts.set(category, (counts.get(category) ?? 0) + 1);
  }
  return result;
}