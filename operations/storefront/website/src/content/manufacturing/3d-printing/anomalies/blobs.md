---
type: "article"
title: "Blobs / Zits"
category: "Extrusion"
severity: "Low"
description: "Small bumps on the surface at points where the nozzle starts, stops, or restarts extrusion. Most visible along the Z-seam line."
---

## What It Is

Small bumps on the surface at points where the nozzle starts, stops, or restarts extrusion. Most visible along the Z-seam line.

## How It Forms

Two main causes:

1. **Seam point pressure surge** — Each perimeter loop has a start and end point. When extrusion restarts, pressure builds before the nozzle starts moving at full speed. The brief excess deposits a blob. When the loop ends, residual pressure deposits another.

2. **Post-travel restart** — After a retraction + travel move, the extruder primes (pushes filament back). If priming is slightly too much, or starts too early, a small blob forms at the landing point.

## Visual Signature

- Vertical line of pimples along the Z-seam
- Random small bumps on surfaces (post-travel blobs)
- More visible on smooth, flat surfaces
- Often one per layer, aligned vertically

## Root Causes

| Cause | Calibration Variable | Direction |
|-------|---------------------|-----------|
| Pressure Advance not tuned | Pressure Advance | ↓ |
| Retraction/prime mismatch | Retraction | misconfigured |
| No coast/wipe settings | — (slicer) | — |
| Temperature too hot | Extrusion Temp | ↑ |

## How the Auto-Tuner Detects It

- **Camera**: Surface analysis at seam line, comparing seam area to adjacent surface

## How the Auto-Tuner Fixes It

- **Calibration**: Pressure Advance tuning eliminates most seam blobs. Retraction fine-tuning handles travel restart blobs.
