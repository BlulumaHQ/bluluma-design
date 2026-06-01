import { createClient } from "@supabase/supabase-js";
import { useEffect, useState } from "react";
import {
  CATEGORY_DB_SLUGS,
  CMS_SLUG_TO_SIDEBAR,
  OTHERS_SLUG,
  VISIBLE_CMS_CATEGORY_SLUGS,
  PORTFOLIO_CATEGORIES,
} from "./portfolioCategories";

const SUPABASE_URL = "https://uzdjwpkgldzhnoxjeyrw.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "sb_publishable_ifsg2zxajGqu19GsJ2X4RQ_KHBHGIvi";
export const BLULUMA_CLIENT_ID = "b237218e-d944-4af0-87b2-09379102e53e";

export const cms = createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
  auth: { persistSession: false },
});

export interface PortfolioDetails {
  live_url: string | null;
  services: string[] | null;
  client_name: string | null;
  project_year: string | null;
  short_summary: string | null;
}

export interface PortfolioCategory {
  id: string;
  name: string;
  slug: string;
}

export interface PortfolioItem {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  body_content: string | null;
  featured_image_url: string | null;
  is_featured: boolean;
  sort_order: number | null;
  created_at: string;
  details: PortfolioDetails | null;
  category: PortfolioCategory | null;
  seo_title?: string | null;
  seo_description?: string | null;
}

interface RawRow {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  body_content: string | null;
  featured_image_url: string | null;
  is_featured: boolean | null;
  sort_order: number | null;
  created_at: string;
  seo_title?: string | null;
  seo_description?: string | null;
  portfolio_details: PortfolioDetails[] | PortfolioDetails | null;
  content_categories?: Array<{
    categories:
      | { id: string; name: string; slug: string; category_type: string }
      | Array<{ id: string; name: string; slug: string; category_type: string }>
      | null;
  }> | null;
}

const mapRow = (row: RawRow): PortfolioItem => {
  const details = Array.isArray(row.portfolio_details)
    ? row.portfolio_details[0] ?? null
    : row.portfolio_details;
  const catCandidates = (row.content_categories ?? [])
    .map((cc) => (Array.isArray(cc.categories) ? cc.categories[0] : cc.categories))
    .filter((c): c is { id: string; name: string; slug: string; category_type: string } =>
      !!c && c.category_type === "portfolio",
    );
  const first = catCandidates[0];
  let category = first
    ? {
        id: first.id,
        name: first.name,
        // Translate CMS slug → sidebar slug so portfolio URLs use the
        // pretty site routes (e.g. realtor-realty) instead of raw CMS slugs.
        slug: CMS_SLUG_TO_SIDEBAR[first.slug] ?? first.slug,
      }
    : null;
  // Site-level category overrides (CMS is not modified).
  const overrideTarget = ITEM_CATEGORY_OVERRIDES[row.slug];
  if (overrideTarget) {
    const def = PORTFOLIO_CATEGORIES.find((c) => c.slug === overrideTarget);
    category = {
      id: category?.id ?? `override-${overrideTarget}`,
      name: def?.name ?? overrideTarget,
      slug: overrideTarget,
    };
  }
  return {
    id: row.id,
    title: row.title,
    slug: row.slug,
    excerpt: row.excerpt,
    body_content: row.body_content,
    featured_image_url: row.featured_image_url,
    is_featured: !!row.is_featured,
    sort_order: row.sort_order,
    created_at: row.created_at,
    details: details ?? null,
    category,
    seo_title: row.seo_title ?? null,
    seo_description: row.seo_description ?? null,
  };
};

// Site-level category overrides keyed by content_item slug.
// The CMS is not modified; these overrides apply to display, filtering, and counts.
const ITEM_CATEGORY_OVERRIDES: Record<string, string> = {
  "first-third-designs": "artist-tattoo-creative-industry",
};

const overrideSlugsTargeting = (sidebarSlug: string): string[] =>
  Object.entries(ITEM_CATEGORY_OVERRIDES)
    .filter(([, target]) => target === sidebarSlug)
    .map(([s]) => s);

