# Mise en ligne du site Gilbert Normand (API + site + admin)

---

## Important : deux façons de mettre en ligne

### 1. Tu as déposé seulement le contenu de `dist/` (FTP, Netlify, etc.)

- **Ce que tu as fait** : tu as mis en ligne les fichiers du dossier **dist** (index.html, famille.html, galerie.html, assets/, images/) sur un hébergeur web classique (ex. **SiteGround** en hébergement partagé, OVH, o2switch, etc.).
- **Résultat** : le site s’affiche, mais **il n’y a pas d’API**. Les textes, la galerie et l’arbre généalogique viennent des données **statiques** incluses dans le build. Les modifications faites dans l’admin en local **n’apparaîtront pas** sur ce site, car il n’y a pas de serveur Node qui sert l’API et l’admin.
- **Pour qui** : afficher le site en lecture seule, sans vouloir modifier le contenu en ligne.
- **SiteGround (hébergement partagé)** : ce type d’hébergement ne fait **pas** tourner Node.js. Tu peux uniquement déposer le contenu de **dist** pour avoir le site statique. Pour l’admin + données dynamiques, il faut un hébergement qui supporte Node (voir option 2 ci‑dessous ou la section « Hébergeurs clé en main »).

### 2. Tu veux que l’admin et les données soient en ligne (modifications visibles sur le site)

- **Ce qu’il faut** : faire tourner le **serveur Node** (le projet `site-api`), pas seulement déposer des fichiers. Ce serveur sert à la fois le site public, l’admin et l’API. Les visiteurs ouvrent ton **domaine** ; le serveur répond avec les pages et les données.
- **Tu ne déposes pas “juste dist”** : tu installes Node sur un hébergement qui peut lancer Node (VPS, Railway, Render, etc.), tu mets le projet `site-api` + les dossiers `dist` (ou tu fais le build sur le serveur), tu configures un mot de passe admin, et tu **démarres le serveur** (`pnpm start`). Voir les étapes ci‑dessous.

---

## Résumé en 5 étapes (si tu veux l’admin en ligne)

| #   | Où             | Quoi faire                                                                                                            |
| --- | -------------- | --------------------------------------------------------------------------------------------------------------------- |
| 1   | Sur ton PC     | `cd site-api` puis `pnpm install` puis `pnpm run build:all` (ça crée les dossiers `dist`).                            |
| 2   | Sur le serveur | Avoir **Node.js** installé et un endroit où lancer une commande (SSH ou hébergeur Node).                              |
| 3   | Sur le serveur | Copier tout le projet (ou au minimum le dossier **site-api** + **site-web/dist** + **site-web-admin/dist**).          |
| 4   | Sur le serveur | Dans `site-api`, créer un fichier `.env` avec `ADMIN_USER` et `ADMIN_PASSWORD` (et `PORT` si l’hébergeur le demande). |
| 5   | Sur le serveur | Dans `site-api`, lancer `pnpm install` puis `pnpm start` (ou `pm2 start server.js` pour que ça reste actif).          |

Ensuite : le **site** = l’URL de ton serveur (ex. `https://tondomaine.com/`). L’**admin** = `https://tondomaine.com/admin/`.

---

## Tester en local d’abord (obligatoire)

Avant de déployer, vérifie que tout marche sur ton PC :

1. Ouvre un terminal dans le dossier du projet (là où tu vois `site-api`, `site-web`, `site-web-admin`).
2. Exécute :
   ```bash
   cd site-api
   pnpm install
   pnpm run build:all
   pnpm start
   ```
3. Tu dois voir s’afficher :
   ```
   API Gilbert Normand: http://localhost:3001
     Site public:  http://localhost:3001/
     Admin:       http://localhost:3001/admin/
   ```
4. Ouvre dans le navigateur :
   - http://localhost:3001/ → page d’accueil
   - http://localhost:3001/famille.html → arbre généalogique
   - http://localhost:3001/admin/ → admin (login : admin / admin par défaut)
5. Dans l’admin, modifie un texte ou un nom dans Famille, clique sur **Publier**, puis rafraîchis la page du site : le changement doit apparaître.

