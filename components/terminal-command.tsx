"use client";

import { translator, localizedPath, type Locale } from "@/lib/i18n";

import { useEffect, useRef, useState, type PointerEvent } from "react";
import { useNavigationSignal } from "./navigation-signal";

const shortcuts = [
  "help",
  "projects",
  "forge",
  "kestri",
  "about",
  "skills",
  "contact",
];

export function TerminalCommand({ locale = "en" }: { locale?: Locale }) {
  const t = translator(locale);
  const navigate = useNavigationSignal();
  const pendingNavigation = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(
    () => () => {
      if (pendingNavigation.current) clearTimeout(pendingNavigation.current);
    },
    [],
  );

  function openAfterOutput(href: string) {
    pendingNavigation.current = setTimeout(() => {
      pendingNavigation.current = null;
      navigate(href);
    }, 1100);
  }
  const drag = useRef<{ pointerId: number; x: number; y: number } | null>(null);
  const [command, setCommand] = useState("");
  const [history, setHistory] = useState<
    { command: string; response: string }[]
  >([]);

  function startDrag(event: PointerEvent<HTMLElement>) {
    if (
      event.pointerType !== "mouse" ||
      event.button !== 0 ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      !(event.target instanceof Element) ||
      event.target.closest("button, input, a, label, .terminal-screen")
    )
      return;

    event.preventDefault();
    drag.current = {
      pointerId: event.pointerId,
      x: event.clientX,
      y: event.clientY,
    };
    event.currentTarget.setPointerCapture(event.pointerId);
    event.currentTarget.dataset.dragging = "true";
  }

  function moveDrag(event: PointerEvent<HTMLElement>) {
    const origin = drag.current;
    if (!origin || origin.pointerId !== event.pointerId) return;
    const clamp = (angle: number) => Math.max(-14, Math.min(14, angle));
    event.currentTarget.style.setProperty(
      "--terminal-rotate-x",
      `${clamp((origin.y - event.clientY) / 24)}deg`,
    );
    event.currentTarget.style.setProperty(
      "--terminal-rotate-y",
      `${clamp((event.clientX - origin.x) / 32)}deg`,
    );
  }

  function endDrag(event: PointerEvent<HTMLElement>) {
    if (drag.current?.pointerId !== event.pointerId) return;
    drag.current = null;
    delete event.currentTarget.dataset.dragging;
    event.currentTarget.style.removeProperty("--terminal-rotate-x");
    event.currentTarget.style.removeProperty("--terminal-rotate-y");
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
  }

  function runCommand(value: string) {
    if (!value.trim()) return;
    if (pendingNavigation.current) {
      clearTimeout(pendingNavigation.current);
      pendingNavigation.current = null;
    }
    const input = value
      .trim()
      .toLowerCase()
      .replace(/^open\s+/, "");
    setCommand("");

    function record(response: string) {
      setHistory((previous) => [
        ...previous.slice(-2),
        { command: value.trim(), response },
      ]);
    }

    if (!input) return;
    if (input === "clear") {
      setHistory([]);
      return;
    }
    if (input === "help") {
      record(
        t(
          "Commands: projects, forge, kestri, about, skills, contact, whoami, clear. Try open forge.",
        ),
      );
      return;
    }
    if (input === "whoami") {
      record(
        t(
          "Mori. Computer Science student building backend systems, AI agents, and developer tools.",
        ),
      );
      return;
    }
    if (input === "forge" || input === "kestri") {
      record(
        locale === "zh"
          ? `正在打开 ${input} 项目介绍…`
          : `Opening ${input} case study…`,
      );
      openAfterOutput(localizedPath(locale, `/projects/${input}`));
      return;
    }
    if (["projects", "about", "skills", "contact"].includes(input)) {
      record(locale === "zh" ? `正在打开 ${input}…` : `Opening ${input}…`);
      openAfterOutput(`#${input}`);
      return;
    }
    record(
      locale === "zh"
        ? `未知命令：${input.slice(0, 80)}。输入 help 查看可用命令。`
        : `Unknown command: ${input.slice(0, 80)}. Type help to see available commands.`,
    );
  }

  return (
    <div className="terminal-workstation">
      <section
        className="terminal-command"
        aria-label={t("Interactive portfolio terminal")}
        onPointerDown={startDrag}
        onPointerMove={moveDrag}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        onLostPointerCapture={endDrag}
      >
        <div
          className="terminal-depth terminal-depth-back"
          aria-hidden="true"
        />
        <div
          className="terminal-depth terminal-depth-right"
          aria-hidden="true"
        />
        <div
          className="terminal-depth terminal-depth-left"
          aria-hidden="true"
        />
        <div className="terminal-depth terminal-depth-top" aria-hidden="true" />
        <div
          className="terminal-depth terminal-depth-bottom"
          aria-hidden="true"
        />
        <div className="terminal-bezel-title">
          <span className="terminal-model">
            MORI <span>{t("PERSONAL COMPUTER")}</span>
          </span>
          <span className="terminal-power">
            <i aria-hidden="true" /> {t("POWER")}{" "}
          </span>
          <span className="terminal-drag-hint">
            {t("DRAG THE CASE TO TILT ↔")}
          </span>
        </div>
        <div className="terminal-screen">
          <div className="terminal-screen-heading">
            <span>PORTFOLIO OS</span>
            <span>{t("INTERACTIVE DIRECTORY")}</span>
          </div>
          <div className="terminal-boot">
            <p>{t("Welcome to Mori’s working directory.")}</p>
            <p>{t("Explore the projects. Meet the person behind them.")}</p>
            <p className="terminal-instruction">
              {t("Type")} <strong>help</strong>{" "}
              {t("to begin, or use the keys below.")}{" "}
            </p>
          </div>
          <div
            className="command-history"
            role="log"
            aria-label={t("Command history")}
            aria-live="polite"
            aria-relevant="additions"
          >
            {history.map((entry, index) => (
              <div
                className="command-history-entry"
                key={`${index}-${entry.command}`}
              >
                <p className="command-echo">mori:~$ {entry.command}</p>
                <p>{entry.response}</p>
              </div>
            ))}
          </div>
          <form
            onSubmit={(event) => {
              event.preventDefault();
              runCommand(command);
            }}
            className="command-form"
          >
            <label htmlFor="portfolio-command" className="command-prompt">
              <span className="prompt-user">mori</span>
              <span className="prompt-path">:~</span>
              <span>$</span>
              <span className="sr-only">
                {" "}
                {t("Portfolio navigation command")}
              </span>
            </label>
            <input
              id="portfolio-command"
              value={command}
              onChange={(event) => setCommand(event.target.value)}
              placeholder={t("type a command…")}
              maxLength={100}
              autoComplete="off"
              autoCapitalize="none"
              spellCheck={false}
              aria-describedby="command-hint"
            />
            <button
              type="submit"
              className="command-enter"
              aria-label={t("Run portfolio command")}
            >
              ↵
            </button>
          </form>
        </div>
        <div className="terminal-keyboard">
          <span id="command-hint">{t("QUICK COMMANDS")}</span>
          <div className="command-shortcuts">
            {shortcuts.map((shortcut) => (
              <button
                key={shortcut}
                type="button"
                onClick={() => runCommand(shortcut)}
              >
                {shortcut}
              </button>
            ))}
          </div>
          <div className="terminal-bezel-footer" aria-hidden="true">
            <span>{t("LOCAL DIRECTORY / PORTFOLIO NAVIGATION")}</span>
            <span className="terminal-vents" />
          </div>
        </div>
      </section>
    </div>
  );
}
