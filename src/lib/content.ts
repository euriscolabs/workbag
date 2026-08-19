import type { Crumb } from "../components/Breadcrumbs.astro";

/** Title Case a slug or folder segment: "3d-printing" → "3d Printing" */
export function titleFromSegment(segment: string): string {
  return segment.replace(/[-_]/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}

// Map of every routed page's URL path → its frontmatter title, built from
// the pages directory. Files are globbed as raw text (not imported as
// modules — pages import their layouts, layouts import this file, so
// importing pages here would be circular). Underscore-prefixed paths
// (drafts) are excluded, matching Astro's routing.
const pageSources = import.meta.glob("/src/pages/**/*.{md,mdx}", {
  eager: true,
  query: "?raw",
  import: "default",
}) as Record<string, string>;

const titleByPath = new Map<string, string | undefined>();
for (const [file, raw] of Object.entries(pageSources)) {
  if (file.split("/").some((s) => s.startsWith("_"))) continue;
  const url =
    file
      .replace(/^\/src\/pages/, "")
      .replace(/\.(md|mdx)$/i, "")
      .replace(/\/index$/, "") || "/";
  const fm = raw.match(/^---\r?\n([\s\S]*?\r?\n)---/)?.[1] ?? "";
  const title = fm
    .match(/^title:\s*(.+)$/m)?.[1]
    ?.trim()
    .replace(/^["']|["']$/g, "");
  titleByPath.set(url, title);
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
