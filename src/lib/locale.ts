// Language lives in the URL: English at "/…", Traditional Chinese at "/zh/…".
// Kept free of React/browser imports so the build-time prerender can reuse it.
export type Lang = "en" | "zh";

export const SITE = "https://bluluma.com";
export const ZH_PREFIX = "/zh";
export const HREFLANG: Record<Lang, string> = { en: "en", zh: "zh-Hant" };

export const langFromPath = (pathname: string): Lang =>
  pathname === ZH_PREFIX || pathname.startsWith(`${ZH_PREFIX}/`) ? "zh" : "en";

/** Path without the /zh prefix ("/zh/insights/x" -> "/insights/x", "/zh" -> "/"). */
export const stripLang = (pathname: string): string => {
  if (langFromPath(pathname) === "en") return pathname || "/";
  const rest = pathname.slice(ZH_PREFIX.length);
  return rest === "" ? "/" : rest;
};

/** Same page in the requested language. */
export const localizePath = (path: string, lang: Lang): string => {
  const base = stripLang(path);
  if (lang === "en") return base;
  return base === "/" ? ZH_PREFIX : `${ZH_PREFIX}${base}`;
};

export const absoluteUrl = (path: string, lang: Lang): string => {
  const p = localizePath(path, lang);
  return `${SITE}${p === "/" ? "/" : p.replace(/\/$/, "")}`;
};