const overrideSlugsNotTargeting = (sidebarSlug: string): string[] =>
  Object.entries(ITEM_CATEGORY_OVERRIDES)
    .filter(([, target]) => target !== sidebarSlug)
    .map(([s]) => s);

async function fetchContentIdsByItemSlugs(slugs: string[]): Promise<string[]> {
  if (slugs.length === 0) return [];
  const { data, error } = await cms
    .from("content_items")
    .select("id")
    .eq("content_type", "portfolio")
    .eq("status", "published")
    .eq("client_id", BLULUMA_CLIENT_ID)
    .in("slug", slugs);
  if (error) throw error;
  return ((data as { id: string }[] | null) ?? []).map((r) => r.id);
}

async function applyOverridesToCategoryIds(
  ids: string[],
  sidebarSlug: string,
): Promise<string[]> {
  const addIds = await fetchContentIdsByItemSlugs(overrideSlugsTargeting(sidebarSlug));
  const removeIds = new Set(
    await fetchContentIdsByItemSlugs(overrideSlugsNotTargeting(sidebarSlug)),
  );
  return Array.from(new Set([...ids, ...addIds])).filter((id) => !removeIds.has(id));
}

interface FetchOptions {
  featuredOnly?: boolean;
  limit?: number;
}

const PORTFOLIO_SELECT =
  "id, title, slug, excerpt, body_content, featured_image_url, is_featured, sort_order, created_at, seo_title, seo_description, portfolio_details(live_url, services, client_name, project_year, short_summary), content_categories(categories(id, name, slug, category_type))";

export async function fetchPortfolioItems(opts: FetchOptions = {}): Promise<PortfolioItem[]> {
  let query = cms
    .from("content_items")
    .select(PORTFOLIO_SELECT)
    .eq("content_type", "portfolio")
    .eq("status", "published")
    .eq("client_id", BLULUMA_CLIENT_ID)
    .order("sort_order", { ascending: true, nullsFirst: false })
    .order("created_at", { ascending: false });

  if (opts.featuredOnly) query = query.eq("is_featured", true);
  if (opts.limit) query = query.limit(opts.limit);

  const { data, error } = await query;
  if (error) throw error;
  return (data as unknown as RawRow[] | null)?.map(mapRow) ?? [];
}

export async function fetchPortfolioBySlug(
  categorySlug: string,
  slug: string,
): Promise<PortfolioItem | null> {
  const { data, error } = await cms
    .from("content_items")
    .select(PORTFOLIO_SELECT)
    .eq("content_type", "portfolio")
    .eq("status", "published")
    .eq("client_id", BLULUMA_CLIENT_ID)
    .eq("slug", slug);
  if (error) throw error;
  const items = (data as unknown as RawRow[] | null)?.map(mapRow) ?? [];
  return items.find((i) => i.category?.slug === categorySlug) ?? items[0] ?? null;
}

export interface CategoryWithCount extends PortfolioCategory {
  count: number;
}

export async function fetchPortfolioCategories(): Promise<CategoryWithCount[]> {
  const items = await fetchPortfolioItems();
  const map = new Map<string, CategoryWithCount>();
  items.forEach((it) => {
    if (!it.category) return;
    const cur = map.get(it.category.slug);
    if (cur) cur.count += 1;
    else map.set(it.category.slug, { ...it.category, count: 1 });
  });
  return Array.from(map.values()).sort((a, b) => a.name.localeCompare(b.name));
}

export function getPortfolioUrl(item: PortfolioItem): string {
  const cat = item.category?.slug || "uncategorized";
  return `/portfolio/${cat}/${item.slug}`;
}

const shuffle = <T,>(arr: T[]): T[] => {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};

