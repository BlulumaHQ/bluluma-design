import { Link, useParams } from "react-router-dom";
import { projects } from "@/lib/projects";
import { useLang } from "@/lib/i18n";
import friendlyDental from "@/assets/projects/friendly-dental.jpg";
import liveAtHeadwater from "@/assets/projects/live-at-headwater.jpg";
import btnRealEstate from "@/assets/projects/btn-real-estate.jpg";

const projectImages: Record<string, string> = {
  "friendly-dental": friendlyDental,
  "live-at-headwater": liveAtHeadwater,
  "btn-real-estate": btnRealEstate,
};

const caseStudyProjects = projects.filter((p) => p.caseStudy);

const serviceKeyMap: Record<string, string> = {
  "Brand Identity": "svc.brand-identity",
  "Website Platform": "svc.website-platform",
  "Marketing Collateral": "svc.marketing-collateral",
};

interface CaseStudyContent {
  overview: string[];
  challenge: { intro: string; bullets: string[] };
  approach: { heading: string; body: string }[];
  deliverables: string[];
  results: string[];
}

const caseStudyContent: Record<string, CaseStudyContent> = {
  "friendly-dental": {
    overview: [
      "Friendly Dental is a modern dental clinic serving families and professionals in the Vancouver area. The practice had been operating for several years with a strong patient base but lacked a cohesive brand presence and digital platform that reflected the quality of care they provide.",
      "Bluluma was engaged to develop a complete brand identity system and a new website platform that would position Friendly Dental as a leading modern dental practice — approachable, professional, and trustworthy.",
      "The project encompassed brand strategy, visual identity design, website architecture, content development, and marketing collateral — delivered as an integrated system designed to work across every patient touchpoint.",
    ],
    challenge: {
      intro: "Friendly Dental faced several challenges common to healthcare practices looking to grow and modernize their patient-facing presence:",
      bullets: [
        "The existing website was outdated and did not reflect the clinic's modern facilities or patient experience.",
        "There was no consistent brand system — marketing materials, signage, and digital assets were visually disconnected.",
        "Patient acquisition relied heavily on word-of-mouth with limited digital visibility.",
        "The website lacked clear calls-to-action and was not optimized for mobile devices.",
        "Competitors in the area had invested in modern digital experiences, creating a perception gap.",
      ],
    },
    approach: [
      { heading: "Brand Strategy & Positioning", body: "We began with a strategic audit of the competitive landscape and patient demographics. This informed a positioning strategy that emphasized approachability and clinical excellence — moving away from the clinical coldness typical of dental branding toward a warm, confident visual language." },
      { heading: "Visual Identity System", body: "The brand identity was built around a clean, modern aesthetic with a carefully selected color palette that communicates trust and professionalism. Typography was chosen for clarity at all sizes, and a set of brand guidelines ensures consistency across all applications — from business cards to environmental signage." },
      { heading: "Website Architecture & Design", body: "The website was structured to serve two primary audiences: new patients researching dental care options and existing patients looking to book appointments or access information. Clear navigation, prominent booking CTAs, and service-specific landing pages create an efficient user experience." },
      { heading: "Content & Photography Direction", body: "Content was written to be informative without being clinical, addressing common patient concerns in accessible language. Photography direction focused on the real clinic environment and team, avoiding generic stock imagery that undermines credibility in healthcare." },
    ],
    deliverables: [
      "Brand strategy and positioning document",
      "Primary logo, logo variations, and lockup system",
      "Brand color palette and typography system",
      "Brand guidelines document",
      "Responsive website design and development",
      "Service page templates and content",
      "Appointment booking integration",
      "Business cards and letterhead",
      "Environmental signage concepts",
    ],
    results: [
      "The new website and brand system launched successfully, providing Friendly Dental with a cohesive, professional presence across all touchpoints.",
      "Patient inquiries through the website increased significantly in the months following launch, with the online booking feature seeing strong adoption.",
      "The brand system provided the clinic with a scalable visual framework that maintains consistency as they expand their marketing efforts.",
      "Staff reported that patients frequently comment on the professionalism of the new website and materials, reinforcing the practice's positioning as a modern, quality-focused clinic.",
    ],
  },
  "live-at-headwater": {
    overview: [
      "Live at Headwater is a residential development project that required a complete brand identity and digital platform to support pre-sales marketing and buyer engagement. The development needed to stand out in a competitive real estate market while communicating the project's unique value proposition.",
      "Bluluma was brought on to create a brand system and marketing website that would serve as the primary digital touchpoint for prospective buyers — from initial awareness through to sales inquiry.",
      "The scope covered brand identity, website design and development, and marketing collateral designed to work together as an integrated campaign system.",
    ],
    challenge: {
      intro: "Real estate development marketing presents unique challenges that required a strategic, phased approach:",
      bullets: [
        "The project needed to generate buyer interest before construction was complete, requiring compelling visual storytelling without finished photography.",
        "The target market included both local buyers and investors, requiring messaging that spoke to different motivations.",
        "The competitive landscape included well-funded developments with established marketing campaigns.",
        "The website needed to capture leads effectively while providing enough project information to qualify serious inquiries.",
        "Brand identity needed to feel premium without alienating first-time buyers in the target price range.",
      ],
    },
    approach: [
      { heading: "Market Positioning", body: "Research into the local market identified an opportunity to position Live at Headwater as a community-focused development that offered a premium lifestyle without the premium price point. This positioning informed every design and content decision throughout the project." },
      { heading: "Brand Identity Development", body: "The visual identity was designed to convey modernity and quality through clean lines, a sophisticated color palette, and confident typography. The brand system was built to work across digital and print applications, from the website to on-site signage and presentation materials." },
      { heading: "Website Platform", body: "The website was designed as a storytelling platform that walks visitors through the development's key selling points — location, lifestyle, floor plans, and community features. Lead capture was integrated naturally throughout the experience rather than relying on aggressive pop-ups or forms." },
      { heading: "Marketing Collateral", body: "Print and digital marketing materials were designed within the brand system to ensure a consistent experience from online advertising through to in-person presentation. Materials included brochures, floor plan sheets, and social media templates." },
    ],
    deliverables: [
      "Brand identity and visual system",
      "Brand guidelines and asset library",
      "Responsive marketing website",
      "Lead capture and CRM integration",
      "Floor plan presentation layouts",
      "Marketing brochure design",
      "Social media template system",
      "Email marketing templates",
      "Presentation deck design",
    ],
    results: [
      "The website became the primary lead generation channel for the development, with the majority of sales inquiries originating from the digital platform.",
      "The cohesive brand system allowed the sales team to present a consistent, professional image across all buyer touchpoints.",
      "The website's clear information architecture reduced the volume of basic inquiry calls, allowing the sales team to focus on qualified prospects.",
      "The project's digital presence was consistently cited by buyers as a factor in their initial interest, validating the investment in a quality brand and web platform.",
    ],
  },
  "btn-real-estate": {
    overview: [
      "BTN Real Estate is a real estate advisory firm that provides strategic consulting services to developers, investors, and property owners. The firm needed a digital presence that reflected the caliber of their advisory work and positioned them as a credible, knowledgeable partner in the real estate sector.",
      "Bluluma was engaged to design and build a website platform that would serve as both a credibility tool and a lead generation asset — communicating BTN's expertise while making it easy for prospective clients to initiate a conversation.",
      "The project focused on website strategy, design, and development, with particular attention to content architecture and how the firm's services and experience were presented.",
    ],
    challenge: {
      intro: "Professional services firms face specific digital challenges that generic website solutions often fail to address:",
      bullets: [
        "The previous website was template-based and did not differentiate BTN from competitors in the advisory space.",
        "Service descriptions were generic and did not communicate the specific value BTN brings to client engagements.",
        "The site lacked structured content that demonstrated expertise — no case studies, project examples, or thought leadership.",
        "Mobile experience was poor, which was problematic given that many initial interactions with potential clients happen via shared links on mobile devices.",
        "There was no clear user journey from landing on the site to making an inquiry.",
      ],
    },
    approach: [
      { heading: "Content Strategy", body: "Before any design work began, we mapped out the content architecture based on how BTN's target clients evaluate advisory firms. This resulted in a clear hierarchy: firm positioning, service specifics, relevant experience, and direct contact pathways — in that order of priority." },
      { heading: "Visual Design", body: "The design language was intentionally restrained — clean typography, generous spacing, and a limited color palette that lets the content lead. This approach signals confidence and professionalism, which is exactly what prospective clients look for in an advisory partner." },
      { heading: "Technical Implementation", body: "The website was built for speed and reliability, with particular attention to mobile performance. Page load times were optimized, and the responsive design was tested across devices to ensure a consistent experience regardless of how the site is accessed." },
      { heading: "Conversion Architecture", body: "Contact pathways were placed strategically throughout the site, appearing at natural decision points rather than competing for attention on every page. The goal was to make reaching out feel like a natural next step rather than a sales push." },
    ],
    deliverables: [
      "Content strategy and information architecture",
      "Responsive website design",
      "Website development and deployment",
      "Service page templates",
      "Contact and inquiry system",
      "Performance optimization",
      "SEO foundation setup",
      "Analytics integration",
    ],
    results: [
      "The new website provided BTN with a professional digital presence that accurately reflects the quality of their advisory services.",
      "Inquiry quality improved as the clearer service descriptions and structured content helped pre-qualify prospects before they made contact.",
      "The site's clean, fast-loading design earned positive feedback from clients and industry peers, reinforcing BTN's positioning as a modern, professional firm.",
      "The content architecture created a foundation that BTN can build on over time, adding case studies and insights as the firm grows its digital presence.",
    ],
  },
};

