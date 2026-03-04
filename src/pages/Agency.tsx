import { Link } from "react-router-dom";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import agencyReception from "@/assets/agency-reception.jpg";

const RevealDiv = ({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) => {
  const ref = useScrollReveal<HTMLDivElement>({ delay });
  return <div ref={ref} className={className}>{children}</div>;
};

const Agency = () => (
  <div>
    <section className="section-border">
      <div className="section-container py-16 md:py-24">
        <h1 className="text-4xl md:text-5xl font-bold">About Bluluma</h1>
      </div>
    </section>

    <section>
      <div className="section-container section-padding">
        {/* Image left, text right — image matches text height */}
        <RevealDiv>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-stretch">
            <div className="border border-border overflow-hidden">
              <img
                src={agencyReception}
                alt="Bluluma Design Studio Reception"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="space-y-6 text-muted-foreground leading-relaxed flex flex-col justify-center">
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
          </div>
        </RevealDiv>

        {/* Facts grid */}
        <RevealDiv delay={100}>
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-px bg-border border border-border">
            {[
              { label: "Focus", value: "Strategic Digital Design" },
              { label: "Location", value: "Vancouver, BC" },
              { label: "Founded", value: "2024" },
            ].map((item) => (
              <div key={item.label} className="bg-background p-8">
                <span className="text-label block mb-2">{item.label}</span>
                <p className="text-lg font-semibold">{item.value}</p>
              </div>
            ))}
          </div>
        </RevealDiv>

        {/* Vision / Mission / Values — vertical text sections */}
        <div className="mt-16 pt-16 border-t border-border space-y-16">
          <RevealDiv delay={0}>
            <h3 className="text-sm font-semibold uppercase tracking-widest text-primary mb-4">Vision</h3>
            <p className="text-muted-foreground leading-relaxed max-w-2xl">
              To build digital brand systems and websites that help businesses grow with clarity and long-term scalability.
            </p>
          </RevealDiv>

          <RevealDiv delay={100}>
            <h3 className="text-sm font-semibold uppercase tracking-widest text-primary mb-4">Mission</h3>
            <p className="text-muted-foreground leading-relaxed max-w-2xl">
              To combine strategic design thinking, modern web technologies, and efficient production workflows to deliver professional digital platforms.
            </p>
          </RevealDiv>

          <RevealDiv delay={200}>
            <h3 className="text-sm font-semibold uppercase tracking-widest text-primary mb-4">Values</h3>
            <ul className="text-muted-foreground leading-relaxed space-y-2 max-w-2xl">
              <li>Clarity over noise</li>
              <li>Systems thinking</li>
              <li>Craft and speed</li>
              <li>Evidence-led decisions</li>
              <li>Long-term maintainability</li>
            </ul>
          </RevealDiv>
        </div>

        {/* CTA */}
        <RevealDiv delay={100}>
          <div className="mt-16 pt-16 border-t border-border text-center">
            <h2 className="text-3xl font-bold mb-4">Work With Us</h2>
            <p className="text-muted-foreground mb-8">Tell us about your next project.</p>
            <Link to="/contact" className="cta-button inline-flex items-center px-8 py-3 bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors">
              Contact Us
            </Link>
          </div>
        </RevealDiv>
      </div>
    </section>
  </div>
);

export default Agency;
