import { defineCollection } from "astro:content";
import { z } from "astro/zod";
import { glob } from "astro/loaders";

const projects = defineCollection({
  loader: glob({
    pattern: "projects/**/index.md",
    base: "../../",
  }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    status: z
      .enum(["Idea", "Planning", "Design", "In Progress", "Complete"])
      .default("Idea"),
    category: z.string(),
    tags: z.array(z.string()).default([]),
    order: z.number().optional(),
    image: z.string().optional(),
  }),
});

export const collections = { projects };
