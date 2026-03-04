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
  "nav.agency": { en: "Agency", zh: "關於我們" },
  "nav.insights": { en: "Insights", zh: "Insights" },
  "nav.contact": { en: "Contact", zh: "聯絡我們" },

  // CTAs
  "cta.view-work": { en: "View Our Work", zh: "查看作品" },
  "cta.start-project": { en: "Start a Project", zh: "開始專案" },
  "cta.request-quote": { en: "Request a Quote", zh: "索取報價" },
  "cta.contact-us": { en: "Contact Us", zh: "聯絡我們" },
  "cta.learn-more": { en: "Learn More →", zh: "了解更多 →" },
  "cta.read-case-study": { en: "Read Case Study →", zh: "閱讀案例 →" },
  "cta.visit-site": { en: "Visit Site ↗", zh: "前往網站 ↗" },
  "cta.view-project": { en: "View Project →", zh: "查看專案 →" },

  // Form labels
  "form.name": { en: "Name", zh: "姓名" },
  "form.email": { en: "Email", zh: "Email" },
  "form.company": { en: "Company Name", zh: "公司名稱" },
  "form.current-url": { en: "Current URL (optional)", zh: "目前網站（選填）" },
  "form.project-type": { en: "Project Type", zh: "專案類型" },
  "form.message": { en: "Message", zh: "訊息內容" },
  "form.business": { en: "Business", zh: "公司名稱" },
  "form.select-type": { en: "Select type", zh: "選擇類型" },

  // Home hero
  "home.hero.h1": { en: "Design Systems for Modern Businesses", zh: "我們為企業打造品牌與網站系統" },
  "home.hero.sub": { en: "We design and build high-performance websites, brand platforms, and digital experiences that help businesses grow faster.", zh: "讓你的企業在數位世界中看起來更專業、更可信，也更容易被客戶找到。" },

  // Home selected work
  "home.work.title": { en: "Selected Work", zh: "精選作品" },
  "home.work.label": { en: "Live Sites", zh: "Live Sites" },
  "home.work.intro": { en: "", zh: "每一個專案都是為企業量身打造，從品牌識別到網站平台，再到行銷視覺設計，讓企業在市場中呈現一致且專業的形象。" },
  "home.work.note": { en: "", zh: "點擊作品可查看實際網站。" },

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
  "home.industries.title": { en: "Industries We Work With", zh: "產業經驗" },
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

  // Home quote section
  "home.quote.title": { en: "Request a Quote", zh: "索取報價" },
  "home.quote.text": { en: "", zh: "請簡單描述你的需求，我們會盡快回覆並提供下一步建議。" },

  // Case studies
  "home.casestudies.title": { en: "Case Studies", zh: "案例研究" },
  "home.casestudies.label": { en: "Behind the Work", zh: "Behind the Work" },

  // Work page
  "work.title": { en: "Our Work", zh: "作品" },
  "work.intro": { en: "A selection of live websites, brand systems, and digital platforms we've designed and built.", zh: "以下為部分作品展示。點擊可直接開啟實際網站（新分頁）。" },

  // Case studies listing
  "casestudies.title": { en: "Case Studies", zh: "案例研究" },
  "casestudies.intro": { en: "In-depth looks at how we solve design and digital challenges for our clients.", zh: "案例研究會更深入地說明背景、策略與設計決策，讓你理解我們如何把成果做出來。" },

  // Case study detail CTA
  "casestudy.cta.title": { en: "Start Your Project", zh: "準備開始你的專案？" },
  "casestudy.cta.text": { en: "Ready to build something similar? Let's talk about your goals.", zh: "如果你正在考慮品牌更新或網站升級，歡迎告訴我們你的目標，我們會提供清楚的建議與下一步方向。" },
  "casestudy.back": { en: "← Case Studies", zh: "← 案例研究" },
  "casestudy.overview": { en: "Project Overview", zh: "專案概述" },
  "casestudy.challenge": { en: "The Challenge", zh: "挑戰" },
  "casestudy.approach": { en: "The Approach", zh: "方法" },
  "casestudy.deliverables": { en: "Deliverables", zh: "交付項目" },
  "casestudy.results": { en: "Results", zh: "成果" },
  "casestudy.gallery": { en: "Gallery", zh: "作品集" },
  "casestudy.meta.client": { en: "Client", zh: "客戶" },
  "casestudy.meta.industry": { en: "Industry", zh: "產業" },
  "casestudy.meta.services": { en: "Services", zh: "服務" },

  // Industries
  "industries.title": { en: "Industries We Work With", zh: "產業" },
  "industries.intro": { en: "We build digital platforms for businesses across a range of industries.", zh: "我們與不同產業合作，協助企業建立專業可信的數位形象與網站架構。" },
  "industries.back": { en: "← Industries", zh: "← 產業" },
  "industries.overview": { en: "Overview", zh: "概述" },
  "industries.what-we-build": { en: "What We Typically Build", zh: "我們通常建立的項目" },
  "industries.featured": { en: "Featured Projects", zh: "精選專案" },

  // Solutions
  "solutions.title": { en: "Solutions", zh: "解決方案" },
  "solutions.intro": { en: "We offer a focused set of services designed to build and grow your digital presence.", zh: "我們提供品牌與網站相關的完整設計服務，協助企業建立一致且可長期成長的數位系統。" },

  // Agency
  "agency.title": { en: "About Bluluma", zh: "關於我們" },
  "agency.p1": { en: "Bluluma Design is a Vancouver-based digital design studio focused on building modern websites, brand systems, and digital platforms for growing businesses.", zh: "Bluluma Design 是位於 Vancouver 的數位設計工作室，專注於品牌識別、網站平台與數位設計系統。" },
  "agency.p2": { en: "Our work combines design thinking, technology, and strategy to create digital experiences that support long-term growth. We focus on clarity, structure, and performance — building systems that work as hard as the businesses they represent.", zh: "我們以清晰的資訊架構、嚴謹的視覺系統與高效率的製作流程，協助企業建立可信且可延伸的品牌與網站。" },
  "agency.p3": { en: "We work with businesses across healthcare, real estate, ecommerce, professional services, and more. Every project starts with understanding the business, its audience, and its goals.", zh: "" },
  "agency.work-with-us": { en: "Work With Us", zh: "與我們合作" },
  "agency.work-with-us-sub": { en: "Tell us about your next project.", zh: "告訴我們你的下一個專案。" },

  // Contact
  "contact.title": { en: "Request a Quote", zh: "聯絡我們" },
  "contact.intro": { en: "Tell us about your business and the digital platform you want to build.", zh: "歡迎留下你的需求與目標，我們會盡快回覆。" },

  // Footer
  "footer.desc": { en: "Bluluma Design is a Vancouver-based digital studio specializing in websites, brand systems, and digital platforms.", zh: "Bluluma Design｜品牌識別・網站設計・數位平台・行銷設計" },
  "footer.navigation": { en: "Navigation", zh: "導覽" },
  "footer.contact": { en: "Contact", zh: "聯絡" },

  // Industry names
  "ind.healthcare-dental": { en: "Healthcare & Dental", zh: "醫療與牙科" },
  "ind.professional-services": { en: "Professional Services", zh: "專業服務" },
  "ind.real-estate-construction": { en: "Real Estate & Construction", zh: "房地產與建設" },
  "ind.lifestyle-businesses": { en: "Lifestyle Businesses", zh: "生活品牌" },
  "ind.creative-luxury-brands": { en: "Creative & Luxury Brands", zh: "創意與精品品牌" },
  "ind.home-services": { en: "Home Services", zh: "居家服務" },
  "ind.retail-ecommerce": { en: "Retail & Ecommerce", zh: "零售與電商" },
  "ind.education-training": { en: "Education & Training", zh: "教育與培訓" },

  // Misc
  "form.submit-thanks": { en: "Thank you for your message. We'll be in touch.", zh: "感謝您的訊息，我們會盡快回覆。" },
  "prev": { en: "← Previous", zh: "← 上一頁" },
  "next": { en: "Next →", zh: "下一頁 →" },
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
