import { useParams, Link } from "react-router-dom";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { insights } from "@/lib/insights";

const RevealSection = ({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) => {
  const ref = useScrollReveal<HTMLDivElement>({ delay });
  return <div ref={ref} className={className}>{children}</div>;
};

interface ServiceData {
  title: string;
  metaDescription: string;
  intro: string;
  sections: { heading: string; body: string }[];
  relatedInsights: string[];
  relatedServices: { title: string; to: string }[];
}

const serviceData: Record<string, ServiceData> = {
  "web-design": {
    title: "Web Design & Development",
    metaDescription: "Custom website design and development by Bluluma Design Agency. Modern, fast, and conversion-optimized websites for growing businesses.",
    intro: "We design and build modern websites that are fast, accessible, and optimized for conversion. Every site we create is custom — no templates, no page builders, no compromises.",
    sections: [
      {
        heading: "Custom Design, Not Templates",
        body: "Every website we build starts from scratch. We design based on your brand, your audience, and your business goals — not a pre-made theme. This means your site looks and performs exactly the way it should.",
      },
      {
        heading: "Performance-First Development",
        body: "We build with modern frameworks and optimize for Core Web Vitals from day one. Fast load times, smooth interactions, and responsive layouts across all devices are baseline requirements, not add-ons.",
      },
      {
        heading: "SEO-Ready Architecture",
        body: "Proper heading structure, semantic HTML, meta tags, structured data, and clean URLs are built into every project. Your website is ready to rank from the moment it launches.",
      },
      {
        heading: "Ongoing Support",
        body: "After launch, we provide support for content updates, performance monitoring, and iterative improvements. Your website grows with your business.",
      },
    ],
    relatedInsights: ["how-ai-is-changing-website-design", "how-to-build-a-website-that-converts", "best-website-design-for-small-businesses"],
    relatedServices: [
      { title: "Ecommerce Websites", to: "/services/ecommerce-websites" },
      { title: "Digital Marketing", to: "/services/digital-marketing" },
    ],
  },
  "ecommerce-websites": {
    title: "Ecommerce Websites",
    metaDescription: "Shopify and custom ecommerce website design by Bluluma. Online stores built for product presentation, user experience, and sales conversion.",
    intro: "We design ecommerce experiences that sell. Whether you need a Shopify store or a fully custom platform, we build online stores that look premium and convert visitors into buyers.",
    sections: [
      {
        heading: "Shopify & Custom Solutions",
        body: "We work with Shopify for businesses that need a proven, scalable platform, and build custom solutions for brands with unique requirements. Either way, the result is an online store that reflects your brand and drives revenue.",
      },
      {
        heading: "Product-First Design",
        body: "Great ecommerce design puts the product front and center. We create clean, focused layouts that highlight your products without distraction — clear photography, intuitive navigation, and streamlined checkout flows.",
      },
      {
        heading: "Conversion Optimization",
        body: "Every element of the shopping experience is designed to reduce friction and increase sales. From product page layout to cart flow to post-purchase follow-up, we optimize the entire customer journey.",
      },
      {
        heading: "Scalable Infrastructure",
        body: "Your store should handle traffic spikes, growing inventory, and expanding product lines without breaking. We build with scalability in mind from the start.",
      },
    ],
    relatedInsights: ["shopify-vs-custom-ecommerce", "how-to-build-a-website-that-converts"],
    relatedServices: [
      { title: "Web Design & Development", to: "/services/web-design" },
      { title: "Branding & Identity Design", to: "/services/branding-design" },
    ],
  },
  "branding-design": {
    title: "Branding & Identity Design",
    metaDescription: "Professional branding and identity design by Bluluma. Logo design, visual systems, and brand guidelines for businesses that want to stand out.",
    intro: "We create brand identity systems that are distinctive, consistent, and built to scale. From logo design to comprehensive brand guidelines, we help businesses look as good as they are.",
    sections: [
      {
        heading: "Strategic Brand Development",
        body: "Great branding starts with strategy. We define your brand positioning, personality, and visual direction before touching a single pixel. This ensures every design decision serves your business goals.",
      },
      {
        heading: "Logo & Visual Identity",
        body: "We design logos, color palettes, typography systems, and visual elements that work together as a cohesive system. Your brand looks consistent whether it appears on a business card or a billboard.",
      },
      {
        heading: "Brand Guidelines",
        body: "We deliver comprehensive brand guidelines that make it easy for your team to maintain consistency. Clear rules for logo usage, color application, typography, and imagery ensure your brand stays sharp.",
      },
      {
        heading: "Digital-First Application",
        body: "Your brand needs to perform across digital channels. We design with screens in mind — ensuring your identity system works beautifully on websites, social media, email, and digital advertising.",
      },
    ],
    relatedInsights: ["branding-mistakes-startups-make", "best-website-design-for-small-businesses"],
    relatedServices: [
      { title: "Web Design & Development", to: "/services/web-design" },
      { title: "Digital Marketing", to: "/services/digital-marketing" },
    ],
  },
  "ai-automation": {
    title: "AI & Business Automation",
    metaDescription: "AI-powered business automation by Bluluma. Chatbots, workflow automation, and intelligent tools that streamline operations for modern businesses.",
    intro: "We build AI-powered tools and automation workflows that save time, reduce errors, and help businesses operate more efficiently. From chatbots to internal process automation, we make AI practical.",
    sections: [
      {
        heading: "Practical AI Solutions",
        body: "We focus on AI that delivers measurable business value — not buzzwords. Customer service chatbots, content generation workflows, data analysis tools, and automated reporting are all in our toolkit.",
      },
      {
        heading: "Workflow Automation",
        body: "Repetitive tasks drain your team's time and energy. We identify bottlenecks in your operations and build automation workflows that handle routine work, freeing your team to focus on what matters.",
      },
      {
        heading: "Integration & Deployment",
        body: "AI tools are only useful if they integrate with your existing systems. We build solutions that connect with your website, CRM, email platform, and other tools your team already uses.",
      },
      {
        heading: "Ongoing Optimization",
        body: "AI systems improve over time. We monitor performance, refine prompts and workflows, and continuously optimize to ensure your automation tools deliver increasing value.",
      },
    ],
    relatedInsights: ["how-ai-is-changing-website-design"],
    relatedServices: [
      { title: "Web Design & Development", to: "/services/web-design" },
      { title: "Digital Marketing", to: "/services/digital-marketing" },
    ],
  },
  "digital-marketing": {
    title: "Digital Marketing",
    metaDescription: "Digital marketing services by Bluluma. SEO, social media marketing, and paid advertising for businesses that want to grow online.",
    intro: "We help businesses get found, get noticed, and get results. Our digital marketing services cover SEO, social media strategy, content marketing, and paid advertising — all designed to drive qualified traffic and generate leads.",
    sections: [
      {
        heading: "Search Engine Optimization",
        body: "We optimize your website for search engines with proper technical SEO, keyword-targeted content, and link building strategies. The goal is sustainable organic traffic that grows over time.",
      },
      {
        heading: "Social Media Strategy",
        body: "We develop social media strategies that align with your brand and reach your target audience. From content planning to community management, we help you build a meaningful social presence.",
      },
      {
        heading: "Paid Advertising",
        body: "Google Ads, Meta Ads, and other paid channels can deliver immediate results when managed properly. We create, optimize, and scale campaigns that generate leads at a sustainable cost.",
      },
      {
        heading: "Analytics & Reporting",
        body: "Every marketing dollar should be accountable. We set up comprehensive tracking and deliver clear reports that show what's working, what's not, and where to invest next.",
      },
    ],
    relatedInsights: ["how-to-build-a-website-that-converts", "best-website-design-for-small-businesses"],
    relatedServices: [
      { title: "Web Design & Development", to: "/services/web-design" },
      { title: "AI & Business Automation", to: "/services/ai-automation" },
    ],
  },
};

const ServiceDetail = () => {
  const { slug } = useParams();
  const service = slug ? serviceData[slug] : undefined;

  if (!service) {
    return (
      <div className="section-container section-padding">
        <h1 className="text-2xl font-bold">Service not found</h1>
        <Link to="/services" className="text-primary mt-4 inline-block text-sm">← Back to Services</Link>
      </div>
    );
  }

  const relatedArticles = service.relatedInsights
    .map((s) => insights.find((i) => i.slug === s))
    .filter(Boolean);

  return (
    <div>
      {/* Hero */}
      <section className="section-border relative overflow-hidden">
        <div className="logo-motif absolute inset-0 pointer-events-none" />
        <div className="section-container py-16 md:py-24 relative z-10">
          <RevealSection>
            <Link to="/services" className="text-xs text-muted-foreground hover:text-foreground transition-colors mb-6 inline-block">
              ← Back to Services
            </Link>
            <h1 className="text-3xl md:text-5xl font-bold max-w-3xl">{service.title}</h1>
            <p className="mt-4 text-muted-foreground max-w-2xl leading-relaxed">{service.intro}</p>
          </RevealSection>
        </div>
      </section>

      {/* Content Sections */}
      <section>
        <div className="section-container section-padding max-w-3xl">
          {service.sections.map((section, i) => (
            <RevealSection key={i} delay={i * 100}>
              <div className="mb-12 last:mb-0">
                <h2 className="text-xl md:text-2xl font-semibold mb-4">{section.heading}</h2>
                <p className="text-muted-foreground leading-relaxed">{section.body}</p>
              </div>
            </RevealSection>
          ))}
        </div>
      </section>

      {/* Related Insights */}
      {relatedArticles.length > 0 && (
        <section className="section-border">
          <div className="section-container section-padding">
            <RevealSection>
              <h2 className="text-2xl font-bold mb-8">Related Insights</h2>
            </RevealSection>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedArticles.map((article, i) => (
                <RevealSection key={article!.slug} delay={i * 80}>
                  <Link
                    to={`/insights/${article!.slug}`}
                    className="block border border-border p-6 group hover:border-primary transition-colors"
                  >
                    <span className="text-[10px] uppercase tracking-widest text-primary font-medium">{article!.tag}</span>
                    <h3 className="text-sm font-semibold mt-2 mb-2 group-hover:text-primary transition-colors">{article!.title}</h3>
                    <p className="text-xs text-muted-foreground leading-relaxed">{article!.summary}</p>
                  </Link>
                </RevealSection>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Related Services */}
      <section className="section-border">
        <div className="section-container py-8">
          <div className="flex flex-wrap items-center gap-4">
            <span className="text-xs text-muted-foreground">Related Services:</span>
            {service.relatedServices.map((rs) => (
              <Link key={rs.to} to={rs.to} className="text-xs font-medium text-primary hover:underline">{rs.title}</Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-border">
        <div className="section-container py-16 md:py-24 text-center">
          <RevealSection>
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Ready to Get Started?</h2>
            <p className="text-muted-foreground max-w-lg mx-auto mb-8 leading-relaxed">
              Tell us about your project and we'll get back to you with a clear plan and next steps.
            </p>
            <Link
              to="/proposal"
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

export default ServiceDetail;
