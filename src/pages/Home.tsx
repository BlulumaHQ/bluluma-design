import { Link } from "react-router-dom";
import ProjectCard from "@/components/ProjectCard";
import { projects } from "@/lib/projects";
import friendlyDental from "@/assets/projects/friendly-dental.jpg";
import liveAtHeadwater from "@/assets/projects/live-at-headwater.jpg";
import btnRealEstate from "@/assets/projects/btn-real-estate.jpg";
import nueranutra from "@/assets/projects/nuera-nutra.jpg";

const projectImages: Record<string, string> = {
  "friendly-dental": friendlyDental,
  "live-at-headwater": liveAtHeadwater,
  "btn-real-estate": btnRealEstate,
  "nuera-nutra": nueranutra,
};

const featuredProjects = projects.filter((p) => p.featured);

const capabilities = [
  { title: "Digital Platforms", desc: "Modern websites and scalable digital platforms designed for performance and growth." },
  { title: "Brand Systems", desc: "Strategic identity systems that create consistent and recognizable brands." },
  { title: "Ecommerce Experiences", desc: "Online stores designed to maximize product presentation and conversion." },
  { title: "AI Business Automation", desc: "Automation tools and intelligent workflows that improve operational efficiency." },
];

const caseStudyProjects = projects.filter((p) => p.caseStudy);

const industries = [
  "Healthcare & Dental", "Professional Services", "Real Estate & Construction",
  "Lifestyle Businesses", "Creative & Luxury Brands", "Home Services",
  "Retail & Ecommerce", "Education & Training",
];

const workflow = [
  { step: "Strategy", desc: "Understanding the business, audience, and goals." },
  { step: "Design", desc: "Creating brand systems and digital experiences." },
  { step: "Build", desc: "Developing scalable websites and platforms." },
  { step: "Launch", desc: "Deploying high-performance digital products." },
];

const Home = () => (
  <div>
    {/* HERO */}
    <section className="section-border">
      <div className="section-container py-24 md:py-36">
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold leading-[1.05] max-w-4xl">
          Design Systems for Modern Businesses
        </h1>
        <p className="mt-6 text-lg md:text-xl text-muted-foreground max-w-2xl leading-relaxed">
          We design and build high-performance websites, brand platforms, and digital experiences that help businesses grow faster.
        </p>
        <div className="mt-10 flex flex-wrap gap-4">
          <Link
            to="/work"
            className="inline-flex items-center px-6 py-3 bg-primary text-primary-foreground text-sm font-medium hover:bg-primary-dark transition-colors"
          >
            View Our Work
          </Link>
          <Link
            to="/contact"
            className="inline-flex items-center px-6 py-3 border border-foreground text-sm font-medium hover:bg-foreground hover:text-background transition-colors"
          >
            Start a Project
          </Link>
        </div>
      </div>
    </section>

    {/* FEATURED WORK */}
    <section className="section-border">
      <div className="section-container section-padding">
        <h2 className="text-3xl md:text-4xl font-bold mb-12">Selected Projects</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {featuredProjects.map((project) => (
            <ProjectCard
              key={project.slug}
              project={project}
              imageImport={projectImages[project.slug]}
            />
          ))}
        </div>
      </div>
    </section>

    {/* WHAT WE BUILD */}
    <section className="section-border section-subtle-bg">
      <div className="section-container section-padding">
        <h2 className="text-3xl md:text-4xl font-bold mb-12">What We Build</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-border">
          {capabilities.map((cap) => (
            <div key={cap.title} className="bg-background p-8 md:p-10">
              <h3 className="text-xl font-semibold mb-3">{cap.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{cap.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* CASE STUDIES */}
    <section className="section-border">
      <div className="section-container section-padding">
        <h2 className="text-3xl md:text-4xl font-bold mb-12">Case Studies</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {caseStudyProjects.map((project) => (
            <Link
              key={project.slug}
              to={`/case-studies/${project.slug}`}
              className="group card-border p-6 hover:border-primary transition-colors"
            >
              <h3 className="text-lg font-semibold mb-2">{project.name}</h3>
              <p className="text-sm text-muted-foreground mb-1">{project.industry}</p>
              <span className="text-sm font-medium text-primary">Read Case Study →</span>
            </Link>
          ))}
        </div>
      </div>
    </section>

    {/* INDUSTRIES */}
    <section className="section-border section-subtle-bg">
      <div className="section-container section-padding">
        <h2 className="text-3xl md:text-4xl font-bold mb-12">Industries We Work With</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-border">
          {industries.map((ind) => (
            <Link
              key={ind}
              to="/industries"
              className="bg-background p-6 text-sm font-medium hover:text-primary transition-colors"
            >
              {ind}
            </Link>
          ))}
        </div>
      </div>
    </section>

    {/* WORKFLOW */}
    <section className="section-border">
      <div className="section-container section-padding">
        <h2 className="text-3xl md:text-4xl font-bold mb-12">How We Work</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {workflow.map((w, i) => (
            <div key={w.step} className="card-border p-6">
              <span className="text-label mb-4 block">0{i + 1}</span>
              <h3 className="text-lg font-semibold mb-2">{w.step}</h3>
              <p className="text-sm text-muted-foreground">{w.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* AGENCY */}
    <section className="section-border section-subtle-bg">
      <div className="section-container section-padding">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">About Bluluma</h2>
        <div className="max-w-2xl space-y-4 text-muted-foreground leading-relaxed">
          <p>Bluluma Design is a Vancouver-based digital design studio focused on building modern websites, brand systems, and digital platforms for growing businesses.</p>
          <p>Our work combines design thinking, technology, and strategy to create digital experiences that support long-term growth.</p>
        </div>
      </div>
    </section>

    {/* CONTACT CTA */}
    <section>
      <div className="section-container section-padding text-center">
        <h2 className="text-3xl md:text-5xl font-bold mb-4">Start Your Project</h2>
        <p className="text-muted-foreground mb-8 max-w-lg mx-auto">
          Tell us about your business and the digital platform you want to build.
        </p>
        <Link
          to="/contact"
          className="inline-flex items-center px-8 py-3 bg-primary text-primary-foreground text-sm font-medium hover:bg-primary-dark transition-colors"
        >
          Contact Us
        </Link>
      </div>
    </section>
  </div>
);

export default Home;
