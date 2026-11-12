// Build-time pre-render: after `vite build`, write a static HTML file for every
// indexable route in English and Traditional Chinese (/zh/...), each with its own
// <title>, description, canonical, hreflang alternates and (for articles) the full
// article text, plus a bilingual sitemap.xml. The SPA still boots on top of it.
import fs from "node:fs";
import path from "node:path";
import type { Plugin, ResolvedConfig } from "vite";
import { seoRoutes } from "../src/lib/seoRoutes";
import { articles, localizeArticle } from "../src/lib/articles";

type Lang = "en" | "zh";
const SITE = "https://bluluma.com";
const DEFAULT_IMAGE = `${SITE}/og/bluluma-og.jpg`;
const CMS_URL = "https://uzdjwpkgldzhnoxjeyrw.supabase.co";
const CMS_KEY = "sb_publishable_ifsg2zxajGqu19GsJ2X4RQ_KHBHGIvi"; // public, read-only (RLS)
const HREFLANG: Record<Lang, string> = { en: "en", zh: "zh-Hant" };

const esc = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

const localPath = (p: string, lang: Lang) => (lang === "zh" ? (p === "/" ? "/zh" : `/zh${p}`) : p);
const abs = (p: string, lang: Lang) => `${SITE}${localPath(p, lang)}`;

interface Page {
  path: string; // language-neutral path, e.g. /insights/foo
  lang: Lang;
  title: string;
  description: string;
  body: string; // HTML placed inside #root until React mounts
  image?: string; // absolute URL for og:image / twitter:image
  jsonLd?: object[];
  priority?: number;
  lastmod?: string;
}

const setTag = (html: string, re: RegExp, tag: string) =>
  re.test(html) ? html.replace(re, tag) : html.replace("</head>", `  ${tag}\n</head>`);

function renderPage(template: string, p: Page) {
  const t = esc(p.title);
  const d = esc(p.description);
  let html = template.replace(/<html lang="[^"]*">/, `<html lang="${p.lang === "zh" ? "zh-Hant" : "en"}">`);
  html = setTag(html, /<title>[\s\S]*?<\/title>/, `<title>${t}</title>`);
  html = setTag(html, /<meta name="description"[^>]*>/, `<meta name="description" content="${d}">`);
  html = setTag(html, /<meta property="og:title"[^>]*>/, `<meta property="og:title" content="${t}">`);
  html = setTag(html, /<meta property="og:description"[^>]*>/, `<meta property="og:description" content="${d}">`);
  html = setTag(html, /<meta name="twitter:title"[^>]*>/, `<meta name="twitter:title" content="${t}">`);
  html = setTag(html, /<meta name="twitter:description"[^>]*>/, `<meta name="twitter:description" content="${d}">`);
  html = setTag(html, /<meta property="og:url"[^>]*>/, `<meta property="og:url" content="${abs(p.path, p.lang)}" />`);
  html = setTag(html, /<link rel="canonical"[^>]*>/, `<link rel="canonical" href="${abs(p.path, p.lang)}" />`);
  const img = esc(p.image ?? DEFAULT_IMAGE);
  html = setTag(html, /<meta property="og:image"[^>]*>/, `<meta property="og:image" content="${img}">`);
  html = setTag(html, /<meta name="twitter:image"[^>]*>/, `<meta name="twitter:image" content="${img}">`);
  if (p.jsonLd?.length) {
    const ld = JSON.stringify({ "@context": "https://schema.org", "@graph": p.jsonLd }).replace(/</g, "\\u003c");
    html = html.replace("</head>", `    <script type="application/ld+json">${ld}</script>\n  </head>`);
  }
  const alternates = [
    `<link rel="alternate" hreflang="${HREFLANG.en}" href="${abs(p.path, "en")}" />`,
    `<link rel="alternate" hreflang="${HREFLANG.zh}" href="${abs(p.path, "zh")}" />`,
    `<link rel="alternate" hreflang="x-default" href="${abs(p.path, "en")}" />`,
    `<meta property="og:locale" content="${p.lang === "zh" ? "zh_TW" : "en_CA"}" />`,
  ].join("\n    ");
  html = html.replace("</head>", `    ${alternates}\n  </head>`);
  html = html.replace('<div id="root"></div>', `<div id="root">${p.body}</div>`);
  return html;
}

function articleBody(content: string) {
  return content
    .split(/\n{2,}/)
    .map((para) => {
      const lines = para.trim().split("\n");
      if (lines.every((l) => l.trim().startsWith("-"))) {
        return `<ul>${lines.map((l) => `<li>${esc(l.replace(/^\s*-\s*/, ""))}</li>`).join("")}</ul>`;
      }
      return `<p>${esc(para.trim())}</p>`;
    })
    .join("");
}

