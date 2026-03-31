---
type: "article"
title: "Retraction"
category: "Filament-Specific"
priority: "High"
description: "Pulling filament back before travel moves to relieve melt zone pressure and prevent oozing. Defined by distance and speed."
---

## What It Is

Retraction pulls the filament backward before the nozzle travels to a new location. This relieves pressure in the melt zone so molten plastic doesn't drool out during the move. Two key parameters: retraction distance (how far to pull back) and retraction speed (how fast).

## What It Controls

- Stringing/oozing during travel moves
- Blob formation at travel start/end points
- Print cleanliness on multi-feature prints

## Why It Varies

- Direct drive vs. Bowden (Bowden needs much more retraction: 4-7mm vs. 0.5-2mm)
- Material viscosity (PETG strings more than PLA)
- Temperature affects how much retraction is needed
- Nozzle diameter (larger nozzles = more residual pressure)

## How to Calibrate (Manual)

1. Print a stringing test (two towers with gap)
2. Start with recommended retraction for your setup
3. Vary distance in 0.5mm steps (direct drive) or 1mm steps (Bowden)
4. Vary speed in 10mm/s steps (typically 25-60mm/s)
5. Pick minimum retraction that eliminates stringing

## How the Auto-Tuner Calibrates It

- **Camera + CV** on stringing test — evaluates thread presence at multiple retraction values
- **Backlight shadow analysis** detects even fine strings
- Tests retraction × temperature matrix to find optimal combination

## Related Anomalies

- [Stringing](../anomalies/stringing.md) — not enough retraction
- [Blobs](../anomalies/blobs.md) — retraction/prime mismatch causes blobs at seams
- [Grinding](../anomalies/grinding.md) — too much retraction wears the filament
- [Clogging](../anomalies/clogging.md) — excessive retraction pulls molten plastic into the cold zone
