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

- **Native pages routing**: all site content is markdown/MDX directly in `src/pages/` — file path = URL, no content collection, no catch-all route. Folder and file names MUST be URL-slug form (lowercase, hyphens instead of spaces): `src/pages/kitchen-garden/index.md` → `/kitchen-garden`.
- **MOC navigation (Obsidian-style)**: site structure is managed by Maps of Content, not computed from the filesystem. A MOC is a markdown page whose body links onward to further pages (which may themselves be MOCs — unlimited depth). The root MOC is `src/pages/index.md` (the home page). To make a new page reachable, add a link to it in the relevant map — there are no auto-generated listings or virtual pages.
- **Layouts (required)**: every page sets `layout:` in frontmatter to a relative component path — `layout: ../../layouts/MocLayout.astro` (`HomeLayout`, `MocLayout`, `ProjectLayout`, `ArticleLayout` in `src/layouts/`). There is NO inference anymore: a page without `layout` renders as bare unstyled HTML. Layouts read `Astro.props.frontmatter` (title falls back to the URL segment, Obsidian-style) and compute breadcrumbs via `breadcrumbsFor` in `src/lib/content.ts`.
- **Drafts**: underscore-prefix the folder or file (`_pippin/`, `_fitme/`) — Astro excludes it from routing entirely (dev and build). There is no frontmatter draft flag in the pages model. Publishing = rename away the underscore + add the page to its parent map.
- **Links between pages**: plain relative markdown links to the target file, with or without extension — `[Auto-Tuner](projects/auto-tuner/index.md)` or `.../index`. The rehype plugin `src/lib/markdown-links.mjs` (anchored to `src/pages`) rewrites them to final URLs; extensionless/folder paths resolve Obsidian-style (`.md`, `.mdx`, `index.md`, `index.mdx`). Prefer `folder/index` over bare `folder` (VS Code ctrl+click follows the former), keep the explicit `.mdx` extension when linking to `.mdx` targets. Links to non-existent files are left untouched and reported as warnings by `scripts/check-links.mjs` after each build.
- **MOC card tiles**: on moc pages (and the home map), any `<ul>` whose items lead with a link renders as a responsive card grid — pure CSS (`.moc-body` rules in `src/styles/global.css`), the markdown stays a plain `- [Title](target) — description` list. Ordered lists and link-less bullet lists render normally. MDX + imported components remain available for individual pages that need more than cards.
- **Home page**: pure markdown — `src/pages/index.md` with `HomeLayout` carries the whole page: wordmark image (hero), tagline paragraph, a bold-led list (styled into the values grid), and the map. Positional CSS in `global.css` (`.home-body`) does the look.
- **Assets**: non-page files (images, CAD, PDFs) cannot live in `src/pages/` — `src/content/` remains as the asset vault for project reference material (unrouted, not processed by Astro); site-served assets go in `public/`.
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

- Project markdown uses YAML frontmatter: layout (required), title, description, status, category, tags
- Website page folder/file names are URL-slug form (lowercase, hyphens, no spaces); spaces are fine in the `src/content/` asset vault
- New website pages must be linked from a MOC (usually the parent folder's `index.md`) to be discoverable — publishing a page = removing its `_` underscore prefix + adding it to a map
- Do not create files in the old `projects/` folder — pages live directly in `operations/storefront/website/src/pages/<category>/`
