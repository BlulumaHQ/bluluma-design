import { useLang } from "@/lib/i18n";

type Bi = { en: string; zh: string };
type Section = { title: Bi; body?: Bi[]; list?: Bi[] };

const UPDATED: Bi = { en: "Last updated: November 19, 2026", zh: "最後更新：2026年11月19日" };

const TERMS: Section[] = [
  {
    title: { en: "Our services", zh: "服務內容" },
    body: [{ en: "Bluluma Design (\"Bluluma\", \"we\", \"us\") is a Vancouver web design studio. We design and build custom websites, brand identities and AI automation for clinics, Realtors, pre-sale developers and other businesses, and provide ongoing hosting, care and SEO plans.", zh: "Bluluma Design（以下稱「Bluluma」或「我們」）是溫哥華的網站設計工作室，為診所、房仲、預售建商及其他企業設計建置客製網站、品牌識別與 AI 自動化，並提供長期的主機代管、維護與 SEO 方案。" }],
  },
  {
    title: { en: "Proposals and scope", zh: "提案與範圍" },
    list: [
      { en: "Every project starts with a written proposal or quote that sets out the scope, price, timeline and payment schedule. Prices on our website are published package prices; your proposal is final.", zh: "每個專案都從書面提案或報價開始，載明範圍、價格、時程與付款方式。網站上公布的是方案價格，最終以您的提案為準。" },
      { en: "Revision rounds are set out in your proposal. Work outside the agreed scope, such as new pages or features, is quoted separately before we start.", zh: "修改輪數以提案為準。超出約定範圍的工作（例如新頁面或新功能）會在開始前另行報價。" },
      { en: "You are responsible for supplying content, approvals and access (such as domain or listing-feed access) on time. Timelines depend on scope and how quickly we receive these.", zh: "您需按時提供內容、確認與必要權限（例如網域或房源資料權限）。專案時程取決於範圍及上述資料的提供速度。" },
    ],
  },
  {
    title: { en: "Payment", zh: "付款" },
    list: [
      { en: "Setup fees and monthly plan fees are paid as set out in your proposal. Payments are processed securely by Stripe. Prices are in Canadian dollars unless stated otherwise.", zh: "建置費與月費依提案所載方式支付。付款由 Stripe 安全處理。除非另有註明，價格以加幣計價。" },
      { en: "Setup fees cover design and build work and are non-refundable once work has started.", zh: "建置費涵蓋設計與建置工作，一經開工概不退還。" },
    ],
  },
  {
    title: { en: "Monthly plans", zh: "月費方案" },
    list: [
      { en: "Industry plans run for an initial 12-month term, billed monthly. If you end a plan during the first 12 months, the remaining monthly fees for that term are still due.", zh: "產業方案首期為 12 個月，按月收費。若您在首 12 個月內終止方案，該期剩餘月費仍需支付。" },
      { en: "After the first term, plans continue month to month and can be cancelled anytime; cancellation takes effect at the end of the current billing period, with no partial refunds.", zh: "首期結束後，方案改為逐月續約，可隨時取消；取消於當期帳單週期結束時生效，不按比例退款。" },
      { en: "What each plan includes (hosting, content updates, SEO, reports) is listed on our pricing page and in your proposal. Unused update time does not roll over.", zh: "各方案內容（主機代管、內容更新、SEO、報告）列於價格頁面與您的提案中。未使用的更新時數不累積。" },
      { en: "If a plan is left unpaid, we may pause the website and related services until the account is up to date.", zh: "若方案逾期未付，我們可能暫停網站與相關服務，直到帳款結清。" },
    ],
  },
  {
    title: { en: "Third-party services", zh: "第三方服務" },
    list: [
      { en: "Some features depend on third-party services, such as CREA DDF® listing data, booking systems, email providers, Shopify or AI phone and messaging platforms. Their fees, availability and terms are set by those providers.", zh: "部分功能依賴第三方服務，例如 CREA DDF® 房源資料、預約系統、電子郵件服務、Shopify 或 AI 電話與訊息平台。其費用、可用性與條款由該供應商決定。" },
      { en: "Realtors are responsible for meeting their brokerage, board and CREA rules for how listings are displayed; we build the website to support those rules.", zh: "房仲需自行遵守所屬經紀公司、地產局與 CREA 對房源展示的規定；我們會依這些規定建置網站。" },
    ],
  },
  {
    title: { en: "Ownership", zh: "所有權" },
    list: [
      { en: "Your domain, email, logo and content always belong to you.", zh: "您的網域、電子郵件、標誌與內容永遠屬於您。" },
      { en: "Once all fees for the project and its plan term are paid, you own the final website design and content, excluding third-party fonts, images, software and data licensed separately. If you leave after that, we hand over your website files.", zh: "專案費用與方案期間費用全數付清後，最終網站設計與內容歸您所有，但不包括另行授權的第三方字型、圖片、軟體與資料。之後若您離開，我們會交付網站檔案。" },
      { en: "We may show completed work in our portfolio.", zh: "我們可能會將完成的作品放入作品集。" },
    ],
  },
  {
    title: { en: "Your content", zh: "您的內容" },
    body: [{ en: "You confirm that you have the right to use the text, photos, logos and data you give us, and that health, real-estate and other claims on your website are accurate and meet the rules of your profession.", zh: "您確認有權使用提供給我們的文字、照片、標誌與資料，且網站上關於醫療、房地產等的陳述正確，並符合您所屬行業的規範。" }],
  },
  {
    title: { en: "Limitation of liability", zh: "責任限制" },
    body: [{ en: "Our total liability for any claim is limited to the fees you paid us in the 12 months before the claim. We are not liable for indirect or consequential losses, such as lost profits, lost leads or business interruption, or for outages of third-party services.", zh: "我們對任何索賠的總責任，以索賠前 12 個月內您支付給我們的費用為上限。對於間接或衍生性損失（例如利潤或客源損失、營業中斷）及第三方服務中斷，我們不負責任。" }],
  },
  {
    title: { en: "Changes and governing law", zh: "條款變更與準據法" },
    body: [{ en: "We may update these terms from time to time; the version posted here applies, and your signed proposal takes priority where it differs. Changes that affect a plan you pay for will be emailed to you first. These terms are governed by the laws of British Columbia, Canada.", zh: "我們可能不時更新本條款，以本頁公布的版本為準；若與您簽署的提案不同，以提案為優先。若變更影響您付費的方案，我們會先以電子郵件通知。本條款受加拿大卑詩省法律管轄。" }],
  },
];

