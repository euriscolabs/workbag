---
title: "E-Steps"
category: "Printer-Specific"
priority: "Critical"
description: "Extruder steps per millimeter — how many motor steps the extruder needs to push exactly 1mm of filament. The foundation of all extrusion accuracy."
---

## What It Is

E-steps (extruder steps/mm) defines how many stepper motor steps are needed to advance exactly 1mm of filament. If this value is wrong, every print over- or under-extrudes regardless of all other settings.

## What It Controls

- Total volume of plastic deposited per move
- Baseline accuracy for flow rate, pressure advance, and retraction
- Dimensional accuracy of printed walls

## Why It Drifts

- Extruder gear wear (teeth dull → less grip per step)
- Switching extruder hardware (different gear ratio)
- Filament diameter variation (indirect — affects effective flow)
- Drive tension changes

## How to Calibrate (Manual)

1. Mark filament 120mm above the extruder inlet
2. Command `G1 E100 F100` (extrude 100mm slowly)
3. Measure remaining distance from mark to inlet
4. Calculate: `new_e_steps = current_e_steps × (100 / actual_mm_extruded)`
5. Apply with `M92 E<value>`, save with `M500`

## How the Auto-Tuner Calibrates It

- **Roller encoder** on filament path measures actual mm fed vs. commanded mm
- Calculates correction factor automatically
- Can monitor continuously during prints for drift detection

## Related Anomalies

- [Under-extrusion](../anomalies/under-extrusion.md) — E-steps too low
- [Over-extrusion](../anomalies/over-extrusion.md) — E-steps too high
