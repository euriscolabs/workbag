---
name: remotion-animator
description: "Use when creating Remotion animations for video segments, triggered from storyboard-logger or directly when user says 'animate [section]' or 'create animation for [topic]'. Reads storyboard context and brand identity, then creates branded Remotion compositions."
---

# Remotion Animator

Create Remotion animation compositions for video segments. Usually triggered from storyboard-logger when a section needs animation.

## Step 1: Bootstrap (if needed)

If no Remotion setup exists in the content entry, scaffold at `content/NNN-slug/animations/`:
- `package.json` with remotion dependencies
- `remotion.config.ts`
- `src/Root.tsx` — composition registry
- Shared brand constants (colors, fonts) imported from a `brand.ts` file

## Step 2: Read Context

1. **Storyboard section** — the `[ANIMATION]` linked section with V:/A: descriptions
2. **Brand identity** — `operations/company/identity/index.md` for colors, fonts, logos
3. If color palette is missing from brand identity, ask the user to define it before proceeding.

## Step 3: Design the Composition

Propose the animation structure:
- Scenes and transitions
- Data visualizations, diagrams, labeled graphics
- Duration matching storyboard timing
- Typography using Space Grotesk
- Brand colors throughout

## Step 4: Implement

Create the composition at `content/NNN-slug/animations/filename.tsx`:
- File name must match the storyboard link
- Use branded styles (colors, fonts, logos)
- Keep animations clean and educational — not flashy
- Target 1080p (1920x1080) by default
- Register in `Root.tsx`

Rendered mp4s are manually copied to the website's project folder at `operations/storefront/website/src/content/projects/` when ready.

## Step 5: Preview

Provide the command to preview: `cd content/NNN-slug/animations && npx remotion preview`

## Brand Reference

- **Font:** Space Grotesk
- **Logos:** `operations/company/identity/logos/` (SVG, optimized, rendered)
- **Colors:** from `operations/company/identity/index.md`
- **Voice:** scientific but accessible, clean, educational

## Rules

- Always use brand fonts and colors
- Keep animations clean and educational
- File names must match storyboard links
- Export at 1080p default
