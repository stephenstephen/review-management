# Processus de lancement – review-management

## 1. Lancer le serveur (API NestJS)

Dans un terminal :

```bash
cd server
pnpm install # ou npm install
pnpm run start:dev # pour le mode développement
```

- URL par défaut de l’API : http://localhost:3000
- Documentation Swagger (si activée) : http://localhost:3000/api

## 2. Lancer le client (React + Vite)

Dans un autre terminal :

```bash
cd client
pnpm install # ou npm install
pnpm run dev
```

- URL par défaut de l’application : http://localhost:5173

---

## 3. Lancer avec Docker Compose

Pour lancer toute la stack (client, server, base de données) avec Docker Compose :

```bash
# À la racine du projet
cp .env.example .env # si besoin, adapter les variables
cp server/.env.example server/.env # idem côté server
cp client/.env.example client/.env # idem côté client

docker compose up --build
```

- Le serveur NestJS sera accessible sur http://localhost:3000
- Le client React sera accessible sur http://localhost:5173
- La base de données Postgres sera exposée sur le port défini dans `.env` (`DB_PORT`)

Pour arrêter :
```bash
docker compose down
```

**Résumé :**
- Le serveur doit être lancé avant le client si le front communique avec l’API.
- Les URLs ci-dessus sont les valeurs par défaut (modifiables dans les fichiers de config ou .env).
- Pour la production, utilise `pnpm run build` (client) et `pnpm run start:prod` (server).
- Docker Compose permet de tout lancer en une seule commande.

N’hésite pas à adapter ce guide si tes ports ou URLs diffèrent !