const crumbs = (lang: Lang, items: { name: string; path: string }[]) => ({
  "@type": "BreadcrumbList",
  itemListElement: items.map((it, i) => ({ "@type": "ListItem", position: i + 1, name: it.name, item: abs(it.path, lang) })),
});

function collectPages(assetImage: (slug: string) => string | undefined): Page[] {
  const pages: Page[] = [];
  for (const lang of ["en", "zh"] as Lang[]) {
    for (const r of seoRoutes) {
      const m = r[lang];
      pages.push({ path: r.path, lang, title: m.title, description: m.description, body: "" });
    }
    for (const raw of articles) {
      const a = localizeArticle(raw, lang);
      const path = `/insights/${a.slug}`;
      const image = assetImage(a.slug);
      pages.push({
        path,
        lang,
        title: a.seoTitle,
        description: a.metaDescription,
        image,
        lastmod: a.date,
        jsonLd: [
          {
            "@type": "BlogPosting",
            headline: a.title,
            description: a.metaDescription,
            datePublished: a.date,
            dateModified: a.date,
            inLanguage: HREFLANG[lang],
            mainEntityOfPage: abs(path, lang),
            ...(image ? { image } : {}),
            author: { "@id": `${SITE}/#organization` },
            publisher: { "@id": `${SITE}/#organization` },
          },
          crumbs(lang, [
            { name: lang === "zh" ? "首頁" : "Home", path: "/" },
            { name: lang === "zh" ? "文章" : "Insights", path: "/insights" },
            { name: a.title, path },
          ]),
        ],
        body: `<main><article><h1>${esc(a.title)}</h1><p>${esc(a.excerpt)}</p>${articleBody(a.content)}</article></main>`,
      });
    }
  }
  return pages;
}

function sitemap(pages: Page[]) {
  const prio = new Map(seoRoutes.map((r) => [r.path, r.priority]));
  const urls = pages.map((p) => {
    const lastmod = p.lastmod;
    const priority = p.priority ?? prio.get(p.path) ?? 0.6;
    return [
      "  <url>",
      `    <loc>${abs(p.path, p.lang)}</loc>`,
      `    <xhtml:link rel="alternate" hreflang="${HREFLANG.en}" href="${abs(p.path, "en")}"/>`,
      `    <xhtml:link rel="alternate" hreflang="${HREFLANG.zh}" href="${abs(p.path, "zh")}"/>`,
      `    <xhtml:link rel="alternate" hreflang="x-default" href="${abs(p.path, "en")}"/>`,
      lastmod ? `    <lastmod>${lastmod}</lastmod>` : "",
      `    <priority>${priority.toFixed(1)}</priority>`,
      "  </url>",
    ].filter(Boolean).join("\n");
  });
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${urls.join("\n")}\n</urlset>\n`;
}

/* ---------------- Portfolio (from the central CMS at build time) ---------------- */

interface FeedRow {
  title: string;
  slug: string;
  excerpt: string | null;
  featured_image_url: string | null;
  homepage_full_url: string | null;
  services: string[] | null;
  categories: string[] | null;
  categories_zh: string[] | null;
  publish_date: string | null;
  live_url: string | null;
}

const SERVICE_ZH: Record<string, string> = {
  "Website Design": "網站設計",
  "Logo Design": "Logo 設計",
  Branding: "品牌設計",
  "Marketing Materials": "行銷物料",
};
const catSlug = (name: string) =>
  name.toLowerCase().replace(/&/g, "and").replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");

async function fetchPortfolio(): Promise<FeedRow[]> {
  // Local testing hook: PRERENDER_PORTFOLIO_FILE=rows.json npm run build
  const file = process.env.PRERENDER_PORTFOLIO_FILE;
  if (file) return JSON.parse(fs.readFileSync(file, "utf8")) as FeedRow[];
  const cols = "title,slug,excerpt,featured_image_url,homepage_full_url,services,categories,categories_zh,publish_date,live_url";
  const url = `${CMS_URL}/rest/v1/portfolio_feed?select=${cols}&show_on=cs.%7Bbluluma%7D&order=sort_order.asc.nullslast,publish_date.desc.nullslast`;
  const res = await fetch(url, { headers: { apikey: CMS_KEY, Authorization: `Bearer ${CMS_KEY}` }, signal: AbortSignal.timeout(15000) });
  if (!res.ok) throw new Error(`portfolio_feed ${res.status}`);
  return (await res.json()) as FeedRow[];
}

function portfolioPages(rows: FeedRow[]): Page[] {
  const pages: Page[] = [];
  const cats = new Map<string, { en: string; zh: string; items: FeedRow[] }>();
  for (const r of rows) {
    (r.categories ?? []).forEach((name, i) => {
      const slug = catSlug(name);
      const c = cats.get(slug) ?? { en: name, zh: r.categories_zh?.[i] || name, items: [] };
      c.items.push(r);
      cats.set(slug, c);
    });
  }
  for (const lang of ["en", "zh"] as Lang[]) {
    const zh = lang === "zh";
    for (const r of rows) {
      if (!r.slug) continue;
      const path = `/portfolio/${r.slug}`;
      const services = (r.services ?? []).map((s) => (zh ? SERVICE_ZH[s] ?? s : s));
      const cat = zh ? r.categories_zh?.[0] ?? r.categories?.[0] : r.categories?.[0];
      const title = zh ? `${r.title}｜網站設計作品｜Bluluma` : `${r.title} — Website Design | Bluluma Portfolio`;
      const description = zh
        ? `Bluluma 為 ${r.title} 打造的網站作品${cat ? `（${cat}）` : ""}。服務內容：${services.join("、") || "網站設計"}。`
        : r.excerpt?.trim() ||
          `${r.title} website designed and built by Bluluma${cat ? ` (${cat})` : ""}. Services: ${services.join(", ") || "Website Design"}.`;
      const image = r.featured_image_url ?? r.homepage_full_url ?? undefined;
      pages.push({
        path,
        lang,
        title,
        description,
        image,
        priority: 0.5,
        lastmod: r.publish_date?.slice(0, 10),
        body: `<main><h1>${esc(r.title)}</h1><p>${esc(description)}</p></main>`,
        jsonLd: [
          {
            "@type": "CreativeWork",
            name: r.title,
            description,
            inLanguage: HREFLANG[lang],
            url: abs(path, lang),
            ...(image ? { image } : {}),
            creator: { "@id": `${SITE}/#organization` },
            ...(r.live_url && !/workers\.dev|lovable\.app|pages\.dev/.test(r.live_url) ? { sameAs: r.live_url } : {}),
          },
          crumbs(lang, [
            { name: zh ? "首頁" : "Home", path: "/" },
            { name: zh ? "作品集" : "Portfolio", path: "/portfolio" },
            { name: r.title, path },
          ]),
        ],
      });
    }
    for (const [slug, c] of cats) {
      const path = `/portfolio/${slug}`;
      const name = zh ? c.zh : c.en;
      const title = zh ? `${name}網站設計作品｜Bluluma` : `${name} Website Design Portfolio | Bluluma`;
      const description = zh
        ? `瀏覽 Bluluma 為${name}產業打造的 ${c.items.length} 個網站作品。`
        : `Browse ${c.items.length} ${name} websites designed and built by Bluluma.`;
      const links = c.items
        .map((r) => `<li><a href="${localPath(`/portfolio/${r.slug}`, lang)}">${esc(r.title)}</a></li>`)
        .join("");
      pages.push({
        path,
        lang,
        title,
        description,
        priority: 0.6,
        body: `<main><h1>${esc(title)}</h1><p>${esc(description)}</p><ul>${links}</ul></main>`,
        jsonLd: [
          crumbs(lang, [
            { name: zh ? "首頁" : "Home", path: "/" },
            { name: zh ? "作品集" : "Portfolio", path: "/portfolio" },
            { name, path },
          ]),
        ],
      });
    }
  }
  return pages;
}

