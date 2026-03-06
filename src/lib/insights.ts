export interface Insight {
  slug: string;
  title: string;
  tag: string;
  summary: string;
  image?: string;
  sections: { heading: string; body: string }[];
}

export const insightTags = [
  "Web Platforms",
  "Brand Systems",
  "Conversion & UX",
  "AI Automation",
  "Operations",
] as const;

export const insights: Insight[] = [
  {
    slug: "work-vs-case-studies",
    title: "The Difference Between Work and Case Studies",
    tag: "Operations",
    summary:
      "Why separating live project links from documented case studies creates a clearer, more credible portfolio structure.",
    sections: [
      {
        heading: "Portfolio Structure Matters",
        body: "Most agency websites blur the line between showing work and explaining it. A portfolio page filled with screenshots tells a different story than a documented case study that walks through the problem, process, and outcome. Both serve a purpose — but they serve different audiences and different stages of the decision-making process.",
      },
      {
        heading: "What Live Work Demonstrates",
        body: "Linking directly to a live website shows that the work exists in the real world. It proves the project shipped, it's functional, and it represents the agency's current capability. Live links build immediate credibility because the viewer can interact with the result directly.",
      },
      {
        heading: "What Case Studies Communicate",
        body: "Case studies go deeper. They explain the business challenge, the strategic decisions behind the design, and the rationale for specific choices. A case study answers the question: why does this look and work the way it does? This is what serious buyers evaluate.",
      },
      {
        heading: "Structuring Both Effectively",
        body: "The most effective agency portfolios separate these two formats. A Work page links to live sites with minimal context. A Case Studies page documents the thinking behind select projects. Together, they create a portfolio that is both credible and persuasive.",
      },
    ],
  },
  {
    slug: "website-refresh-checklist-2026",
    title: "A Practical Website Refresh Checklist for 2026",
    tag: "Web Platforms",
    summary:
      "A structured checklist covering performance, content, design, and technology decisions for planning a website refresh.",
    sections: [
      {
        heading: "When a Refresh Is Needed",
        body: "A website refresh isn't always about aesthetics. Performance degradation, outdated content, poor mobile experience, and misalignment with current business positioning are all valid triggers. The first step is an honest audit of what's working and what isn't.",
      },
      {
        heading: "Content and Messaging Audit",
        body: "Review every page for accuracy, relevance, and clarity. Remove outdated services, update team information, and ensure the messaging reflects where the business is today — not where it was two years ago.",
      },
      {
        heading: "Technical Performance Review",
        body: "Run Core Web Vitals assessments. Check load times, cumulative layout shift, and interaction responsiveness. These metrics directly impact search rankings and user experience.",
      },
      {
        heading: "Design System Evaluation",
        body: "Assess whether the current visual language still represents the brand accurately. Typography, color, spacing, and component consistency all contribute to perceived professionalism.",
      },
      {
        heading: "Technology Stack Decisions",
        body: "Evaluate whether the current platform still serves the business needs. Consider factors like content management flexibility, scalability, security updates, and integration capabilities.",
      },
    ],
  },
  {
    slug: "brand-identity-systems",
    title: "Brand Identity Systems: What You Actually Need",
    tag: "Brand Systems",
    summary:
      "Breaking down the essential components of a brand identity system and what businesses can skip in early stages.",
    sections: [
      {
        heading: "Beyond the Logo",
        body: "A brand identity system is more than a logo. It's a set of visual and verbal rules that ensure consistency across every touchpoint — from a website to a business card to a social media post. But not every business needs every component from day one.",
      },
      {
        heading: "The Essential Components",
        body: "At minimum, a functional brand system includes: a primary logo and lockup, a defined color palette, typography selections, and basic usage guidelines. These four elements create enough structure to maintain consistency across common applications.",
      },
      {
        heading: "What Can Wait",
        body: "Pattern libraries, illustration systems, motion guidelines, and detailed brand voice documentation are valuable — but they're investments that make more sense once the brand has stabilized and the team is producing content at scale.",
      },
      {
        heading: "Systems Thinking Over Decoration",
        body: "The most effective brand identities aren't the most decorated — they're the most systematic. A well-defined set of simple rules applied consistently will always outperform elaborate design elements applied inconsistently.",
      },
    ],
  },
  {
    slug: "how-we-design-clean",
    title: "How We Design Clean",
    tag: "Brand Systems",
    summary:
      "Our approach to minimal design: how restraint, typography, and whitespace create more effective digital experiences.",
    sections: [
      {
        heading: "Clean Is a Decision",
        body: "Clean design doesn't happen by default. It requires deliberate restraint — saying no to elements that don't serve the user or the message. Every component on the page must earn its place.",
      },
      {
        heading: "Typography as Structure",
        body: "In minimal design, typography does the heavy lifting. Font size, weight, and spacing create hierarchy without relying on decorative elements. A well-set headline communicates more than an icon ever could.",
      },
      {
        heading: "The Role of Whitespace",
        body: "Whitespace isn't empty space — it's breathing room. It directs attention, creates rhythm, and makes content more digestible. Generous spacing signals confidence and professionalism.",
      },
      {
        heading: "Borders Over Shadows",
        body: "We use thin borders as our primary design element instead of shadows or gradients. Borders create clear visual separation without adding visual weight. They maintain the editorial quality we aim for in every project.",
      },
      {
        heading: "Color With Purpose",
        body: "A limited color palette forces intentional use of color. When accent color appears sparingly, it carries more meaning. Every color choice should reinforce the brand rather than decorate the layout.",
      },
    ],
  },
  {
    slug: "website-architecture-that-scales",
    title: "Website Architecture That Scales",
    tag: "Web Platforms",
    summary:
      "How to structure a website so it supports growth without requiring a complete rebuild every two years.",
    sections: [
      {
        heading: "Planning for Growth",
        body: "A website built for today's needs will be outdated within a year if it doesn't account for growth. Scalable architecture means structuring content, navigation, and technical systems to accommodate expansion without breaking the existing experience.",
      },
      {
        heading: "Modular Page Structures",
        body: "Building with modular, reusable sections allows new pages to be assembled from existing components. This reduces development time for new content and maintains design consistency as the site grows.",
      },
      {
        heading: "Content Architecture",
        body: "Information architecture should be defined before visual design begins. Clear content hierarchies, logical navigation paths, and consistent URL structures make the site easier to maintain and better for search performance.",
      },
      {
        heading: "Technical Scalability",
        body: "Choose platforms and frameworks that support the anticipated scale. A five-page brochure site has different requirements than a platform with hundreds of pages and dynamic content.",
      },
    ],
  },
  {
    slug: "conversion-ux-without-salesy-design",
    title: "Conversion UX Without Salesy Design",
    tag: "Conversion & UX",
    summary:
      "How to improve website conversions through clear structure and user experience rather than aggressive sales tactics.",
    sections: [
      {
        heading: "Conversion Is About Clarity",
        body: "High-converting websites don't use manipulative tactics — they make it easy for visitors to understand what's offered and take the next step. Clarity, not pressure, drives meaningful conversions.",
      },
      {
        heading: "Visual Hierarchy That Guides",
        body: "The eye should move naturally through the page, from headline to supporting content to call-to-action. This flow should feel effortless, not forced. Strong typographic hierarchy and intentional spacing create this natural reading path.",
      },
      {
        heading: "CTAs That Respect the User",
        body: "A single, well-placed call-to-action is more effective than multiple competing buttons. The CTA should clearly communicate what happens next and never mislead about the commitment required.",
      },
      {
        heading: "Trust Through Design Quality",
        body: "Professional design quality itself is a conversion factor. A polished, well-structured website signals competence and reliability. This is especially true in professional services where the website is often the first impression.",
      },
    ],
  },
  {
    slug: "premium-agency-website",
    title: "What Makes a Premium Agency Website Feel Premium",
    tag: "Brand Systems",
    summary:
      "The specific design and content decisions that separate high-end agency websites from generic templates.",
    sections: [
      {
        heading: "It Starts With Restraint",
        body: "Premium doesn't mean complex. The most respected agency websites use fewer elements, not more. Restraint in color, typography, and layout creates a sense of intentionality that viewers associate with quality.",
      },
      {
        heading: "Typography Does the Work",
        body: "Premium agency sites rely on strong typographic choices rather than decorative elements. Large, confident headlines with careful spacing create impact without clutter.",
      },
      {
        heading: "Content Quality Over Quantity",
        body: "Every word on a premium agency website is considered. There's no filler copy, no generic mission statements, and no buzzword-heavy descriptions. The writing is specific, direct, and reflects genuine expertise.",
      },
      {
        heading: "Performance as a Design Element",
        body: "A premium website loads fast, scrolls smoothly, and responds instantly to interaction. Technical performance is inseparable from the perceived quality of the experience.",
      },
    ],
  },
  {
    slug: "ai-in-website-production",
    title: "The Role of AI in Modern Website Production",
    tag: "AI Automation",
    summary:
      "Where AI tools genuinely improve website production workflows and where human judgment remains essential.",
    sections: [
      {
        heading: "AI as a Production Tool",
        body: "AI tools have become genuinely useful in specific areas of website production: generating initial content drafts, creating placeholder imagery, automating responsive testing, and handling repetitive development tasks.",
      },
      {
        heading: "Where AI Adds Value",
        body: "Content generation for initial drafts, code scaffolding, image optimization, accessibility auditing, and performance monitoring are all areas where AI tools can meaningfully accelerate production without compromising quality.",
      },
      {
        heading: "Where Human Judgment Remains Essential",
        body: "Strategic positioning, brand voice, visual design decisions, user experience architecture, and quality assurance still require human expertise. AI can assist these processes but cannot replace the judgment involved.",
      },
      {
        heading: "A Practical Approach",
        body: "The most effective approach is using AI to handle production bottlenecks while keeping strategic and creative decisions human-led. This creates faster delivery without sacrificing the thinking that makes work effective.",
      },
    ],
  },
  {
    slug: "website-mistakes-professional-services",
    title: "Common Website Mistakes in Professional Services",
    tag: "Conversion & UX",
    summary:
      "The most frequent website problems we see in professional services firms and how to address them.",
    sections: [
      {
        heading: "Generic Stock Photography",
        body: "Professional services firms frequently rely on generic stock photos of handshakes and office buildings. This imagery communicates nothing specific about the firm and actively undermines credibility with sophisticated buyers.",
      },
      {
        heading: "Unclear Service Descriptions",
        body: "Many firms describe their services in abstract terms that don't help potential clients understand what they actually do. Specific descriptions with clear outcomes are more effective than broad capability statements.",
      },
      {
        heading: "Missing Social Proof",
        body: "Client testimonials, project examples, and case studies are often absent or buried. Social proof should be prominent and specific — naming real projects and measurable outcomes where possible.",
      },
      {
        heading: "Poor Mobile Experience",
        body: "Professional services buyers increasingly research on mobile devices. A website that doesn't function well on mobile signals that the firm isn't keeping pace with basic technology standards.",
      },
      {
        heading: "No Clear Next Step",
        body: "Every page should make it obvious what the visitor should do next. Whether it's scheduling a consultation, downloading a resource, or viewing related work — the path forward should never be ambiguous.",
      },
    ],
  },
  {
    slug: "launch-checklist-modern-websites",
    title: "Launch Checklist for Modern Websites",
    tag: "Operations",
    summary:
      "A comprehensive pre-launch checklist covering technical, content, and performance requirements for modern websites.",
    sections: [
      {
        heading: "Content Verification",
        body: "Every page should be reviewed for spelling, grammar, accuracy, and completeness. Check that all placeholder content has been replaced, all links work, and all forms submit correctly.",
      },
      {
        heading: "Technical Testing",
        body: "Test across browsers (Chrome, Safari, Firefox, Edge) and devices (desktop, tablet, mobile). Verify responsive breakpoints, check form submissions, test all interactive elements, and confirm analytics tracking is active.",
      },
      {
        heading: "Performance Optimization",
        body: "Compress and properly size all images. Enable caching, minify CSS and JavaScript, and verify Core Web Vitals scores. Target sub-3-second load times on mobile connections.",
      },
      {
        heading: "SEO Fundamentals",
        body: "Confirm meta titles and descriptions are set for every page. Verify the sitemap is generated, robots.txt is configured correctly, and structured data is implemented where appropriate.",
      },
      {
        heading: "Security and Compliance",
        body: "Ensure SSL is active, forms are protected against spam, privacy policy and terms are published, and cookie consent is implemented where required by regulation.",
      },
    ],
  },
  {
    slug: "how-ai-is-changing-website-design",
    title: "How AI Is Changing Website Design",
    tag: "AI Automation",
    summary:
      "AI is transforming how websites are designed, built, and optimized. Here's what business owners need to know about the shift.",
    sections: [
      {
        heading: "AI-Assisted Design Tools",
        body: "Modern design tools now use AI to generate layouts, suggest color palettes, and create component variations in seconds. This accelerates the design process without replacing the strategic thinking that makes a website effective. Designers use these tools to explore more options faster, ultimately delivering better results.",
      },
      {
        heading: "Automated Code Generation",
        body: "AI can now generate production-quality front-end code from design files. This reduces development time and allows designers to focus on user experience rather than implementation details. However, human oversight remains essential for performance optimization and accessibility compliance.",
      },
      {
        heading: "Personalized User Experiences",
        body: "AI enables websites to adapt content, layout, and calls-to-action based on visitor behavior and preferences. This level of personalization was previously only available to enterprise companies — now it's accessible to businesses of all sizes.",
      },
      {
        heading: "What This Means for Your Business",
        body: "AI doesn't replace the need for professional web design — it raises the bar. Businesses that leverage AI-powered design and development get faster timelines, better optimization, and more competitive websites. The key is working with a team that understands how to use these tools strategically.",
      },
    ],
  },
  {
    slug: "best-website-design-for-small-businesses",
    title: "Best Website Design for Small Businesses",
    tag: "Web Platforms",
    summary:
      "What makes a small business website effective? The essential elements every small business site needs to attract and convert customers.",
    sections: [
      {
        heading: "Clarity Over Complexity",
        body: "Small business websites don't need to be complex. They need to clearly communicate what you do, who you serve, and how to get started. Visitors should understand your value proposition within five seconds of landing on your homepage.",
      },
      {
        heading: "Mobile-First Design",
        body: "Over 60% of web traffic comes from mobile devices. Your website must look and function perfectly on phones and tablets. This means fast load times, easy navigation with thumbs, and content that reads well on small screens.",
      },
      {
        heading: "Local SEO Integration",
        body: "For businesses serving local markets, your website should be optimized for local search. This includes Google Business Profile integration, location-specific content, local schema markup, and consistent NAP (Name, Address, Phone) information across all platforms.",
      },
      {
        heading: "Clear Calls to Action",
        body: "Every page should guide visitors toward a specific action — calling your office, filling out a contact form, or booking a consultation. Don't make visitors guess what to do next. Make the path obvious and friction-free.",
      },
      {
        heading: "Professional Credibility Signals",
        body: "Testimonials, client logos, certifications, and case studies build trust with potential customers. Social proof is especially important for small businesses competing against larger, more established companies.",
      },
    ],
  },
  {
    slug: "branding-mistakes-startups-make",
    title: "Branding Mistakes Startups Make",
    tag: "Brand Systems",
    summary:
      "The most common branding errors that hold startups back — and how to avoid them from the beginning.",
    sections: [
      {
        heading: "Skipping Brand Strategy",
        body: "Many startups jump straight to logo design without defining their brand positioning, target audience, or competitive differentiation. A logo without strategy is just a drawing. Brand strategy defines the foundation that every visual and verbal decision builds upon.",
      },
      {
        heading: "Inconsistent Visual Identity",
        body: "Using different colors, fonts, and styles across your website, social media, and marketing materials creates a fragmented impression. Consistency builds recognition and trust. Even simple brand guidelines dramatically improve how professional your business appears.",
      },
      {
        heading: "Copying Competitors",
        body: "When every startup in your industry looks the same, none of them stand out. Following competitor design trends feels safe but makes differentiation impossible. The strongest brands take a distinct visual position that reflects their unique value.",
      },
      {
        heading: "Neglecting Digital Application",
        body: "A brand identity that looks great on a business card but breaks down on screen is not fit for purpose. Modern brands must be designed for digital-first application — websites, social media, email, and mobile interfaces should all be primary considerations.",
      },
      {
        heading: "Rebranding Too Soon",
        body: "Some startups rebrand every year chasing trends. This destroys brand equity and confuses customers. Instead of starting over, invest in refining and evolving your existing brand identity. Consistency over time is one of the most valuable brand assets.",
      },
    ],
  },
  {
    slug: "how-to-build-a-website-that-converts",
    title: "How to Build a Website That Converts",
    tag: "Conversion & UX",
    summary:
      "Practical strategies for designing websites that turn visitors into leads and customers — without aggressive sales tactics.",
    sections: [
      {
        heading: "Start With Clear Messaging",
        body: "Before optimizing buttons and forms, get your messaging right. Visitors need to immediately understand what you offer, who it's for, and why it matters. Vague headlines and generic copy kill conversion rates before any design optimization can help.",
      },
      {
        heading: "Design for the User Journey",
        body: "High-converting websites guide visitors through a logical sequence: awareness, understanding, trust, and action. Each page and section should move the visitor one step closer to the desired outcome. Map this journey before designing a single page.",
      },
      {
        heading: "Reduce Friction at Every Step",
        body: "Every unnecessary form field, confusing navigation choice, or slow-loading page reduces conversions. Audit your website for friction points and eliminate anything that doesn't directly serve the user's goal or your business objective.",
      },
      {
        heading: "Use Social Proof Strategically",
        body: "Testimonials, case studies, client logos, and results data should appear at decision points — not buried on a separate page. Place social proof near calls-to-action where visitors are weighing whether to take the next step.",
      },
      {
        heading: "Test and Iterate",
        body: "Conversion optimization is not a one-time project. Use analytics to identify drop-off points, run A/B tests on key pages, and continuously refine based on real user behavior. Small improvements compound into significant results over time.",
      },
    ],
  },
  {
    slug: "shopify-vs-custom-ecommerce",
    title: "Shopify vs Custom Ecommerce Websites",
    tag: "Web Platforms",
    summary:
      "Comparing Shopify and custom-built ecommerce platforms to help you choose the right approach for your online store.",
    sections: [
      {
        heading: "When Shopify Makes Sense",
        body: "Shopify is ideal for businesses that need a proven, reliable ecommerce platform with built-in payment processing, inventory management, and a large app ecosystem. If you're selling physical products and want to launch quickly, Shopify offers an excellent foundation with lower upfront costs.",
      },
      {
        heading: "When Custom Is Worth It",
        body: "Custom ecommerce platforms make sense when your business has unique requirements that Shopify can't accommodate — complex pricing models, subscription systems, custom product configurators, or deep integrations with existing business systems. The investment is higher but the flexibility is unlimited.",
      },
      {
        heading: "Design Flexibility Comparison",
        body: "Shopify themes offer a starting point but can limit design expression. Custom Shopify development (Liquid templates or headless Shopify) bridges this gap. Fully custom platforms offer complete design freedom but require more development resources.",
      },
      {
        heading: "Total Cost of Ownership",
        body: "Shopify has predictable monthly costs plus transaction fees and app subscriptions. Custom solutions have higher upfront development costs but potentially lower ongoing expenses. The right choice depends on your revenue, growth trajectory, and technical requirements.",
      },
      {
        heading: "Making the Decision",
        body: "Start with your business requirements, not technology preferences. List what your store needs to do, how it needs to look, and what systems it needs to connect with. The answer usually becomes clear once requirements are properly defined.",
      },
    ],
  },
];
