---
title: "Clogging / Partial Clog"
category: "Structural"
severity: "Critical"
description: "Nozzle fully or partially blocked. No extrusion (full clog) or reduced, inconsistent extrusion (partial clog)."
---

## What It Is

Nozzle fully or partially blocked. No extrusion (full clog) or reduced, inconsistent extrusion (partial clog).

## How It Forms

Several mechanisms:

1. **Carbonization** — Filament left at high temperature too long burns and carbonizes. The carbon deposits narrow the nozzle opening or create a plug. Common when heating the nozzle and leaving it idle.

2. **Foreign particles** — Dust, debris, or low-quality filament with contaminants gets pushed into the nozzle. Particles too large for the nozzle opening lodge at the tip.

3. **Heat creep jam** — Softened filament in the cold zone solidifies into a plug when the printer cools down. On next heat-up, the plug doesn't fully re-melt.

4. **Filament change remnants** — When switching filaments, the old material may not fully purge. If the new filament has a different melt temp, remnants of the old can solidify and partially block the path.

5. **Nozzle wear** — Abrasive filaments (carbon fiber, glow-in-the-dark, metal-fill) erode brass nozzles. The eroded particles can partially block the path or the deformed nozzle geometry creates turbulent flow.

## Visual Signature

- Sudden complete stop of extrusion (full clog)
- Inconsistent, sputtering flow (partial clog)
- Extruder clicking/grinding (motor can't push through)
- Thin, irregular lines that vary in width
- Extrusion works briefly after clearing, then clogs again (recurring)

## Root Causes

| Cause | Calibration Variable | Direction |
|-------|---------------------|-----------|
| Temperature too high for too long | Extrusion Temp | ↑↑ |
| Cheap filament with contaminants | — (material quality) | — |
| Heat creep (see heat-creep.md) | Extrusion Temp, Retraction | — |
| Incomplete filament purge | — (procedure) | — |
| Nozzle wear from abrasive filament | — (hardware) | — |

## How the Auto-Tuner Detects It

- **Roller encoder**: Commanded movement with no actual movement = full clog. Commanded vs. actual diverging = partial clog.
- **Extruder current** (future): Motor draws more current when pushing against a blockage.

## How the Auto-Tuner Fixes It

- **Detection**: Immediate pause when encoder detects no flow. Prevents grinding.
- **Prevention**: Temperature management, filament quality monitoring.
- **Clearing**: Cannot clear a clog automatically — but detecting it early prevents the cascading damage of continued grinding.
