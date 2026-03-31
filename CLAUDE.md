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

- **Content collections**: Category folders live directly in `src/content/` (e.g., `src/content/manufacturing/`, `src/content/software/`)
- **Content types**: Frontmatter `type` field determines rendering: `"hub"` (category pages), `"project"` (projects with status/tags), `"article"` (knowledge base with severity/priority), or omitted (default minimal)
- **Routing**: `src/pages/[...slug].astro` renders all content pages at root URLs (no `/projects/` prefix)
- **Links**: `astro-rehype-relative-markdown-links` plugin with `collectionBase: false` handles relative `.md` link transformation
- **Slug generation**: `idToSlug()` strips `/index`, replaces spaces with hyphens, lowercases
- **Home page**: `src/pages/index.astro` shows category cards grouped by `category` field, filtered by `type: "project"` or `type: "hub"`- **Stack**: Astro + Tailwind CSS v4, static output, deployed to euriscolabs.com

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
- Do not create files in the old `projects/` folder — content now lives directly in `operations/storefront/website/src/content/<category>/`
