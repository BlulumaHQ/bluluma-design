import { useEffect } from "react";

interface MetaOptions {
  title: string;
  description: string;
  canonicalPath: string;
}


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

    return () => {
      document.title = prevTitle;
    };
  // canonical/og:url/hreflang are set per route by LocaleHead
  }, [title, description, canonicalPath]);
}