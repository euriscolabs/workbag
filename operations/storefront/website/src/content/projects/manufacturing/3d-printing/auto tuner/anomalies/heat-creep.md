---
title: "Heat Creep"
category: "Structural"
severity: "High"
description: "Heat travels too far up the heatbreak, softening filament before it reaches the melt zone. Eventually causes a jam."
---

## What It Is

Heat travels too far up the heatbreak, softening filament before it reaches the melt zone. Eventually causes a jam.

## How It Forms

The heatbreak is designed to be a thermal barrier — hot below (heater block, 200°C+), cold above (heatsink, ~40°C). This gradient keeps filament solid in the cold zone and molten only in the melt zone.

Over time, especially on long prints, heat slowly conducts upward through the heatbreak. The "transition zone" where filament is semi-soft creeps higher. When it reaches the extruder gear area:

1. Filament swells as it softens (thermal expansion)
2. Swollen filament creates friction against the walls
3. Extruder gear pushes against increasing resistance
4. Eventually the plug of softened filament jams completely

Retraction accelerates heat creep — each retract/prime cycle pumps warm filament up and down through the heatbreak, transferring heat upward.

## Visual Signature

- Gradual under-extrusion that worsens over hours
- Extrusion starts fine, degrades slowly
- Extruder starts clicking as resistance builds
- Eventually stops extruding entirely
- Print failure typically happens 2-6 hours into long prints

## Root Causes

| Cause | Calibration Variable | Direction |
|-------|---------------------|-----------|
| Hotend fan not working | — (hardware) | — |
| Temperature too high | Extrusion Temp | ↑ |
| Excessive retraction | Retraction | ↑ (frequency) |
| Long print time | — (inherent) | — |
| Poor heatbreak thermal design | — (hardware) | — |
| All-metal heatbreak (no PTFE liner) | — (hardware) | — |

## How the Auto-Tuner Detects It

- **Roller encoder**: Gradual increasing discrepancy between commanded and actual flow over time. The signature is a slow ramp, not a sudden drop.
- **Temperature sensor** (on heatbreak): Directly measures if heat is creeping up.

## How the Auto-Tuner Fixes It

- **Live tuning**: Temperature compensation — if encoder shows gradual flow drop over hours, system can lower hotend temp slightly, increase retraction speed, or pause for cool-down.
- **Prevention**: Calibrated retraction minimizes unnecessary filament pumping. PA reduces retraction needs.
