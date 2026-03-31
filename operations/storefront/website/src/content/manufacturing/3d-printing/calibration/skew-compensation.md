---
type: "article"
title: "Skew Compensation"
category: "Printer-Specific"
priority: "Low"
description: "Corrects non-perpendicularity of the X/Y axes — when the frame isn't perfectly square, prints come out as parallelograms instead of rectangles."
---

## What It Is

Skew compensation corrects for X and Y axes that aren't perfectly perpendicular. Even small angular errors (< 1°) produce visible dimensional inaccuracy — a square prints as a parallelogram.

## What It Controls

- Angular accuracy (right angles in prints)
- Diagonal dimension accuracy
- Part fit for assemblies requiring perpendicularity

## Why It Drifts

- Frame assembly wasn't perfectly square
- Frame flex under motion forces
- Crash or impact to the frame
- Rarely drifts once set on a rigid frame

## How to Calibrate (Manual)

1. Print a large square (or use Klipper's skew calibration object)
2. Measure diagonals — if they differ, axes are skewed
3. Calculate skew angle from diagonal difference
4. Apply correction in firmware (Klipper: `SET_SKEW`, Marlin: `M852`)

## How the Auto-Tuner Calibrates It

- **Probe grid at known coordinates** — probe XY positions and compare to expected geometry
- Calculate skew from measured vs. expected positions
- Low priority: only needed once unless frame is disturbed

## Related Anomalies

- [Backlash Artifacts](../anomalies/backlash-artifacts.md) — can be confused with skew on diagonal features
