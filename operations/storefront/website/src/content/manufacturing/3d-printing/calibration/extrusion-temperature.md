---
type: "article"
title: "Extrusion Temperature"
category: "Filament-Specific"
priority: "Critical"
description: "Nozzle temperature for a given filament — controls melt viscosity, layer adhesion, stringing, and surface finish."
---

## What It Is

The temperature at which the hotend melts the filament. Every filament has an optimal range — too cold and it won't flow properly, too hot and it oozes, strings, and may degrade. Even within the same material type, different brands and colors have different sweet spots.

## What It Controls

- Melt viscosity (flow characteristics)
- Layer adhesion strength (hotter = better bonding)
- Stringing/oozing tendency (hotter = more ooze)
- Surface finish (too hot = glossy but blobby, too cold = matte but rough)
- Bridging performance (hotter = more sag)
- Material degradation risk

## Why It Varies

- Different filament brands use different additives
- Colors affect thermal properties (pigments change flow behavior)
- Ambient temperature and enclosure affect heat loss
- Print speed affects required temperature (faster = needs hotter)

## How to Calibrate (Manual)

1. Print a temperature tower (single model with temp changes every few layers)
2. Start at the high end of the filament's range, decrease in 5°C steps
3. Evaluate each section for: layer adhesion, stringing, surface quality, overhangs
4. Pick the temperature with the best overall balance

## How the Auto-Tuner Calibrates It

- **Camera + CV** on temperature tower — automatically evaluates each section
- Scores surface quality, stringing, and overhang performance per temperature
- Selects optimal temperature based on weighted criteria

## Related Anomalies

- [Stringing](../anomalies/stringing.md) — temperature too high
- [Under-extrusion](../anomalies/under-extrusion.md) — temperature too low
- [Delamination](../anomalies/delamination.md) — temperature too low for layer bonding
- [Heat Creep](../anomalies/heat-creep.md) — temperature contributes to thermal gradient issues
