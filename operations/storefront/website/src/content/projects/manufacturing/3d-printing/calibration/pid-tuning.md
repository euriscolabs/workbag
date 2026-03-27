---
title: "PID Tuning"
category: "Printer-Specific"
priority: "Medium"
description: "Proportional-Integral-Derivative temperature control — tunes how the heater responds to reach and maintain target temperature without oscillation."
---

## What It Is

PID tuning calibrates the feedback loop that controls hotend and bed heaters. Proper PID values mean the heater reaches target temperature quickly, holds it steady, and doesn't oscillate (swing above and below target).

## What It Controls

- Temperature stability during printing
- Overshoot on heat-up
- Temperature oscillation amplitude
- Consistency of extrusion (melting is temperature-dependent)

## Why It Drifts

- Changing hotend hardware (different heater cartridge, heat block, or thermistor)
- Ambient temperature changes (enclosure vs. open air)
- Worn or degraded heating elements
- Different thermal mass (e.g., adding a silicone sock)

## How to Calibrate (Manual)

1. Run `M303 E0 S210 C8` (auto-tune hotend to 210°C, 8 cycles)
2. Firmware reports optimal Kp, Ki, Kd values
3. Apply with `M301 P<Kp> I<Ki> D<Kd>`, save with `M500`
4. Repeat for bed: `M303 E-1 S60 C8`, apply with `M304`

## How the Auto-Tuner Calibrates It

- **Already automatable** via G-code `M303` — the auto-tuner simply issues the command and applies the result
- Can be triggered automatically after hardware changes are detected

## Related Anomalies

- [Stringing](../anomalies/stringing.md) — temperature oscillation causes inconsistent oozing
- [Under-extrusion](../anomalies/under-extrusion.md) — temperature dips cause temporary flow reduction
