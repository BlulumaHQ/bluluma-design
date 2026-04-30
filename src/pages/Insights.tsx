import { Link, useParams } from "react-router-dom";
import { useState, useMemo } from "react";
import {
  articles,
  allCategories,
  allIndustries,
  allTags,
  type Industry,
} from "@/lib/articles";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { insightImages } from "@/pages/insightImages";

const RevealSection = ({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) => {
  const ref = useScrollReveal({ delay });
  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
};

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

const industryFromParam = (param?: string): Industry | null => {
  if (!param) return null;
  const map: Record<string, Industry> = {
    realtor: "Realtor",
    dentist: "Dentist",
  };
  return map[param.toLowerCase()] ?? null;
};

const Insights = () => {
  const { industry: industryParam } = useParams();
  const lockedIndustry = industryFromParam(industryParam);

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<string | null>(null);
  const [industry, setIndustry] = useState<Industry | null>(lockedIndustry);
  const [activeTag, setActiveTag] = useState<string | null>(null);

  // Sync when route changes
  if (lockedIndustry && industry !== lockedIndustry) {
    setIndustry(lockedIndustry);
  }

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return articles
      .filter((a) => (lockedIndustry ? a.industry === lockedIndustry : true))
      .filter((a) => (industry && !lockedIndustry ? a.industry === industry : true))
      .filter((a) => (category ? a.category === category : true))
      .filter((a) => (activeTag ? a.tags.includes(activeTag) : true))
      .filter((a) =>
        q
          ? a.title.toLowerCase().includes(q) ||
            a.excerpt.toLowerCase().includes(q) ||
            a.tags.some((t) => t.toLowerCase().includes(q))
          : true,
      )
      .slice()
      .sort((a, b) => (a.date < b.date ? 1 : -1));
  }, [search, category, industry, activeTag, lockedIndustry]);

  const heroTitle = lockedIndustry
    ? `${lockedIndustry} Insights`
    : "Insights";
  const heroSubtitle = lockedIndustry
    ? `Practical website, branding, and digital strategy insights for ${lockedIndustry.toLowerCase()}s.`
    : "Practical website, branding, and digital strategy insights for service businesses.";

  return (
    <div>
      {/* Hero (Dark) */}
      <section className="section-dark section-border">
        <div className="section-container py-16 md:py-24">
          <h1 className="text-4xl md:text-5xl font-bold">{heroTitle}</h1>
          <p
            className="mt-4 max-w-xl leading-relaxed"
            style={{ color: "hsl(220 10% 60%)" }}
          >
            {heroSubtitle}
          </p>
          {lockedIndustry && (
            <Link
              to="/insights"
              className="mt-6 inline-block text-sm text-primary hover:underline"
            >
              ← View all Insights
            </Link>
          )}
        </div>
      </section>

      {/* Filters */}
      <section className="section-border bg-background">
        <div className="section-container py-8 space-y-5">
          {/* Search */}
          <div>
            <input
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search insights…"
              className="w-full md:max-w-md px-4 py-3 text-sm border border-border rounded-lg bg-background focus:outline-none focus:border-primary transition-colors"
            />
          </div>

          {/* Category */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mr-2">
              Category
            </span>
            <button
              onClick={() => setCategory(null)}
              className={`text-xs px-3 py-1.5 border rounded-lg transition-colors ${
                category === null
                  ? "border-primary text-primary bg-primary/5"
                  : "border-border text-muted-foreground hover:border-primary hover:text-primary"
              }`}
            >
              All
            </button>
            {allCategories.map((c) => (
              <button
                key={c}
                onClick={() => setCategory(category === c ? null : c)}
                className={`text-xs px-3 py-1.5 border rounded-lg transition-colors ${
                  category === c
                    ? "border-primary text-primary bg-primary/5"
                    : "border-border text-muted-foreground hover:border-primary hover:text-primary"
                }`}
              >
                {c}
              </button>
            ))}
          </div>

          {/* Industry (hidden when locked by route) */}
          {!lockedIndustry && (
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mr-2">
                Industry
              </span>
              <button
                onClick={() => setIndustry(null)}
                className={`text-xs px-3 py-1.5 border rounded-lg transition-colors ${
                  industry === null
                    ? "border-primary text-primary bg-primary/5"
                    : "border-border text-muted-foreground hover:border-primary hover:text-primary"
                }`}
              >
                All
              </button>
              {allIndustries.map((ind) => (
                <button
                  key={ind}
                  onClick={() => setIndustry(industry === ind ? null : ind)}
                  className={`text-xs px-3 py-1.5 border rounded-lg transition-colors ${
                    industry === ind
                      ? "border-primary text-primary bg-primary/5"
                      : "border-border text-muted-foreground hover:border-primary hover:text-primary"
                  }`}
                >
                  {ind}
                </button>
              ))}
            </div>
          )}

          {/* Tags */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mr-2">
              Tags
            </span>
            <button
              onClick={() => setActiveTag(null)}
              className={`text-xs px-3 py-1.5 border rounded-lg transition-colors ${
                activeTag === null
                  ? "border-primary text-primary bg-primary/5"
                  : "border-border text-muted-foreground hover:border-primary hover:text-primary"
              }`}
            >
              All
            </button>
            {allTags.map((tag) => (
              <button
                key={tag}
                onClick={() => setActiveTag(activeTag === tag ? null : tag)}
                className={`text-xs px-3 py-1.5 border rounded-lg transition-colors ${
                  activeTag === tag
                    ? "border-primary text-primary bg-primary/5"
                    : "border-border text-muted-foreground hover:border-primary hover:text-primary"
                }`}
              >
                {tag}
              </button>
            ))}
          </div>

          <div className="text-xs text-muted-foreground pt-2">
            Sorted by date (newest first) · {filtered.length} article{filtered.length === 1 ? "" : "s"}
          </div>
        </div>
      </section>

      {/* Grid */}
      <section>
        <div className="section-container section-padding">
          {filtered.length === 0 ? (
            <div className="text-center py-16 text-muted-foreground">
              No articles match your filters.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {filtered.map((a, i) => {
                const img = a.featuredImage ?? insightImages[a.slug];
                return (
                  <RevealSection key={a.slug} delay={i * 60}>
                    <Link
                      to={`/insights/${a.slug}`}
                      className="block bg-background border border-border rounded-lg overflow-hidden group transition-all duration-300 hover:-translate-y-1 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10 h-full"
                    >
                      <div className="aspect-[16/9] bg-muted overflow-hidden">
                        {img ? (
                          <img
                            src={img}
                            alt={a.title}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                            loading="lazy"
                          />
                        ) : (
                          <div className="w-full h-full bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center">
                            <span className="text-primary/40 text-xs uppercase tracking-widest font-semibold">
                              {a.category}
                            </span>
                          </div>
                        )}
                      </div>
                      <div className="p-6 md:p-8">
                        <div className="flex flex-wrap items-center gap-2 mb-3 text-[10px] uppercase tracking-widest font-medium">
                          <span className="text-primary">{a.category}</span>
                          <span className="text-muted-foreground">·</span>
                          <span className="text-muted-foreground">
                            {a.industry}
                          </span>
                          <span className="text-muted-foreground">·</span>
                          <span className="text-muted-foreground normal-case tracking-normal">
                            {formatDate(a.date)}
                          </span>
                        </div>
                        <h3 className="text-lg font-semibold mb-3 group-hover:text-primary transition-colors duration-200">
                          {a.title}
                        </h3>
                        <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                          {a.excerpt}
                        </p>
                        <div className="flex flex-wrap gap-1.5 mb-4">
                          {a.tags.slice(0, 3).map((t) => (
                            <span
                              key={t}
                              className="text-[10px] px-2 py-0.5 border border-border rounded text-muted-foreground"
                            >
                              {t}
                            </span>
                          ))}
                        </div>
                        <span className="text-xs text-primary font-medium inline-flex items-center gap-1 group-hover:gap-2 transition-all duration-200">
                          Read More
                          <span>→</span>
                        </span>
                      </div>
                    </Link>
                  </RevealSection>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Insights;
