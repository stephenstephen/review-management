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
COPY nginx.conf /etc/nginx/nginx.conf
RUN pnpm install

################################################################################
# DEVELOPMENT IMAGE (HOT RELOAD)
################################################################################
FROM base AS dev

COPY . .

EXPOSE 5173
CMD ["pnpm", "dev"]

################################################################################
# PRODUCTION BUILD
################################################################################
FROM base AS builder

COPY . .
RUN pnpm build

################################################################################
# RUNTIME IMAGE (PROD)
################################################################################
FROM nginx:stable-alpine AS production

COPY --from=builder /app/dist /usr/share/nginx/html

# Remove default nginx config and use your own if needed
# COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
