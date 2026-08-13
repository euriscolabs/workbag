---
type: "article"
title: "Living Hinge"
description: "A thin flexible section that acts as a hinge — one piece, no assembly, but material choice and print orientation are critical."
category: "Engineering"
tags: ["Mechanical Joint", "3D Printing"]
published: true
---

## How it works

A living hinge is a thin, flexible section of plastic connecting two rigid parts. It bends repeatedly at the thin section, acting as a built-in hinge with no separate hardware. Think shampoo bottle flip-caps.

```
Side view:

  ████████     ████████
  ████████     ████████
  ████████╲   ╱████████
           ╲ ╱
            ▼  ← thin section (hinge)
  ████████████████████
```

## Key design parameters

| Parameter | Guideline |
|-----------|-----------|
| Hinge thickness | 0.2-0.5mm (injection molded), 0.8-1.2mm (FDM) |
| Hinge length (along fold axis) | Full width of the part |
| Hinge width (across fold) | 1-2mm |
| Material | PP and PE are ideal, TPU for FDM |

## Design tips

- **Material is everything** — polypropylene (PP) is the gold standard for living hinges (millions of cycles). PLA and PETG will break within a few cycles. TPU is the best FDM option.
- **Flex immediately after molding/printing** — the first bend aligns the polymer chains along the hinge axis, dramatically improving fatigue life.
- **Keep the hinge zone short** (1-2mm across the fold) — a longer flex zone distributes strain over a wider area but feels floppy.
- **Radius, don't crease** — design the thin section with a gentle radius, not a sharp V-notch. Sharp creases concentrate stress.

## FDM considerations

- **PLA living hinges will break** — usually within 1-5 cycles. PLA is too brittle.
- **PETG might survive 10-50 cycles** — marginal, not reliable.
- **TPU is the answer for FDM** — flexible filament makes excellent living hinges that last thousands of cycles.
- **Print orientation** — the hinge line must be **parallel to layer lines**. If layers cross the hinge perpendicular, it delaminates instantly.
- **Print the hinge section with 100% infill** and slow speed for good layer adhesion.

## When to use

- One-piece boxes with flip lids
- Foldable brackets or stands
- Cable management clips
- Protective covers

## Common failures

- **Hinge fracture after few cycles** — wrong material (PLA/PETG instead of PP/TPU), or hinge too thin for FDM.
- **Hinge delamination (FDM)** — layers crossing the hinge line perpendicular. Fix: rotate print orientation.
- **Hinge too stiff** — hinge zone too thick or too wide. Reduce thickness or narrow the flex zone.
