// React island embedding a Remotion composition via <Player>.
// Usage in MDX (path is root-relative, so editors can ctrl-click it):
//   import AnimationPlayer from "/src/components/AnimationPlayer";
//   <AnimationPlayer src="/src/animations/compositions/printer-specific/ESteps.tsx" client:visible />
import { useMemo } from "react";
import type { ComponentType } from "react";
import { Player } from "@remotion/player";
import { layout } from "../lib/brand";

// Build-time table of every composition, keyed by its source path. The
// glob makes Vite compile each file into its own lazy-loadable chunk;
// nothing is fetched until the player hydrates on screen.
const modules = import.meta.glob<Record<string, ComponentType>>(
  "/src/animations/compositions/**/*.tsx",
);

interface Props {
  /** Root-relative source path of the composition to play. */
  src: string;
}

export default function AnimationPlayer({ src }: Props) {
  const load = modules[src];
  if (!load) {
    throw new Error(
      `No composition at "${src}". Known:\n${Object.keys(modules).join("\n")}`,
    );
  }
  // Compositions use named exports; adapt to the {default} shape
  // lazyComponent expects. Memoized so Player sees a stable reference.
  const lazyComponent = useMemo(
    () => () => load().then((m) => ({ default: m.default ?? Object.values(m)[0]! })),
    [src],
  );
  return (
    <Player
      lazyComponent={lazyComponent}
      durationInFrames={layout.fps * 8}
      fps={layout.fps}
      compositionWidth={layout.width}
      compositionHeight={layout.height}
      controls
      loop
      autoPlay
      style={{ width: "100%", borderRadius: "0.5rem", overflow: "hidden" }}
    />
  );
}
