// Traditional Chinese (Taiwan usage) copy for the case-study projects in projects.ts.
import type { Project } from "./projects";

type ZhFields = Pick<Project, "description" | "summary" | "challenge" | "strategy" | "outcome">;

const PROJECTS_ZH: Record<string, ZhFields> = {
  "friendly-dental": {
    description: "現代牙醫診所的品牌與網站，傳達信任、清楚與專業。",
    summary: "以轉換為核心的診所網站與識別系統，讓初診病患能放心預約。",
    challenge: "診所實際環境很現代，網路形象卻顯得過時：手機版的行動呼籲薄弱，各個接觸點也缺乏一致的信任感。",
    strategy: "我們簡化資訊動線、強化服務層次，並以更沉穩的醫療品牌語言搭配更清楚的預約路徑。",
    outcome: "完成後的網站可信、親切，也更容易把搜尋與轉介來的流量轉換成預約。",
  },
  "live-at-headwater": {
    description: "現代住宅建案的品牌識別與數位平台。",
    summary: "高端預售建案網站，把對建案的興趣轉換成合格買方的詢問。",
    challenge: "建案要在訪客實際看到房子之前，就賣出一種尚未完成的生活方式，並提早累積買氣。",
    strategy: "我們以地段、理想生活與格局探索為主軸，建立編輯式的敘事，並把名單擷取自然融入瀏覽過程。",
    outcome: "新網站讓銷售團隊有更鮮明的數位故事，也成為早期買方轉換更有力的平台。",
  },
  "btn-real-estate": {
    description: "為房地產開發顧問公司打造的品牌與網站平台。",
    summary: "更鮮明的顧問公司網站，讓 BTN 被視為可信賴的策略夥伴，而不是又一家普通的房地產公司。",
    challenge: "舊網站低估了團隊的專業，潛在客戶找不到足夠的理由，把高價值的開發決策交給 BTN。",
    strategy: "我們用更精準的訊息、克制的視覺設計與更清楚的服務路徑，強調專業權威與諮詢品質。",
    outcome: "BTN 現在有更高端的數位形象，有助於建立高信任度的引薦與業務洽談。",
  },
  "nuera-nutra": {
    description: "為營養品牌設計的現代電商網站。",
    summary: "精簡的電商店面，強化商品信任、方便重複瀏覽，讓購買決策更清楚。",
    challenge: "品牌需要更清爽的線上購物體驗，能快速說明商品價值，又不會讓消費者感到資訊過多。",
    strategy: "我們著重更清楚的商品架構、更有自信的視覺層次，以及從探索到結帳更順暢的路徑。",
    outcome: "網站更有質感、以商品為主角，也為擴大線上銷售打好基礎。",
  },
  "kchen-construction": {
    description: "營造管理公司的品牌識別與網站。",
    summary: "營造管理公司的品牌與網站，傳達可靠、有條理與商業上的自信。",
    challenge: "公司需要更成熟的形象，才能匹配他們承接專案的規模與分量。",
    strategy: "我們建立更清楚的品牌結構、更有力的訊息層次，以及更嚴謹的網站架構。",
    outcome: "新的系統讓公司看起來更可信，也讓客戶一眼就能評估。",
  },
  "helen-lam-real-estate": {
    description: "整合 MLS IDX 物件搜尋的房地產網站。",
    summary: "為個人信任感、物件探索與手機瀏覽而優化的房仲網站。",
    challenge: "網站需要在經紀人個人品牌，與買賣雙方實用的瀏覽工具之間取得平衡。",
    strategy: "我們強化個人定位，搭配更簡單的物件搜尋入口與更清楚的服務說明。",
    outcome: "整體體驗對客戶來說更精緻，同時仍是日常銷售中實用的工具。",
  },
};

export const INDUSTRY_ZH: Record<string, string> = {
  Dental: "牙醫診所",
  Realtor: "房地產",
  Restaurant: "餐廳",
  Construction: "營造",
  Beauty: "美容",
  Medical: "醫療",
  "Local Business": "在地商家",
  "E-Commerce": "電商",
  "Professional Services": "專業服務",
  Other: "其他",
};

export const SERVICE_ZH: Record<string, string> = {
  "Brand Identity": "品牌識別",
  "Website Platform": "網站平台",
  "Marketing Collateral": "行銷物料",
  "MLS IDX Integration": "MLS IDX 整合",
};

export const localizeProject = (p: Project, lang: "en" | "zh"): Project => {
  if (lang !== "zh") return p;
  const zh = PROJECTS_ZH[p.slug];
  return {
    ...p,
    ...(zh ?? {}),
    services: p.services.map((s) => SERVICE_ZH[s] ?? s),
  };
};
