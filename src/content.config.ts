import { glob } from "astro/loaders";
import { defineCollection, z } from "astro:content";

const tags = z.array(z.enum([
    "typescript", "astro", "c++", "opengl", "glfw", "vue", "react", "nodejs", 
    "electron", "css", "react-native", "expo", "flutter", "dart", "firebase", 
    "zig", "low level"
]))

const projectsCollection = defineCollection({
    loader: glob({ pattern: '**/[^_]*.{md,mdx}', base: "./src/content/projects" }),
    schema: ({ image }) => z.object({
        title: z.string(),
        subtitle: z.string().optional(),
        cover: image(),
        link: z.string(),
        createdAt: z.string(),
        tags: tags
    })
})

const blogCollection = defineCollection({
    loader: glob({ pattern: '**/[^_]*.{md,mdx}', base: "./src/content/blog" }),
    schema: ({ image }) => z.object({
        title: z.string(),
        createdAt: z.string(),
        tags: tags,
        scope: z.string(),
        estimated: z.number().min(1),
        image: image().optional(),

        previous: z.string().optional(),
        next: z.string().optional(),
    })
})

export const collections = {
    projects: projectsCollection,
    blog: blogCollection,
}
