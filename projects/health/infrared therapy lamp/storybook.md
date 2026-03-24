# Infrared Therapy Lamp — Notes for Future Video

## Context

Sequel to the full-spectrum desk lamp video. In that video we covered how bright visible light helps mood, energy, and circadian rhythm through the eyes. This video covers the **other side of sunlight** — red and near-infrared light, which works through the skin at a cellular level.

## Core Idea

Design and build a red/NIR light therapy panel, ideally using the **same modular desk lamp frame** from the first video with a swappable light module. The callback ("remember the lamp from last time?") makes a natural hook.

## How Red / Near-Infrared Light Therapy Works

- Completely different mechanism from bright light therapy — **not** through the eyes, through the **skin**.
- Uses specific wavelengths: ~660 nm (red) and ~850 nm (near-infrared / NIR).
- Light penetrates skin and is absorbed by **mitochondria** → stimulates ATP production (cellular energy) → cells repair and regenerate more effectively.
- This process is called **photobiomodulation**.
- Measured by **power density (mW/cm²)**, not brightness (lux).

## Evidence-Backed Benefits

- **Joint pain / osteoarthritis** — strong evidence (19+ studies)
- **Hair regrowth** — FDA-cleared for home use
- **Skin aging** — wrinkles, fine lines, dark spots; visible improvements after ~3 months
- **Muscle recovery / wound healing** — promotes tissue repair, reduces inflammation
- **Carpal tunnel syndrome** — 8 studies available
- Requires **consistent use**; optimal frequency and long-term effects still being studied.

## Key Design Differences from the Full-Spectrum Lamp

- Different LEDs needed: 660 nm red + 850 nm NIR (not full-spectrum white)
- Power density matters more than lux — need >100 mW/cm² at treatment distance
- Dosing varies by application (e.g., eye conditions use very low doses <1 mW/cm²; knee osteoarthritis uses 4–8 J per spot at 780–860 nm)
- Distance and exposure time protocols differ by body part
- Safety: short-term safety is good, few adverse effects reported

## Video Angle

- "Last time we tackled mood and energy with visible light. This time: recovery and pain."
- Show the modular swap from full-spectrum to infrared panel
- Cover the science (photobiomodulation, ATP, mitochondria) — different enough from video 1 to feel fresh
- Build the panel, test it, measure power output
- Honest about what's well-evidenced vs. what's still hype

## Open Questions

- [ ] What specific LED chips/strips to use for 660 nm + 850 nm?
- [ ] What power supply and driver needed for therapeutic power density?
- [ ] Does the existing lamp frame work, or does it need a larger panel?
- [ ] Research dosing protocols for the most common use cases (joint pain, skin, recovery)
- [ ] Look into whether combined 660 + 850 nm panels are better than single-wavelength
