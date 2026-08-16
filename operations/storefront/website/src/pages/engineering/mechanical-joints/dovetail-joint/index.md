---
layout: ../../../../layouts/PageLayout.astro
title: "Dovetail Joint"
description: "A trapezoidal interlocking slide joint — strong, self-aligning, and easy to print for sliding connections and rail systems."
category: "Engineering"
tags: ["Mechanical Joint", "3D Printing"]
---

## How it works

A trapezoidal tongue slides into a matching groove. The angled sides prevent separation perpendicular to the slide direction while allowing free movement along the rail. Used for sliding connections, rails, and alignable joints.

```
Cross section:

  Tongue:           Groove:
     ╱──╲              ┌──────────┐
    ╱    ╲             │ ╲      ╱ │
   ╱      ╲            │  ╲    ╱  │
  ╱        ╲           │   ╲  ╱   │
                       └──────────┘
```

## Key design parameters

| Parameter | Guideline |
|-----------|-----------|
| Dovetail angle | 45-60° (steeper = stronger lock, harder to slide) |
| Clearance (FDM) | 0.2-0.3mm per side |
| Depth | At least equal to the tongue width for strength |
| Length | As needed — longer = more bearing surface |

## Design tips

- **45° angle** is a good default — holds well, slides smoothly, easy to model.
- **Chamfer the entry** of both tongue and groove for easy alignment during insertion.
- **Clearance is critical** — too tight and it won't slide, too loose and it wobbles. Start with 0.2mm per side and adjust.
- **Add a stop** at the end of the groove if you don't want full slide-through.

## FDM considerations

- **Print orientation** — the dovetail cross-section should be on the XY plane (horizontal). Printing the angled faces as overhangs works well at 45°, which is right at the typical FDM overhang limit.
- **Elephant's foot** — the first layer squish can make the groove too tight at the bottom. Add a small chamfer at the groove entrance.
- **Sand or file the mating surfaces** if the fit is too tight — easier than reprinting with adjusted clearances.

## When to use

- Sliding rail systems
- Panel-to-panel connections (the bowtie connector in the storage system is a variation)
- Drawer slides
- Removable mounting brackets
- Tool holders that slide onto a rail

## Common failures

- **Binding** — dovetail jams partway. Cause: insufficient clearance, warping, or debris in the groove.
- **Wobble** — too much clearance. Solution: reduce clearance or add a friction element (thin TPU strip).
- **Overhang quality** — angled faces print rough on FDM. Solution: keep angle at 45° and use good cooling.