const PRIVACY: Section[] = [
  {
    title: { en: "What we collect", zh: "我們收集的資訊" },
    list: [
      { en: "Information you send through our proposal and contact forms or by email, such as your name, email, phone, business and project details.", zh: "您透過提案表單、聯絡表單或電子郵件提供的資訊，例如姓名、電子郵件、電話、業務與專案資料。" },
      { en: "Information needed to run your website, such as content, listing data or booking settings you share with us.", zh: "營運網站所需的資訊，例如您提供的內容、房源資料或預約設定。" },
      { en: "Payment details: payments are processed by Stripe. We never see or store your full card number.", zh: "付款資料：付款由 Stripe 處理，我們不會看到或儲存您的完整卡號。" },
      { en: "Usage data such as pages visited, browser type and approximate location, collected through cookies and Google Analytics.", zh: "透過 Cookie 與 Google Analytics 收集的使用資料，例如瀏覽頁面、瀏覽器類型與大略位置。" },
    ],
  },
  {
    title: { en: "How we use it", zh: "我們如何使用" },
    list: [
      { en: "To reply to enquiries and prepare proposals.", zh: "回覆詢問並準備提案。" },
      { en: "To design, build, host and maintain your website and related services.", zh: "設計、建置、代管並維護您的網站與相關服務。" },
      { en: "To bill you and send project updates and reports.", zh: "向您收費並寄送專案進度與報告。" },
      { en: "To measure and improve our website and marketing.", zh: "衡量並改善我們的網站與行銷成效。" },
    ],
    body: [{ en: "We do not sell or rent your personal information.", zh: "我們不會出售或出租您的個人資料。" }],
  },
  {
    title: { en: "Who we share it with", zh: "與誰分享" },
    body: [{ en: "Only the service providers we need to run our business, such as Stripe (payments), our hosting providers, Resend and Google (email), Google Analytics, Supabase (secure data storage) and our workflow automation tools. They may only use your information to provide their service to us.", zh: "僅限營運所需的服務供應商，例如 Stripe（付款）、主機服務商、Resend 與 Google（電子郵件）、Google Analytics、Supabase（資料安全儲存）及我們的工作流程自動化工具。他們只能為了向我們提供服務而使用您的資料。" }],
  },
  {
    title: { en: "Client websites", zh: "客戶網站" },
    body: [{ en: "When we build and host a website for you, you decide what visitor information it collects (for example through booking or enquiry forms). We handle that information on your behalf and only to run your website. Your own website should have its own privacy policy, and we can help you set one up.", zh: "當我們為您建置並代管網站時，網站收集哪些訪客資訊（例如透過預約或詢問表單）由您決定。我們僅代表您、為營運網站而處理這些資訊。您的網站應有自己的隱私政策，我們可以協助您建立。" }],
  },
  {
    title: { en: "Security and retention", zh: "安全與保存期限" },
    body: [{ en: "We take reasonable steps to protect your information. We keep it while you are a client and afterwards only as long as needed for our records and legal obligations.", zh: "我們採取合理措施保護您的資料。您是客戶期間我們會保存資料，之後只在記錄與法律義務所需期間內保存。" }],
  },
  {
    title: { en: "Your choices", zh: "您的權利" },
    body: [{ en: "You can ask to see, correct or delete the personal information we hold about you, block cookies in your browser, and unsubscribe from our emails at any time.", zh: "您可以要求查看、更正或刪除我們持有的個人資料、在瀏覽器中封鎖 Cookie，並隨時取消訂閱我們的電子郵件。" }],
  },
];

