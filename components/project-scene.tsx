"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

const steps = {
  forge: [
    "Propose a tool call",
    "Evaluate the policy",
    "Execute approved work",
    "Keep the run evidence",
  ],
  kestri: [
    "Research in a conversation",
    "Remember across conversations",
    "Agree on future work",
    "Persist the state",
  ],
};

export function ProjectScene({
  project,
  children,
}: {
  project: "forge" | "kestri";
  children: ReactNode;
}) {
  const element = useRef<HTMLElement>(null);
  const [stage, setStage] = useState(0);

  useEffect(() => {
    const section = element.current;
    if (!section) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const compact = window.matchMedia(
      "(max-width: 1000px), (max-height: 800px)",
    );
    section.dataset.motion = "ready";
    let frame = 0;
    let active = false;
    function update() {
      frame = 0;
      if (!section) return;
      const bounds = section.getBoundingClientRect();
      const progress =
        reduced.matches || compact.matches
          ? 1
          : Math.max(
              0,
              Math.min(
                1,
                -bounds.top / Math.max(1, bounds.height - window.innerHeight),
              ),
            );
      section.style.setProperty("--scene-progress", String(progress));
      setStage(Math.min(3, Math.floor(progress * 4)));
    }
    function schedule() {
      if (active && !frame) frame = requestAnimationFrame(update);
    }
    const observer = new IntersectionObserver(([entry]) => {
      active = entry.isIntersecting;
      if (active) update();
    });
    observer.observe(section);
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    reduced.addEventListener("change", update);
    compact.addEventListener("change", update);
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      reduced.removeEventListener("change", update);
      compact.removeEventListener("change", update);
      delete section.dataset.motion;
    };
  }, []);

  return (
    <section
      ref={element}
      className={`scene-section scene-${project}`}
      data-stage={stage}
      aria-label={`${project === "forge" ? "Forge" : "Kestri"} project showcase`}
    >
      <div className="scene-sticky">
        <div className="scene-readout container">
          <span>
            {project === "forge" ? "~/projects/forge" : "~/projects/kestri"}
          </span>
          <span className="scene-stage">
            {String(stage + 1).padStart(2, "0")} / 04 — {steps[project][stage]}
          </span>
          <span className="scene-overview">System overview / 04 layers</span>
        </div>
        {children}
        <div className="scene-scroll container">
          <span aria-hidden="true">↓</span> Scroll to trace{" "}
          <div className="scene-progress-track" aria-hidden="true">
            <i />
          </div>
        </div>
      </div>
    </section>
  );
}
