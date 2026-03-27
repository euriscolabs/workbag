---
title: "3D Printing Setup"
description: "Calibration guides, material settings, and documentation for the Prusa XL 5-tool multi-material printer."
status: "In Progress"
category: "Manufacturing"
tags: ["3D Printing", "Hardware", "Documentation"]
published: false
---

## Overview

Documentation and calibration tracking for the Prusa XL 5-tool multi-material printer — aiming for perfect, repeatable prints across all materials.

## Printer

| Spec             | Value                      |
| ---------------- | -------------------------- |
| **Model**        | Prusa XL 5-tool            |
| **Build Volume** | 360x360x360 mm             |
| **Extruders**    | 5 (multi-material capable) |
| **Status**       | Calibration in progress    |

## Calibration Progress

| Component              | Status         | Last Calibrated |
| ---------------------- | -------------- | --------------- |
| First Layer (Z-offset) | In Progress    | -               |
| Bed Leveling           | Not Started    | -               |
| Extruder E-steps       | Not Started    | -               |
| Temperature (PID)      | Not Started    | -               |
| Flow Rate              | Not Started    | -               |
| Bridges                | Not Started    | -               |
| Overhangs              | Not Started    | -               |
| Multi-Tool Alignment   | Not Started    | -               |
| Retraction             | Not Started    | -               |

## Calibration Order

Order matters — each step depends on the previous:

1. First Layer (Z-offset)
2. Bed Leveling (Mesh)
3. Extruder E-steps
4. Temperature (PID)
5. Flow Rate
6. Retraction
7. Bridges
8. Overhangs
9. Multi-Material (if applicable)

## Print Quality Goals

- Perfect first layer adhesion (no warping, no gaps)
- Consistent layer height across entire bed
- No stringing or oozing
- Accurate dimensions (+-0.1mm)
- Smooth surface finish
- Clean bridges (50mm+ without support)
- Good overhangs (60+ degrees without support)
- Reliable multi-material prints

## Materials & Profiles

| Material | Brand | Temp (Nozzle/Bed) | Status         |
| -------- | ----- | ----------------- | -------------- |
| PLA      | -     | -                 | Not configured |
| PETG     | -     | -                 | Not configured |
| TPU      | -     | -                 | Not configured |

## Log
