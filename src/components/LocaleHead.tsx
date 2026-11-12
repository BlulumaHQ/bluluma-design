import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useLang } from "@/lib/i18n";
import { HREFLANG, absoluteUrl } from "@/lib/locale";
import { routeMetaFor } from "@/lib/seoRoutes";

const PLATFORM_HOST = /(^|\.)(lovable\.app|workers\.dev|pages\.dev|netlify\.app)$/i;
/** Preview/platform hosts stay noindex (set by index.html); never override that. */
const onPlatformHost = () => PLATFORM_HOST.test(window.location.hostname.replace(/\.$/, ""));

const setMetaContent = (attr: "name" | "property", key: string, value: string) => {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", value);
};

const setLink = (selector: string, attrs: Record<string, string>) => {
  let el = document.head.querySelector<HTMLLinkElement>(selector);
  if (!el) {
    el = document.createElement("link");
    document.head.appendChild(el);
  }
  Object.entries(attrs).forEach(([k, v]) => el!.setAttribute(k, v));
};

/** Duplicate URLs that render the same page as a canonical one. */
const CANONICAL_ALIASES: Record<string, string> = {
  "/start": "/contact",
  "/proposal": "/contact",
  "/work": "/portfolio",
  "/case-study": "/case-studies",
};
/** Pages that should never be indexed. */
const NOINDEX = new Set(["/thank-you"]);

/** Canonical, og:url and hreflang alternates for every route, in both languages. */
export default function LocaleHead() {
  const { lang } = useLang();
  const { pathname } = useLocation(); // basename already stripped by the router
  useEffect(() => {
    const path = CANONICAL_ALIASES[pathname] ?? pathname;
    const self = absoluteUrl(path, lang);
    if (!onPlatformHost()) setMetaContent("name", "robots", NOINDEX.has(pathname) ? "noindex, follow" : "index, follow, max-image-preview:large");
    setLink('link[rel="canonical"]', { rel: "canonical", href: self });
    setLink('link[rel="alternate"][hreflang="en"]', { rel: "alternate", hreflang: HREFLANG.en, href: absoluteUrl(path, "en") });
    setLink(`link[rel="alternate"][hreflang="${HREFLANG.zh}"]`, { rel: "alternate", hreflang: HREFLANG.zh, href: absoluteUrl(path, "zh") });
    setLink('link[rel="alternate"][hreflang="x-default"]', { rel: "alternate", hreflang: "x-default", href: absoluteUrl(path, "en") });
    let og = document.head.querySelector<HTMLMetaElement>('meta[property="og:url"]');
    if (!og) {
      og = document.createElement("meta");
      og.setAttribute("property", "og:url");
      document.head.appendChild(og);
    }
    og.setAttribute("content", self);
    let locale = document.head.querySelector<HTMLMetaElement>('meta[property="og:locale"]');
    if (!locale) {
      locale = document.createElement("meta");
      locale.setAttribute("property", "og:locale");
      document.head.appendChild(locale);
    }
    locale.setAttribute("content", lang === "zh" ? "zh_TW" : "en_CA");
    // Static routes: language-correct title/description (runs after page effects).
    const meta = routeMetaFor(path)?.[lang];
    if (meta) {
      document.title = meta.title;
      setMetaContent("name", "description", meta.description);
      setMetaContent("property", "og:title", meta.title);
      setMetaContent("property", "og:description", meta.description);
      setMetaContent("name", "twitter:title", meta.title);
      setMetaContent("name", "twitter:description", meta.description);
    }
  });
  return null;
}
