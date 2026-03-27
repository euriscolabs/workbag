import { defineCollection } from "astro:content";
import { z } from "astro/zod";
import { glob } from "astro/loaders";

const projects = defineCollection({
  loader: glob({
    pattern: "**/*.md",
    base: "src/content/projects",
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
