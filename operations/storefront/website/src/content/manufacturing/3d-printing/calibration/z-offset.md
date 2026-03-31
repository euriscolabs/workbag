---
type: "article"
title: "Probe Z-Offset"
category: "Printer-Specific"
priority: "High"
description: "The distance between the probe trigger point and the actual nozzle tip — determines true first layer height."
---

## What It Is

Z-offset is the vertical distance between where the bed probe triggers and where the nozzle actually touches the bed. Getting this right means your first layer is exactly the height you commanded — not squished too flat or floating above the surface.

## What It Controls

- First layer height (the most critical layer)
- First layer adhesion strength
- First layer line width and squish

## Why It Drifts

- Nozzle replacement (different length)
- Nozzle wear (brass wears down over time)
- Probe mount loosening
- Thermal expansion differences between cold and hot nozzle
- Print surface changes (different thickness)

## How to Calibrate (Manual)

1. Home all axes, heat to print temperature
2. Use paper/feeler gauge method: lower nozzle until paper drags
3. Or: print first layer test and adjust live with `M851 Z<offset>` + `M500`
4. Iterate until first layer is consistent

## How the Auto-Tuner Calibrates It

- **Electrical contact sensing**: nozzle touches conductive bed surface, circuit closes → exact Z position known
- **Strain gauge / piezo sensor**: detects nozzle contact force
- Eliminates manual paper-test guesswork

## Related Anomalies

- [Adhesion Failure](../anomalies/adhesion-failure.md) — Z too high, filament doesn't stick
- [Elephant Foot](../anomalies/elephant-foot.md) — Z too low, first layer over-squished
