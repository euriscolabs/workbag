---
title: "Calibration"
layout: /src/layouts/PageLayout.astro
cards: true
---

- [Axis Steps/mm](axis-steps.md) — Steps per millimeter for X, Y, and Z axes — determines positional accuracy of the print head and bed.
- [Backlash Compensation](backlash.md) — Mechanical play in the motion system — the small amount of 'lost' movement when an axis reverses direction.
- [Bed Mesh / ABL](bed-mesh.md) — Automatic bed leveling — probes the bed surface to create a mesh that compensates for unevenness during printing.
- [Bed Temperature](bed-temperature.md) — Heated bed temperature for a given filament — controls first layer adhesion, warping tendency, and part release.
- [Belt Tension](belt-tension.md) — Tension of the motion system belts — affects positional accuracy, resonance frequency, and print quality.
- [Cooling / Fan Speed](cooling.md) — Part cooling fan speed — controls how fast extruded plastic solidifies, affecting overhang quality, bridging, and layer bonding.
- [E-Steps](e-steps.mdx) — Extruder steps per millimeter — how many motor steps the extruder needs to push exactly 1mm of filament. The foundation of all extrusion accuracy.
- [Extrusion Temperature](extrusion-temperature.md) — Nozzle temperature for a given filament — controls melt viscosity, layer adhesion, stringing, and surface finish.
- [Flow Rate](flow-rate.md) — Extrusion multiplier — fine-tunes the volume of plastic deposited after E-steps are calibrated. Compensates for filament diameter variation and material compressibility.
- [Input Shaper](input-shaper.md) — Vibration compensation — measures the printer's resonant frequencies and applies counter-signals to cancel ringing artifacts at corners and direction changes.
- [Max Acceleration / Velocity](max-acceleration.md) — Maximum safe speed and acceleration limits — the fastest the printer can move without skipping steps, losing accuracy, or causing artifacts.
- [Max Volumetric Flow](max-volumetric-flow.md) — The maximum volume of plastic (mm³/s) the hotend can melt and push through the nozzle — the true speed limit for extrusion.
- [PID Tuning](pid-tuning.md) — Proportional-Integral-Derivative temperature control — tunes how the heater responds to reach and maintain target temperature without oscillation.
- [Pressure Advance](pressure-advance.md) — Compensates for pressure buildup and release in the melt zone — pre-decompresses before decelerations to prevent bulging at corners and oozing at stops.
- [Retraction](retraction.md) — Pulling filament back before travel moves to relieve melt zone pressure and prevent oozing. Defined by distance and speed.
- [Skew Compensation](skew-compensation.md) — Corrects non-perpendicularity of the X/Y axes — when the frame isn't perfectly square, prints come out as parallelograms instead of rectangles.
- [Speed Profile](speed-profile.md) — Per-feature print speeds — optimal speeds for perimeters, infill, bridges, overhangs, top surfaces, first layer, and travel moves.
- [Probe Z-Offset](z-offset.md) — The distance between the probe trigger point and the actual nozzle tip — determines true first layer height.
