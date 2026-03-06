import { Link } from "react-router-dom";
import { Globe, Fingerprint, ShoppingBag, Bot, TrendingUp, Megaphone } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const RevealSection = ({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) => {
  const ref = useScrollReveal<HTMLDivElement>({ delay });
  return <div ref={ref} className={className}>{children}</div>;
};

const services = [
  {
    title: "Web Design & Development",
    desc: "Custom websites built for performance, clarity, and conversion. From single-page sites to complex multi-page platforms.",
    icon: Globe,
    to: "/services/web-design",
  },
  {
    title: "Ecommerce Websites",
    desc: "Shopify, custom-built, and hybrid ecommerce solutions designed to maximize product presentation and sales.",
    icon: ShoppingBag,
    to: "/services/ecommerce-websites",
  },
  {
    title: "Branding & Identity Design",
    desc: "Logo design, visual identity systems, and brand guidelines that create consistent, recognizable brands.",
    icon: Fingerprint,
    to: "/services/branding-design",
  },
  {
    title: "AI & Business Automation",
    desc: "Intelligent workflows, chatbots, and automation tools that streamline operations and improve efficiency.",
    icon: Bot,
    to: "/services/ai-automation",
  },
  {
    title: "Digital Marketing",
    desc: "SEO, social media strategy, and paid advertising campaigns that drive traffic and generate leads.",
    icon: Megaphone,
    to: "/services/digital-marketing",
  },
];

const Services = () => {
  return (
    <div>
      {/* Hero */}
      <section className="section-border relative overflow-hidden">
        <div className="logo-motif absolute inset-0 pointer-events-none" />
        <div className="section-container py-16 md:py-24 relative z-10">
          <RevealSection>
            <h1 className="text-4xl md:text-5xl font-bold">Our Services</h1>
            <p className="mt-4 text-muted-foreground max-w-xl leading-relaxed">
              End-to-end design and digital services for businesses that want to stand out, convert more customers, and scale with confidence.
            </p>
          </RevealSection>
        </div>
      </section>

      {/* Services Grid */}
      <section className="relative overflow-hidden">
        <div className="section-container section-padding">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-border border border-border">
            {services.map((s, i) => {
              const Icon = s.icon;
              return (
                <RevealSection key={s.to} delay={i * 80}>
                  <Link
                    to={s.to}
                    className="block bg-background p-8 md:p-10 group transition-colors duration-300 hover:bg-secondary h-full"
                  >
                    <Icon size={24} strokeWidth={1.5} className="text-primary mb-4" />
                    <h2 className="text-lg font-semibold mb-3 group-hover:text-primary transition-colors">{s.title}</h2>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-4">{s.desc}</p>
                    <span className="text-xs font-medium text-foreground group-hover:text-primary transition-colors inline-flex items-center gap-1">
                      Learn More <span className="transition-transform group-hover:translate-x-0.5">→</span>
                    </span>
                  </Link>
                </RevealSection>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-border">
        <div className="section-container py-16 md:py-24 text-center">
          <RevealSection>
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Ready to Start?</h2>
            <p className="text-muted-foreground max-w-lg mx-auto mb-8 leading-relaxed">
              Tell us about your project and we'll recommend the best approach for your goals and budget.
            </p>
            <Link
              to="/contact"
              className="inline-block bg-primary text-primary-foreground px-8 py-3 text-sm font-medium hover:bg-primary/90 transition-colors"
            >
              Start a Project
            </Link>
          </RevealSection>
        </div>
      </section>
    </div>
  );
};

export default Services;
