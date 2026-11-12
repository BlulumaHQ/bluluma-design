import { Button } from "@/components/ui/button";
import { useState, useEffect, FormEvent } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { Check, X } from "lucide-react";
import { useLang } from "@/lib/i18n";

const Reveal = ({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) => {
  const ref = useScrollReveal<HTMLDivElement>({ delay });
  return <div ref={ref} className={className}>{children}</div>;
};

const inputClass =
  "w-full border border-border px-4 py-3 text-sm bg-background text-foreground rounded-lg focus:outline-none focus:border-primary transition-colors placeholder:text-muted-foreground";

const NEEDS = [
  "Website Design",
  "Branding / Logo",
  "Marketing / Social Media",
  "AI Automation",
  "Full Package",
];

const NEEDS_ZH: Record<string, string> = {
  "Website Design": "網站設計",
  "Branding / Logo": "品牌 / Logo",
  "Marketing / Social Media": "行銷 / 社群媒體",
  "AI Automation": "AI 自動化",
  "Full Package": "全方位方案",
};

const Start = () => {
  const { lang } = useLang();
  const zh = lang === "zh";
  const tt = (en: string, z: string) => (zh ? z : en);
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [needs, setNeeds] = useState<string[]>([]);
  const [formLoadedAt] = useState(() => String(Date.now()));

  useEffect(() => {
    const prevTitle = document.title;
    document.title = zh ? "開始你的專案｜Bluluma" : "Start Your Project | Bluluma Design";
    const meta = document.querySelector('meta[name="description"]');
    const prevDesc = meta?.getAttribute("content") ?? null;
    if (meta) {
      meta.setAttribute(
        "content",
        zh
          ? "申請網站設計、品牌、行銷與自動化服務提案。Bluluma 協助企業建立更強的線上形象。"
          : "Request a proposal for website design, branding, marketing, and automation services. Bluluma Design helps businesses build a stronger online presence."
      );
    }
    return () => {
      document.title = prevTitle;
      if (meta && prevDesc !== null) meta.setAttribute("content", prevDesc);
    };
  }, [zh]);

  const toggleNeed = (n: string) =>
    setNeeds((prev) => (prev.includes(n) ? prev.filter((x) => x !== n) : [...prev, n]));

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      const fd = new FormData(e.currentTarget);
      fd.set("needs", needs.join(", "));
      const res = await fetch("/.netlify/functions/contact", {
        method: "POST",
        body: fd,
        headers: { Accept: "application/json" },
      });
      if (res.ok) {
        navigate("/thank-you");
      } else {
        setError(tt("Something went wrong. Please try again.", "發生錯誤，請再試一次。"));
        setSubmitting(false);
      }
    } catch {
      setError(tt("Network error. Please try again.", "網路連線錯誤，請再試一次。"));
      setSubmitting(false);
    }
  };

  const scrollToForm = () => {
    const el = document.getElementById("proposal-form");
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="site-page site-page-start">
      {/* Hero (Dark) */}
      <section className="site-page-hero section-dark section-border relative overflow-hidden">
        <div className="section-container py-24 md:py-36 relative z-10">
          <Reveal>
            <p className="text-label mb-4">{tt("Start Your Project", "開始你的專案")}</p>
            <h1 className="text-4xl md:text-6xl font-extrabold leading-tight max-w-3xl">
              {tt("Tell Us About Your Project", "告訴我們你的專案")}
            </h1>
            <p className="mt-6 text-lg max-w-2xl leading-relaxed">
              {tt("Share a few details about your business and what you need. We'll review your request and prepare a tailored proposal for you.", "簡單分享你的事業和需求，我們會審閱你的資料，並為你準備專屬提案。")}
            </p>
          </Reveal>
        </div>
      </section>

      {/* Intro */}
      <section>
        <div className="section-container pt-20 md:pt-24 pb-4">
          <Reveal>
            <div className="max-w-3xl">
              <p className="text-base md:text-lg leading-relaxed text-muted-foreground">
                {tt("We work with businesses that want a stronger online presence — from branding and website design to marketing and automation.", "我們的合作對象，是想建立更強線上形象的企業：從品牌、網站設計到行銷與自動化。")}
              </p>
              <p className="mt-4 text-base md:text-lg leading-relaxed text-muted-foreground">
                {tt("This form helps us understand your needs so we can recommend the right approach.", "這份表單能幫助我們了解你的需求，以便建議最合適的做法。")}
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Form */}
      <section id="proposal-form" className="scroll-mt-24">
        <div className="section-container py-16 md:py-20">
          <Reveal>
            <div className="max-w-3xl">
              <p className="text-label mb-3">{tt("Project Intake", "專案資料")}</p>
              <h2 className="text-2xl md:text-4xl font-extrabold mb-10">{tt("Project Details", "專案細節")}</h2>

              <form onSubmit={handleSubmit} className="space-y-8">
                <input type="hidden" name="source" value="bluluma start project" />
                <input type="hidden" name="_t" value={formLoadedAt} />
                <div aria-hidden="true" style={{ position: "absolute", left: "-10000px", top: "auto", width: 1, height: 1, overflow: "hidden" }}>
                  <label htmlFor="website_hp">{tt("Leave this field empty", "請勿填寫此欄位")}</label>
                  <input type="text" id="website_hp" name="website_hp" tabIndex={-1} autoComplete="off" defaultValue="" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="name" className="text-sm font-medium block mb-2">{tt("Full Name *", "姓名 *")}</label>
                    <input id="name" name="name" type="text" required maxLength={100} className={inputClass} />
                  </div>
                  <div>
                    <label htmlFor="email" className="text-sm font-medium block mb-2">{tt("Email Address *", "電子郵件 *")}</label>
                    <input id="email" name="email" type="email" required maxLength={255} className={inputClass} />
                  </div>
                  <div>
                    <label htmlFor="business" className="text-sm font-medium block mb-2">{tt("Business Name", "公司名稱")}</label>
                    <input id="business" name="business" type="text" maxLength={150} className={inputClass} />
                  </div>
                  <div>
                    <label htmlFor="website" className="text-sm font-medium block mb-2">{tt("Website (optional)", "網站（選填）")}</label>
                    <input id="website" name="website" type="text" maxLength={255} placeholder="https://" className={inputClass} />
                  </div>
                  <div>
                    <label htmlFor="industry" className="text-sm font-medium block mb-2">{tt("Industry", "產業")}</label>
                    <select id="industry" name="industry" className={inputClass} defaultValue="">
                      <option value="" disabled>{tt("Select industry", "選擇產業")}</option>
                      <option value="Dental Clinic">{tt("Dental Clinic", "牙醫診所")}</option>
                      <option value="Real Estate">{tt("Real Estate", "房地產")}</option>
                      <option value="Retail / E-commerce">{tt("Retail / E-commerce", "零售 / 電商")}</option>
                      <option value="Professional Services">{tt("Professional Services", "專業服務")}</option>
                      <option value="Other">{tt("Other", "其他")}</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="budget" className="text-sm font-medium block mb-2">{tt("Budget Range *", "預算範圍 *")}</label>
                    <select id="budget" name="budget" required className={inputClass} defaultValue="">
                      <option value="" disabled>{tt("Select budget range", "選擇預算範圍")}</option>
                      <option value="Under $1,000">{tt("Under $1,000", "$1,000 以下")}</option>
                      <option value="$1,000 – $3,000">$1,000 – $3,000</option>
                      <option value="$3,000 – $8,000">$3,000 – $8,000</option>
                      <option value="$8,000+">$8,000+</option>
                    </select>
                  </div>
                  <div className="md:col-span-2">
                    <label htmlFor="timeline" className="text-sm font-medium block mb-2">{tt("Timeline *", "時程 *")}</label>
                    <select id="timeline" name="timeline" required className={inputClass} defaultValue="">
                      <option value="" disabled>{tt("Select timeline", "選擇時程")}</option>
                      <option value="ASAP">{tt("ASAP", "越快越好")}</option>
                      <option value="Within 2–4 weeks">{tt("Within 2–4 weeks", "2–4 週內")}</option>
                      <option value="Within 1–2 months">{tt("Within 1–2 months", "1–2 個月內")}</option>
                      <option value="Flexible">{tt("Flexible", "時間彈性")}</option>
                    </select>
                  </div>
                </div>

                <div>
                  <span className="text-sm font-medium block mb-3">{tt("What do you need?", "你需要什麼服務？")}</span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {NEEDS.map((n) => {
                      const active = needs.includes(n);
                      return (
                        <Button variant="ghost"
                          type="button"
                          key={n}
                          onClick={() => toggleNeed(n)}
                          className={`flex items-center justify-between text-left px-4 py-3 rounded-lg border text-sm transition-all ${
                            active
                              ? "border-primary bg-primary/5 text-foreground"
                              : "border-border bg-background text-foreground hover:border-primary/50"
                          }`}
                          aria-pressed={active}
                        >
                          <span className="font-medium">{zh ? NEEDS_ZH[n] ?? n : n}</span>
                          <span
                            className={`flex items-center justify-center w-5 h-5 rounded border ${
                              active ? "bg-primary border-primary text-primary-foreground" : "border-border"
                            }`}
                          >
                            {active && <Check size={12} strokeWidth={3} />}
                          </span>
                        </Button>
                      );
                    })}
                  </div>
                </div>

                <div>
                  <label htmlFor="details" className="text-sm font-medium block mb-2">{tt("Project Details *", "專案說明 *")}</label>
                  <textarea
                    id="details"
                    name="details"
                    rows={6}
                    required
                    maxLength={2000}
                    className={`${inputClass} resize-none`}
                    placeholder={tt("Tell us about your business, what you currently have, and what you're looking to improve.", "請描述你的事業、目前現況，以及想改善的地方。")}
                  />
                </div>

                {error && <p className="text-sm text-destructive">{error}</p>}

                <div className="pt-2">
                  <Button variant="ghost"
                    type="submit"
                    disabled={submitting}
                    className="inline-flex items-center px-8 py-4 site-button text-sm font-semibold rounded-lg disabled:opacity-50"
                  >
                    {submitting ? tt("Sending...", "傳送中…") : tt("Request a Proposal", "申請提案")}
                  </Button>
                  <p className="mt-4 text-xs text-muted-foreground">
                    {tt("Typical response within 1 business day.", "通常會在 1 個工作天內回覆。")}
                  </p>
                </div>
              </form>
            </div>
          </Reveal>
        </div>
      </section>

      {/* What Happens Next */}
      <section className="bg-secondary/40 border-t border-border">
        <div className="section-container section-padding">
          <Reveal>
            <p className="text-label mb-3">{tt("Process", "流程")}</p>
            <h2 className="text-2xl md:text-4xl font-extrabold mb-12 max-w-2xl">{tt("What Happens Next", "接下來的流程")}</h2>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {[
              { n: "01", title: tt("Review", "審閱需求"), desc: tt("We review your submission and understand your business needs.", "我們會審閱你送出的資料，了解你的事業需求。") },
              { n: "02", title: tt("Proposal", "提供提案"), desc: tt("We prepare a clear proposal with scope, timeline, and pricing.", "我們會準備一份清楚的提案，包含範圍、時程與價格。") },
              { n: "03", title: tt("Project Start", "專案啟動"), desc: tt("Once approved, we begin your project with a structured process.", "確認後，我們會以有系統的流程開始你的專案。") },
            ].map((s, i) => (
              <Reveal key={s.n} delay={i * 100}>
                <div className="bg-background border border-border rounded-2xl p-8 h-full">
                  <span className="home-step-number">{s.n}</span>
                  <h3 className="mt-4 text-xl font-bold">{s.title}</h3>
                  <p className="mt-3 text-base text-muted-foreground leading-relaxed">{s.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Fit / Not Fit */}
      <section>
        <div className="section-container section-padding">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            <Reveal>
              <div className="border border-border rounded-2xl p-8 md:p-10 h-full">
                <p className="text-label mb-3">{tt("Best Fit", "適合對象")}</p>
                <h2 className="text-2xl md:text-3xl font-extrabold mb-8">{tt("Who This Is Best For", "最適合這些客戶")}</h2>
                <ul className="space-y-4">
                  {[
                    tt("Businesses that want a professional website", "想要專業網站的企業"),
                    tt("Companies looking to improve their branding", "想提升品牌形象的公司"),
                    tt("Clinics or agents who want more leads", "想獲得更多客戶的診所或房仲"),
                    tt("Owners who want a clear, structured approach", "希望有清楚、有系統流程的業主"),
                    tt("Clients who are ready to invest in their business", "準備好投資自己事業的客戶"),
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <span className="flex-shrink-0 mt-1 w-5 h-5 rounded-full bg-primary/10 text-primary flex items-center justify-center">
                        <Check size={12} strokeWidth={3} />
                      </span>
                      <span className="text-base leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>

            <Reveal delay={100}>
              <div className="border border-border rounded-2xl p-8 md:p-10 h-full bg-muted/30">
                <p className="text-label mb-3">{tt("Honest Note", "坦白說")}</p>
                <h2 className="text-2xl md:text-3xl font-extrabold mb-8">{tt("Not the Right Fit If", "如果是以下情況，可能不太適合")}</h2>
                <ul className="space-y-4">
                  {[
                    tt("You are only looking for the cheapest option", "你只想找最便宜的選擇"),
                    tt("You need instant same-day delivery", "你需要當天立即交件"),
                    tt("You are not sure what you want yet", "你還不確定自己想要什麼"),
                    tt("You are not ready to invest in your business", "你還沒準備好投資自己的事業"),
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <span className="flex-shrink-0 mt-1 w-5 h-5 rounded-full bg-muted text-muted-foreground flex items-center justify-center">
                        <X size={12} strokeWidth={3} />
                      </span>
                      <span className="text-base leading-relaxed text-muted-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="site-page-cta section-dark relative overflow-hidden">
        <div className="section-container py-20 md:py-28 relative z-10 text-center">
          <Reveal>
            <h2 className="text-3xl md:text-5xl font-extrabold max-w-3xl mx-auto leading-tight">
              {tt("Ready to Get Started?", "準備好開始了嗎？")}
            </h2>
            <p className="mt-6 text-lg max-w-2xl mx-auto leading-relaxed">
              {tt("Tell us about your project and we'll prepare a proposal tailored to your business.", "告訴我們你的專案，我們會為你的事業準備專屬提案。")}
            </p>
            <div className="mt-10">
              <Button variant="ghost"
                type="button"
                onClick={scrollToForm}
                className="inline-flex items-center px-8 py-4 site-button text-sm font-semibold rounded-lg"
              >
                {tt("Request a Proposal", "申請提案")}
              </Button>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
};

export default Start;
