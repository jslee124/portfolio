/** Readable architecture sketches. Connectors are anchored to the HTML nodes. */
export function SystemArtwork({ project }: { project: "forge" | "kestri" }) {
  const forge = project === "forge";
  return (
    <figure className={`system-diagram diagram-${project}`}>
      <div className="diagram-heading">
        <span className="diagram-file">
          {forge ? "execution.flow" : "context.map"}
        </span>
        <h4>
          {forge
            ? "What happens inside a tool call"
            : "What continues beyond a conversation"}
        </h4>
        <p>
          {forge
            ? "Permission is decided before a tool produces side effects."
            : "Research, memory, and future tasks have different lifetimes."}
        </p>
      </div>
      {forge ? (
        <>
          <ol className="execution-steps" aria-label="Tool execution sequence">
            <li className="system-node">
              <span className="node-label">01 / MODEL</span>
              <h5>Propose a tool call</h5>
              <p>The model supplies a tool name and structured arguments.</p>
              <code>tool.propose()</code>
              <span className="node-connector" aria-hidden="true">
                →
              </span>
            </li>
            <li className="system-node policy-step">
              <span className="node-label">02 / POLICY</span>
              <h5>Check permission</h5>
              <p>Allow the call, ask for confirmation, or deny execution.</p>
              <div className="decision-options">
                <span>allow</span>
                <span>confirm</span>
                <span>deny</span>
              </div>
              <span className="node-connector" aria-hidden="true">
                →<small>approved</small>
              </span>
            </li>
            <li className="system-node">
              <span className="node-label">03 / TOOL</span>
              <h5>Execute approved work</h5>
              <p>
                The tool runs and returns a structured result to the agent loop.
              </p>
              <code>tool.execute()</code>
            </li>
          </ol>
          <div className="persistence-note">
            <span className="record-symbol" aria-hidden="true">
              ↳
            </span>
            <div>
              <strong>Run evidence, recorded throughout</strong>
              <p>
                Traces connect tool proposals, permission decisions, and
                execution results.
              </p>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="conversation-node system-node">
            <span className="node-label">NOW / CONVERSATION</span>
            <h5>Research with sources</h5>
            <p>Explore a question and keep the references behind the answer.</p>
          </div>
          <div className="context-branches">
            <div className="context-branch">
              <p className="branch-label">Save explicitly</p>
              <div className="system-node">
                <span className="node-label">
                  ACROSS CONVERSATIONS / MEMORY
                </span>
                <h5>Remember useful context</h5>
                <p>Save a preference. Inspect, correct, or forget it later.</p>
              </div>
            </div>
            <div className="context-branch">
              <p className="branch-label">Schedule explicitly</p>
              <div className="system-node">
                <span className="node-label">LATER / AGREED TASK</span>
                <h5>Continue at an agreed time</h5>
                <p>Set a schedule, timezone, and delivery destination.</p>
              </div>
            </div>
          </div>
          <div className="persistence-note">
            <span className="record-symbol" aria-hidden="true">
              ≡
            </span>
            <div>
              <strong>Durable state in PostgreSQL</strong>
              <p>
                Conversation, memory, and task state persist locally across
                these lifetimes.
              </p>
            </div>
          </div>
        </>
      )}
      <figcaption>
        Architecture sketch ·{" "}
        {forge
          ? "policy is evaluated before execution"
          : "memory and scheduled tasks have separate lifetimes"}
      </figcaption>
    </figure>
  );
}
