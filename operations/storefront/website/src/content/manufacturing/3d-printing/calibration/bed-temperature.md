---
title: "Bed Temperature"
category: "Filament-Specific"
priority: "Medium"
description: "Heated bed temperature for a given filament — controls first layer adhesion, warping tendency, and part release."
---

## What It Is

Bed temperature controls how warm the print surface is. It affects adhesion (too cold = won't stick, too hot = won't release), warping (proper bed temp reduces thermal stress), and first layer quality.

## What It Controls

- First layer adhesion strength
- Warping tendency (thermal stress between bed and upper layers)
- Part removal difficulty (too hot = part fuses to surface)
- Bottom surface finish

## Why It Varies

- Material requirements differ dramatically (PLA: 50-60°C, ABS: 90-110°C, PETG: 70-85°C)
- Print surface type affects ideal temperature (PEI, glass, BuildTak)
- Ambient temperature and enclosure affect heat loss
- Part geometry (large flat parts warp more, need higher bed temp)

## How to Calibrate (Manual)

1. Start with filament manufacturer recommendation
2. Print adhesion test squares at different temperatures
3. Check: does the part stick during printing? Does it release when cooled?
4. Check for warping on larger test prints
5. Find the sweet spot between adhesion and easy release

## How the Auto-Tuner Calibrates It

- **Strain gauge** for adhesion force measurement — quantify adhesion at different temps
- **Camera** for warp detection — monitor first layer and early layers for lifting
- Tests adhesion vs. release tradeoff systematically

## Related Anomalies

- [Warping](../anomalies/warping.md) — bed temp too low for the material
- [Adhesion Failure](../anomalies/adhesion-failure.md) — bed temp too low
- [Elephant Foot](../anomalies/elephant-foot.md) — bed temp too high softens first layers
