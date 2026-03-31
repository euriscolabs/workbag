---
type: "article"
title: "Rough Overhangs"
category: "Surface"
severity: "Medium"
description: "The underside of overhanging features is rough, droopy, or curled. Quality degrades progressively with steeper angles."
---

## What It Is

The underside of overhanging features is rough, droopy, or curled. Quality degrades progressively with steeper angles.

## How It Forms

Overhangs deposit material partially (or fully) over air. Gravity pulls the molten plastic downward before it solidifies. The steeper the overhang, the less support from the layer below, and the more the deposited line droops.

Cooling is the primary defense — the faster the plastic solidifies after deposition, the less it droops. Speed matters too: slower printing gives more time for gravity to act on each unsupported line.

At angles beyond ~45° (without support), most printers start showing visible degradation. At 60°+, the undersurface gets rough. At 80°+, the material curls and drips.

## Visual Signature

- Rough, bumpy underside on angled features
- Curled edges at steep overhang angles
- Drooping/sagging material that deforms downward
- Stalagmite-like drips at extreme angles
- Quality degrades smoothly with increasing angle

## Root Causes

| Cause | Calibration Variable | Direction |
|-------|---------------------|-----------|
| Cooling too low | Cooling / Fan Speed | ↓ |
| Speed too fast | Speed Profile (overhang) | ↑ |
| Temperature too hot | Extrusion Temp | ↑ |
| Overhang angle > 45° without support | — (design/slicer) | — |

## How the Auto-Tuner Detects It

- **Camera**: Overhang test print with graduated angles (20° to 80°). Camera evaluates surface quality at each angle to find the maximum clean overhang angle for this filament+settings combo.

## How the Auto-Tuner Fixes It

- **Calibration**: Optimize fan speed and overhang speed per filament. Find the sweet spot where overhang quality is acceptable without weakening layer adhesion.
- **Live tuning**: Adaptive speed — slow down and increase fan when printing detected overhangs.
