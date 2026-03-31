---
type: "article"
title: "Pillowing"
category: "Surface"
severity: "Low"
description: "Bumpy, uneven top surface — small dimples or bumps where the top shell bridges over infill gaps below."
---

## What It Is

Bumpy, uneven top surface — small dimples or bumps where the top shell bridges over infill gaps below.

## How It Forms

The top layers of a print bridge over the infill pattern. Where infill supports the top shell, the surface is flat. Where there's a gap between infill lines, the top shell sags slightly before solidifying.

With too few top layers, the bridging never fully flattens — each layer sags into the same spots. With insufficient cooling, the bridging material stays soft and droops further.

The bumps follow the infill pattern exactly — they're a direct imprint of the structure below.

## Visual Signature

- Regular bumpy pattern on top surfaces matching infill below
- Dimples or raised spots in a grid/triangle/gyroid pattern
- Rough to the touch compared to side walls
- More visible with lower infill percentages

## Root Causes

| Cause | Calibration Variable | Direction |
|-------|---------------------|-----------|
| Too few top layers | — (slicer) | — |
| Infill percentage too low | — (slicer) | — |
| Cooling too low | Cooling / Fan Speed | ↓ |
| Temperature too hot | Extrusion Temp | ↑ |

## How the Auto-Tuner Detects It

- **Camera**: Top surface roughness analysis on test print

## How the Auto-Tuner Fixes It

- **Calibration**: Optimize cooling for top layers. Primarily a slicer settings issue (more top layers, higher infill).
