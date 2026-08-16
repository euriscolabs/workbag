---
layout: /src/layouts/PageLayout.astro
title: "Torsion Snap Fit"
description: "A snap-fit that uses twisting deflection instead of bending — higher strain capacity and more compact than cantilever designs."
category: "Engineering"
tags: ["Snap Fit", "3D Printing", "Mechanical Joint"]
---

## How it works

Instead of bending a beam, a torsion snap-fit twists a bar or arm around its axis. The hook rotates into position rather than deflecting linearly. Less common than cantilever snap-fits but useful when space is limited.

```
Top view:

  ████████████
  █          █
  █   ┌──────█──── arm with hook
  █   │pivot █
  █   └──────█──── twists around pivot
  █          █
  ████████████
```

## Key design parameters

| Parameter | Guideline |
|-----------|-----------|
| Torsion bar length | Longer = lower stress for same deflection |
| Cross section | Round or square — round distributes stress better |
| Max shear strain | ~50% higher capacity than bending for same material |

## Design tips

- **Round cross-section torsion bars** distribute shear stress more evenly than square ones.
- **Torsion allows more deflection** in less space than a cantilever — useful for compact designs.
- **The pivot must be constrained** — the torsion bar needs to be anchored at both ends or supported to prevent bending.

## FDM considerations

- **Torsion bars are risky on FDM** — twisting loads peel layers apart regardless of orientation. Print with high infill (80%+) or solid.
- **Minimum cross-section ~3mm** for FDM — smaller and the layer adhesion can't handle torsion loads.

## When to use

- Compact enclosures where cantilever beam length is limited
- Rotating latches and catches
- Parts that need high deflection in a small space

## Common failures

- **Torsion bar shear fracture** — bar snaps from twisting. Cause: too short, cross-section too small.
- **Layer delamination (FDM)** — twisting peels layers apart. Cause: low infill, poor layer adhesion.
