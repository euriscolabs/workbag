---
title: "Bridge Sag"
category: "Surface"
severity: "Medium"
description: "Unsupported horizontal spans (bridges) droop in the middle, creating a V or U-shaped sag between support points."
---

## What It Is

Unsupported horizontal spans (bridges) droop in the middle, creating a V or U-shaped sag between support points.

## How It Forms

A bridge deposits filament across open air between two solid points. The filament stretches between them like a clothesline. Gravity pulls the middle down.

Counterintuitively, **faster bridging is better**. Slow bridging gives the molten filament more time to sag under gravity before reaching the other side. Fast bridging stretches the filament taut before it can droop.

Cooling is critical — the filament must solidify mid-span. Without cooling, the solidification front can't keep up and the bridge sags even at high speed.

Bridge flow should also be reduced — less material means less weight pulling down, and the thinner strand cools faster.

## Visual Signature

- V-shaped or U-shaped dip in horizontal spans
- Wavy, uneven bottom surface on bridges
- First bridge layer sags, subsequent layers improve (they have something to print on)
- Very long bridges fail completely → spaghetti strand

## Root Causes

| Cause | Calibration Variable | Direction |
|-------|---------------------|-----------|
| Bridge speed too slow | Speed Profile (bridge) | ↓ |
| Cooling too low | Cooling / Fan Speed | ↓ |
| Temperature too hot | Extrusion Temp | ↑ |
| Bridge flow too high | Flow Rate (bridge) | ↑ |

## How the Auto-Tuner Detects It

- **Camera**: Bridge test print — measure sag distance at center of bridges of varying lengths. Compare to acceptable threshold.

## How the Auto-Tuner Fixes It

- **Calibration**: Test bridges at multiple speeds and fan settings. Camera evaluates sag. Find optimal bridge speed + cooling + flow for each filament.
