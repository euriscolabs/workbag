// Registry of all Remotion compositions, keyed by the slug of the content
// page they illustrate (e.g. manufacturing/3d-printing/calibration/e-steps).
// Entries are lazy import thunks so a page only ever loads the composition
// it embeds — fed to <Player lazyComponent> for per-animation code splitting.
import type { ComponentType } from "react";

type LazyComposition = () => Promise<{ default: ComponentType }>;

export const animations = {
  // Printer-specific calibrations
  "axis-steps": () =>
    import("./compositions/printer-specific/AxisSteps").then((m) => ({ default: m.AxisSteps })),
  "e-steps": () =>
    import("./compositions/printer-specific/ESteps").then((m) => ({ default: m.ESteps })),
  "pid-tuning": () =>
    import("./compositions/printer-specific/PidTuning").then((m) => ({ default: m.PidTuning })),
  "bed-mesh": () =>
    import("./compositions/printer-specific/BedMesh").then((m) => ({ default: m.BedMesh })),
  "z-offset": () =>
    import("./compositions/printer-specific/ProbeZOffset").then((m) => ({ default: m.ProbeZOffset })),
  "belt-tension": () =>
    import("./compositions/printer-specific/BeltTension").then((m) => ({ default: m.BeltTension })),
  "input-shaper": () =>
    import("./compositions/printer-specific/InputShaper").then((m) => ({ default: m.InputShaper })),
  "backlash": () =>
    import("./compositions/printer-specific/Backlash").then((m) => ({ default: m.Backlash })),
  "skew-compensation": () =>
    import("./compositions/printer-specific/SkewCompensation").then((m) => ({ default: m.SkewCompensation })),
  "max-acceleration": () =>
    import("./compositions/printer-specific/MaxAccelVelocity").then((m) => ({ default: m.MaxAccelVelocity })),

  // Filament-specific calibrations
  "extrusion-temperature": () =>
    import("./compositions/filament-specific/ExtrusionTemp").then((m) => ({ default: m.ExtrusionTemp })),
  "flow-rate": () =>
    import("./compositions/filament-specific/FlowRate").then((m) => ({ default: m.FlowRate })),
  "retraction": () =>
    import("./compositions/filament-specific/Retraction").then((m) => ({ default: m.Retraction })),
  "pressure-advance": () =>
    import("./compositions/filament-specific/PressureAdvance").then((m) => ({ default: m.PressureAdvance })),
  "max-volumetric-flow": () =>
    import("./compositions/filament-specific/MaxVolumetricFlow").then((m) => ({ default: m.MaxVolumetricFlow })),
  "bed-temperature": () =>
    import("./compositions/filament-specific/BedTemp").then((m) => ({ default: m.BedTemp })),
  "cooling": () =>
    import("./compositions/filament-specific/CoolingFan").then((m) => ({ default: m.CoolingFan })),
  "speed-profile": () =>
    import("./compositions/filament-specific/SpeedProfile").then((m) => ({ default: m.SpeedProfile })),

  // Live tuning
  "adaptive-speed": () =>
    import("./compositions/live-tuning/AdaptiveSpeed").then((m) => ({ default: m.AdaptiveSpeed })),
  "temp-compensation": () =>
    import("./compositions/live-tuning/TempCompensation").then((m) => ({ default: m.TempCompensation })),
  "flow-compensation": () =>
    import("./compositions/live-tuning/FlowCompensation").then((m) => ({ default: m.FlowCompensation })),
  "anomaly-detection": () =>
    import("./compositions/live-tuning/AnomalyDetection").then((m) => ({ default: m.AnomalyDetection })),
} satisfies Record<string, LazyComposition>;

export type AnimationName = keyof typeof animations;
