import { Link } from "react-router-dom";
import { getPortfolioUrl, type PortfolioItem } from "@/lib/cms";
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
  const detailUrl = getPortfolioUrl(item);

  return (
    <CardWrapper detailUrl={detailUrl} title={item.title}>
      <div className="portfolio-preview-viewport relative bg-muted" style={{ height: 320 }}>
        {item.featured_image_url ? (
          <img
            src={item.featured_image_url}
            alt={`${item.title} — portfolio project by Bluluma`}
            loading="lazy"
            className="block w-full h-auto"
          />
        ) : (
          <div className="absolute inset-0">
            <Placeholder label={tt("Preview coming soon", "預覽圖即將上線")} />
          </div>
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
        {liveUrl && (
          <div className="mt-auto pt-2">
            <span className="block w-full rounded-lg bg-primary px-4 py-2.5 text-center text-sm font-medium text-primary-foreground transition-opacity group-hover:opacity-90">
              {tt("View Project", "查看作品")} →
            </span>
          </div>
        )}
      </div>
    </CardWrapper>
  );
};

const CardWrapper = ({
  detailUrl,
  title,
  children,
}: {
  detailUrl: string;
  title: string;
  children: React.ReactNode;
}) => {
  const cls =
    "group flex h-full flex-col overflow-hidden rounded-lg border border-border bg-background transition-colors duration-300 hover:border-primary/50";
  return (
    <Link to={detailUrl} aria-label={`View ${title} portfolio details`} className={cls}>
      {children}
    </Link>
  );
};

export default CmsPortfolioCard;