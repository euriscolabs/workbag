import type { Crumb } from "../components/Breadcrumbs.astro";

/** Title Case a slug or folder segment: "3d-printing" → "3d Printing" */
export function titleFromSegment(segment: string): string {
  return segment.replace(/[-_]/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}

/** Frontmatter fields the site reads off a page, plus where it lives. */
export interface PageMeta {
  /** Final route, e.g. "/manufacturing" or "/projects/auto-tuner" */
  url: string;
  /** Source path under /src/pages */
  file: string;
  title: string;
  description: string;
  status?: string;
  category?: string;
  tags: string[];
  /** Opt a project into the home page's Current Projects list */
  featured: boolean;
  /** Manual sort key for listings; unset pages sort alphabetically after set ones */
  order?: number;
}

// Every routed page's metadata, built from the pages directory. Files are
// globbed as raw text (not imported as modules — pages import their
// layouts, layouts import this file, so importing pages here would be
// circular). Underscore-prefixed paths (drafts) are excluded, matching
// Astro's routing.
const pageSources = import.meta.glob("/src/pages/**/*.{md,mdx}", {
  eager: true,
  query: "?raw",
  import: "default",
}) as Record<string, string>;

/** Parse a YAML flow sequence like `["A", "B"]` into its items. */
function parseList(value: string | undefined): string[] {
  if (!value || !value.startsWith("[")) return [];
  return value
    .slice(1, value.lastIndexOf("]"))
    .split(",")
    .map((s) => s.trim().replace(/^["']|["']$/g, ""))
    .filter(Boolean);
}

/** Pull simple `key: value` scalars out of a frontmatter block. */
function parseFrontmatter(raw: string): Record<string, string> {
  const block = raw.match(/^---\r?\n([\s\S]*?\r?\n)---/)?.[1] ?? "";
  const fields: Record<string, string> = {};
  for (const m of block.matchAll(/^([A-Za-z_][\w-]*):[ \t]*(.*)$/gm)) {
    fields[m[1]] = m[2].trim().replace(/^["']|["']$/g, "");
  }
  return fields;
}

export const pages: PageMeta[] = [];
const titleByPath = new Map<string, string | undefined>();

for (const [file, raw] of Object.entries(pageSources)) {
  if (file.split("/").some((s) => s.startsWith("_"))) continue;
  const url =
    file
      .replace(/^\/src\/pages/, "")
      .replace(/\.(md|mdx)$/i, "")
      .replace(/\/index$/, "") || "/";
  const fm = parseFrontmatter(raw);
  const lastSegment = url.split("/").filter(Boolean).pop() ?? "";
  titleByPath.set(url, fm.title);
  pages.push({
    url,
    file,
    title: fm.title || titleFromSegment(lastSegment),
    description: fm.description ?? "",
    status: fm.status,
    category: fm.category || undefined,
    tags: parseList(fm.tags),
    featured: fm.featured === "true",
    order: fm.order !== undefined && fm.order !== "" ? Number(fm.order) : undefined,
  });
}

/** `order` ascending when set, then title A–Z. */
function byOrderThenTitle(a: PageMeta, b: PageMeta): number {
  if (a.order !== b.order) {
    if (a.order === undefined) return 1;
    if (b.order === undefined) return -1;
    return a.order - b.order;
  }
  return a.title.localeCompare(b.title);
}

/** Top-level category MOCs (every `/<folder>/index.md` except /projects). */
export function categories(): PageMeta[] {
  return pages
    .filter((p) => /^\/[^/]+$/.test(p.url) && p.url !== "/projects" && /\/index\.mdx?$/.test(p.file))
    .sort(byOrderThenTitle);
}

/** Projects flagged `featured: true`, capped at `limit`. */
export function featuredProjects(limit = 4): PageMeta[] {
  return pages
    .filter((p) => /^\/projects\/[^/]+$/.test(p.url) && p.featured)
    .sort(byOrderThenTitle)
    .slice(0, limit);
}

/**
 * Breadcrumbs for a page URL. Ancestor crumbs link only when a page exists
 * at that path; otherwise they render as plain text.
 */
export function breadcrumbsFor(pathname: string, currentTitle: string): Crumb[] {
  const crumbs: Crumb[] = [{ label: "Home", href: "/" }];
  const segments = pathname.split("/").filter(Boolean);
  for (let i = 0; i < segments.length - 1; i++) {
    const ancestor = "/" + segments.slice(0, i + 1).join("/");
    const known = titleByPath.has(ancestor);
    crumbs.push({
      label: (known && titleByPath.get(ancestor)) || titleFromSegment(segments[i]),
      href: known ? ancestor : "",
    });
  }
  crumbs.push({ label: currentTitle, href: "" });
  return crumbs;
}

/** Every project page (`/projects/<slug>`), ordered. */
export function projects(): PageMeta[] {
  return pages.filter((p) => /^\/projects\/[^/]+$/.test(p.url)).sort(byOrderThenTitle);
}

// Known statuses in the order they should appear on listings, with the
// heading used for each. Unknown statuses follow in the order first seen;
// pages with no status land in a final "No status yet" group so they're
// easy to spot and fix.
const STATUS_ORDER: [status: string, label: string][] = [
  ["In Progress", "In progress"],
  ["Design", "In design"],
  ["Planning", "Planning"],
  ["Idea", "Ideas"],
];
const NO_STATUS = "No status yet";

export interface StatusGroup {
  status: string;
  label: string;
  items: PageMeta[];
}

/** Projects grouped by frontmatter `status`, in STATUS_ORDER; empty groups omitted. */
export function projectsByStatus(): StatusGroup[] {
  const groups = new Map<string, StatusGroup>();
  for (const [status, label] of STATUS_ORDER) groups.set(status, { status, label, items: [] });
  for (const p of projects()) {
    const status = p.status || NO_STATUS;
    if (!groups.has(status)) groups.set(status, { status, label: status, items: [] });
    groups.get(status)!.items.push(p);
  }
  // keep the no-status group last regardless of when it was first seen
  const noStatus = groups.get(NO_STATUS);
  groups.delete(NO_STATUS);
  const ordered = [...groups.values()];
  if (noStatus) ordered.push(noStatus);
  return ordered.filter((g) => g.items.length > 0);
}
