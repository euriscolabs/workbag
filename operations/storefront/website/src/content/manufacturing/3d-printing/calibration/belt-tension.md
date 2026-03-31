---
title: "Belt Tension"
category: "Printer-Specific"
priority: "Medium"
description: "Tension of the motion system belts — affects positional accuracy, resonance frequency, and print quality."
---

## What It Is

Belt tension determines how tightly the timing belts connect stepper motors to the print head and bed carriages. Too loose causes backlash and position errors. Too tight causes premature bearing and motor wear.

## What It Controls

- Positional accuracy (loose belts skip or lag)
- Resonance frequency (tension affects vibration characteristics)
- Input shaper effectiveness (IS is tuned to a specific resonance)
- Backlash magnitude

## Why It Drifts

- Belts stretch over time (especially cheaper ones)
- Temperature cycling (belt material expands/contracts)
- Tensioner hardware loosening

## How to Calibrate (Manual)

1. Pluck the belt like a guitar string
2. Use a phone app or tuner to measure the frequency
3. Compare to manufacturer recommendation (e.g., ~110Hz for many CoreXY printers)
4. Adjust tensioner until frequency matches
5. Both belts should match within ~5Hz

## How the Auto-Tuner Calibrates It

- **Frequency analysis** using microphone or accelerometer — pluck belt, measure frequency, compare to target
- Can monitor tension drift over time and alert when re-tensioning is needed
- Triggers input shaper re-calibration when tension changes significantly

## Related Anomalies

- [Ghosting / Ringing](../anomalies/ghosting.md) — wrong tension shifts resonance away from IS calibration
- [Layer Shift](../anomalies/layer-shift.md) — severely loose belts can skip teeth
- [Backlash Artifacts](../anomalies/backlash-artifacts.md) — loose belts increase backlash
