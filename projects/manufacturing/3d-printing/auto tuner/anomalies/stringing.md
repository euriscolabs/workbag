---
title: "Stringing / Oozing"
category: "Extrusion"
severity: "Medium"
description: "Thin threads of plastic stretched between features during travel moves. Ranges from fine hairs to thick strings."
---

## What It Is

Thin threads of plastic stretched between features during travel moves. Ranges from fine hairs to thick strings.

## How It Forms

When the nozzle travels from one point to another without printing, residual pressure in the melt zone pushes molten plastic out. The nozzle moves away, stretching the oozing plastic into a thread.

The physics: the melt zone acts like a pressure vessel. Molten plastic is compressed by the extruder gear above. When the gear stops (or even retracts), it takes time for the pressure to equalize. During that time, plastic drools from the nozzle tip.

Retraction pulls the filament back to relieve this pressure. Pressure Advance pre-decompresses before stopping. Both fight the same problem from different angles.

## Visual Signature

- Hair-like threads between towers/features
- Cobweb patterns across open areas
- Blobs at travel start/end points
- Worse with taller, spread-out features
- More visible on dark filaments

## Root Causes

| Cause | Calibration Variable | Direction |
|-------|---------------------|-----------|
| Not enough retraction | Retraction | ↓ |
| Temperature too hot | Extrusion Temp | ↑ |
| No Pressure Advance | Pressure Advance | ↓ |
| Travel speed too slow | Speed Profile (travel) | ↓ |
| Wet filament (steam creates oozing) | — (filament condition) | — |

## How the Auto-Tuner Detects It

- **Camera**: Backlit shadow analysis detects thin threads between features. Contrast stringing test image against clean reference.
- **Pattern analysis**: Stringing test print (two towers) evaluated at multiple retraction/temp values

## How the Auto-Tuner Fixes It

- **Calibration**: Automated stringing test at multiple retraction distances + speeds. Camera evaluates each. Finds minimum retraction that eliminates strings.
- **Temperature interaction**: Tests retraction at multiple temperatures since hotter = more stringing
