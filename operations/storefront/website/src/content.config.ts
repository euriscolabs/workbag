import { defineCollection } from "astro:content";
import { z } from "astro/zod";
import { glob } from "astro/loaders";

const content = defineCollection({
  loader: glob({
    pattern: "**/*.{md,mdx}",
    base: "src/content",
  }),
  schema: z.object({
    // Optional, Obsidian-style: files without frontmatter get a title
    // derived from their filename (see entryTitle in lib/content.ts)
    title: z.string().optional(),
    description: z.string().default(""),
    // "hub" is a legacy alias for "moc"
    type: z.enum(["moc", "hub", "project", "article"]).optional(),
    status: z
      .enum(["Idea", "Planning", "Design", "In Progress", "Complete"])
      .optional(),
    category: z.string().optional(),
    categories: z.array(z.string()).optional(),
    tags: z.array(z.string()).default([]),
    order: z.number().optional(),
    image: z.string().optional(),
    severity: z.string().optional(),
    priority: z.string().optional(),
    published: z.boolean().optional(),
  }),
});

export const collections = { content };