export const CaseStudyList = () => {
  const { t } = useLang();

  return (
    <div>
      <section className="section-border">
        <div className="section-container py-16 md:py-24">
          <h1 className="text-4xl md:text-5xl font-bold">{t("casestudies.title")}</h1>
          <p className="mt-4 text-muted-foreground max-w-xl">
            {t("casestudies.intro")}
          </p>
        </div>
      </section>
      <section>
        <div className="section-container section-padding">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {caseStudyProjects.map((project) => (
              <Link
                key={project.slug}
                to={`/case-studies/${project.slug}`}
                className="group card-border overflow-hidden"
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={projectImages[project.slug]}
                    alt={project.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-semibold mb-1">{project.name}</h3>
                  <p className="text-sm text-muted-foreground mb-1">{project.industry}</p>
                  <span className="text-sm font-medium text-primary">{t("cta.read-case-study")}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export const CaseStudyDetail = () => {
  const { slug } = useParams();
  const { t } = useLang();
  const project = projects.find((p) => p.slug === slug);
  const content = slug ? caseStudyContent[slug] : undefined;

  if (!project) {
    return (
      <div className="section-container section-padding text-center">
        <h1 className="text-2xl font-bold">{t("casestudy.not-found")}</h1>
        <Link to="/case-studies" className="text-primary mt-4 inline-block">{t("casestudy.back")}</Link>
      </div>
    );
  }

  return (
    <div>
      <section className="section-border">
        <div className="section-container py-16 md:py-24">
          <Link to="/case-studies" className="text-sm text-muted-foreground hover:text-foreground mb-6 inline-block">{t("casestudy.back")}</Link>
          <h1 className="text-4xl md:text-5xl font-bold">{project.name}</h1>
          <p className="mt-4 text-muted-foreground max-w-2xl">{project.description}</p>
        </div>
      </section>

      {projectImages[project.slug] && (
        <section className="section-border">
          <div className="section-container py-12">
            <div className="card-border overflow-hidden">
              <img src={projectImages[project.slug]} alt={project.name} className="w-full" />
            </div>
          </div>
        </section>
      )}

      <section>
        <div className="section-container section-padding">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 pb-16 border-b border-border">
            <div>
              <h3 className="text-label mb-2">{t("casestudy.meta.client")}</h3>
              <p className="font-medium">{project.name}</p>
            </div>
            <div>
              <h3 className="text-label mb-2">{t("casestudy.meta.industry")}</h3>
              <p className="font-medium">{project.industry}</p>
            </div>
            <div>
              <h3 className="text-label mb-2">{t("casestudy.meta.services")}</h3>
              <p className="font-medium">
                {project.services.map((s) => serviceKeyMap[s] ? t(serviceKeyMap[s]) : s).join(", ")}
              </p>
            </div>
          </div>

          {content ? (
            <div className="mt-16 max-w-2xl space-y-16">
              <div>
                <h2 className="text-2xl font-bold mb-6">{t("casestudy.overview")}</h2>
                <div className="space-y-4">
                  {content.overview.map((p, i) => (
                    <p key={i} className="text-muted-foreground leading-relaxed">{p}</p>
                  ))}
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-bold mb-6">{t("casestudy.challenge")}</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">{content.challenge.intro}</p>
                <ul className="space-y-3">
                  {content.challenge.bullets.map((b, i) => (
                    <li key={i} className="text-muted-foreground leading-relaxed flex gap-3">
                      <span className="text-primary mt-1 flex-shrink-0">—</span>
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-bold mb-6">{t("casestudy.approach")}</h2>
                <div className="space-y-8">
                  {content.approach.map((section, i) => (
                    <div key={i}>
                      <h3 className="text-lg font-semibold mb-3">{section.heading}</h3>
                      <p className="text-muted-foreground leading-relaxed">{section.body}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-bold mb-6">{t("casestudy.deliverables")}</h2>
                <ul className="space-y-2">
                  {content.deliverables.map((d, i) => (
                    <li key={i} className="text-muted-foreground flex gap-3">
                      <span className="text-primary flex-shrink-0">—</span>
                      <span>{d}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-bold mb-6">{t("casestudy.results")}</h2>
                <div className="space-y-4">
                  {content.results.map((r, i) => (
                    <p key={i} className="text-muted-foreground leading-relaxed">{r}</p>
                  ))}
                </div>
              </div>

              {projectImages[project.slug] && (
                <div>
                  <h2 className="text-2xl font-bold mb-6">{t("casestudy.gallery")}</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="border border-border overflow-hidden">
                      <img src={projectImages[project.slug]} alt={`${project.name} showcase`} className="w-full h-auto" />
                    </div>
                  </div>
                </div>
              )}

              <div className="pt-8 border-t border-border text-center">
                <h2 className="text-2xl font-bold mb-4">{t("casestudy.cta.title")}</h2>
                <p className="text-muted-foreground mb-6">{t("casestudy.cta.text")}</p>
                <Link
                  to="/contact"
                  className="inline-flex items-center px-8 py-3 bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors"
                >
                  {t("cta.request-quote")}
                </Link>
              </div>
            </div>
          ) : (
            <div className="mt-16 max-w-2xl">
              <p className="text-muted-foreground">{t("casestudy.coming-soon")}</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};
