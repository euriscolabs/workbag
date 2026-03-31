---
type: "article"
title: "Cooling / Fan Speed"
category: "Filament-Specific"
priority: "Medium"
description: "Part cooling fan speed — controls how fast extruded plastic solidifies, affecting overhang quality, bridging, and layer bonding."
---

## What It Is

Part cooling fan speed controls how quickly the just-deposited plastic solidifies. More cooling = better overhangs and bridges (plastic freezes in place before drooping), but too much cooling = poor layer adhesion (layers don't bond if they cool too fast).

## What It Controls

- Overhang quality (cooling prevents droop)
- Bridge performance (cooling freezes spans)
- Layer adhesion strength (too much cooling weakens bonds)
- Small feature quality (thin features need cooling to hold shape)
- Curling on overhangs

## Why It Varies

- Material type (PLA loves cooling, ABS hates it, PETG is in between)
- Layer height (thinner layers cool faster, may need less fan)
- Print speed (faster = less time per layer = may need more cooling)
- Part geometry (small layers need more cooling time)
- Fan duct design affects actual airflow vs. percentage

## How to Calibrate (Manual)

1. Print an overhang test at different fan speeds (0%, 25%, 50%, 75%, 100%)
2. Evaluate: overhang quality vs. layer adhesion
3. Some slicers allow per-feature fan speeds (bridges: 100%, perimeters: 50%)
4. Set minimum layer time to ensure small layers have enough cooling

## How the Auto-Tuner Calibrates It

- **Camera + overhang droop analysis** — evaluates overhang quality at different fan speeds
- Measures droop angle vs. fan speed to find optimal cooling
- Can be combined with speed profile tuning for per-feature optimization

## Related Anomalies

- [Rough Overhangs](../anomalies/rough-overhangs.md) — insufficient cooling
- [Bridge Sag](../anomalies/bridge-sag.md) — insufficient cooling during bridges
- [Delamination](../anomalies/delamination.md) — too much cooling weakens layer bonds
- [Warping](../anomalies/warping.md) — uneven cooling causes thermal stress
