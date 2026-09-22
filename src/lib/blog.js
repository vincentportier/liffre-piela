import { getCollection } from "astro:content"
import { byDateDesc, kebabCase, POSTS_PER_PAGE } from "./utils.js"

/** Tous les articles, du plus recent au plus ancien. */
export async function allPosts() {
  const posts = await getCollection("blog")
  return posts.sort(byDateDesc)
}

/** { "fête": 17, "comité": 10, "divers": 8 } */
export function categoryCounts(posts) {
  const counts = {}
  for (const post of posts) {
    for (const cat of post.data.categories) {
      counts[cat] = (counts[cat] || 0) + 1
    }
  }
  return counts
}

/**
 * Regroupe les articles par slug de categorie. Deux libelles differents
 * peuvent produire le meme slug ("fête"/"fete") : on les fusionne, en
 * gardant le premier libelle rencontre pour l'affichage.
 */
export function postsByCategorySlug(posts) {
  const map = new Map()
  for (const post of posts) {
    for (const cat of post.data.categories) {
      const slug = kebabCase(cat)
      if (!map.has(slug)) map.set(slug, { slug, label: cat, posts: [] })
      map.get(slug).posts.push(post)
    }
  }
  return map
}

/** Decoupe une liste en pages de POSTS_PER_PAGE. */
export function paginate(items, perPage = POSTS_PER_PAGE) {
  const numPages = Math.max(1, Math.ceil(items.length / perPage))
  return Array.from({ length: numPages }, (_, i) => ({
    currentPage: i + 1,
    numPages,
    items: items.slice(i * perPage, (i + 1) * perPage),
  }))
}
