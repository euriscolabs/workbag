---
type: "article"
title: "Thermal Shock Cracking"
category: "Structural"
severity: "High"
description: "Cracks forming in the part during or after printing from thermal stress. The part appears solid but has internal fractures along layer lines."
---

## What It Is

Cracks forming in the part during or after printing from thermal stress. The part appears solid but has internal fractures along layer lines.

## How It Forms

When plastic cools rapidly, the outer surface contracts while the interior is still warm and expanded. This creates internal stress. If the stress exceeds the layer adhesion strength, cracks propagate along the weakest path — the layer interfaces.

The physics is identical to why glass cracks when hit with boiling water, or why concrete develops cracks in freeze-thaw cycles. Rapid temperature change = differential contraction = stress = fracture.

Materials with high thermal contraction are most susceptible: ABS, ASA, Polycarbonate, Nylon. PLA rarely cracks because it has low shrinkage and high stiffness.

Contributing factors:
- **No enclosure** — ambient air creates convection currents that cool the part unevenly
- **Drafts** — doors, windows, HVAC create sudden cooling on one side
- **Large parts** — more material = more total contraction = more stress

## Visual Signature

- Cracks along layer lines, usually mid-height
- Cracks at stress concentrators (corners, holes, thin walls)
- Audible cracking during printing (for severe cases)
- Part looks fine but fractures easily when handled
- Cracks may appear hours after printing as the part finishes cooling

## Root Causes

| Cause | Calibration Variable | Direction |
|-------|---------------------|-----------|
| Cooling too aggressive | Cooling / Fan Speed | ↑ |
| No enclosure | — (environment) | — |
| Ambient drafts | — (environment) | — |
| High-shrinkage material | — (material property) | — |
| Large thermal differential | Extrusion Temp, Bed Temp | large gap |

## How the Auto-Tuner Detects It

- **Camera**: Visible crack detection on surface (challenging — cracks can be hairline)
- **Audio** (future): Cracking sounds during printing

## How the Auto-Tuner Fixes It

- **Calibration**: Optimize fan speed for material — minimum cooling that still prevents overhangs from drooping. Balance between cooling artifacts (this) and overhang artifacts.
- **Environmental**: Can detect ambient temperature changes and alert if conditions risk cracking.
