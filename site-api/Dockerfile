# Déploiement Gilbert Normand sur Fly.io (ou tout Docker)
# À placer à la racine du repo (à côté de site-api, site-web, site-web-admin)
# ou dans site-api si tu déploies depuis le dossier site-api avec le contexte parent.

FROM node:20-alpine

WORKDIR /app

# pnpm pour les builds
RUN corepack enable && corepack prepare pnpm@latest --activate

# Fichiers package
COPY site-api/package.json site-api/package-lock.json* ./site-api/
COPY site-web/package.json site-web/package-lock.json* ./site-web/
COPY site-web-admin/package.json site-web-admin/package-lock.json* ./site-web-admin/

# Dépendances
RUN cd site-api && pnpm install --frozen-lockfile || npm install
RUN cd site-web && (pnpm install --frozen-lockfile || npm install)
RUN cd site-web-admin && (pnpm install --frozen-lockfile || npm install)

# Code source
COPY site-api ./site-api
COPY site-web ./site-web
COPY site-web-admin ./site-web-admin

# Build site + admin (depuis site-api)
RUN cd site-api && pnpm run build:all || (npm run build:all 2>/dev/null || true)

# Port exposé (Fly.io injecte PORT=8080)
ENV PORT=8080
ENV NODE_ENV=production

# Base SQLite : par défaut dans /data si monté (Fly volume), sinon site-api/data
ENV DB_PATH=/data/gilbert.db

WORKDIR /app/site-api
EXPOSE 8080
CMD ["node", "server.js"]
