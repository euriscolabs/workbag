---
title: "Pressure Advance"
category: "Filament-Specific"
priority: "High"
description: "Compensates for pressure buildup and release in the melt zone — pre-decompresses before decelerations to prevent bulging at corners and oozing at stops."
---

## What It Is

Pressure Advance (Klipper) / Linear Advance (Marlin) compensates for the elastic compression of molten filament in the melt zone. Without it, corners bulge (pressure built up during the straight) and starts of lines are thin (pressure not yet built up).

## What It Controls

- Corner quality (sharp vs. bulging corners)
- Line width consistency during speed changes
- Start/end of line quality
- Works with retraction to reduce stringing

## Why It Varies

- Filament type (each material has different melt viscosity and compressibility)
- Temperature affects viscosity
- Bowden tube length (longer tube = more compression = higher PA value)
- Nozzle diameter

## How to Calibrate (Manual)

1. Print a Pressure Advance test pattern (lines at varying PA values)
2. Look for the line where acceleration/deceleration zones match constant-speed zones
3. Set `pressure_advance` (Klipper) or `M900 K<value>` (Marlin)
4. Typical values: 0.02-0.08 (direct drive), 0.3-1.0 (Bowden)

## How the Auto-Tuner Calibrates It

- **Camera + line width analysis** on PA test pattern
- Measures line width consistency across speed transitions
- Automatically identifies the PA value where line width is most uniform

## Related Anomalies

- [Blobs](../anomalies/blobs.md) — no PA causes pressure buildup at corners/seams
- [Stringing](../anomalies/stringing.md) — PA reduces residual pressure that causes oozing
- [Under-extrusion](../anomalies/under-extrusion.md) — PA too high starves the beginning of lines
