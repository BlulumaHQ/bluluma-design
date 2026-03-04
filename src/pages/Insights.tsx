const topics = [
  { title: "Web Design", desc: "Insights on modern web design practices, trends, and performance optimization." },
  { title: "Brand Strategy", desc: "Thinking on brand positioning, identity systems, and long-term brand building." },
  { title: "AI Automation", desc: "Exploring how AI tools and automation can improve business operations." },
  { title: "Digital Performance", desc: "Strategies for improving website speed, SEO, and conversion rates." },
];

const Insights = () => (
  <div>
    <section className="section-border">
      <div className="section-container py-16 md:py-24">
        <h1 className="text-4xl md:text-5xl font-bold">Insights</h1>
        <p className="mt-4 text-muted-foreground max-w-xl">
          Thinking on design, technology, and building better digital products.
        </p>
      </div>
    </section>
    <section>
      <div className="section-container section-padding">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-border border border-border">
          {topics.map((topic) => (
            <div key={topic.title} className="bg-background p-8">
              <h3 className="text-lg font-semibold mb-3">{topic.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{topic.desc}</p>
              <span className="text-sm text-muted-foreground mt-4 inline-block">Coming soon</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  </div>
);

export default Insights;
