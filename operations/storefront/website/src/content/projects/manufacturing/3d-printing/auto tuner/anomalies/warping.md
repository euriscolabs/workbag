---
title: "Warping"
category: "Adhesion"
severity: "High"
description: "Corners and edges of the print curl upward, lifting from the bed. In severe cases, the part detaches entirely."
---

## What It Is

Corners and edges of the print curl upward, lifting from the bed. In severe cases, the part detaches entirely.

## How It Forms

All thermoplastics shrink as they cool. The bottom layer is held flat by bed adhesion. As upper layers cool and contract, they pull on the layers below. This creates a bending moment — the edges want to curl up.

The physics: imagine a bimetallic strip. Hot layers on top, cooled layers below. The temperature gradient creates differential contraction. The wider and flatter the part, the more leverage the contracting layers have on the corners.

Materials with high shrinkage (ABS ~0.7%, ASA, Nylon) warp much more than low-shrinkage materials (PLA ~0.3%, PETG ~0.4%).

## Visual Signature

- Corners lifting off the bed
- Banana-shaped parts (curved along longest axis)
- First layer peeling from edges
- Cracks at the base where warp forces exceed layer adhesion
- Part rocks on a flat surface (not flat on bottom)

## Root Causes

| Cause | Calibration Variable | Direction |
|-------|---------------------|-----------|
| Bed temp too low | Bed Temperature | ↓ |
| Part cooling too aggressive | Cooling / Fan Speed | ↑ |
| No enclosure (ambient drafts) | — (environment) | — |
| Large flat geometry | — (design) | — |
| High-shrinkage material | — (material property) | — |
| Bed adhesion insufficient | Z-Offset, Bed Mesh | — |

## How the Auto-Tuner Detects It

- **Camera**: Edge detection comparing printed outline to expected outline. Lifted corners visible as shadow/gap between part and bed.
- **Strain gauge** (future): Measure bed adhesion force — dropping adhesion at corners predicts warp before visible lifting.

## How the Auto-Tuner Fixes It

- **Calibration**: Optimize bed temp per filament. Reduce fan speed for first layers.
- **Live tuning**: Camera detects early warping → increase bed temp, reduce fan, slow down
