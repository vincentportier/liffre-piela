/*
 * Service worker auto-destructeur.
 *
 * L'ancien site Gatsby utilisait gatsby-plugin-offline, qui enregistrait un
 * service worker a cette adresse. Ce service worker reste installe dans le
 * navigateur de tous les anciens visiteurs et continue de servir sa copie en
 * cache : ils voient l'ancien site meme apres le deploiement du nouveau.
 *
 * Ce fichier le remplace et se contente de tout nettoyer : il vide les caches,
 * se desinscrit, puis recharge les onglets ouverts. A garder en place
 * longtemps (des annees) : un visiteur qui ne revient qu'une fois par an a
 * encore l'ancien service worker installe.
 */

self.addEventListener("install", () => {
  self.skipWaiting()
})

self.addEventListener("activate", (event) => {
  event.waitUntil(
    (async () => {
      // 1. Vider tous les caches laisses par l'ancien service worker
      const keys = await caches.keys()
      await Promise.all(keys.map((key) => caches.delete(key)))

      // 2. Se desinscrire
      await self.registration.unregister()

      // 3. Recharger les onglets ouverts pour qu'ils recuperent le vrai site
      const clients = await self.clients.matchAll({ type: "window" })
      for (const client of clients) {
        if ("navigate" in client) client.navigate(client.url)
      }
    })()
  )
})
