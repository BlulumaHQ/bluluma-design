import { Link } from "react-router-dom";
import HexPattern from "@/components/HexPattern";
import { useState } from "react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { getLatestByIndustry } from "@/lib/articles";
import { useLang } from "@/lib/i18n";
import {
  LayoutDashboard,
  Sparkles,
  PhoneCall,
  MapPin,
  ShieldCheck,
  Bot,
  Smartphone,
  Stethoscope,
} from "lucide-react";
import logo from "@/assets/bluluma-logo.svg";
import heroImg from "@/assets/dentist/hero.jpg";
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

/* ── Local minimal header for /dentist only ── */
const DentistHeader = ({ tt }: { tt: (en: string, zh: string) => string }) => {
  const [open, setOpen] = useState(false);
  const links = [
    { label: tt("Services", "服務"), to: "#solution" },
    { label: tt("Portfolio", "作品集"), to: "#portfolio" },
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
            {tt("for Healthcare", "醫療業專屬")}
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

const DentistFooter = ({ tt }: { tt: (en: string, zh: string) => string }) => (
  <footer className="section-dark border-t border-border">
    <div
      className="section-container py-12 flex flex-col md:flex-row justify-between items-center gap-4 text-sm"
      style={{ color: "hsl(220 10% 55%)" }}
    >
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
const Dentist = () => {
  const { lang } = useLang();
  const tt = (en: string, zh: string) => (lang === "zh" ? zh : en);
  const insights = getLatestByIndustry("Dentist", 3);

  useDocumentMeta({
    title: "Healthcare Website Design | Bluluma",
    description:
      "Healthcare website design for dental clinics, medical practices and patient-focused healthcare businesses.",
    canonicalPath: "/healthcare",
  });

  const problems = [
    {
      title: tt("Outdated Website Structure", "過時的網站結構"),
      desc: tt(
        "Many clinic websites are hard to navigate and don't clearly explain services, making it difficult for patients to take action.",
        "許多診所網站不易瀏覽，服務說明不清楚，讓患者難以採取行動。"
      ),
    },
    {
      title: tt("No Lead Capture System", "沒有客戶獲取系統"),
      desc: tt(
        "Patients visit but leave without booking because there's no clear call-to-action or easy contact method.",
        "患者訪問網站後直接離開，因為沒有清晰的行動引導或方便的聯絡方式。"
      ),
    },
    {
      title: tt("Front Desk Overload", "前台超載"),
      desc: tt(
        "Staff spend too much time answering repetitive questions instead of focusing on patients.",
        "員工花太多時間回答重複問題，無法專注於照顧患者。"
      ),
    },
  ];

  const solution = [
    { icon: LayoutDashboard, label: tt("High-conversion dental website", "高轉換率牙科網站") },
    { icon: Stethoscope, label: tt("Clear service pages (cleaning, implants, Invisalign, etc.)", "清晰的服務頁面（洗牙、植牙、隱適美等）") },
    { icon: Smartphone, label: tt("Mobile-friendly design", "行動裝置友善設計") },
    { icon: PhoneCall, label: tt("Click-to-call and booking request", "一鍵通話與預約功能") },
    { icon: MapPin, label: tt("Google Map + location clarity", "Google 地圖與位置清楚標示") },
    { icon: ShieldCheck, label: tt("Trust sections (reviews, certifications)", "信任區塊（評論、認證）") },
    { icon: Sparkles, label: tt("Basic branding setup if needed", "基本品牌設定（如有需要）") },
    { icon: Bot, label: tt("AI-ready structure for future automation", "預留 AI 自動化結構") },
  ];

  const { items: portfolio } = useRandomPortfolioByCategory(
    "dental-healthcare",
    6,
  );

  return (
    <div id="top" className="flex flex-col min-h-screen">
      <DentistHeader tt={tt} />

      <main className="flex-1">
        {/* HERO (dark) */}
        <section className="section-dark section-border">
          <div className="section-container py-16 md:py-24 grid lg:grid-cols-2 gap-12 items-center">
            <Reveal>
              <span className="text-xs uppercase tracking-widest text-primary font-semibold">
                {tt("Healthcare Website Design", "醫療網站設計")}
              </span>
              <h1 className="mt-4 text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                {tt(
                  "Healthcare Websites Built to Attract More Patients",
                  "為醫療業打造、吸引更多患者的網站"
                )}
              </h1>
              <p
                className="mt-6 text-lg leading-relaxed"
                style={{ color: "hsl(220 10% 70%)" }}
              >
                {tt(
                  "Designed for dental clinics, medical clinics, family practices, wellness providers, healthcare specialists and growing patient-focused businesses.",
                  "專為牙科診所、醫療診所、家庭醫師、健康服務提供者、醫療專科及成長中的患者導向業務所設計。"
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
                  href="#portfolio"
                  className="inline-block text-center px-8 py-4 text-base font-semibold rounded-lg border border-border hover:border-primary hover:text-primary transition-colors"
                >
                  {tt("Start Your Project", "開始你的專案")}
                </a>
              </div>
              <p className="mt-6 text-sm" style={{ color: "hsl(220 10% 60%)" }}>
                {tt(
                  "Website design, branding, and AI automation support for healthcare providers.",
                  "為醫療業提供網站設計、品牌打造與 AI 自動化支援。"
                )}
              </p>
            </Reveal>

            <Reveal delay={120}>
              <div className="rounded-xl overflow-hidden border border-border shadow-2xl shadow-primary/10">
                <img
                  src={heroImg}
                  alt="Modern bright healthcare clinic interior"
                  className="w-full h-auto block"
                  width={1600}
                  height={1024}
                />
              </div>
            </Reveal>
          </div>
        </section>

        {/* PROBLEM */}
        <section id="problem" className="isolate section-border bg-background relative overflow-hidden">
        <HexPattern variation={2} />
          <div className="section-container section-padding">
            <Reveal>
              <span className="text-xs uppercase tracking-widest text-primary font-semibold">
                {tt("The Problem", "問題")}
              </span>
              <h2 className="mt-3 text-3xl md:text-4xl font-bold max-w-3xl">
                {tt(
                  "Most Healthcare Websites Look Fine — But Don't Bring Patients",
                  "多數醫療網站看起來不錯 — 但帶不來患者"
                )}
              </h2>
            </Reveal>

            <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-6">
              {problems.map((p, i) => (
                <Reveal key={p.title} delay={i * 80}>
                  <div className="h-full p-8 border border-border rounded-lg bg-background hover:border-primary/40 hover:-translate-y-1 transition-all">
                    <div className="text-primary text-sm font-bold tracking-widest">
                      0{i + 1}
                    </div>
                    <h3 className="mt-3 text-xl font-bold">{p.title}</h3>
                    <p className="mt-3 text-muted-foreground leading-relaxed text-base">
                      {p.desc}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* SOLUTION */}
        <section id="solution" className="section-border bg-background">
          <div className="section-container section-padding">
            <Reveal>
              <span className="text-xs uppercase tracking-widest text-primary font-semibold">
                {tt("What We Build", "我們建構什麼")}
              </span>
              <h2 className="mt-3 text-3xl md:text-4xl font-bold max-w-2xl">
                {tt("What We Build for Healthcare Providers", "我們為醫療業建構的內容")}
              </h2>
              <p className="mt-4 text-muted-foreground max-w-2xl leading-relaxed">
                {tt(
                  "A clear, conversion-focused website system designed around how patients actually choose a healthcare provider.",
                  "圍繞患者實際如何選擇醫療提供者所設計的、清晰且以轉換為核心的網站系統。"
                )}
              </p>
            </Reveal>

            <div className="mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {solution.map((s, i) => {
                const Icon = s.icon;
                return (
                  <Reveal key={s.label} delay={i * 60}>
                    <div className="h-full p-6 border border-border rounded-lg bg-background hover:border-primary/40 hover:-translate-y-1 transition-all">
                      <div className="w-11 h-11 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                        <Icon className="w-5 h-5 text-primary" />
                      </div>
                      <p className="text-sm font-semibold leading-snug">
                        {s.label}
                      </p>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </section>

        {/* PORTFOLIO */}
        <section id="portfolio" className="section-border bg-background">
          <div className="section-container section-padding">
            <Reveal>
              <span className="text-xs uppercase tracking-widest text-primary font-semibold">
                {tt("Examples", "案例")}
              </span>
              <h2 className="mt-3 text-3xl md:text-4xl font-bold max-w-2xl">
                {tt("Healthcare Website Examples", "醫療網站案例")}
              </h2>
              <p className="mt-4 text-muted-foreground max-w-2xl leading-relaxed">
                {tt(
                  "Recent healthcare website projects — design direction, structure, and conversion approach.",
                  "近期醫療網站作品 — 設計方向、結構與轉換策略。"
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
                to="/portfolio/dental-healthcare"
                className="inline-flex items-center px-8 py-3.5 text-sm font-semibold rounded-lg border border-border hover:border-primary hover:text-primary transition-colors"
              >
                {tt("View All Healthcare Projects", "查看所有醫療作品")} →
              </Link>
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
                  {tt("Insights for Healthcare Providers", "醫療業洞察")}
                </h2>
              </Reveal>
              <Link
                to="/insights/dentist"
                className="text-sm font-semibold text-primary hover:underline"
              >
                {tt("View More Healthcare Insights →", "查看更多醫療洞察 →")}
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
                {tt("Ready to Improve Your Healthcare Website?", "準備好提升你的醫療網站了嗎？")}
              </h2>
              <p
                className="mt-5 max-w-2xl mx-auto text-lg leading-relaxed"
                style={{ color: "hsl(220 10% 65%)" }}
              >
                {tt(
                  "We help healthcare providers build better websites, improve online visibility, and prepare for AI-driven search and automation.",
                  "我們協助醫療業建立更好的網站、提升能見度，並為 AI 驅動的搜尋與自動化做好準備。"
                )}
              </p>
              <Link
                to="/proposal"
                className="mt-10 inline-block cta-solid px-10 py-4 text-base font-semibold rounded-lg"
              >
                {tt("Request a Proposal", "申請提案")}
              </Link>
            </Reveal>
          </div>
        </section>
      </main>

      <DentistFooter tt={tt} />
    </div>
  );
};

export default Dentist;