---
title: "Elephant Foot"
category: "Adhesion"
severity: "Medium"
description: "The first few layers of the print are wider than the rest — the bottom of the part bulges outward like an elephant's foot."
---

## What It Is

The first few layers of the print are wider than the rest — the bottom of the part bulges outward like an elephant's foot.

## How It Forms

Three forces combine:

1. **Nozzle too close** — The nozzle squishes the first layer, pushing material outward. More squish = more spread.
2. **Bed too hot** — The first layers stay soft longer. The weight of the growing part above presses down, and the warm material deforms outward.
3. **Over-extrusion on first layer** — Many slicers increase first-layer flow for better adhesion. Excess material spreads laterally.

The result: the bottom 1-3 layers are wider than the CAD model. Parts that should fit into holes don't. Dimensional accuracy is worst at the base.

## Visual Signature

- Flared/wider base visible from the side
- Parts don't fit into designed pockets or holes
- Bottom of part wider than top when measured with calipers
- Most obvious on parts with vertical walls meeting the bed

## Root Causes

| Cause | Calibration Variable | Direction |
|-------|---------------------|-----------|
| Nozzle too close | Z-Offset | ↓ (too close) |
| Bed temp too high | Bed Temperature | ↑ |
| First layer flow too high | Flow Rate (first layer) | ↑ |
| Part cooling disabled on first layers | Cooling / Fan Speed | ↓ |

## How the Auto-Tuner Detects It

- **Camera**: Compare base dimension to upper dimension. Ratio > 1.0 = elephant foot.
- **Z-offset calibration**: Contact sensing ensures correct nozzle height.

## How the Auto-Tuner Fixes It

- **Calibration**: Correct Z-offset, optimize bed temp to minimum for adhesion, calibrate first-layer flow
