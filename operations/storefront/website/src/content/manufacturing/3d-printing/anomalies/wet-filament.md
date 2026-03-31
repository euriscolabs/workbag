---
type: "article"
title: "Wet Filament Artifacts"
category: "Structural"
severity: "Medium"
description: "Popping, bubbling, and rough surfaces caused by moisture trapped in the filament turning to steam inside the melt zone."
---

## What It Is

Popping, bubbling, and rough surfaces caused by moisture trapped in the filament turning to steam inside the melt zone.

## How It Forms

Many thermoplastics are hygroscopic — they absorb moisture from the air over time. Common offenders: Nylon (worst), PETG, TPU, PVA, and even PLA in humid environments.

When the wet filament enters the hotend, the water trapped inside the plastic reaches boiling point. Micro-explosions of steam create:

1. **Bubbles** — Steam pockets expand the molten filament, creating voids
2. **Pops** — Larger steam pockets burst at the nozzle, ejecting material unpredictably
3. **Inconsistent flow** — Steam disrupts the smooth flow of molten plastic
4. **Surface roughness** — Crater-like pockmarks where bubbles popped at the surface

The characteristic sound is unmistakable — popping and hissing during extrusion that doesn't happen with dry filament.

## Visual Signature

- Popping/hissing/crackling sounds during printing
- Tiny craters and pockmarks on surface
- Rough, matte finish (vs. smooth when dry)
- Excessive stringing (steam pushes material out during travel)
- Inconsistent extrusion width
- Weak layer adhesion (voids at interfaces)

## Root Causes

| Cause | Calibration Variable | Direction |
|-------|---------------------|-----------|
| Filament stored improperly | — (storage) | — |
| Humid environment | — (environment) | — |
| Hygroscopic material not dried | — (preparation) | — |
| Filament left on printer for days | — (procedure) | — |

## How the Auto-Tuner Detects It

- **Audio** (future): Characteristic popping frequency pattern distinguishable from normal printing sounds
- **Roller encoder**: Erratic flow variations that don't correlate with speed changes
- **Camera**: Surface roughness/crater pattern distinctive to wet filament

## How the Auto-Tuner Fixes It

- **Detection only** — Can identify wet filament symptoms and alert user to dry the spool. Cannot dry filament in-place.
- **Differentiation**: Important to distinguish wet filament artifacts from partial clog or temperature issues — the fix is completely different.
