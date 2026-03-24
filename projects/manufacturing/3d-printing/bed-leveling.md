---
layout: doc
---

# ⚖️ Bed Leveling

Mesh bed leveling compensates for bed warping and ensures consistent first layer across the entire build plate.

## Why Bed Leveling Matters

Even the best beds aren't perfectly flat. Mesh bed leveling:
- ✅ Compensates for bed warping
- ✅ Ensures consistent first layer
- ✅ Prevents warping and adhesion issues
- ✅ Works across entire build volume

---

## Prusa XL Mesh Bed Leveling

### Automatic Mesh Leveling

**Steps:**

1. **Prepare printer**
   - Heat bed to operating temp (60°C for PLA)
   - Heat nozzle to material temp
   - Clean bed surface

2. **Start mesh leveling**
   - Menu: `Settings` → `Mesh Bed Leveling`
   - Or: `CALIBRATE` → `Mesh Bed Leveling`

3. **Follow prompts**
   - Printer will probe multiple points
   - Typically 7×7 grid (49 points)
   - Takes 5-10 minutes

4. **Check results**
   - View mesh visualization
   - Check variance (should be < 0.2mm)
   - Save to EEPROM

5. **Test print**
   - Print first layer test across bed
   - Verify consistency

### Manual Mesh Editing

If automatic mesh isn't perfect:

1. **View mesh**
   - Menu: `Settings` → `Mesh Bed Leveling` → `View Mesh`

2. **Identify problem areas**
   - High spots (positive values)
   - Low spots (negative values)

3. **Adjust manually**
   - Use mesh editor
   - Fine-tune individual points
   - Save changes

---

## Mesh Visualization

### Good Mesh

```
    0.00  0.01  0.00
    0.01  0.00  0.01
    0.00  0.01  0.00
```

**Variance:** < 0.1mm  
**Status:** ✅ Excellent

### Acceptable Mesh

```
    0.05  0.10  0.08
    0.12  0.00  0.15
    0.07  0.11  0.09
```

**Variance:** < 0.2mm  
**Status:** ✅ Acceptable

### Problem Mesh

```
    0.20  0.35  0.18
    0.40  0.00  0.45
    0.25  0.30  0.22
```

**Variance:** > 0.2mm  
**Status:** ⚠️ Needs attention

**Actions:**
- Check bed flatness
- Adjust bed screws
- Consider bed replacement

---

## Bed Flatness Check

### Manual Check

1. **Use straight edge**
   - Metal ruler or level
   - Check across bed diagonally

2. **Check for gaps**
   - Light should not pass under ruler
   - If gaps visible, bed is warped

3. **Measure warpage**
   - Use feeler gauges
   - Document maximum deviation

### Using Mesh Data

1. **Export mesh data**
   - From printer menu or G-code
   - Get Z values for all points

2. **Calculate variance**
   - Max Z - Min Z = Variance
   - Should be < 0.2mm

---

## Bed Screw Adjustment

If mesh shows significant variance:

### Prusa XL Bed Screws

**Location:** Under build plate (4 screws)

**Procedure:**

1. **Home Z-axis**
2. **Disable steppers**
3. **Move to each corner**
4. **Adjust screw**
   - Clockwise: Lower bed
   - Counter-clockwise: Raise bed
5. **Re-run mesh leveling**
6. **Check improvement**

**Note:** Make small adjustments (1/4 turn at a time)

---

## Mesh Settings

### Probe Points

| Grid Size | Points | Time | Accuracy |
|-----------|--------|------|----------|
| 3×3 | 9 | ~2 min | Basic |
| 5×5 | 25 | ~5 min | Good |
| 7×7 | 49 | ~10 min | Excellent (default) |

**Recommendation:** Use 7×7 for best results

### Probe Speed

- **Fast:** Quick but less accurate
- **Slow:** More accurate, takes longer
- **Default:** Usually optimal

---

## Multi-Tool Considerations

For Prusa XL 5-tool:

**Each tool may need different mesh!**

1. **Calibrate mesh with Tool 1** (reference)
2. **Check other tools**
3. **Use tool offsets** if needed
4. **Test with multi-material print**

**Why?** Tool heights may vary slightly, affecting first layer.

---

## Maintenance

### When to Re-level

| Situation | Action |
|-----------|--------|
| Every 10-20 prints | Quick check |
| After moving printer | Full mesh |
| After bed maintenance | Full mesh |
| If prints fail | Check mesh |
| Weekly | Full mesh recommended |

### Mesh Storage

- **EEPROM:** Saved automatically
- **Backup:** Export mesh data
- **Restore:** If needed after firmware update

---

## Troubleshooting

### Problem: Mesh variance too high

**Causes:**
- Warped bed
- Loose bed screws
- Damaged bed

**Solutions:**
- Check bed flatness
- Tighten/adjust screws
- Consider bed replacement

### Problem: Mesh doesn't help

**Causes:**
- Z-offset wrong
- Mesh not enabled in G-code
- Mesh data corrupted

**Solutions:**
- Re-calibrate Z-offset
- Check G-code (M420 S1)
- Re-run mesh leveling

### Problem: Inconsistent results

**Causes:**
- Bed temp not stable
- Probe dirty
- Mechanical issues

**Solutions:**
- Wait for bed to stabilize
- Clean probe
- Check mechanical components

---

## G-code Commands

### Enable Mesh

```gcode
M420 S1    ; Enable mesh bed leveling
```

### Disable Mesh

```gcode
M420 S0    ; Disable mesh bed leveling
```

### View Mesh

```gcode
M420 V     ; Display mesh data
```

### Save Mesh

```gcode
M500       ; Save to EEPROM
```

---

## Documentation

**Record your mesh data:**

```
Date: 2024-12-19
Bed Temp: 60°C
Grid: 7×7 (49 points)
Variance: 0.08mm
Max Deviation: +0.12mm / -0.05mm
Status: ✅ Excellent
Notes: Consistent across bed
```

---

## Next Steps

After bed leveling is perfect:
1. ✅ Verify [First Layer](/3d-printing/first-layer) still good
2. ✅ Calibrate [Extruder E-steps](/3d-printing/extruder)
3. ✅ Fine-tune [Temperature](/3d-printing/temperature)