function LegalPage({ title, intro, sections }: { title: Bi; intro: Bi; sections: Section[] }) {
  const { lang } = useLang();
  const t = (x: Bi) => (lang === "zh" ? x.zh : x.en);
  return (
    <div className="site-page site-page-legal">
      <section className="site-page-hero isolate section-border relative overflow-hidden">
        <div className="section-container py-16 md:py-24">
          <h1 className="text-4xl md:text-5xl font-bold">{t(title)}</h1>
          <p className="mt-4 text-sm text-muted-foreground">{t(UPDATED)}</p>
        </div>
      </section>
      <section>
        <div className="section-container section-padding">
          <div className="max-w-3xl space-y-8 text-muted-foreground leading-relaxed">
            <p>{t(intro)}</p>
            {sections.map((s, i) => (
              <section key={s.title.en}>
                <h2 className="!text-xl md:!text-2xl !leading-snug font-bold text-foreground">{i + 1}. {t(s.title)}</h2>
                {s.body?.map((p) => <p key={p.en} className="mt-3">{t(p)}</p>)}
                {s.list && (
                  <ul className="mt-3 list-disc space-y-2 pl-6">
                    {s.list.map((li) => <li key={li.en}>{t(li)}</li>)}
                  </ul>
                )}
              </section>
            ))}
            <p>
              {lang === "zh" ? "如有任何問題，請來信：" : "Questions? Email "}
              <a href="mailto:support@bluluma.com" className="text-foreground underline">support@bluluma.com</a>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

export const Terms = () => (
  <LegalPage
    title={{ en: "Terms of Service", zh: "服務條款" }}
    intro={{ en: "These terms apply when you use the Bluluma website or hire us for a project or plan. By engaging our services, you agree to them.", zh: "當您使用 Bluluma 網站，或委託我們進行專案或方案時，適用本條款。委託我們的服務即表示您同意本條款。" }}
    sections={TERMS}
  />
);

export const Privacy = () => (
  <LegalPage
    title={{ en: "Privacy Policy", zh: "隱私權政策" }}
    intro={{ en: "Bluluma Design respects your privacy. This policy explains what we collect, why, and how we look after it.", zh: "Bluluma Design 重視您的隱私。本政策說明我們收集哪些資訊、為何收集，以及如何保護這些資訊。" }}
    sections={PRIVACY}
  />
);
