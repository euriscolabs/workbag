---
title: "Z-Banding / Z-Wobble"
category: "Motion"
severity: "Medium"
description: "Regular horizontal lines or ridges at consistent Z intervals. Visible and tangible on the surface of the print."
---

## What It Is

Regular horizontal lines or ridges at consistent Z intervals. Visible and tangible on the surface of the print.

## How It Forms

The Z-axis moves in discrete steps to raise the nozzle between layers. If this movement isn't perfectly smooth, the nozzle ends up slightly closer or further from the previous layer at regular intervals.

Common mechanical causes:

1. **Bent lead screw** — The screw wobbles as it rotates, pushing the nozzle in and out. The pattern repeats every full rotation of the screw.
2. **Z-coupler misalignment** — The coupling between motor and lead screw introduces periodic error.
3. **Inconsistent Z-steps** — Microstepping irregularities create a pattern every full step.
4. **Binding on Z-axis** — V-wheels or linear bearings stick at certain positions, then release suddenly.

The spacing of the bands matches the mechanical periodicity — often exactly one lead screw pitch (typically 2mm or 8mm).

## Visual Signature

- Regular horizontal ridges you can feel with a fingernail
- Consistent spacing (measure it — it'll match the lead screw pitch)
- Visible under raking light (light from the side)
- Present on all surfaces at the same Z heights
- Not related to print features — purely periodic

## Root Causes

| Cause | Calibration Variable | Direction |
|-------|---------------------|-----------|
| Bent lead screw | — (hardware) | — |
| Z-coupler misalignment | — (hardware) | — |
| Inconsistent Z microstepping | Axis Steps (Z) | — |
| V-wheels too tight/loose | — (maintenance) | — |
| Anti-backlash nut worn | Backlash | — |

## How the Auto-Tuner Detects It

- **Camera**: Periodic pattern detection on flat test surfaces
- **Dial indicator**: Measure actual Z position vs. commanded at multiple points

## How the Auto-Tuner Fixes It

- **Detection only** — Z-banding is a hardware issue. The auto-tuner can diagnose it and tell you what to fix (replace bent screw, realign coupler) but can't fix it in firmware.