Si ça ne marche pas en local, ça ne marchera pas en ligne. Note le message d’erreur exact (terminal ou navigateur).

---

## Dépannage (rien ne fonctionne)

Coche point par point :

| Problème                                                    | À vérifier                                                                                                                                                                      |
| ----------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| « La commande ne se trouve pas » (pnpm, node)               | Installer Node.js (LTS) depuis nodejs.org. Puis `npm install -g pnpm`.                                                                                                          |
| Le serveur ne démarre pas                                   | Tu es bien dans **site-api** quand tu lances `pnpm start` ? (`cd site-api` avant.)                                                                                              |
| « Cannot find module »                                      | Dans **site-api**, refaire `pnpm install`.                                                                                                                                      |
| La page d’accueil est blanche ou 404                        | Les dossiers **site-web/dist** et **site-web-admin/dist** doivent exister. Relancer `pnpm run build:all` dans **site-api**.                                                     |
| Le site s’affiche mais pas les données (famille vide, etc.) | Tu regardes bien **http://localhost:3001/** (ou ton URL de prod), pas un autre serveur (ex. `file://` ou un autre port). Le site doit être servi par le même serveur que l’API. |
| Admin : « Non autorisé » ou impossible de se connecter      | Vérifier que tu utilises le bon identifiant/mot de passe (par défaut `admin` / `admin`). En prod, définir `ADMIN_USER` et `ADMIN_PASSWORD` dans `.env`.                         |
| En ligne : tout 404 ou erreur                               | L’hébergeur doit **exécuter Node** et lancer `node server.js` (ou `pnpm start`). Déposer seulement les fichiers **dist** ne suffit pas.                                         |
| Port déjà utilisé                                           | Changer de port : dans **site-api**, fichier `.env`, mettre par ex. `PORT=3010`, puis redémarrer.                                                                               |

**Où ça bloque exactement ?** (terminal, navigateur, en local ou en ligne ?) Noter le message d’erreur aide à cibler le problème.

---

## Vue d’ensemble (détail)

- **Site public** : pages d’accueil, galerie, famille (données chargées depuis l’API).
- **Admin** : à l’URL `/admin/` (login requis), pour modifier textes, galerie, timeline, arbre généalogique.
- **API** : `/api/*` (timeline, gallery, texts, famille). Les données sont stockées dans un fichier SQLite (`data/gilbert.db`).

Pour que les changements faits dans l’admin apparaissent sur le site, il faut que le site soit **servi par cette même API** (build avec `VITE_API_URL=` pour appeler l’API à la même origine).

---

## 1. Prérequis sur le serveur

- **Node.js** 18+ (ou 20+ recommandé).
- Accès en SSH (VPS) ou interface d’hébergement Node (Railway, Render, etc.).

---

## 2. Build et fichiers à déployer

Sur ta machine (ou en CI), à la racine du projet :

```bash
cd site-api
pnpm install
pnpm run build:all
```

Cela crée :

- `site-web/dist/` → site public (index.html, famille.html, galerie.html, assets, images)
- `site-web-admin/dist/` → interface admin

**Fichiers à envoyer sur le serveur** (depuis la racine du repo) :

- Tout le dossier **`site-api/`** (avec `server.js`, `package.json`, `data/` si tu as déjà une base)
- Les dossiers **`site-web/dist/`** et **`site-web-admin/dist/`** (déjà générés par `build:all`)

En pratique : tu peux déployer tout le repo puis, sur le serveur, exécuter `cd site-api && pnpm install --prod && pnpm run build:all` si tu préfères builder sur le serveur. Les deux approches sont valides.

---

## 3. Variables d’environnement (production)

Dans le dossier **`site-api/`**, crée un fichier **`.env`** (ou configure-les dans ton hébergeur) :

| Variable         | Obligatoire     | Description                                                                                                |
| ---------------- | --------------- | ---------------------------------------------------------------------------------------------------------- |
| `PORT`           | Non             | Port d’écoute (défaut : 3001). Souvent l’hébergeur impose une variable comme `PORT`.                       |
| `ADMIN_USER`     | **Oui** en prod | Identifiant de connexion admin. En production, ne pas laisser la valeur par défaut.                        |
| `ADMIN_PASSWORD` | **Oui** en prod | Mot de passe admin. Choisir un mot de passe fort.                                                          |
| `DB_PATH`        | Non             | Chemin du fichier SQLite (défaut : `data/gilbert.db`). Utile si tu veux un chemin persistant (ex. volume). |

