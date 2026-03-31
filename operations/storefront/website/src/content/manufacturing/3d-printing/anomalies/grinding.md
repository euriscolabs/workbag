---
type: "article"
title: "Grinding / Stripping"
category: "Extrusion"
severity: "Critical"
description: "The extruder drive gear chews through the filament instead of pushing it forward. Once a groove is carved, the gear loses grip and extrusion stops entirely."
---

## What It Is

The extruder drive gear chews through the filament instead of pushing it forward. Once a groove is carved, the gear loses grip and extrusion stops entirely.

## How It Forms

The drive gear has teeth that grip the filament surface. When the gear pushes but the filament can't move (back-pressure too high), the teeth carve into the same spot repeatedly. The filament develops a flat groove. Once the groove is deep enough, the gear teeth spin inside it without engaging — like a stripped screw.

This is a cascading failure: the more it grinds, the less it grips, the more it grinds.

## Visual Signature

- Clicking/popping sounds from the extruder
- Filament shavings/dust around the gear
- Sudden under-extrusion that worsens rapidly
- Print stops extruding mid-way through
- Flat spot visible on filament when pulled out

## Root Causes

| Cause | Calibration Variable | Direction |
|-------|---------------------|-----------|
| Too many retractions in one area | Retraction | ↑ (distance or frequency) |
| Temperature too cold (filament too stiff) | Extrusion Temp | ↓ |
| Nozzle clogged (back-pressure) | — (maintenance) | — |
| Extruder tension too high | — (hardware) | ↑ |
| Printing faster than hotend can melt | Max Volumetric Flow | exceeded |

## How the Auto-Tuner Detects It

- **Roller encoder**: Actual movement drops while motor is still commanding → grinding detected immediately
- **Audio** (future): Characteristic clicking pattern detectable by microphone

## How the Auto-Tuner Fixes It

- **Live tuning**: Instant pause when encoder detects slip. Reduce speed, raise temp, reduce retraction.
- **Prevention**: Calibrated retraction limits, volumetric flow limits prevent the conditions that cause grinding
