---
title: "First Layer Adhesion Failure"
category: "Adhesion"
severity: "Critical"
description: "The part detaches from the build plate during printing. Leads to spaghetti if undetected."
---

## What It Is

The part detaches from the build plate during printing. Leads to spaghetti if undetected.

## How It Forms

The first layer is the foundation. For it to stick, three conditions must be met simultaneously:

1. **Correct nozzle height** — Close enough to squish filament into the bed texture, far enough not to scrape
2. **Correct bed temperature** — Warm enough to keep plastic slightly soft at the interface, creating a bond
3. **Clean bed surface** — Oils, dust, or residue prevent the plastic-to-surface bond

If any condition fails, adhesion is weak. As the print grows, forces increase: warp stress pulls corners up, nozzle can bump overhangs, vibration shakes the part. Eventually, the weakest point gives way.

## Visual Signature

- Part slides across bed during printing
- First layer doesn't stick at all ("skiing")
- Partial detachment — one corner lifts, rest stays
- Full detachment → spaghetti
- First layer lines not squished flat (round cross-section = too far)

## Root Causes

| Cause | Calibration Variable | Direction |
|-------|---------------------|-----------|
| Nozzle too far from bed | Z-Offset | ↑ (too far) |
| Bed temp too low | Bed Temperature | ↓ |
| Bed mesh stale/missing | Bed Mesh | outdated |
| Dirty bed surface | — (maintenance) | — |
| First layer speed too fast | Speed Profile (first layer) | ↑ |
| No first-layer flow boost | Flow Rate (first layer) | ↓ |

## How the Auto-Tuner Detects It

- **Camera**: First layer monitoring — are lines squished flat? Are they connecting? Any gaps?
- **Anomaly detection**: Part outline tracking — if outline shifts or disappears, adhesion failure detected
- **Vibration sensor** (future): Loose parts vibrate differently than bonded parts

## How the Auto-Tuner Fixes It

- **Calibration**: Z-offset via contact sensing, bed mesh before every print, bed temp optimization
- **Live tuning**: First layer monitoring. If adhesion looks weak, pause and alert before it becomes spaghetti.
