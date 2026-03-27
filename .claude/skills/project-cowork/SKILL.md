---
name: project-cowork
description: "Use when the user wants to work on a specific project, says 'work on [project]', 'let's work on [project]', or 'cowork on [project]'. Finds the project in src/content/projects/, reads context files, reports status, and enters a collaborative work session."
---

# Project Cowork

Collaborative work session for a project. Find it, report its state, then work on it together.

## Step 1: Find the Project

Search `operations/storefront/website/src/content/projects/` by directory name and frontmatter `title:` (case-insensitive partial match). If ambiguous, present all matches with their status and category for disambiguation.

Also search `content/*/index.md` for entries whose `project:` frontmatter points to this project — these are the related video entries.

## Step 2: Read & Report

Read all `.md` files in the project directory. Present:

```
## [Title]
**Status:** [status] | **Category:** [category] | **Tags:** [tags]

### Approach
[1-2 sentence summary]

### Open Questions
- [list from ## Open Questions section]

### Related Videos
- [content entries linked via project: frontmatter, with their status]
```

## Step 3: Work Session

Ask: **"What would you like to focus on?"**

Collaborate on research, design decisions, test definitions, artifact planning. Update `index.md` live:
- Resolve open questions — annotate inline with brief answer
- Add new open questions as they surface
- Update approach/design sections with decisions
- Add references found during research

**The project index.md tracks the *state* (approach, open questions, references). The *log* of work lives in the storyboard.**

## Step 4: Log to Storyboard

When meaningful progress is made (findings, build steps, results, design decisions worth documenting on video), invoke the **storyboard-logger** skill to capture this as storyboard content for the related video entry.

This is the primary documentation path — work becomes video narrative.

## Rules

- Update documents as decisions are made, not batched
- Stay in project context; offer explicit switch if user drifts
- Do not log progress in the project's index.md Log section — trigger storyboard-logger instead
