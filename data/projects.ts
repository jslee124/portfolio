export interface CaseStudySection {
  title: string;
  paragraphs: string[];
}

export interface Project {
  slug: "forge" | "kestri";
  name: string;
  category: string;
  tagline: string;
  description: string;
  technologies: string[];
  github: string;
  featured?: boolean;
  overview: string;
  motivation: string;
  architecture: {
    entry: string;
    core: string;
    modules: string[];
    storage: string;
    caption: string;
  };
  sections: CaseStudySection[];
  decisions: { title: string; description: string }[];
  learning: string;
  sources: { label: string; url: string }[];
}

export const projects: Project[] = [
  {
    slug: "forge",
    name: "Forge",
    category: "Agent runtime / Developer tooling",
    tagline: "A coding agent you can inspect, constrain, and evaluate.",
    description:
      "A TypeScript coding-agent runtime with an owned agent loop, explicit tool policies, persistent sessions, and reproducible evaluations.",
    technologies: ["TypeScript", "Node.js", "AI Agents", "CLI"],
    github: "https://github.com/jslee124/forge",
    featured: true,
    overview:
      "Forge is an open-source exploration of the engineering behind coding agents. It makes model interaction, tool execution, context, and run evidence visible in a runtime that can be read end to end.",
    motivation:
      "A model emitting a tool call is only the beginning. I built Forge to understand the runtime around it: deciding what may execute, recovering from failures, preserving a conversation, and measuring whether a task actually succeeded.",
    architecture: {
      entry: "Interactive CLI",
      core: "Forge-owned agent runtime",
      modules: [
        "Model adapters",
        "Context",
        "Policy",
        "Tools",
        "Persistence",
        "Traces / Evaluation",
      ],
      storage: "Sessions + JSONL traces",
      caption:
        "Simplified view of the native Forge engine. The CLI composes the runtime dependencies; model adapters translate provider requests. The separate Codex engine owns its own execution boundaries.",
    },
    sections: [
      {
        title: "Agent runtime",
        paragraphs: [
          "The runtime controls model steps, tool execution, continuation, cancellation, and stop limits. Model adapters translate provider interaction while the Forge-owned loop decides how the run proceeds.",
          "The CLI supports native model access through OpenAI, DeepSeek, and compatible endpoints. A separate Codex engine integration is kept distinct from the native runtime.",
        ],
      },
      {
        title: "Tool and permission system",
        paragraphs: [
          "Tool proposals pass through validation and an explicit allow, confirm, or deny decision before execution. The default safe profile asks for the first workspace write and for process commands; missing approval channels fail closed.",
          "Trusted plugins extend the tool surface and may tighten policy. These application controls are not an operating-system sandbox; that boundary matters when evaluating what the runtime can protect.",
        ],
      },
      {
        title: "Context and persistence",
        paragraphs: [
          "Persistent sessions restore completed turns and bounded failed-run outcomes without restoring old approvals or pending tool calls. Conversation state and authority have different lifetimes.",
          "Context budgets account for the model request. Optional checkpoints reduce the active context while retaining the canonical transcript. Skills and hierarchical project instructions provide additional task context.",
        ],
      },
      {
        title: "Evaluation and observability",
        paragraphs: [
          "Structured terminal events and versioned JSONL traces connect model proposals to executed actions. Traces provide run evidence, while conversation history supplies the next model context.",
          "Deterministic checks exercise runtime contracts. Live-model trials use reproducible tasks and retain both successes and failures. Passing a test suite and demonstrating model task quality are separate forms of evidence.",
        ],
      },
    ],
    decisions: [
      {
        title: "Own the loop",
        description:
          "Keep runtime behavior explicit so continuation, tool execution, and stopping can be inspected and tested independently of a model provider.",
      },
      {
        title: "Separate policy from execution",
        description:
          "Make permission decisions visible before a tool produces side effects, and preserve core policy through extensions.",
      },
      {
        title: "Keep evidence reproducible",
        description:
          "Use deterministic checks for contracts and recorded live trials for model behavior, including unsuccessful runs.",
      },
    ],
    learning:
      "Agent engineering is largely about what happens around the model. Clear state transitions, explicit authority, and inspectable evidence make a small runtime easier to reason about—and expose the limits of its guarantees.",
    sources: [
      {
        label: "Project overview",
        url: "https://github.com/jslee124/forge#readme",
      },
      {
        label: "Architecture",
        url: "https://github.com/jslee124/forge/blob/main/docs/product/concepts/ARCHITECTURE.md",
      },
      {
        label: "Security model",
        url: "https://github.com/jslee124/forge/blob/main/docs/product/concepts/SECURITY_MODEL.md",
      },
      {
        label: "Evaluation",
        url: "https://github.com/jslee124/forge/blob/main/docs/development/EVALUATION.md",
      },
    ],
  },
  {
    slug: "kestri",
    name: "Kestri",
    category: "Agent application / Personal AI",
    tagline: "A personal agent for research, memory, and ongoing tasks.",
    description:
      "A local personal agent combining research with sources, persistent memory, and scheduled workflows through a Telegram interface.",
    technologies: ["Python", "LangGraph", "PostgreSQL", "Docker"],
    github: "https://github.com/jslee124/kestri",
    overview:
      "Kestri is a local personal AI agent for questions, public information research, saved preferences, and explicitly delegated recurring work. An owner-only Telegram private chat provides the everyday interface.",
    motivation:
      "I wanted to explore the application layer of personal agents: how research, memory, and task agreements stay useful across conversations. Kestri focuses on durable state and an interface that fits daily use.",
    architecture: {
      entry: "Telegram · Owner private chat",
      core: "Kestri application",
      modules: [
        "LangChain / LangGraph",
        "Research tools",
        "Personal memory",
        "Scheduled tasks",
        "Context",
        "Delivery",
      ],
      storage: "PostgreSQL + Local workspace",
      caption:
        "Simplified responsibilities within one asynchronous Python application. PostgreSQL stores business state and graph checkpoints. Telegram, DeepSeek, and Tavily are external services.",
    },
    sections: [
      {
        title: "Research workflow",
        paragraphs: [
          "LangChain builds the model/tool graph and LangGraph manages execution state. Kestri-owned tools wrap Tavily search and extraction, record sources, and apply public URL checks and output bounds.",
          "The application handles authorization, cancellation, accounting, and delivery. Keeping those responsibilities outside the graph makes the product boundary explicit.",
        ],
      },
      {
        title: "Memory system",
        paragraphs: [
          "Personal memory is separate from conversation history. Preferences can be saved, inspected, corrected, and forgotten, then supplied as relevant context for later conversations.",
          "Memory belongs to the application’s durable state. Starting fresh conversation context preserves saved memory and task agreements.",
        ],
      },
      {
        title: "Recurring tasks",
        paragraphs: [
          "Daily and weekly workflows use explicit schedules, timezones, and persisted task agreements. The application turns due agreements into background runs and delivers saved results through an outbox.",
          "Foreground and background work use separate workers. Local operation has a concrete tradeoff: sleep, lost connectivity, or a stopped process can delay scheduled work.",
        ],
      },
      {
        title: "Persistence and context",
        paragraphs: [
          "PostgreSQL holds business state and LangGraph checkpoints. Managed context compression bounds the active conversation, while completed results, archives, memory, and task agreements survive restarts.",
          "Backup and restore require more than copying data. Conservative restore quarantines imported memory, pauses tasks, and requires reauthorization before recurring work resumes.",
        ],
      },
      {
        title: "Deployment",
        paragraphs: [
          "Docker Compose runs the Python application and PostgreSQL locally. A dedicated filesystem workspace stores research evidence. No public application HTTP server is needed for the Telegram interface.",
          "Local data ownership does not mean offline inference: model requests, web retrieval, and Telegram messaging depend on external services.",
        ],
      },
    ],
    decisions: [
      {
        title: "Build an application around the graph",
        description:
          "Use LangGraph for execution and checkpoints while keeping authorization, scheduling, and delivery in application services.",
      },
      {
        title: "Persist task agreements",
        description:
          "Store explicit schedules and durable run state so ongoing work does not depend on the lifetime of a chat message.",
      },
      {
        title: "Restore conservatively",
        description:
          "Treat restored memory and automation as data that needs review, rather than silently restarting previously authorized work.",
      },
    ],
    learning:
      "A personal agent needs more than a useful answer in one turn. Memory lifecycle, task ownership, recovery, and delivery are part of the product. Durable state helps, but long-term usefulness remains a separate question from technical validation.",
    sources: [
      {
        label: "Project overview",
        url: "https://github.com/jslee124/kestri#readme",
      },
      {
        label: "Architecture",
        url: "https://github.com/jslee124/kestri/blob/main/docs/design/architecture.md",
      },
      {
        label: "Context management",
        url: "https://github.com/jslee124/kestri/blob/main/docs/design/context-management.md",
      },
      {
        label: "Operations",
        url: "https://github.com/jslee124/kestri/blob/main/docs/how-to/operate-local-agent.md",
      },
    ],
  },
];