Exemple `.env` :

```env
PORT=3001
ADMIN_USER=ton_identifiant
ADMIN_PASSWORD=un_mot_de_passe_fort
```

---

## 4. Démarrer le serveur

Dans le dossier **`site-api/`** :

```bash
pnpm install
pnpm start
```

Ou, si les `dist` n’existent pas encore :

```bash
pnpm start:full
```

Le serveur écoute sur le port configuré (ex. 3001). Tu dois avoir :

- **Site public** : `http://ton-serveur:PORT/` (ex. `http://localhost:3001/`)
- **Page Famille** : `http://ton-serveur:PORT/famille.html`
- **Admin** : `http://ton-serveur:PORT/admin/`

---

## 5. Garder le serveur actif (VPS / serveur dédié)

En production sur un VPS, utilise un **gestionnaire de processus** pour que Node tourne en continu et redémarre en cas de crash.

### Option A : PM2

```bash
npm install -g pm2
cd site-api
pnpm run build:all
pm2 start server.js --name gilbert-api
pm2 save
pm2 startup   # pour relancer PM2 au démarrage du serveur
```

### Option B : systemd

Créer un fichier `/etc/systemd/system/gilbert-api.service` (adapter les chemins) :

```ini
[Unit]
Description=API Gilbert Normand
After=network.target

[Service]
Type=simple
User=www-data
WorkingDirectory=/chemin/vers/vite-main/site-api
Environment=NODE_ENV=production
Environment=PORT=3001
ExecStart=/usr/bin/node server.js
Restart=on-failure

[Install]
WantedBy=multi-user.target
```

Puis :

```bash
sudo systemctl daemon-reload
sudo systemctl enable gilbert-api
sudo systemctl start gilbert-api
```

---

## 6. Domaine et HTTPS (recommandé en production)

Sur un VPS, place un **reverse proxy** (Nginx ou Caddy) devant Node et gère le SSL.

### Exemple Nginx (écoute sur 80/443, proxy vers Node)

```nginx
server {
    listen 80;
    server_name gilbertnormand.com www.gilbertnormand.com;
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name gilbertnormand.com www.gilbertnormand.com;

    ssl_certificate     /etc/letsencrypt/live/gilbertnormand.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/gilbertnormand.com/privkey.pem;

    location / {
        proxy_pass http://127.0.0.1:3001;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

- Remplace `gilbertnormand.com` par ton domaine.
- Certificat SSL : Let’s Encrypt avec `certbot`.
- Le site, la page famille et l’admin sont alors accessibles en `https://gilbertnormand.com/`, `https://gilbertnormand.com/famille.html`, `https://gilbertnormand.com/admin/`.

---

## 7. Hébergeurs gratuits (ou quasi gratuits)

Pour que **tout fonctionne** (site + admin + données qui restent), il faut du **stockage persistant** pour le fichier SQLite. Sinon, à chaque redémarrage ou redéploiement, la base est réinitialisée.

| Hébergeur   | Gratuit ?                                             | Données conservées ?                                                                   | À retenir                                               |
| ----------- | ----------------------------------------------------- | -------------------------------------------------------------------------------------- | ------------------------------------------------------- |
| **Fly.io**  | Oui (free tier)                                       | **Oui** — 3 Go de volume persistant inclus                                             | **Meilleur choix gratuit** : Node + volume pour SQLite. |
| **Render**  | Oui (free tier)                                       | **Non** — disque éphémère, la base est perdue au redéploiement ou après mise en veille | Utile pour tester uniquement.                           |
| **Railway** | 5 $ de crédit offert puis ~1 $/mois de crédit gratuit | Oui (avec volume / persistance selon le plan)                                          | Quasi gratuit, très simple à utiliser.                  |
| **Koyeb**   | Oui (free tier)                                       | À vérifier selon le type de service                                                    | 1 service web gratuit, Node supporté.                   |

