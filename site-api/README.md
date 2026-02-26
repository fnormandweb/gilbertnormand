# API Gilbert Normand (SQLite)

Une seule appli : **API + site public + admin** avec une base **SQLite** (un fichier, aucune config).

## Tout lancer en une commande

```bash
cd site-api
pnpm install
pnpm start:full
```

Cette commande :

1. Build l’admin (pour être servi à `/admin/`)
2. Build le site (pour charger les données depuis l’API)
3. Démarre l’API sur le port 3001

Puis ouvrez :

- **Site public** : http://localhost:3001/
- **Admin** : http://localhost:3001/admin/

Dans l’admin, le bandeau « Connecté · Publier enregistre en ligne » confirme que **Publier** enregistre directement en SQLite (plus de téléchargement de fichiers).

## Démarrer sans rebuild

Si vous avez déjà fait `pnpm start:full` une fois :

```bash
cd site-api
pnpm start
```

**Important** : le site (/) et l’admin (/admin/) ne sont servis que si les dossiers `site-web/dist` et `site-web-admin/dist` existent. Utilisez `pnpm start:full` la première fois pour tout builder.

## Détail des commandes

| Commande           | Description                                                          |
| ------------------ | -------------------------------------------------------------------- |
| `pnpm start`       | Démarre l’API (et sert site + admin si les dossiers `dist` existent) |
| `pnpm start:full`  | Build admin + site puis démarre l’API                                |
| `pnpm build:admin` | Build l’admin pour `/admin/`                                         |
| `pnpm build:site`  | Build le site avec `VITE_API_URL=http://localhost:3001`              |
| `pnpm build:all`   | Build admin + site                                                   |

## Optionnel

- **PORT** : dans un fichier `.env`, ex. `PORT=3001`
- **DB_PATH** : chemin du fichier SQLite (défaut : `data/gilbert.db`)

## Endpoints API

| Méthode | URL           | Description            |
| ------- | ------------- | ---------------------- |
| GET     | /api/timeline | Liste chronologie      |
| POST    | /api/timeline | Enregistre chronologie |
| GET     | /api/gallery  | Liste galerie          |
| POST    | /api/gallery  | Enregistre galerie     |
| GET     | /api/texts    | Textes du site         |
| POST    | /api/texts    | Enregistre textes      |
| GET     | /api/health   | Santé + SQLite         |