// Daily seed in UTC so all visitors see the same ordering for the entire day.
const dailySeed = (salt = ""): number => {
  const d = new Date();
  const key = `${d.getUTCFullYear()}-${d.getUTCMonth() + 1}-${d.getUTCDate()}:${salt}`;
  let h = 2166136261 >>> 0;
  for (let i = 0; i < key.length; i++) {
    h ^= key.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
};

// mulberry32 PRNG — deterministic given a seed.
const mulberry32 = (seed: number) => {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
};

const seededShuffle = <T,>(arr: T[], seed: number): T[] => {
  const a = arr.slice();
  const rand = mulberry32(seed);
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};

// Fetches a random sample of N published portfolio items.
// Two-step: pull only IDs (lightweight) then fetch the chosen rows in full.
export async function fetchRandomPortfolioItems(limit = 12): Promise<PortfolioItem[]> {
  const { data: idRows, error: idErr } = await cms
    .from("content_items")
    .select("id")
    .eq("content_type", "portfolio")
    .eq("status", "published")
    .eq("client_id", BLULUMA_CLIENT_ID);
  if (idErr) throw idErr;
  const allIds = (idRows ?? [])
    .map((r: { id: string }) => r.id)
    .slice()
    .sort();
  const ids = seededShuffle(allIds, dailySeed("home")).slice(0, limit);
  if (ids.length === 0) return [];
  const { data, error } = await cms
    .from("content_items")
    .select(PORTFOLIO_SELECT)
    .in("id", ids);
  if (error) throw error;
  const items = (data as unknown as RawRow[] | null)?.map(mapRow) ?? [];
  // Preserve the random order chosen above.
  const order = new Map(ids.map((id, i) => [id, i]));
  return items.sort((a, b) => (order.get(a.id) ?? 0) - (order.get(b.id) ?? 0));
}

export function useRandomPortfolioItems(limit = 12) {
  const [items, setItems] = useState<PortfolioItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    fetchRandomPortfolioItems(limit)
      .then((d) => !cancelled && setItems(d))
      .catch((e) => !cancelled && setError(e instanceof Error ? e : new Error(String(e))))
      .finally(() => !cancelled && setLoading(false));
    return () => {
      cancelled = true;
    };
  }, [limit]);
  return { items, loading, error };
}

// Resolve a sidebar slug to the list of CMS category slugs it should query.
const dbSlugsFor = (sidebarSlug: string): string[] =>
  CATEGORY_DB_SLUGS[sidebarSlug] ?? [sidebarSlug];

// Fetch the IDs of content items linked to ANY of the given CMS category slugs.
async function fetchContentIdsForSlugs(slugs: string[]): Promise<string[]> {
  if (slugs.length === 0) return [];
  const { data: catRows, error: catErr } = await cms
    .from("categories")
    .select("id")
    .eq("client_id", BLULUMA_CLIENT_ID)
    .eq("category_type", "portfolio")
    .in("slug", slugs);
  if (catErr) throw catErr;
  const catIds = ((catRows as { id: string }[] | null) ?? []).map((r) => r.id);
  if (catIds.length === 0) return [];
  const { data: links, error: linkErr } = await cms
    .from("content_categories")
    .select("content_id")
    .in("category_id", catIds);
  if (linkErr) throw linkErr;
  const ids = ((links as { content_id: string }[] | null) ?? []).map(
    (l) => l.content_id,
  );
  return Array.from(new Set(ids));
}

// Fetch content IDs that should fall under the "Others" bucket: items whose
// every assigned portfolio category is outside the visible sidebar set
// (or items with no portfolio category at all).
async function fetchOthersContentIds(): Promise<string[]> {
  const { data, error } = await cms
    .from("content_items")
    .select("id, content_categories(categories(slug, category_type))")
    .eq("content_type", "portfolio")
    .eq("status", "published")
    .eq("client_id", BLULUMA_CLIENT_ID);
  if (error) throw error;
  const rows = (data ?? []) as Array<{
    id: string;
    content_categories?: Array<{
      categories:
        | { slug: string; category_type: string }
        | Array<{ slug: string; category_type: string }>
        | null;
    }>;
  }>;
  return rows
    .filter((row) => {
      const cats = (row.content_categories ?? [])
        .map((cc) => (Array.isArray(cc.categories) ? cc.categories[0] : cc.categories))
        .filter(
          (c): c is { slug: string; category_type: string } =>
            !!c && c.category_type === "portfolio",
        );
      if (cats.length === 0) return true;
      return !cats.some((c) => VISIBLE_CMS_CATEGORY_SLUGS.has(c.slug));
    })
    .map((r) => r.id);
}

