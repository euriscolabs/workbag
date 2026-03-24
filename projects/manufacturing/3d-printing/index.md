---
title: "3D Printing Setup"
description: "Calibration guides, material settings, and documentation for the Prusa XL 5-tool multi-material printer."
status: "In Progress"
category: "Manufacturing"
tags: ["3D Printing", "Hardware", "Documentation"]
published: false
---

# 🖨️ 3D Printing

> Perfect prints, every time. Calibration guides and settings for the Prusa XL 5-tool.

## Printer

| Spec             | Value                      |
| ---------------- | -------------------------- |
| **Model**        | Prusa XL 5-tool            |
| **Build Volume** | 360×360×360 mm             |
| **Extruders**    | 5 (multi-material capable) |
| **Status**       | 🟡 Calibration in progress |

## Quick Links

<div class="grid-links">

- [🎯 Calibration Overview](/3d-printing/calibration) - Complete calibration checklist
- [📐 First Layer](/3d-printing/first-layer) - Z-offset and first layer perfection
- [⚖️ Bed Leveling](/3d-printing/bed-leveling) - Mesh bed leveling setup
- [🔧 Extruder Calibration](/3d-printing/extruder) - E-steps and flow rate
- [🌡️ Temperature](/3d-printing/temperature) - PID tuning and temp towers
- [🌉 Bridges](/3d-printing/bridges) - Bridge speed, cooling, and temperature
- [📐 Overhangs](/3d-printing/overhangs) - Maximum overhang angle without support
- [🎨 Multi-Material](/3d-printing/multi-material) - Tool alignment and purge settings

</div>

## Current Status

### Calibration Progress

| Component              | Status         | Last Calibrated |
| ---------------------- | -------------- | --------------- |
| First Layer (Z-offset) | 🟡 In Progress | -               |
| Bed Leveling           | ⚪ Not Started | -               |
| Extruder E-steps       | ⚪ Not Started | -               |
| Temperature (PID)      | ⚪ Not Started | -               |
| Flow Rate              | ⚪ Not Started | -               |
| Bridges                | ⚪ Not Started | -               |
| Overhangs              | ⚪ Not Started | -               |
| Multi-Tool Alignment   | ⚪ Not Started | -               |
| Retraction             | ⚪ Not Started | -               |

### Print Quality Goals

- [ ] Perfect first layer adhesion (no warping, no gaps)
- [ ] Consistent layer height across entire bed
- [ ] No stringing or oozing
- [ ] Accurate dimensions (±0.1mm)
- [ ] Smooth surface finish
- [ ] Clean bridges (50mm+ without support)
- [ ] Good overhangs (60°+ without support)
- [ ] Reliable multi-material prints

---

## Calibration Philosophy

**Order matters!** Calibrate in this sequence:

```
1. First Layer (Z-offset)
   ↓
2. Bed Leveling (Mesh)
   ↓
3. Extruder E-steps
   ↓
4. Temperature (PID)
   ↓
5. Flow Rate
   ↓
6. Retraction
   ↓
7. Bridges
   ↓
8. Overhangs
   ↓
9. Multi-Material (if applicable)
```

**Why this order?**

- First layer affects everything else
- Bed leveling ensures consistent Z across bed
- E-steps must be correct before flow calibration
- Temperature affects all other settings
- Flow and retraction fine-tune quality
- Multi-material requires all above to be perfect

---

## Materials & Profiles

| Material | Brand | Temp (Nozzle/Bed) | Status            |
| -------- | ----- | ----------------- | ----------------- |
| PLA      | -     | -                 | ⚪ Not configured |
| PETG     | -     | -                 | ⚪ Not configured |
| TPU      | -     | -                 | ⚪ Not configured |

---
