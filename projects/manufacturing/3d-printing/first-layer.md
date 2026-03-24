---
layout: doc
---

# 📐 First Layer Calibration

The foundation of every perfect print. Get the Z-offset right, and everything else becomes easier.

## Why First Layer Matters

The first layer determines:
- ✅ Bed adhesion (no warping)
- ✅ Print quality (smooth bottom surface)
- ✅ Dimensional accuracy
- ✅ Success of entire print

**Rule:** If the first layer isn't perfect, the rest won't be either.

---

## Prusa XL First Layer Calibration

### Method 1: Live Z Adjustment (Recommended)

**Steps:**

1. **Prepare the printer**
   - Heat bed to 60°C (PLA) or 80°C (PETG)
   - Heat nozzle to material temp
   - Clean bed surface (IPA)

2. **Start first layer calibration**
   - Menu: `Settings` → `Live Adjust Z`
   - Or use `CALIBRATE Z` from main menu

3. **Print first layer test**
   - Printer will print a line pattern
   - Watch as it prints

4. **Adjust Live Z**
   - **Too high (nozzle too far):**
     - Lines don't stick
     - Gaps between lines
     - Lines look round/raised
     - **Action:** Lower Z (more negative value)
  
  - **Too low (nozzle too close):**
    - Lines are squished flat
    - Nozzle drags through plastic
    - Surface is rough/rippled
    - **Action:** Raise Z (less negative value)
  
  - **Perfect:**
    - Lines are smooth and flat
    - No gaps between lines
    - Slight "squish" but not too much
    - **Action:** Save value!

5. **Fine-tune**
   - Adjust in 0.01mm increments
   - Print test squares at corners
   - Verify consistency across bed

### Method 2: Manual Z-offset

If Live Z isn't available:

1. **Home all axes**
   - `G28` command

2. **Move to center**
   - `G1 X180 Y180 Z0.2`

3. **Lower slowly**
   - `G1 Z0.1`
   - `G1 Z0.05`
   - `G1 Z0.02`
   - Stop when paper has slight resistance

4. **Set Z-offset**
   - Note current Z value
   - This is your Z-offset

---

## Visual Guide

### Too High (Nozzle Too Far)

```
     ╱╲
    ╱  ╲
   ╱    ╲
  ╱      ╲
 ╱________╲
```

**Signs:**
- Lines don't touch
- Round cross-section
- Poor adhesion
- Gaps visible

**Fix:** Lower Z (more negative)

### Perfect

```
  ─────────
  ─────────
  ─────────
```

**Signs:**
- Smooth, flat lines
- No gaps
- Good adhesion
- Slight squish visible

**Fix:** Save this value!

### Too Low (Nozzle Too Close)

```
  ░░░░░░░░░
  ░░░░░░░░░
  ░░░░░░░░░
```

**Signs:**
- Lines are transparent/thin
- Rough surface
- Nozzle drags
- Possible scraping

**Fix:** Raise Z (less negative)

---

## Test Print

### Simple First Layer Test

**STL:** [First Layer Test](https://www.printables.com/model/12345-first-layer-test)

**Settings:**
- Layer height: 0.2mm
- First layer height: 0.2mm
- No infill
- No top layers
- 1 perimeter

**What to check:**
- [ ] All lines connect (no gaps)
- [ ] Surface is smooth
- [ ] Corners are sharp
- [ ] Consistent across entire bed

---

## Multi-Tool Considerations

For Prusa XL 5-tool:

**Each tool needs calibration!**

1. **Calibrate Tool 1 first** (reference)
2. **Calibrate other tools relative to Tool 1**
3. **Use tool offset settings** to align
4. **Test with multi-material print**

**Tool Offset Settings:**
- X offset
- Y offset
- Z offset (most critical!)

---

## Optimal Values

| Material | Z-offset Range | Notes |
|----------|----------------|-------|
| PLA | -1.200 to -1.400 | Typical range |
| PETG | -1.100 to -1.300 | Slightly higher |
| TPU | -1.000 to -1.200 | Very flexible |
| ABS | -1.300 to -1.500 | Higher bed temp |

**Note:** These are starting points. Your printer may differ!

---

## Troubleshooting

### Problem: First layer won't stick

**Causes:**
- Z too high
- Bed not clean
- Bed too cold
- Wrong material temp

**Solutions:**
- Lower Z-offset
- Clean with IPA
- Increase bed temp
- Check material settings

### Problem: First layer too squished

**Causes:**
- Z too low
- Bed too high

**Solutions:**
- Raise Z-offset
- Check bed leveling

### Problem: Inconsistent across bed

**Causes:**
- Bed not level
- Warped bed
- Z-offset varies

**Solutions:**
- Run mesh bed leveling
- Check bed flatness
- Re-calibrate Z-offset

---

## Documentation

**Record your optimal values:**

```
Date: 2024-12-19
Material: PLA
Bed Temp: 60°C
Nozzle Temp: 215°C
Z-offset: -1.250mm
Tool: Tool 1 (Reference)
Notes: Perfect first layer, smooth surface
```

---

## Next Steps

After first layer is perfect:
1. ✅ Run [Bed Leveling](/3d-printing/bed-leveling)
2. ✅ Calibrate [Extruder E-steps](/3d-printing/extruder)
3. ✅ Fine-tune [Temperature](/3d-printing/temperature)







