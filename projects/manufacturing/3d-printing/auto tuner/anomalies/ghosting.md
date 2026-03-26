---
title: "Ghosting / Ringing"
category: "Motion"
severity: "Medium"
description: "Ripple pattern on surfaces near sharp features — an echo of corners, letters, or holes repeated as a decaying wave across flat walls."
---

## What It Is

Ripple pattern on surfaces near sharp features — an echo of corners, letters, or holes repeated as a decaying wave across flat walls.

## How It Forms

When the toolhead changes direction sharply (at a corner), the sudden deceleration and re-acceleration causes the mechanical system to vibrate. The toolhead overshoots the corner, bounces back, overshoots again — each bounce smaller than the last.

This vibration imprints on the deposited plastic. The nozzle is laying down material while oscillating, so the wall surface gets a wave pattern that decays with distance from the feature.

Every printer has a natural resonant frequency determined by its mass and rigidity. Input Shaper works by sending counter-pulses that cancel this frequency — destructive interference at the mechanical level.

## Visual Signature

- Ripples radiating from corners on adjacent flat surfaces
- Echo of text/logos on smooth walls
- Vertical bands at regular spacing
- More pronounced at higher speeds
- Pattern spacing matches printer's resonant period

## Root Causes

| Cause | Calibration Variable | Direction |
|-------|---------------------|-----------|
| Input Shaper not tuned | Input Shaper | disabled/wrong |
| Belt tension too loose | Belt Tension | ↓ |
| Speed/accel too high | Max Accel/Velocity | ↑ |
| Heavy toolhead | — (hardware) | — |
| Loose frame/bearings | — (maintenance) | — |

## How the Auto-Tuner Detects It

- **Accelerometer (ADXL345)**: Measures actual vibration frequency during test moves. Already used by Klipper for input shaper calibration.
- **Camera**: Surface analysis detecting periodic patterns near features.

## How the Auto-Tuner Fixes It

- **Calibration**: ADXL345 frequency sweep → find resonant peaks → select optimal shaper type and frequency
- **Belt tension**: Frequency analysis ensures belts are at correct tension before shaper tuning
