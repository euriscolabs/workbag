import path from "node:path";
import { statSync } from "node:fs";
import { visit } from "unist-util-visit";
import { slug as githubSlug } from "github-slugger";

const MARKDOWN_EXT = /\.(md|mdx)$/i;

/**
 * Rehype plugin: rewrite relative links between files in src/content/ to
 * their final page URLs.
 *
 * MOC pages manage all site structure through plain markdown links like
 * `[Auto-Tuner](projects/auto%20tuner/index.md)`, so this plugin is what
 * turns vault-style file links into routes. It must produce exactly the
 * same slugs as Astro's glob loader (github-slugger per path segment,
 * trailing "/index" stripped), because [...slug].astro routes pages at
 * their entry IDs.
 *
 * Frontmatter `slug:` overrides are not supported — pages are addressed by
 * file path only. Links to files that don't exist are left untouched.
 *
 * @param {{ contentDir: string }} options absolute path of src/content
 */
export default function rehypeContentLinks({ contentDir }) {
  const contentRoot = path.resolve(contentDir);

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
      if (!MARKDOWN_EXT.test(pathPart)) return;

      let targetFile;
      try {
        targetFile = path.resolve(path.dirname(currentFile), decodeURI(pathPart));
        if (!statSync(targetFile).isFile()) return;
      } catch {
        return;
      }

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
