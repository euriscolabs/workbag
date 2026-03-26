import { defineCollection } from "astro:content";
import { z } from "astro/zod";
import { glob } from "astro/loaders";

/**
 * Projects collection — loads ALL markdown files under projects/.
 *
 * index.md files are "section pages" (project root, category index).
 * Other .md files are "detail pages" (anomalies, research notes, etc.).
 *
 * The glob loader assigns each file an `id` based on its path relative to base,
 * e.g. "projects/manufacturing/3d-printing/auto tuner/anomalies/warping.md"
 *
 * We use a flexible schema that handles both project index files (which have
 * category/tags) and subpages (which may only have title/description).
 */
const projects = defineCollection({
  loader: glob({
    pattern: "projects/**/*.md",
    base: "../../",
  }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    status: z
      .enum(["Idea", "Planning", "Design", "In Progress", "Complete"])
      .optional(),
    category: z.string().optional(),
    tags: z.array(z.string()).default([]),
    order: z.number().optional(),
    image: z.string().optional(),
    // Subpage fields
    severity: z.string().optional(),
    published: z.boolean().optional(),
  }),
});

export const collections = { projects };
