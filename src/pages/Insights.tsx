import { Link } from "react-router-dom";
import { insights, insightTags } from "@/lib/insights";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useState } from "react";

const RevealSection = ({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) => {
  const ref = useScrollReveal({ delay });
  return <div ref={ref} className={className}>{children}</div>;
};

const Insights = () => {
  const [activeTag, setActiveTag] = useState<string | null>(null);

  const filtered = activeTag ? insights.filter((i) => i.tag === activeTag) : insights;

  return (
    <div>
      {/* Hero */}
      <section className="section-border">
        <div className="section-container py-16 md:py-24">
          <h1 className="text-4xl md:text-5xl font-bold">Insights</h1>
          <p className="mt-4 text-muted-foreground max-w-xl leading-relaxed">
            Ideas, processes, and practical observations from building brands and websites.
          </p>
          <p className="mt-2 text-muted-foreground max-w-xl leading-relaxed">
            These articles explore design systems, digital platforms, and the thinking behind modern agency work.
          </p>
        </div>
      </section>

      {/* Tags filter */}
      <section className="section-border">
        <div className="section-container py-4">
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setActiveTag(null)}
              className={`text-xs px-3 py-1.5 border transition-colors duration-200 ${
                activeTag === null
                  ? "border-primary text-primary"
                  : "border-border text-muted-foreground hover:border-foreground hover:text-foreground"
              }`}
            >
              All
            </button>
            {insightTags.map((tag) => (
              <button
                key={tag}
                onClick={() => setActiveTag(activeTag === tag ? null : tag)}
                className={`text-xs px-3 py-1.5 border transition-colors duration-200 ${
                  activeTag === tag
                    ? "border-primary text-primary"
                    : "border-border text-muted-foreground hover:border-foreground hover:text-foreground"
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Insights Grid */}
      <section>
        <div className="section-container section-padding">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-border border border-border">
            {filtered.map((insight, i) => (
              <RevealSection key={insight.slug} delay={i * 80}>
                <Link
                  to={`/insights/${insight.slug}`}
                  className="block bg-background group transition-all duration-300 hover:-translate-y-0.5"
                >
                  {/* Image placeholder */}
                  <div className="aspect-[16/9] bg-secondary border-b border-border overflow-hidden">
                    <div className="w-full h-full flex items-center justify-center text-muted-foreground text-xs group-hover:bg-muted transition-colors duration-300">
                      <span className="opacity-40">Article Image</span>
                    </div>
                  </div>
                  <div className="p-6 md:p-8">
                    <span className="text-[10px] uppercase tracking-widest text-primary font-medium">
                      {insight.tag}
                    </span>
                    <h3 className="text-lg font-semibold mt-2 mb-3 group-hover:text-primary transition-colors duration-200">
                      {insight.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                      {insight.summary}
                    </p>
                    <span className="text-xs text-foreground font-medium inline-flex items-center gap-1 group-hover:text-primary transition-colors duration-200">
                      Read Insight
                      <span className="transition-transform duration-200 group-hover:translate-x-0.5">→</span>
                    </span>
                  </div>
                </Link>
              </RevealSection>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Insights;
