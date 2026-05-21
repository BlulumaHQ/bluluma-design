import type { PortfolioItem } from "@/lib/cms";
import { useLang } from "@/lib/i18n";

interface Props {
  item: PortfolioItem;
  variant?: "default" | "compact";
}

const Placeholder = ({ label }: { label: string }) => (
  <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-muted via-background to-muted text-xs uppercase tracking-[0.18em] text-muted-foreground">
    {label}
  </div>
);

const CmsPortfolioCard = ({ item, variant = "default" }: Props) => {
  const { lang } = useLang();
  const tt = (en: string, zh: string) => (lang === "zh" ? zh : en);
  const details = item.details;
  const summary = details?.short_summary || item.excerpt || "";
  const services = details?.services ?? [];
  const liveUrl = details?.live_url || undefined;

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-lg border border-border bg-background transition-all duration-300 hover:-translate-y-1 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10">
      <div className="relative aspect-[4/3] overflow-hidden bg-muted">
        {item.featured_image_url ? (
          <img
            src={item.featured_image_url}
            alt={`${item.title} — portfolio project by Bluluma`}
            loading="lazy"
            className="h-full w-full object-cover"
          />
        ) : (
          <Placeholder label={tt("Preview coming soon", "預覽圖即將上線")} />
        )}
      </div>
      <div className="flex flex-1 flex-col p-6 md:p-7">
        <div className="mb-2 flex flex-wrap items-baseline gap-x-3 gap-y-1">
          <h3 className="text-xl font-semibold md:text-2xl">{item.title}</h3>
          {details?.project_year && (
            <span className="text-xs uppercase tracking-[0.14em] text-muted-foreground">
              {details.project_year}
            </span>
          )}
        </div>
        {details?.client_name && variant !== "compact" && (
          <p className="mb-3 text-sm text-muted-foreground">{details.client_name}</p>
        )}
        {summary && (
          <p className="mb-5 text-sm leading-relaxed text-muted-foreground md:text-base">
            {summary}
          </p>
        )}
        {services.length > 0 && (
          <div className="mb-5 flex flex-wrap gap-1.5">
            {services.map((s) => (
              <span
                key={s}
                className="rounded-full border border-border bg-muted px-2.5 py-1 text-[11px] font-medium text-muted-foreground"
              >
                {s}
              </span>
            ))}
          </div>
        )}
        <div className="mt-auto flex flex-wrap gap-2 pt-2">
          {liveUrl && (
            <a
              href={liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
            >
              {tt("Open Live Website", "查看官網")} ↗
            </a>
          )}
        </div>
      </div>
    </article>
  );
};

export default CmsPortfolioCard;