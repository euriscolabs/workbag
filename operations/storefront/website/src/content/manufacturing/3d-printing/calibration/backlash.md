---
title: "Backlash Compensation"
category: "Printer-Specific"
priority: "Low"
description: "Mechanical play in the motion system — the small amount of 'lost' movement when an axis reverses direction."
---

## What It Is

Backlash is the mechanical slack in the drivetrain — when an axis reverses direction, the first fraction of a millimeter of motor rotation is taken up by play in gears, belts, or leadscrews before the carriage actually moves. Backlash compensation adds extra steps on direction changes to cancel this.

## What It Controls

- Dimensional accuracy on direction reversals
- Circle roundness (circles become ovals with backlash)
- Hole accuracy (holes print undersized)

## Why It Drifts

- Belt stretch increases play
- Leadscrew nut wear (Z-axis)
- Bearing wear
- Loose anti-backlash hardware

## How to Calibrate (Manual)

1. Mount a dial indicator against the carriage
2. Command a known move in +X, record indicator reading
3. Command same distance in -X, record reading
4. Difference = backlash value
5. Enter backlash compensation in firmware

## How the Auto-Tuner Calibrates It

- **Dial indicator + direction reversal measurement** — automated measurement sequence
- Measures all axes systematically
- Low priority: modern belt-driven printers have minimal backlash

## Related Anomalies

- [Backlash Artifacts](../anomalies/backlash-artifacts.md) — visible surface artifacts from uncompensated backlash
