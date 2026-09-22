# Liffré-Piéla

Site de l'association **Liffré-Piéla**, aide humanitaire et coopération avec la
région de Piéla (Burkina Faso).

<https://www.liffre-piela.netlify.app>

## Stack

- [Astro](https://astro.build) — générateur de site statique
- [Sveltia CMS](https://sveltiacms.app) — édition du contenu, connexion GitHub
- Netlify — hébergement et build

Pas de framework front, pas de dépendance d'exécution : le site est du HTML,
du CSS et quelques dizaines de lignes de JavaScript.

## Commandes

```bash
npm install
npm run dev      # serveur de développement — http://localhost:4321
npm run build    # génère dist/
npm run preview  # sert le build de production
```

## Structure

```
content/blog/<article>/     un dossier par article : index.md + ses images
src/
  content.config.js         schéma des articles
  layouts/Layout.astro      gabarit commun (nav, bannière, pied de page)
  components/               composants de présentation
  pages/                    routes du site
  lib/                      helpers (URLs de catégories, dates, pagination)
  images/                   photos de la galerie, visuel de bannière
public/
  admin/                    Sveltia CMS (index.html + config.yml)
  _redirects                redirections Netlify
docs/CMS.md                 mise en ligne et mode d'emploi du CMS
```

## Documentation

- [`docs/CMS.md`](docs/CMS.md) — étapes de mise en ligne restantes, et la règle
  à respecter pour publier un article sans écraser le précédent.
