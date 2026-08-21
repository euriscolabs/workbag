---
layout: /src/layouts/PageLayout.astro
title: "Modular Storage System"
description: "A parametric, 3D-printable modular storage system with interchangeable inserts for cases, drawers, and tool inlays — built on a 25mm grid."
status: "In Progress"
featured: true
category: "Workshop"
tags: ["Workshop", "3D Printing", "Organization", "DIY", "SolidWorks"]
---

## Overview

A modular storage system with a shared 25mm grid unit across all components. Designed parametrically in SolidWorks with linked equations so all parts share the same base parameters.

The system has two layers of modularity:
- **Base plates** snap together using hex bowtie connectors to form surfaces of any size. Boxes push onto the base plate like Lego bricks.
- **Inside the box**, height-adjustable horizontal inlays clip into rack stops on the walls. Vertical dividers slide into slots on the inlays to create compartments of any width. Two inlays at different heights with different divider spacing create tapered cradles for tools like screwdrivers.

## Design Decisions

### Grid Unit: 25mm

Chosen after researching how major organizer systems (Systainer, PACKOUT, Sortimo, KLT) derive their dimensions. Key findings:

- **Milwaukee PACKOUT** uses ~50mm grid internally
- **Sortimo Insetbox** uses ~52-53mm grid
- **Allit EuroPlus** uses ~49mm grid
- **Raaco** uses ~24mm grid for small electronics parts
- **Industry standard (KLT/VDA 4500)** defines external footprints from Euro pallet (1200x800mm) subdivisions: 600x400, 400x300, 300x200mm

**25mm** hits the sweet spot: fine enough for small parts, while 50mm default compartments (2x2 units) match what the big systems use. It also solves the drawer runner problem cleanly.

### Inside-Out Design

External dimensions are derived from the internal grid — not the other way around. This guarantees insert compatibility across box types.

```
external = (grid_columns x 25mm) + (2 x wall_thickness)
```

### Drawer Runner Compatibility

Standard 12.7mm ball-bearing drawer slides consume ~12.5mm per side = 25mm total = exactly 1 grid column per side. This means:

- **Case** with N columns internal
- **Drawer** in same housing has N-2 columns internal
- Same inserts fit both — the drawer just loses 1 column per side

### Worked Example

| Parameter | Value |
|-----------|-------|
| Grid unit | 25 mm |
| Wall thickness | 2 mm |
| Runner clearance per side | 12.5 mm |
| Case grid | 12 x 8 = 300 x 200 mm internal |
| Case external | 304 x 204 mm |
| Drawer grid (same housing) | 10 x 8 = 250 x 200 mm internal |

### Reference: Industry Footprints

| System | External (mm) | Derived from |
|--------|--------------|--------------|
| Systainer (Tanos/Festool) | 396 x 296 | Euro pallet 1/8 |
| L-BOXX (Sortimo/Bosch) | 442 x 357 | Van racking depth |
| Milwaukee PACKOUT | 498 x 380 | Ergonomic carry / ~2" grid |
| KLT 400x300 | 400 x 300 | Euro pallet 1/8 (exact) |
| KLT 300x200 | 300 x 200 | Euro pallet 1/16 (exact) |

## Components

### Base system
- **[Base Plate](base-plate/index.mdx)** — Lego-style snap-fit plate with hex bowtie sockets for expansion
- **[Bowtie Connector](base-connector/index.mdx)** — snap-lock key for joining base plates side-by-side

### Storage
- **[Box](box/index.mdx)** — storage box with integrated rack stops for height-adjustable inlays

### Organization
- **[Horizontal Inlay](horizontal-inlay/index.mdx)** — height-adjustable slotted tray, clips into box rack stops
- **[Vertical Divider](vertical-divider/index.mdx)** — removable divider for variable-width compartments

## CAD

All parts are parametric SolidWorks files sharing a common 25mm grid unit. Designed for FDM 3D printing (0.2mm layer height, 2mm wall thickness).

## Log

follow pressious plastic milstones and create a modular mould for injection molding