---
title: "3D Printing"
description: "3D printing research, calibration knowledge, and projects — anomalies, calibration variables, and automation."
status: "In Progress"
category: "Manufacturing"
tags: ["3D Printing", "Hardware", "Documentation"]
published: true
---

## Overview

Research and documentation for 3D printing — from understanding print defects to calibrating every variable, and ultimately automating the entire process.

## Printer

| Spec             | Value                      |
| ---------------- | -------------------------- |
| **Model**        | Prusa XL 5-tool            |
| **Build Volume** | 360x360x360 mm             |
| **Extruders**    | 5 (multi-material capable) |

## Projects

- [3D Printer Auto-Tuner](./auto%20tuner/index.md) — Automatic calibration system using sensors, CV, and G-code automation
- [Filament Spool Holder](./filament%20spool%20holder/index.md) — All-in-one drybox, inline cleaner, and jam-safety cutter
- [Filament Recycler](./filament%20recycler/index.md) — Recycle failed prints into usable filament with closed-loop quality control

## Calibration Variables

The parameters that control print quality. Each one documented with what it does, why it drifts, how to calibrate it manually, and how the auto-tuner approaches it.

### Printer-Specific (once / hardware changes)

Calibrate in this order — each step depends on the previous:

1. [E-Steps](./calibration/e-steps.md) — Extruder steps/mm, foundation of extrusion accuracy
2. [Axis Steps/mm](./calibration/axis-steps.md) — Positional accuracy per axis
3. [PID Tuning](./calibration/pid-tuning.md) — Temperature control stability
4. [Bed Mesh / ABL](./calibration/bed-mesh.md) — Bed surface compensation
5. [Probe Z-Offset](./calibration/z-offset.md) — True first layer height
6. [Input Shaper](./calibration/input-shaper.md) — Vibration compensation
7. [Belt Tension](./calibration/belt-tension.md) — Motion system tension
8. [Backlash Compensation](./calibration/backlash.md) — Direction reversal play
9. [Skew Compensation](./calibration/skew-compensation.md) — Axis perpendicularity
10. [Max Acceleration / Velocity](./calibration/max-acceleration.md) — Speed and acceleration limits

### Filament-Specific (per spool)

Calibrate in this order after printer-specific is done:

1. [Extrusion Temperature](./calibration/extrusion-temperature.md) — Optimal melt temperature per filament
2. [Flow Rate](./calibration/flow-rate.md) — Extrusion multiplier fine-tuning
3. [Max Volumetric Flow](./calibration/max-volumetric-flow.md) — True speed limit for extrusion
4. [Pressure Advance](./calibration/pressure-advance.md) — Melt zone pressure compensation
5. [Retraction](./calibration/retraction.md) — Anti-ooze filament pullback
6. [Bed Temperature](./calibration/bed-temperature.md) — Heated bed for adhesion and warping
7. [Cooling / Fan Speed](./calibration/cooling.md) — Part cooling for overhangs and bridges
8. [Speed Profile](./calibration/speed-profile.md) — Per-feature optimal print speeds

## Anomalies

Common 3D printing defects — what they are, how they form, and which calibration variables cause them.

### Extrusion Anomalies
- [Under-extrusion](./anomalies/under-extrusion.md)
- [Over-extrusion](./anomalies/over-extrusion.md)
- [Stringing / Oozing](./anomalies/stringing.md)
- [Blobs / Zits](./anomalies/blobs.md)
- [Grinding / Stripping](./anomalies/grinding.md)

### Adhesion Anomalies
- [Warping](./anomalies/warping.md)
- [Elephant Foot](./anomalies/elephant-foot.md)
- [First Layer Adhesion Failure](./anomalies/adhesion-failure.md)

### Motion Anomalies
- [Ghosting / Ringing](./anomalies/ghosting.md)
- [Layer Shift](./anomalies/layer-shift.md)
- [Z-Banding / Z-Wobble](./anomalies/z-banding.md)
- [Backlash Artifacts](./anomalies/backlash-artifacts.md)

### Surface Anomalies
- [Layer Separation / Delamination](./anomalies/delamination.md)
- [Pillowing](./anomalies/pillowing.md)
- [Scarring / Nozzle Marks](./anomalies/scarring.md)
- [Rough Overhangs](./anomalies/rough-overhangs.md)
- [Bridge Sag](./anomalies/bridge-sag.md)

### Structural Anomalies
- [Spaghetti](./anomalies/spaghetti.md)
- [Heat Creep](./anomalies/heat-creep.md)
- [Clogging / Partial Clog](./anomalies/clogging.md)
- [Wet Filament Artifacts](./anomalies/wet-filament.md)
- [Thermal Shock Cracking](./anomalies/thermal-cracking.md)

## Materials & Profiles

| Material | Brand | Temp (Nozzle/Bed) | Status         |
| -------- | ----- | ----------------- | -------------- |
| PLA      | -     | -                 | Not configured |
| PETG     | -     | -                 | Not configured |
| TPU      | -     | -                 | Not configured |