export default function prerenderPlugin(): Plugin {
  let config: ResolvedConfig;
  return {
    name: "bluluma-prerender",
    apply: "build",
    configResolved(c) {
      config = c;
    },
    async closeBundle() {
      const outDir = path.resolve(config.root, config.build.outDir);
      const indexFile = path.join(outDir, "index.html");
      if (!fs.existsSync(indexFile)) return;
      const template = fs.readFileSync(indexFile, "utf8");
      const assets = fs.existsSync(path.join(outDir, "assets")) ? fs.readdirSync(path.join(outDir, "assets")) : [];
      const assetImage = (slug: string) => {
        const file = assets.find((f) => f.startsWith(`${slug}-`) && f.endsWith(".webp"));
        return file ? `${SITE}/assets/${file}` : undefined;
      };
      const pages = collectPages(assetImage);
      try {
        const rows = await fetchPortfolio();
        const extra = portfolioPages(rows);
        pages.push(...extra);
        config.logger.info(`bluluma-prerender: ${rows.length} portfolio projects from CMS`);
      } catch (e) {
        config.logger.warn(`bluluma-prerender: portfolio skipped (${(e as Error).message})`);
      }
      for (const p of pages) {
        const rel = localPath(p.path, p.lang);
        // /healthcare -> healthcare.html: served at /healthcare on Netlify without a trailing-slash redirect.
        const file = rel === "/" ? indexFile : path.join(outDir, `${rel.slice(1)}.html`);
        fs.mkdirSync(path.dirname(file), { recursive: true });
        fs.writeFileSync(file, renderPage(template, p));
      }
      fs.writeFileSync(path.join(outDir, "sitemap.xml"), sitemap(pages));
      config.logger.info(`bluluma-prerender: wrote ${pages.length} pages + sitemap.xml`);
    },
  };
}
