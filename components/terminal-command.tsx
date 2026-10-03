"use client";

import { useState } from "react";
import { useNavigationSignal } from "./navigation-signal";

const shortcuts = ["help", "projects", "forge", "kestri", "about", "contact"];

export function TerminalCommand() {
  const navigate = useNavigationSignal();
  const [command, setCommand] = useState("");
  const [response, setResponse] = useState("");

  function runCommand(value: string) {
    const input = value
      .trim()
      .toLowerCase()
      .replace(/^open\s+/, "");
    setCommand("");

    if (!input) return;
    if (input === "clear") {
      setResponse("");
      return;
    }
    if (input === "help") {
      setResponse(
        "Commands: projects, forge, kestri, about, contact, whoami, clear. Try open forge.",
      );
      return;
    }
    if (input === "whoami") {
      setResponse(
        "Mori. Computer Science student building backend systems, AI agents, and developer tools.",
      );
      return;
    }
    if (input === "forge" || input === "kestri") {
      navigate(`/projects/${input}`);
      return;
    }
    if (["projects", "about", "contact"].includes(input)) {
      navigate(`#${input}`);
      setResponse(`Opened ${input}.`);
      return;
    }
    setResponse(
      `Unknown command: ${input.slice(0, 80)}. Type help to see available commands.`,
    );
  }

  return (
    <div className="terminal-command">
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
          placeholder="help or open forge"
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
      <div className="command-feedback" role="status">
        {response}
      </div>
      <div className="command-shortcuts">
        <span id="command-hint">Navigate:</span>
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
    </div>
  );
}
