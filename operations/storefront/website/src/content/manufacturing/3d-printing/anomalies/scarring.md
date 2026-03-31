---
type: "article"
title: "Scarring / Nozzle Marks"
category: "Surface"
severity: "Low"
description: "Scratches or drag marks on top surfaces from the nozzle dragging across already-deposited material during travel moves."
---

## What It Is

Scratches or drag marks on top surfaces from the nozzle dragging across already-deposited material during travel moves.

## How It Forms

During non-print travel moves, the nozzle crosses over previously printed areas. If the nozzle is at the same Z height as the top of the printed material (or lower due to over-extrusion), it physically scrapes across the surface.

The scraping creates visible marks — shiny lines on matte filament, or grooves in the surface. On flexible materials, it can even shift or deform the printed geometry.

Z-hop (raising the nozzle during travel) prevents this by lifting the nozzle above the surface. But Z-hop adds print time and can cause its own artifacts (stringing from the vertical retraction).

## Visual Signature

- Lines/scratches that don't follow the print pattern
- Shiny drag marks on matte surfaces
- More visible on top surfaces and flat areas
- Pattern follows travel move paths (diagonal lines)

## Root Causes

| Cause | Calibration Variable | Direction |
|-------|---------------------|-----------|
| Z-hop not enabled | — (slicer) | — |
| Over-extrusion (material sits high) | Flow Rate, E-Steps | ↑ |
| Combing disabled (travels cross print) | — (slicer) | — |

## How the Auto-Tuner Detects It

- **Camera**: Surface marks that don't align with extrusion pattern

## How the Auto-Tuner Fixes It

- **Detection only** — primarily a slicer setting (enable Z-hop, combing). Auto-tuner can flag over-extrusion as a contributing cause.
