---
type: "project"
title: "Filament Recycler"
description: "A system to recycle failed prints and support material back into usable filament — shredding, extruding, and spooling with closed-loop quality control."
status: "Idea"
category: "Manufacturing"
tags: ["3D Printing", "Recycling", "Hardware", "Sustainability"]
published: true
---

## Overview

Turn failed prints, support material, purge waste, and old prototypes back into usable filament. Shred, melt, extrude, and spool — with quality control provided by the [Filament Spool Holder](../filament%20spool%20holder/index.md) acting as a quality gate for the output.

## Problem

3D printing generates significant plastic waste:

- Failed prints (spaghetti, warped parts, test prints)
- Support material (especially on the 5-tool Prusa XL)
- Purge towers from multi-material prints
- Calibration prints and test objects
- Old prototypes and iterations

This waste is thermoplastic — it can be remelted. But recycled filament has worse diameter consistency, potential contamination, and degraded material properties. Without quality monitoring, recycled filament causes more failed prints, creating a waste cycle instead of reducing it.

## Approach

### Pipeline

```
[Failed Prints] → [Shredder] → [Flakes] → [Dryer] → [Extruder] → [Filament] → [Spooler] → [Quality Gate]
```

### Shredding
- Granulate failed prints into small flakes (~3-5mm)
- Must handle mixed colors (accept blended output or sort by material)
- Material separation is critical — PLA and PETG cannot be mixed

### Drying
- Shredded flakes have high surface area → absorb moisture fast
- Must dry thoroughly before extrusion
- Heated hopper or dedicated flake dryer

### Extrusion
- Heated barrel melts flakes and pushes through a die to form filament
- Die diameter determines filament diameter (target 1.75mm)
- Screw or plunger extruder design
- Temperature control is critical for consistent melt

### Spooling
- Wind extruded filament onto a spool under controlled tension
- Must maintain consistent diameter during winding
- Cooling between extrusion and spooling (air or water bath)

### Quality Gate — Filament Spool Holder

The [Filament Spool Holder](../filament%20spool%20holder/index.md) provides closed-loop quality control for recycled filament:

| Sensor | What It Catches |
|---|---|
| Spring arm (diameter) | Diameter inconsistency from the extruder — the primary quality issue with recycled filament |
| Load cell (density) | Material consistency — mixed materials or voids show as density variation |
| Microphone (acoustic) | Bubbles/voids from moisture or air pockets in the recycled melt |
| Roller encoder (feed) | Feed consistency — catches spots where filament is too thick/thin to feed smoothly |

This data can feed back to the recycling extruder to adjust speed, temperature, or flag bad sections for removal. Closed loop: extrude → measure → adjust.

## Open Questions

- Buy vs. build the extruder? (Felfil, Filabot, or DIY?)
- Material sorting strategy — how to handle mixed-material waste from multi-tool prints?
- Material degradation — how many recycle passes before properties degrade too far? Need tensile testing.
- Colorant strategy — blend into neutral gray/black, or attempt color sorting?
- Economics — is the filament savings worth the time and electricity, or is this primarily a sustainability/education project?
- Can the purge tower waste from multi-material prints be recycled if it contains multiple materials?

## References

## Log
