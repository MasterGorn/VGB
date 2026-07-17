# Video Games Battle — stack Next.js (comme Liengo)

## Architecture

```
VGB/                    ← racine Git
├── api/                ← legacy PHP (optionnel, matchmaking local MAMP)
├── vgb/                ← app Next.js 16 (Root Directory Vercel)
│   ├── src/            ← App Router, NextAuth, Mongoose
│   ├── public/         ← jeu Phaser (play.html) + assets
│   └── .env.example
└── README.md
```

Stack alignée sur Liengo (sans Stripe / Resend / Blob) :

| Couche | Techno |
|--------|--------|
| Runtime | Node.js ≥ 20, TypeScript 5, ESM |
| Framework | Next.js 16 (App Router) |
| UI | React 19, Tailwind 3 |
| DB | MongoDB Atlas via Mongoose 8 |
| Auth | NextAuth 4 (Credentials + JWT) |
| Host | Vercel (preview à chaque push) |

## Setup local

1. Créer un cluster **MongoDB Atlas** + URI `MONGODB_URI`
2. Dans `vgb/` :

```bash
cd vgb
cp .env.example .env.local
# renseigner MONGODB_URI, NEXTAUTH_SECRET, NEXTAUTH_URL, NEXT_PUBLIC_APP_URL
npm install
npm run dev
```

3. Ouvrir http://localhost:3000 → **même site qu’avant** (pages HTML historiques)  
   - Jeu : `/` ou `/play.html`  
   - Compte : `/login.html`  
   - Classement : `/classement.html`  
   - Pièces / règles / objets : inchangés  

L’API Next (auth Atlas, Elo) tourne en arrière-plan ; le design reste celui de `public/css/`.

## Vercel

1. Importer le dépôt GitHub
2. **Root Directory** = `vgb`
3. Variables d’environnement (Production + Preview) :
   - `MONGODB_URI`
   - `NEXTAUTH_SECRET`
   - `NEXTAUTH_URL` = URL HTTPS du déploiement (sans `/` final)
   - `NEXT_PUBLIC_APP_URL` = même URL
4. Chaque push de branche → build preview (comme Liengo)

Le script `scripts/vercel-postbuild.mjs` contourne le bug Next 16 + Root Directory.

## API

| Route | Rôle |
|-------|------|
| `POST /api/auth/register` | Création de compte |
| `/api/auth/[...nextauth]` | NextAuth (login / session) |
| `GET/POST /api/decks` | Liste / création decks |
| `PATCH/DELETE /api/decks/[id]` | MAJ / suppression |
| `GET /api/leaderboard` | Classement Elo |
| `POST /api/elo` | MAJ Elo après partie |
| `GET /api/health` | Santé |

## Notes

- Comptes **username + password** (pas d’e-mail pour l’instant).
- Matchmaking 1v1 reste sur l’API PHP legacy si besoin ; auth / decks / Elo Atlas passent par Next.
- Ancien front MAMP à la racine du repo est conservé pour compatibilité.
