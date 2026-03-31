---
type: "article"
title: "Bed Mesh / ABL"
category: "Printer-Specific"
priority: "High"
description: "Automatic bed leveling — probes the bed surface to create a mesh that compensates for unevenness during printing."
---

## What It Is

Bed mesh leveling probes the print surface at a grid of points to map its topology. The firmware then compensates Z-height in real-time during printing, maintaining consistent first-layer height even on a warped or tilted bed.

## What It Controls

- First layer consistency across the entire bed
- Adhesion uniformity
- First layer height accuracy

## Why It Drifts

- Bed physically warps over time (thermal cycling)
- Bed mounting screws loosen
- Print surface replacement (different flatness)
- Frame flex or settling

## How to Calibrate (Manual)

1. Heat bed to printing temperature (thermal expansion affects flatness)
2. Run `G29` to probe the bed automatically
3. Save mesh with `M500`
4. Add `G29` or `M420 S1` to start G-code to load mesh before each print

## How the Auto-Tuner Calibrates It

- **Already automatable** via G-code `G29` — the auto-tuner triggers probing and saves the result
- Can schedule periodic re-probing based on print hours or temperature cycles

## Related Anomalies

- [Adhesion Failure](../anomalies/adhesion-failure.md) — uneven bed causes poor first layer contact
- [Warping](../anomalies/warping.md) — inconsistent first layer height contributes to warping
- [Elephant Foot](../anomalies/elephant-foot.md) — nozzle too close in some areas from bad mesh
