#!/usr/bin/env bash
# Pousse uniquement site-api, site-web, site-web-admin vers le dépôt GitHub gilbertnormand.
# À lancer depuis le dossier qui CONTIENT site-api (ex. vite-main) :
#   cd /Users/francoisnormand/Documents/Gilbert/Vite/vite-main
#   bash site-api/scripts/push-to-gilbertnormand.sh

set -e
REPO_URL="https://github.com/fnormandweb/gilbertnormand.git"
DIR_NAME="gilbertnormand-push"
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
# Racine du projet = parent du dossier site-api
PROJECT_ROOT="$(cd "$SCRIPT_DIR/../.." && pwd)"
cd "$PROJECT_ROOT"

if [ ! -d "site-api" ] || [ ! -d "site-web" ] || [ ! -d "site-web-admin" ]; then
  echo "Erreur: Lance ce script depuis la racine du projet (dossier qui contient site-api, site-web, site-web-admin)."
  exit 1
fi

echo "Création du dossier $DIR_NAME et copie des dossiers..."
rm -rf "$DIR_NAME"
mkdir -p "$DIR_NAME"

# Copie des dossiers puis suppression de ce qu'on ne versionne pas
cp -R site-api site-web site-web-admin "$DIR_NAME/"
rm -rf "$DIR_NAME/site-api/node_modules" "$DIR_NAME/site-api/data"
rm -rf "$DIR_NAME/site-web/node_modules" "$DIR_NAME/site-web/dist"
rm -rf "$DIR_NAME/site-web-admin/node_modules" "$DIR_NAME/site-web-admin/dist"

# .gitignore, Dockerfile et fly.toml à la racine du repo
cp "$PROJECT_ROOT/site-api/.gitignore-gilbert-repo" "$DIR_NAME/.gitignore"
cp "$PROJECT_ROOT/site-api/Dockerfile" "$PROJECT_ROOT/site-api/fly.toml" "$DIR_NAME/"

<<<<<<< HEAD
# Corriger site-web/package.json : "workspace:*" -> "^6.0.0" pour le build standalone (Fly, Render)
if [ -f "$DIR_NAME/site-web/package.json" ]; then
  sed 's/"workspace:\*"/"^6.0.0"/g' "$DIR_NAME/site-web/package.json" > "$DIR_NAME/site-web/package.json.tmp" && mv "$DIR_NAME/site-web/package.json.tmp" "$DIR_NAME/site-web/package.json"
fi

=======
>>>>>>> c41681e2f1ef4a02794447a395e11139e47d4655
cd "$DIR_NAME"
echo "Init Git, commit..."
git init
git add .
git commit -m "Gilbert Normand - site + API + admin"
git branch -M main
git remote add origin "$REPO_URL"
# Si le distant a déjà des commits (ex. README), on les récupère avant de pousser
if git ls-remote --exit-code --heads origin main 2>/dev/null; then
  echo "Récupération des commits distants (README etc.)..."
<<<<<<< HEAD
  git pull origin main --allow-unrelated-histories --no-rebase --no-edit
=======
  git pull origin main --allow-unrelated-histories --no-edit
>>>>>>> c41681e2f1ef4a02794447a395e11139e47d4655
fi
git push -u origin main

echo "Terminé. Ton code est sur https://github.com/fnormandweb/gilbertnormand"
