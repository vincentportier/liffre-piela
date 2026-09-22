# Mise en ligne et administration

Ce document couvre les trois étapes qui restent à faire à la main, puis
l'utilisation quotidienne du CMS.

---

## 1. Ce qui a changé

| | Avant | Après |
| --- | --- | --- |
| Générateur | Gatsby 2 (plus buildable) | Astro 7 |
| CMS | Netlify CMS 2.14 (abandonné) | Sveltia CMS |
| Connexion au CMS | Netlify Identity + Git Gateway (déprécié) | GitHub |
| Hébergement | Netlify | Netlify (inchangé, URL conservée) |

Les URLs publiques sont identiques à l'ancien site. Voir `public/_redirects`
pour les rares redirections nécessaires.

---

## 2. Déployer le service de connexion (une seule fois)

Sveltia a besoin d'un petit service pour gérer « Se connecter avec GitHub ».
Il tourne gratuitement sur Cloudflare Workers.

1. Créer un compte Cloudflare (gratuit, sans carte bancaire).
2. Déployer le Worker officiel : <https://github.com/sveltia/sveltia-cms-auth>
   (bouton *Deploy with Workers*, ou `npx wrangler deploy` depuis un clone).
   Noter l'URL obtenue, du type `https://xxxx.workers.dev`.
3. Sur GitHub, créer une **OAuth App** :
   *Settings → Developer settings → OAuth Apps → New OAuth App*
   - Homepage URL : `https://www.liffre-piela.netlify.app`
   - Authorization callback URL : `https://xxxx.workers.dev/callback`
   - Récupérer le *Client ID* et générer un *Client Secret*.
4. Dans les variables d'environnement du Worker, renseigner :
   - `GITHUB_CLIENT_ID`
   - `GITHUB_CLIENT_SECRET`
   - `ALLOWED_DOMAINS` = `www.liffre-piela.netlify.app`
5. Reporter l'URL du Worker dans [`public/admin/config.yml`](../public/admin/config.yml),
   à la place de `https://REMPLACER-PAR-VOTRE-WORKER.workers.dev`.

### Variante sans Cloudflare

Sveltia propose aussi **« Se connecter avec un jeton d'accès »** : on colle un
*personal access token* GitHub (scope `repo`) et on entre directement, sans
Worker ni OAuth App. C'est plus rapide à mettre en place, mais moins agréable
à l'usage (il faut recoller le jeton quand il expire) et cela suppose de
confier un jeton au rédacteur. Le Worker reste la bonne option pour un usage
régulier.

---

## 3. Côté Netlify

Le fichier [`netlify.toml`](../netlify.toml) fixe déjà la commande de build
(`npm run build`), le dossier publié (`dist`) et Node 22. Il n'y a donc rien à
régler dans l'interface.

Deux nettoyages possibles une fois la refonte en ligne :

- **Git Gateway** : dans *Identity → Services*, on peut le désactiver, il ne
  sert plus.
- **Netlify Identity** : les comptes utilisateurs ne servent plus non plus.
  Ne pas supprimer avant d'avoir vérifié que la connexion GitHub fonctionne.

Le formulaire de contact passe toujours par **Netlify Forms** (soumission
native, plus de JavaScript). Vérifier dans *Forms* que le formulaire `contact`
est bien détecté après le premier déploiement.

Sur les plans **à crédits**, les soumissions de formulaire sont illimitées et
gratuites depuis avril 2026. Sur les anciens plans (*legacy*), la limite reste
de 100 soumissions par site et par mois. Si le compte est encore sur un plan
legacy, c'est le seul quota à surveiller côté formulaire.

---

## 4. Pour le rédacteur

L'administration est sur **<https://www.liffre-piela.netlify.app/admin>**,
connexion avec un compte GitHub.

### La règle importante

**Pour publier un nouvel article, toujours cliquer sur « Nouvel article ».**

Ne jamais reprendre un article existant pour en faire un nouveau, même si le
contenu se ressemble beaucoup (une AG, un bol de riz, une braderie d'une année
sur l'autre). En réécrivant un ancien article :

- l'article de l'année précédente est **définitivement remplacé** et disparaît
  du site ;
- l'adresse de la page garde l'ancien nom et ne correspond plus au contenu.

C'est ce qui s'était produit avant la refonte : 13 articles avaient ainsi été
écrasés, et ont dû être récupérés dans l'historique Git.

Note technique : le dossier d'un article est figé à sa création. Changer le
titre ensuite ne renomme pas l'adresse de la page — d'où l'importance de la
règle ci-dessus.

### Annonce et bilan

Pour un événement, on publie en général **deux** articles distincts : l'annonce
avant, le compte-rendu après. Ce sont bien deux articles séparés, pas une
modification du premier.

---

## 5. Développement local

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # génère dist/
npm run preview  # sert le build de production
```

Deux limites du serveur de développement, sans incidence en production :

- `/admin` n'est pas servi (utiliser `/admin/index.html`) ;
- l'ordre d'injection des styles diffère du build.

Pour éditer le contenu en local sans rien déployer, Sveltia propose
« Travailler avec un dépôt local » : on sélectionne le dossier du projet et on
édite directement les fichiers.
