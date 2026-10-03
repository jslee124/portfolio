"use client";

import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  type MouseEvent,
  type ReactNode,
} from "react";
import { usePathname, useRouter } from "next/navigation";

const SignalContext = createContext<(href: string) => void>(() => {});
export const useNavigationSignal = () => useContext(SignalContext);

export function NavigationSignal({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [destination, setDestination] = useState<string | null>(null);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => () => timers.current.forEach(clearTimeout), []);

  function navigate(href: string) {
    timers.current.forEach(clearTimeout);
    function open() {
      if (href.startsWith("#")) {
        const target = document.getElementById(href.slice(1));
        target?.scrollIntoView({ behavior: "instant", block: "start" });
        target?.focus({ preventScroll: true });
        window.history.replaceState(window.history.state, "", href);
      } else router.push(href);
    }
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setDestination(null);
      open();
      return;
    }
    setDestination(href);
    timers.current = [
      setTimeout(open, 220),
      setTimeout(() => setDestination(null), 670),
    ];
  }

  function capture(event: MouseEvent<HTMLDivElement>) {
    if (
      event.defaultPrevented ||
      event.button !== 0 ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey ||
      !(event.target instanceof Element)
    )
      return;
    const link = event.target.closest<HTMLAnchorElement>("a[href]");
    if (!link || link.target || link.hasAttribute("download")) return;
    const href = link.getAttribute("href");
    if (
      !href ||
      href.startsWith("//") ||
      (!href.startsWith("/") && !href.startsWith("#"))
    )
      return;
    if (href === pathname) return;
    event.preventDefault();
    navigate(pathname === "/" && href.startsWith("/#") ? href.slice(1) : href);
  }

  return (
    <SignalContext.Provider value={navigate}>
      <div id="top" onClickCapture={capture}>{children}</div>
      {destination && (
        <div key={destination} className="signal-transition" aria-hidden="true">
          <span>
            &gt; open{" "}
            {destination.replace(/^\/?#?/, "").replace("projects/", "") ||
              "home"}
            <i>_</i>
          </span>
        </div>
      )}
    </SignalContext.Provider>
  );
}
