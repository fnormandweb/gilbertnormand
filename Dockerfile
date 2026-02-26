# Déploiement Gilbert Normand sur Fly.io (ou tout Docker)
# À placer à la racine du repo (à côté de site-api, site-web, site-web-admin)
# ou dans site-api si tu déploies depuis le dossier site-api avec le contexte parent.

FROM node:20-alpine

WORKDIR /app

# pnpm pour les builds
RUN corepack enable && corepack prepare pnpm@latest --activate

# Code source (on copie tout d'abord pour pouvoir corriger package.json)
COPY site-api ./site-api
COPY site-web ./site-web
COPY site-web-admin ./site-web-admin

# site-web a "vite": "workspace:*" (monorepo) : remplacer par une version fixe pour le build
RUN sed -i 's/"workspace:\*"/"^6.0.0"/g' site-web/package.json
RUN rm -f site-web/pnpm-lock.yaml site-web/package-lock.json

# Dépendances : site-api et site-web-admin en pnpm, site-web en npm (évite les soucis pnpm/workspace)
RUN cd site-api && pnpm install --frozen-lockfile || pnpm install
RUN cd site-web && npm install
RUN cd site-web-admin && pnpm install --frozen-lockfile || pnpm install

# Build site + admin (depuis site-api)
RUN cd site-api && pnpm run build:all

# Port exposé (Fly.io injecte PORT=8080)
ENV PORT=8080
ENV NODE_ENV=production

# Base SQLite : par défaut dans /data si monté (Fly volume), sinon site-api/data
ENV DB_PATH=/data/gilbert.db

WORKDIR /app/site-api
EXPOSE 8080
CMD ["node", "server.js"]
