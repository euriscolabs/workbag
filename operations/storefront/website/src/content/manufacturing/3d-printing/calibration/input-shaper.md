---
type: "article"
title: "Input Shaper"
category: "Printer-Specific"
priority: "Medium"
description: "Vibration compensation — measures the printer's resonant frequencies and applies counter-signals to cancel ringing artifacts at corners and direction changes."
---

## What It Is

Input shaping measures the mechanical resonance frequencies of the printer and applies a filter to motion commands that cancels vibrations. This eliminates ghosting/ringing artifacts, especially at sharp corners and direction changes.

## What It Controls

- Surface quality at corners and direction changes
- Maximum achievable print speed without artifacts
- Ghosting/ringing severity

## Why It Drifts

- Belt tension changes
- Loose screws or frame bolts
- Adding/removing mass from the toolhead (different hotend, fan, camera)
- Bed load changes (heavy print on bed affects Y-axis resonance)

## How to Calibrate (Manual — Klipper)

1. Mount ADXL345 accelerometer to toolhead
2. Run `SHAPER_CALIBRATE` macro
3. Klipper measures resonances on X and Y axes
4. Firmware selects optimal shaper type and frequency
5. Save to `printer.cfg`

## How the Auto-Tuner Calibrates It

- **Already automatable** via Klipper + ADXL345 — the auto-tuner triggers the calibration routine
- Permanently mounted accelerometer enables periodic re-calibration
- Can detect resonance changes and suggest re-tuning

## Related Anomalies

- [Ghosting / Ringing](../anomalies/ghosting.md) — the primary artifact input shaping eliminates
