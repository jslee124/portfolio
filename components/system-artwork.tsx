/** Illustrative system views, not application screenshots or live traces. */
export function SystemArtwork({ project }: { project: "forge" | "kestri" }) {
  const forge = project === "forge";
  return (
    <figure className={`system-artwork artwork-${project}`}>
      <div className="artwork-topline">
        <span>
          {forge
            ? "runtime / execution graph"
            : "application / memory constellation"}
        </span>
        <span>Conceptual view</span>
      </div>
      <svg
        viewBox="0 0 1120 450"
        role="img"
        aria-labelledby={`${project}-art-title ${project}-art-description`}
      >
        <title id={`${project}-art-title`}>
          {forge
            ? "From proposal to permission to execution"
            : "A conversation connected to durable memory and future tasks"}
        </title>
        <desc id={`${project}-art-description`}>
          {forge
            ? "A model proposes a tool call. An explicit policy allows, confirms, or denies it before execution. The runtime keeps trace evidence."
            : "Kestri connects research in a conversation with remembered preferences and explicitly scheduled tasks. These distinct lifetimes are persisted in PostgreSQL."}
        </desc>
        <defs>
          <pattern
            id={`${project}-grid`}
            width="28"
            height="28"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M28 0H0V28"
              fill="none"
              stroke="currentColor"
              strokeOpacity=".055"
            />
          </pattern>
          <radialGradient id={`${project}-glow`}>
            <stop stopColor="currentColor" stopOpacity=".13" />
            <stop offset="1" stopColor="currentColor" stopOpacity="0" />
          </radialGradient>
        </defs>
        <rect width="1120" height="450" fill={`url(#${project}-grid)`} />
        <ellipse
          cx="560"
          cy="235"
          rx="330"
          ry="230"
          fill={`url(#${project}-glow)`}
        />
        {forge ? (
          <>
            <g className="art-guides" fill="none" stroke="currentColor">
              <ellipse cx="560" cy="235" rx="215" ry="165" />
              <ellipse
                cx="560"
                cy="235"
                rx="280"
                ry="205"
                strokeDasharray="2 8"
              />
              <path d="M560 12v30m0 375v20M245 235h35m560 0h35" />
            </g>
            <path
              className="art-route"
              d="M145 235H405Q435 235 435 205V165Q435 130 470 130H650Q685 130 685 165V205Q685 235 715 235H970"
            />
            <path
              className="art-route art-return-route"
              d="M970 235v110H145V235"
            />
            <g className="art-node art-node-0" transform="translate(70 194)">
              <rect width="180" height="82" rx="3" />
              <text x="18" y="30" className="art-eyebrow">
                01 / MODEL
              </text>
              <text x="18" y="57">
                tool.propose()
              </text>
            </g>
            <g className="art-core">
              <path
                className="core-frame"
                d="m560 150 75 43v86l-75 43-75-43v-86z"
              />
              <path
                className="core-inner"
                d="m560 165 62 35v70l-62 36-62-36v-70z"
              />
              <path className="core-mark" d="m530 209 25 25-25 25m39 0h25" />
              <text
                x="560"
                y="359"
                textAnchor="middle"
                className="art-core-label"
              >
                FORGE-OWNED LOOP
              </text>
            </g>
            <g className="art-gate art-node-1" transform="translate(461 48)">
              <rect width="198" height="58" rx="3" />
              <text x="99" y="24" textAnchor="middle" className="art-eyebrow">
                02 / POLICY GATE
              </text>
              <text x="99" y="44" textAnchor="middle" className="art-small">
                allow · confirm · deny
              </text>
            </g>
            <g className="art-node art-node-2" transform="translate(870 194)">
              <rect width="180" height="82" rx="3" />
              <text x="18" y="30" className="art-eyebrow">
                03 / TOOL
              </text>
              <text x="18" y="57">
                tool.execute()
              </text>
            </g>
            <g
              className="art-evidence art-node-3"
              transform="translate(73 365)"
            >
              <text className="art-eyebrow">04 / TRACE EVIDENCE</text>
              <text y="24" className="art-small">
                proposal → decision → result
              </text>
            </g>
            <g className="signal-packet">
              <rect x="299" y="231" width="8" height="8" />
              <rect x="805" y="231" width="8" height="8" />
            </g>
            <text x="840" y="387" className="art-small art-muted">
              Authority before side effects.
            </text>
          </>
        ) : (
          <>
            <g className="art-guides" fill="none" stroke="currentColor">
              <ellipse
                cx="560"
                cy="231"
                rx="220"
                ry="169"
                transform="rotate(-20 560 231)"
              />
              <ellipse
                cx="560"
                cy="231"
                rx="286"
                ry="204"
                transform="rotate(12 560 231)"
                strokeDasharray="2 8"
              />
              <path d="M560 8v32m0 365v32" />
            </g>
            <path
              className="art-route"
              d="M245 138 480 209M625 206 871 115M611 279 860 331M521 296 320 364"
            />
            <g className="memory-star">
              <path d="m560 93 24 100 98-41-70 80 70 76-99-37-23 105-25-105-99 37 72-76-72-80 100 41z" />
              <path className="star-inner" d="m560 175 46 56-46 69-47-69z" />
              <text
                x="560"
                y="421"
                textAnchor="middle"
                className="art-core-label"
              >
                CONTEXT THAT CONTINUES
              </text>
            </g>
            <g className="art-node art-node-0" transform="translate(64 85)">
              <rect width="216" height="88" rx="3" />
              <text x="20" y="31" className="art-eyebrow">
                01 / CONVERSATION
              </text>
              <text x="20" y="59">
                research + sources
              </text>
            </g>
            <g className="art-node art-node-1" transform="translate(855 62)">
              <rect width="216" height="88" rx="3" />
              <text x="20" y="31" className="art-eyebrow">
                02 / MEMORY
              </text>
              <text x="20" y="59">
                remember + revise
              </text>
            </g>
            <g className="art-node art-node-2" transform="translate(855 291)">
              <rect width="216" height="88" rx="3" />
              <text x="20" y="31" className="art-eyebrow">
                03 / FUTURE TASK
              </text>
              <text x="20" y="59">
                schedule + deliver
              </text>
            </g>
            <g
              className="art-evidence art-node-3"
              transform="translate(90 336)"
            >
              <path d="M0 0h192v54H0z" />
              <text x="16" y="22" className="art-eyebrow">
                04 / DURABLE STATE
              </text>
              <text x="16" y="42" className="art-small">
                PostgreSQL
              </text>
            </g>
            <g className="constellation-points">
              <path d="M340 60v12m-6-6h12M740 365v12m-6-6h12M760 44v12m-6-6h12" />
              <circle cx="350" cy="277" r="3" />
              <circle cx="740" cy="238" r="3" />
              <circle cx="308" cy="218" r="2" />
            </g>
          </>
        )}
      </svg>
      <ol className="artwork-mobile-steps" aria-label="System responsibilities">
        {(forge
          ? ["Propose", "Decide", "Execute", "Record"]
          : ["Converse", "Remember", "Schedule", "Persist"]
        ).map((label, index) => (
          <li key={label}>
            <span>0{index + 1}</span>
            {label}
          </li>
        ))}
      </ol>
      <figcaption>
        <span className="art-caption-index">{forge ? "A /" : "B /"}</span>
        {forge
          ? "An inspectable execution boundary."
          : "Different lifetimes. One continuous context."}
        <span className="art-caption-detail">
          {forge
            ? "proposal → policy → execution → evidence"
            : "conversation → memory → task → persistence"}
        </span>
      </figcaption>
    </figure>
  );
}
