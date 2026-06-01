import { NavLink } from "react-router-dom";
import { PORTFOLIO_CATEGORIES } from "@/lib/portfolioCategories";
import { usePortfolioCategoryCounts } from "@/lib/cms";
import { useLang } from "@/lib/i18n";

interface Props {
  activeSlug?: string;
}

const PortfolioSidebar = ({ activeSlug }: Props) => {
  const { lang } = useLang();
  const tt = (en: string, zh: string) => (lang === "zh" ? zh : en);
  const counts = usePortfolioCategoryCounts();
  const allCount = counts.__all__ ?? 0;

  const rowCls = (isActive: boolean) =>
    `group flex items-center justify-between gap-3 border-l-2 py-2.5 pl-4 pr-3 text-sm transition-colors ${
      isActive
        ? "border-primary bg-primary/5 text-foreground font-medium"
        : "border-transparent text-muted-foreground hover:border-border hover:text-foreground"
    }`;

  return (
    <nav aria-label={tt("Portfolio categories", "作品分類")} className="text-sm">
      <p className="mb-4 pl-4 text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
        {tt("Portfolio", "作品集")}
      </p>
      <ul className="flex flex-col">
        <li>
          <NavLink to="/portfolio" end className={({ isActive }) => rowCls(isActive && !activeSlug)}>
            <span>{tt("All Projects", "全部作品")}</span>
            <span className="tabular-nums text-xs text-muted-foreground">{allCount || ""}</span>
          </NavLink>
        </li>
        {PORTFOLIO_CATEGORIES.map((cat) => {
          const count = counts[cat.slug] ?? 0;
          const isActive = activeSlug === cat.slug;
          return (
            <li key={cat.slug}>
              <NavLink to={`/portfolio/${cat.slug}`} className={() => rowCls(isActive)}>
                <span className="leading-snug">{lang === "zh" ? cat.nameZh : cat.name}</span>
                <span className="tabular-nums text-xs text-muted-foreground">{count || ""}</span>
              </NavLink>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default PortfolioSidebar;