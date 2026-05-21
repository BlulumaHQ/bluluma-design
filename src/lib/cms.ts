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
  portfolio_details: PortfolioDetails[] | PortfolioDetails | null;
}

const mapRow = (row: RawRow): PortfolioItem => {
  const details = Array.isArray(row.portfolio_details)
    ? row.portfolio_details[0] ?? null
    : row.portfolio_details;
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
  };
};

interface FetchOptions {
  featuredOnly?: boolean;
  limit?: number;
}

export async function fetchPortfolioItems(opts: FetchOptions = {}): Promise<PortfolioItem[]> {
  let query = cms
    .from("content_items")
    .select(
      "id, title, slug, excerpt, body_content, featured_image_url, is_featured, sort_order, created_at, portfolio_details(live_url, services, client_name, project_year, short_summary)",
    )
    .eq("content_type", "portfolio")
    .eq("status", "published")
    .eq("client_id", BLULUMA_CLIENT_ID)
    .order("sort_order", { ascending: true, nullsFirst: false })
    .order("created_at", { ascending: false });

  if (opts.featuredOnly) query = query.eq("is_featured", true);
  if (opts.limit) query = query.limit(opts.limit);

  const { data, error } = await query;
  if (error) throw error;
  return (data as RawRow[] | null)?.map(mapRow) ?? [];
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