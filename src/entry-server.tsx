// Build-time pre-render entry (used by scripts/prerenderPlugin.ts, never shipped to the browser).
// Renders a route to static HTML so crawlers and AI search see the page's real text.
// The browser app still mounts with createRoot and replaces this markup.
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TooltipProvider } from "@/components/ui/tooltip";
import { LangProvider } from "@/lib/i18n";
import { localizePath, type Lang } from "@/lib/locale";
import { AppContent } from "./App";

export function render(path: string, lang: Lang): string {
  const client = new QueryClient({ defaultOptions: { queries: { enabled: false, retry: false } } });
  return renderToString(
    <QueryClientProvider client={client}>
      <LangProvider initialLang={lang}>
        <TooltipProvider>
          <StaticRouter location={localizePath(path, lang)} basename={lang === "zh" ? "/zh" : undefined}>
            <AppContent />
          </StaticRouter>
        </TooltipProvider>
      </LangProvider>
    </QueryClientProvider>,
  );
}
