import { Link } from "react-router-dom";
import { useState } from "react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { getLatestByIndustry } from "@/lib/articles";
import { useLang } from "@/lib/i18n";
import { LayoutDashboard, Building2, FileText } from "lucide-react";
import logo from "@/assets/bluluma-logo.svg";
import heroImg from "@/assets/realtor/hero-mockup.jpg";
import {
  useRandomPortfolioByCategory,
} from "@/lib/cms";
import CmsPortfolioCard from "@/components/CmsPortfolioCard";
import { useDocumentMeta } from "@/lib/useDocumentMeta";

const Reveal = ({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) => {
  const ref = useScrollReveal({ delay });
  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
};

const formatDate = (iso: string, lang: "en" | "zh") =>
  new Date(iso).toLocaleDateString(lang === "zh" ? "zh-TW" : "en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

/* Minimal text-only language switcher used in industry landing headers */
const MiniLangSwitcher = () => {
  const { lang, setLang } = useLang();
  const base = "text-xs font-medium tracking-wide transition-colors";
  return (
    <div className="flex items-center gap-1.5">
      <button
        onClick={() => setLang("en")}
        className={`${base} ${lang === "en" ? "text-foreground" : "text-muted-foreground hover:text-foreground"}`}
        aria-label="Switch to English"
      >
        EN
      </button>
      <span className="text-muted-foreground/40 text-xs">/</span>
      <button
        onClick={() => setLang("zh")}
        className={`${base} ${lang === "zh" ? "text-foreground" : "text-muted-foreground hover:text-foreground"}`}
        aria-label="切換到中文"
      >
        中文
      </button>
    </div>
  );
};

/* ── Local minimal header for /realtor only ── */
const RealtorHeader = ({ tt }: { tt: (en: string, zh: string) => string }) => {
  const [open, setOpen] = useState(false);
  const links = [
    { label: tt("Services", "服務"), to: "#what-we-do" },
    { label: tt("Portfolio", "作品集"), to: "#portfolio" },
    { label: tt("Pricing", "價格"), to: "#pricing" },
    { label: tt("Insights", "洞察"), to: "#insights" },
    { label: tt("Contact", "聯絡"), to: "#cta" },
  ];
  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-md border-b border-border">
      <div className="section-container flex items-center justify-between h-20">
        <div className="flex items-center gap-8">
          <a href="https://bluluma.com" className="flex-shrink-0 flex items-center gap-3">
            <img src={logo} alt="Bluluma logo" className="h-10 w-auto" />
            <span className="text-sm font-semibold text-muted-foreground hidden sm:inline">
            {tt("for Real Estate", "房地產專屬")}
            </span>
          </a>
          <nav className="hidden lg:flex items-center gap-6">
            {links.map((l) => (
              <a
                key={l.label}
                href={l.to}
                className="text-[14px] font-semibold text-foreground hover:text-primary transition-colors"
              >
                {l.label}
              </a>
            ))}
          </nav>
        </div>

        <div className="hidden lg:flex items-center gap-5">
          <a
            href="/proposal"
            className="cta-solid px-5 py-2.5 text-sm font-semibold rounded-lg"
          >
            {tt("Request a Proposal", "申請提案")}
          </a>
          <MiniLangSwitcher />
          <Link
            to="/"
            className="text-xs font-medium text-muted-foreground hover:text-primary transition-colors whitespace-nowrap"
          >
            {tt("Back to Bluluma", "返回 Bluluma")} →
          </Link>
        </div>

        <div className="lg:hidden flex items-center gap-4">
          <MiniLangSwitcher />
          <button
            className="flex flex-col gap-1.5 p-2"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            <span className={`block w-6 h-px bg-foreground transition-transform ${open ? "rotate-45 translate-y-[3.5px]" : ""}`} />
            <span className={`block w-6 h-px bg-foreground transition-opacity ${open ? "opacity-0" : ""}`} />
            <span className={`block w-6 h-px bg-foreground transition-transform ${open ? "-rotate-45 -translate-y-[3.5px]" : ""}`} />
          </button>
        </div>
      </div>
      {open && (
        <nav className="lg:hidden border-t border-border bg-background">
          <div className="section-container py-6 flex flex-col gap-4">
            {links.map((l) => (
              <a
                key={l.label}
                href={l.to}
                onClick={() => setOpen(false)}
                className="text-base font-semibold text-foreground"
              >
                {l.label}
              </a>
            ))}
            <a
              href="/proposal"
              onClick={() => setOpen(false)}
              className="w-full text-center cta-solid px-6 py-3.5 text-base font-semibold rounded-lg"
            >
              {tt("Request a Proposal", "申請提案")}
            </a>
            <Link to="/" className="text-xs text-muted-foreground">
              {tt("Back to Bluluma", "返回 Bluluma")} →
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
};

const RealtorFooter = ({ tt }: { tt: (en: string, zh: string) => string }) => (
  <footer className="section-dark border-t border-border">
    <div className="section-container py-12 flex flex-col md:flex-row justify-between items-center gap-4 text-sm" style={{ color: "hsl(220 10% 55%)" }}>
      <span>{tt("© 2026 Bluluma. All rights reserved.", "© 2026 Bluluma. 版權所有。")}</span>
      <span>
        {tt("Web Design by ", "網站設計：")}
        <Link to="/" className="hover:text-primary transition-colors">
          Bluluma
        </Link>
      </span>
    </div>
  </footer>
);

/* ── Page ── */
const Realtor = () => {
  const { lang } = useLang();
  const tt = (en: string, zh: string) => (lang === "zh" ? zh : en);
  const insights = getLatestByIndustry("Realtor", 3);

  useDocumentMeta({
    title: "Real Estate Website Design | Bluluma",
    description:
      "Real estate websites for Realtors, teams, developers and pre-sale projects.",
    canonicalPath: "/real-estate",
  });

  const services = [
    {
      icon: LayoutDashboard,
      title: tt("Conversion Website Design", "高轉換率網站設計"),
      desc: tt(
        "A modern website structure designed to guide visitors toward booking, inquiries, and property interest.",
        "現代化網站架構，引導訪客進行預約、諮詢與房源探索。"
      ),
    },
    {
      icon: Building2,
      title: tt("Feature Listing Pages", "精選房源頁面"),
      desc: tt(
        "Highlight your best properties with custom-designed listing pages, stronger descriptions, image galleries, and clear calls-to-action.",
        "以客製化房源頁面突顯你最好的物件，包含更有力的文案、圖庫與清晰的行動引導。"
      ),
      highlight: true,
    },
    {
      icon: FileText,
      title: tt("Listing Content Support", "房源內容維護"),
      desc: tt(
        "We can help manually manage and update featured listings on your website, so your best properties stay professionally presented.",
        "我們可協助手動管理並更新精選房源，確保你的物件持續以專業形象呈現。"
      ),
    },
  ];

  const { items: portfolio } = useRandomPortfolioByCategory("realtor", 6);

  const steps = [
    { n: "01", title: tt("Submit", "提交需求"), desc: tt("Tell us about your business and current website.", "告訴我們你的業務與目前的網站狀況。") },
    { n: "02", title: tt("Proposal & Direction", "提案與方向"), desc: tt("We send a tailored proposal with scope, timeline, and recommended direction.", "我們提供量身訂做的提案，包括範疇、時程與建議方向。") },
    { n: "03", title: tt("Choose Your Direction", "選擇方向"), desc: tt("Pick the version that fits your brand and goals.", "選擇最符合你品牌與目標的方案。") },
    { n: "04", title: tt("Launch", "上線"), desc: tt("We finalize, integrate listings, and launch.", "我們完成最後修飾、整合房源並正式上線。") },
  ];

  const pricing = [
    {
      name: tt("Basic Realtor Website", "基礎房仲網站"),
      price: "$499",
      desc: tt("A clean, mobile-friendly Realtor website ready to launch fast.", "簡潔、行動裝置友善的房仲網站，可快速上線。"),
      features: [
        tt("Up to 5 pages", "最多 5 頁"),
        tt("Mobile-friendly design", "行動裝置友善設計"),
        tt("Contact form", "聯絡表單"),
        tt("Basic SEO structure", "基本 SEO 架構"),
        tt("Featured listing section", "精選房源區塊"),
        tt("Free hosting available", "提供免費代管選項"),
      ],
      cta: tt("Start with Basic", "選擇基礎方案"),
    },
    {
      name: tt("Business Realtor Website", "商業房仲網站"),
      price: "$875",
      desc: tt("A stronger conversion-focused website built for active Realtors.", "為活躍房仲打造、更聚焦轉換的網站。"),
      features: [
        tt("Up to 8 pages", "最多 8 頁"),
        tt("Stronger conversion layout", "更強的轉換版面"),
        tt("Feature listing pages", "精選房源頁面"),
        tt("Lead-focused CTA structure", "以客戶轉換為核心的 CTA 結構"),
        tt("Google Map / service area", "Google 地圖／服務區域"),
        tt("Basic SEO setup", "基本 SEO 設定"),
        tt("Free hosting available", "提供免費代管選項"),
      ],
      cta: tt("Start with Business", "選擇商業方案"),
      featured: true,
    },
    {
      name: tt("Premium Realtor Website", "頂級房仲網站"),
      price: "$1,499+",
      desc: tt("A fully custom system with advanced layouts and ongoing listing support.", "完全客製化系統，含進階版面與持續性房源維護。"),
      features: [
        tt("Up to 12 pages", "最多 12 頁"),
        tt("Advanced custom layout", "進階客製化版面"),
        tt("Feature listing system", "精選房源系統"),
        tt("Listing content support", "房源內容維護"),
        tt("Branding refinement", "品牌優化"),
        tt("SEO-friendly page structure", "SEO 友善頁面結構"),
        tt("Optional MLS / IDX integration as add-on", "可加購 MLS / IDX 整合"),
      ],
      cta: tt("Start with Premium", "選擇頂級方案"),
    },
  ];

  return (
    <div id="top" className="flex flex-col min-h-screen">
      <RealtorHeader tt={tt} />

      <main className="flex-1">
        {/* HERO (dark) */}
        <section className="section-dark section-border">
          <div className="section-container py-16 md:py-24 grid lg:grid-cols-2 gap-12 items-center">
            <Reveal>
              <span className="text-xs uppercase tracking-widest text-primary font-semibold">
                {tt("Real Estate Website Design", "房地產網站設計")}
              </span>
              <h1 className="mt-4 text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                {tt("Real Estate Websites Built to Attract More Buyers and Sellers", "為房仲打造、吸引更多買賣方的房地產網站")}
              </h1>
              <p className="mt-6 text-lg leading-relaxed" style={{ color: "hsl(220 10% 70%)" }}>
                {tt(
                  "Built for Realtors, real estate teams, developers, pre-sale projects and property management companies — stronger branding, better listing presentation, and clearer lead flow.",
                  "為房仲、房地產團隊、開發商、預售案與物業管理公司打造 — 更強的品牌、更佳的房源呈現與更清晰的客戶流程。"
                )}
              </p>
              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <a
                  href="/proposal"
                  className="cta-solid inline-block text-center px-8 py-4 text-base font-semibold rounded-lg"
                >
                  {tt("Request a Proposal", "申請提案")}
                </a>
                <a
                  href="/proposal"
                  className="inline-block text-center px-8 py-4 text-base font-semibold rounded-lg border border-border hover:border-primary hover:text-primary transition-colors"
                >
                  {tt("Start Your Project", "開始你的專案")}
                </a>
              </div>
              <p className="mt-6 text-sm" style={{ color: "hsl(220 10% 60%)" }}>
                {tt(
                  "Website design, branding, listing presentation, and ongoing content support for real estate professionals.",
                  "為房地產專業人士提供網站設計、品牌打造、房源呈現與持續內容支援。"
                )}
              </p>
            </Reveal>

            <Reveal delay={120}>
              <div className="rounded-xl overflow-hidden border border-border shadow-2xl shadow-primary/10">
                <img
                  src={heroImg}
                  alt="Premium Realtor website displayed on laptop and mobile"
                  className="w-full h-auto block"
                  width={1600}
                  height={1024}
                />
              </div>
            </Reveal>
          </div>
        </section>

        {/* WHAT WE DO */}
        <section id="what-we-do" className="section-border bg-background">
          <div className="section-container section-padding">
            <Reveal>
              <span className="text-xs uppercase tracking-widest text-primary font-semibold">
                {tt("What We Do", "服務內容")}
              </span>
              <h2 className="mt-3 text-3xl md:text-4xl font-bold max-w-2xl">
                {tt("Three pieces. One conversion system.", "三大模組。一套轉換系統。")}
              </h2>
            </Reveal>

            <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-6">
              {services.map((s, i) => {
                const Icon = s.icon;
                return (
                  <Reveal key={s.title} delay={i * 80}>
                    <div
                      className={`h-full p-8 border rounded-lg transition-all hover:-translate-y-1 ${
                        s.highlight
                          ? "border-primary bg-primary/5 shadow-lg shadow-primary/10"
                          : "border-border bg-background hover:border-primary/40"
                      }`}
                    >
                      <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-5">
                        <Icon className="w-6 h-6 text-primary" />
                      </div>
                      {s.highlight && (
                        <span className="inline-block text-[10px] uppercase tracking-widest font-semibold text-primary mb-2">
                          {tt("Main Focus", "主要重點")}
                        </span>
                      )}
                      <h3 className="text-xl font-bold mb-3">{s.title}</h3>
                      <p className="text-muted-foreground leading-relaxed text-base">
                        {s.desc}
                      </p>
                    </div>
                  </Reveal>
                );
              })}
            </div>

            <p className="mt-10 text-sm text-muted-foreground max-w-2xl">
              {tt(
                "MLS / IDX integration can be added later as an optional advanced setup.",
                "MLS / IDX 整合可作為進階加購項目之後再加入。"
              )}
            </p>
          </div>
        </section>

        {/* PORTFOLIO */}
        <section id="portfolio" className="section-border bg-background">
          <div className="section-container section-padding">
            <Reveal>
              <span className="text-xs uppercase tracking-widest text-primary font-semibold">
                {tt("Portfolio", "作品集")}
              </span>
              <h2 className="mt-3 text-3xl md:text-4xl font-bold max-w-2xl">
                {tt("Selected Real Estate Projects", "精選房地產作品")}
              </h2>
              <p className="mt-4 text-muted-foreground max-w-2xl leading-relaxed">
                {tt(
                  "A look at recent and concept Realtor websites — branding, structure, and conversion design.",
                  "近期與概念性的房仲網站 — 品牌、架構與轉換設計。"
                )}
              </p>
            </Reveal>

            <div className="mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {portfolio.map((p, i) => (
                <Reveal key={p.id} delay={i * 60} className="h-full">
                  <CmsPortfolioCard item={p} />
                </Reveal>
              ))}
            </div>

            <div className="mt-12 flex justify-center">
              <Link
                to="/portfolio/realtor"
                className="inline-flex items-center px-8 py-3.5 text-sm font-semibold rounded-lg border border-border hover:border-primary hover:text-primary transition-colors"
              >
                {tt("View All Real Estate Projects", "查看所有房地產作品")} →
              </Link>
            </div>
          </div>
        </section>

        {/* PROCESS */}
        <section className="section-border bg-background">
          <div className="section-container section-padding">
            <Reveal>
              <span className="text-xs uppercase tracking-widest text-primary font-semibold">
                {tt("Process", "流程")}
              </span>
              <h2 className="mt-3 text-3xl md:text-4xl font-bold max-w-2xl">
                {tt("Submit → Proposal → Build → Launch.", "提交 → 提案 → 製作 → 上線。")}
              </h2>
            </Reveal>
            <div className="mt-14 grid grid-cols-1 md:grid-cols-4 gap-6">
              {steps.map((s, i) => (
                <Reveal key={s.n} delay={i * 80}>
                  <div className="p-6 border border-border rounded-lg h-full bg-background">
                    <div className="text-primary text-sm font-bold tracking-widest">
                      {s.n}
                    </div>
                    <h3 className="mt-3 text-lg font-bold">{s.title}</h3>
                    <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                      {s.desc}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* PRICING */}
        <section id="pricing" className="section-border bg-background">
          <div className="section-container section-padding">
            <Reveal>
              <span className="text-xs uppercase tracking-widest text-primary font-semibold">
                {tt("Pricing", "價格")}
              </span>
              <h2 className="mt-3 text-3xl md:text-4xl font-bold max-w-2xl">
                {tt("Simple, accessible Realtor pricing.", "簡單、平易近人的房仲方案價格。")}
              </h2>
            </Reveal>
            <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-6">
              {pricing.map((p, i) => (
                <Reveal key={p.name} delay={i * 100}>
                  <div
                    className={`p-8 border rounded-lg h-full flex flex-col ${
                      p.featured
                        ? "border-primary bg-primary/5 shadow-lg shadow-primary/10"
                        : "border-border bg-background"
                    }`}
                  >
                    <div className="text-xs uppercase tracking-widest text-primary font-semibold">
                      {p.name}
                    </div>
                    <div className="mt-3 text-4xl font-bold">{p.price}</div>
                    <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                      {p.desc}
                    </p>
                    <ul className="mt-6 space-y-2.5 text-sm text-muted-foreground flex-1">
                      {p.features.map((f) => (
                        <li key={f} className="flex gap-2">
                          <span className="text-primary">•</span>
                          <span>{f}</span>
                        </li>
                      ))}
                    </ul>
                    <a
                      href="/proposal"
                      className={`mt-8 inline-block text-center px-6 py-3.5 text-sm font-semibold rounded-lg ${
                        p.featured
                          ? "cta-solid"
                          : "border border-border hover:border-primary hover:text-primary transition-colors"
                      }`}
                    >
                      {p.cta}
                    </a>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* INSIGHTS */}
        <section id="insights" className="section-border bg-background">
          <div className="section-container section-padding">
            <div className="flex items-end justify-between flex-wrap gap-4 mb-12">
              <Reveal>
                <span className="text-xs uppercase tracking-widest text-primary font-semibold">
                  {tt("Insights", "洞察")}
                </span>
                <h2 className="mt-3 text-3xl md:text-4xl font-bold">
                  {tt("Insights for Realtors", "房仲洞察")}
                </h2>
              </Reveal>
              <Link
                to="/insights/realtor"
                className="text-sm font-semibold text-primary hover:underline"
              >
                {tt("View More Realtor Insights →", "查看更多房仲洞察 →")}
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {insights.map((a, i) => (
                <Reveal key={a.slug} delay={i * 80}>
                  <Link
                    to={`/insights/${a.slug}`}
                    className="block p-6 md:p-8 border border-border rounded-lg h-full bg-background hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10 transition-all hover:-translate-y-1"
                  >
                    <div className="text-[10px] uppercase tracking-widest text-muted-foreground font-medium mb-3">
                      {formatDate(a.date, lang)}
                    </div>
                    <h3 className="text-lg font-bold mb-3">{a.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {a.excerpt}
                    </p>
                    <span className="mt-5 inline-block text-xs text-primary font-semibold">
                      {tt("Read More →", "閱讀更多 →")}
                    </span>
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* CTA (dark) */}
        <section id="cta" className="section-dark">
          <div className="section-container py-20 md:py-28 text-center">
            <Reveal>
              <h2 className="text-3xl md:text-5xl font-bold max-w-3xl mx-auto leading-tight">
                {tt("Ready to grow your real estate business?", "準備好拓展你的房地產業務了嗎？")}
              </h2>
              <p
                className="mt-5 max-w-xl mx-auto text-lg leading-relaxed"
                style={{ color: "hsl(220 10% 65%)" }}
              >
                {tt("Request a tailored proposal for your real estate website and brand.", "為你的房地產網站與品牌申請一份量身訂做的提案。")}
              </p>
              <Link
                to="/proposal"
                className="mt-10 inline-block cta-solid px-10 py-4 text-base font-semibold rounded-lg"
              >
                {tt("Request a Proposal for My Real Estate Business", "為我的房地產業務申請提案")}
              </Link>
            </Reveal>
          </div>
        </section>
      </main>

      <RealtorFooter tt={tt} />
    </div>
  );
};

export default Realtor;