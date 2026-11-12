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

function collectPages(): Page[] {
  const pages: Page[] = [];
  for (const lang of ["en", "zh"] as Lang[]) {
    for (const r of seoRoutes) {
      const m = r[lang];
      pages.push({ path: r.path, lang, title: m.title, description: m.description, body: "" });
    }
    for (const raw of articles) {
      const a = localizeArticle(raw, lang);
      pages.push({
        path: `/insights/${a.slug}`,
        lang,
        title: a.seoTitle,
        description: a.metaDescription,
        body: `<main><article><h1>${esc(a.title)}</h1><p>${esc(a.excerpt)}</p>${articleBody(a.content)}</article></main>`,
      });
    }
  }
  return pages;
}

function sitemap(pages: Page[]) {
  const dates = new Map(articles.map((a) => [`/insights/${a.slug}`, a.date]));
  const prio = new Map(seoRoutes.map((r) => [r.path, r.priority]));
  const urls = pages.map((p) => {
    const lastmod = dates.get(p.path);
    const priority = prio.get(p.path) ?? 0.6;
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

export default function prerenderPlugin(): Plugin {
  let config: ResolvedConfig;
  return {
    name: "bluluma-prerender",
    apply: "build",
    configResolved(c) {
      config = c;
    },
    closeBundle() {
      const outDir = path.resolve(config.root, config.build.outDir);
      const indexFile = path.join(outDir, "index.html");
      if (!fs.existsSync(indexFile)) return;
      const template = fs.readFileSync(indexFile, "utf8");
      const pages = collectPages();
      for (const p of pages) {
        const rel = localPath(p.path, p.lang);
        const file = rel === "/" ? indexFile : path.join(outDir, rel, "index.html");
        fs.mkdirSync(path.dirname(file), { recursive: true });
        fs.writeFileSync(file, renderPage(template, p));
      }
      fs.writeFileSync(path.join(outDir, "sitemap.xml"), sitemap(pages));
      config.logger.info(`bluluma-prerender: wrote ${pages.length} pages + sitemap.xml`);
    },
  };
}
