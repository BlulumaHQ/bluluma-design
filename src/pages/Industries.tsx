import { Link, useParams } from "react-router-dom";

const industries = [
  { slug: "healthcare-dental", name: "Healthcare & Dental", desc: "Websites and brand systems for healthcare providers, clinics, and dental practices." },
  { slug: "professional-services", name: "Professional Services", desc: "Digital platforms for law firms, consultancies, and professional service providers." },
  { slug: "real-estate-construction", name: "Real Estate & Construction", desc: "Websites and brand systems for developers, builders, and real estate firms." },
  { slug: "lifestyle-businesses", name: "Lifestyle Businesses", desc: "Digital experiences for wellness, fitness, beauty, and lifestyle brands." },
  { slug: "creative-luxury-brands", name: "Creative & Luxury Brands", desc: "High-end digital platforms for creative agencies and luxury brands." },
  { slug: "home-services", name: "Home Services", desc: "Websites for contractors, landscapers, and home service providers." },
  { slug: "retail-ecommerce", name: "Retail & Ecommerce", desc: "Online stores and ecommerce platforms designed for conversion." },
  { slug: "education-training", name: "Education & Training", desc: "Digital platforms for educational institutions and training providers." },
];

export const IndustriesList = () => (
  <div>
    <section className="section-border">
      <div className="section-container py-16 md:py-24">
        <h1 className="text-4xl md:text-5xl font-bold">Industries We Work With</h1>
        <p className="mt-4 text-muted-foreground max-w-xl">
          We build digital platforms for businesses across a range of industries.
        </p>
      </div>
    </section>
    <section>
      <div className="section-container section-padding">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-border border border-border">
          {industries.map((ind) => (
            <Link
              key={ind.slug}
              to={`/industries/${ind.slug}`}
              className="group bg-background p-8 hover:bg-secondary transition-colors"
            >
              <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors">{ind.name}</h3>
              <p className="text-sm text-muted-foreground">{ind.desc}</p>
              <span className="text-sm font-medium text-primary mt-3 inline-block">Learn More →</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  </div>
);

export const IndustryDetail = () => {
  const { slug } = useParams();
  const industry = industries.find((i) => i.slug === slug);

  if (!industry) {
    return (
      <div className="section-container section-padding text-center">
        <h1 className="text-2xl font-bold">Industry not found</h1>
        <Link to="/industries" className="text-primary mt-4 inline-block">← Back to Industries</Link>
      </div>
    );
  }

  return (
    <div>
      <section className="section-border">
        <div className="section-container py-16 md:py-24">
          <Link to="/industries" className="text-sm text-muted-foreground hover:text-foreground mb-6 inline-block">← Industries</Link>
          <h1 className="text-4xl md:text-5xl font-bold">{industry.name}</h1>
        </div>
      </section>
      <section>
        <div className="section-container section-padding max-w-2xl">
          <div className="space-y-12">
            <div>
              <h2 className="text-2xl font-bold mb-4">Overview</h2>
              <p className="text-muted-foreground leading-relaxed">{industry.desc}</p>
            </div>
            <div>
              <h2 className="text-2xl font-bold mb-4">Common Problems</h2>
              <p className="text-muted-foreground leading-relaxed">TBD</p>
            </div>
            <div>
              <h2 className="text-2xl font-bold mb-4">Our Solutions</h2>
              <p className="text-muted-foreground leading-relaxed">TBD</p>
            </div>
            <div>
              <h2 className="text-2xl font-bold mb-4">Example Projects</h2>
              <p className="text-muted-foreground leading-relaxed">TBD</p>
            </div>
            <div className="pt-8 border-t border-border">
              <Link to="/contact" className="inline-flex items-center px-6 py-3 bg-primary text-primary-foreground text-sm font-medium hover:bg-primary-dark transition-colors">
                Start a Project
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
