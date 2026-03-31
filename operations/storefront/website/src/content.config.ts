import { defineCollection } from "astro:content";
import { z } from "astro/zod";
import { glob } from "astro/loaders";

// Content collection: categories contain knowledge bases and projects
const projects = defineCollection({
  loader: glob({
    pattern: "**/*.md",
    base: "src/content",
  }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    type: z.enum(["hub", "project", "article"]).optional(),
    status: z
      .enum(["Idea", "Planning", "Design", "In Progress", "Complete"])
      .optional(),
    category: z.string().optional(),
    tags: z.array(z.string()).default([]),
    order: z.number().optional(),
    image: z.string().optional(),
    severity: z.string().optional(),
    priority: z.string().optional(),
    published: z.boolean().optional(),
  }),
});

export const collections = { projects };
