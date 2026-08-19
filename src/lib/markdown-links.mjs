import path from "node:path";
import { statSync } from "node:fs";
import { visit } from "unist-util-visit";
import { slug as githubSlug } from "github-slugger";

const MARKDOWN_EXT = /\.(md|mdx)$/i;

/**
 * Rehype plugin: rewrite relative links between markdown files in
 * src/pages/ to their final page URLs.
 *
 * MOC pages manage all site structure through plain markdown links like
 * `[Auto-Tuner](projects/auto-tuner/index.md)` or the extensionless
 * `[Auto-Tuner](projects/auto-tuner/index)`, so this plugin is what turns
 * vault-style file links into routes. Since src/pages is natively routed,
 * folder names ARE the URL segments (github-slugger is applied as a
 * safety net and is a no-op for slug-form names).
 *
 * Links to files that don't exist are left untouched.
 *
 * @param {{ rootDir: string }} options absolute path of src/pages
 */
export default function rehypeContentLinks({ rootDir }) {
  const contentRoot = path.resolve(rootDir);

  return (tree, file) => {
    const currentFile = file.history[0];
    if (!currentFile) return;

    visit(tree, "element", (node) => {
      if (node.tagName !== "a") return;
      const href = node.properties?.href;
      if (typeof href !== "string" || href === "") return;

      // Leave external URLs, site-absolute paths, and pure fragments alone
      if (/^[a-z][a-z0-9+.-]*:/i.test(href) || href.startsWith("/") || href.startsWith("#")) {
        return;
      }

      const splitAt = href.search(/[?#]/);
      const pathPart = splitAt === -1 ? href : href.slice(0, splitAt);
      const suffix = splitAt === -1 ? "" : href.slice(splitAt);
      if (!pathPart) return;

      let decoded;
      try {
        decoded = decodeURI(pathPart);
      } catch {
        return;
      }

      // Obsidian-style resolution, mirroring what VS Code's markdown tooling
      // does in the editor: explicit .md/.mdx paths are taken as-is;
      // extensionless paths (and folder/ paths) try .md, .mdx, then the
      // folder's index file. Paths with any other extension are assets —
      // leave them alone.
      const literal = path.resolve(path.dirname(currentFile), decoded);
      let candidates;
      if (MARKDOWN_EXT.test(decoded)) {
        candidates = [literal];
      } else if (path.extname(decoded) === "") {
        candidates = [
          literal + ".md",
          literal + ".mdx",
          path.join(literal, "index.md"),
          path.join(literal, "index.mdx"),
        ];
      } else {
        return;
      }

      const targetFile = candidates.find((c) => {
        try {
          return statSync(c).isFile();
        } catch {
          return false;
        }
      });
      if (!targetFile) return;

      const relative = path.relative(contentRoot, targetFile);
      if (relative.startsWith("..") || path.isAbsolute(relative)) return;

      const slug = relative
        .replace(MARKDOWN_EXT, "")
        .split(path.sep)
        .map((segment) => githubSlug(segment))
        .join("/")
        .replace(/\/index$/, "");

      // The root index.md slugs to "index" and lives at "/"
      const base = slug === "index" ? "/" : `/${slug}`;
      node.properties.href = base + suffix;
    });
  };
}
