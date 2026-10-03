export function ForgeFlow() {
  return (
    <figure
      className="forge-flow"
      aria-label="Simplified Forge tool execution flow"
    >
      <div className="flow-header">
        <span>Inside a tool call</span>
        <span className="flow-key">
          <i /> Native runtime
        </span>
      </div>
      <div className="flow-track">
        <div className="flow-node">
          <span className="flow-port" aria-hidden="true" />
          <span className="flow-kind">Model</span>
          <strong>Propose a tool call</strong>
          <p>Structured name + arguments</p>
        </div>
        <div className="flow-node policy-node">
          <span className="flow-port" aria-hidden="true" />
          <span className="flow-kind">Policy</span>
          <strong>Decide before execution</strong>
          <div className="policy-outcomes">
            <span>allow</span>
            <span>confirm</span>
            <span>deny</span>
          </div>
        </div>
        <div className="flow-node">
          <span className="flow-port" aria-hidden="true" />
          <span className="flow-kind">Tool</span>
          <strong>Execute approved work</strong>
          <p>Return a structured result</p>
        </div>
      </div>
      <div className="flow-return">
        <span aria-hidden="true">↳</span> Continue the loop{" "}
        <span className="trace-label">Record run evidence</span>
      </div>
      <figcaption>
        Architecture sketch · policy is evaluated before side effects
      </figcaption>
    </figure>
  );
}

export function KestriTimeline() {
  const layers = [
    {
      time: "Now",
      title: "A conversation",
      detail: "Research a question. Keep the sources.",
      symbol: "conversation",
    },
    {
      time: "Across conversations",
      title: "A remembered preference",
      detail: "Save, inspect, correct, or forget.",
      symbol: "memory",
    },
    {
      time: "Later",
      title: "An agreed task",
      detail: "An explicit schedule, timezone, and delivery.",
      symbol: "schedule",
    },
  ];
  return (
    <figure
      className="kestri-timeline"
      aria-label="Kestri conversation, memory, and scheduled task lifetimes"
    >
      <div className="timeline-header">
        <span>Beyond a single turn</span>
        <span>Telegram interface</span>
      </div>
      <ol className="time-layers">
        {layers.map((layer) => (
          <li key={layer.time}>
            <div className={`time-symbol ${layer.symbol}`} aria-hidden="true">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                {layer.symbol === "conversation" ? (
                  <path d="M4 4h16v12H9l-5 4V4m4 4h8m-8 4h5" />
                ) : layer.symbol === "memory" ? (
                  <>
                    <path d="M5 5h14v14H5zM9 5v5h6V5M9 19v-5h6v5" />
                  </>
                ) : (
                  <>
                    <circle cx="12" cy="12" r="8" />
                    <path d="M12 7v5l3 2" />
                  </>
                )}
              </svg>
            </div>
            <div>
              <span className="time-label">{layer.time}</span>
              <strong className="time-title">{layer.title}</strong>
              <p>{layer.detail}</p>
            </div>
          </li>
        ))}
      </ol>
      <div className="durable-layer">
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          aria-hidden="true"
        >
          <ellipse cx="12" cy="5" rx="8" ry="3" />
          <path d="M4 5v14c0 4 16 4 16 0V5M4 12c0 4 16 4 16 0" />
        </svg>
        <span>Durable state</span>
        <span>PostgreSQL</span>
      </div>
      <figcaption>
        Application sketch · distinct lifetimes, persisted locally
      </figcaption>
    </figure>
  );
}
