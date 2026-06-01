import { createClient } from "@supabase/supabase-js";
import { useEffect, useState } from "react";

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
  const category = first ? { id: first.id, name: first.name, slug: first.slug } : null;
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
  const ids = shuffle((idRows ?? []).map((r: { id: string }) => r.id)).slice(0, limit);
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

// Random portfolio items scoped to a single category slug.
export async function fetchRandomPortfolioByCategory(
  categorySlug: string,
  limit = 6,
): Promise<PortfolioItem[]> {
  const { data: catRows, error: catErr } = await cms
    .from("categories")
    .select("id")
    .eq("client_id", BLULUMA_CLIENT_ID)
    .eq("category_type", "portfolio")
    .eq("slug", categorySlug)
    .limit(1);
  if (catErr) throw catErr;
  const catId = (catRows as { id: string }[] | null)?.[0]?.id;
  if (!catId) return [];
  const { data: links, error: linkErr } = await cms
    .from("content_categories")
    .select("content_id")
    .eq("category_id", catId);
  if (linkErr) throw linkErr;
  const ids = (links as { content_id: string }[] | null)?.map((l) => l.content_id) ?? [];
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
  return shuffle(items).slice(0, limit);
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
    const { data: catRows, error: catErr } = await cms
      .from("categories")
      .select("id")
      .eq("client_id", BLULUMA_CLIENT_ID)
      .eq("category_type", "portfolio")
      .eq("slug", categorySlug)
      .limit(1);
    if (catErr) throw catErr;
    const catId = (catRows as { id: string }[] | null)?.[0]?.id;
    if (!catId) return { items: [], total: 0 };
    const { data: links, error: linkErr } = await cms
      .from("content_categories")
      .select("content_id")
      .eq("category_id", catId);
    if (linkErr) throw linkErr;
    categoryFilterIds = (links as { content_id: string }[] | null)?.map((l) => l.content_id) ?? [];
    if (categoryFilterIds.length === 0) return { items: [], total: 0 };
  }

  const from = (page - 1) * perPage;
  const to = from + perPage - 1;
  let q = cms
    .from("content_items")
    .select(PORTFOLIO_SELECT, { count: "exact" })
    .eq("content_type", "portfolio")
    .eq("status", "published")
    .eq("client_id", BLULUMA_CLIENT_ID)
    .order("created_at", { ascending: false })
    .range(from, to);
  if (categoryFilterIds) q = q.in("id", categoryFilterIds);
  const { data, error, count } = await q;
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
    .select("id, content_categories(categories(slug, category_type))")
    .eq("content_type", "portfolio")
    .eq("status", "published")
    .eq("client_id", BLULUMA_CLIENT_ID);
  if (error) throw error;
  const counts: Record<string, number> = {};
  let total = 0;
  (data ?? []).forEach((row: {
    content_categories?: Array<{
      categories:
        | { slug: string; category_type: string }
        | Array<{ slug: string; category_type: string }>
        | null;
    }>;
  }) => {
    total += 1;
    (row.content_categories ?? []).forEach((cc) => {
      const c = Array.isArray(cc.categories) ? cc.categories[0] : cc.categories;
      if (c && c.category_type === "portfolio") {
        counts[c.slug] = (counts[c.slug] ?? 0) + 1;
      }
    });
  });
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