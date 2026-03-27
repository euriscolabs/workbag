---
name: storyboard-logger
description: "Use when logging work progress as video storyboard content, documenting a milestone for video, or when triggered from project-cowork. Finds or creates the content entry, reads the storyboard, and adds/extends sections with proper V:/A: format and tone."
---

# Storyboard Logger

Log project work as video storyboard content. Usually triggered from project-cowork, but can be invoked directly.

## Step 1: Find or Create Content Entry

Search `content/` for the matching project. If none exists, offer to create `content/NNN-slug/` (next number in sequence) with:
- `index.md` — video metadata (title, description, project reference, status)
- `storyboard.md` — empty template with section headers
- `todo.md` — phase-based checklist

## Step 2: Read & Report

Load `storyboard.md` and `index.md`. Report which sections exist, which are `TODO`/empty, and the overall structure.

## Step 3: Build the Storyboard

Add or extend sections using this format:

```markdown
## [Section Name]

V: [Visual description — what the viewer sees]
A: [Audio — voiceover text, SFX, music notes]

---
```

### Section Types

| Section | Purpose | Pacing |
|---------|---------|--------|
| Hook | Grab attention | 0-5s, fast cuts, punchy |
| Cold Open | Set the scene, no narration | Cinematic, ASMR, ambient |
| Intro | Frame the problem, personal connection | Conversational, honest |
| Science Segment | Educational breakdown with graphics | Explainer, clear, referenced |
| Design / Build | Show the making process | Build-log, hands-on |
| Testing & Results | Experiments, measurements | Methodical, transparent |
| B-Roll | Supporting footage, transitions | Atmospheric |
| Animation | Remotion-animated segments | Clean, branded, educational |
| Outro / CTA | Wrap up, tease next | Warm, direct, 30-60s |

### Tone

Curious, hands-on, educational. Direct and honest. Scientific but accessible. Never preachy, never clickbait-y beyond the hook.

## Step 4: Trigger Animations

When adding a science segment, diagram, data visualization, or illustration that needs animation:

1. Add to storyboard with animation link: `V: [ANIMATION — description](animations/filename.tsx)`
2. Invoke the **remotion-animator** skill with the section context to create the composition file.

## Rules

- Use `V:` and `A:` prefixes consistently
- Use `---` between major sections
- Mark incomplete sections with `TODO`
- Link animations inline: `V: [ANIMATION — description](animations/filename.tsx)`
- Include timing estimates per section
