import { translator, type Locale } from "@/lib/i18n";
/** Readable architecture sketches. Connectors are anchored to the HTML nodes. */
export function SystemArtwork({
  project,
  locale = "en",
}: {
  project: "forge" | "kestri";
  locale?: Locale;
}) {
  const t = translator(locale);
  const forge = project === "forge";
  return (
    <figure className={`system-diagram diagram-${project}`}>
      <div className="diagram-heading">
        <span className="diagram-file">
          {forge ? "execution.flow" : "context.map"}
        </span>
        <h4>
          {forge
            ? t("What happens inside a tool call")
            : t("What continues beyond a conversation")}
        </h4>
        <p>
          {forge
            ? t("Permission is decided before a tool produces side effects.")
            : t("Research, memory, and future tasks have different lifetimes.")}
        </p>
      </div>
      {forge ? (
        <>
          <ol
            className="execution-steps"
            aria-label={t("Tool execution sequence")}
          >
            <li className="system-node">
              <span className="node-label">{t("01 / MODEL")}</span>
              <h5>{t("Propose a tool call")}</h5>
              <p>
                {t("The model supplies a tool name and structured arguments.")}
              </p>
              <code>tool.propose()</code>
              <span className="node-connector" aria-hidden="true">
                →
              </span>
            </li>
            <li className="system-node policy-step">
              <span className="node-label">{t("02 / POLICY")}</span>
              <h5>{t("Check permission")}</h5>
              <p>
                {t("Allow the call, ask for confirmation, or deny execution.")}
              </p>
              <div className="decision-options">
                <span>allow</span>
                <span>confirm</span>
                <span>deny</span>
              </div>
              <span className="node-connector" aria-hidden="true">
                →<small>{t("approved")}</small>
              </span>
            </li>
            <li className="system-node">
              <span className="node-label">{t("03 / TOOL")}</span>
              <h5>{t("Execute approved work")}</h5>
              <p>
                {t(
                  "The tool runs and returns a structured result to the agent loop.",
                )}{" "}
              </p>
              <code>tool.execute()</code>
            </li>
          </ol>
          <div className="persistence-note">
            <span className="record-symbol" aria-hidden="true">
              ↳
            </span>
            <div>
              <strong>{t("Run evidence, recorded throughout")}</strong>
              <p>
                {t(
                  "Traces connect tool proposals, permission decisions, and execution results.",
                )}{" "}
              </p>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="conversation-node system-node">
            <span className="node-label">{t("NOW / CONVERSATION")}</span>
            <h5>{t("Research with sources")}</h5>
            <p>
              {t(
                "Explore a question and keep the references behind the answer.",
              )}
            </p>
          </div>
          <div className="context-branches">
            <div className="context-branch">
              <p className="branch-label">{t("Save explicitly")}</p>
              <div className="system-node">
                <span className="node-label">
                  {t("ACROSS CONVERSATIONS / MEMORY")}{" "}
                </span>
                <h5>{t("Remember useful context")}</h5>
                <p>
                  {t(
                    "Save a preference. Inspect, correct, or forget it later.",
                  )}
                </p>
              </div>
            </div>
            <div className="context-branch">
              <p className="branch-label">{t("Schedule explicitly")}</p>
              <div className="system-node">
                <span className="node-label">{t("LATER / AGREED TASK")}</span>
                <h5>{t("Continue at an agreed time")}</h5>
                <p>
                  {t("Set a schedule, timezone, and delivery destination.")}
                </p>
              </div>
            </div>
          </div>
          <div className="persistence-note">
            <span className="record-symbol" aria-hidden="true">
              ≡
            </span>
            <div>
              <strong>{t("Durable state in PostgreSQL")}</strong>
              <p>
                {t(
                  "Conversation, memory, and task state persist locally across these lifetimes.",
                )}{" "}
              </p>
            </div>
          </div>
        </>
      )}
      <figcaption>
        {t("Architecture sketch ·")}{" "}
        {forge
          ? t("policy is evaluated before execution")
          : t("memory and scheduled tasks have separate lifetimes")}
      </figcaption>
    </figure>
  );
}
