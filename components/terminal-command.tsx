"use client";

import { useState } from "react";
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

export function TerminalCommand() {
  const navigate = useNavigationSignal();
  const [command, setCommand] = useState("");
  const [history, setHistory] = useState<
    { command: string; response: string }[]
  >([]);

  function runCommand(value: string) {
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
        "Commands: projects, forge, kestri, about, skills, contact, whoami, clear. Try open forge.",
      );
      return;
    }
    if (input === "whoami") {
      record(
        "Mori. Computer Science student building backend systems, AI agents, and developer tools.",
      );
      return;
    }
    if (input === "forge" || input === "kestri") {
      record(`Opening ${input} case study…`);
      navigate(`/projects/${input}`);
      return;
    }
    if (["projects", "about", "skills", "contact"].includes(input)) {
      navigate(`#${input}`);
      record(`Opened ${input}.`);
      return;
    }
    record(
      `Unknown command: ${input.slice(0, 80)}. Type help to see available commands.`,
    );
  }

  return (
    <section
      className="terminal-command"
      aria-label="Interactive portfolio terminal"
    >
      <div className="terminal-bezel-title">
        <span className="terminal-model">
          MORI <span>PERSONAL COMPUTER</span>
        </span>
        <span className="terminal-power">
          <i aria-hidden="true" /> POWER
        </span>
      </div>
      <div className="terminal-screen">
        <div className="terminal-screen-heading">
          <span>PORTFOLIO OS</span>
          <span>INTERACTIVE DIRECTORY</span>
        </div>
        <div className="terminal-boot">
          <p>Welcome to Mori’s working directory.</p>
          <p>Explore the projects. Meet the person behind them.</p>
          <p className="terminal-instruction">
            Type <strong>help</strong> to begin, or use the keys below.
          </p>
        </div>
        <div
          className="command-history"
          role="log"
          aria-label="Command history"
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
            <span className="sr-only"> Portfolio navigation command</span>
          </label>
          <input
            id="portfolio-command"
            value={command}
            onChange={(event) => setCommand(event.target.value)}
            placeholder="type a command…"
            maxLength={100}
            autoComplete="off"
            autoCapitalize="none"
            spellCheck={false}
            aria-describedby="command-hint"
          />
          <button
            type="submit"
            className="command-enter"
            aria-label="Run portfolio command"
          >
            ↵
          </button>
        </form>
      </div>
      <div className="terminal-keyboard">
        <span id="command-hint">QUICK COMMANDS</span>
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
          <span>LOCAL DIRECTORY / PORTFOLIO NAVIGATION</span>
          <span className="terminal-vents" />
        </div>
      </div>
    </section>
  );
}
