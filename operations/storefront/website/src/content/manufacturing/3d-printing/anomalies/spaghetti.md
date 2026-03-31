---
type: "article"
title: "Spaghetti"
category: "Structural"
severity: "Critical"
description: "The print detaches and the printer keeps extruding into air — producing a tangled mess of filament. The most wasteful failure mode."
---

## What It Is

The print detaches and the printer keeps extruding into air — producing a tangled mess of filament. The most wasteful failure mode.

## How It Forms

This is always a secondary failure. Something else goes wrong first:

1. **Adhesion failure** — Part lifts off the bed. Printer doesn't know, keeps printing in empty space.
2. **Support failure** — A support structure breaks. The feature it was holding collapses. Printing continues above the collapsed area.
3. **Part knocked by nozzle** — Over-extrusion or warping creates a bump. Nozzle catches it, knocking the part loose.
4. **Layer shift + crash** — A severe shift causes the nozzle to collide with the part, breaking it free.

The printer has no feedback — it follows the G-code toolpath regardless of what's actually on the bed. It deposits filament into air, which curls and tangles into the characteristic "spaghetti" mess.

On a long print, this can waste hours of time and meters of filament before anyone notices.

## Visual Signature

- Unmistakable — tangled mass of filament on or around the bed
- No recognizable print shape
- Often wraps around the hotend or nozzle
- Filament may fuse to the heater block (difficult cleanup)

## Root Causes

| Cause | Calibration Variable | Direction |
|-------|---------------------|-----------|
| Adhesion failure (upstream) | Z-Offset, Bed Temp, Bed Mesh | various |
| Warping dislodging part | Bed Temp, Cooling | various |
| Support structure failure | — (slicer) | — |
| Nozzle collision from over-extrusion | Flow Rate, E-Steps | ↑ |
| Layer shift causing crash | Max Accel, Belt Tension | various |

## How the Auto-Tuner Detects It

- **Camera**: The #1 use case for anomaly detection. Compare current print outline to expected shape. If the outline doesn't match or disappears → spaghetti in progress.
- **Encoder**: If flow is being deposited but camera shows nothing being built → printing into air.

## How the Auto-Tuner Fixes It

- **Prevention**: All calibration reduces spaghetti risk by preventing its upstream causes.
- **Live tuning**: Anomaly detection catches it within seconds and pauses the print. This alone justifies the entire camera system — one saved 8-hour print pays for the hardware.
