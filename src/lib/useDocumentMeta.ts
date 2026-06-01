import { useEffect } from "react";

interface MetaOptions {
  title: string;
  description: string;
  canonicalPath: string;
}

const SITE = "https://bluluma-design-agency.lovable.app";

const setMeta = (selector: string, attr: string, value: string, create: () => HTMLElement) => {
  let el = document.head.querySelector<HTMLElement>(selector);
  if (!el) {
    el = create();
    document.head.appendChild(el);
  }
  el.setAttribute(attr, value);
};

/** Sets title, meta description, canonical, and basic OG tags for a route. */
export function useDocumentMeta({ title, description, canonicalPath }: MetaOptions) {
  useEffect(() => {
    const prevTitle = document.title;
    document.title = title;

    setMeta('meta[name="description"]', "content", description, () => {
      const m = document.createElement("meta");
      m.setAttribute("name", "description");
      return m;
    });

    const canonical = `${SITE}${canonicalPath}`;
    setMeta('link[rel="canonical"]', "href", canonical, () => {
      const l = document.createElement("link");
      l.setAttribute("rel", "canonical");
      return l;
    });

    setMeta('meta[property="og:title"]', "content", title, () => {
      const m = document.createElement("meta");
      m.setAttribute("property", "og:title");
      return m;
    });
    setMeta('meta[property="og:description"]', "content", description, () => {
      const m = document.createElement("meta");
      m.setAttribute("property", "og:description");
      return m;
    });
    setMeta('meta[property="og:url"]', "content", canonical, () => {
      const m = document.createElement("meta");
      m.setAttribute("property", "og:url");
      return m;
    });

    return () => {
      document.title = prevTitle;
    };
  }, [title, description, canonicalPath]);
}