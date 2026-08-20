import { ClaudeIcon } from "./EngineIcons";

const RESULTS = [
  { name: "Rosso & Finch Coffee", cited: false },
  { name: "Your Brand", cited: true },
  { name: "Northshore Coffee Co.", cited: false },
];

export function CitationDemo() {
  return (
    <div className="citation-demo">
      <div className="cd-head">
        <ClaudeIcon />
        <span>Claude</span>
      </div>

      <div className="cd-user">What are the best coffee roasters in Vancouver?</div>

      <div className="cd-answer">
        <p>Here are a few well-regarded coffee roasters in Vancouver:</p>
        <ol className="cd-list">
          {RESULTS.map((r) => (
            <li key={r.name} className={r.cited ? "cited" : undefined}>
              <span className="cd-name">{r.name}</span>
              {r.cited && <span className="cd-badge">Cited</span>}
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
