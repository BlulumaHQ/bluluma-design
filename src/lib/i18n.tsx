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
  "nav.services": { en: "Services", zh: "服務" },
  "nav.agency": { en: "Agency", zh: "關於我們" },
  "nav.insights": { en: "Insights", zh: "Insights" },
  "nav.contact": { en: "Contact", zh: "聯絡我們" },

  // CTAs
  "cta.view-work": { en: "View Our Work", zh: "查看作品" },
  "cta.view-portfolio": { en: "View Portfolio", zh: "查看作品" },
  "cta.start-project": { en: "Start a Project", zh: "開始專案" },
  "cta.request-quote": { en: "Request a Quote", zh: "索取報價" },
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
  "home.hero.h1": { en: "Design Systems for Modern Businesses", zh: "我們為企業打造品牌與網站系統" },
  "home.hero.sub": { en: "We design and build high-performance websites, brand platforms, and digital experiences that help businesses grow faster.", zh: "讓你的企業在數位世界中看起來更專業、更可信，也更容易被客戶找到。" },

  // Home selected work
  "home.work.title": { en: "Selected Work", zh: "精選作品" },
  "home.work.label": { en: "Live Sites", zh: "實際網站" },
  "home.work.intro": { en: "", zh: "每一個專案都是為企業量身打造，從品牌識別到網站平台，再到行銷視覺設計，讓企業在市場中呈現一致且專業的形象。" },
  "home.work.note": { en: "", zh: "點擊專案可直接開啟實際網站（新分頁）。" },

  // Home what we build
  "home.build.title": { en: "What We Build", zh: "我們能為你打造什麼" },
  "home.build.cap1.title": { en: "Digital Platforms", zh: "網站平台" },
  "home.build.cap1.desc": { en: "Modern websites and scalable digital platforms designed for performance and growth.", zh: "建立清晰、快速且可擴展的現代化網站平台，兼顧行動裝置體驗與長期維護。" },
  "home.build.cap2.title": { en: "Brand Systems", zh: "品牌識別系統" },
  "home.build.cap2.desc": { en: "Strategic identity systems that create consistent and recognizable brands.", zh: "不只是 Logo，而是可延伸到網站與行銷素材的完整品牌系統與設計規範。" },
  "home.build.cap3.title": { en: "Ecommerce Experiences", zh: "電商體驗" },
  "home.build.cap3.desc": { en: "Online stores designed to maximize product presentation and conversion.", zh: "以品牌一致性為核心的電商網站設計，提升產品呈現與購買流程體驗。" },
  "home.build.cap4.title": { en: "AI Business Automation", zh: "行銷設計" },
  "home.build.cap4.desc": { en: "Automation tools and intelligent workflows that improve operational efficiency.", zh: "從社群視覺到宣傳素材，協助品牌在每一次曝光都保持一致且專業。" },

  // Home industries
  "home.industries.title": { en: "Industries We Work With", zh: "合作產業" },
  "home.industries.intro": { en: "", zh: "不同產業有不同的客戶決策模式與溝通方式。我們會根據產業特性設計最適合的網站結構與品牌呈現。" },

  // Home testimonials
  "home.testimonials.title": { en: "What Clients Say", zh: "客戶回饋" },

  // Home how we work
  "home.workflow.title": { en: "How We Work", zh: "我們的流程" },
  "home.workflow.s1.title": { en: "Strategy", zh: "策略與規劃" },
  "home.workflow.s1.desc": { en: "Understanding the business, audience, and project goals before design begins.", zh: "了解你的企業、目標客戶與市場定位，建立清晰的品牌與網站方向。" },
  "home.workflow.s2.title": { en: "Design", zh: "設計與品牌系統" },
  "home.workflow.s2.desc": { en: "Creating the brand system and visual layout that defines the digital experience.", zh: "設計品牌識別與網站視覺系統，確保整體風格一致且專業。" },
  "home.workflow.s3.title": { en: "Build", zh: "網站建置" },
  "home.workflow.s3.desc": { en: "Developing the website and preparing all assets for launch.", zh: "建立現代化網站平台，確保在桌面與手機上都能完美呈現。" },
  "home.workflow.s4.title": { en: "Launch", zh: "發布與優化" },
  "home.workflow.s4.desc": { en: "Publishing the website and ensuring everything runs smoothly.", zh: "網站上線後，我們會協助基本驗收與必要調整，確保網站穩定運作。" },

  // Home workflow deliverables
  "home.workflow.d1.1": { en: "Project brief", zh: "專案概述" },
  "home.workflow.d1.2": { en: "Site structure", zh: "網站架構" },
  "home.workflow.d1.3": { en: "Design direction", zh: "設計方向" },
  "home.workflow.d2.1": { en: "Brand visuals", zh: "品牌視覺" },
  "home.workflow.d2.2": { en: "Website layout", zh: "網站版面" },
  "home.workflow.d2.3": { en: "UI design", zh: "介面設計" },
  "home.workflow.d3.1": { en: "Website development", zh: "網站開發" },
  "home.workflow.d3.2": { en: "Responsive layout", zh: "響應式設計" },
  "home.workflow.d3.3": { en: "Performance optimization", zh: "效能優化" },
  "home.workflow.d4.1": { en: "Deployment", zh: "部署上線" },
  "home.workflow.d4.2": { en: "Testing", zh: "測試驗收" },
  "home.workflow.d4.3": { en: "Final delivery", zh: "最終交付" },

  // Home quote section
  "home.quote.title": { en: "Request a Quote", zh: "索取報價" },
  "home.quote.text": { en: "Tell us about your project and we'll get back to you with next steps.", zh: "請簡單描述你的需求，我們會盡快回覆並提供下一步建議。" },

  // Home case studies
  "home.casestudies.title": { en: "Case Studies", zh: "案例研究" },
  "home.casestudies.label": { en: "Behind the Work", zh: "深入了解" },

  // Work page
  "work.title": { en: "Our Work", zh: "作品" },
  "work.intro": { en: "A selection of live websites, brand systems, and digital platforms we've designed and built.", zh: "以下為部分作品展示。點擊可直接開啟實際網站（新分頁）。" },

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

  // Solutions
  "solutions.title": { en: "Solutions", zh: "解決方案" },
  "solutions.intro": { en: "We offer a focused set of services designed to build and grow your digital presence.", zh: "我們提供品牌與網站相關的完整設計服務，協助企業建立一致且可長期成長的數位系統。" },
  "sol.web-platforms": { en: "Web Platforms", zh: "網站平台" },
  "sol.web-platforms.desc": { en: "Modern, scalable websites designed for performance and long-term growth.", zh: "為企業打造現代化、可擴展的網站平台，兼顧效能、使用體驗與長期成長需求。" },
  "sol.brand-identity": { en: "Brand Identity Systems", zh: "品牌識別系統" },
  "sol.brand-identity.desc": { en: "Strategic brand systems that create recognition and consistency across every touchpoint.", zh: "透過完整的品牌策略與設計系統，建立清晰辨識度，讓品牌在所有接觸點都保持一致與專業。" },
  "sol.ecommerce": { en: "Ecommerce Platforms", zh: "電商平台" },
  "sol.ecommerce.desc": { en: "Online stores built to maximize product presentation and drive conversion.", zh: "打造專為產品展示與銷售轉換設計的電商網站，提升商品呈現、購物體驗與整體轉換率。" },
  "sol.marketing": { en: "Marketing Collateral", zh: "行銷設計素材" },
  "sol.marketing.desc": { en: "Printed and digital marketing materials that extend brand identity into the real world.", zh: "從印刷到數位媒體，將品牌視覺延伸至各種行銷素材，確保品牌在所有曝光場景都保持一致。" },
  "sol.ai": { en: "AI Business Automation", zh: "AI 商業自動化" },
  "sol.ai.desc": { en: "Intelligent workflows and automation tools that improve operational efficiency.", zh: "運用 AI 與自動化流程，優化企業內部運作效率，減少重複工作並提升決策速度。" },
  "sol.conversion": { en: "Conversion Optimization", zh: "網站轉換優化" },
  "sol.conversion.desc": { en: "Data-informed strategies that improve website performance and lead generation.", zh: "透過數據分析與使用者行為研究，持續優化網站體驗，提升詢問數量與轉換率。" },

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
  "contact.title": { en: "Request a Quote", zh: "聯絡我們" },
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
