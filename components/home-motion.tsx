"use client";

import { useEffect, useRef, type ReactNode } from "react";

export function HomeMotion({ children }: { children: ReactNode }) {
  const root = useRef<HTMLDivElement>(null);
  const progress = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = root.current;
    if (!element) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");
    let frame = 0;
    let pointerFrame = 0;
    let hovered: HTMLElement | null = null;
    let pointerX = 0;
    let pointerY = 0;
    const targets = element.querySelectorAll<HTMLElement>(
      ".section-heading, .about-intro, .project-copy, .system-node, .stack-category, .contact-content",
    );
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-in-view");
            observer.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.08 },
    );
    for (const target of targets) observer.observe(target);
    element.dataset.motion = "ready";

    function updateProgress() {
      frame = 0;
      const available =
        document.documentElement.scrollHeight - window.innerHeight;
      progress.current?.style.setProperty(
        "--reading-progress",
        String(available > 0 ? window.scrollY / available : 0),
      );
    }
    function onScroll() {
      if (!frame) frame = requestAnimationFrame(updateProgress);
    }
    function paintPointer() {
      pointerFrame = 0;
      if (!hovered) return;
      hovered.style.setProperty("--pointer-x", `${pointerX}px`);
      hovered.style.setProperty("--pointer-y", `${pointerY}px`);
      hovered.style.setProperty("--pointer-presence", "1");
    }
    function onPointerMove(event: PointerEvent) {
      if (
        reduced.matches ||
        !finePointer.matches ||
        !(event.target instanceof Element)
      )
        return;
      const section = event.target.closest<HTMLElement>(".project-section");
      if (section !== hovered) {
        hovered?.style.removeProperty("--pointer-presence");
        hovered = section;
      }
      if (!section) return;
      const bounds = section.getBoundingClientRect();
      pointerX = event.clientX - bounds.left;
      pointerY = event.clientY - bounds.top;
      if (!pointerFrame) pointerFrame = requestAnimationFrame(paintPointer);
    }
    function clearPointer() {
      hovered?.style.removeProperty("--pointer-presence");
      hovered = null;
    }
    function motionPreferenceChanged() {
      if (reduced.matches) clearPointer();
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    element.addEventListener("pointermove", onPointerMove);
    element.addEventListener("pointerleave", clearPointer);
    reduced.addEventListener("change", motionPreferenceChanged);
    updateProgress();
    return () => {
      cancelAnimationFrame(frame);
      cancelAnimationFrame(pointerFrame);
      observer.disconnect();
      clearPointer();
      delete element.dataset.motion;
      for (const target of targets) target.classList.remove("is-in-view");
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      element.removeEventListener("pointermove", onPointerMove);
      element.removeEventListener("pointerleave", clearPointer);
      reduced.removeEventListener("change", motionPreferenceChanged);
    };
  }, []);

  return (
    <div ref={root} className="home-motion">
      <div ref={progress} className="reading-progress" aria-hidden="true" />
      {children}
    </div>
  );
}
