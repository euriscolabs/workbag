import type { CollectionEntry } from "astro:content";

export type ContentEntry = CollectionEntry<"content">;
export type ContentType = "moc" | "project" | "article";

const KNOWN_ARTICLE_FOLDERS = new Set(["anomalies", "calibration"]);

/** Title Case a slug or folder segment: "3d-printing" → "3d Printing" */
export function titleFromSegment(segment: string): string {
  return segment.replace(/[-_]/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}

/** Frontmatter title, or Title Cased last id segment when a file has none. */
export function entryTitle(entry: ContentEntry): string {
  return entry.data.title ?? titleFromSegment(entry.id.split("/").pop() ?? entry.id);
}

/**
 * How to render an entry. Site structure lives in MOC pages themselves, so
 * the only filesystem signal still consulted is whether other entries live
 * beneath this one (an index.md with content below it is a map by default).
 */
export function inferType(entry: ContentEntry, hasDescendants: boolean): ContentType {
  const explicit = entry.data.type;
  if (explicit) return explicit === "hub" ? "moc" : explicit;

  if (hasDescendants) return "moc";

  const parts = entry.id.split("/");
  const parentSegment = parts.length >= 2 ? parts[parts.length - 2] : "";
  if (KNOWN_ARTICLE_FOLDERS.has(parentSegment)) return "article";

  // Standalone .md files (not index.md) are articles
  if (entry.filePath && !/index\.mdx?$/.test(entry.filePath)) return "article";

  return "project";
}
