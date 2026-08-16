---
layout: ../../../../layouts/PageLayout.astro
title: "Annular Snap Fit"
description: "A circular snap-fit where a ring or lip deflects over a mating cylinder — used for caps, lids, and cylindrical enclosures."
category: "Engineering"
tags: ["Snap Fit", "3D Printing", "Mechanical Joint"]
---

## How it works

A ring or lip on one part expands (or contracts) to pass over a ridge on a mating cylinder, then snaps back to lock. Think bottle caps, pen caps, or pipe fittings.

```
Cross section:

  ┌───┐   ┌───┐
  │   │   │   │  ← outer ring expands over ridge
  │   └─┬─┘   │
  │     │     │  ← ridge
  │   ┌─┴─┐   │
  │   │   │   │
  └───┘   └───┘
```

## Key design parameters

| Parameter | Guideline |
|-----------|-----------|
| Interference (ridge height) | 1-3% of ring diameter |
| Wall thickness | Uniform around the circumference |
| Lead-in angle | 30-45° for easy assembly |
| Retention angle | 45-90° depending on permanence |

## Design tips

- **Uniform wall thickness** around the ring — uneven thickness causes uneven expansion and stress concentration.
- **Add relief slots** if the ring can't expand enough — 2-4 axial slots in the ring reduce the required hoop strain.
- **Keep interference low** — annular snap-fits generate much higher stress than cantilevers because the entire circumference must deflect simultaneously.

## FDM considerations

- **Print with the cylinder axis vertical** — layers form concentric rings that resist hoop stress well.
- **Avoid printing horizontally** — the ring cross-section would be built layer-by-layer with poor interlayer adhesion, and it will split along the layer line when expanded.
- **Relief slots help with FDM** — they reduce the force needed and avoid cracking.

## When to use

- Caps and lids on cylindrical containers
- Lens holders
- Pipe/tube connections
- Sealed enclosures

## Common failures

- **Ring cracking** — strain too high, no relief slots. Especially common in PLA.
- **Uneven engagement** — ring doesn't snap evenly around the circumference. Cause: non-uniform wall thickness or out-of-round printing.
