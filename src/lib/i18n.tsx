import { createContext, useContext, useState, useEffect, type ReactNode } from "react";

export type Lang = "en" | "zh";

interface LangContextType {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (key: string) => string;
}

const LangContext = createContext<LangContextType>({
  lang: "en",
  setLang: () => {},
  t: (k) => k,
});

export const useLang = () => useContext(LangContext);

/* ── All translations ── */
const translations: Record<string, Record<Lang, string>> = {
  // Nav
  "nav.home": { en: "Home", zh: "首頁" },
  "nav.work": { en: "Work", zh: "作品" },
  "nav.case-studies": { en: "Case Studies", zh: "案例研究" },
  "nav.industries": { en: "Industries", zh: "產業" },
  "nav.solutions": { en: "Solutions", zh: "解決方案" },
  "nav.process": { en: "Process", zh: "流程" },
  "nav.pricing": { en: "Pricing", zh: "價格" },
  "nav.services": { en: "Services", zh: "服務" },
  "nav.agency": { en: "Agency", zh: "關於我們" },
  "nav.insights": { en: "Insights", zh: "Insights" },
  "nav.contact": { en: "Contact", zh: "聯絡我們" },

  // CTAs
  "cta.view-work": { en: "View Our Work", zh: "查看作品" },
  "cta.view-portfolio": { en: "View Portfolio", zh: "查看作品" },
  "cta.start-project": { en: "Start Your Project", zh: "開始你的專案" },
  "cta.request-quote": { en: "Request a Quote", zh: "索取報價" },
  "cta.get-strategy": { en: "Get Your Website Strategy", zh: "獲取你的網站策略" },
  "cta.get-strategy-short": { en: "Get Strategy", zh: "獲取策略" },
  "cta.view-case-studies": { en: "View Case Studies", zh: "查看案例研究" },
  "cta.contact-us": { en: "Contact Us", zh: "聯絡我們" },
  "cta.learn-more": { en: "Learn More →", zh: "了解更多 →" },
  "cta.read-more": { en: "Read More", zh: "閱讀更多" },
  "cta.read-case-study": { en: "Read Case Study →", zh: "閱讀案例 →" },
  "cta.visit-site": { en: "Visit Site ↗", zh: "實際網站 ↗" },
  "cta.view-project": { en: "View Project →", zh: "查看專案 →" },
  "cta.live": { en: "LIVE ↗", zh: "實際網站 ↗" },
  "cta.back": { en: "Back", zh: "返回" },
  "cta.next": { en: "Next", zh: "下一步" },
  "cta.previous": { en: "Previous", zh: "上一頁" },
  "cta.submit": { en: "Submit", zh: "送出" },
  "cta.send-message": { en: "Send Message", zh: "送出訊息" },
  "cta.copy": { en: "Copy", zh: "複製" },
  "cta.view-all-work": { en: "View All Work", zh: "查看所有作品" },

  // Form labels
  "form.name": { en: "Name", zh: "姓名" },
  "form.email": { en: "Email", zh: "Email" },
  "form.company": { en: "Company Name", zh: "公司名稱" },
  "form.current-url": { en: "Current URL (optional)", zh: "目前網站（選填）" },
  "form.project-type": { en: "Project Type", zh: "專案類型" },
  "form.message": { en: "Message", zh: "訊息內容" },
  "form.business": { en: "Business", zh: "公司名稱" },
  "form.select-type": { en: "Select type", zh: "選擇類型" },
  "form.required": { en: "Required", zh: "必填" },
  "form.optional": { en: "Optional", zh: "選填" },
  "form.submit-thanks": { en: "Thank you for your message. We'll be in touch.", zh: "感謝您的訊息，我們會盡快回覆。" },

  // Form select options
  "form.opt.website": { en: "Website Platform", zh: "網站平台" },
  "form.opt.brand": { en: "Brand Identity", zh: "品牌識別" },
  "form.opt.ecommerce": { en: "Ecommerce", zh: "電商體驗" },
  "form.opt.marketing": { en: "Marketing Collateral", zh: "行銷設計" },
  "form.opt.automation": { en: "AI Business Automation", zh: "AI 商業自動化" },
  "form.opt.other": { en: "Other", zh: "其他" },

  // Service tags
  "svc.brand-identity": { en: "Brand Identity", zh: "品牌識別" },
  "svc.brand-identity-systems": { en: "Brand Identity Systems", zh: "品牌識別系統" },
  "svc.website-platform": { en: "Website Platform", zh: "網站平台" },
  "svc.website-design": { en: "Website Design", zh: "網站設計" },
  "svc.ecommerce-experiences": { en: "Ecommerce Experiences", zh: "電商體驗" },
  "svc.marketing-collateral": { en: "Marketing Collateral", zh: "行銷設計" },
  "svc.ai-business-automation": { en: "AI Business Automation", zh: "AI 商業自動化" },
  "svc.conversion-optimization": { en: "Conversion Optimization", zh: "轉換優化" },

  // Common section labels
  "label.selected-work": { en: "Selected Work", zh: "精選作品" },
  "label.case-studies": { en: "Case Studies", zh: "案例研究" },
  "label.industries": { en: "Industries We Work With", zh: "合作產業" },
  "label.what-we-build": { en: "What We Build", zh: "我們能為你打造什麼" },
  "label.how-we-work": { en: "How We Work", zh: "我們的流程" },
  "label.testimonials": { en: "What Clients Say", zh: "客戶回饋" },
  "label.solutions": { en: "Solutions", zh: "解決方案" },
  "label.services": { en: "Services", zh: "服務內容" },
  "label.project-overview": { en: "Project Overview", zh: "專案概述" },
  "label.the-challenge": { en: "The Challenge", zh: "專案挑戰" },
  "label.the-approach": { en: "The Approach", zh: "解決方法" },
  "label.deliverables": { en: "Deliverables", zh: "交付內容" },
  "label.results": { en: "Results", zh: "成果摘要" },
  "label.project-gallery": { en: "Project Gallery", zh: "專案圖集" },
  "label.examples": { en: "Examples", zh: "範例" },
  "label.process": { en: "Process", zh: "流程" },
  "label.capabilities": { en: "Capabilities", zh: "能力範圍" },

  // Home hero
  "home.hero.h1": { en: "We Don't Build Websites.\nWe Build Revenue Systems.", zh: "我們不只做網站。\n我們打造營收系統。" },
  "home.hero.h1.line1": { en: "We Don't Build Websites.", zh: "我們不只做網站。" },
  "home.hero.h1.line2": { en: "We Build Revenue Systems.", zh: "我們打造營收系統。" },
  "home.hero.sub": { en: "High-converting websites and AI automation systems designed to generate leads, increase sales, and scale your business.", zh: "高轉換率網站與 AI 自動化系統，專為產生潛在客戶、提升銷售和擴展業務而設計。" },
  "home.hero.trust": { en: "Trusted by businesses across North America · 10+ Years Experience · Built for Conversion", zh: "受北美各地企業信賴 · 10+ 年經驗 · 以轉換為核心" },

  // Home problem
  "home.problem.title": { en: "Most Websites Don't Fail Because of Design.", zh: "大多數網站失敗不是因為設計。" },
  "home.problem.intro": { en: "They fail because they don't convert.", zh: "而是因為它們無法將訪客轉化為客戶。" },
  "home.problem.b1": { en: "No clear offer or value proposition", zh: "沒有清楚的產品定位或價值主張" },
  "home.problem.b2": { en: "No structured funnel to guide visitors", zh: "沒有引導訪客的結構化漏斗" },
  "home.problem.b3": { en: "No conversion strategy or CTA hierarchy", zh: "沒有轉換策略或行動呼籲層次" },
  "home.problem.b4": { en: "No automation system to capture and follow up", zh: "沒有自動化系統來捕捉和跟進潛在客戶" },
  "home.problem.closing": { en: "You don't need a better-looking website. You need a system that generates revenue.", zh: "你不需要更好看的網站。你需要的是一個能產生營收的系統。" },

  // Home solution
  "home.solution.title": { en: "We Build Complete Conversion Systems", zh: "我們打造完整的轉換系統" },
  "home.solution.intro": { en: "At Bluluma, we don't sell design. We engineer systems that turn traffic into leads and leads into revenue.", zh: "在 Bluluma，我們不賣設計。我們打造將流量轉化為潛在客戶、將潛在客戶轉化為營收的系統。" },
  "home.solution.i1": { en: "Conversion-first layout architecture", zh: "以轉換為核心的版面架構" },
  "home.solution.i2": { en: "Strategic user flow design", zh: "策略性使用者流程設計" },
  "home.solution.i3": { en: "Clear CTA hierarchy throughout", zh: "清晰的行動呼籲層次" },
  "home.solution.i4": { en: "AI automation integration", zh: "AI 自動化整合" },
  "home.solution.i5": { en: "Business-driven design decisions", zh: "以業務為導向的設計決策" },

  // Home core services
  "home.services.title": { en: "What We Build", zh: "我們打造什麼" },
  "home.svc1.title": { en: "Conversion Website System", zh: "高轉換率網站系統" },
  "home.svc1.desc": { en: "High-performance websites built to convert visitors into leads and customers. Every page, every section, every element is engineered for results.", zh: "以高效能打造的網站，將訪客轉化為潛在客戶和顧客。每一頁、每一區塊都以成果為導向。" },
  "home.svc2.title": { en: "AI Automation System", zh: "AI 自動化系統" },
  "home.svc2.desc": { en: "Automate lead capture, follow-ups, and workflows to scale your business without increasing workload. Work smarter, not harder.", zh: "自動化潛在客戶捕捉、跟進和工作流程，讓你在不增加工作量的情況下擴展業務。" },
  "home.svc3.title": { en: "Brand Identity System", zh: "品牌識別系統" },
  "home.svc3.desc": { en: "Premium branding designed to build trust, authority, and perceived value. Position your business as the obvious choice in your market.", zh: "高端品牌設計，建立信任、權威和感知價值。讓你的企業成為市場中的首選。" },

  // Home how it works
  "home.howitworks.title": { en: "How It Works", zh: "運作方式" },
  "home.step1.title": { en: "Strategy", zh: "策略規劃" },
  "home.step1.desc": { en: "We analyze your business, positioning, and goals to create a conversion roadmap tailored to your market.", zh: "我們分析你的業務、市場定位和目標，制定專屬的轉換路線圖。" },
  "home.step2.title": { en: "System Build", zh: "系統建置" },
  "home.step2.desc": { en: "We design and build your conversion system — website, automation, and brand identity working together.", zh: "我們設計並建置你的轉換系統——網站、自動化和品牌識別協同運作。" },
  "home.step3.title": { en: "Launch & Optimize", zh: "啟動與優化" },
  "home.step3.desc": { en: "We refine and prepare your system for growth. Launch with confidence, then optimize for maximum performance.", zh: "我們精煉並準備你的系統以促進成長。自信啟動，然後持續優化以獲得最佳表現。" },

  // Home differentiation
  "home.diff.title": { en: "Why Bluluma Is Different", zh: "為什麼選擇 Bluluma" },
  "home.diff.col.them": { en: "Most Agencies", zh: "一般設計公司" },
  "home.diff.col.us": { en: "Bluluma", zh: "Bluluma" },
  "home.diff.them1": { en: "Focus on making things look pretty", zh: "只注重外觀美觀" },
  "home.diff.us1": { en: "We focus on generating results", zh: "我們專注於產生成果" },
  "home.diff.them2": { en: "Take months to deliver", zh: "需要好幾個月才能交付" },
  "home.diff.us2": { en: "We build efficiently and strategically", zh: "我們高效且有策略地建置" },
  "home.diff.them3": { en: "Build websites that look good", zh: "建立好看的網站" },
  "home.diff.us3": { en: "We build systems that convert", zh: "我們建立會轉換的系統" },

  // Home pricing
  "home.pricing.title": { en: "Investment", zh: "投資方案" },
  "home.pricing.sub": { en: "Transparent pricing for businesses ready to invest in growth.", zh: "為準備投資成長的企業提供透明定價。" },
  "home.pricing.label": { en: "Projects Start From", zh: "專案起價" },
  "home.pricing.range": { en: "$1,499 – $5,000+", zh: "$1,499 – $5,000+" },
  "home.pricing.note": { en: "Most clients invest between $1,500 – $5,000+ depending on scope and complexity.", zh: "大多數客戶的投資額在 $1,500 – $5,000+ 之間，視範圍和複雜度而定。" },

  // Home proof
  "home.proof.title": { en: "Real Results. Not Just Designs.", zh: "真實成果，不只是設計。" },
  "home.proof.sub": { en: "See how we've helped businesses grow with conversion-focused systems.", zh: "看看我們如何以轉換導向的系統幫助企業成長。" },

  // Home final CTA
  "home.finalcta.title": { en: "Ready to Turn Your Website Into a Revenue System?", zh: "準備好把你的網站變成營收系統了嗎？" },
  "home.finalcta.sub": { en: "Book a free strategy session and get a custom conversion roadmap for your business.", zh: "預約免費策略會議，獲取你的專屬轉換路線圖。" },

  // Home selected work
  "home.work.title": { en: "Selected Work", zh: "精選作品" },
  "home.work.label": { en: "Live Sites", zh: "實際網站" },

  // Home testimonials
  "home.testimonials.title": { en: "What Clients Say", zh: "客戶回饋" },

  // Home quote section
  "home.quote.title": { en: "Get Your Website Strategy", zh: "獲取你的網站策略" },
  "home.quote.text": { en: "Tell us about your business and we'll create a custom conversion roadmap for you.", zh: "告訴我們你的業務，我們將為你制定專屬的轉換路線圖。" },

  // Home case studies
  "home.casestudies.title": { en: "Case Studies", zh: "案例研究" },
  "home.casestudies.label": { en: "Behind the Work", zh: "深入了解" },

  // Work page
  "work.title": { en: "Our Work", zh: "作品" },
  "work.intro": { en: "A selection of live websites, brand systems, and digital platforms we've designed and built.", zh: "以下為部分作品展示。點擊可直接開啟實際網站（新分頁）。" },
  "work.curated": { en: "A curated selection of our favorite website, branding, and digital projects.", zh: "精心策劃的網站、品牌識別與數位專案精選。" },
  "work.featured.title": { en: "Featured Case Studies", zh: "精選案例研究" },
  "work.all.title": { en: "All Projects", zh: "所有專案" },

  // Case studies listing
  "casestudies.title": { en: "Case Studies", zh: "案例研究" },
  "casestudies.intro": { en: "In-depth looks at how we solve design and digital challenges for our clients.", zh: "案例研究會更深入地說明背景、策略與設計決策，讓你理解我們如何把成果做出來。" },

  // Case study detail
  "casestudy.cta.title": { en: "Start Your Project", zh: "準備開始你的專案？" },
  "casestudy.cta.text": { en: "Ready to build something similar? Let's talk about your goals.", zh: "如果你正在考慮品牌更新或網站升級，歡迎告訴我們你的目標，我們會提供清楚的建議與下一步方向。" },
  "casestudy.back": { en: "← Case Studies", zh: "← 案例研究" },
  "casestudy.overview": { en: "Project Overview", zh: "專案概述" },
  "casestudy.challenge": { en: "The Challenge", zh: "專案挑戰" },
  "casestudy.approach": { en: "The Approach", zh: "解決方法" },
  "casestudy.deliverables": { en: "Deliverables", zh: "交付內容" },
  "casestudy.results": { en: "Results", zh: "成果摘要" },
  "casestudy.gallery": { en: "Gallery", zh: "專案圖集" },
  "casestudy.meta.client": { en: "Client", zh: "客戶" },
  "casestudy.meta.industry": { en: "Industry", zh: "產業" },
  "casestudy.meta.services": { en: "Services", zh: "服務內容" },
  "casestudy.coming-soon": { en: "Full case study content coming soon.", zh: "完整案例研究內容即將推出。" },
  "casestudy.not-found": { en: "Case study not found", zh: "找不到案例研究" },

  // Industries
  "industries.title": { en: "Industries We Work With", zh: "產業" },
  "industries.intro": { en: "We build digital platforms for businesses across a range of industries.", zh: "我們與不同產業合作，協助企業建立專業可信的數位形象與網站架構。" },
  "industries.back": { en: "← Industries", zh: "← 產業" },
  "industries.overview": { en: "Overview", zh: "概述" },
  "industries.what-we-build": { en: "What We Typically Build", zh: "我們通常建立的項目" },
  "industries.featured": { en: "Featured Projects", zh: "精選專案" },
  "industries.not-found": { en: "Industry not found", zh: "找不到該產業" },

  // Industry descriptions (hub page)
  "ind.healthcare-dental.desc": { en: "Websites and brand systems for healthcare providers, clinics, and dental practices.", zh: "為醫療機構、診所和牙科診所打造網站與品牌系統。" },
  "ind.professional-services.desc": { en: "Digital platforms for law firms, consultancies, and professional service providers.", zh: "為法律事務所、顧問公司和專業服務提供者打造數位平台。" },
  "ind.real-estate-construction.desc": { en: "Websites and brand systems for developers, builders, and real estate firms.", zh: "為開發商、建築公司和房地產企業打造網站與品牌系統。" },
  "ind.lifestyle-businesses.desc": { en: "Digital experiences for wellness, fitness, beauty, and lifestyle brands.", zh: "為健康、健身、美容和生活品牌打造數位體驗。" },
  "ind.creative-luxury-brands.desc": { en: "High-end digital platforms for creative agencies and luxury brands.", zh: "為創意工作室和精品品牌打造高端數位平台。" },
  "ind.home-services.desc": { en: "Websites for contractors, landscapers, and home service providers.", zh: "為承包商、景觀公司和居家服務提供者打造網站。" },
  "ind.retail-ecommerce.desc": { en: "Online stores and ecommerce platforms designed for conversion.", zh: "專為提升轉換率設計的線上商店與電商平台。" },
  "ind.education-training.desc": { en: "Digital platforms for educational institutions and training providers.", zh: "為教育機構和培訓提供者打造數位平台。" },

  // Industry detail overviews
  "ind.healthcare-dental.overview": { en: "Healthcare and dental practices need digital platforms that communicate trust, professionalism, and accessibility. Patients research online before booking — your website is often the first impression. We design clear, structured websites that help clinics attract new patients, explain services, and simplify the booking process. Our brand systems ensure every touchpoint — from the website to printed materials — feels cohesive and professional.", zh: "醫療與牙科診所需要能傳達信任、專業與親和力的數位平台。病患在預約前會先上網搜尋——你的網站往往就是第一印象。我們設計清晰、結構化的網站，幫助診所吸引新病患、說明服務內容，並簡化預約流程。我們的品牌系統確保每一個接觸點——從網站到印刷品——都呈現一致且專業的形象。" },
  "ind.professional-services.overview": { en: "Professional services firms compete on credibility and expertise. A generic website undermines both. We build structured digital platforms that clearly communicate your capabilities, showcase relevant experience, and make it easy for prospective clients to take the next step. Whether you're a financial advisory, law firm, or management consultancy, your website should position you as the obvious choice.", zh: "專業服務公司以信譽和專業能力競爭。通用網站會削弱兩者。我們打造結構化的數位平台，清楚傳達你的能力、展示相關經驗，並讓潛在客戶輕鬆採取下一步行動。" },
  "ind.real-estate-construction.overview": { en: "Real estate developments and construction firms require digital platforms that showcase projects with visual impact while providing the practical information buyers and investors need. We design websites that balance stunning visual presentation with structured content — floor plans, availability, location details, and contact pathways all work together to drive engagement and conversions.", zh: "房地產開發與建設公司需要能以視覺衝擊展示專案的數位平台，同時提供買家和投資者所需的實用資訊。我們設計的網站在精美的視覺呈現與結構化內容之間取得平衡。" },
  "ind.lifestyle-businesses.overview": { en: "Lifestyle brands live and die by their aesthetic. Your website needs to feel like an extension of the experience you offer — whether that's a spa, gym, yoga studio, or wellness brand. We design digital experiences that capture the atmosphere and energy of your business, making it effortless for visitors to understand what you offer and book their first visit.", zh: "生活品牌的成敗取決於美學。你的網站需要讓人感受到你所提供的體驗延伸——無論是 SPA、健身房、瑜珈教室還是健康品牌。我們設計能捕捉你品牌氛圍與能量的數位體驗。" },
  "ind.creative-luxury-brands.overview": { en: "Luxury and creative brands demand a level of design refinement that most agencies cannot deliver. Every pixel matters. We create digital platforms where typography, whitespace, and motion design work together to create an experience that feels premium and intentional. Our approach prioritizes restraint and craft — the hallmarks of true luxury design.", zh: "精品與創意品牌要求大多數設計工作室無法達到的精緻設計水準。每一個像素都很重要。我們打造字體排印、留白與動態設計完美結合的數位平台，營造高端且用心的體驗。" },
  "ind.home-services.overview": { en: "Home service businesses need websites that generate leads — not just look good. Homeowners searching for contractors, landscapers, or renovation companies make fast decisions based on professionalism and trust signals. We build clean, conversion-focused websites that clearly present your services, showcase completed projects, and make it easy for visitors to request a quote or call directly.", zh: "居家服務企業需要能帶來客戶的網站——不只是好看而已。尋找承包商、景觀公司或裝修公司的屋主會根據專業度和信任感快速做出決定。我們打造乾淨、以轉換為核心的網站。" },
  "ind.retail-ecommerce.overview": { en: "Ecommerce success depends on product presentation, user experience, and trust. We design online stores that make products look their best, guide shoppers through intuitive navigation, and remove friction from the checkout process. Whether you're launching a new brand or refreshing an existing store, we build platforms that drive sales and scale with your business.", zh: "電商的成功取決於產品呈現、使用者體驗和信任感。我們設計的線上商店讓產品呈現最佳狀態，透過直覺式導航引導消費者，並消除結帳流程中的阻力。" },
  "ind.education-training.overview": { en: "Educational institutions and training providers need websites that clearly communicate programs, build credibility, and drive enrollment. We design structured digital platforms that organize complex program information into clear, navigable experiences.", zh: "教育機構和培訓提供者需要能清楚傳達課程、建立信譽並推動招生的網站。我們設計結構化的數位平台，將複雜的課程資訊組織成清晰、易於瀏覽的體驗。" },

  // Industry whatWeBuild items
  "ind.healthcare-dental.wb.1": { en: "Patient-focused websites with online booking integration", zh: "以病患為中心的網站，整合線上預約功能" },
  "ind.healthcare-dental.wb.2": { en: "Brand identity systems for clinics and multi-location practices", zh: "為診所與多據點醫療機構打造品牌識別系統" },
  "ind.healthcare-dental.wb.3": { en: "Service pages structured for SEO and local search visibility", zh: "為 SEO 和本地搜尋可見度優化的服務頁面" },
  "ind.healthcare-dental.wb.4": { en: "Marketing collateral including business cards, brochures, and signage", zh: "包含名片、宣傳冊和招牌的行銷素材" },
  "ind.healthcare-dental.wb.5": { en: "HIPAA-aware design and accessibility considerations", zh: "符合醫療隱私規範的設計與無障礙考量" },

  "ind.professional-services.wb.1": { en: "Corporate websites with clear service architecture", zh: "具備清晰服務架構的企業網站" },
  "ind.professional-services.wb.2": { en: "Brand identity systems that communicate authority and trust", zh: "傳達權威與信任的品牌識別系統" },
  "ind.professional-services.wb.3": { en: "Case study and portfolio sections to demonstrate expertise", zh: "展示專業能力的案例研究與作品集區塊" },
  "ind.professional-services.wb.4": { en: "Lead generation pages with conversion-focused UX", zh: "以轉換為核心的潛在客戶開發頁面" },
  "ind.professional-services.wb.5": { en: "Marketing collateral for proposals, presentations, and events", zh: "提案、簡報和活動用的行銷素材" },

  "ind.real-estate-construction.wb.1": { en: "Development marketing websites with project galleries and floor plans", zh: "含專案圖集和平面圖的開發行銷網站" },
  "ind.real-estate-construction.wb.2": { en: "Brand identity for new developments and construction companies", zh: "為新開發案和建設公司打造品牌識別" },
  "ind.real-estate-construction.wb.3": { en: "Interactive site plans and availability tools", zh: "互動式場地規劃和可售單位工具" },
  "ind.real-estate-construction.wb.4": { en: "Marketing collateral for pre-sales and investor presentations", zh: "預售和投資者簡報用的行銷素材" },
  "ind.real-estate-construction.wb.5": { en: "SEO-optimized pages for local market visibility", zh: "為本地市場可見度優化的 SEO 頁面" },

  "ind.lifestyle-businesses.wb.1": { en: "Brand-forward websites that capture your atmosphere and energy", zh: "以品牌為核心、捕捉你的氛圍與能量的網站" },
  "ind.lifestyle-businesses.wb.2": { en: "Online booking and membership integration", zh: "線上預約和會員整合" },
  "ind.lifestyle-businesses.wb.3": { en: "Visual identity systems for physical and digital touchpoints", zh: "適用於實體和數位接觸點的視覺識別系統" },
  "ind.lifestyle-businesses.wb.4": { en: "Social media templates and marketing materials", zh: "社群媒體模板和行銷素材" },
  "ind.lifestyle-businesses.wb.5": { en: "Photography direction and content strategy", zh: "攝影方向和內容策略" },

  "ind.creative-luxury-brands.wb.1": { en: "Portfolio and showcase websites with refined visual design", zh: "具備精緻視覺設計的作品集與展示網站" },
  "ind.creative-luxury-brands.wb.2": { en: "Brand identity systems with premium material specifications", zh: "含高級材質規格的品牌識別系統" },
  "ind.creative-luxury-brands.wb.3": { en: "Editorial-style content layouts and lookbooks", zh: "編輯風格的內容版面與型錄" },
  "ind.creative-luxury-brands.wb.4": { en: "Ecommerce experiences designed for high-value products", zh: "專為高價產品設計的電商體驗" },
  "ind.creative-luxury-brands.wb.5": { en: "Print collateral with luxury finishing specifications", zh: "含精品級加工規格的印刷品" },

  "ind.home-services.wb.1": { en: "Lead-generation websites with clear service pages", zh: "具備清晰服務頁面的潛在客戶開發網站" },
  "ind.home-services.wb.2": { en: "Before/after project galleries", zh: "施工前後對比圖集" },
  "ind.home-services.wb.3": { en: "Local SEO optimization for service area visibility", zh: "服務區域可見度的本地 SEO 優化" },
  "ind.home-services.wb.4": { en: "Brand identity for trucks, uniforms, and signage", zh: "車輛、制服和招牌的品牌識別" },
  "ind.home-services.wb.5": { en: "Google Business Profile optimization", zh: "Google 商家檔案優化" },

  "ind.retail-ecommerce.wb.1": { en: "Custom ecommerce websites with optimized product pages", zh: "含優化產品頁面的客製電商網站" },
  "ind.retail-ecommerce.wb.2": { en: "Brand identity systems for retail and DTC brands", zh: "零售和 DTC 品牌的品牌識別系統" },
  "ind.retail-ecommerce.wb.3": { en: "Product photography direction and content strategy", zh: "產品攝影方向和內容策略" },
  "ind.retail-ecommerce.wb.4": { en: "Conversion-optimized checkout flows", zh: "轉換優化的結帳流程" },
  "ind.retail-ecommerce.wb.5": { en: "Marketing collateral and packaging design", zh: "行銷素材和包裝設計" },

  "ind.education-training.wb.1": { en: "Program and course catalog websites with clear navigation", zh: "具備清晰導覽的課程目錄網站" },
  "ind.education-training.wb.2": { en: "Brand identity systems for educational institutions", zh: "教育機構的品牌識別系統" },
  "ind.education-training.wb.3": { en: "Enrollment and registration landing pages", zh: "報名和註冊的登陸頁面" },
  "ind.education-training.wb.4": { en: "Resource libraries and content management systems", zh: "資源庫和內容管理系統" },
  "ind.education-training.wb.5": { en: "Marketing materials for recruitment campaigns", zh: "招生活動的行銷素材" },

  // Industry names
  "ind.healthcare-dental": { en: "Healthcare & Dental", zh: "醫療與牙科" },
  "ind.professional-services": { en: "Professional Services", zh: "專業服務" },
  "ind.real-estate-construction": { en: "Real Estate & Construction", zh: "房地產與建設" },
  "ind.lifestyle-businesses": { en: "Lifestyle Businesses", zh: "生活品牌" },
  "ind.creative-luxury-brands": { en: "Creative & Luxury Brands", zh: "創意與精品品牌" },
  "ind.home-services": { en: "Home Services", zh: "居家服務" },
  "ind.retail-ecommerce": { en: "Retail & Ecommerce", zh: "零售與電商" },
  "ind.education-training": { en: "Education & Training", zh: "教育與培訓" },

  // Solutions page (new)
  "sol.label": { en: "Our Solutions", zh: "我們的解決方案" },
  "sol.hero.title": { en: "Conversion Systems Built for Business Growth", zh: "為業務成長而打造的轉換系統" },
  "sol.hero.sub": { en: "We don't sell design. We build complete conversion systems that turn traffic into leads and leads into revenue.", zh: "我們不賣設計。我們打造完整的轉換系統，將流量轉化為潛在客戶、再轉化為營收。" },
  "sol.cws.title": { en: "Conversion Website System", zh: "高轉換率網站系統" },
  "sol.cws.desc": { en: "Websites that actually convert. We design websites with structure, psychology, and conversion in mind — not just aesthetics.", zh: "真正能轉換的網站。我們以結構、心理學和轉換為核心來設計網站——而非僅僅追求美觀。" },
  "sol.cws.f1": { en: "Conversion-first CTA strategy and placement", zh: "以轉換為核心的 CTA 策略與配置" },
  "sol.cws.f2": { en: "Structured funnel flow from landing to contact", zh: "從著陸到聯繫的結構化漏斗流程" },
  "sol.cws.f3": { en: "Mobile-first responsive optimization", zh: "行動裝置優先的響應式優化" },
  "sol.cws.f4": { en: "SEO-ready architecture for organic growth", zh: "SEO 友好架構，促進自然成長" },
  "sol.ai.title": { en: "AI Automation System", zh: "AI 自動化系統" },
  "sol.ai.desc": { en: "Automate your business operations. We build systems that capture, qualify, and follow up with leads automatically.", zh: "自動化你的業務營運。我們打造能自動捕捉、篩選和跟進潛在客戶的系統。" },
  "sol.ai.f1": { en: "Automated lead capture and qualification", zh: "自動化潛在客戶捕捉與篩選" },
  "sol.ai.f2": { en: "Intelligent follow-up sequences", zh: "智慧跟進序列" },
  "sol.ai.f3": { en: "Workflow automation for repetitive tasks", zh: "重複性任務的工作流程自動化" },
  "sol.ai.f4": { en: "Integration with existing business tools", zh: "與現有業務工具整合" },
  "sol.brand.title": { en: "Brand Identity System", zh: "品牌識別系統" },
  "sol.brand.desc": { en: "Build a premium brand presence. Strategic branding that positions your business as the obvious choice in your market.", zh: "打造高端品牌形象。策略性品牌設計，讓你的企業成為市場中的首選。" },
  "sol.brand.f1": { en: "Strategic brand positioning and messaging", zh: "策略性品牌定位與訊息" },
  "sol.brand.f2": { en: "Logo design and visual identity system", zh: "Logo 設計與視覺識別系統" },
  "sol.brand.f3": { en: "Brand guidelines and standards documentation", zh: "品牌指南與標準文件" },
  "sol.brand.f4": { en: "Marketing collateral and print design", zh: "行銷素材與印刷品設計" },

  // Process page
  "process.label": { en: "Our Process", zh: "我們的流程" },
  "process.hero.title": { en: "How We Build Revenue Systems", zh: "我們如何打造營收系統" },
  "process.hero.sub": { en: "A structured, strategy-first approach designed to deliver measurable business results.", zh: "以策略為核心的結構化方法，旨在產出可衡量的業務成果。" },
  "process.s1.title": { en: "Strategy & Discovery", zh: "策略與探索" },
  "process.s1.desc": { en: "We analyze your business, competitors, and target audience. We identify conversion opportunities, define your positioning, and create a strategic roadmap for your project.", zh: "我們分析你的業務、競爭對手和目標受眾。找出轉換機會，確定品牌定位，並為你的專案制定策略路線圖。" },
  "process.s2.title": { en: "System Design", zh: "系統設計" },
  "process.s2.desc": { en: "We design the complete conversion system — wireframes, user flows, visual design, and content strategy. Every element is engineered for maximum conversion impact.", zh: "我們設計完整的轉換系統——線框圖、使用者流程、視覺設計和內容策略。每個元素都以最大化轉換效果為目標。" },
  "process.s3.title": { en: "Build & Develop", zh: "建置與開發" },
  "process.s3.desc": { en: "We build your conversion system with clean, performant code. Responsive design, fast load times, and seamless integrations are standard.", zh: "我們以乾淨、高效能的程式碼建置你的轉換系統。響應式設計、快速載入和無縫整合是標準配備。" },
  "process.s4.title": { en: "Launch", zh: "啟動上線" },
  "process.s4.desc": { en: "We handle the complete launch process — QA testing, performance optimization, and deployment. Your system goes live with confidence.", zh: "我們處理完整的上線流程——品質測試、效能優化和部署。讓你的系統自信上線。" },
  "process.s5.title": { en: "Optimize & Scale", zh: "優化與擴展" },
  "process.s5.desc": { en: "Post-launch, we monitor performance, analyze conversion data, and make strategic optimizations to continuously improve results.", zh: "上線後，我們監控效能、分析轉換數據，並進行策略性優化以持續改善成果。" },
  "process.cta.title": { en: "Ready to Start?", zh: "準備好開始了嗎？" },
  "process.cta.sub": { en: "Book a free strategy session and get a custom conversion roadmap for your business.", zh: "預約免費策略會議，獲取專屬的轉換路線圖。" },

  // Pricing page
  "pricing.label": { en: "Investment", zh: "投資方案" },
  "pricing.hero.title": { en: "Transparent Pricing for Serious Businesses", zh: "為認真的企業提供透明定價" },
  "pricing.hero.sub": { en: "We work with businesses that understand the value of a high-converting digital presence. Here's what to expect.", zh: "我們與理解高轉換率數位形象價值的企業合作。以下是你可以預期的。" },
  "pricing.for.title": { en: "This is for you if:", zh: "適合以下企業：" },
  "pricing.for.1": { en: "You're a business ready to invest in real growth", zh: "你的企業準備投資於真正的成長" },
  "pricing.for.2": { en: "You value strategy over cheap templates", zh: "你重視策略勝過廉價模板" },
  "pricing.for.3": { en: "You want a system that generates revenue", zh: "你想要一個能產生營收的系統" },
  "pricing.for.4": { en: "You're looking for a long-term partner", zh: "你在尋找長期合作夥伴" },
  "pricing.notfor.title": { en: "This is NOT for you if:", zh: "不適合以下情況：" },
  "pricing.notfor.1": { en: "You need a cheap one-page website", zh: "你需要一個便宜的單頁網站" },
  "pricing.notfor.2": { en: "You want to DIY with a template builder", zh: "你想用模板自行建置" },
  "pricing.notfor.3": { en: "You're not ready to invest in your business", zh: "你還沒準備好為業務投資" },

  // Contact page
  "contact.label": { en: "Get Started", zh: "開始合作" },
  "contact.hero.title": { en: "Start Your Project", zh: "開始你的專案" },
  "contact.hero.sub": { en: "Tell us about your business and goals. We'll respond within 24–48 hours with a custom strategy recommendation.", zh: "告訴我們你的業務和目標。我們會在 24-48 小時內回覆你專屬的策略建議。" },
  "contact.response": { en: "We review all inquiries and respond within 24–48 hours. For urgent requests, email us directly.", zh: "我們會審閱所有詢問並在 24-48 小時內回覆。如有緊急需求，請直接寄信給我們。" },

  // Legacy solutions keys (kept for compatibility)
  "solutions.title": { en: "Solutions", zh: "解決方案" },
  "solutions.intro": { en: "We offer a focused set of services designed to build and grow your digital presence.", zh: "我們提供品牌與網站相關的完整設計服務，協助企業建立一致且可長期成長的數位系統。" },
  "sol.legacy.web-platforms": { en: "Web Platforms", zh: "網站平台" },
  "sol.legacy.web-platforms.desc": { en: "Modern, scalable websites designed for performance and long-term growth.", zh: "為企業打造現代化、可擴展的網站平台，兼顧效能、使用體驗與長期成長需求。" },
  "sol.legacy.brand-identity": { en: "Brand Identity Systems", zh: "品牌識別系統" },
  "sol.legacy.brand-identity.desc": { en: "Strategic brand systems that create recognition and consistency across every touchpoint.", zh: "透過完整的品牌策略與設計系統，建立清晰辨識度，讓品牌在所有接觸點都保持一致與專業。" },
  "sol.legacy.ecommerce": { en: "Ecommerce Platforms", zh: "電商平台" },
  "sol.legacy.ecommerce.desc": { en: "Online stores built to maximize product presentation and drive conversion.", zh: "打造專為產品展示與銷售轉換設計的電商網站，提升商品呈現、購物體驗與整體轉換率。" },
  "sol.legacy.marketing": { en: "Marketing Collateral", zh: "行銷設計素材" },
  "sol.legacy.marketing.desc": { en: "Printed and digital marketing materials that extend brand identity into the real world.", zh: "從印刷到數位媒體，將品牌視覺延伸至各種行銷素材，確保品牌在所有曝光場景都保持一致。" },
  "sol.legacy.conversion": { en: "Conversion Optimization", zh: "網站轉換優化" },
  "sol.legacy.conversion.desc": { en: "Data-informed strategies that improve website performance and lead generation.", zh: "透過數據分析與使用者行為研究，持續優化網站體驗，提升詢問數量與轉換率。" },

  // Agency
  "agency.title": { en: "About Bluluma", zh: "關於我們" },
  "agency.p1": { en: "Bluluma Design is a Vancouver-based digital design studio focused on building modern websites, brand systems, and digital platforms for growing businesses.", zh: "Bluluma Design 是位於 Vancouver 的數位設計工作室，專注於品牌識別、網站平台與數位設計系統。" },
  "agency.p2": { en: "Our work combines design thinking, technology, and strategy to create digital experiences that support long-term growth. We focus on clarity, structure, and performance — building systems that work as hard as the businesses they represent.", zh: "我們以清晰的資訊架構、嚴謹的視覺系統與高效率的製作流程，協助企業建立可信且可延伸的品牌與網站。" },
  "agency.p3": { en: "We work with businesses across healthcare, real estate, ecommerce, professional services, and more. Every project starts with understanding the business, its audience, and its goals.", zh: "我們與多個產業的企業合作，包括醫療、房地產、電商與專業服務等。\n每一個專案都從深入了解企業本身開始 —— 包含品牌定位、目標客群，以及企業的長期發展目標。" },
  "agency.work-with-us": { en: "Work With Us", zh: "與我們合作" },
  "agency.work-with-us-sub": { en: "Tell us about your next project.", zh: "告訴我們你的下一個專案。" },
  "agency.focus": { en: "Focus", zh: "核心領域" },
  "agency.focus.value": { en: "Strategic Digital Design", zh: "策略型數位設計" },
  "agency.location": { en: "Location", zh: "地點" },
  "agency.location.value": { en: "Vancouver, BC", zh: "加拿大溫哥華" },
  "agency.founded": { en: "Founded", zh: "成立年份" },
  "agency.vision": { en: "Vision", zh: "願景" },
  "agency.vision.text": { en: "To build digital brand systems and websites that help businesses grow with clarity and long-term scalability.", zh: "打造數位品牌系統和網站，幫助企業以清晰且可長期擴展的方式成長。" },
  "agency.mission": { en: "Mission", zh: "使命" },
  "agency.mission.text": { en: "To combine strategic design thinking, modern web technologies, and efficient production workflows to deliver professional digital platforms.", zh: "結合策略性設計思維、現代化網頁技術和高效的製作流程，交付專業的數位平台。" },
  "agency.values": { en: "Values", zh: "核心價值" },
  "agency.values.1": { en: "Clarity over noise", zh: "清晰勝於雜亂" },
  "agency.values.2": { en: "Systems thinking", zh: "系統化思維" },
  "agency.values.3": { en: "Craft and speed", zh: "工藝與速度" },
  "agency.values.4": { en: "Evidence-led decisions", zh: "以證據為導向的決策" },
  "agency.values.5": { en: "Long-term maintainability", zh: "長期可維護性" },

  // Contact
  "contact.title": { en: "Start Your Project", zh: "開始你的專案" },
  "contact.intro": { en: "Tell us about your business and the digital platform you want to build.", zh: "歡迎留下你的需求與目標，我們會盡快回覆。" },
  "contact.location": { en: "Location", zh: "地點" },

  // Footer
  "footer.desc": { en: "Bluluma Design is a Vancouver-based digital studio specializing in websites, brand systems, and digital platforms.", zh: "Bluluma Design｜品牌識別・網站設計・數位平台・行銷設計" },
  "footer.navigation": { en: "Navigation", zh: "導覽" },
  "footer.contact": { en: "Contact", zh: "聯絡" },
  "footer.location": { en: "Location", zh: "地點" },
  "footer.email": { en: "Email", zh: "Email" },
  "footer.follow": { en: "Follow", zh: "追蹤" },
  "footer.privacy": { en: "Privacy", zh: "隱私權" },
  "footer.terms": { en: "Terms", zh: "使用條款" },

  // Prev/Next
  "prev": { en: "← Previous", zh: "← 上一頁" },
  "next": { en: "Next →", zh: "下一頁 →" },

  // Testimonial project types
  "testimonial.brand-website": { en: "Brand + Website", zh: "品牌 + 網站" },
  "testimonial.website-platform": { en: "Website Platform", zh: "網站平台" },

  // Testimonial quotes
  "testimonial.1.quote": { en: "Bluluma transformed our online presence completely. The new website and brand identity have brought us more patient inquiries than we ever expected.", zh: "Bluluma 徹底改變了我們的線上形象。\n新的品牌與網站為我們帶來了比預期更多的患者詢問。" },
  "testimonial.2.quote": { en: "Working with Bluluma was seamless from start to finish. They understood our vision and delivered a platform that truly represents our development.", zh: "與 Bluluma 合作的過程非常順暢。\n他們完全理解我們的願景，並打造出真正代表這個開發案的品牌與網站。" },
  "testimonial.3.quote": { en: "The attention to detail and strategic thinking behind every design decision made all the difference. Our new site performs beyond expectations.", zh: "每一個設計決策背後都有清楚的策略思考與細節考量。\n我們的新網站表現遠遠超出預期。" },
  "testimonial.4.quote": { en: "Bluluma delivered a brand system and website that elevated our entire business. The clarity and professionalism speak for themselves.", zh: "Bluluma 為我們打造的品牌系統與網站，\n大幅提升了整體企業形象與市場專業度。" },
  "testimonial.5.quote": { en: "Their process was structured, transparent, and efficient. We launched on time with a website that immediately started generating leads.", zh: "Bluluma 的工作流程清晰、透明且高效率。\n我們準時完成網站上線，而且新網站很快就開始為我們帶來客戶詢問。" },
  "testimonial.6.quote": { en: "From strategy to launch, Bluluma brought a level of craft and professionalism that set them apart from every other agency we've worked with.", zh: "從策略到網站上線，Bluluma 展現出的專業程度與設計細節，\n遠遠超過我們合作過的其他設計公司。" },

  // Friendly Dental case study
  "cs.fd.overview.1": { en: "Friendly Dental is a modern dental clinic serving families and professionals in the Vancouver area. The practice had been operating for several years with a strong patient base but lacked a cohesive brand presence and digital platform that reflected the quality of care they provide.", zh: "Friendly Dental 是一家位於 Vancouver 的現代牙科診所，服務對象涵蓋家庭與專業人士。\n診所在多年營運中已累積穩定的患者基礎，但整體品牌形象與數位平台仍無法充分反映其醫療品質與專業形象。" },
  "cs.fd.overview.2": { en: "Bluluma was engaged to develop a complete brand identity system and a new website platform that would position Friendly Dental as a leading modern dental practice — approachable, professional, and trustworthy.", zh: "Bluluma 受邀為 Friendly Dental 建立完整的品牌識別系統與全新的網站平台，\n讓診所在市場上呈現現代、專業且值得信賴的品牌形象。" },
  "cs.fd.overview.3": { en: "The project encompassed brand strategy, visual identity design, website architecture, content development, and marketing collateral — delivered as an integrated system designed to work across every patient touchpoint.", zh: "本專案涵蓋品牌策略、視覺識別設計、網站架構規劃、內容設計以及行銷素材設計，\n整體以一套整合式品牌系統打造，確保每一個患者接觸點都能呈現一致的品牌體驗。" },
  "cs.fd.challenge.intro": { en: "Friendly Dental faced several challenges common to healthcare practices looking to grow and modernize their patient-facing presence:", zh: "Friendly Dental 面臨的挑戰，其實也是許多成長中的醫療診所常見的問題：" },
  "cs.fd.challenge.1": { en: "The existing website was outdated and did not reflect the clinic's modern facilities or patient experience.", zh: "原有網站設計老舊，無法呈現診所現代化設備與優質的患者體驗。" },
  "cs.fd.challenge.2": { en: "There was no consistent brand system — marketing materials, signage, and digital assets were visually disconnected.", zh: "缺乏完整的品牌系統，導致行銷素材、招牌與網站視覺彼此不一致。" },
  "cs.fd.challenge.3": { en: "Patient acquisition relied heavily on word-of-mouth with limited digital visibility.", zh: "新患者來源主要依賴口碑介紹，數位曝光與搜尋能見度有限。" },
  "cs.fd.challenge.4": { en: "The website lacked clear calls-to-action and was not optimized for mobile devices.", zh: "網站缺乏清晰的行動呼籲（Call-to-Action），也未針對手機裝置進行優化。" },
  "cs.fd.challenge.5": { en: "Competitors in the area had invested in modern digital experiences, creating a perception gap.", zh: "區域內競爭診所已投入現代化數位體驗，形成明顯的品牌落差。" },
  "cs.fd.approach.1.heading": { en: "Brand Strategy & Positioning", zh: "品牌策略與定位" },
  "cs.fd.approach.1.body": { en: "We began with a strategic audit of the competitive landscape and patient demographics. This informed a positioning strategy that emphasized approachability and clinical excellence — moving away from the clinical coldness typical of dental branding toward a warm, confident visual language.", zh: "我們首先分析競爭市場與患者族群，\n將 Friendly Dental 的品牌定位為親切、專業且值得信賴的現代牙科診所。\n\n設計語言刻意避免傳統牙科品牌常見的冷冰醫療感，\n轉而採用溫暖且具信任感的視覺風格。" },
  "cs.fd.approach.2.heading": { en: "Visual Identity System", zh: "視覺識別系統" },
  "cs.fd.approach.2.body": { en: "The brand identity was built around a clean, modern aesthetic with a carefully selected color palette that communicates trust and professionalism. Typography was chosen for clarity at all sizes, and a set of brand guidelines ensures consistency across all applications — from business cards to environmental signage.", zh: "品牌識別採用簡潔現代的設計語言，\n搭配精心挑選的色彩系統，傳達專業與安心感。\n\n字體系統則兼顧閱讀清晰度與品牌氣質，\n並建立完整品牌指南，確保從名片到診所環境設計都保持一致。" },
  "cs.fd.approach.3.heading": { en: "Website Architecture & Design", zh: "網站架構與設計" },
  "cs.fd.approach.3.body": { en: "The website was structured to serve two primary audiences: new patients researching dental care options and existing patients looking to book appointments or access information. Clear navigation, prominent booking CTAs, and service-specific landing pages create an efficient user experience.", zh: "網站設計同時服務兩種主要使用者：\n\n1️⃣ 正在尋找牙科診所的新患者\n2️⃣ 已有患者需要預約或查詢資訊\n\n透過清晰導航、明顯的預約 CTA 以及服務導向頁面，\n讓使用者可以快速找到所需資訊。" },
  "cs.fd.approach.4.heading": { en: "Content & Photography Direction", zh: "內容與攝影方向" },
  "cs.fd.approach.4.body": { en: "Content was written to be informative without being clinical, addressing common patient concerns in accessible language. Photography direction focused on the real clinic environment and team, avoiding generic stock imagery that undermines credibility in healthcare.", zh: "網站內容以易理解的語言回答患者常見問題，\n避免過度醫療化的專業術語。\n\n攝影則以真實診所環境與醫療團隊為主，\n避免使用過於制式的醫療素材照片，以提升信任度。" },
  "cs.fd.deliverable.1": { en: "Brand strategy and positioning document", zh: "品牌策略與品牌定位文件" },
  "cs.fd.deliverable.2": { en: "Primary logo, logo variations, and lockup system", zh: "主 Logo 與延伸 Logo 系統" },
  "cs.fd.deliverable.3": { en: "Brand color palette and typography system", zh: "品牌色彩與字體系統" },
  "cs.fd.deliverable.4": { en: "Brand guidelines document", zh: "品牌設計指南（Brand Guidelines）" },
  "cs.fd.deliverable.5": { en: "Responsive website design and development", zh: "響應式網站設計與開發" },
  "cs.fd.deliverable.6": { en: "Service page templates and content", zh: "服務頁模板與內容架構" },
  "cs.fd.deliverable.7": { en: "Appointment booking integration", zh: "線上預約系統整合" },
  "cs.fd.deliverable.8": { en: "Business cards and letterhead", zh: "名片與信紙設計" },
  "cs.fd.deliverable.9": { en: "Environmental signage concepts", zh: "診所環境招牌設計概念" },
  "cs.fd.result.1": { en: "The new website and brand system launched successfully, providing Friendly Dental with a cohesive, professional presence across all touchpoints.", zh: "新品牌與網站成功上線後，\nFriendly Dental 在所有品牌接觸點都呈現出一致且專業的形象。" },
  "cs.fd.result.2": { en: "Patient inquiries through the website increased significantly in the months following launch, with the online booking feature seeing strong adoption.", zh: "網站推出後數月內，\n透過網站的患者詢問數量顯著增加，\n線上預約功能也迅速成為主要預約管道。" },
  "cs.fd.result.3": { en: "The brand system provided the clinic with a scalable visual framework that maintains consistency as they expand their marketing efforts.", zh: "品牌系統也為診所未來的行銷活動提供了可持續擴展的設計基礎。" },
  "cs.fd.result.4": { en: "Staff reported that patients frequently comment on the professionalism of the new website and materials, reinforcing the practice's positioning as a modern, quality-focused clinic.", zh: "診所團隊表示，\n許多患者都對新網站與品牌形象的專業度留下深刻印象，\n進一步強化了診所「現代化牙科診所」的市場定位。" },
};

export const LangProvider = ({ children }: { children: ReactNode }) => {
  const [lang, setLangState] = useState<Lang>(() => {
    if (typeof window === "undefined") return "en";
    return (localStorage.getItem("bluluma_lang") as Lang) || "en";
  });

  const setLang = (l: Lang) => {
    setLangState(l);
    localStorage.setItem("bluluma_lang", l);
  };

  const t = (key: string): string => {
    const entry = translations[key];
    if (!entry) return key;
    return entry[lang] || entry.en || key;
  };

  return (
    <LangContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LangContext.Provider>
  );
};
