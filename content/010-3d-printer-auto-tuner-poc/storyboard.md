# Storyboard — 3D Printer Auto-Tuner: Proof of Concept

## Hook (0:00-0:30)

V: Fast montage — failed prints, spaghetti, stringing, layer shifts, warping. Cut to me staring at a calibration cube. Cut to scrolling through calibration guides.
A: "Every 3D printing guide says the same thing: just calibrate your printer. As if that's simple."

V: Reveal of the sensor board mounted on the printer
A: "So I built something to do it for me."

---

## Intro (0:30-2:00)

V: Me at desk, casual
A: "If you own a 3D printer, you know the pain. E-steps, flow rate, pressure advance, retraction, temperature — dozens of parameters that all interact with each other. Change your filament? Do it again. Change your nozzle? Again. And if you skip it, your prints suffer."

V: Show examples of bad prints caused by bad calibration
A: "Most people just live with 'good enough' because the calibration process takes hours and requires experience to interpret. I wanted to fix that."

---

## Science Segment — What Actually Needs Calibrating? (2:00-5:00)

### Part 1 — The Three Categories

V: Diagram showing the three calibration categories
A: "I broke calibration down into three categories."

V: [ANIMATION — three calibration categories diagram](projects/manufacturing/3d-printing/auto tuner/animations/calibration-categories.tsx)
A: "First: printer-specific calibrations. These are about your hardware — E-steps, belt tension, bed mesh, input shaper. You do these once and only redo them after maintenance or hardware changes."
"Second: filament-specific calibrations. Temperature, flow rate, retraction, pressure advance. Every new spool needs these."
"Third: live tuning. Real-time adjustments during a print — temperature compensation, speed changes, anomaly detection. This is the advanced stuff we'll tackle later."

### Part 2 — Printer-Specific Variables (The Foundation)

V: [ANIMATION — Axis Steps/mm](projects/manufacturing/3d-printing/auto tuner/animations/src/compositions/printer-specific/AxisSteps.tsx)
A: "Let's start with the foundation. Axis steps per millimeter — this tells each motor exactly how many steps equal one millimeter of movement. Get this wrong and everything is the wrong size. It's set by your hardware geometry and almost never drifts."

V: [ANIMATION — E-Steps](projects/manufacturing/3d-printing/auto tuner/animations/src/compositions/printer-specific/ESteps.tsx)
A: "Next: E-steps. Same idea, but for your extruder. How many motor steps to push exactly one millimeter of filament. Too few — under-extrusion, thin walls, weak parts. Too many — blobs, clogs, rough surfaces. Unlike axis steps, this one can drift as your extruder gear wears."

V: [ANIMATION — PID Tuning](projects/manufacturing/3d-printing/auto tuner/animations/src/compositions/printer-specific/PidTuning.tsx)
A: "PID tuning. This is the control loop that holds your hotend and bed at a stable temperature. Bad PID means your temperature is swinging five, ten degrees — and you see it in inconsistent extrusion. The good news: your printer can auto-tune this with a single G-code command."

V: [ANIMATION — Bed Mesh / ABL](projects/manufacturing/3d-printing/auto tuner/animations/src/compositions/printer-specific/BedMesh.tsx)
A: "Bed mesh. Your bed isn't perfectly flat — it's warped, tilted, maybe both. Auto bed leveling maps the surface so your first layer compensates. Without it, one corner sticks too much while the other doesn't stick at all."

V: [ANIMATION — Probe Z-Offset](projects/manufacturing/3d-printing/auto tuner/animations/src/compositions/printer-specific/ProbeZOffset.tsx)
A: "Z-offset. The distance between where your probe triggers and where the nozzle actually is. This is the difference between a perfect first layer and the nozzle either floating above the bed or digging into it."

V: [ANIMATION — Belt Tension](projects/manufacturing/3d-printing/auto tuner/animations/src/compositions/printer-specific/BeltTension.tsx)
A: "Belt tension. Too loose and you get ghosting, ringing, rounded corners. Too tight and you're stressing your motors and bearings. You can measure it by the frequency the belt vibrates at when plucked — like tuning a guitar."

V: [ANIMATION — Input Shaper](projects/manufacturing/3d-printing/auto tuner/animations/src/compositions/printer-specific/InputShaper.tsx)
A: "Input shaper. This is firmware-level vibration compensation. It figures out your printer's resonant frequencies and cancels them out. The result: clean corners even at high speeds. Without it, every direction change leaves a ghost."

V: [ANIMATION — Backlash](projects/manufacturing/3d-printing/auto tuner/animations/src/compositions/printer-specific/Backlash.tsx)
A: "Backlash. That tiny bit of play when an axis reverses direction. Your motor turns but the axis doesn't move yet. It makes circles oval and dimensions slightly off."

V: [ANIMATION — Skew Compensation](projects/manufacturing/3d-printing/auto tuner/animations/src/compositions/printer-specific/SkewCompensation.tsx)
A: "Skew compensation. If your X and Y axes aren't perfectly perpendicular, rectangles come out as parallelograms. Parts that should fit together — don't."

V: [ANIMATION — Max Acceleration & Velocity](projects/manufacturing/3d-printing/auto tuner/animations/src/compositions/printer-specific/MaxAccelVelocity.tsx)
A: "And finally: max acceleration and velocity. This is the capstone — how fast can your printer actually go before quality falls apart? Set it too high and you get layer shifts and ringing. Too low and you're just wasting time."

### Part 3 — Why This Order Matters

V: Me at whiteboard/desk
A: "You can't tune filament settings if your E-steps are wrong. You can't do live tuning if your baseline is garbage. So we start with the foundation: printer-specific, then filament, then live."

---

## Design / Build (5:00-12:00)

### What We're Automating in the PoC

V: List on screen, me talking through each
A: TODO — decide which calibrations make the cut for PoC

### The Sensor Hardware

V: Parts laid out on desk, assembly footage
A: TODO — walkthrough of components and why we chose them

### The Software

V: Screen recording of the host software
A: TODO — architecture overview, how it talks to the printer

### Mounting and Integration

V: B-roll of mounting sensors on the printer
A: TODO — how it attaches, what's permanent vs. temporary

---

## Testing & Results (12:00-16:00)

V: Live demo — running auto-calibration from start to finish
A: TODO

V: Before/after print comparison (macro shots)
A: TODO — honest assessment, what improved, what didn't

---

## What's Next (16:00-17:00)

V: Me at desk
A: TODO — v2 plans, what calibrations to add next, PCB design, better housing

---

## Outro / CTA (17:00-17:30)

V: Shot of the printer running with the auto-tuner attached
A: "If you want to follow this project, subscribe — next video we'll refine the hardware, add more calibrations, and start designing a proper PCB. Files are on GitHub, links below."

---
