# syntax=docker/dockerfile:1.5

################################################################################
# BASE IMAGE
################################################################################
FROM node:20 AS base

WORKDIR /app
ENV PNPM_HOME=/root/.local/share/pnpm
ENV PATH="${PNPM_HOME}/bin:${PATH}"
ENV CI=true

RUN npm install -g pnpm

COPY package.json pnpm-lock.yaml ./
RUN pnpm install --no-frozen-lockfile

################################################################################
# DEVELOPMENT IMAGE (HOT RELOAD)
################################################################################
FROM base AS dev

WORKDIR /app
ENV PNPM_HOME="/root/.local/share/pnpm"
ENV PATH="$PNPM_HOME/bin:$PATH"

RUN apt-get update && apt-get install -y netcat-openbsd
RUN npm install -g pnpm
ENV PATH="/root/.local/share/pnpm:${PATH}"
RUN pnpm add -g ts-node-dev

COPY . .

EXPOSE 3000
CMD ["tsnd", "--respawn", "--transpile-only", "--ignore-watch", "node_modules", "src/main.ts"]

################################################################################
# PRODUCTION BUILD
################################################################################
FROM base AS builder

COPY . .
RUN pnpm build

################################################################################
# RUNTIME IMAGE (PROD)
################################################################################
FROM node:20-slim AS production

WORKDIR /app
ENV NODE_ENV=production

RUN npm install -g pnpm

COPY --from=builder /app/dist ./dist
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --prod --no-frozen-lockfile

EXPOSE 3000
CMD ["node", "dist/main.js"]
