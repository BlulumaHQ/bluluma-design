import { Link } from "react-router-dom";
import { Globe, Fingerprint, ShoppingBag, FileText, Bot, TrendingUp } from "lucide-react";

const solutions = [
  { title: "Web Platforms", desc: "Modern, scalable websites designed for performance and long-term growth.", icon: Globe },
  { title: "Brand Identity Systems", desc: "Strategic brand systems that create recognition and consistency across every touchpoint.", icon: Fingerprint },
  { title: "Ecommerce Platforms", desc: "Online stores built to maximize product presentation and drive conversion.", icon: ShoppingBag },
  { title: "Marketing Collateral", desc: "Printed and digital marketing materials that extend brand identity into the real world.", icon: FileText },
  { title: "AI Business Automation", desc: "Intelligent workflows and automation tools that improve operational efficiency.", icon: Bot },
  { title: "Conversion Optimization", desc: "Data-informed strategies that improve website performance and lead generation.", icon: TrendingUp },
];

const Solutions = () => (
  <div>
    <section className="section-border">
      <div className="section-container py-16 md:py-24">
        <h1 className="text-4xl md:text-5xl font-bold">Solutions</h1>
        <p className="mt-4 text-muted-foreground max-w-xl">
          We offer a focused set of services designed to build and grow your digital presence.
        </p>
      </div>
    </section>
    <section className="relative overflow-hidden">
      <div className="logo-motif absolute inset-0 pointer-events-none" />
      <div className="section-container section-padding relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-border border border-border">
          {solutions.map((s) => {
            const Icon = s.icon;
            return (
              <div key={s.title} className="bg-background p-8 flex gap-4 items-start">
                <Icon size={24} strokeWidth={1.5} className="text-primary flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-lg font-semibold mb-3">{s.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
        <div className="mt-16 text-center">
          <Link to="/contact" className="inline-flex items-center px-8 py-3 bg-primary text-primary-foreground text-sm font-medium hover:bg-primary-dark transition-colors">
            Start a Project
          </Link>
        </div>
      </div>
    </section>
  </div>
);

export default Solutions;
