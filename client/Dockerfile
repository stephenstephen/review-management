FROM node:20-alpine AS builder
WORKDIR /app
COPY . .
RUN pnpm install && pnpm run build

FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