**Recommandation pour du gratuit qui garde les données :** **Fly.io**. Tu crées une app Node, tu ajoutes un **volume** (stockage persistant) et tu pointes `DB_PATH` vers ce volume. Le free tier inclut 3 Go de volume.

### Projet Git pour lier à Fly.io

Fly.io déploie à partir d’un dépôt Git (GitHub, GitLab, etc.) ou en local. Pour lier un projet Git à Fly.io :

**1. Créer un dépôt Git (si ce n’est pas déjà fait)**

Le dépôt doit contenir au minimum :

- le dossier **site-api** (avec `server.js`, `package.json`, etc.) ;
- les dossiers **site-web** et **site-web-admin** (le code source ; le build se fera au déploiement).

Tu peux être soit à la racine d’un repo qui ne contient que ce projet (ex. `gilbert-normand-site`), soit dans un monorepo où ces dossiers sont à la racine.

À la racine du projet (ou dans `site-api` si tout le repo est dans un sous-dossier), assure-toi d’avoir un **.gitignore** qui ignore :

- `node_modules/`
- `.env`
- `site-api/data/` (fichier SQLite local, pas versionné)
- `site-web/dist/` et `site-web-admin/dist/` (optionnel : on peut les rebuilder au déploiement)

Exemple de `.gitignore` à la racine d’un repo contenant `site-api`, `site-web`, `site-web-admin` :

```
node_modules
.env
.env.*
site-api/data
site-web/dist
site-web-admin/dist
.DS_Store
*.log
```

**2. Pousser le code sur GitHub**

```bash
cd /chemin/vers/ton/projet   # ex. le dossier qui contient site-api, site-web, site-web-admin
git init
git add site-api site-web site-web-admin .gitignore
git commit -m "Projet Gilbert Normand - site + API + admin"
```

