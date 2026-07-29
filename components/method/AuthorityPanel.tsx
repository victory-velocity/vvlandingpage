import type { Step } from "./steps";

export function AuthorityPanel({ panel }: { panel: NonNullable<Step["panel"]> }) {
  return (
    <div className="authority-panel">
      <p className="authority-quote">{panel.quote}</p>
      <p className="authority-note">{panel.note}</p>
    </div>
  );
}
