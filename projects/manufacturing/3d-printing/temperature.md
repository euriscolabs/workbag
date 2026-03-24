---
layout: doc
---

# 🌡️ Temperature Calibration

Stable temperatures and optimal material temps are crucial for consistent print quality.

## Why Temperature Matters

Temperature affects:
- ✅ Layer adhesion
- ✅ Surface finish
- ✅ Dimensional accuracy
- ✅ Stringing/oozing
- ✅ Print strength

**Rule:** Each material has an optimal temperature range.

---

## PID Tuning

PID (Proportional-Integral-Derivative) tuning ensures stable temperatures.

### Why PID Tune?

Without PID tuning:
- ❌ Temperature overshoots
- ❌ Temperature oscillations
- ❌ Inconsistent print quality
- ❌ Thermal runaway protection triggers

### Prusa XL PID Tuning

**Method 1: Automatic (Recommended)**

1. **Connect to printer**
   - USB or OctoPrint
   - Or use printer menu

2. **Run PID autotune**
   - G-code: `M303 E0 S215 C8`
     - `E0` = Tool 0 (Tool 1)
     - `S215` = Target temp (PLA example)
     - `C8` = 8 cycles
   - Or: Menu → `Settings` → `Temperature` → `PID Tuning`

3. **Wait for completion**
   - Takes 5-10 minutes
   - Printer will heat/cool cycles
   - Don't interrupt!

4. **Save values**
   - G-code: `M500` (save to EEPROM)
   - Or use menu to save

5. **Repeat for each tool**
   - Prusa XL 5-tool: Tune all 5 tools
   - Use same target temp for each

**Method 2: Manual PID Tuning**

If automatic doesn't work:

1. **Start with default values**
2. **Test print**
3. **Adjust P, I, D values**
4. **Test again**
5. **Iterate until stable**

**Note:** Manual tuning is advanced. Use automatic if possible.

### Bed PID Tuning

Bed also needs PID tuning:

```gcode
M303 E-1 S60 C8    ; Tune bed at 60°C, 8 cycles
M500               ; Save
```

---

## Temperature Towers

Temperature towers find the optimal printing temperature for each material.

### Printing a Temperature Tower

1. **Download model**
   - [Teaching Tech Temp Tower](https://www.thingiverse.com/thing:2729076)
   - Or use PrusaSlicer temperature modifier

2. **Configure in slicer**
   - PrusaSlicer: Add temperature modifier per layer
   - Typical range: 190-230°C (PLA)
   - 5-10°C increments

3. **Print and evaluate**
   - Check each temperature section
   - Look for:
     - Best layer adhesion
     - Smoothest surface
     - Least stringing
     - Sharpest details

4. **Document optimal temp**
   - Record in material profile
   - Use for all prints

### What to Look For

| Issue | Temperature Too Low | Temperature Too High |
|-------|---------------------|---------------------|
| Layer adhesion | Poor | Good |
| Surface finish | Rough | Smooth |
| Stringing | Less | More |
| Details | Sharp | Blurry |
| Strength | Weak | Good |

**Optimal:** Balance of all factors

---

## Material Temperature Ranges

| Material | Nozzle Range | Bed Range | Optimal (Typical) |
|----------|-------------|----------|-------------------|
| PLA | 190-220°C | 50-70°C | 210°C / 60°C |
| PETG | 220-250°C | 70-90°C | 240°C / 80°C |
| TPU | 220-250°C | 40-60°C | 230°C / 50°C |
| ABS | 230-260°C | 80-100°C | 250°C / 90°C |
| ASA | 240-270°C | 80-100°C | 260°C / 90°C |

**Note:** These are starting points. Always test with temperature tower!

---

## Multi-Tool Considerations

For Prusa XL 5-tool:

**Each tool needs PID tuning!**

1. **Tune all tools to same temp**
   - Ensures consistent behavior
   - Easier material changes

2. **Test with multi-material**
   - Verify all tools stable
   - Check for temp differences

3. **Document each tool**
   - Record PID values
   - Note any differences

---

## Temperature Stability

### Checking Stability

1. **Heat to target temp**
2. **Wait 5 minutes**
3. **Monitor temperature**
   - Should be ±1°C of target
   - No oscillations

4. **If unstable:**
   - Re-run PID tuning
   - Check thermistor
   - Check heater cartridge

### Common Issues

| Problem | Cause | Solution |
|---------|-------|----------|
| Temp overshoots | P too high | Re-run PID tune |
| Temp oscillates | I too high | Re-run PID tune |
| Slow to heat | D too low | Re-run PID tune |
| Never reaches temp | Heater issue | Check heater/thermistor |

---

## Cooling

### Part Cooling Fan

**PLA:**
- 100% fan speed
- Always on after first layer

**PETG:**
- 30-50% fan speed
- Reduces warping

**ABS/ASA:**
- 0-20% fan speed
- Minimal cooling

### Chamber Temperature

For enclosed printers (if applicable):
- PLA: Keep cool (<40°C)
- PETG: Moderate (40-50°C)
- ABS: Warm (50-60°C)

---

## Troubleshooting

### Problem: Temperature won't stabilize

**Causes:**
- PID not tuned
- Thermistor issue
- Heater problem

**Solutions:**
- Re-run PID tuning
- Check thermistor connection
- Test heater resistance

### Problem: Thermal runaway protection

**Causes:**
- PID values wrong
- Heater not working
- Thermistor disconnected

**Solutions:**
- Re-tune PID
- Check connections
- Replace if needed

### Problem: Prints fail at certain temps

**Causes:**
- Temp too high/low
- Material-specific issue

**Solutions:**
- Print temperature tower
- Adjust temp in range
- Check material specs

---

## Documentation

**Record your PID values:**

```
Date: 2024-12-19
Tool: Tool 1
Material: PLA
Target Temp: 215°C
PID P: 22.20
PID I: 1.08
PID D: 114.00
Stability: ±0.5°C
Status: ✅ Tuned
```

**Record optimal temps:**

```
Material: PLA
Brand: Prusament
Optimal Nozzle: 215°C
Optimal Bed: 60°C
Source: Temperature tower test
Date: 2024-12-19
```

---

## Next Steps

After temperature is optimized:
1. ✅ Verify [E-steps](/3d-printing/extruder) still correct
2. ✅ Calibrate [Flow Rate](/3d-printing/extruder#flow-rate-calibration)
3. ✅ Test [Retraction](/3d-printing/calibration#quality-tuning)







