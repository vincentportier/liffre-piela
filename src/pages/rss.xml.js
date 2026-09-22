import rss from "@astrojs/rss"
import { allPosts } from "../lib/blog.js"
import { site } from "../lib/site.js"

export async function GET(context) {
  const posts = await allPosts()
  return rss({
    title: site.title,
    description: site.description,
    site: context.site,
    items: posts.map(post => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.date,
      link: `/blog/${post.id}`,
      categories: post.data.categories,
    })),
    customData: "<language>fr-fr</language>",
  })
}
