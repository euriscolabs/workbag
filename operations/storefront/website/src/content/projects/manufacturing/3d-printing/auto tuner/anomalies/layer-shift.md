---
title: "Layer Shift"
category: "Motion"
severity: "Critical"
description: "A sudden horizontal offset — all layers above a certain point are shifted sideways. The print continues but in the wrong position."
---

## What It Is

A sudden horizontal offset — all layers above a certain point are shifted sideways. The print continues but in the wrong position.

## How It Forms

Stepper motors are open-loop — they don't have position feedback. The firmware sends step pulses and assumes the motor followed. When the motor can't keep up (not enough torque for the commanded acceleration), it skips steps. Each skipped step is a permanent position error.

The printer doesn't know it shifted. It continues printing at the new (wrong) position. The result is a clean horizontal offset visible in the part.

Multiple shifts create a staircase pattern. A single severe shift can offset the nozzle so far that it crashes into the already-printed part.

## Visual Signature

- Clean horizontal offset visible from the side
- All layers above the event are shifted uniformly
- Staircase pattern if multiple shifts occur
- Sometimes accompanied by a grinding/clicking sound at the moment of shift
- Part may still complete but is unusable

## Root Causes

| Cause | Calibration Variable | Direction |
|-------|---------------------|-----------|
| Acceleration too high | Max Accel/Velocity | ↑ |
| Belt tension too loose | Belt Tension | ↓ |
| Belt skips on pulley | — (hardware) | — |
| Loose grub screw on pulley | — (maintenance) | — |
| Stepper driver overheating | — (electronics) | — |
| Mechanical obstruction | — (physical) | — |
| Nozzle crashes into curled overhang | Cooling, Temp | — |

## How the Auto-Tuner Detects It

- **Camera**: Outline comparison — printed part outline suddenly doesn't match expected. Immediate detection.
- **Accelerometer**: Abnormal vibration spike at moment of shift.
- **Sensorless homing** (TMC drivers): Stall detection can catch missed steps in real-time.

## How the Auto-Tuner Fixes It

- **Calibration**: Find max safe acceleration per axis. Belt tension verification.
- **Live tuning**: Anomaly detection pauses print on shift detection to prevent wasting remaining filament/time.
- **Prevention**: Conservative speed limits based on measured hardware capability.
