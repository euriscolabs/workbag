# Eurisco Labs — Workbag

Monorepo for Eurisco Labs: a tech venture spanning software, hardware, and engineering — documented openly.

## Structure

```
workbag/
  content/                    # Video production pipeline (YouTube)
    NNN-slug/                 # Numbered video entries
      index.md                # Video metadata, project reference, status
      storyboard.md           # Beat-by-beat V:/A: visual/audio breakdown
      todo.md                 # Production phase checklist
    animations/               # Remotion animation source (shared or per-video)

  operations/                 # Business operations
    company/                  # GmbH, brand identity, logos
    channels/                 # YouTube, Instagram, TikTok, GitHub, Patreon, Newsletter
    storefront/               # Website (Astro), Webshop (Shopify planned)
    infrastructure/           # Domains, hosting, accounts
    marketing/                # SEO, Ads, Content calendar

  .claude/                    # Claude Code config
    skills/                   # Custom slash commands for this workspace
```

## Website (Astro)

Located at `operations/storefront/website/`.

- **MOC navigation (Obsidian-style)**: site structure is managed by Maps of Content, not computed from the filesystem. A MOC is a markdown page whose body links onward to further pages (which may themselves be MOCs — unlimited depth). The root MOC is `src/content/index.md`, rendered on the home page. To make a new page reachable, add a link to it in the relevant map — there are no auto-generated listings or virtual pages.
- **Content collection**: `"content"` collection loads `**/*.{md,mdx}` from `src/content/`. Category folders live directly there (e.g., `manufacturing/`, `software/`)
- **Routing**: `src/pages/[...slug].astro` builds one route per entry at the entry's id (Astro's glob loader github-slugs each path segment, so `kitchen garden/index.md` → `/kitchen-garden`). `published: false` in frontmatter hides a page and everything beneath it.
- **Links between pages**: plain relative markdown links to the target file, e.g. `[Auto-Tuner](projects/auto%20tuner/index.md)`. The custom rehype plugin `src/lib/markdown-links.mjs` rewrites them to final URLs using the same slug algorithm as the loader. Links to non-existent files are left untouched.
- **Content types**: Frontmatter `type` field determines rendering (`"moc"`, `"project"`, `"article"`; `"hub"` is a legacy alias for moc). Auto-inferred when not set: entries with entries beneath them → moc, files in `anomalies/`/`calibration/` → article, standalone `.md` → article, else → project (see `src/lib/content.ts`)
- **Frontmatter is optional**: files without a `title` get one derived from their filename, Obsidian-style
- **Home page**: `src/pages/index.astro` renders hero + values + the root MOC's markdown body
- **Stack**: Astro + Tailwind CSS v4, static output, deployed to euriscolabs.com

## Content / Video Pipeline

- `content/` contains video planning docs, NOT website content
- Each video entry links to a project via `project:` frontmatter
- Projects link back via `**Video:** content/NNN-slug` references
- Storyboards use `V:` (visual) and `A:` (audio) prefixes
- Remotion animations are rendered to mp4 and manually added to website when ready

## Brand

- **Font**: Space Grotesk (semibold 600 / regular 400)
- **Colors**: Navy #0d47a1, Blue #1a73e8, Light blue #4fc3f7, Orange #ffab40
- **Logos**: `operations/company/identity/logos/` (SVG, optimized)
- **Voice**: Scientific but accessible, clean, educational, honest

## Conventions

- Project markdown uses YAML frontmatter: title, description, status, category, tags
- Folder names may contain spaces in content/; the website slugifies them to hyphens
- New website pages must be linked from a MOC (usually the parent folder's `index.md`) to be discoverable — publishing a page = flipping `published` + adding it to a map
- Do not create files in the old `projects/` folder — content now lives directly in `operations/storefront/website/src/content/<category>/`
