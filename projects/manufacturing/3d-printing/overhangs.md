---
layout: doc
---

# 📐 Overhang Calibration

Printing angles without support: finding the maximum overhang angle your printer can handle.

## Why Overhang Calibration Matters

Good overhangs enable:
- ✅ Prints without support material
- ✅ Cleaner surfaces
- ✅ Faster prints
- ✅ Better design flexibility

**Rule:** Overhang quality depends on cooling, speed, and layer height.

---

## Overhang Test Print

### Recommended Test Models

1. **Teaching Tech Overhang Test**
   - [Thingiverse](https://www.thingiverse.com/thing:2729076)
   - Gradual angles: 0° to 90°
   - Easy to evaluate

2. **Simple Overhang Test**
   - Print angles: 30°, 45°, 60°, 70°, 80°, 90°
   - Single test piece
   - Easy to measure quality

### What to Look For

| Quality | Signs | Action |
|---------|-------|--------|
| ✅ **Perfect** | Smooth surface, sharp edges | Save settings! |
| ⚠️ **Acceptable** | Slight drooping, minor defects | May need fine-tuning |
| ❌ **Poor** | Significant drooping, rough surface | Needs adjustment |
| ❌ **Failed** | Layer collapse, print failure | Major adjustment needed |

---

## Overhang Settings

### Cooling

**Maximum cooling is critical**

- **Too little cooling:**
  - ❌ Material doesn't solidify
  - ❌ Layers droop
  - ❌ Poor quality

- **Optimal:**
  - ✅ 100% fan speed for overhangs
  - ✅ Good airflow
  - ✅ Material solidifies quickly

**PrusaSlicer Settings:**
- `Cooling` → `Fan speed` → 100%
- `Cooling` → `Overhang fan speed` → 100%
- `Cooling` → `Min layer time` → 5-10 seconds

### Speed

**Slower = Better for overhangs**

- **Too fast:**
  - ❌ Material doesn't cool
  - ❌ Layers droop
  - ❌ Poor quality

- **Too slow:**
  - ❌ Long print times
  - ❌ May cause other issues

- **Optimal:**
  - ✅ 20-40mm/s for overhangs
  - ✅ Allows time to cool
  - ✅ Good quality

**PrusaSlicer Settings:**
- `Speed` → `Overhangs` → 20-40mm/s
- Slower than normal print speed

### Layer Height

**Thinner layers = better overhangs**

- **Thick layers (0.3mm+):**
  - ❌ More sag per layer
  - ❌ Poor overhang quality
  - ❌ Limited angle

- **Thin layers (0.1-0.15mm):**
  - ✅ Less sag per layer
  - ✅ Better overhang quality
  - ✅ Higher angles possible

**PrusaSlicer Settings:**
- `Layer height` → 0.15-0.2mm for overhangs
- Or use adaptive layer height

### Temperature

**Lower temperature = better overhangs**

- **Too high:**
  - ❌ Material too soft
  - ❌ Layers droop
  - ❌ Poor quality

- **Too low:**
  - ❌ Poor layer adhesion
  - ❌ Extrusion issues
  - ❌ Weak prints

- **Optimal:**
  - ✅ 5-10°C below normal temp
  - ✅ Material solidifies faster
  - ✅ Better overhang quality

**PrusaSlicer Settings:**
- `Filament` → `Temperature` → `Overhang` → -5 to -10°C

---

## Calibration Process

### Step 1: Print Overhang Test

1. **Download test model**
   - Teaching Tech overhang test
   - Or create simple test

2. **Start with defaults**
   - Overhang speed: 30mm/s
   - Overhang fan: 100%
   - Overhang temp: -5°C
   - Layer height: 0.2mm

3. **Print and evaluate**
   - Check each angle
   - Note where quality degrades
   - Document maximum angle

### Step 2: Adjust Speed

**If overhangs droop:**

1. **Decrease speed**
   - Try 25mm/s
   - Then 20mm/s
   - Test again

2. **Check results**
   - Less drooping = better
   - Find optimal speed

**If overhangs fail:**

1. **Check cooling**
   - Ensure 100% fan
   - Check airflow
   - Test again

### Step 3: Adjust Layer Height

**If overhangs still poor:**

1. **Reduce layer height**
   - Try 0.15mm
   - Then 0.1mm
   - Test again

2. **Balance quality vs time**
   - Thinner = better but slower
   - Find acceptable compromise

### Step 4: Adjust Temperature

**If overhangs still droop:**

1. **Lower temperature**
   - Reduce by 5°C
   - Test again
   - Repeat if needed

2. **Don't go too low**
   - Watch for adhesion issues
   - Balance is key

---

## Maximum Overhang Angle

**What's possible?**

| Material | Max Angle (Typical) | Max Angle (Optimal) |
|----------|-------------------|-------------------|
| PLA | 45-60° | 70-80° |
| PETG | 30-45° | 50-60° |
| TPU | 20-30° | 40° |
| ABS | 40-50° | 60-70° |

**Note:** These are guidelines. Your results may vary based on settings and printer.

### Factors Affecting Max Angle

- **Cooling:** Better cooling = higher angles
- **Layer height:** Thinner = higher angles
- **Speed:** Slower = higher angles
- **Temperature:** Lower = higher angles
- **Material:** PLA handles overhangs best

---

## Material-Specific Settings

| Material | Overhang Speed | Overhang Temp | Layer Height | Notes |
|----------|----------------|---------------|--------------|-------|
| PLA | 25-35mm/s | -5 to -10°C | 0.15-0.2mm | Best overhangs |
| PETG | 20-30mm/s | -5°C | 0.15-0.2mm | More difficult |
| TPU | 15-25mm/s | -5°C | 0.1-0.15mm | Very difficult |
| ABS | 25-35mm/s | -5 to -10°C | 0.15-0.2mm | Needs enclosure |

**Note:** PLA handles overhangs best. Flexible materials (TPU) are challenging.

---

## Multi-Tool Considerations

For Prusa XL 5-tool:

**Each tool may need different settings!**

1. **Calibrate Tool 1 first** (reference)
2. **Test other tools**
3. **Adjust if needed**
4. **Document each tool**

**Why?** Each tool may have slight differences in cooling or flow.

---

## Support Material Threshold

**When to use support?**

- **< 45°:** Usually no support needed
- **45-60°:** May need support, test first
- **> 60°:** Usually needs support

**Rule:** If overhang test shows good quality up to 60°, you can print up to 60° without support.

---

## Troubleshooting

### Problem: Overhangs droop significantly

**Causes:**
- Speed too fast
- Cooling insufficient
- Temperature too high
- Layer height too thick

**Solutions:**
- Decrease overhang speed
- Ensure 100% fan
- Lower overhang temperature
- Reduce layer height

### Problem: Overhangs fail/collapse

**Causes:**
- Speed too fast
- Cooling insufficient
- Temperature too high
- Poor layer adhesion

**Solutions:**
- Decrease overhang speed significantly
- Check fan operation
- Lower temperature
- Check first layer calibration

### Problem: Rough surface on overhangs

**Causes:**
- Speed too fast
- Cooling insufficient
- Layer height too thick

**Solutions:**
- Decrease overhang speed
- Increase fan speed
- Reduce layer height

### Problem: Poor layer adhesion on overhangs

**Causes:**
- Temperature too low
- Speed too slow
- Extrusion issues

**Solutions:**
- Increase temperature slightly
- Increase speed slightly
- Check E-steps calibration

---

## Advanced: Adaptive Layer Height

**PrusaSlicer Feature:**

1. **Enable adaptive layers**
   - `Print Settings` → `Layers and perimeters` → `Adaptive layers`

2. **Configure**
   - Thinner layers on overhangs
   - Thicker layers on flat areas
   - Automatic optimization

3. **Benefits:**
   - Better overhang quality
   - Faster overall print
   - Automatic optimization

---

## Documentation

**Record your optimal settings:**

```
Date: 2024-12-19
Material: PLA
Tool: Tool 1
Overhang Speed: 30mm/s
Overhang Temp: -7°C (208°C from 215°C)
Overhang Fan: 100%
Layer Height: 0.15mm
Max Overhang Angle: 70°
Status: ✅ Excellent
Notes: Clean surface up to 70°, support needed above
```

---

## Next Steps

After overhangs are calibrated:
1. ✅ Test with real prints
2. ✅ Combine with [Bridge](/3d-printing/bridges) settings
3. ✅ Configure support thresholds

---

## Resources

- [Teaching Tech Calibration](https://teachingtechyt.github.io/calibration.html#overhangs)
- [PrusaSlicer Overhang Settings](https://help.prusa3d.com/article/overhang-settings_1775)







