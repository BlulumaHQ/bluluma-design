import { Link } from "react-router-dom";
import type { FeedItem } from "@/lib/portfolioFeed";

const FeedPortfolioCard = ({ item }: { item: FeedItem }) => {
  const img = item.homepage_full_url || item.featured_image_url;
  const services = (item.services ?? []).filter(Boolean);
  return (
    <div className="flex flex-col">
      <div className="feed-card-frame aspect-[4/5] w-full overflow-y-auto rounded-xl border border-border bg-muted shadow-sm">
        {img && (
          <img src={img} alt={`${item.title} homepage`} loading="lazy" decoding="async" className="block h-auto w-full" />
        )}
      </div>
      <Link to={`/portfolio/${item.slug}`} className="mt-4 truncate text-base font-semibold text-foreground hover:text-primary">
        {item.title}
      </Link>
      {services.length > 0 && (
        <p className="mt-1 text-xs text-muted-foreground">{services.join(" · ")}</p>
      )}
    </div>
  );
};

export default FeedPortfolioCard;
