---
layout: doc
---

# 🎯 Calibration Overview

Complete calibration checklist for achieving perfect prints on the Prusa XL 5-tool.

## Calibration Checklist

### Essential (Do First)

- [ ] **First Layer (Z-offset)**
  - [ ] Live Z adjustment
  - [ ] First layer test print
  - [ ] Verify adhesion across bed
  - [ ] Document optimal Z value

- [ ] **Bed Leveling**
  - [ ] Run mesh bed leveling
  - [ ] Check mesh visualization
  - [ ] Adjust if variance > 0.2mm
  - [ ] Save mesh to EEPROM

### Extrusion & Flow

- [ ] **Extruder E-steps**
  - [ ] Measure current E-steps
  - [ ] Mark 100mm of filament
  - [ ] Extrude 100mm
  - [ ] Calculate new E-steps
  - [ ] Update firmware

- [ ] **Flow Rate**
  - [ ] Print single-wall calibration cube
  - [ ] Measure wall thickness
  - [ ] Calculate flow multiplier
  - [ ] Test with different materials

### Temperature

- [ ] **PID Tuning**
  - [ ] Tune hotend PID for each tool
  - [ ] Tune bed PID
  - [ ] Save to EEPROM
  - [ ] Verify stable temps

- [ ] **Temperature Towers**
  - [ ] Print temp tower for each material
  - [ ] Identify optimal temperature
  - [ ] Document in material profiles

### Quality Tuning

- [ ] **Retraction**
  - [ ] Test retraction distance (0.5-2mm)
  - [ ] Test retraction speed (20-60mm/s)
  - [ ] Find minimum for no stringing
  - [ ] Test with different materials

- [ ] **Bridges**
  - [ ] Test bridge speed (30-60mm/s)
  - [ ] Test bridge temperature (-5 to -10°C)
  - [ ] Test bridge flow (0.90-0.95)
  - [ ] Find maximum bridge length

- [ ] **Overhangs**
  - [ ] Test overhang speed (20-40mm/s)
  - [ ] Test overhang temperature (-5 to -10°C)
  - [ ] Test layer height (0.1-0.2mm)
  - [ ] Find maximum overhang angle

- [ ] **Print Speed**
  - [ ] Test perimeters (20-60mm/s)
  - [ ] Test infill (40-100mm/s)
  - [ ] Test travel speed (100-200mm/s)
  - [ ] Balance speed vs quality

### Multi-Material (Prusa XL 5-tool)

- [ ] **Tool Alignment**
  - [ ] Calibrate tool offsets (X, Y, Z)
  - [ ] Print alignment test
  - [ ] Verify all tools hit same spot
  - [ ] Fine-tune if needed

- [ ] **Purge Settings**
  - [ ] Configure purge volume
  - [ ] Test material transitions
  - [ ] Minimize waste
  - [ ] Verify clean color changes

- [ ] **Wipe Tower**
  - [ ] Configure wipe tower settings
  - [ ] Test multi-material prints
  - [ ] Optimize tower size

### Advanced

- [ ] **Linear Advance / Pressure Advance**
  - [ ] Calibrate K-factor
  - [ ] Test with different speeds
  - [ ] Material-specific values

- [ ] **Input Shaping**
  - [ ] Run resonance test
  - [ ] Configure if available
  - [ ] Test at high speeds

---

## Calibration Order

**Critical Path:**

```
1. First Layer (Z-offset)
   └─> Affects all prints
   
2. Bed Leveling
   └─> Ensures consistent Z across bed
   
3. Extruder E-steps
   └─> Foundation for accurate extrusion
   
4. Temperature (PID)
   └─> Stable temps = consistent quality
   
5. Flow Rate
   └─> Fine-tune extrusion after E-steps
   
6. Retraction
   └─> Eliminate stringing/oozing
   
7. Bridges
   └─> Print across gaps without support
   
8. Overhangs
   └─> Print angles without support
   
9. Multi-Material
   └─> Only after single-material is perfect
```

---

## Testing Prints

### Essential Test Prints

| Print | Purpose | When to Use |
|-------|---------|-------------|
| First Layer Test | Z-offset calibration | Always start here |
| Calibration Cube | Dimensions, flow | After E-steps |
| Temperature Tower | Optimal temp | For each material |
| Retraction Test | Stringing | After flow calibration |
| Bridge Test | Bridge quality | After temperature |
| Overhang Test | Max overhang angle | After bridges |
| Benchy | Overall quality | Final validation |
| Multi-Material Test | Tool alignment | For multi-material |

### Where to Find Models

- [Thingiverse](https://www.thingiverse.com)
- [Printables](https://www.printables.com)
- [Prusa Knowledge Base](https://help.prusa3d.com)

---

## Documentation

**Record everything!**

For each calibration:
- Date performed
- Settings used
- Results/measurements
- Optimal values found
- Material used
- Notes/observations

This helps you:
- Replicate good prints
- Troubleshoot issues
- Track changes over time

---

## Maintenance Schedule

| Task | Frequency | Notes |
|------|-----------|-------|
| Check first layer | Every print | Quick visual check |
| Bed leveling | Weekly | Or if prints fail |
| E-steps check | Monthly | Or after maintenance |
| PID tuning | After nozzle change | Or if temps unstable |
| Full calibration | After major changes | Nozzle, hotend, etc. |

---

## Troubleshooting

### Common Issues

| Problem | Likely Cause | Check |
|---------|--------------|-------|
| Poor first layer | Z-offset wrong | First layer calibration |
| Warping | Bed not level | Bed leveling |
| Under-extrusion | E-steps wrong | Extruder calibration |
| Over-extrusion | Flow too high | Flow calibration |
| Stringing | Retraction wrong | Retraction test |
| Layer shifts | Mechanical issue | Check belts, pulleys |

---

## Resources

- [Prusa XL Manual](https://manual.prusa3d.com/Guide/XL+5-toolhead)
- [Prusa Knowledge Base](https://help.prusa3d.com)
- [Teaching Tech Calibration](https://teachingtechyt.github.io/calibration.html)

