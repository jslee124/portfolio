import { translator, type Locale } from "@/lib/i18n";
export function ForgeFlow({ locale = "en" }: { locale?: Locale }) {
  const t = translator(locale);
  return (
    <figure
      className="forge-flow"
      aria-label={t("Simplified Forge tool execution flow")}
    >
      <div className="flow-header">
        <span>{t("Inside a tool call")}</span>
        <span className="flow-key">
          <i /> {t("Native runtime")}{" "}
        </span>
      </div>
      <div className="flow-track">
        <div className="flow-node">
          <span className="flow-port" aria-hidden="true" />
          <span className="flow-kind">{t("Model")}</span>
          <strong>{t("Propose a tool call")}</strong>
          <p>{t("Structured name + arguments")}</p>
        </div>
        <div className="flow-node policy-node">
          <span className="flow-port" aria-hidden="true" />
          <span className="flow-kind">{t("Policy")}</span>
          <strong>{t("Decide before execution")}</strong>
          <div className="policy-outcomes">
            <span>allow</span>
            <span>confirm</span>
            <span>deny</span>
          </div>
        </div>
        <div className="flow-node">
          <span className="flow-port" aria-hidden="true" />
          <span className="flow-kind">{t("Tool")}</span>
          <strong>{t("Execute approved work")}</strong>
          <p>{t("Return a structured result")}</p>
        </div>
      </div>
      <div className="flow-return">
        <span aria-hidden="true">↳</span> {t("Continue the loop")}{" "}
        <span className="trace-label">{t("Record run evidence")}</span>
      </div>
      <figcaption>
        {t(
          "Architecture sketch · policy is evaluated before side effects",
        )}{" "}
      </figcaption>
    </figure>
  );
}

export function KestriTimeline({ locale = "en" }: { locale?: Locale }) {
  const t = translator(locale);
  const layers = [
    {
      time: t("Now"),
      title: t("A conversation"),
      detail: t("Research a question. Keep the sources."),
      symbol: "conversation",
    },
    {
      time: t("Across conversations"),
      title: t("A remembered preference"),
      detail: t("Save, inspect, correct, or forget."),
      symbol: "memory",
    },
    {
      time: t("Later"),
      title: t("An agreed task"),
      detail: t("An explicit schedule, timezone, and delivery."),
      symbol: "schedule",
    },
  ];
  return (
    <figure
      className="kestri-timeline"
      aria-label={t(
        "Kestri conversation, memory, and scheduled task lifetimes",
      )}
    >
      <div className="timeline-header">
        <span>{t("Beyond a single turn")}</span>
        <span>{t("Telegram interface")}</span>
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
        <span>{t("Durable state")}</span>
        <span>PostgreSQL</span>
      </div>
      <figcaption>
        {t("Application sketch · distinct lifetimes, persisted locally")}{" "}
      </figcaption>
    </figure>
  );
}
