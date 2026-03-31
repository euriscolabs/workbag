---
title: "Max Volumetric Flow"
category: "Filament-Specific"
priority: "High"
description: "The maximum volume of plastic (mm³/s) the hotend can melt and push through the nozzle — the true speed limit for extrusion."
---

## What It Is

Max volumetric flow rate is the maximum volume of plastic (in mm³/s) that the hotend can melt per second. This is the real speed limit — not mm/s travel speed, but how fast plastic can actually be extruded. Exceed it and the extruder grinds, skips, or under-extrudes.

## What It Controls

- Maximum achievable print speed (for each line width and layer height)
- Whether the printer can actually keep up with commanded speed
- Under-extrusion at high speeds

## Why It Varies

- Hotend design (all-metal vs. PTFE-lined, melt zone length)
- Nozzle diameter (0.4mm vs. 0.6mm vs. 0.8mm)
- Material (PLA melts faster than PETG, which melts faster than nylon)
- Temperature (hotter = lower viscosity = higher flow possible)
- Filament quality (additives affect melt behavior)

## How to Calibrate (Manual)

1. Extrude into air at increasing feed rates (e.g., 1, 2, 5, 8, 10, 15 mm³/s)
2. Listen/watch for extruder clicking, grinding, or visible under-extrusion
3. The rate just before failure is your max volumetric flow
4. Set as limit in slicer (e.g., PrusaSlicer: Filament Settings → Max volumetric speed)

## How the Auto-Tuner Calibrates It

- **Roller encoder** monitors actual vs. commanded feed rate at increasing speeds
- Detects the point where actual flow falls behind commanded flow
- No test print needed — just extrude into air at increasing rates

## Related Anomalies

- [Under-extrusion](../anomalies/under-extrusion.md) — printing faster than MVF causes starvation
- [Grinding](../anomalies/grinding.md) — exceeding MVF causes gear to strip filament
