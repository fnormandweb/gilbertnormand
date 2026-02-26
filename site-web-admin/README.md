# Admin — Gilbert Normand

Petit outil d’édition des contenus du site (chronologie et galerie). Pas de base de données : vous exportez les fichiers et vous les copiez dans le projet site-web.

## Lancer l’admin

```bash
cd site-web-admin
pnpm install
pnpm run dev
```

Ouvrez l’URL affichée (souvent http://localhost:5173).

## Utilisation

1. **Chronologie** : modifiez les entrées (date, titre, résumé, catégorie, image, liens). Cliquez sur **Exporter timelineData.js**, enregistrez le fichier.
2. **Galerie** : modifiez les images (src, alt). Cliquez sur **Exporter galleryData.js**, enregistrez le fichier.
3. Remplacez dans le projet site-web :
   - `site-web/src/timelineData.js` par le fichier exporté (chronologie)
   - `site-web/src/galleryData.js` par le fichier exporté (galerie)
4. Rebuild du site : `cd site-web && pnpm run build`
5. Déployez le contenu de `site-web/dist/` comme d’habitude.

## Importer des données

Vous pouvez importer un JSON (tableau d’entrées ou d’images) via le bouton **Importer JSON** pour remplacer les données affichées. Format attendu : un tableau ou un objet avec une clé `timelineData` ou `galleryImages`.
