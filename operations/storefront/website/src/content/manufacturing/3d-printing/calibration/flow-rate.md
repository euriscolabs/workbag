---
title: "Flow Rate"
category: "Filament-Specific"
priority: "Critical"
description: "Extrusion multiplier — fine-tunes the volume of plastic deposited after E-steps are calibrated. Compensates for filament diameter variation and material compressibility."
---

## What It Is

Flow rate (extrusion multiplier) is a percentage adjustment applied on top of E-steps calibration. Where E-steps ensure the extruder pushes the right length of filament, flow rate compensates for the fact that different materials, diameters, and nozzle geometries produce slightly different actual deposit volumes.

## What It Controls

- Wall thickness accuracy
- Top surface quality (gaps vs. over-fill)
- Dimensional accuracy
- Layer bonding (related to squish)

## Why It Varies

- Filament diameter variation (1.75mm ± 0.05mm is common)
- Material compressibility (TPU compresses more than PLA)
- Die swell characteristics differ by material
- Nozzle wear changes orifice size

## How to Calibrate (Manual)

1. Print a single-wall cube (vase mode or single perimeter)
2. Measure wall thickness with calipers
3. Calculate: `new_flow = current_flow × (expected_wall / measured_wall)`
4. Adjust in slicer (typically 90-110%)
5. Reprint and verify

## How the Auto-Tuner Calibrates It

- **Inline filament diameter sensor** measures real-time diameter variation
- **Weight-based** method: weigh extruded filament vs. expected weight
- **Roller encoder** monitors actual vs. commanded feed for slip detection

## Related Anomalies

- [Under-extrusion](../anomalies/under-extrusion.md) — flow too low
- [Over-extrusion](../anomalies/over-extrusion.md) — flow too high
- [Elephant Foot](../anomalies/elephant-foot.md) — over-flow on first layer
