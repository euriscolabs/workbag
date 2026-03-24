---
layout: doc
---

# 🌉 Bridge Calibration

Perfect bridges: printing across gaps without support, sagging, or drooping.

## Why Bridge Calibration Matters

Good bridging enables:
- ✅ Clean prints without support material
- ✅ Faster prints (no support removal)
- ✅ Better surface finish
- ✅ Design flexibility

**Rule:** Bridge quality depends on speed, cooling, and temperature.

---

## Bridge Test Print

### Recommended Test Models

1. **Teaching Tech Bridge Test**
   - [Thingiverse](https://www.thingiverse.com/thing:2729076)
   - Multiple bridge lengths
   - Easy to evaluate

2. **Simple Bridge Test**
   - Print multiple bridges: 10mm, 20mm, 30mm, 40mm, 50mm
   - Single layer bridges
   - Easy to measure sag

### What to Look For

| Quality | Signs | Action |
|---------|-------|--------|
| ✅ **Perfect** | Straight, smooth bottom | Save settings! |
| ⚠️ **Acceptable** | Slight sag (<1mm) | May need fine-tuning |
| ❌ **Poor** | Significant sag (>2mm) | Needs adjustment |
| ❌ **Failed** | Bridge collapses | Major adjustment needed |

---

## Bridge Settings

### Speed

**Faster = Better for bridges**

- **Too slow:**
  - ❌ Material sags while printing
  - ❌ Poor surface quality
  - ❌ Bridge may fail

- **Too fast:**
  - ❌ Layer adhesion issues
  - ❌ Extrusion problems
  - ❌ Print quality suffers

- **Optimal:**
  - ✅ 30-60mm/s for bridges
  - ✅ Material stays taut
  - ✅ Clean bottom surface

**PrusaSlicer Settings:**
- `Speed` → `Bridges` → 40-60mm/s
- Faster than normal print speed

### Cooling

**Maximum cooling for bridges**

- **100% fan speed** during bridges
- **Minimum layer time** to allow cooling
- **Bridge fan speed** (if available)

**PrusaSlicer Settings:**
- `Cooling` → `Bridges fan speed` → 100%
- `Cooling` → `Min layer time` → 5-10 seconds

### Temperature

**Lower temperature = better bridges**

- **Too high:**
  - ❌ Material too soft
  - ❌ Sagging
  - ❌ Poor quality

- **Too low:**
  - ❌ Poor layer adhesion
  - ❌ Extrusion issues
  - ❌ Weak bridges

- **Optimal:**
  - ✅ 5-10°C below normal temp
  - ✅ Material stays rigid
  - ✅ Good adhesion

**PrusaSlicer Settings:**
- `Filament` → `Temperature` → `Bridge` → -5 to -10°C

### Flow Rate

**Slightly reduced flow for bridges**

- **Normal flow:**
  - ❌ Too much material
  - ❌ Sagging
  - ❌ Poor quality

- **Reduced flow:**
  - ✅ 90-95% of normal flow
  - ✅ Less sag
  - ✅ Cleaner bridges

**PrusaSlicer Settings:**
- `Advanced` → `Bridge flow ratio` → 0.90-0.95

---

## Calibration Process

### Step 1: Print Bridge Test

1. **Download test model**
   - Teaching Tech bridge test
   - Or create simple test

2. **Start with defaults**
   - Bridge speed: 40mm/s
   - Bridge fan: 100%
   - Bridge temp: -5°C
   - Bridge flow: 0.95

3. **Print and evaluate**
   - Check each bridge length
   - Measure sag
   - Document results

### Step 2: Adjust Speed

**If bridges sag:**

1. **Increase speed**
   - Try 50mm/s
   - Then 60mm/s
   - Test again

2. **Check results**
   - Less sag = better
   - Find optimal speed

**If bridges fail:**

1. **Decrease speed**
   - Try 30mm/s
   - Check layer adhesion
   - Test again

### Step 3: Adjust Temperature

**If bridges still sag:**

1. **Lower temperature**
   - Reduce by 5°C
   - Test again
   - Repeat if needed

2. **Don't go too low**
   - Watch for adhesion issues
   - Balance is key

### Step 4: Fine-tune Flow

**If bridges still not perfect:**

1. **Reduce flow**
   - Try 0.90
   - Test again
   - Fine-tune

2. **Check quality**
   - Bottom surface smoothness
   - No gaps or holes

---

## Material-Specific Settings

| Material | Bridge Speed | Bridge Temp | Bridge Flow | Notes |
|----------|--------------|-------------|-------------|-------|
| PLA | 40-60mm/s | -5 to -10°C | 0.90-0.95 | Best bridging |
| PETG | 30-50mm/s | -5°C | 0.90-0.95 | More difficult |
| TPU | 20-30mm/s | -5°C | 0.85-0.90 | Very difficult |
| ABS | 40-60mm/s | -5 to -10°C | 0.90-0.95 | Needs enclosure |

**Note:** PLA bridges best. Flexible materials (TPU) are challenging.

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

## Troubleshooting

### Problem: Bridges sag significantly

**Causes:**
- Speed too slow
- Temperature too high
- Cooling insufficient
- Flow too high

**Solutions:**
- Increase bridge speed
- Lower bridge temperature
- Ensure 100% fan
- Reduce bridge flow

### Problem: Bridges fail/collapse

**Causes:**
- Speed too fast
- Temperature too low
- Flow too low
- Poor layer adhesion

**Solutions:**
- Decrease bridge speed
- Increase temperature slightly
- Increase flow
- Check first layer calibration

### Problem: Poor bottom surface

**Causes:**
- Speed too slow
- Temperature too high
- Flow too high

**Solutions:**
- Increase bridge speed
- Lower bridge temperature
- Reduce bridge flow

### Problem: Gaps in bridges

**Causes:**
- Flow too low
- Speed too fast
- Extrusion issues

**Solutions:**
- Increase bridge flow
- Decrease bridge speed
- Check E-steps calibration

---

## Maximum Bridge Length

**What's possible?**

| Material | Max Bridge (Typical) | Max Bridge (Optimal) |
|----------|---------------------|---------------------|
| PLA | 50-80mm | 100mm+ |
| PETG | 30-50mm | 60-80mm |
| TPU | 10-20mm | 30mm |
| ABS | 40-60mm | 80mm |

**Note:** These are guidelines. Your results may vary based on settings and printer.

---

## Documentation

**Record your optimal settings:**

```
Date: 2024-12-19
Material: PLA
Tool: Tool 1
Bridge Speed: 50mm/s
Bridge Temp: -7°C (208°C from 215°C)
Bridge Flow: 0.92
Bridge Fan: 100%
Max Bridge Length: 80mm
Status: ✅ Excellent
Notes: Clean bottom surface, no sag
```

---

## Next Steps

After bridges are calibrated:
1. ✅ Test with real prints
2. ✅ Calibrate [Overhangs](/3d-printing/overhangs)
3. ✅ Combine with support settings

---

## Resources

- [Teaching Tech Calibration](https://teachingtechyt.github.io/calibration.html#bridges)
- [PrusaSlicer Bridge Settings](https://help.prusa3d.com/article/bridge-settings_1775)







