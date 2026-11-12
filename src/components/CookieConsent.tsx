import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { useLang } from "@/lib/i18n";

const STORAGE_KEY = "bluluma_cookie_consent";

interface CookiePreferences {
  essential: boolean;
  analytics: boolean;
  marketing: boolean;
}

const CookieConsent = () => {
  const { lang } = useLang();
  const tt = (en: string, zh: string) => (lang === "zh" ? zh : en);
  const [visible, setVisible] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [prefs, setPrefs] = useState<CookiePreferences>({
    essential: true,
    analytics: true,
    marketing: false,
  });

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) {
      const timer = setTimeout(() => setVisible(true), 800);
      return () => clearTimeout(timer);
    }
  }, []);

  const save = (preferences: CookiePreferences) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(preferences));
    setVisible(false);
    setShowSettings(false);
  };

  if (!visible) return null;

  return (
    <>
      {/* Bottom Bar */}
      <div
        className="fixed bottom-0 left-0 right-0 z-[9999] animate-in fade-in slide-in-from-bottom-4 duration-500"
        style={{
          background: "#fff",
          borderTop: "1px solid #E5E7EB",
          boxShadow: "0 -2px 10px rgba(0,0,0,0.05)",
        }}
      >
        <div className="max-w-7xl mx-auto px-4 py-3 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <p className="text-sm leading-relaxed" style={{ color: "#333" }}>
            {tt("We use cookies to improve your experience and analyze traffic. You can accept all cookies or manage your preferences.", "我們使用 Cookie 來改善你的瀏覽體驗並分析流量。你可以接受所有 Cookie，或自行管理偏好設定。")}
          </p>
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => save({ essential: true, analytics: true, marketing: true })}
              className="px-4 py-2.5 text-sm font-medium rounded-lg w-full sm:w-auto"
              style={{ background: "#5887DA", color: "#fff" }}
            >
              {tt("Accept All", "全部接受")}
            </button>
            <button
              onClick={() => setShowSettings(true)}
              className="text-sm underline-offset-2 hover:underline w-full sm:w-auto text-center"
              style={{ color: "#666" }}
            >
              {tt("Settings", "設定")}
            </button>
          </div>
        </div>
      </div>

      {/* Settings Modal */}
      {showSettings && (
        <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/30" onClick={() => setShowSettings(false)} />
          <div
            className="relative w-full max-w-md rounded-xl p-6 animate-in fade-in zoom-in-95 duration-200"
            style={{ background: "#fff", boxShadow: "0 10px 40px rgba(0,0,0,0.12)" }}
          >
            <button
              onClick={() => setShowSettings(false)}
              className="absolute top-4 right-4"
              style={{ color: "#999" }}
            >
              <X size={18} />
            </button>
            <h3 className="text-lg font-semibold mb-4" style={{ color: "#111" }}>
              {tt("Cookie Preferences", "Cookie 偏好設定")}
            </h3>
            <div className="space-y-4">
              <CookieRow label={tt("Essential Cookies", "必要 Cookie")} description={tt("Required for the site to function", "網站運作所必需")} checked disabled />
              <CookieRow
                label={tt("Analytics Cookies", "分析 Cookie")}
                description={tt("Help us understand site usage", "幫助我們了解網站使用情況")}
                checked={prefs.analytics}
                onChange={(v) => setPrefs((p) => ({ ...p, analytics: v }))}
              />
              <CookieRow
                label={tt("Marketing Cookies", "行銷 Cookie")}
                description={tt("Used for targeted advertising", "用於精準廣告投放")}
                checked={prefs.marketing}
                onChange={(v) => setPrefs((p) => ({ ...p, marketing: v }))}
              />
            </div>
            <button
              onClick={() => save(prefs)}
              className="mt-6 w-full py-2.5 text-sm font-medium rounded-lg"
              style={{ background: "#5887DA", color: "#fff" }}
            >
              {tt("Save Preferences", "儲存偏好設定")}
            </button>
          </div>
        </div>
      )}
    </>
  );
};

const CookieRow = ({
  label,
  description,
  checked,
  disabled,
  onChange,
}: {
  label: string;
  description: string;
  checked: boolean;
  disabled?: boolean;
  onChange?: (v: boolean) => void;
}) => (
  <div className="flex items-center justify-between gap-3">
    <div>
      <p className="text-sm font-medium" style={{ color: "#222" }}>{label}</p>
      <p className="text-xs" style={{ color: "#888" }}>{description}</p>
    </div>
    <button
      disabled={disabled}
      onClick={() => onChange?.(!checked)}
      className="relative w-10 h-5 rounded-full shrink-0 transition-colors"
      style={{
        background: checked ? "#5887DA" : "#D1D5DB",
        opacity: disabled ? 0.6 : 1,
        cursor: disabled ? "not-allowed" : "pointer",
      }}
    >
      <span
        className="absolute top-0.5 w-4 h-4 rounded-full bg-white transition-transform"
        style={{ left: checked ? "calc(100% - 18px)" : "2px" }}
      />
    </button>
  </div>
);

export default CookieConsent;
