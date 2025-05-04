FROM node:20-alpine

RUN npm install -g pnpm

WORKDIR /app
COPY . .

ENV CI=true
RUN pnpm install --filter server...
RUN pnpm --filter server build

CMD ["pnpm", "--filter", "server", "start:prod"]
