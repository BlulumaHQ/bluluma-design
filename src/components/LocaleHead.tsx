import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useLang } from "@/lib/i18n";
import { HREFLANG, absoluteUrl } from "@/lib/locale";

const setLink = (selector: string, attrs: Record<string, string>) => {
  let el = document.head.querySelector<HTMLLinkElement>(selector);
  if (!el) {
    el = document.createElement("link");
    document.head.appendChild(el);
  }
  Object.entries(attrs).forEach(([k, v]) => el!.setAttribute(k, v));
};

/** Canonical, og:url and hreflang alternates for every route, in both languages. */
export default function LocaleHead() {
  const { lang } = useLang();
  const { pathname } = useLocation(); // basename already stripped by the router
  useEffect(() => {
    const self = absoluteUrl(pathname, lang);
    setLink('link[rel="canonical"]', { rel: "canonical", href: self });
    setLink('link[rel="alternate"][hreflang="en"]', { rel: "alternate", hreflang: HREFLANG.en, href: absoluteUrl(pathname, "en") });
    setLink(`link[rel="alternate"][hreflang="${HREFLANG.zh}"]`, { rel: "alternate", hreflang: HREFLANG.zh, href: absoluteUrl(pathname, "zh") });
    setLink('link[rel="alternate"][hreflang="x-default"]', { rel: "alternate", hreflang: "x-default", href: absoluteUrl(pathname, "en") });
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
  });
  return null;
}
