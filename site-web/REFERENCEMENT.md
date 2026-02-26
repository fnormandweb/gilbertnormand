# Référencement (SEO) — Gilbert Normand

Ce document résume les éléments de référencement en place pour **ne pas perdre le rang** lors de la mise en ligne du site Vite.

## ✅ Éléments en place

### Balises et métadonnées

- **Title** : « Gilbert Normand » en tête sur toutes les pages (accueil, galerie, famille).
- **Meta description** : longue et riche en mots-clés sur l’accueil ; descriptions dédiées sur galerie et famille.
- **Meta keywords** : reprise des termes ciblés (Gilbert Normand, médecin, maire, député, Montmagny, etc.).
- **Robots** : `index, follow` avec `max-image-preview:large` sur l’accueil.
- **Langue** : `lang="fr-CA"`, `content-language`, `geo.region` (CA-QC), `geo.placename` (Montmagny).
- **Canonical** : URL canonique sur chaque page (`https://gilbertnormand.com/`, `/galerie.html`, `/famille.html`).

### Réseaux sociaux et partage

- **Open Graph** : `og:type`, `og:url`, `og:title`, `og:description`, `og:image` (avec dimensions et `og:image:alt`), `og:locale`, `og:site_name`.
- **Twitter Cards** : `summary_large_image`, titre, description, image et `twitter:image:alt`.

### Données structurées (JSON-LD)

- **WebSite** : nom, URL, description, langue, éditeur (organisation + logo).
- **Person** : Gilbert Normand avec dates de naissance/décès, lieu de naissance, nationalité, titres, formations, `sameAs` (OurCommons, ParlInfo), images.
- **CollectionPage** : page d’archive avec date de publication/modification, langue, éditeur.

### Fichiers racine

- **robots.txt** : `Allow: /` et `Sitemap: https://gilbertnormand.com/sitemap.xml`.
- **sitemap.xml** : les 3 URLs (accueil, famille, galerie) avec `lastmod`, `changefreq`, `priority` et blocs `image` pour les images importantes.

### Contenu et technique

- **Contenu** : chronologie complète, texte à propos, parcours, références officielles (BAnQ, Parlement).
- **Liens internes** : navigation cohérente entre les pages.
- **Performance** : site statique Vite (HTML/CSS/JS), préconnect fonts, pas de blocage au premier affichage.

## 🔧 À faire au moment de la mise en ligne

1. **Domaine**  
   Si l’URL finale n’est pas `https://gilbertnormand.com`, remplacer partout :
   - dans les 3 fichiers HTML : `canonical`, `og:url`, `og:image`, `twitter:url`, `twitter:image` ;
   - dans les 3 blocs JSON-LD de `index.html` : `url`, `image`, `logo`, etc. ;
   - dans `public/sitemap.xml` : toutes les `loc` et `image:loc` ;
   - dans `public/robots.txt` : l’URL du Sitemap.

2. **Google Search Console**
   - Vérifier la propriété du site (domaine ou préfixe d’URL).
   - Soumettre l’URL du sitemap : `https://votredomaine.com/sitemap.xml`.
   - Vérifier que les pages sont bien indexées après quelques jours.

3. **Suivi (recommandé)**
   - Consulter les performances (requêtes, clics, positions) dans Search Console.
   - Vérifier qu’aucune page importante n’est en erreur d’exploration ou d’indexation.

## Résumé

Le référencement est en place (meta, OG, Twitter, canonical, JSON-LD, sitemap, robots). En gardant les mêmes URLs (ou en mettant à jour les canonicals et le sitemap si le domaine change) et en soumettant le sitemap dans Search Console, vous limitez les risques de perte de rang lors de la mise en ligne.
