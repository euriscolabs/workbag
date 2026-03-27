---
title: "Axis Steps/mm"
category: "Printer-Specific"
priority: "Low"
description: "Steps per millimeter for X, Y, and Z axes — determines positional accuracy of the print head and bed."
---

## What It Is

Axis steps/mm defines how many stepper motor steps move each axis exactly 1mm. Set by belt pitch, pulley teeth, and motor step angle. Rarely needs adjustment on properly built printers.

## What It Controls

- Dimensional accuracy (X/Y/Z dimensions of printed parts)
- Layer height precision (Z-axis)
- Hole and slot sizing

## Why It Drifts

- Almost never drifts on belt-driven axes (determined by hardware geometry)
- Leadscrew-driven Z can drift with wear or backlash
- Only changes if hardware is swapped (different pulleys, belts, leadscrews)

## How to Calibrate (Manual)

1. Print a known-dimension cube (e.g., 20×20×20mm)
2. Measure with calipers
3. Calculate: `new_steps = current_steps × (target_mm / measured_mm)`
4. Apply with `M92 X<val> Y<val> Z<val>`, save with `M500`

Note: If dimensions are off, check flow rate and temperature first — over-extrusion causes dimensional errors too.

## How the Auto-Tuner Calibrates It

- **Dial indicator or laser displacement sensor** measures actual travel vs. commanded
- Low priority — rarely needs correction on modern printers

## Related Anomalies

- [Elephant Foot](../anomalies/elephant-foot.md) — can appear as dimensional error (but usually caused by compression, not steps)
