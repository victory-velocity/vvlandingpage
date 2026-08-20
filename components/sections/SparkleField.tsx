const SPARKLES = [
  { x: 10, y: 12, size: 22, opacity: 0.5 },
  { x: 88, y: 18, size: 13, opacity: 0.3 },
  { x: 92, y: 68, size: 26, opacity: 0.4 },
  { x: 6, y: 76, size: 15, opacity: 0.32 },
  { x: 48, y: 6, size: 11, opacity: 0.22 },
  { x: 62, y: 88, size: 17, opacity: 0.28 },
];

export function SparkleField() {
  return (
    <div className="sparkle-field" aria-hidden="true">
      {SPARKLES.map((s, i) => (
        <span
          key={i}
          className="sparkle"
          style={{ left: `${s.x}%`, top: `${s.y}%`, fontSize: s.size, opacity: s.opacity }}
        >
          ✦
        </span>
      ))}
    </div>
  );
}
