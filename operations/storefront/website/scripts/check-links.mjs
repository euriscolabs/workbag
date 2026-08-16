// Post-build gate: verify every internal href in dist/**/*.html resolves to
// a built page or asset. Catches typos in hand-written href strings on
// .astro pages (import-based links via pageUrl() are already build-safe).
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const DIST = fileURLToPath(new URL("../dist", import.meta.url));

function* htmlFiles(dir) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) yield* htmlFiles(p);
    else if (e.name.endsWith(".html")) yield p;
  }
}

const broken = [];
const unrewritten = [];
let checked = 0;
for (const file of htmlFiles(DIST)) {
  const html = fs.readFileSync(file, "utf8");
  for (const m of html.matchAll(/href="([^"]*)"/g)) {
    const raw = m[1];
    if (!raw || raw.startsWith("#")) continue;
    if (/^[a-z][a-z0-9+.-]*:/i.test(raw) || raw.startsWith("//")) continue;

    if (!raw.startsWith("/")) {
      // A relative href in built output means the rewriter left a link
      // untouched (usually a link to a page that doesn't exist yet).
      // Warn, don't fail — vault-style dead links to future pages are legal.
      unrewritten.push(`${path.relative(DIST, file)} -> ${raw}`);
      continue;
    }

    let href = raw.split("#")[0].split("?")[0];
    if (!href || href === "/") continue;
    href = decodeURIComponent(href);
    checked++;
    const asFile = path.join(DIST, href);
    const asDir = path.join(DIST, href, "index.html");
    if (!fs.existsSync(asFile) || fs.statSync(asFile).isDirectory()) {
      if (!fs.existsSync(asDir)) {
        broken.push(`${path.relative(DIST, file)} -> ${raw}`);
      }
    }
  }
}

console.log(`[check-links] checked ${checked} internal hrefs`);
if (unrewritten.length) {
  console.warn("[check-links] WARNING — unrewritten relative links (dead links to future pages?):");
  for (const u of [...new Set(unrewritten)]) console.warn("  " + u);
}
if (broken.length) {
  console.error("[check-links] BROKEN LINKS:");
  for (const b of [...new Set(broken)]) console.error("  " + b);
  process.exit(1);
}
console.log("[check-links] all internal links resolve");
