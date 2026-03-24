---
layout: doc
---

# 🔧 Extruder Calibration

Accurate E-steps ensure the printer extrudes exactly the amount of filament you tell it to.

## Why E-steps Matter

Incorrect E-steps cause:
- ❌ Under-extrusion (weak prints, gaps)
- ❌ Over-extrusion (blobs, elephants foot)
- ❌ Dimensional inaccuracy
- ❌ Poor print quality

**Rule:** E-steps must be correct before calibrating flow rate.

---

## E-steps Calibration Method

### Step 1: Measure Current E-steps

1. **Connect to printer**
   - USB or OctoPrint
   - Or use printer menu

2. **Check current value**
   - Send: `M503` (view settings)
   - Find: `M92 E###` (E-steps value)
   - Or: Menu → `Settings` → `Hardware` → `E-steps`

3. **Note the value**
   - Default Prusa XL: ~280-320 steps/mm
   - This is your starting point

### Step 2: Mark Filament

1. **Load filament**
   - Heat nozzle to material temp
   - Load filament normally

2. **Mark 120mm from extruder**
   - Use ruler or calipers
   - Mark clearly (tape or marker)
   - Measure from extruder entry point

**Why 120mm?** Gives room for error, easy to measure.

### Step 3: Extrude 100mm

1. **Heat nozzle**
   - To material temperature
   - Wait for stable temp

2. **Extrude exactly 100mm**
   - Menu: `Settings` → `Move Axis` → `Extruder` → `100mm`
   - Or G-code: `G1 E100 F100`
   - Watch filament feed

3. **Measure remaining**
   - Measure from mark to extruder
   - Should be 20mm if perfect
   - Record actual measurement

### Step 4: Calculate New E-steps

**Formula:**

```
New E-steps = (Current E-steps × 100) / Actual Extruded
```

**Example:**

```
Current E-steps: 300
Marked: 120mm
After 100mm extrude: 25mm remaining
Actual extruded: 120 - 25 = 95mm

New E-steps = (300 × 100) / 95
New E-steps = 30,000 / 95
New E-steps = 315.79
```

### Step 5: Update E-steps

**Method 1: G-code**

```gcode
M92 E315.79    ; Set new E-steps
M500           ; Save to EEPROM
M503           ; Verify
```

**Method 2: Printer Menu**

1. Menu → `Settings` → `Hardware` → `E-steps`
2. Enter new value
3. Save

### Step 6: Verify

1. **Repeat test**
   - Mark 120mm again
   - Extrude 100mm
   - Should now be exactly 20mm remaining

2. **Fine-tune if needed**
   - If still off, repeat calculation
   - Adjust in small increments

---

## Multi-Tool Calibration

For Prusa XL 5-tool:

**Each extruder needs separate calibration!**

1. **Calibrate Tool 1** (reference)
2. **Calibrate Tools 2-5** individually
3. **Document each tool's E-steps**
4. **Test with multi-material print**

**Why?** Each extruder may have slight mechanical differences.

---

## Flow Rate Calibration

After E-steps are correct, calibrate flow rate:

### Single-Wall Calibration Cube

1. **Print calibration cube**
   - 20×20×20mm cube
   - 0% infill
   - 1 perimeter (wall)
   - No top/bottom layers

2. **Measure wall thickness**
   - Use calipers
   - Measure at multiple points
   - Average the measurements

3. **Calculate flow multiplier**

```
Flow Multiplier = (Expected Thickness) / (Actual Thickness)
```

**Example:**

```
Expected: 0.4mm (nozzle size)
Actual: 0.42mm
Flow Multiplier = 0.4 / 0.42 = 0.952
```

4. **Update in slicer**
   - PrusaSlicer: `Filament Settings` → `Extrusion Multiplier`
   - Set to calculated value
   - Test print

---

## Material-Specific Values

| Material | E-steps Range | Flow Multiplier | Notes |
|----------|---------------|-----------------|-------|
| PLA | 280-320 | 0.95-1.00 | Standard |
| PETG | 280-320 | 0.90-0.95 | Slightly less flow |
| TPU | 280-320 | 0.85-0.90 | Flexible, less flow |
| ABS | 280-320 | 0.95-1.00 | Similar to PLA |

**Note:** These are starting points. Always calibrate for your specific setup!

---

## Troubleshooting

### Problem: Can't extrude 100mm

**Causes:**
- Filament jam
- Extruder gear slipping
- Temp too low

**Solutions:**
- Check for jam
- Clean extruder gear
- Increase temp 5-10°C

### Problem: E-steps way off (>50 steps)

**Causes:**
- Wrong gear ratio
- Extruder assembly issue
- Firmware error

**Solutions:**
- Check extruder assembly
- Verify gear ratio
- Check firmware settings

### Problem: Flow rate inconsistent

**Causes:**
- E-steps not calibrated
- Temp fluctuations
- Filament diameter varies

**Solutions:**
- Re-check E-steps
- PID tune hotend
- Measure filament diameter

---

## Documentation

**Record your values:**

```
Date: 2024-12-19
Tool: Tool 1
Material: PLA
E-steps: 315.79 steps/mm
Flow Multiplier: 0.97
Wall Thickness: 0.39mm (target: 0.4mm)
Status: ✅ Calibrated
```

---

## Next Steps

After E-steps are correct:
1. ✅ Calibrate [Flow Rate](#flow-rate-calibration) (above)
2. ✅ Fine-tune [Temperature](/3d-printing/temperature)
3. ✅ Test [Retraction](/3d-printing/calibration#quality-tuning)







