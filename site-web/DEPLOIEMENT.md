# Mise en ligne du site Gilbert Normand (version statique)

> **Tu utilises l’API + l’admin (site modifiable en ligne) ?** → Voir **[site-api/DEPLOIEMENT.md](../site-api/DEPLOIEMENT.md)** pour les étapes complètes (build, variables d’environnement, hébergement Node, HTTPS).

---

Le site peut aussi être déployé en **statique seul** (sans API). C’est un projet **Vite** qui produit des fichiers statiques (HTML, CSS, JS, images). Après la construction, tout le contenu à mettre en ligne se trouve dans le dossier **`dist/`**.

---

## 1. Générer le site (build)

À la racine du dossier **site-web** :

```bash
cd site-web
pnpm install
pnpm run build
```

Le dossier **`dist/`** est créé. C’est **tout le contenu de ce dossier** qu’il faut déployer (pas le reste du projet).

Pour vérifier en local avant de mettre en ligne :

```bash
pnpm run preview
```

Ouvre ensuite l’URL affichée (souvent `http://localhost:4173`) pour voir le site tel qu’il sera en ligne.

---

## 2. Où héberger ?

### Option A : Netlify (gratuit, simple)

1. Crée un compte sur [netlify.com](https://www.netlify.com).
2. **Soit** tu connectes ton dépôt Git (GitHub, GitLab, etc.) :
   - "Add new site" → "Import an existing project".
   - Build command : `cd site-web && pnpm run build`
   - Publish directory : `site-web/dist`
   - (Si Netlify ne gère pas pnpm, utilise "Build command" : `cd site-web && npm run build` après avoir ajouté un `package-lock.json` ou configurer pnpm dans Netlify.)
3. **Soit** tu déploies à la main : après le build, va dans "Sites" → "Deploy manually" et glisse-dépose le dossier **`site-web/dist`** (tout son contenu).
4. Tu peux ensuite attacher ton propre domaine (ex. gilbertnormand.com) dans "Domain settings".

**Avec Netlify depuis la racine du monorepo** (si le repo contient tout le projet) :

- Root directory : `site-web`
- Build command : `pnpm run build`
- Publish directory : `dist`

---

### Option B : Vercel (gratuit, simple)

1. Compte sur [vercel.com](https://vercel.com).
2. "Add New" → "Project" et importe ton dépôt Git.
3. **Root Directory** : `site-web`.
4. Build Command : `pnpm run build` (ou `npm run build`).
5. Output Directory : `dist`.
6. Déploiement automatique à chaque push. Domaine personnalisé dans "Settings" → "Domains".

---

### Option C : SiteGround (FTP / SFTP)

1. **Build du site** (sur ton ordinateur) :
   ```bash
   cd site-web
   pnpm install
   pnpm run build
   ```
2. **Connexion à SiteGround** :
   - Connecte-toi à [SiteGround](https://www.siteground.com) → **Site Tools** (outil de gestion du site).
   - Va dans **Site** → **FTP Accounts** pour voir ton compte FTP (ou en créer un). Note : **hôte** (souvent `ftp.tondomaine.com` ou l’IP fournie), **utilisateur**, **mot de passe**.
   - Ou utilise le **File Manager** dans Site Tools (pas besoin de logiciel FTP si tu préfères).
3. **Dossier cible sur le serveur** :
   - En FTP, ouvre le dossier **`public_html`** (c’est la racine web pour ton domaine principal).
   - Si le site doit être sur un sous-domaine ou un autre domaine, SiteGround indique le bon dossier (ex. `public_html` pour le domaine principal).
4. **Envoi des fichiers** :
   - Avec **FileZilla** (ou autre client FTP/SFTP) : connecte-toi, va dans `public_html`.
   - **Supprime** les fichiers de test éventuels (ex. `index.html` ou `default.html` déjà présents).
   - Envoie **tout le contenu** du dossier **`site-web/dist`** (pas le dossier `dist` lui-même) : glisse-dépose les fichiers et dossiers **à l’intérieur** de `dist` vers `public_html`.
   - Avec le **File Manager** SiteGround : va dans `public_html`, supprime les fichiers de test, puis utilise « Upload » et envoie le contenu de ton dossier `dist` (tous les fichiers et dossiers).
5. **Vérification** : à la racine de `public_html` tu dois avoir notamment : `index.html`, `galerie.html`, `famille.html`, les dossiers `assets/` et `images/`.

**Domaine** : si ton hébergement SiteGround est déjà associé à **gilbertnormand.com**, le site sera accessible dès que les fichiers sont dans `public_html`. Sinon, ajoute/pointe le domaine dans Site Tools → **Domain** et mets les DNS selon les instructions SiteGround.

---

### Option D : Autre hébergeur (OVH, o2switch, etc.) – FTP / SFTP

1. Fais le build : `cd site-web && pnpm run build`.
2. Ouvre ton client FTP (FileZilla, Cyberduck, etc.) et connecte-toi à ton hébergement.
3. Sur le serveur, va dans le répertoire qui sert le site (souvent `public_html`, `www` ou `httpdocs`).
4. **Envoie tout le contenu** du dossier **`site-web/dist`** (tous les fichiers et dossiers à l’intérieur).
5. À la racine tu dois avoir `index.html`, `galerie.html`, `famille.html`, les dossiers `assets/`, `images/`, etc.

Pour **gilbertnormand.com**, le DNS doit pointer vers cet hébergeur (adresse IP ou CNAME selon l’hébergeur).

---

### Option E : GitHub Pages (gratuit)

1. Build : `cd site-web && pnpm run build`.
2. Si le site est à la racine du domaine (ex. `tonuser.github.io`) : dans les réglages du dépôt, "Pages" → Source "Deploy from a branch" → branch `main` (ou `master`), dossier **`/ (root)`** — il faudra alors que le contenu de **`dist`** soit à la racine du repo (par ex. avec un script qui pousse `dist` sur une branche `gh-pages` ou qui copie son contenu à la racine).
3. Méthode simple : créer une branche `gh-pages`, y mettre uniquement le contenu de `dist`, et dans "Pages" choisir la branche `gh-pages` et le dossier `/ (root)`.

Pour un **site de projet** (ex. `tonuser.github.io/gilbert`) il faudrait configurer `base: '/gilbert/'` dans `vite.config.js` et rebuilder.

---

## 3. Résumé rapide

| Étape              | Commande / action                       |
| ------------------ | --------------------------------------- |
| Build              | `cd site-web && pnpm run build`         |
| Contenu à déployer | **Tout le contenu de** `site-web/dist/` |
| Test local         | `cd site-web && pnpm run preview`       |

Une fois le contenu de **`dist/`** déployé (Netlify, Vercel, SiteGround, ou autre FTP), le site est en ligne. Pour **gilbertnormand.com**, configure le domaine dans l’outil d’hébergement et le DNS selon les instructions de l’hébergeur.
