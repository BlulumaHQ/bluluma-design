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