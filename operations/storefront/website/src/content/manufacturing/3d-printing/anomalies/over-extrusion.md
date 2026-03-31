---
type: "article"
title: "Over-extrusion"
category: "Extrusion"
severity: "Medium"
description: "Too much material deposited — excess plastic has nowhere to go, so it bulges outward, upward, or accumulates on the nozzle."
---

## What It Is

Too much material deposited — excess plastic has nowhere to go, so it bulges outward, upward, or accumulates on the nozzle.

## How It Forms

More filament is pushed through the nozzle than the toolpath geometry can accommodate. The excess material:

1. **Bulges outward** — Walls become wider than designed, parts are dimensionally oversized
2. **Pushes upward** — Creates bumps and rough surfaces as excess stacks on previous layers
3. **Accumulates on the nozzle** — Molten plastic curls back up around the nozzle tip, eventually falling as blobs

On first layers, over-extrusion is amplified because the nozzle squishes excess material against the bed — this is how elephant foot forms.

## Visual Signature

- Rough, bumpy surfaces
- Dimensional inaccuracy (parts too large)
- Elephant foot on first layers
- Filament curling around nozzle tip
- Blobs and raised seam lines
- Hard to insert parts into designed holes

## Root Causes

| Cause | Calibration Variable | Direction |
|-------|---------------------|-----------|
| E-steps too high | E-Steps | ↑ |
| Flow multiplier too high | Flow Rate | ↑ |
| Temperature too hot | Extrusion Temp | ↑ |
| Nozzle too close to bed | Z-Offset | ↓ (too close) |
| Filament diameter larger than slicer expects | Flow Rate | effective ↑ |

## How the Auto-Tuner Detects It

- **Roller encoder**: Actual filament movement matches commanded but walls are too thick → flow calibration needed
- **Camera**: Surface roughness analysis, dimensional comparison to model

## How the Auto-Tuner Fixes It

- **Calibration**: Correct E-steps, reduce flow multiplier, lower temperature
- **Live tuning**: Encoder monitors that commanded and actual match — if they do and walls are still thick, it's a flow multiplier issue flagged for recalibration