// Random portfolio items scoped to a single category slug.
export async function fetchRandomPortfolioByCategory(
  categorySlug: string,
  limit = 6,
): Promise<PortfolioItem[]> {
  let ids =
    categorySlug === OTHERS_SLUG
      ? await fetchOthersContentIds()
      : await fetchContentIdsForSlugs(dbSlugsFor(categorySlug));
  ids = await applyOverridesToCategoryIds(ids, categorySlug);
  if (ids.length === 0) return [];
  const { data, error } = await cms
    .from("content_items")
    .select(PORTFOLIO_SELECT)
    .eq("content_type", "portfolio")
    .eq("status", "published")
    .eq("client_id", BLULUMA_CLIENT_ID)
    .in("id", ids);
  if (error) throw error;
  const items = (data as unknown as RawRow[] | null)?.map(mapRow) ?? [];
  return seededShuffle(items, dailySeed(`cat:${categorySlug}`)).slice(0, limit);
}

export function useRandomPortfolioByCategory(categorySlug: string, limit = 6) {
  const [items, setItems] = useState<PortfolioItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    fetchRandomPortfolioByCategory(categorySlug, limit)
      .then((d) => !cancelled && setItems(d))
      .catch((e) => !cancelled && setError(e instanceof Error ? e : new Error(String(e))))
      .finally(() => !cancelled && setLoading(false));
    return () => {
      cancelled = true;
    };
  }, [categorySlug, limit]);
  return { items, loading, error };
}

export interface PaginatedPortfolio {
  items: PortfolioItem[];
  total: number;
}

// Server-paginated fetch, newest first, optionally scoped to a category slug.
export async function fetchPortfolioPage(
  page: number,
  perPage: number,
  categorySlug?: string,
): Promise<PaginatedPortfolio> {
  let categoryFilterIds: string[] | null = null;
  if (categorySlug) {
    const baseIds =
      categorySlug === OTHERS_SLUG
        ? await fetchOthersContentIds()
        : await fetchContentIdsForSlugs(dbSlugsFor(categorySlug));
    categoryFilterIds = await applyOverridesToCategoryIds(baseIds, categorySlug);
    if (categoryFilterIds.length === 0) return { items: [], total: 0 };
  }

  // All Projects (no category): daily-random ordering, consistent across
  // pagination for the entire day. Fetch all IDs, deterministically shuffle,
  // then fetch only the page slice.
  if (!categorySlug) {
    const { data: idRows, error: idErr } = await cms
      .from("content_items")
      .select("id")
      .eq("content_type", "portfolio")
      .eq("status", "published")
      .eq("client_id", BLULUMA_CLIENT_ID);
    if (idErr) throw idErr;
    const allIds = (idRows ?? [])
      .map((r: { id: string }) => r.id)
      .slice()
      .sort();
    const ordered = seededShuffle(allIds, dailySeed("portfolio-all"));
    const total = ordered.length;
    const from = (page - 1) * perPage;
    const pageIds = ordered.slice(from, from + perPage);
    if (pageIds.length === 0) return { items: [], total };
    const { data, error } = await cms
      .from("content_items")
      .select(PORTFOLIO_SELECT)
      .in("id", pageIds);
    if (error) throw error;
    const items = (data as unknown as RawRow[] | null)?.map(mapRow) ?? [];
    const order = new Map(pageIds.map((id, i) => [id, i]));
    items.sort((a, b) => (order.get(a.id) ?? 0) - (order.get(b.id) ?? 0));
    return { items, total };
  }

  // Category pages: fixed order (created_at desc).
  const from = (page - 1) * perPage;
  const to = from + perPage - 1;
  const { data, error, count } = await cms
    .from("content_items")
    .select(PORTFOLIO_SELECT, { count: "exact" })
    .eq("content_type", "portfolio")
    .eq("status", "published")
    .eq("client_id", BLULUMA_CLIENT_ID)
    .order("created_at", { ascending: false })
    .range(from, to)
    .in("id", categoryFilterIds!);
  if (error) throw error;
  const items = (data as unknown as RawRow[] | null)?.map(mapRow) ?? [];
  return { items, total: count ?? items.length };
}

