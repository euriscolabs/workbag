---
type: "article"
title: "Max Acceleration / Velocity"
category: "Printer-Specific"
priority: "Medium"
description: "Maximum safe speed and acceleration limits — the fastest the printer can move without skipping steps, losing accuracy, or causing artifacts."
---

## What It Is

Maximum acceleration and velocity define the speed limits for the printer's motion system. Set too low, prints are unnecessarily slow. Set too high, the motors skip steps, belts slip, or vibration causes quality loss.

## What It Controls

- Print speed (total print time)
- Motor reliability (skipping steps = layer shifts)
- Print quality at speed (higher accel = more vibration)
- Travel move speed

## Why It Drifts

- Belt tension changes affect max reliable acceleration
- Motor driver current settings change
- Added toolhead mass (heavier = lower safe acceleration)
- Stepper motor heating (hot motors lose torque)

## How to Calibrate (Manual)

1. Start with conservative values (e.g., 3000 mm/s² accel, 300 mm/s velocity)
2. Increase acceleration in steps, print test objects
3. Watch for layer shifts, skipped steps, or quality degradation
4. Find the maximum values that produce clean prints
5. Set limits in firmware with safety margin (~80% of max)

## How the Auto-Tuner Calibrates It

- **Accelerometer** detects vibration amplitude at increasing speeds
- **Sensorless homing stall detection** identifies when motors approach skip threshold
- Systematically finds safe limits without trial-and-error prints

## Related Anomalies

- [Layer Shift](../anomalies/layer-shift.md) — acceleration too high causes step loss
- [Ghosting / Ringing](../anomalies/ghosting.md) — high acceleration excites resonances
