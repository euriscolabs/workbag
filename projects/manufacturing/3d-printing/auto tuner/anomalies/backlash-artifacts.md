---
title: "Backlash Artifacts"
category: "Motion"
severity: "Low"
description: "Dimensional errors and surface defects that appear specifically when an axis reverses direction. Circles become ovals, holes are the wrong size."
---

## What It Is

Dimensional errors and surface defects that appear specifically when an axis reverses direction. Circles become ovals, holes are the wrong size.

## How It Forms

Backlash is the mechanical play in a motion system — the gap between gear teeth, slack in belts, play in bearings. When an axis moves in one direction and then reverses, the motor has to turn through the dead zone before the axis actually starts moving the other direction.

During this dead zone, the nozzle deposits material but isn't actually moving. When the axis finally catches up, the position is offset by the backlash amount. This offset appears as:
- Circles printed with a flat spot at each reversal point → oval
- Walls thicker or thinner at direction changes
- Seams on curved surfaces where X or Y reverses

## Visual Signature

- Circles are slightly oval (measure X vs Y diameter)
- Holes don't match CAD dimensions
- Visible seam on curved surfaces at direction change points
- Wall thickness varies with direction of travel
- Parts don't assemble correctly despite looking fine

## Root Causes

| Cause | Calibration Variable | Direction |
|-------|---------------------|-----------|
| Backlash uncompensated | Backlash Compensation | not set |
| Belt tension too loose | Belt Tension | ↓ |
| Worn bearings/bushings | — (hardware) | — |
| Play in linear rails | — (hardware) | — |

## How the Auto-Tuner Detects It

- **Dial indicator**: Measure actual position on forward and reverse moves. The difference is backlash.
- **Camera**: Circle test — print circle, measure ovality.

## How the Auto-Tuner Fixes It

- **Calibration**: Measure backlash per axis via dial indicator + automated reversal test. Set firmware compensation values.