export function usePortfolioPage(page: number, perPage: number, categorySlug?: string) {
  const [data, setData] = useState<PaginatedPortfolio>({ items: [], total: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);
    fetchPortfolioPage(page, perPage, categorySlug)
      .then((d) => !cancelled && setData(d))
      .catch((e) => !cancelled && setError(e instanceof Error ? e : new Error(String(e))))
      .finally(() => !cancelled && setLoading(false));
    return () => {
      cancelled = true;
    };
  }, [page, perPage, categorySlug]);
  return { ...data, loading, error };
}

// Counts per portfolio category, used by the sidebar.
export async function fetchPortfolioCategoryCounts(): Promise<Record<string, number>> {
  const { data, error } = await cms
    .from("content_items")
    .select("id, slug, content_categories(categories(slug, category_type))")
    .eq("content_type", "portfolio")
    .eq("status", "published")
    .eq("client_id", BLULUMA_CLIENT_ID);
  if (error) throw error;
  const counts: Record<string, number> = {};
  let total = 0;
  // Reverse map: CMS slug → sidebar slug it rolls up into.
  const cmsToSidebar: Record<string, string> = {};
  Object.entries(CATEGORY_DB_SLUGS).forEach(([sidebar, dbSlugs]) => {
    dbSlugs.forEach((s) => {
      cmsToSidebar[s] = sidebar;
    });
  });
  let othersCount = 0;
  (data ?? []).forEach((row: {
    slug?: string;
    content_categories?: Array<{
      categories:
        | { slug: string; category_type: string }
        | Array<{ slug: string; category_type: string }>
        | null;
    }>;
  }) => {
    total += 1;
    const sidebarBuckets = new Set<string>();
    const override = row.slug ? ITEM_CATEGORY_OVERRIDES[row.slug] : undefined;
    if (override) {
      sidebarBuckets.add(override);
    } else {
      const cats = (row.content_categories ?? [])
        .map((cc) => (Array.isArray(cc.categories) ? cc.categories[0] : cc.categories))
        .filter(
          (c): c is { slug: string; category_type: string } =>
            !!c && c.category_type === "portfolio",
        );
      cats.forEach((c) => {
        const bucket = cmsToSidebar[c.slug] ?? c.slug;
        if (VISIBLE_CMS_CATEGORY_SLUGS.has(c.slug)) {
          sidebarBuckets.add(bucket);
        }
      });
    }
    if (sidebarBuckets.size === 0) {
      othersCount += 1;
    } else {
      sidebarBuckets.forEach((slug) => {
        counts[slug] = (counts[slug] ?? 0) + 1;
      });
    }
  });
  if (othersCount > 0) counts[OTHERS_SLUG] = othersCount;
  counts.__all__ = total;
  return counts;
}

export function usePortfolioCategoryCounts() {
  const [counts, setCounts] = useState<Record<string, number>>({});
  useEffect(() => {
    fetchPortfolioCategoryCounts()
      .then(setCounts)
      .catch(() => setCounts({}));
  }, []);
  return counts;
}

export function usePortfolioItems(opts: FetchOptions = {}) {
  const [items, setItems] = useState<PortfolioItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const key = JSON.stringify(opts);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);
    fetchPortfolioItems(opts)
      .then((data) => {
        if (!cancelled) setItems(data);
      })
      .catch((err) => {
        if (!cancelled) setError(err instanceof Error ? err : new Error(String(err)));
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  return { items, loading, error };
}

export function usePortfolioBySlug(categorySlug: string | undefined, slug: string | undefined) {
  const [item, setItem] = useState<PortfolioItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!categorySlug || !slug) {
      setLoading(false);
      return;
    }
    let cancelled = false;
    setLoading(true);
    setError(null);
    fetchPortfolioBySlug(categorySlug, slug)
      .then((data) => {
        if (!cancelled) setItem(data);
      })
      .catch((err) => {
        if (!cancelled) setError(err instanceof Error ? err : new Error(String(err)));
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [categorySlug, slug]);

  return { item, loading, error };
}