---
type: "article"
title: "Cantilever Snap Fit"
description: "The most common snap-fit type — a flexible beam with a hook that deflects during assembly and locks behind a mating surface."
category: "Engineering"
tags: ["Snap Fit", "3D Printing", "Mechanical Joint"]
published: true
---

## How it works

A beam anchored at one end with a hook/nub at the free end. During insertion, the hook deflects over a ledge, then springs back to lock behind it. The most widely used snap-fit in plastic part design.

```
Rest position:        During insertion:      Locked:

  ┌──────┐             ┌──────┐             ┌──────┐
  │      ├─┐           │      ├─┐           │      ├─┐
  │      │ │ hook      │      │╱  deflected │      │ │ engaged
  │      ├─┘           │      ├─┘           │      ├─┘
  │      │             │      │             │      │
  ████████             ████████             ████████
  (root)               (root)              (root)
```

## Key design parameters

| Parameter | Guideline |
|-----------|-----------|
| Length-to-thickness ratio | Minimum 5:1 (longer = less strain) |
| Max strain (PLA) | ~1.5% |
| Max strain (PETG) | ~2-3% |
| Max strain (Nylon) | ~4-6% |
| Taper | 0.5x thickness at tip vs root — distributes stress |
| Hook angle | 30-45° for easy assembly, 90° for permanent |

## Design tips

- **Taper the beam** — thicker at the root, thinner at the tip. Distributes bending stress instead of concentrating it at the root.
- **Add a lead-in chamfer** on the hook for smooth insertion.
- **Round the root transition** — a sharp corner at the beam root is a stress concentrator and the most common failure point. Even a small fillet helps.
- **Calculate deflection** — beam deflection = (strain × length²) / (1.5 × thickness). Use this to check if your design stays within material strain limits.

## FDM considerations

- **Print orientation matters** — the beam should flex **perpendicular** to layer lines. If layers are horizontal, the beam should flex up/down. Flexing along layer boundaries causes delamination.
- **Avoid thin beams under 1.5mm** — FDM layer adhesion is weak, and thin cantilevers snap at layer boundaries.
- **Test first** — print a test piece before committing. FDM tolerances vary between printers and materials.

## When to use

- Removable covers and panels
- Height-adjustable shelves and inlays
- Battery compartments
- Cases with snap-on lids

## Common failures

- **Root fracture** — beam breaks at the anchor point. Cause: no fillet, beam too short (high strain), or wrong print orientation.
- **Creep** — beam slowly deforms under constant deflection. Cause: beam is held in a partially deflected state permanently. Solution: design for zero deflection in the locked position.
- **Hook wear** — hook rounds off after repeated cycles. Cause: hook too small, material too soft. Solution: increase hook depth or use a harder material.
