---
layout: ../../../../layouts/ArticleLayout.astro
title: "Press Fit"
description: "An interference fit where a shaft or pin is forced into a slightly undersized hole — simple, permanent, no moving parts."
category: "Engineering"
tags: ["Mechanical Joint", "3D Printing"]
---

## How it works

A pin or shaft is inserted into a hole that is slightly smaller in diameter. The elastic deformation of the surrounding material creates radial pressure that holds the parts together through friction. No hooks, no flexing — just tight fit.

```
Before:           After:

  ┌──┐  ┌────┐     ┌────────┐
  │  │  │    │     │  ████  │
  │██│→ │ ○  │  =  │  ████  │
  │  │  │    │     │  ████  │
  └──┘  └────┘     └────────┘
  pin    hole       press fit
  (larger) (smaller)
```

## Key design parameters

| Parameter | Guideline |
|-----------|-----------|
| Interference (FDM) | 0.1-0.3mm on diameter |
| Interference (injection molded) | 0.5-1.5% of hole diameter |
| Minimum wall around hole | 2x the interference to avoid splitting |
| Surface finish | Smoother = more consistent fit |

## Design tips

- **FDM needs less interference than injection molding** — layer lines create surface texture that adds effective friction. Start with 0.1mm interference and test.
- **Chamfer the pin end** — makes alignment and insertion much easier.
- **Round holes print slightly undersized** on FDM — account for this in your tolerance. A "10mm" hole often prints as 9.8-9.9mm.
- **Use a short interference zone** — only the first few mm of insertion depth need to be tight. A long press-fit zone requires excessive force.

## FDM considerations

- **Hole orientation matters** — holes printed vertically (along Z) are more accurate than horizontal holes (which get slight ovality from layer stacking).
- **Print a tolerance test first** — print a pin and hole at several interference values (0.05, 0.1, 0.15, 0.2mm) to find your printer's sweet spot.
- **Avoid press-fitting across layer lines** — the radial pressure can split layers. Press-fit direction should be along the layer stack (Z-axis).

## When to use

- Permanent pin/axle mounting
- Bearing seats
- Alignment dowels between mating parts
- Inserting threaded brass inserts (heat-set inserts)

## Common failures

- **Splitting** — hole cracks from excessive interference. Cause: too much interference, not enough wall material around the hole, or wrong print orientation.
- **Loose fit** — parts slide out. Cause: too little interference, or material creep over time.
- **Inconsistent fit** — works on one print, not another. Cause: printer calibration drift, different material batches, temperature variation.
