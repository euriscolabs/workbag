---
layout: doc
---

# 🎨 Multi-Material Calibration

Prusa XL 5-tool specific: Aligning multiple tools for perfect multi-material prints.

## Why Multi-Material Calibration Matters

With 5 tools, you need:
- ✅ All tools hitting the same spot (X/Y alignment)
- ✅ All tools at same height (Z alignment)
- ✅ Clean material transitions
- ✅ Minimal waste (purge/wipe)

**Rule:** Single-material must be perfect before multi-material!

---

## Tool Alignment

### X/Y Alignment (Horizontal)

All tools must hit the same XY coordinates.

**Calibration Method:**

1. **Print alignment test**
   - Single layer test pattern
   - Multiple small squares
   - One per tool

2. **Check alignment**
   - All squares should overlap perfectly
   - Measure offset if not aligned

3. **Adjust tool offsets**
   - Menu: `Settings` → `Hardware` → `Tool Offsets`
   - Or G-code: `M218 T1 X0.5 Y-0.3`
     - `T1` = Tool 2 (0-indexed)
     - `X0.5` = X offset in mm
     - `Y-0.3` = Y offset in mm

4. **Test again**
   - Re-print alignment test
   - Fine-tune if needed

### Z Alignment (Height)

All tools must be at same height for first layer.

**Calibration Method:**

1. **Calibrate Tool 1 first** (reference)
   - Use [First Layer](/3d-printing/first-layer) guide
   - Document Z-offset

2. **Test other tools**
   - Print first layer with each tool
   - Compare to Tool 1

3. **Adjust Z offsets**
   - Menu: `Settings` → `Hardware` → `Tool Offsets`
   - Or G-code: `M218 T1 Z0.1`
     - `T1` = Tool 2
     - `Z0.1` = Z offset in mm

4. **Verify all tools**
   - Print first layer test with all tools
   - Should all be identical

---

## Purge Settings

Purge removes old material when switching tools.

### Purge Volume

**Too little:**
- ❌ Color contamination
- ❌ Weak layer adhesion
- ❌ Failed prints

**Too much:**
- ❌ Wasted material
- ❌ Long print times
- ❌ Clogged nozzle

**Optimal:**
- ✅ Clean transitions
- ✅ Minimal waste
- ✅ Fast prints

### Calibrating Purge Volume

1. **Start with default**
   - PrusaSlicer default: ~15mm³
   - Test print

2. **Check transitions**
   - Look for color contamination
   - Check layer adhesion

3. **Adjust if needed**
   - Increase if contaminated
   - Decrease if too much waste
   - Test again

4. **Material-specific**
   - Different materials need different purge
   - Document for each combination

### Purge Tower

**When to use:**
- Complex multi-material prints
- Many tool changes
- Materials that don't mix well

**Settings:**
- Tower size: Auto or manual
- Tower position: Corner or center
- Tower material: Use cheapest material

---

## Wipe Settings

Wipe removes oozed material before printing.

### Wipe Distance

**Too little:**
- ❌ Stringing between materials
- ❌ Blobs on print

**Too much:**
- ❌ Slower prints
- ❌ Unnecessary movement

**Optimal:**
- ✅ Clean transitions
- ✅ Fast prints

### Calibrating Wipe

1. **Print multi-material test**
   - Simple two-color print
   - Watch tool changes

2. **Check for stringing**
   - Between material changes
   - On print surface

3. **Adjust wipe distance**
   - Increase if stringing
   - Decrease if too slow
   - Test again

---

## Material Combinations

Some materials work better together:

| Material 1 | Material 2 | Compatibility | Notes |
|------------|------------|---------------|-------|
| PLA | PLA | ✅ Excellent | Same material, easy |
| PLA | PETG | ⚠️ Moderate | Different temps needed |
| PLA | TPU | ❌ Poor | Very different properties |
| PETG | PETG | ✅ Excellent | Same material |
| PETG | ABS | ⚠️ Moderate | Different temps |

**Rule:** Similar materials = easier transitions

---

## Multi-Material Test Print

### Simple Test

1. **Two-color cube**
   - 20×20×20mm
   - Switch material at layer 10
   - Check transition quality

2. **What to check:**
   - [ ] Clean color transition
   - [ ] No contamination
   - [ ] Good layer adhesion
   - [ ] No stringing

### Advanced Test

1. **Complex pattern**
   - Multiple material changes
   - Different geometries
   - Stress test alignment

2. **What to check:**
   - [ ] All tools aligned
   - [ ] Clean transitions
   - [ ] Consistent quality

---

## Troubleshooting

### Problem: Tools not aligned

**Causes:**
- Tool offsets wrong
- Mechanical issue
- Firmware issue

**Solutions:**
- Re-calibrate tool offsets
- Check mechanical components
- Update firmware

### Problem: Color contamination

**Causes:**
- Purge volume too low
- Temperature too high
- Materials incompatible

**Solutions:**
- Increase purge volume
- Lower temperature
- Use compatible materials

### Problem: Poor layer adhesion

**Causes:**
- Z offsets wrong
- Temperature too low
- Purge insufficient

**Solutions:**
- Re-calibrate Z offsets
- Increase temperature
- Increase purge volume

---

## Documentation

**Record tool offsets:**

```
Date: 2024-12-19
Tool 1 (Reference): X0 Y0 Z0
Tool 2: X0.2 Y-0.1 Z0.05
Tool 3: X-0.1 Y0.15 Z-0.02
Tool 4: X0.1 Y-0.05 Z0.03
Tool 5: X-0.05 Y0.1 Z0.01
Status: ✅ All aligned
```

**Record purge settings:**

```
Material 1: PLA
Material 2: PLA
Purge Volume: 15mm³
Wipe Distance: 5mm
Status: ✅ Clean transitions
```

---

## Next Steps

After multi-material is calibrated:
1. ✅ Test with real multi-material prints
2. ✅ Optimize purge/wipe for efficiency
3. ✅ Document material combinations

---

## Resources

- [Prusa XL Multi-Material Guide](https://manual.prusa3d.com/Guide/XL+5-toolhead)
- [PrusaSlicer Multi-Material Settings](https://help.prusa3d.com/article/multi-material-printing_1775)







