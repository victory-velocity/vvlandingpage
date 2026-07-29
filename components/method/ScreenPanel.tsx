import Image from "next/image";
import type { Step } from "./steps";

export function ScreenPanel({ shot }: { shot: NonNullable<Step["shot"]> }) {
  return (
    <div className="screen-panel">
      <Image
        src={shot.src}
        alt={shot.alt}
        width={shot.width}
        height={shot.height}
        sizes="(max-width: 900px) 100vw, 55vw"
      />
    </div>
  );
}
