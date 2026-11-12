import { useEffect, useState } from "react";
import { cms } from "./cms";

export interface GalleryItem {
  url: string;
  type: string;
  caption?: string | null;
  width?: number | null;
  height?: number | null;
}

export interface FeedItem {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  featured_image_url: string | null;
  is_featured: boolean | null;
  sort_order: number | null;
  show_on: string[] | null;
  publish_date: string | null;
  live_url: string | null;
  services: string[] | null;
  project_year: string | null;
  category: string | null;
  categories: string[] | null;
  /** Chinese category names (CMS categories.name_zh, falling back to name), same order as `categories`. */
  categories_zh?: string[] | null;
  homepage_full_url: string | null;
  gallery: GalleryItem[] | null;
}

export const categorySlug = (name: string) =>
  name.toLowerCase().replace(/&/g, "and").replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");

const COLS =
  "id,title,slug,excerpt,featured_image_url,is_featured,sort_order,show_on,publish_date,live_url,services,project_year,category,categories,categories_zh,homepage_full_url,gallery";

let cache: Promise<FeedItem[]> | null = null;

export const fetchFeed = (): Promise<FeedItem[]> => {
  if (!cache) {
    cache = (async () => {
      const { data, error } = await cms
        .from("portfolio_feed")
        .select(COLS)
        .contains("show_on", ["bluluma"])
        .order("sort_order", { ascending: true, nullsFirst: false })
        .order("publish_date", { ascending: false, nullsFirst: false });
      if (error) {
        cache = null;
        throw error;
      }
      return (data ?? []) as FeedItem[];
    })();
  }
  return cache;
};

export const usePortfolioFeed = () => {
  const [items, setItems] = useState<FeedItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    let alive = true;
    fetchFeed()
      .then((d) => alive && setItems(d))
      .catch((e) => alive && setError(e.message ?? "error"))
      .finally(() => alive && setLoading(false));
    return () => {
      alive = false;
    };
  }, []);
  return { items, loading, error };
};

/** Categories a project belongs to: its `categories` array, falling back to the single `category` string. */
export const itemCategories = (it: FeedItem): string[] =>
  it.categories && it.categories.length > 0 ? it.categories.filter(Boolean) : it.category ? [it.category] : [];

export const itemInCategory = (it: FeedItem, catSlug: string): boolean =>
  itemCategories(it).some((c) => categorySlug(c) === catSlug);

/** English category name → Chinese name for one item (from the CMS name_zh column). */
export const categoryZhMap = (it: FeedItem): Record<string, string> => {
  const out: Record<string, string> = {};
  const en = it.categories ?? [];
  const zh = it.categories_zh ?? [];
  en.forEach((name, i) => {
    if (zh[i]) out[name] = zh[i];
  });
  return out;
};

export const feedCategories = (items: FeedItem[]) => {
  const map = new Map<string, { name: string; nameZh?: string; slug: string; count: number }>();
  for (const it of items) {
    const zhByName = categoryZhMap(it);
    for (const name of itemCategories(it)) {
      const slug = categorySlug(name);
      const e = map.get(slug) ?? { name, nameZh: zhByName[name], slug, count: 0 };
      e.count++;
      map.set(slug, e);
    }
  }
  return [...map.values()].sort((a, b) => a.name.localeCompare(b.name));
};
