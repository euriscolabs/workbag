---
title: "Under-extrusion"
category: "Extrusion"
severity: "High"
description: "Not enough material deposited — the printer commands X amount of plastic but less comes out of the nozzle. Results in gaps, thin walls, and structurally weak parts."
---

## What It Is

Not enough material deposited — the printer commands X amount of plastic but less comes out of the nozzle. Results in gaps, thin walls, and structurally weak parts.

## How It Forms

The extruder motor turns the commanded number of steps, but the actual filament reaching the nozzle is less than expected. This can happen at multiple points in the filament path:

1. **At the gear** — The drive gear slips on the filament instead of gripping. Each step pushes less than 1mm. Common with worn gears, wrong tension, or slippery filament.
2. **In the heatbreak** — Filament partially softens too early (heat creep), swelling and creating friction. The gear pushes but the filament resists.
3. **In the melt zone** — Temperature too low for the print speed. Filament can't melt fast enough — the gear pushes solid filament against a semi-solid plug.
4. **At the nozzle** — Partial clog restricts flow. Commanded volume can't fit through the reduced opening.

The result is the same regardless of cause: deposited lines are thinner than they should be.

## Visual Signature

- Gaps between perimeters (inner wall visible from outside)
- Infill pattern visible through shell walls
- Rough, sparse top surfaces
- Parts that snap easily along layer lines
- Inconsistent line width (some sections fine, others thin)

## Root Causes

| Cause | Calibration Variable | Direction |
|-------|---------------------|-----------|
| E-steps too low | E-Steps | ↓ |
| Flow multiplier too low | Flow Rate | ↓ |
| Temperature too cold | Extrusion Temp | ↓ |
| Printing faster than hotend can melt | Max Volumetric Flow | exceeded |
| Partial nozzle clog | — (maintenance) | — |
| Worn extruder gear | — (hardware) | — |
| Filament diameter variation | Flow Rate / diameter sensor | varies |
| Tangled or binding spool | — (mechanical) | — |

## How the Auto-Tuner Detects It

- **Roller encoder**: Actual filament movement < commanded → immediate detection
- **Camera**: Visible gaps between perimeters, thin lines compared to reference
- **Weight sensor** (future): Deposited material weight < expected

## How the Auto-Tuner Fixes It

- **Calibration**: Correct E-steps, adjust flow multiplier, find right temperature
- **Live tuning**: Flow compensation increases extrusion rate when encoder detects slip
- **Anomaly detection**: Camera flags inconsistent line width for review
