import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ArrowUp, Mail, MessageCircle } from "lucide-react";

const HIDE_ON = ["/proposal", "/start", "/contact", "/thank-you"];

const MobileStickyCTA = () => {
  const { pathname } = useLocation();
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 320);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const hideBar = HIDE_ON.some((p) => pathname.startsWith(p));

  return (
    <>
      {/* Floating right-side action stack (mobile + tablet) */}
      <div className="md:hidden fixed right-3 z-40 flex flex-col gap-2.5"
           style={{ bottom: "calc(96px + env(safe-area-inset-bottom, 0px))" }}>
        <a
          href="mailto:support@bluluma.com"
          aria-label="Email Bluluma"
          className="mobile-cta-fab"
        >
          <Mail size={18} strokeWidth={1.6} />
        </a>
        <Link
          to="/proposal"
          aria-label="Send a message"
          className="mobile-cta-fab"
        >
          <MessageCircle size={18} strokeWidth={1.6} />
        </Link>
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          aria-label="Back to top"
          className={`mobile-cta-fab transition-opacity duration-300 ${
            showTop ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
        >
          <ArrowUp size={18} strokeWidth={1.6} />
        </button>
      </div>

      {/* Bottom sticky CTA bar (mobile + tablet) */}
      {!hideBar && (
        <div
          className="md:hidden fixed inset-x-0 bottom-0 z-40 bg-background/95 backdrop-blur border-t border-border"
          style={{ paddingBottom: "env(safe-area-inset-bottom, 0px)" }}
        >
          <div className="flex items-stretch gap-2 px-3 py-2.5">
            <a
              href="mailto:support@bluluma.com"
              className="flex-1 inline-flex items-center justify-center gap-2 h-12 rounded-full border border-border text-sm font-semibold text-foreground active:scale-[0.98] transition-transform"
            >
              <Mail size={16} strokeWidth={1.7} />
              Contact
            </a>
            <Link
              to="/proposal"
              className="flex-[1.4] inline-flex items-center justify-center h-12 rounded-full cta-solid text-sm font-semibold active:scale-[0.98] transition-transform"
            >
              Request a Proposal
            </Link>
          </div>
        </div>
      )}
    </>
  );
};

export default MobileStickyCTA;
