import { useEffect, useState } from "react";
import logo from "@/assets/bluluma-logo.svg";

const SESSION_KEY = "blulumaLoaderShown";

const PageLoader = () => {
  const [visible, setVisible] = useState(() => {
    if (typeof window === "undefined") return false;
    return !sessionStorage.getItem(SESSION_KEY);
  });
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    if (!visible) return;
    sessionStorage.setItem(SESSION_KEY, "1");

    const dismiss = () => {
      setFadeOut(true);
      setTimeout(() => setVisible(false), 600);
    };

    // Dismiss after content ready or failsafe 3s
    const failsafe = setTimeout(dismiss, 3000);
    if (document.readyState === "complete") {
      clearTimeout(failsafe);
      setTimeout(dismiss, 1200);
    } else {
      const onLoad = () => {
        clearTimeout(failsafe);
        setTimeout(dismiss, 800);
      };
      window.addEventListener("load", onLoad);
      return () => {
        window.removeEventListener("load", onLoad);
        clearTimeout(failsafe);
      };
    }
    return () => clearTimeout(failsafe);
  }, [visible]);

  if (!visible) return null;

  const prefersReduced =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  return (
    <div
      className={`fixed inset-0 z-[9999] bg-background flex items-center justify-center transition-opacity ${
        fadeOut ? "opacity-0" : "opacity-100"
      }`}
      style={{ transitionDuration: "500ms" }}
    >
      <img
        src={logo}
        alt="Bluluma Design"
        className="h-20 md:h-28 w-auto"
        style={
          prefersReduced
            ? {}
            : {
                animation: "loaderReveal 1s ease-out forwards",
              }
        }
      />
    </div>
  );
};

export default PageLoader;
