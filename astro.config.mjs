import { defineConfig } from "astro/config"
import sitemap from "@astrojs/sitemap"

export default defineConfig({
  site: "https://www.liffre-piela.netlify.app",
  trailingSlash: "ignore",
  integrations: [sitemap()],
  // Astro 7 passe compressHTML a 'jsx', ce qui supprime les espaces entre
  // elements inline adjacents. On garde l'ancien comportement pour ne pas
  // coller des mots ensemble dans les textes riches (page A propos, articles).
  compressHTML: true,
  image: {
    layout: "constrained",
    // Par defaut Astro genere 8 largeurs par image. Pour un blog d'asso
    // c'est du poids de build et de la bande passante pour rien : 3 suffisent.
    breakpoints: [640, 960, 1280],
  },
})
