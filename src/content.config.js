import { defineCollection } from "astro:content"
import { glob } from "astro/loaders"
import { z } from "astro/zod"

const blog = defineCollection({
  loader: glob({ pattern: "**/index.md", base: "./content/blog" }),
  schema: ({ image }) =>
    z.object({
      title: z.string().transform(s => s.trim()),
      date: z.coerce.date(),
      description: z.string().optional().default(""),
      // Le CMS écrit un nom de fichier nu (ex. "ag-2021.jpg") : on préfixe
      // en "./" pour qu'Astro le résolve depuis le dossier de l'article.
      featuredImage: z
        .string()
        .optional()
        .transform(v => (v && !v.startsWith(".") && !v.startsWith("/") ? `./${v}` : v))
        .pipe(image().optional()),
      categories: z.array(z.string()).optional().default([]),
    }),
})

export const collections = { blog }
