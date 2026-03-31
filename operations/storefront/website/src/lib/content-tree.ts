import type { CollectionEntry } from "astro:content";

export interface ContentNode {
  segment: string;
  path: string;
  slug: string;
  depth: number;
  entry: CollectionEntry<"content"> | null;
  title: string;
  description: string;
  type: "hub" | "project" | "article";
  status?: string;
  categories: string[];
  children: ContentNode[];
  articleCount: number;
  projectCount: number;
}

export function idToSlug(id: string): string {
  return id
    .replace(/\/index$/, "")
    .replace(/\s+/g, "-")
    .toLowerCase();
}

function titleFromSegment(segment: string): string {
  return segment
    .replace(/[-_]/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

function resolveCategories(
  entry: CollectionEntry<"content"> | null,
  path: string
): string[] {
  if (entry?.data.categories) return entry.data.categories;
  if (entry?.data.category) return [entry.data.category];
  const rootSegment = path.split("/")[0];
  return [titleFromSegment(rootSegment)];
}

const KNOWN_ARTICLE_FOLDERS = new Set(["anomalies", "calibration"]);

function inferType(
  entry: CollectionEntry<"content"> | null,
  path: string,
  hasChildren: boolean
): "hub" | "project" | "article" {
  // Explicit type always wins
  if (entry?.data.type) return entry.data.type;

  // Any node with children is a hub
  if (hasChildren) return "hub";

  // Files under known knowledge-base folders are articles
  const parts = path.split("/");
  const parentSegment = parts.length >= 2 ? parts[parts.length - 2] : "";
  if (KNOWN_ARTICLE_FOLDERS.has(parentSegment)) return "article";

  // Standalone .md files (not index.md) are articles
  if (entry && !entry.filePath?.endsWith("index.md")) return "article";

  // Everything else is a project
  return "project";
}

export function buildContentTree(
  allEntries: CollectionEntry<"content">[]
): ContentNode[] {
  // Map entry IDs to entries
  const entryById = new Map<string, CollectionEntry<"content">>();
  for (const entry of allEntries) {
    entryById.set(entry.id, entry);
  }

  // Collect all directory paths that contain content
  const dirPaths = new Set<string>();
  for (const entry of allEntries) {
    const parts = entry.id.split("/");
    // For index entries (id = "foo/bar"), the entry IS the directory
    // For leaf entries (id = "foo/bar/baz"), parent dirs are prefixes
    for (let i = 1; i < parts.length; i++) {
      dirPaths.add(parts.slice(0, i).join("/"));
    }
  }

  // Build all nodes: one per entry + one per directory without an entry
  const nodeMap = new Map<string, ContentNode>();

  // Create nodes for entries
  // Astro's glob loader strips "/index" from IDs, so:
  // - index.md at electronics/cyberdeck/index.md → id = "electronics/cyberdeck"
  // - standalone warping.md at .../anomalies/warping.md → id = "manufacturing/3d-printing/anomalies/warping"
  // In both cases, the entry ID is the correct node path.
  for (const entry of allEntries) {
    const path = entry.id;
    const parts = path.split("/");
    const segment = parts[parts.length - 1];

    nodeMap.set(path, {
      segment,
      path,
      slug: idToSlug(path),
      depth: parts.length - 1,
      entry,
      title: entry.data.title,
      description: entry.data.description || "",
      type: "project", // placeholder, inferred later
      status: entry.data.status,
      categories: resolveCategories(entry, path),
      children: [],
      articleCount: 0,
      projectCount: 0,
    });
  }

  // Create virtual nodes for directories that have no entry (no index.md)
  for (const dirPath of dirPaths) {
    if (!nodeMap.has(dirPath)) {
      const parts = dirPath.split("/");
      const segment = parts[parts.length - 1];
      nodeMap.set(dirPath, {
        segment,
        path: dirPath,
        slug: idToSlug(dirPath),
        depth: parts.length - 1,
        entry: null,
        title: titleFromSegment(segment),
        description: "",
        type: "hub", // placeholder
        status: undefined,
        categories: resolveCategories(null, dirPath),
        children: [],
        articleCount: 0,
        projectCount: 0,
      });
    }
  }

  // Assemble tree: assign children to parents
  for (const [path, node] of nodeMap) {
    const parts = path.split("/");
    if (parts.length > 1) {
      const parentPath = parts.slice(0, -1).join("/");
      const parent = nodeMap.get(parentPath);
      if (parent) {
        parent.children.push(node);
      }
    }
  }

  // Infer types now that we know who has children
  for (const node of nodeMap.values()) {
    node.type = inferType(node.entry, node.path, node.children.length > 0);
  }

  // Compute counts bottom-up and sort children
  function computeCounts(node: ContentNode): void {
    for (const child of node.children) {
      computeCounts(child);
    }

    node.articleCount = node.children.reduce(
      (sum, c) => sum + c.articleCount + (c.type === "article" ? 1 : 0),
      0
    );
    node.projectCount = node.children.reduce(
      (sum, c) => sum + c.projectCount + (c.type === "project" ? 1 : 0),
      0
    );

    // Sort: hubs first, then projects, then articles. Within each group: by order, then title
    const typeOrder = { hub: 0, project: 1, article: 2 };
    node.children.sort((a, b) => {
      const typeDiff = typeOrder[a.type] - typeOrder[b.type];
      if (typeDiff !== 0) return typeDiff;
      const orderA = a.entry?.data.order ?? 99;
      const orderB = b.entry?.data.order ?? 99;
      if (orderA !== orderB) return orderA - orderB;
      return a.title.localeCompare(b.title);
    });
  }

  // Get root nodes (depth 0)
  const roots = [...nodeMap.values()].filter(
    (n) => n.path.split("/").length === 1
  );

  // Filter out roots with no content descendants
  const contentRoots = roots.filter(
    (r) => r.entry !== null || r.children.length > 0
  );

  for (const root of contentRoots) {
    computeCounts(root);
  }

  // Sort roots by project count (descending), then title
  contentRoots.sort((a, b) => {
    const countDiff =
      b.projectCount + b.children.length - (a.projectCount + a.children.length);
    if (countDiff !== 0) return countDiff;
    return a.title.localeCompare(b.title);
  });

  return contentRoots;
}

export function flattenTree(nodes: ContentNode[]): ContentNode[] {
  return nodes.flatMap((n) => [n, ...flattenTree(n.children)]);
}
