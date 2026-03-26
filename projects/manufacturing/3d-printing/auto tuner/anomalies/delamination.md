---
title: "Layer Separation / Delamination"
category: "Surface"
severity: "High"
description: "Layers don't bond to each other — the part splits along layer lines under stress or even spontaneously during printing."
---

## What It Is

Layers don't bond to each other — the part splits along layer lines under stress or even spontaneously during printing.

## How It Forms

For two layers to bond, the new layer must partially re-melt the top of the previous layer. This creates a weld at the interface. If the previous layer has cooled too much, or the new material isn't hot enough, the weld is weak or absent.

The bond strength depends on:
1. **Temperature of the new material** — must be hot enough to melt into the layer below
2. **Temperature of the previous layer** — must still be warm enough to accept bonding
3. **Contact pressure** — the nozzle presses the new layer into the old one
4. **Time** — the polymer chains need time to intermingle across the interface

If any of these are insufficient, the interface is weak. The part appears solid but fractures easily along layer lines.

## Visual Signature

- Cracks visible along layer lines
- Parts split when flexed or stressed
- Layers peel apart like pages of a book
- Visible gaps between layers in cross-section
- Part fails at much lower force than expected

## Root Causes

| Cause | Calibration Variable | Direction |
|-------|---------------------|-----------|
| Temperature too low | Extrusion Temp | ↓ |
| Cooling too aggressive | Cooling / Fan Speed | ↑ |
| Layer height too large | — (slicer) | — |
| Under-extrusion | E-Steps, Flow Rate | ↓ |
| Ambient drafts | — (environment) | — |
| Print speed too fast (layer cooling) | Speed Profile | ↑ |

## How the Auto-Tuner Detects It

- **Camera**: Visible gaps between layers on test print cross-section
- **Destructive test** (manual): Break test print and examine fracture surface

## How the Auto-Tuner Fixes It

- **Calibration**: Temperature optimization — find minimum temp for strong bonds. Fan speed calibration per material.
