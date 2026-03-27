---
title: "Speed Profile"
category: "Filament-Specific"
priority: "Medium"
description: "Per-feature print speeds — optimal speeds for perimeters, infill, bridges, overhangs, top surfaces, first layer, and travel moves."
---

## What It Is

Speed profile defines different print speeds for different feature types. Perimeters benefit from slower speeds (surface quality), infill can go faster (hidden), bridges need specific speeds (too fast = broken, too slow = sag), and first layers need to be slow (adhesion).

## What It Controls

- Print time (fastest overall without sacrificing quality)
- Surface quality (perimeter speed)
- Overhang quality (overhang speed)
- Bridge success rate (bridge speed)
- First layer adhesion (first layer speed)
- Infill strength and speed tradeoff

## Feature Types

| Feature | Typical Range | Priority |
|---------|--------------|----------|
| First layer | 15-30 mm/s | Adhesion |
| Outer perimeter | 30-60 mm/s | Surface quality |
| Inner perimeter | 40-80 mm/s | Structural |
| Infill | 60-150 mm/s | Speed |
| Top surface | 20-40 mm/s | Surface quality |
| Bridges | 20-40 mm/s | Span success |
| Overhangs | 15-30 mm/s | Quality |
| Travel | 150-300 mm/s | Speed (no extrusion) |

## Why It Varies

- Filament max volumetric flow limits useful speed
- Cooling capacity limits speed (faster = less cooling time)
- Printer mechanical limits (acceleration, vibration)
- Quality requirements differ per part and per feature

## How to Calibrate (Manual)

1. Start with slicer defaults for the material
2. Print test objects focusing on specific features (overhang test, bridge test, etc.)
3. Increase/decrease speed per feature type based on results
4. Limited by max volumetric flow (speed × layer height × line width = mm³/s)

## How the Auto-Tuner Calibrates It

- **Systematic test prints + camera/sensor evaluation** per feature type
- Tests multiple speeds per feature, evaluates quality
- Builds optimal speed profile respecting volumetric flow limits
- Can adapt during live tuning based on per-move feedback

## Related Anomalies

- [Rough Overhangs](../anomalies/rough-overhangs.md) — overhang speed too fast
- [Bridge Sag](../anomalies/bridge-sag.md) — bridge speed wrong (too fast or too slow)
- [Under-extrusion](../anomalies/under-extrusion.md) — speed exceeds volumetric flow capacity
- [Ghosting](../anomalies/ghosting.md) — speed too high for input shaper to compensate