Crée un **nouveau dépôt** sur [GitHub](https://github.com/new) (ex. `gilbert-normand-site`), sans initialiser avec un README si tu as déjà un commit. Puis :

```bash
git remote add origin https://github.com/TON-USERNAME/gilbert-normand-site.git
git branch -M main
git push -u origin main
```

(Remplace `TON-USERNAME` et `gilbert-normand-site` par ton compte et le nom du repo.)

**Dépôt déjà créé (ex. [fnormandweb/gilbertnormand](https://github.com/fnormandweb/gilbertnormand))**

Si le dépôt est vide et que ton projet est dans un gros repo (ex. `vite-main` avec d’autres dossiers), utilise le script qui copie uniquement `site-api`, `site-web`, `site-web-admin` et pousse vers GitHub. **À lancer depuis la racine du projet** (le dossier qui contient `site-api`) :

```bash
cd /Users/francoisnormand/Documents/Gilbert/Vite/vite-main
bash site-api/scripts/push-to-gilbertnormand.sh
```

Le script crée un dossier `gilbertnormand-push`, y copie les trois dossiers (sans `node_modules`, `dist`, `data`), ajoute le `.gitignore`, fait `git init`, commit, et `git push` vers `https://github.com/fnormandweb/gilbertnormand.git`. Si tu as une erreur « remote origin already exists » ou « failed to push », soit le dépôt n’est plus vide : dans ce cas, va dans `gilbertnormand-push`, puis `git pull origin main --rebase` (ou `--allow-unrelated-histories` si demandé), puis `git push origin main`.

**3. Lier Fly.io au dépôt**

- **Option A — Depuis le dashboard Fly.io**  
  Va sur [fly.io/dashboard](https://fly.io/dashboard) → **Create app** → **Deploy with GitHub**. Autorise l’accès au repo, choisis le dépôt et la branche (`main`). Fly créera l’app ; tu devras ensuite configurer le build (Dockerfile ou commandes) et les secrets (ADMIN_USER, ADMIN_PASSWORD, DB_PATH si besoin).

- **Option B — En local avec Fly CLI**  
  Installe [flyctl](https://fly.io/docs/hands-on/install-flyctl/), puis dans le dossier du projet (là où tu as ou mettras un `fly.toml` et un `Dockerfile`) :  
  `fly auth login`  
  `fly launch`  
  Suis les questions (région, nom d’app, pas de Postgres). Ensuite ajoute le volume, les secrets et déploie avec `fly deploy`. Les déploiements suivants pourront se faire aussi par GitHub si tu connectes le repo dans le dashboard.

Une fois le repo poussé et Fly.io connecté (ou configuré en local), chaque `git push` sur la branche liée peut déclencher un déploiement automatique si tu as activé l’intégration GitHub.

---

### Fly.io (gratuit, avec persistance)

1. Créer un compte sur [fly.io](https://fly.io) et installer l’outil en ligne de commande : [fly.io/docs/hands-on/install-flyctl](https://fly.io/docs/hands-on/install-flyctl/).
2. À la racine du repo (ou dans `site-api`), créer une app et un volume. Exemple de commandes (à adapter au nom de ton app) :
   - `fly launch` (choisir une région, ne pas ajouter de Postgres).
   - Créer un volume : `fly volumes create data --size 1` (1 Go, dans la même région que l’app).
3. Configurer l’app pour monter le volume et lancer Node : dans `fly.toml`, ajouter une section `[mounts]` avec `source = "data"` et `destination = "/data"`. La commande de start doit faire `node server.js` en ayant défini `DB_PATH=/data/gilbert.db` (variable d’environnement).
4. Définir les secrets : `fly secrets set ADMIN_USER=ton_login ADMIN_PASSWORD=ton_mot_de_passe`.
5. Déployer : `fly deploy` (en ayant un Dockerfile ou une config qui build le site + admin et lance le serveur depuis `site-api`).

Tu obtiendras une URL du type `https://ton-app.fly.dev`. Le site sera en `/`, l’admin en `/admin/`.

Si tu veux, on peut ajouter au repo un `Dockerfile` et un `fly.toml` prêts à l’emploi pour ce projet.

---

### Si Fly.io affiche « Failed to create app »

Cette erreur peut venir de plusieurs choses. À essayer dans l’ordre :

1. **Ajouter un moyen de paiement**  
   Fly.io demande souvent une carte bancaire même pour utiliser le free tier (ils ne prélèvent rien tant que tu restes dans les limites gratuites). Sans carte, la création d’app peut échouer.  
   → [fly.io/dashboard](https://fly.io/dashboard) → **Account** / **Billing** → **Add payment method**.

2. **Créer l’app en ligne de commande (pour voir l’erreur précise)**  
   Le dashboard affiche souvent « Failed to create app » sans détail. En CLI, tu verras la vraie cause.
   - Installe Fly CLI : [fly.io/docs/hands-on/install-flyctl](https://fly.io/docs/hands-on/install-flyctl/) (ou `brew install flyctl` sur Mac).
   - Connexion : `fly auth login`
   - Clone ton repo (ou va dans le dossier qui a déjà `fly.toml` à la racine) :  
     `git clone https://github.com/fnormandweb/gilbertnormand.git && cd gilbertnormand`
   - Lance : `fly launch`  
     Réponds aux questions (nom d’app, région). Si une erreur s’affiche, **copie-colle le message complet** pour la partager (quota, carte requise, région, etc.).

3. **Vérifier le compte**  
   Certains comptes (nouveaux ou non vérifiés) ont des limites. Vérifie tes infos sur [fly.io/dashboard](https://fly.io/dashboard) et que tu n’as pas dépassé le nombre d’apps ou de machines autorisées.

4. **Utiliser Render en alternative (gratuit sans carte)**  
   [Render](https://render.com) propose un free tier sans carte obligatoire. Les données sont sur disque **éphémère** (réinitialisées au redéploiement), mais le site + l’admin fonctionnent pour tester.  
   → Create **Web Service** → connecter le repo GitHub **fnormandweb/gilbertnormand** → Root directory : vide ou `site-api` selon la structure → Build : `cd site-api && npm install && npm run build:all` (ou pnpm) → Start : `npm start` (ou pnpm start) → définir les variables `ADMIN_USER` et `ADMIN_PASSWORD`.

---

### Remplir l’écran de configuration Fly.io (Environment, Working directory, Config path)

Sur l’écran où tu as **Environment Variables**, **Database**, **Working directory** et **Config path** :

1. **Environment Variables**  
   Clique sur **+ New environment variable** et ajoute :
   - **Key** : `ADMIN_USER` — **Value** : ton identifiant admin (ex. `admin`).
   - **Key** : `ADMIN_PASSWORD` — **Value** : un mot de passe sûr (obligatoire en prod).

2. **Database**  
   Laisse **Managed Postgres** décoché (on utilise SQLite, pas Postgres).

3. **Working directory**  
   Laisse vide (ou `./`) pour que la racine du repo soit utilisée. Le `Dockerfile` et le `fly.toml` doivent être **à la racine** du dépôt (à côté de `site-api`, `site-web`, `site-web-admin`).

4. **Config path (path to fly.toml)**  
   Laisse vide (ou `./`) pour que Fly utilise `fly.toml` à la racine.

Pour que le déploiement réussisse, le dépôt GitHub doit contenir à la racine un **Dockerfile** et un **fly.toml** (fournis dans `site-api/` du projet : à copier à la racine du repo, ou re-lancer le script `site-api/scripts/push-to-gilbertnormand.sh` qui les met à la racine puis pousse à nouveau).

---

## 8. Hébergeurs « clé en main » (payants ou avec limite)

Si tu préfères un hébergeur très simple sans trop configurer :

| Hébergeur   | Idée                                                                                                                                                                                                          |
| ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Railway** | Projet Node, racine ou `site-api`, variable `PORT` fournie, définir `ADMIN_USER` et `ADMIN_PASSWORD`. Déployer le repo et lancer `pnpm run start:full` (ou build + start).                                    |
| **Render**  | Web Service, build : `cd site-api && pnpm install && pnpm run build:all`, start : `pnpm start`, root : `site-api`. En gratuit les données ne persistent pas ; en payant tu peux ajouter un disque persistant. |
| **Fly.io**  | Voir la section « Fly.io (gratuit, avec persistance) » ci‑dessus.                                                                                                                                             |

Dans tous les cas : définir les variables d’environnement (au moins `ADMIN_USER` et `ADMIN_PASSWORD`) dans l’interface de l’hébergeur.

---

### Et Vercel ?

**Vercel ne fait pas tourner un serveur Node en continu.** Il sert des sites statiques et des fonctions serverless (une invocation par requête, sans disque persistant). Or ce projet a besoin de :

- un **serveur Express** qui tourne en continu ;
- un **fichier SQLite** sur disque (ou une base persistante) ;
- des **sessions admin** en mémoire.

**Donc :**

- **Site + admin + API ensemble** → Vercel **ne convient pas** tel quel. Utilise Railway, Render ou un VPS (voir ci‑dessus).
- **Site statique seul** (sans admin, données figées au build) → tu peux déployer sur Vercel le contenu de **site-web/dist** (build avec `cd site-web && pnpm run build`). Tu n’auras pas l’admin ni les données modifiables en ligne.

---

## 9. Sauvegarder la base de données

La base est un fichier : **`site-api/data/gilbert.db`**. En production :

- Fais des **copies régulières** de ce fichier (backup manuel, cron, ou outil fourni par l’hébergeur).
- Si tu utilises un volume ou un disque persistant, assure-toi qu’il est bien monté sur le chemin utilisé par `DB_PATH`.

---

## 10. Résumé des étapes

| Étape | Action                                                                                                       |
| ----- | ------------------------------------------------------------------------------------------------------------ |
| 1     | Sur ta machine : `cd site-api && pnpm install && pnpm run build:all`                                         |
| 2     | Déployer `site-api/` + `site-web/dist/` + `site-web-admin/dist/` (ou tout le repo et builder sur le serveur) |
| 3     | Sur le serveur : créer `.env` avec `ADMIN_USER` et `ADMIN_PASSWORD` (et `PORT` si besoin)                    |
| 4     | Démarrer : `cd site-api && pnpm start` (ou PM2 / systemd)                                                    |
| 5     | Optionnel : Nginx/Caddy + domaine + HTTPS                                                                    |
| 6     | Sauvegarder régulièrement `data/gilbert.db`                                                                  |

Une fois en ligne, les modifications faites dans l’admin (après « Publier ») sont enregistrées en base et apparaissent immédiatement sur le site public (y compris `/famille.html`).
