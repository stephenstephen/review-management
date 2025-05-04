FROM node:20-alpine

RUN npm install -g pnpm

WORKDIR /app
COPY . .

RUN pnpm install --filter client...
RUN pnpm --filter client build

EXPOSE 4173
CMD ["pnpm", "--filter", "client", "preview"]
