import { Link } from "react-router-dom";

const Agency = () => (
  <div>
    <section className="section-border">
      <div className="section-container py-16 md:py-24">
        <h1 className="text-4xl md:text-5xl font-bold">About Bluluma</h1>
      </div>
    </section>
    <section>
      <div className="section-container section-padding">
        <div className="max-w-2xl space-y-6 text-muted-foreground leading-relaxed">
          <p>
            Bluluma Design is a Vancouver-based digital design studio focused on building modern websites, brand systems, and digital platforms for growing businesses.
          </p>
          <p>
            Our work combines design thinking, technology, and strategy to create digital experiences that support long-term growth. We focus on clarity, structure, and performance — building systems that work as hard as the businesses they represent.
          </p>
          <p>
            We work with businesses across healthcare, real estate, ecommerce, professional services, and more. Every project starts with understanding the business, its audience, and its goals.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-px bg-border border border-border">
          {[
            { label: "Focus", value: "Strategic Digital Design" },
            { label: "Location", value: "Vancouver, BC" },
            { label: "Founded", value: "TBD" },
          ].map((item) => (
            <div key={item.label} className="bg-background p-8">
              <span className="text-label block mb-2">{item.label}</span>
              <p className="text-lg font-semibold">{item.value}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 pt-16 border-t border-border text-center">
          <h2 className="text-3xl font-bold mb-4">Work With Us</h2>
          <p className="text-muted-foreground mb-8">Tell us about your next project.</p>
          <Link to="/contact" className="inline-flex items-center px-8 py-3 bg-primary text-primary-foreground text-sm font-medium hover:bg-primary-dark transition-colors">
            Contact Us
          </Link>
        </div>
      </div>
    </section>
  </div>
);

export default Agency;
