// React island embedding a Remotion composition via <Player>.
// Usage in MDX:
//   import AnimationPlayer from "/src/components/AnimationPlayer";
//   <AnimationPlayer name="e-steps" client:visible />
import { Player } from "@remotion/player";
import { animations, type AnimationName } from "../animations/registry";
import { layout } from "../animations/brand";

interface Props {
  name: AnimationName;
}

export default function AnimationPlayer({ name }: Props) {
  const lazyComponent = animations[name];
  if (!lazyComponent) {
    throw new Error(
      `Unknown animation "${name}". Known: ${Object.keys(animations).join(", ")}`,
    );
  }
  return (
    <Player
      lazyComponent={lazyComponent}
      durationInFrames={layout.fps * 8}
      fps={layout.fps}
      compositionWidth={layout.width}
      compositionHeight={layout.height}
      controls
      loop
      style={{ width: "100%", borderRadius: "0.5rem", overflow: "hidden" }}
    />
  );
}
